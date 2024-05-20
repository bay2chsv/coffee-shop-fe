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

  return (
    <ResponsiveContainer width="13%" height={250}>
      <BarChart data={chartData} margin={{ left: 15, top: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis color="" />
        <Tooltip />
        <Bar dataKey="total" fill="#7DCEA0" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
