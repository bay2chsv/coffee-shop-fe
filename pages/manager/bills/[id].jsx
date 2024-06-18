import { getAuthHeaders, getAuthTokenFromCookie } from "@/components/Profile";
import Bill from "@/components/Bill";
import Dashboard from "@/components/dashboard/Dashboard";
import { useRouter } from "next/navigation";
import React from "react";

export async function getServerSideProps(context) {
  // using ssr get param
  const token = getAuthTokenFromCookie(context.req);
  const headers = await getAuthHeaders(token);
  const { params } = context;
  const { id } = params;

  const res = await fetch(`http://localhost:3333/bill/${id}`, { headers });
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
  let total = 0;
  bill.forEach((item) => {
    total += item.quantity * item.price;
  });
  const router = useRouter();
  return <Bill bill={bill} />;
}

export default BillList;
