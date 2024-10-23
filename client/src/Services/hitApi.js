import axios from "axios";
import { baseUrl } from "../config/config.js";

export const hitApi = axios.create({
    baseURL:baseUrl,
})