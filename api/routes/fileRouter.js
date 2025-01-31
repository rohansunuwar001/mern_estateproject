import { Router } from "express";


import { handleMultipleFileController, handleSingleFileController } from "../controller/fileController.js";
import { upload } from "../utils/sendFile.js";


let fileRouter = Router();

fileRouter
    .route("/single")
    .post(upload.single("document"), handleSingleFileController);

fileRouter
    .route("/multiple")
    .post(upload.array("document"), handleMultipleFileController);

export default fileRouter;
