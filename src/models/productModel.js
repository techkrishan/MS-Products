const mongoose = require("mongoose");
const mongoosePaginate  = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, index: true },
    slug: { type: String, trim: true, index: true },
    description: { type: String, default: null, trim: true },
    quantity: { type: Number, default: 0 },
    is_published: { type: Boolean, default: false, index: true },
    publish_date: { type: Date, default: null, index: true },
    is_active: { type: Boolean, default: false, index: true },
    is_deleted: { type: Boolean, default: false, trim: true, index: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

productSchema.index({title: 'text', slug: 'text'});
productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("product", productSchema);
