import { Autocomplete, Button, Grid, Link, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axiosInstance from "@/utils/axiosInstance";
import { green, red } from "@mui/material/colors";
import Swal from "sweetalert2";
import { accessToken, baseAPI, configAuth } from "@/utils/constant";
import { parseCookies } from "nookies";
import Table from "@/components/Table";

export async function getServerSideProps(context) {
  const res = await fetch(`${baseAPI}/categories`);
  const categories = await res.json();
  return { props: { categories } };
}
function categories({ categories }) {
  const [search, setSearch] = useState(null);
  const [category, setCategory] = useState([]);

  const [pagination, setPagination] = useState({ page: 1, pageSize: 5, totalItem: 0 });

  const axiosgetAllCategory = async () => {
    let pathUrl = `categories?page=${pagination.page}&limit=${pagination.pageSize}`;
    if (search) {
      pathUrl += `&name=${search.name}`;
    }
    const { data } = await axiosInstance.get(pathUrl);
    setCategory(data.data);
    setPagination((prev) => ({ ...prev, totalItem: data.totalItem }));
  };

  useEffect(() => {
    axiosgetAllCategory();
  }, [search, pagination.page, pagination.pageSize]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const handlePageSizeChange = (newPageSize) => {
    setPagination((prev) => ({ ...prev, pageSize: newPageSize, page: 1 }));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Category name", width: 350, resizable: false },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Button variant="contained" color="primary" size="small" onClick={() => handleEdit(params.row)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button variant="contained" color="error" size="small" onClick={() => handleDelete(params.row.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];
  const handleCreate = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Enter Category details",
      html: '<input id="swal-input1" class="swal2-input" placeholder="Name">',
      focusConfirm: false,
      confirmButtonText: "Create",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      showCloseButton: true,
      preConfirm: () => {
        const name = document.getElementById("swal-input1").value;
        if (!name) {
          Swal.showValidationMessage("Name cannot be empty");
          return false;
        }
        return { name: name };
      },
    });

    if (formValues) {
      try {
        const { data } = await axiosInstance.post(`categories?name=${formValues.name}`, {}, configAuth(accessToken));
        axiosgetAllCategory();
      } catch (e) {}
      // Now you can use drinkBody as needed
    }
  };
  const handleEdit = async (row) => {
    const { data } = await axiosInstance.get(`categories/${row.id}`);
    const category = data.data;
    const { value: formValues } = await Swal.fire({
      title: "Enter Category details",
      html: `<input id="swal-input0" class="swal2-input" value="${category.id}" disabled> <input id="swal-input1" class="swal2-input" value="${category.name}" placeholder="Name"> `,
      focusConfirm: false,
      confirmButtonText: "Update",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      showCloseButton: true,
      preConfirm: () => {
        const name = document.getElementById("swal-input1").value;
        if (!name) {
          Swal.showValidationMessage("Name cannot be empty");
          return false;
        }
        return { name: name };
      },
    });

    if (formValues) {
      try {
        const { data } = await axiosInstance.patch(`categories/${category.id}?name=${formValues.name.trim()}`, {}, configAuth(accessToken));
        axiosgetAllCategory();
      } catch (e) {}
      // Now you can use drinkBody as needed
    }
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
        const { data } = await axiosInstance.delete(`categories/${id}`, configAuth(accessToken));
        if (data.success) {
          Swal.fire("Deleted!", data.message, "success");
          axiosgetAllCategory();
        }
      } catch (error) {}
    }
  };
  return (
    <Paper sx={{ p: 1 }}>
      <Table
        handlePageSizeChange={handlePageSizeChange}
        handlePageChange={handlePageChange}
        columns={columns}
        handleCreate={handleCreate}
        data={category}
        pagination={pagination}
      >
        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={search}
            size="small"
            options={categories.data}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Category" />}
            onChange={(e, newValue) => {
              setSearch(newValue);
            }}
          />
        </Grid>
        <Grid item xs={6} />
      </Table>
    </Paper>
  );
}
export default categories;
