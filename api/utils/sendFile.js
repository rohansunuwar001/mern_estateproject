import multer from "multer";
import path from "path";

/* The maximum file size in bytes
1kb is equals to 1024 bytes */

let limits = {
    fileSize:  1024 * 1024 * 10, // 
};


/* ./ means root(main) staticFolder
note: you must make public folder manually or it will throw error like no such file path or */
// destination: give the folder location where the file is placed

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let staticFolder = "./api/public";
        cb(null, staticFolder)
    },

    // anyfile has key and value 
    // key is callled field name and value is called original name.
    // filename give the name(title) of the file 

    filename: (req, file, cb) => {
        let filename = Date.now() + "-" + file.originalname;
        cb(null, filename);
    }
});

let fileFilter = (req, file, cb) => {
    let validExtensions = [
        ".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG", ".svg", ".docx", ".doc", ".mp4", ".mp3", ".pdf"
    ]


    let originalName = file.originalname;

    // note: path module is inbuilt module of node js. we have to import it manually if it is not import automatically

    let originalExtension = path.extname(originalName);
    let isValidExtension = validExtensions.includes(originalExtension);

    if (isValidExtension) {
        cb(null, true);

        // true means pass such type of file 
        // note: null represent error since there is no  error thus error is null 

    } else {
        // false means don't pass 
        cb(new Error("File is not supported"), false)
    }
};

export let upload = multer({

    // we define the location in the server where the file is store and control the filename
    storage: storage,

    // filter file according to the extension 
    fileFilter: fileFilter,

    // filter file according to the size
    limits: limits,
})