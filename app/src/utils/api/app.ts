import axios from "axios";
import { getEnv } from "../../config/env";

const appHttp = axios.create({ baseURL: `${getEnv().BASE_API_URL}/app` })