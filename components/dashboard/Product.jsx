import { Button, Card, CardContent, CardMedia, Container, Dialog, DialogActions, DialogTitle, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuthHeaders, getAuthTokenFromCookie } from "../auth";
import { useRouter } from "next/router";
export default function Product({ category }) {
  const [foods, setFoods] = useState([]);
  const [cate, setCate] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState({});

  const handleCloseDialog = (foodId) => {
    // Close the dialog for the specific food_id
    console.log(isDialogOpen);
    setIsDialogOpen((prev) => ({ ...prev, [foodId]: false }));
  };

  const router = useRouter();
  const token = getAuthTokenFromCookie();
  const headers = getAuthHeaders(token);
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3333/food", { data: { food_id: id }, headers }) // how to use headers with delete axios
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message) {
          router.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:3333/food?option=${cate}`, { headers }).then((res) => {
      setFoods(res.data);
    });
  }, [cate]);
  return (
    <Container component="main" maxWidth="md">
      <Grid>
        {/* Left half for menu with border */}
        <Grid item sm={12} md={12} style={{ border: "1px solid #ccc", height: "100%" }}>
          {Array.isArray(category) && category.length > 0 ? (
            <Container sx={{ justifyContent: "center" }}>
              <Button
                sx={{ mt: "10px", ml: "25px" }}
                onClick={() => {
                  setCate("");
                }}
                variant="contained"
                color="secondary"
              >
                All
              </Button>
              {category.map((item) => (
                <Button
                  sx={{ mt: "10px", ml: "25px" }}
                  key={item.category_id}
                  onClick={() => {
                    setCate(item.category_name);
                  }}
                  variant="contained"
                  color="secondary"
                >
                  {item.category_name}
                </Button>
              ))}
            </Container>
          ) : null}
          <Grid container maxWidth="md">
            {Array.isArray(foods) && foods.length > 0
              ? foods.map((food) => (
                  <Grid item key={food.food_id} xs={12} sm={3} md={3}>
                    <Card sx={{ mt: "15px", width: "200px", height: "250px", display: "flex", flexDirection: "column" }}>
                      <CardMedia
                        component="div"
                        sx={{
                          // 16:9
                          paddingTop: "56.25%",
                          backgroundSize: "cover", // Ensure the image covers the entire container
                          backgroundPosition: "center", // Center the image
                        }}
                        image={`http://localhost:3333/img/product/${food.image}`}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography>{food.food_name}</Typography>
                        <Typography>{food.price} đ</Typography>
                        <Button
                          color="secondary"
                          onClick={() => {
                            router.push(`foodlist/${food.food_id}`);
                          }}
                        >
                          Update
                        </Button>
                        <Dialog
                          open={isDialogOpen[food.food_id] || false}
                          onClose={() => handleCloseDialog(food.food_id)}
                          aria-labelledby="confirmation-dialog-title"
                        >
                          <DialogTitle id="confirmation-dialog-title">Confirm Deletion</DialogTitle>
                          <DialogActions>
                            <Button onClick={() => handleCloseDialog(food.food_id)} color="primary">
                              Cancel
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => {
                                handleDelete(food.food_id);
                              }}
                              color="error"
                            >
                              Delete
                            </Button>
                          </DialogActions>
                        </Dialog>
                        <Button
                          color="error"
                          onClick={() => {
                            setIsDialogOpen((prev) => ({ ...prev, [food.food_id]: true }));
                          }}
                        >
                          Delete
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : null}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
