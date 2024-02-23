const mongoose = require('mongoose')
const Joi = require("joi");

const ProductSchema = new mongoose.Schema({
    productname: { type: String, required: true },
    price: { type: Number, required: true },
    productimage: {type: String,required: true,}
  });
  const Product = mongoose.model("Product", ProductSchema);

  const productvalidate = (data) => {
    const schema = Joi.object({
        productname: Joi.string().required().label("Prodcutname"),
        price: Joi.number().positive().required().label("price"),

    });
  
    return schema.validate(data);
  };

  module.exports={Product,productvalidate}