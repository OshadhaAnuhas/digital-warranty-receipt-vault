import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  warrantyMonths: {
    type: Number,
    required: true,
    min: 1,
    max: 120,
  },
  storeName: {
    type: String,
    required: true,
    trim: true,
  },
  isInstallment: {
    type: Boolean,
    default: false,
  },
  totalInstallments: {
    type: Number,
    min: 0,
    max: 60,
    default: 0,
  },
  completedInstallments: {
    type: Number,
    min: 0,
    default: 0,
  },
  monthlyAmount: {
    type: Number,
    min: 0,
    default: 0,
  },
  nextDueDate: {
    type: Date,
  },
  receiptImage: {
    type: String,
    default: "",
  },
  productImage: {
  type: String,
  default: "",
},
  installmentHistory: [        // ← now INSIDE the schema
    {
      amountPaid: {
        type: Number,
        required: true,
        min: 0,
      },
      paidDate: {
        type: Date,
        default: Date.now,
      },
      note: {
        type: String,
        default: "",
      },
    },
  ],
});

export default mongoose.model("products", productSchema);