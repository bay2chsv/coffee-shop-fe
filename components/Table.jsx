import { Button, Grid } from "@mui/material";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import { green, red } from "@mui/material/colors";

export default function Table({
  children,
  data,
  handlePageSizeChange,
  handlePageChange,
  columns,
  handleCreate,
  pagination,
  height,
  tableHeight,
}) {
  return (
    <Grid container justifyContent={"center"} justifyItems={"center"}>
      {children}
      <Grid item xs={3}>
        {handleCreate ? (
          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{
              background: green[300],
              ":hover": {
                background: green[600],
              },
            }}
          >
            Create
          </Button>
        ) : null}
      </Grid>
      <Grid item xs={12} maxWidth="md" sx={{ height: tableHeight || 400 }}>
        <DataGrid
          rows={data}
          columns={columns}
          paginationMode="server"
          rowCount={pagination.totalItem}
          rowHeight={height || 50}
          paginationModel={{
            page: pagination.page - 1,
            pageSize: pagination.pageSize,
          }}
          onPaginationModelChange={(newPagination) => {
            if (newPagination.pageSize !== pagination.pageSize) {
              handlePageSizeChange(newPagination.pageSize);
            }
            if (newPagination.page !== pagination.page - 1) {
              handlePageChange(newPagination.page);
            }
          }}
          pageSizeOptions={[5, 10]}
        />
      </Grid>
    </Grid>
  );
}
