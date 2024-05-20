import * as React from "react";
import axios from "axios";
import { useState } from "react";
import { getAuthHeaders, getAuthTokenFromCookie } from "@/components/auth";
import { useRouter } from "next/router";
import FoodForm from "@/components/dashboard/form/FoodForm";

function addfood() {
  const router = useRouter();
  const [item, setItem] = useState({ food_name: "", category_id: "", price: 20000, image: "" });
  const handleSubmit = (event) => {
    event.preventDefault();
    const token = getAuthTokenFromCookie();
    const headers = getAuthHeaders(token);
    const formData = new FormData();
    formData.append("food_name", item.food_name);
    formData.append("category_id", item.category_id);
    formData.append("price", item.price);
    formData.append("image", item.image);
    if (item.food_name && item.category_id && item.price && item.image) {
      axios.post("http://localhost:3333/food", formData, { headers }).then((res) => {
        if (res.data.message) {
          alert(res.data.message);
          router.push("/admin/foodlist");
        }
        if (res.data.err) {
          alert(res.data.err);
        }
      });
    } else {
      alert("empty data");
    }
  };

  return <FoodForm item={item} handleSubmit={handleSubmit} />;
}

export default addfood;
