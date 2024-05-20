import Dashboard from "@/components/dashboard/Dashboard";
import * as React from "react";
import axios from "axios";
import { useState } from "react";

import FoodForm from "@/components/dashboard/form/FoodForm";
import { useRouter } from "next/router";
import { baseAPI, configAuth } from "@/utils/constant";

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const accessToken = cookies.accessToken;
  const { params } = context;
  const { id } = params;
  const res = await fetch(`${baseAPI}/drinks/${id}`, configAuth(accessToken));
  const food = await res.json();
  // Fetch data based on the 'id' parameter
  // Example: const employeeData = fetchEmployeeData(id);
  return {
    props: {
      food,
      // Other data you want to pass to the component
    },
  };
}

function updatefood({ food }) {
  const router = useRouter();
  const [item, setItem] = useState(food[0]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const token = getAuthTokenFromCookie();
    const headers = getAuthHeaders(token);
    const formData = new FormData();
    formData.append("food_name", item.food_name);
    formData.append("category_id", item.category_id);
    formData.append("price", item.price);
    formData.append("filename", item.image);
    formData.append("food_id", item.food_id);
    if (item.food_name && item.category_id && item.price) {
      axios.put("http://localhost:3333/food", formData, { headers }).then((res) => {
        if (res.data.message) {
          alert(res.data.message);
          router.push("/admin/foodlist");
        }
      });
    } else {
      alert("empty data");
    }
  };

  return <FoodForm item={item} setItem={setItem} handleSubmit={handleSubmit} />;
}

export default updatefood;
