import * as React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import EmployeeForm from "@/components/dashboard/form/EmployeeForm";
import { useState } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import { accessToken, baseAPI, baseAPIAuth, configAuth } from "@/utils/constant";
import axiosInstance from "@/utils/axiosInstance";

function CreateEmployee() {
  const router = useRouter();
  const [item, setItem] = useState({ userName: "", name: "", roleId: "", phoneNumber: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jsonData = {
      userName: item.UserName,
      name: item.Name,
      phoneNumber: item.PhoneNumber,
      roleId: item.RoleID,
      password: item.Password,
    };

    try {
      const { data } = await axios.post(`${baseAPIAuth}/signup`, jsonData);
    } catch {}
  };

  return (
    <Dashboard>
      <EmployeeForm item={item} setItem={setItem} handleSubmit={handleSubmit} />
    </Dashboard>
  );
}
export default CreateEmployee;
