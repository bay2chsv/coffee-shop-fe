import { Autocomplete, Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Input } from "@mui/material";
import { accessToken, baseAPI, configAuth } from "@/utils/constant";
import axiosInstance from "@/utils/axiosInstance";
import { green } from "@mui/material/colors";
import Swal from "sweetalert2";
export async function getServerSideProps() {
  const res = await fetch(`${baseAPI}/categories?limit=10`);
  const categories = await res.json();
  const res1 = await fetch(`${baseAPI}/coffeetables?limit=10`);
  const tables = await res1.json();
  return { props: { categories, tables } };
}

function employee({ categories, tables }) {
  const [orderList, setOrderList] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [cash, setCash] = useState(50);
  const [option, setOption] = useState(null);
  const [table, setTable] = useState(null);
  const [open, setOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const axiosgetDrinks = async (category) => {
    let pathAPI = "drinks/all";
    if (category) pathAPI += `?category=${category}`;
    try {
      const { data } = await axiosInstance.get(`${pathAPI}`);
      setDrinks(data.data);
    } catch (e) {}
  };
  useEffect(() => {
    axiosgetDrinks(option);
  }, [option]);

  const handleCreateBill = async () => {
    const formatOrderList = [];
    orderList.map((detail) => {
      const list = {
        amount: detail.amount,
        drinkId: detail.id,
      };
      formatOrderList.push(list);
    });

    const jsonData = {
      total: totalAllPrice,
      coffeeTableId: table.id,
      detail: formatOrderList,
    };
    handleClose();
    try {
      const { data } = await axiosInstance.post("bills", jsonData, configAuth(accessToken));
      console.log(data);
    } catch (e) {}
  };

  const addDrinkToBill = (food) => {
    const existingItem = orderList.find((item) => item.id === food.id);

    if (existingItem) {
      setOrderList((prevOrderList) => {
        return prevOrderList.map((item) => (item.id === food.id ? { ...item, amount: item.amount + 1 } : item));
      });
    } else {
      setOrderList((prevOrderList) => [...prevOrderList, { ...food, amount: 1 }]);
    }
  };

  // Function to remove an item from the order list
  const removeFromOrder = (food) => {
    setOrderList((prevOrderList) => prevOrderList.filter((item) => item.id !== food.id));
  };
  // Function to increase the quantity of an item
  const increaseQuantity = (food) => {
    setOrderList((prevOrderList) => {
      return prevOrderList.map((item) => (item.id === food.id ? { ...item, amount: item.amount + 1 } : item));
    });
  };
  const updateQuantity = (order, newQuantity) => {
    const parsedQuantity = parseInt(newQuantity, 10);
    if (!isNaN(parsedQuantity) && parsedQuantity >= 0) {
      const updatedOrderList = orderList.map((obj) => {
        if (obj.id === order.id) {
          return { ...obj, amount: parsedQuantity };
        }
        return obj;
      });
      // Update the state with the new order list
      setOrderList(updatedOrderList);
    }
  };
  // Function to decrease the quantity of an item
  const decreaseQuantity = (food) => {
    setOrderList((prevOrderList) => {
      return prevOrderList.map((item) => (item.id === food.id && item.amount > 1 ? { ...item, amount: item.amount - 1 } : item));
    });
  };
  // Save the order list to local storage whenever it changes

  let totalAllPrice = 0;
  orderList.forEach((order) => {
    totalAllPrice += Number(order.price * order.amount);
  });

  const handleClickOpen = () => {
    if (totalAllPrice !== 0) {
      if (!table) {
        Swal.fire({
          title: "Failed",
          text: `Please select table`,
          icon: "warning",
        });
      } else if (cash * 1000 >= totalAllPrice) {
        handleOpen();
      } else {
        Swal.fire({
          title: "Failed",
          text: `Cash must more than total bill`,
          icon: "warning",
        });
      }
    } else {
      Swal.fire({
        title: "Failed",
        text: `Opps Order is empty now add some drink and try again`,
        icon: "warning",
      });
    }
  };

  return (
    <Grid container>
      {/* Left half for menu with border */}
      <Grid item xs={8} style={{ border: "1px solid #ccc", height: "100%" }}>
        <Container sx={{ justifyContent: "center" }}>
          <Button
            sx={{ mt: "15px", ml: "25px", p: 1, textTransform: "none" }}
            onClick={() => {
              setOption(null);
            }}
            variant="contained"
            color="secondary"
          >
            All drink
          </Button>
          {categories.data && categories.data.length > 0
            ? categories.data.map((category) => (
                <Button
                  sx={{ mt: "15px", ml: "25px", p: 1, textTransform: "none" }}
                  key={category.id}
                  onClick={() => {
                    setOption(category.name);
                  }}
                  variant="contained"
                  color="secondary"
                >
                  {category.name}
                </Button>
              ))
            : null}
        </Container>

        <Grid container spacing={1} maxWidth="md">
          {drinks && drinks.length > 0
            ? drinks.map((drink) => (
                <Grid item key={drink.id} sx={{ mt: 5 }}>
                  <Button
                    onClick={() => {
                      addDrinkToBill(drink);
                    }}
                  >
                    <Card sx={{ width: "215px", height: "235px", display: "flex", flexDirection: "column" }}>
                      <CardMedia
                        component="div"
                        sx={{
                          // 16:9
                          paddingTop: "70.25%",
                          backgroundSize: "cover", // Ensure the image covers the entire container
                          backgroundPosition: "center", // Center the image
                        }}
                        image={drink.imageUrl}
                      />

                      <CardContent sx={{ flexGrow: 1, textTransform: "none" }}>
                        <Typography variant="h6">{drink.name}</Typography>
                        <Typography variant="subtitle1"> {drink.price} đồng</Typography>
                      </CardContent>
                    </Card>
                  </Button>
                </Grid>
              ))
            : null}
        </Grid>
      </Grid>
      <Grid item xs={4} style={{ border: "1px solid #ccc", height: "100%" }}>
        <Typography align="center" variant="h4">
          Order list
        </Typography>
        <Grid>
          <ul>
            <Button
              variant="contained"
              onClick={() => {
                setOrderList([]);
              }}
              endIcon={<DeleteIcon />}
              color="error"
              sx={{ mb: 3 }}
            >
              Clear
            </Button>
            {orderList.map((detail) => (
              <Grid>
                <Grid style={{ listStyleType: "decimal", display: "flex", justifyContent: "space-between" }} key={detail.id}>
                  <Grid>
                    <Typography display={"inline"}>
                      <>{detail.name}</>
                    </Typography>
                  </Grid>
                  <Grid align="right" display={"inline"}>
                    <IconButton color="success" onClick={() => increaseQuantity(detail)}>
                      <AddIcon fontSize="medium" />
                    </IconButton>
                    <>
                      <Input sx={{ width: 20 }} value={detail.amount} onChange={(e) => updateQuantity(detail, e.target.value)} />
                    </>
                    <IconButton color="error" onClick={() => decreaseQuantity(detail)}>
                      <RemoveIcon fontSize="medium" />
                    </IconButton>
                    <IconButton color="error" onClick={() => removeFromOrder(detail)}>
                      <DeleteIcon fontSize="medium" />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid>
                  <Typography>
                    {detail.price} * {detail.amount} = {detail.price * detail.amount} đồng
                  </Typography>
                </Grid>
              </Grid>
            ))}
            <br />
            <Typography d> Total : {totalAllPrice} đồng</Typography>
            <br />

            <Button variant="contained" endIcon={<FavoriteIcon />} onClick={handleClickOpen}>
              Order
            </Button>
            <Grid container>
              <Grid item sx={{ mt: 3 }} xs={5}>
                <TextField
                  required
                  fullWidth
                  id="Cash"
                  label="Cash x 1000 đồng"
                  type="number"
                  name="Cash"
                  autoComplete="Cash"
                  value={cash}
                  onChange={(e) => {
                    const newPrice = e.target.value < 0 ? totalAllPrice : parseInt(e.target.value);
                    setCash(newPrice);
                  }}
                />
              </Grid>
              <Grid item xs={1} />
              <Grid item sx={{ mt: 3 }} xs={5}>
                <Autocomplete
                  width="50px"
                  id="combo-box-demo"
                  value={table}
                  options={tables.data}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    console.log(newValue);
                    setTable(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} label="Table" />}
                />
              </Grid>
            </Grid>
          </ul>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              <Typography align="center" variant="h5">
                Table:
              </Typography>
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers sx={{ width: 400 }}>
              <>
                <>-------------------------------------------------------</>
                {orderList.map((detail, index) => (
                  <li style={{ listStyleType: "decimal", display: "flex", justifyContent: "space-between" }} key={detail.id}>
                    <Typography>
                      {index + 1}. {detail.name} x {detail.amount}
                    </Typography>
                    <Typography>{detail.price * detail.amount} đ</Typography>
                  </li>
                ))}
                <>-------------------------------------------------------</>
                <li style={{ listStyleType: "decimal", display: "flex", justifyContent: "space-between" }}>
                  <Typography>TOTAL: </Typography>
                  <Typography>{totalAllPrice} đ </Typography>
                </li>
                <li style={{ listStyleType: "decimal", display: "flex", justifyContent: "space-between" }}>
                  <Typography>CASH: </Typography>
                  <Typography>{cash * 1000} đ </Typography>
                </li>
                <li style={{ listStyleType: "decimal", display: "flex", justifyContent: "space-between" }}>
                  <Typography>CHANGE: </Typography>
                  <Typography>{cash * 1000 - totalAllPrice} đ </Typography>
                </li>
                <>-------------------------------------------------------</>
                <Typography align="center" variant="h6">
                  *******THANK YOU*******
                </Typography>
                <>**************************************************</>
                <Grid align="center">
                  <img
                    src={`https://img.vietqr.io/image/vietinbank-109875101213-compact2.jpg?amount=${totalAllPrice}&addInfo=tra%20sua%20mai%20mai`}
                    alt="Selected produce"
                    style={{ maxWidth: "60%" }}
                    onLoad={handleImageLoad}
                  />
                  {!imageLoaded && <p>Loading image...</p>}
                </Grid>
                <Grid align="center">
                  {" "}
                  {imageLoaded && (
                    <Button
                      onClick={handleCreateBill}
                      variant="contained"
                      size="large"
                      sx={{ textTransform: "none", background: green[400] }}
                    >
                      Confirm Order here
                    </Button>
                  )}
                </Grid>
              </>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default employee;
