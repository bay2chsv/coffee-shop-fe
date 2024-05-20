import { getAuthHeaders, getAuthTokenFromCookie } from "@/components/auth";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";
import { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  TableContainer,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { accessToken, configAuth } from "@/utils/constant";
import { formatDate } from "@/utils/formatData";
import { blue, green, red } from "@mui/material/colors";
function ListBill({ children, start, end, handleDelete }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalItem, setTotalItem] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState({});

  const handleCloseDialog = (id) => {
    // Close the dialog for the specific food_i
    setIsDialogOpen((prev) => ({ ...prev, [id]: false }));
  };

  // Create an event handler to update the selected date when the DatePicker value changes.
  const handlePageChange = (event, newValue) => {
    setPage(newValue + 1);
  };
  const router = useRouter();

  const axiosGetBill = async () => {
    try {
      const { data } = await axiosInstance.get(`bills?limit=${limit}&page=${page}`, configAuth(accessToken));
      console.log(data);
      setItems(data.data);
      setPage(data.page);
      setTotalItem(data.totalItem);
      setTotalPage(data.totalPage);
    } catch (e) {}
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    axiosGetBill();
  }, [start, end, page]);

  return (
    <Grid>
      {/* <Grid> {children}</Grid> */}
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TableContainer sx={{ maxHeight: 820 }}>
          {" "}
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Id</TableCell>
                <TableCell>Table</TableCell>
                <TableCell>Total</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(items) && items.length > 0
                ? items.map((bill, index) => (
                    <TableRow key={bill.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{bill.id}</TableCell>
                      <TableCell>{bill.coffeeTable.name}</TableCell>
                      <TableCell>{bill.total} đ </TableCell>
                      <TableCell align="center">{formatDate(bill.createdAt)}</TableCell>
                      {start && end ? (
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              router.push(`./orderlist/${bill.id}`);
                            }}
                            sx={{ marginRight: 1 }}
                          >
                            Detail
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              setIsDialogOpen((prev) => ({ ...prev, [bill.id]: true }));
                            }}
                          >
                            Delete
                          </Button>{" "}
                          <Dialog
                            open={isDialogOpen[item.id] || false}
                            onClose={() => handleCloseDialog(item.id)}
                            aria-labelledby="confirmation-dialog-title"
                          >
                            <DialogTitle id="confirmation-dialog-title">Confirm Deletion</DialogTitle>
                            <DialogActions>
                              <Button onClick={() => handleCloseDialog(bill.id)} color="primary">
                                Cancel
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() => {
                                  handleDelete(bill.id);
                                }}
                                color="error"
                              >
                                Delete
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </TableCell>
                      ) : (
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              router.push(`/employee/bill/${bill.id}`);
                            }}
                            sx={{
                              textTransform: "none",
                              mr: 1,
                              background: blue[600],
                              ":hover": {
                                background: blue[200],
                              },
                            }}
                          >
                            Detail
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              textTransform: "none",
                              background: red[600],
                              ":hover": {
                                background: red[200],
                              },
                            }}
                            onClick={() => {
                              router.push(`/employee/bill/${bill.id}`);
                            }}
                          >
                            Report
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            rowsPerPageOptions={[5, 7, 10]}
            count={totalItem}
            rowsPerPage={limit}
            page={page - 1}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </Grid>
  );
}

export default ListBill;
