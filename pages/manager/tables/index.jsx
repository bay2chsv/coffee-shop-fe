import { Button, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";

import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";
import { accessToken, configAuth } from "@/utils/constant";
import Table from "@/components/Table";
function indexCoffee() {
  const [coffeetable, setCoffeetable] = useState([]);

  const [pagination, setPagination] = useState({ page: 1, pageSize: 5, totalItem: 0 });

  const axiosgetAllCoffeeTable = async () => {
    let pathUrl = `coffeetables?page=${pagination.page}&limit=${pagination.pageSize}`;

    const { data } = await axiosInstance.get(pathUrl);
    setCoffeetable(data.data);
    setPagination((prev) => ({ ...prev, totalItem: data.totalItem }));
  };

  useEffect(() => {
    axiosgetAllCoffeeTable();
  }, [pagination.page, pagination.pageSize]);

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
      title: "Enter Table details",
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
        const { data } = await axiosInstance.post(`coffeetables?name=${formValues.name}`, {}, configAuth(accessToken));
        axiosgetAllCoffeeTable();
      } catch (e) {}
      // Now you can use drinkBody as needed
    }
  };
  const handleEdit = async (row) => {
    const { data } = await axiosInstance.get(`coffeetables/${row.id}`);
    const coffeetable = data.data;
    const { value: formValues } = await Swal.fire({
      title: "Enter Table details",
      html: `<input id="swal-input0" class="swal2-input" value="${coffeetable.id}" disabled> <input id="swal-input1" class="swal2-input" value="${coffeetable.name}" placeholder="Name"> `,
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
        const { data } = await axiosInstance.patch(
          `coffeetables/${coffeetable.id}?name=${formValues.name.trim()}`,
          {},
          configAuth(accessToken)
        );

        axiosgetAllCoffeeTable();
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
      try {
        const { data } = await axiosInstance.delete(`coffeetables/${id}`, configAuth(accessToken));
        if (data.success) {
          Swal.fire("Deleted!", data.message, "success");
          axiosgetAllDrink();
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
        data={coffeetable}
        pagination={pagination}
      >
        <Grid item xs={3}></Grid>
        <Grid item xs={6} />
      </Table>
    </Paper>
  );
}
export default indexCoffee;
