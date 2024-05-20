import { formatDate } from "@/utils/formatData";
import { Box, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import React from "react";
function Bill({ bill, detail }) {
  const router = useRouter();
  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5">
          Bill: {bill.id} - Table: {bill.coffeeTable.name}
        </Typography>
        <Typography sx={{ color: grey[500] }}> {formatDate(bill.createdAt)}</Typography>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {detail && detail.length > 0
              ? detail.map((item, index) => (
                  <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{item.drinkName}</TableCell>
                    <TableCell align="center">{item.amount}</TableCell>
                    <TableCell align="center">{item.price} đồng </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
        <Typography align="right">Total: {bill.total} đồng </Typography>
        <Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              router.push(`./`);
            }}
            sx={{ marginRight: 1 }}
          >
            Back
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Bill;
