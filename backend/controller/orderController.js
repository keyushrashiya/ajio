import { errorResponse, successResponse } from "../helper/apiResponse.js";
import orderModel from "../model/order.js";
import userModel from "../model/user.js";

class orderController {
  static createOrder = async (req, res) => {
    try {
      const doc = new orderModel({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        address: {
          country: req.body.country,
          state: req.body.state,
          address: req.body.address,
          zipcode: req.body.zipcode,
          address_type: req.body.address_type,
        },
        shipping_method: req.body.shipping_method,
        payment_info: {
          name: req.body.name,
          card_number: req.body.card_number,
          expire: req.body.expire,
          cvv: req.body.cvv,
        },
        status: req.body.status,
        orders: req.body.orders,
        discount: req.body.discount,
        shipping_charge: req.body.shipping_charge,
        tax: req.body.tax,
        total: req.body.total,
        customer_id: req.user._id,
      });
      const result = await doc.save();
      return successResponse(res, 201, "order created successfully", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error);
    }
  };
  static updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await orderModel.findByIdAndUpdate(
        id,
        { $set: { status: req.body.status } },
        { new: true }
      );
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
  static getOrder = async (req, res) => {
    const { id } = req.params;
    try {
      var result;
      if (id) {
        result = await orderModel.findById(id);
        const user = await userModel
          .findById(result.customer_id)
          .select(["username", "email"]);
        result = { result, user };
      } else {
        const pagination = {
          page: req.query.page || 0,
          limit: req.query.limit || 10,
        };
        result = await orderModel
          .find()
          .limit(pagination.limit)
          .skip(pagination.page * pagination.limit);
      }
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
  static deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
      await orderModel.findByIdAndDelete(id);
      return successResponse(res, 200, "success");
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
}
export default orderController;
