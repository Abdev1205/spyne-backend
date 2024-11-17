import { Router } from 'express';
import { createNewCar } from '../../../controller/car/createCar.js';
import verifyToken from '../../../middleware/verifyToken.js';
import { getAllCar, getSingleCar } from '../../../controller/car/getCar.js';
import { deleteCar, deleteCarImage } from '../../../controller/car/delete.js';
import { updateCar } from '../../../controller/car/updateCar.js';


const router = Router();

/**
 * @openapi
 * /car/{id}:
 *   get:
 *     description: Get details of a specific car
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the car to fetch
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car data
 */
router.get('/:id', verifyToken, getSingleCar);

/**
 * @openapi
 * /car:
 *   get:
 *     description: Get all cars
 *     responses:
 *       200:
 *         description: List of cars
 */
router.get('/', verifyToken, getAllCar);

/**
 * @openapi
 * /car/{id}:
 *   delete:
 *     description: Delete a car by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the car to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car deleted successfully
 */
router.delete('/:id', verifyToken, deleteCar);

/**
 * @openapi
 * /car/{id}:
 *   patch:
 *     description: Update car details by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the car to update
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car updated successfully
 */
router.patch('/:id', verifyToken, updateCar);

/**
 * @openapi
 * /car:
 *   post:
 *     description: Create a new car
 *     responses:
 *       201:
 *         description: Car created successfully
 */
router.post('/', verifyToken, createNewCar);


export default router;
