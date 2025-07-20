import { treaty } from "@elysiajs/eden";
import { ApiType } from "../../server/src";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

const api = treaty<ApiType>(SERVER_URL);


export default api