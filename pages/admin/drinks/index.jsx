import React, { useEffect, useState } from "react";

import { accessToken, baseAPI, configAuth } from "@/utils/constant";
import { parseCookies } from "nookies";
import { Autocomplete, Button, Grid, Paper, TextField } from "@mui/material";
import Table from "@/components/Table";
import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";

export async function getServerSideProps(context) {
  const res = await fetch(`${baseAPI}/categories`);
  const categories = await res.json();
  const res1 = await fetch(`${baseAPI}/drinks/all`);
  const drinksAPI = await res1.json();
  return { props: { categories, drinksAPI } };
}
function Drink({ categories, drinksAPI }) {
  const [drinks, setDrinks] = useState([]);
  const [category, setCategory] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 5, totalItem: 0 });
  const [drink, setDrink] = useState(null);

  useEffect(() => {
    const axiosgetAllDrink = async () => {
      let pathUrl = `drinks`;
      if (pagination.page) pathUrl += `?page=${pagination.page}&limit=${pagination.pageSize}`;
      if (category) pathUrl += `&category=${category.name}`;

      if (drink) pathUrl += `&name=${drink.name}`;
      const { data } = await axiosInstance.get(pathUrl);
      setDrinks(data.data);
      setPagination((prev) => ({ ...prev, totalItem: data.totalItem }));
    };
    axiosgetAllDrink();
  }, [category, pagination.page, pagination.pageSize, drink]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const handlePageSizeChange = (newPageSize) => {
    setPagination((prev) => ({ ...prev, pageSize: newPageSize, page: 1 }));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Drink name", width: 250, resizable: false },
    { field: "price", headerName: "Price", width: 130, resizable: false },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 180,
      sortable: false,
      renderCell: (params) => <img src={params.value} alt="drink" style={{ width: "100%", height: "100%", objectFit: "cover" }} />,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button sx={{ textTransform: "none" }} variant="contained" color="error" size="small" onClick={() => handleDelete(params.row.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {
    window.location.href = `drinks/${row.id}`;
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      console.log(id);
      try {
        const { data } = await axiosInstance.delete(`drinks/${id}`, configAuth(accessToken));
        if (data.success) {
          Swal.fire("Deleted!", data.message, "success");
          axiosgetAllDrink();
        }
      } catch (error) {}
    }
  };
  const handleCreate = () => {
    window.location.href = "drinks/create-drink";
  };
  return (
    <Paper>
      <Table
        handlePageSizeChange={handlePageSizeChange}
        handlePageChange={handlePageChange}
        columns={columns}
        handleCreate={handleCreate}
        pagination={pagination}
        data={drinks}
        height={100}
        tableHeight={570}
      >
        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={category}
            size="small"
            options={categories.data}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Category" />}
            onChange={(e, newValue) => {
              setCategory(newValue);
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={drink}
            size="small"
            options={drinksAPI.data}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Drink name" />}
            onChange={(e, newValue) => {
              setDrink(newValue);
            }}
          />
        </Grid>
        <Grid item xs={3} />
      </Table>
    </Paper>
  );
}

export default Drink;
