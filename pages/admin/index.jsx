import Dashboard from "@/components/dashboard/Dashboard";
import Orders from "@/components/dashboard/Orders";
import Deposit from "@/components/dashboard/Deposite";
import { Grid, Paper } from "@mui/material";
import React from "react";
import Chart from "@/components/dashboard/Chart";
import { parseCookies } from "nookies";

// export async function getServerSideProps(context) {
//  
//     const cookies = parseCookies(context);
//     const accessToken = cookies.accessToken;
//     const res = await fetch("http://localhost:3333/bill", {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     const respone = await fetch("http://localhost:3333/bill/all", {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     const bills = await res.json();

//     const all = await respone.json();
//     return { props: { bills, all } 
//  
// }

function admin({ bills, all }) {
  return <></>;
}

export default admin;
