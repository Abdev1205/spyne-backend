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
    const { q } = req.query;
    let cars;

    if (q) {
      const regex = new RegExp(q, "i");
      cars = await Car.find({
        user: req.id,
        $or: [
          { title: regex },
          { description: regex },
          { tags: { $in: [regex] } }
        ]
      });
    } else {
      // If no search query, return all cars for the user
      cars = await Car.find({ user: req.id });
    }

    return res.status(200).json({
      message: "Cars fetched successfully",
      totalCars: cars.length,
      data: cars
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching cars",
      error: error.message
    });
  }
};

export {
  getSingleCar,
  getAllCar,
}