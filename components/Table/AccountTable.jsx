import axiosInstance from "@/utils/axiosInstance";
import { accessToken, configAuth } from "@/utils/constant";
import { Button, Grid } from "@mui/material";
import { green } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import Swal from "sweetalert2";
function AccountTable() {
  const [accounts, setAccounts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 5, totalItem: 0 });

  const axiosgetAllAccount = async () => {
    let pathUrl = `accounts`;
    if (pagination.page) pathUrl += `?page=${pagination.page}&limit=${pagination.pageSize}`;

    const { data } = await axiosInstance.get(pathUrl, configAuth(accessToken));
    console.log(data);
    setAccounts(data.data);
    setPagination((prev) => ({ ...prev, totalItem: data.totalItem }));
  };

  useEffect(() => {
    axiosgetAllAccount();
  }, [pagination.page, pagination.pageSize]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage + 1 }));
  };
  const handlePageSizeChange = (newPageSize) => {
    setPagination((prev) => ({ ...prev, pageSize: newPageSize, page: 1 }));
  };

  const showDeatailAccount = async (id) => {
    const { data } = await axiosInstance.get(`accounts/${id}`, configAuth(accessToken));
    const { role, email } = data.data;
    Swal.fire({
      title: "User Information",
      html: `
        <div x="margin-bottom: 10px;">
          <label for="email" >Email:</label>
          <input type="text" id="email" disabled name="email" value="${email}" class="swal2-input" >
        </div>
        <div style="margin-bottom: 10px;">
          <label for="role" >Role:</label>
          <select id="role" name="role" class="swal2-select">
          <option value="1" ${role.name === "admin" ? "selected" : ""}>Admin</option>
          <option value="2" ${role.name === "manager" ? "selected" : ""}>Manager</option>
          <option value="3" ${role.name === "employee" ? "selected" : ""}>Employee</option>
          <option value="4" ${role.name === "user" ? "selected" : ""}>Viewer</option>
        </select>
        </div>
      `,
      width: 600,
      showCancelButton: true,
      confirmButtonText: "Save",

      preConfirm: () => {
        // const isBlock = Swal.getPopup().querySelector("#isBlock").value === "true";
        const role = Swal.getPopup().querySelector("#role").value;

        return {
          roleId: role,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const roleId = result.value.roleId;
        try {
          const { data } = await axiosInstance.patch(`accounts/update-role/${id}?roleid=${roleId}`, {}, configAuth(accessToken));
          axiosgetAllAccount();
        } catch (e) {}
      }
    });
  };
  const blockAccount = async (id, isBlock) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosInstance.patch(`accounts/block/${id}?block=${!isBlock}`, {}, configAuth(accessToken));
          axiosgetAllAccount();
        } catch (e) {}
      }
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "fullName",
      headerName: "Full name",
      width: 180,
      resizable: false,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      sortable: false,
      resizable: false,
      renderCell: (params) => <div>{params.row.role.name}</div>,
    },
    {
      field: "isActive",
      headerName: "Online",
      width: 100,
      sortable: false,
      resizable: false,
      align: "center",
      renderCell: (params) => (
        <div>{params.row.isActive ? <CircleIcon sx={{ color: "green" }} /> : <CircleIcon sx={{ color: "red" }} />}</div>
      ),
    },
    {
      field: "isBlock",
      headerName: "Block",
      width: 100,
      sortable: false,
      resizable: false,
      align: "center",
      renderCell: (params) => <div>{params.row.isBlock ? <div style={{ color: "red" }}>Block</div> : <>-</>}</div>,
    },
    {
      field: "actions",
      headerName: "Actions",

      align: "center",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Button
            sx={{ textTransform: "none" }}
            onClick={() => showDeatailAccount(params.row.id)}
            variant="contained"
            color="primary"
            size="small"
            style={{ marginRight: 8 }}
          >
            Detail...
          </Button>
          {params.row.isBlock ? (
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => blockAccount(params.row.id, params.row.isBlock)}
              variant="contained"
              color="error"
              size="small"
              style={{ marginRight: 8 }}
            >
              Unblock
            </Button>
          ) : (
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => blockAccount(params.row.id, params.row.isBlock)}
              variant="contained"
              color="warning"
              size="small"
              style={{ marginRight: 8 }}
            >
              Block
            </Button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Grid container justifyContent={"center"} justifyItems={"center"}>
      {/* Left half for menu with border */}
      <Grid item xs={3}></Grid>
      <Grid item xs={6} />
      <Grid item xs={3}>
        <Button
          variant="contained"
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
          rows={accounts}
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

export default AccountTable;
