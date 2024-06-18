import * as React from "react";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import Table from "@/components/Table";
import { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import axiosInstance from "@/utils/axiosInstance";
import { accessToken, configAuth } from "@/utils/constant";
import { formatDate } from "@/utils/formatData";
import Swal from "sweetalert2";
function indexBill() {
  const [timeTo, setTimeTo] = useState(null);
  const [timeFrom, setTimeFrom] = useState(null);
  const [isCancel, setIsCancel] = useState(null);
  const handleChange = (event) => {
    setIsCancel(event.target.value);
  };
  const handleTimeTo = (newValue) => {
    if (!newValue) {
      setTimeTo(null);
    } else {
      let timeFormate = `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`;
      setTimeTo(timeFormate);
    }
  };
  const handleTimeFrom = (newValue) => {
    if (!newValue) {
      setTimeFrom(null);
    } else {
      let timeFormate = `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`;
      setTimeFrom(timeFormate);
    }
  };
  const [bills, setBills] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 5, totalItem: 0 });
  const [id, setId] = useState(null);
  // Create an event handler to update the selected date when the DatePicker value changes.
  const showDetailOfBIll = async (id) => {
    const { data } = await axiosInstance.get(`bills/${id}`, configAuth(accessToken));
    const { bill, billDetail } = data.data;
    let billDetailsString = `<div style="max-height: 400px; overflow-y: auto; text-align: left;">`;
    billDetailsString += `<h3>Bill: ${bill.id}</h3>`;
    billDetailsString += `<p>Table: ${bill.coffeeTable.name}</p>`;
    billDetailsString += `<ol>`;
    billDetail.forEach((detail, index) => {
      billDetailsString += `<li>`;
      billDetailsString += `<p><strong>Menu:</strong> ${detail.drinkName}</p>`;
      billDetailsString += `<p><strong>Price:</strong> ${detail.price} đ</p>`;
      billDetailsString += `<p><strong>Amount:</strong> ${detail.amount}</p>`;
      billDetailsString += `</li>`;
    });
    billDetailsString += `</ol>`;
    billDetailsString += `<p>Created At: ${new Date(bill.createdAt).toLocaleString()}</p>`;
    billDetailsString += `<p>Total: ${bill.total}đ</p><br/>`;
    billDetailsString += ` </div>`;

    // Display the bill using SweetAlert2 with custom styling
    Swal.fire({
      html: billDetailsString,
      background: "#f9f9f9",
      customClass: {
        title: "swal-title",
        htmlContainer: "swal-text",
        confirmButton: "swal-button",
      },
      confirmButtonText: "Close",
    });
  };
  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const handlePageSizeChange = (newPageSize) => {
    setPagination((prev) => ({ ...prev, pageSize: newPageSize, page: 1 }));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "coffeeTable",
      headerName: "Table",
      width: 150,
      resizable: false,
      renderCell: (params) => <div>{params.row.coffeeTable.name}</div>,
    },
    {
      field: "isCancel",
      headerName: "Bill status",
      width: 150,
      sortable: false,
      resizable: false,
      renderCell: (params) => {
        if (params.row.isCancel) {
          return <div style={{ color: "red" }}>Request to cancel </div>;
        } else {
          return <div style={{ color: "green" }}>Check</div>;
        }
      },
    },
    { field: "total", headerName: "Total", width: 150, resizable: false },
    {
      field: "createdAt",
      headerName: "Time create bill",
      width: 200,
      resizable: false,
      renderCell: (params) => <div>{formatDate(params.row.createdAt)}</div>,
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
            onClick={() => showDetailOfBIll(params.row.id)}
            style={{ marginRight: 8 }}
          >
            Detail...
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            disabled={!params.row.isCancel}
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const axiosGetBill = async () => {
      let pathUrl = `bills?page=${pagination.page}&limit=${pagination.pageSize}`;
      if (isCancel !== undefined && isCancel !== null) {
        pathUrl += `&cancel=${isCancel}`;
      }
      if (timeFrom) {
        pathUrl += `&timeform=${timeFrom}`;
      }
      if (timeTo) {
        pathUrl += `&timeto=${timeTo}`;
      }
      if (id) pathUrl += `&id=${id}`;
      try {
        const { data } = await axiosInstance.get(pathUrl, configAuth(accessToken));
        setBills(data.data);
        setPagination((prev) => ({ ...prev, totalItem: data.totalItem }));
      } catch (e) {}
    };
    axiosGetBill();
  }, [timeFrom, timeTo, pagination.page, pagination.pageSize, isCancel, id]);
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
        const { data } = await axiosInstance.delete(`bills/${id}`, configAuth(accessToken));
        if (data.success) {
          Swal.fire("Deleted!", data.message, "success");
          axiosgetAllDrink();
        }
      } catch (error) {}
    }
  };

  return (
    <Paper>
      <Table
        handlePageSizeChange={handlePageSizeChange}
        handlePageChange={handlePageChange}
        columns={columns}
        data={bills}
        pagination={pagination}
      >
        <Grid container>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker sx={{ mr: 1 }} onChange={handleTimeFrom} label="Time from" format="DD/MM/YYYY" />
              <DatePicker onChange={handleTimeTo} label="Time to" format="DD/MM/YYYY" />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={1} sx={{ mr: 1 }}>
            <TextField
              label="Id"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"> Bill status </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={isCancel}
                label=" Bill status "
                onChange={handleChange}
              >
                <MenuItem value={null}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={false}>Check</MenuItem>
                <MenuItem value={true}>Cancel</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Table>
    </Paper>
  );
}

export default indexBill;
