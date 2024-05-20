import Bill from "@/components/Bill";
import { baseAPI, configAuth } from "@/utils/constant";
import { parseCookies } from "nookies";
import React from "react";

export async function getServerSideProps(context) {
  // using ssr get param
  const cookies = parseCookies(context);
  const accessToken = cookies.accessToken;
  const { params } = context;
  const { id } = params;
  const res = await fetch(`${baseAPI}/bills/${id}`, configAuth(accessToken));
  const bill = await res.json();
  // Fetch data based on the 'id' parameter
  // Example: const employeeData = fetchEmployeeData(id);
  return {
    props: {
      bill,
      // Other data you want to pass to the component
    },
  };
}

function BillList({ bill }) {
  console.log(bill.data);
  return <Bill bill={bill.data.bill} detail={bill.data.billDetail} />;
}

export default BillList;
