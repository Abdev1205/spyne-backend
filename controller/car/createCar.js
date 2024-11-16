import Car from "../../models/car.js";

export const createNewCar = async (req, res) => {
  try {
    const { title, description, tags, images } = req.body;

    if (!title || !description || !tags || !images || images.length === 0) {
      return res.status(400).json({ message: 'All fields are required, including at least one image.' });
    }

    const user = req.id;

    const car = await Car.create({
      title,
      description,
      tags,
      images,
      user,
    });

    res.status(201).json({ message: 'Car created successfully', car });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create car', error: error.message });
  }
};
