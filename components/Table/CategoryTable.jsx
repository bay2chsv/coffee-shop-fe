import { Autocomplete, Button, Grid, Link, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axiosInstance from "@/utils/axiosInstance";
import { green, red } from "@mui/material/colors";
import Swal from "sweetalert2";
import { accessToken, configAuth } from "@/utils/constant";

export default function CategoryTable({ categories }) {
  const [categoryTable, setCategoryTable] = useState([]);
  const [search, setSearch] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 5, totalItem: 0 });

  const axiosgetAllDrink = async () => {
    let pathUrl = `categories?page=${pagination.page}&limit=${pagination.pageSize}`;
    if (search) {
      pathUrl += `&name=${category.name}`;
    }
    const { data } = await axiosInstance.get(pathUrl);
    setCategoryTable(data.data);
    setPagination((prev) => ({ ...prev, totalItem: data.totalItem }));
  };

  useEffect(() => {
    axiosgetAllDrink();
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
      title: "Enter drink details",
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
        axiosgetAllDrink();
      } catch (e) {}
      // Now you can use drinkBody as needed
    }
  };
  const handleEdit = async (row) => {
    const { data } = await axiosInstance.get(`categories/${row.id}`);
    const category = data.data;
    const { value: formValues } = await Swal.fire({
      title: "Enter drink details",
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
        console.log(data);
        axiosgetAllDrink();
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
          axiosgetAllDrink();
        }
      } catch (error) {}
    }
  };
  return (
    <Grid container justifyContent={"center"} justifyItems={"center"}>
      {/* Left half for menu with border */}
      <Grid item xs={3}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={search}
          size="small"
          options={categories}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Category" />}
          onChange={(e, newValue) => {
            setSearch(newValue);
          }}
        />
      </Grid>
      <Grid item xs={6} />
      <Grid item xs={3}>
        <Button
          variant="contained"
          onClick={handleCreate}
          sx={{
            background: green[300],
            ":hover": {
              background: green[600],
            },
          }}
        >
          Create
        </Button>
      </Grid>
      <Grid item xs={12} maxWidth="md" sx={{ height: 400 }}>
        <DataGrid
          rows={categoryTable}
          columns={columns}
          paginationMode="server"
          rowCount={pagination.totalItem}
          paginationModel={{
            page: pagination.page - 1,
            pageSize: pagination.pageSize,
          }}
          onPaginationModelChange={(newPagination) => {
            if (newPagination.pageSize !== pagination.pageSize) {
              handlePageSizeChange(newPagination.pageSize);
            }
            if (newPagination.page !== pagination.page - 1) {
              handlePageChange(newPagination.page);
            }
          }}
          pageSizeOptions={[5, 10]}
        />
      </Grid>
    </Grid>
  );
}
