// import path from 'path';
// import { fileURLToPath } from 'url';
// import multer from 'multer';
// import sharp from 'sharp';
// import fs from 'fs';
// import dotenv from 'dotenv';

// dotenv.config();

// // Get the directory name of the current module file
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const uploadPath = path.join(__dirname, '../uploads');
// const thumbnailsPath = path.join(uploadPath, 'thumbnails');

// // Ensure the directories exist
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath, { recursive: true });
// }

// if (!fs.existsSync(thumbnailsPath)) {
//   fs.mkdirSync(thumbnailsPath, { recursive: true });
// }

// // multer configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname;
//     cb(null, uniqueName);
//   }
// });

// // Filter to accept only image files
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Unsupported file type. Only image files are allowed.'), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// const generateThumbnail = async (filePath, filename) => {
//   const thumbnailFilename = `thumbnail-${filename}.png`;
//   const thumbnailRelativePath = path.join('thumbnails', thumbnailFilename);
//   const thumbnailFullPath = path.join(thumbnailsPath, thumbnailFilename);

//   try {
//     await sharp(filePath)
//       .resize(500)
//       .toFile(thumbnailFullPath);

//     return thumbnailRelativePath;
//   } catch (error) {
//     console.error('Error generating thumbnail:', error.message);
//     throw error;
//   }
// };

// const uploadFileWithThumbnail = (req, res, next) => {
//   upload.single('file')(req, res, async (err) => {
//     if (err) {
//       console.error('Multer error:', err.message);
//       return res.status(400).json({ error: err.message });
//     }

//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     try {
//       const { path: fullPath, filename } = req.file;
//       const relativePath = path.relative(uploadPath, fullPath); // Store relative path
//       const thumbnailPath = await generateThumbnail(fullPath, filename);
//       req.file.path = "uploads/" + relativePath; // Update path to relative path
//       req.file.thumbnailPath = "uploads/" + thumbnailPath; // Add thumbnail path to req.file object
//       next();
//     } catch (error) {
//       return res.status(500).json({ error: 'Failed to generate thumbnail' });
//     }
//   });
// };

// export { uploadFileWithThumbnail };
