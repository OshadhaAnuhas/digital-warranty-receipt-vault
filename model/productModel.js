import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },

  brand: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  purchaseDate: {
    type: Date,
    required: true,
  },

  warrantyMonths: {
    type: Number,
    required: true,
  },

  storeName: {
    type: String,
    required: true,
  },

  receiptImage: {
    type: String,
    default: "",
  },

  isInstallment: {
    type: Boolean,
    default: false,
  },

  totalInstallments: {
    type: Number,
    default: 0,
  },

  completedInstallments: {
    type: Number,
    default: 0,
  },

  monthlyAmount: {
    type: Number,
    default: 0,
  },

  nextDueDate: {
    type: Date,
  },
});

export default mongoose.model("products", productSchema);