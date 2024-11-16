import { Router } from 'express';
import { createNewCar } from '../../../controller/car/createCar.js';
import verifyToken from '../../../middleware/verifyToken.js';
import { getAllCar, getSingleCar } from '../../../controller/car/getCar.js';
import { deleteCar, deleteCarImage } from '../../../controller/car/delete.js';


const router = Router();

router.get('/:id', getSingleCar);
router.get('/', getAllCar);
router.delete('/:id', deleteCar);
router.patch('/:carId/image', deleteCarImage);
router.post('/', verifyToken, createNewCar);


export default router;
