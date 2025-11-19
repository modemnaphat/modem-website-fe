"use client";

import { BASE_URL } from "@/app/configs/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
  name: string;
  createdAt: string;
};

const HeaderSection: React.FC = () => {
  // const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const res = await axios.get<User[]>(`${BASE_URL}/users`);
  //       setUsers(res.data);
  //     } catch (error) {
  //       console.error("Fetch users error:", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  // console.log(users);

  return (
    <div className={`flex justify-center w-full border border-red-500`}>
      <h1
        className={`text-8xl font-thin text-center max-xl:text-6xl max-lg:text-5xl max-md:text-4xl`}
      >
        Hi. I'm Modem. <br />
        Software Developer
      </h1>
    </div>
  );
};

export default HeaderSection;
