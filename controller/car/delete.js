import Car from "../../models/car.js";

const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    return res.status(201).json({ message: "Car deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message, error: error });
  }
}

const deleteCarImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;  // Get image URL from the request body
    const carId = req.params.carId;
    console.log("image url: " + imageUrl);

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Check if the image is in the car's images array
    const index = car.images.indexOf(imageUrl);
    if (index === -1) {
      return res.status(404).json({ message: "Image not found in car" });
    }

    // Remove the image from the array
    car.images.splice(index, 1);
    await car.save();

    return res.status(200).json({ message: "Car image deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message, error: error });
  }
};

export { deleteCar, deleteCarImage };