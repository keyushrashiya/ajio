import express from "express";
import orderController from "../controller/orderController.js";
import orderValidate from "../validator/orderValidate.js";
const route = express.Router();

route.post("/", orderValidate.createOrdVal, orderController.createOrder);
route.patch("/:id", orderValidate.updateOrdVal, orderController.updateOrder);
route.get("/:id?", orderController.getOrder);
route.delete("/:id", orderController.deleteOrder);
export default route;
