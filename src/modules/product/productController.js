import slugify from "slugify";
import { productModel } from "../../../database/models/productModel.js";
import { catchError } from "../../middleware/catchError.js";

const addProduct = catchError(async (req, res, next) => {
  if (req.body.title) req.body.slug = slugify(req.body.title);
  if (req.files.imgCover) req.body.imgCover = req.files.imgCover[0].filename;
  if (req.files.images)
    req.body.images = req.files.images.map((el) => el.filename);
  const product = new productModel(req.body);
  await product.save();
  res.json({ message: "success", product });
});

const getProducts = catchError(async (req, res, next) => {
  let objFilter = { ...req.query };
  objFilter = JSON.stringify(objFilter);
  objFilter = objFilter.replace(/(gte|gt|lte|lt)/g, (match) => "$" + match);
  objFilter = JSON.parse(objFilter);
  let execluded = ["page", "sort", "keyword", "fields"];
  execluded.forEach((val) => delete objFilter[val]);
  let mongooseQuery = productModel.find(objFilter);

  if (req.query.page <= 0) req.query.page = 1;
  let pageNumber = req.query.page * 1 || 1;
  let pageLimit = 2;
  let skip = (pageNumber - 1) * pageLimit;
  mongooseQuery = mongooseQuery.skip(skip).limit(pageLimit);

  if (req.query.sort) {
    let sortBy = req.query.sort.split(",").join(" ");
    mongooseQuery.sort(sortBy);
  }

  if (req.query.fields) {
    let fields = req.query.fields.split(",").join(" ");
    mongooseQuery.select(fields);
  }

  let products = await mongooseQuery;
  res.json({ message: "success", page: pageNumber, products });
});
const getSingleProduct = catchError(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);
  res.json({ message: "success", product });
});
const updateProduct = catchError(async (req, res, next) => {
  if (req.files.imgCover) req.body.imgCover = req.files.imgCover[0];
  if (req.files.images)
    req.body.images = req.files.images.map((el) => el.filename);
  if (req.body.name) req.body.slug = slugify(req.body.name);
  const product = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  product && res.json({ message: "success", product });
  !product && res.status(404).json({ message: "NOT Found" });
});
const deleteProduct = catchError(async (req, res, next) => {
  const product = await productModel.findByIdAndDelete(req.params.id);
  product && res.json({ message: "success", product });
  !product && res.status(404).json({ message: "NOT Found" });
});
export {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
//------------------------------------------------------------
/*if (req.query.page <= 0) req.query.page = 1;
let pageNumber = req.query.page * 1 || 1;
let pageLimit = 2;
let skip = (pageNumber - 1) * pageLimit;
let products = await productModel.find().skip(skip).limit(pageLimit);
res.json({ message: "success", page: pageNumber, products });*/
//------------------------------------------------------
