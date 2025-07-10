import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../../utils/appError.js";
const fileUpload = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) cb(null, true);
    else cb(new AppError("img only", 401), false);
  };
  const upload = multer({ storage, fileFilter });
  return upload;
};
const uploadSingleFile = (fieldname) => fileUpload().single(fieldname);
const uploadArryOfFiles = (fieldname) => fileUpload().array(fieldname);
const uploadArryOfFields = (fields) => fileUpload().fields(fields);
export { uploadSingleFile, uploadArryOfFiles, uploadArryOfFields };
