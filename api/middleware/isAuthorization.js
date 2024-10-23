import { userModel, webUser } from "../model/userModel.js";

export let isAuthorization = (roles) => {
    return async(req, res, next) => {
        try {
            let id = req._id;
            let result = await userModel.findById(id);
            let tokenRole = result.role;
            if (roles.includes(tokenRole)) {
                next();
            } else {
                res.status(403).json({
                    success: false,
                    message: "USer not allowed"
                });
            }
        } catch (error) {
            res.status(403).json({
                success: false,
                message: "USer not allowed"
            });
        }

    }
}