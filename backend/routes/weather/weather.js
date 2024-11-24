import bodyParser from "body-parser";

import express from "express";
import axios from "axios";
import requireLogin from "../../middlewares/requireLogin.js";
import weatherControler from "./weather.controler.js";

var jsonParser = bodyParser.json();




const router = express.Router();



router.get("/current-forecasts" ,  weatherControler.get_current_forecasts)









export default router