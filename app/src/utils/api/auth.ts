import axios from "axios";
import { getEnv } from "../../config/env";

const authHttp = axios.create({ baseURL: `${getEnv().BASE_API_URL}/auth` })