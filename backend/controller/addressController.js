import { errorResponse, successResponse } from "../helper/apiResponse.js";
import addressModel from "../model/address.js";

class addressController {
  static createAddress = async (req, res) => {
    try {
      const doc = new addressModel({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        type: req.body.type,
        ref_user: req.user._id,
      });
      const result = await doc.save();
      return successResponse(res, 201, "address created successfully", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error);
    }
  };
  static updateAddress = async (req, res) => {
    const { id } = req.params;
    try {
      req.body.updated_at = Date.now();
      const result = await addressModel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
  static getAddress = async (req, res) => {
    try {
      const result = await addressModel.find({ ref_user: req.user._id });
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error");ð
    }
  };
  static deleteAddress = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await addressModel.findByIdAndDelete(id);
      if (result) {
        return successResponse(res, 200, "success");
      } else {
        return errorResponse(res, 400, "error");
      }
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
}
export default addressController;
