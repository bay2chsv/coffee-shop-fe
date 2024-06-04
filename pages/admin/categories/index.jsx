import CategoryTable from "@/components/Table/CategoryTable";
import { baseAPI, configAuth } from "@/utils/constant";
import { Paper } from "@mui/material";
import { parseCookies } from "nookies";
import React from "react";

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const accessToken = cookies.accessToken;
  const res = await fetch(`${baseAPI}/categories`, configAuth(accessToken));
  const categories = await res.json();
  return { props: { categories } };
}
function categories({ categories }) {
  return (
    <Paper sx={{ p: 1 }}>
      <CategoryTable categories={categories.data} />
    </Paper>
  );
}
export default categories;
