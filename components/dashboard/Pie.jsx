import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box } from "@mui/material";

export default function Pie({ bills }) {
  const getTimeRange = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    if (hours >= 7 && hours < 12) {
      return "7:00-12:00";
    } else if (hours >= 13 && hours < 17) {
      return "13:00-17:00";
    } else if (hours >= 18 && hours < 23) {
      return "18:00-23:00";
    } else {
      return "Other";
    }
  };
  const calculateProfits = (data) => {
    const timeRanges = {
      "7:00-12:00": 0,
      "13:00-17:00": 0,
      "18:00-23:00": 0,
    };
    data.forEach((entry) => {
      const range = getTimeRange(entry.createdAt);
      if (timeRanges[range] !== undefined && !entry.isCancel) {
        timeRanges[range] += entry.total;
      }
    });

    return timeRanges;
  };

  const timeRangesProfits = calculateProfits(bills);

  const chartData = [
    { value: timeRangesProfits["7:00-12:00"], label: "7:00-12:00" },
    { value: timeRangesProfits["13:00-17:00"], label: "13:00-17:00" },
    { value: timeRangesProfits["18:00-23:00"], label: "18:00-23:00" },
  ];
  if (!(bills.length > 0)) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" width={400} height={250}>
        No data on this Month
      </Box>
    );
  }
  return (
    <PieChart
      series={[
        {
          data: chartData,
        },
      ]}
      width={400}
      height={200}
    />
  );
}
