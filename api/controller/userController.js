import { userModel } from "../model/userModel.js";

export const updateProductController = async (req, res, next) => {
    try {
      let result = await userModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result,
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
      });
    }
  };
  
  export const deleteProductController = async (req, res, next) => {
    try {
      let result = await userModel.findByIdAndDelete(req.params.id);
      res.json({
        success: true,
        message: "Product deleted successfully",
        data: result,
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
      });
    }
  };