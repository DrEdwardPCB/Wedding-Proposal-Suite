import axios, { AxiosResponse } from "axios";
import { env } from "../env";
import Joi from 'joi'
import { User, Location, DestinationPartial, PasswordPartial, Passcode, Photo } from "../components/common/entityInterface";
import { baseResponse } from "../components/common/commonInterface";
const checkpointHttp = axios.create({ baseURL: `${env.REACT_APP_DATAMGMT_BASEURL}/camman` })
