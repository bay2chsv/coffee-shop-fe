import * as React from "react";
import axios from "axios";
import { useState } from "react";

import { accessToken, baseAPI, baseAPIImage, configAuth, configImage } from "@/utils/constant";
import DrinkForm from "@/components/dashboard/form/DrinkForm";
import { parseCookies } from "nookies";
import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";
import { Paper } from "@mui/material";

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const accessToken = cookies.accessToken;
  const res = await fetch(`${baseAPI}/categories`, configAuth(accessToken));
  const categories = await res.json();
  return { props: { categories } };
}

function createDrink({ categories }) {
  const [drink, setDrink] = useState({ name: "", price: 15000, imageUrl: "" });
  const [category, setCategory] = useState(null);

  const handleChange = async (event) => {
    const { name, value, files } = event.target;
    // Update for thumbnail preview
    if (files && files[0]) {
      const file = files[0];
      console.log(file);
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
    console.log(drinkBody);
    try {
      const { data } = await axiosInstance.post("drinks", drinkBody, configAuth(accessToken));
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
        text={"Create"}
      />
    </Paper>
  );
}

export default createDrink;
