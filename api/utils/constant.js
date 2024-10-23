import { config } from "dotenv";

config();

export let secretKey = process.env.SECRET_KEY;