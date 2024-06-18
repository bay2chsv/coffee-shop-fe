import AccountForm from "@/components/dashboard/form/AccountForm";
import axiosInstance from "@/utils/axiosInstance";
import { accessToken, configAuth } from "@/utils/constant";
import { Paper } from "@mui/material";
import React, { useState } from "react";

function createAccount() {
  const [account, setAccount] = useState();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCreate = async () => {
    try {
      const { data } = await axiosInstance.post("accounts", account, configAuth(accessToken));
    } catch (e) {}
  };
  return (
    <Paper>
      <AccountForm
        handleChange={handleChange}
        handleCreate={handleCreate}
        showPassword={showPassword}
        handleCheckboxChange={handleCheckboxChange}
      />
    </Paper>
  );
}

export default createAccount;
