import { Router } from 'express';
import multer from 'multer';
import storage from '../../../storage/storage.js';

import { uploadImage } from '../../../controller/upload/image.js';
import verifyToken from "../../../middleware/verifyToken.js"

const router = Router();
const upload = multer({ storage })

// router.post('/upload/image', verifyToken, upload.single('image') , uploadImage);
router.post('/images', upload.single('image'), uploadImage);


export default router;

