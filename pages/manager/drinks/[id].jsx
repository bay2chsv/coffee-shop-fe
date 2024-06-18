import Dashboard from "@/components/dashboard/Dashboard";
import * as React from "react";
import axios from "axios";
import { useState } from "react";

import { accessToken, baseAPI, configAuth } from "@/utils/constant";
import { parseCookies } from "nookies";
import DrinkForm from "@/components/dashboard/form/DrinkForm";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { Paper } from "@mui/material";

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const accessToken = cookies.accessToken;
  const { params } = context;
  const { id } = params;
  const res = await fetch(`${baseAPI}/drinks/${id}`, configAuth(accessToken));
  if (res.status === 400) {
    // Redirect to a 404 page
    return {
      redirect: {
        destination: "/404", // The path to your 404 page
        permanent: false,
      },
    };
  }
  const drinkAPI = await res.json();

  const res1 = await fetch(`${baseAPI}/categories`, configAuth(accessToken));
  const categories = await res1.json();
  // Fetch data based on the 'id' parameter
  // Example: const employeeData = fetchEmployeeData(id);
  return {
    props: {
      drinkAPI,
      categories,
      // Other data you want to pass to the component
    },
  };
}

function updatefood({ drinkAPI, categories }) {
  const router = useRouter();
  const { name, price, imageUrl } = drinkAPI.data;
  const [drink, setDrink] = useState({ name: name, price: price, imageUrl: imageUrl });
  const [category, setCategory] = useState(drinkAPI.data.category);
  const handleChange = async (event) => {
    const { name, value, files } = event.target;
    // Update for thumbnail preview
    if (files && files[0]) {
      const file = files[0];
      try {
        const { data } = await axios.post(`${baseAPIImage}/upload`, { file: file }, configImage(accessToken));
        console.log(data);
        setDrink((prev) => ({
          ...prev,
          imageUrl: data.imageUrl,
        }));
        Swal.fire({
          title: "Success!",
          text: `upload image successfully`,
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: `${error.response.data.message}`,
          icon: "error",
        });
      }
    } else {
      setDrink((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const drinkBody = {
      name: drink.name,
      price: Number(drink.price),
      imageUrl: drink.imageUrl,
      categoryId: category.id,
    };

    try {
      const { data } = await axiosInstance.put(`drinks/${router.query.id}`, drinkBody, configAuth(accessToken));
      router.back();
    } catch (e) {}
  };

  return (
    <Paper>
      <DrinkForm
        categories={categories.data}
        handleChange={handleChange}
        handleCategoryChange={handleCategoryChange}
        drink={drink}
        category={category}
        handleSubmit={handleSubmit}
        text={"Upadte"}
      />
    </Paper>
  );
}

export default updatefood;
