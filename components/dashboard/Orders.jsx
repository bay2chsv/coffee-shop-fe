import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";
import { Typography } from "@mui/material";

export default function Orders({ bills }) {
  const limitedBills = Array.isArray(bills) ? bills.slice(0, 3) : [];
  return (
    <React.Fragment>
      <Typography variant="h6"> Order today</Typography>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>table</TableCell>
            <TableCell>total</TableCell>
            <TableCell align="center">date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(bills) && bills.length > 0
            ? limitedBills.map((bill, index) => (
                <TableRow key={bill.bill_id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{bill.bill_id}</TableCell>
                  <TableCell>{bill.table_id}</TableCell>
                  <TableCell>{bill.total} đ </TableCell>
                  <TableCell align="center">{format(new Date(bill.bill_date), "  HH:mm:ss dd-MM-yyyy")}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
      <Link color="primary" href="/admin/orderlist" sx={{ ml: 1, mt: 1 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
