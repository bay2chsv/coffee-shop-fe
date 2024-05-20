import React from "react";

import Product from "@/components/dashboard/Product";
import { baseAPI, configAuth } from "@/utils/constant";

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const accessToken = cookies.accessToken;
  const res = await fetch(`${baseAPI}/drinks`, configAuth(accessToken));
  const category = await res.json();
  return { props: { category } };
}
function Drink({ category }) {
  return <Product category={category} />;
}

export default Drink;
