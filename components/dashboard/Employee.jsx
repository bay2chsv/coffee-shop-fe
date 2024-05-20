import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Paper,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

function Employee({ users, handleDelete }) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState({});

  const handleCloseDialog = (UserID) => {
    // Close the dialog for the specific food_id
    console.log(isDialogOpen);
    setIsDialogOpen((prev) => ({ ...prev, [UserID]: false }));
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>PhoneNumber</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(users) && users.length > 0
              ? users.map((user, index) => (
                  <TableRow key={user.UserID} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{user.UserName}</TableCell>
                    <TableCell>{user.Name}</TableCell>
                    <TableCell>{user.PhoneNumber}</TableCell>
                    <TableCell>{user.RoleName}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          router.push(`employeelist/${user.UserID}`);
                        }}
                        sx={{ marginRight: 1 }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          setIsDialogOpen((prev) => ({ ...prev, [user.UserID]: true }));
                        }}
                      >
                        Delete
                      </Button>
                      <Dialog
                        open={isDialogOpen[user.UserID] || false}
                        onClose={() => handleCloseDialog(user.UserID)}
                        aria-labelledby="confirmation-dialog-title"
                      >
                        <DialogTitle id="confirmation-dialog-title">Confirm Deletion</DialogTitle>
                        <DialogActions>
                          <Button autoFocus onClick={() => handleCloseDialog(user.UserID)} color="primary">
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => {
                              handleDelete(user.UserID);
                            }}
                            color="error"
                            autoFocus
                          >
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default Employee;
