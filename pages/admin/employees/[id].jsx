import * as React from "react";
import { useRouter } from "next/router";
import { getAuthHeaders, getAuthTokenFromCookie } from "@/components/auth";
import axios from "axios";

import EmployeeForm from "@/components/dashboard/form/EmployeeForm";
import { useState } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
// TODO remove, this demo shouldn't need to reset the theme.

export async function getServerSideProps(context) {
  // using ssr get param
  const token = getAuthTokenFromCookie(context.req);
  const headers = await getAuthHeaders(token);
  const { params } = context;
  const { id } = params;

  const res = await fetch(`http://localhost:3333/users/${id}`, { headers });
  const emplyee = await res.json();
  // Fetch data based on the 'id' parameter
  // Example: const employeeData = fetchEmployeeData(id);

  return {
    props: {
      emplyee,
      // Other data you want to pass to the component
    },
  };
}

function Update({ emplyee }) {
  const router = useRouter();
  const [item, setItem] = useState(emplyee[0]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token = getAuthTokenFromCookie();
    const headers = getAuthHeaders(token);
    const jsonData = {
      ...item,
      Password: data.get("password"),
    };

    if (jsonData.UserName && jsonData.Name && jsonData.PhoneNumber && jsonData.Password && jsonData.RoleID) {
      console.log(jsonData);
      axios
        .put("http://localhost:3333/users", jsonData, { headers })
        .then((res) => {
          if (res.data.message) {
            alert("successful");
            router.push("/admin/employeelist");
          } else {
            alert("UserName or PhoneNumber is Deplicate");
          }
        })
        .catch(() => {
          alert("error");
        });
    }
  };

  return <EmployeeForm item={item} setItem={setItem} handleSubmit={handleSubmit} />;
}
export default Update;
