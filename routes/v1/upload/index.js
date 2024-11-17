import { Router } from 'express';
import multer from 'multer';
import storage from '../../../storage/storage.js';

import { uploadImage } from '../../../controller/upload/image.js';
import verifyToken from "../../../middleware/verifyToken.js"

const router = Router();
const upload = multer({ storage })

/**
 * @openapi
 * /upload/images:
 *   post:
 *     description: Upload an image
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 */
router.post('/images', upload.single('image'), uploadImage);


export default router;

