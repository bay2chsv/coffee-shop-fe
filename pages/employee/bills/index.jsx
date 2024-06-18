import Table from "@/components/Table";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { accessToken, configAuth } from "@/utils/constant";
import { DataGrid } from "@mui/x-data-grid";
import { formatDate } from "@/utils/formatData";
import Swal from "sweetalert2";
function indexBill() {
  const [bills, setBills] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 5, totalItem: 0 });
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
  const handleCancel = async (id, isCancel) => {
    const reult = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to  ${isCancel ? "revoke" : "sent request to cancel"} this bill?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    });
    if (reult.isConfirmed) {
      try {
        const { data } = await axiosInstance.patch(`bills/${id}?cancel=${!isCancel}`, {}, configAuth(accessToken));
        axiosGetBill();
      } catch (e) {}
      // User clicked confirm button
      // Perform cancel request action here
      // For example, call a function to handle cancel request
    }
  };
  const axiosGetBill = async () => {
    let pathUrl = `bills?page=${pagination.page}&limit=${pagination.pageSize}`;
    try {
      const { data } = await axiosInstance.get(pathUrl, configAuth(accessToken));
      console.log(data);
      setBills(data.data);
      setPagination((prev) => ({ ...prev, totalItem: data.totalItem }));
    } catch (e) {}
  };
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "coffeeTable",
      headerName: "Bill status",
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
          {params.row.isCancel ? (
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => handleCancel(params.row.id, params.row.isCancel)}
              variant="contained"
              color="error"
              size="small"
            >
              Revoke cancel
            </Button>
          ) : (
            <Button
              sx={{ textTransform: "none" }}
              disabled={params.row.isCancel}
              onClick={() => handleCancel(params.row.id, params.row.isCancel)}
              variant="contained"
              color="warning"
              size="small"
            >
              Request cancel
            </Button>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    axiosGetBill();
  }, [pagination.page, pagination.pageSize]);
  return (
    <Table
      handlePageSizeChange={handlePageSizeChange}
      handlePageChange={handlePageChange}
      columns={columns}
      pagination={pagination}
      data={bills}
    />
  );
}

export default indexBill;
