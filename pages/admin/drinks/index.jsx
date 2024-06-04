import React from "react";

import DrinkTable from "@/components/Table/DrinkTable";
import { baseAPI, configAuth } from "@/utils/constant";
import { parseCookies } from "nookies";
import { Paper } from "@mui/material";

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const accessToken = cookies.accessToken;
  const res = await fetch(`${baseAPI}/categories`, configAuth(accessToken));
  const categories = await res.json();
  return { props: { categories } };
}
function Drink({ categories }) {
  return (
    <Paper>
      <DrinkTable categories={categories.data} />
    </Paper>
  );
}

export default Drink;
