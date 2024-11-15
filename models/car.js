import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  images: {
    type: [String],
    validate: {
      validator: function (value) {
        return value.length <= 10;
      },
      message: "You can upload up to 10 images only.",
    },
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true,
});

const Car = mongoose.model("Car", carSchema);
export default Car;
