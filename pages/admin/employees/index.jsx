import { getAuthHeaders, getAuthTokenFromCookie } from "@/components/auth";
import Dashboard from "@/components/dashboard/Dashboard";
import Employee from "@/components/dashboard/Employee";

import axios from "axios";
import { useRouter } from "next/router";

import React from "react";

export async function getServerSideProps(context) {
  const token = getAuthTokenFromCookie(context.req);
  const headers = await getAuthHeaders(token);
  const res = await fetch("http://localhost:3333/users", { headers });
  const users = await res.json();
  return { props: { users } };
}

function UserList({ users }) {
  const router = useRouter();
  const handleDelete = (id) => {
    const token = getAuthTokenFromCookie();
    const headers = getAuthHeaders(token);
    axios
      .delete("http://localhost:3333/users", { data: { UserID: id }, headers }) // how to use headers with delete axios
      .then((res) => {
        alert(res.data.message);
        router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <Employee users={users} handleDelete={handleDelete} />;
}

export default UserList;
