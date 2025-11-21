import axios from "axios";
import { BASE_URL } from "@/app/configs/constant";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
