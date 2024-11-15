import { Router } from 'express';

import { CreateFile, getfile, CreateFolder, getAllFolders, getFilesByUserAndFolder, getFolderById, searchFiles } from "../../controller/upload/index.js"
import { uploadFileWithThumbnail } from '../../helper/multer.js';
import verifyToken from "../../middleware/verifyToken.js"

const router = Router();

router.post('/file', verifyToken, uploadFileWithThumbnail, CreateFile);
router.get('/file', verifyToken, getfile);
router.get('/file/:fileId', verifyToken, searchFiles)

router.post('/folder', verifyToken, CreateFolder);
router.get('/folder', verifyToken, getAllFolders);
router.get('/folders/:folderId/files', verifyToken, getFilesByUserAndFolder)
router.get('/folders/:folderId', verifyToken, getFolderById)

export default router;

