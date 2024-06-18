import { FormControl, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import axiosInstance from "@/utils/axiosInstance";
import { accessToken, configAuth } from "@/utils/constant";
import { Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import Table from "@/components/Table";
function indexAccount() {
  const [accounts, setAccounts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 5, totalItem: 0 });
  const [search, setSearch] = useState({ email: null, isBlock: null });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };
  console.log(search);
  useEffect(() => {
    const axiosgetAllAccount = async () => {
      let pathUrl = `accounts?page=${pagination.page}&limit=${pagination.pageSize}`;
      if (search.email) pathUrl += `&email=${search.email}`;
      if (search.isBlock !== undefined && search.isBlock !== null) pathUrl += `&block=${search.isBlock}`;
      if (search.id) pathUrl += `&id=${search.id}`;
      const { data } = await axiosInstance.get(pathUrl, configAuth(accessToken));

      setAccounts(data.data);
      setPagination((prev) => ({ ...prev, totalItem: data.totalItem }));
    };
    axiosgetAllAccount();
  }, [pagination.page, pagination.pageSize, search.email, search.isBlock, search.id]);

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
          <option value="3" ${role.name === "manager" ? "selected" : ""}>Manager</option>
          <option value="2" ${role.name === "employee" ? "selected" : ""}>Employee</option>
          <option value="4" ${role.name === "user" ? "selected" : ""}>User</option>
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
      field: "email",
      headerName: "Email",
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
  const handleCreate = () => {
    window.location.href = "accounts/create-account";
  };

  return (
    <Paper>
      <Table
        handlePageSizeChange={handlePageSizeChange}
        handlePageChange={handlePageChange}
        columns={columns}
        handleCreate={handleCreate}
        data={accounts}
        pagination={pagination}
      >
        <Grid container xs={9} spacing={1}>
          <Grid item xs={3}>
            <TextField label="Email" name="email" onChange={handleChange} />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"> Account status </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="isBlock"
                label="Account status "
                onChange={handleChange}
              >
                <MenuItem value={null}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={false}>Activeable</MenuItem>
                <MenuItem value={true}>Blocked</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Table>
    </Paper>
  );
}

export default indexAccount;
