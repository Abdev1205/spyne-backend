import Car from "../../models/car.js";

const getSingleCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).send("Car not found");
    return res.status(200).json({ message: "Car fetched successfully", data: car });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching car", error: error });
  }
}

const getAllCar = async (req, res) => {
  try {
    // const cars = await Car.find({ user: req.id });
    const cars = await Car.find({ user: "67375e87bcb08ed4cad341f6" });
    return res.status(200).json({ message: "All Cars fetched successfully", "Total car": cars.length, data: cars });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching cars", error: error });
  }
}

export {
  getSingleCar,
  getAllCar,
}