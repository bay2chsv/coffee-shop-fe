import * as React from "react";

import { Typography } from "@mui/material";

// Generate Order Data

export default function Deposit({ bills }) {
  // Iterate over all the items in the cart and add up their prices
  console.log(bills);
  let totalAllPrice = 0;
  bills.forEach((bill) => {
    totalAllPrice += Number(bill.total);
  });
  let today = new Date();
  const date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  return (
    <React.Fragment>
      <Typography component="p" sx={{ mb: 5, color: "green" }} variant="h4">
        Deposit
      </Typography>
      <Typography component="p" variant="h4" sx={{ flex: 1 }}>
        {totalAllPrice} Đ
      </Typography>
      <Typography color="text.secondary">{date}</Typography>
    </React.Fragment>
  );
}
