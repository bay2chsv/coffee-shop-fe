import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { accessToken, baseAPI, configAuth } from "@/utils/constant";
import { Autocomplete, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import Chart from "@/components/dashboard/Chart";
import axiosInstance from "@/utils/axiosInstance";
import dynamic from "next/dynamic";
import { grey } from "@mui/material/colors";

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

function admin() {
  const now = new Date();
  const [bills, setBills] = useState([]);
  const [current, setCurrent] = useState({ year: now.getFullYear(), month: now.getMonth() + 1 });
  const currentMonth = months.find((month) => month.value === current.month);
  const axiosGetBillDashBoard = async (year, month) => {
    try {
      const { data } = await axiosInstance.get(`bills/dashboard?year=${year}&month=${month}`, configAuth(accessToken));
      setBills(data.data);
    } catch (e) {}
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    axiosGetBillDashBoard(current.year, current.month);
  }, [current]);
  return (
    <Grid container>
      <Grid item xs={8}>
        <Paper sx={{ height: 330 }}>
          <Grid container>
            <Grid item xs={2.5}>
              <Autocomplete
                disablePortal
                value={currentMonth}
                id="combo-box-demo"
                options={months}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Month" />}
                onChange={(e, newValue) => {
                  if (!newValue) setCurrent((pre) => ({ ...pre, month: now.getMonth() + 1 }));
                  else {
                    setCurrent((pre) => ({ ...pre, month: newValue.value }));
                  }
                }}
                sx={{ background: grey[100] }}
              />
            </Grid>
            <Grid item xs={2} marginLeft={3}>
              <TextField
                name="year"
                id="outlined-basic"
                value={current.year}
                label="Year"
                variant="outlined"
                onChange={handleChange}
                sx={{ background: grey[100] }}
              />
            </Grid>
          </Grid>
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

export default admin;
