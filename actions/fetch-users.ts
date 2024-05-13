"use server";

import { getAllUsers } from "@/data/user";

export const fetchUser = async () => {
  
  const users = await getAllUsers();

  return users;

};

