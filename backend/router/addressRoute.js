import express from "express";
import addressController from "../controller/addressController.js";
import addressValidate from "../validator/addressValidate.js";
const route = express.Router();

route.post("/", addressValidate.createAddress, addressController.createAddress);
route.patch(
  "/:id",
  addressValidate.updateAddress,
  addressController.updateAddress
);
route.get("/", addressController.getAddress);
route.delete("/:id", addressController.deleteAddress);

export default route;
