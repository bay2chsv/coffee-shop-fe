import { formatDate } from "@/utils/formatData";
import { Box, Grid, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { format } from "date-fns";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Chart = ({ bills }) => {
  // Assuming billsData is an array of bill objects
  // Grouping data by day
  const groupedData = bills.reduce((acc, bill) => {
    const day = format(new Date(bill.createdAt), "dd/MM/yyyy");
    acc[day] = (acc[day] || 0) + parseInt(bill.total, 10);
    return acc;
  }, {});
  // Sorting dates in ascending order
  const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(a) - new Date(b));
  // Transforming sorted grouped data into an array for recharts
  const chartData = sortedDates.map((day) => ({
    day,
    total: groupedData[day],
  }));
  if (!(bills.length > 0)) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" width={400} height={250}>
        No data on this Month
      </Box>
    );
  }
  return (
    <ResponsiveContainer>
      <BarChart data={chartData} margin={{ left: 15, top: 20 }}>
        <CartesianGrid />
        <XAxis dataKey="day" />
        <YAxis color={red[400]} dataKey="total" />
        <Tooltip />
        <Bar dataKey="total" fill={green[400]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
