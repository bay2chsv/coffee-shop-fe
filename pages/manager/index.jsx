import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { accessToken, baseAPI, configAuth } from "@/utils/constant";
import { Autocomplete, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import Chart from "@/components/dashboard/Chart";
import axiosInstance from "@/utils/axiosInstance";
import dynamic from "next/dynamic";
import { green, grey, red } from "@mui/material/colors";

const Pie = dynamic(
  () => {
    return import("@/components/dashboard/Pie");
  },
  { ssr: false }
);

const months = [
  { value: 1, name: "January" },
  { value: 2, name: "February" },
  { value: 3, name: "March" },
  { value: 4, name: "April" },
  { value: 5, name: "May" },
  { value: 6, name: "June" },
  { value: 7, name: "July" },
  { value: 8, name: "August" },
  { value: 9, name: "September" },
  { value: 10, name: "October" },
  { value: 11, name: "November" },
  { value: 12, name: "December" },
];

function manager() {
  const now = new Date();
  const [bills, setBills] = useState([]);
  const current = { year: now.getFullYear(), month: now.getMonth() + 1 };

  const axiosGetBillDashBoard = async (year, month) => {
    try {
      const { data } = await axiosInstance.get(`bills/dashboard?year=${year}&month=${month}`, configAuth(accessToken));
      setBills(data.data);
    } catch (e) {}
  };

  useEffect(() => {
    axiosGetBillDashBoard(current.year, current.month);
  }, [current.year, current.month]);
  const isToday = (timestamp) => {
    const today = new Date();
    const date = new Date(timestamp);
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  // Filter bills to get only today's bills
  const todayBills = bills.filter((bill) => isToday(bill.createdAt));

  // Calculate total amount for today's bills
  const profitPerDay = todayBills.reduce((total, bill) => total + bill.total, 0);
  let countCancelBill = 0;
  bills.forEach((bill) => {
    if (bill.isCancel) countCancelBill++;
  });
  return (
    <Grid container>
      <Grid container spacing={1}>
        {" "}
        <Grid item xs={6} sx={{ mb: 2 }}>
          <Paper
            sx={{
              height: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: red[200],
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
              Request cancel bill today
            </Typography>
            <Typography variant="h4" sx={{ color: "white" }}>
              {countCancelBill}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sx={{ mb: 2 }}>
          <Paper
            sx={{
              height: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: green[200],
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
              Profit today
            </Typography>
            <Typography variant="h4" sx={{ color: "white" }}>
              {profitPerDay} đ
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Paper sx={{ height: 330 }}>
          <Chart bills={bills} />
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{ height: 330, alignContent: "center" }}>
          <Pie bills={bills} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default manager;
