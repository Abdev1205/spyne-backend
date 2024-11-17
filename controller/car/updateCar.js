import Car from "../../models/car.js";

export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tags, images } = req.body;

    // Check if car exists
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Update fields only if they are provided
    if (title !== undefined) car.title = title;
    if (description !== undefined) car.description = description;
    if (tags !== undefined) car.tags = tags;
    if (images !== undefined) car.images = images;

    const updatedCar = await car.save();

    res.status(200).json({ message: "Car updated successfully", car: updatedCar });
  } catch (error) {
    res.status(500).json({ message: "Failed to update car", error: error.message });
  }
};
