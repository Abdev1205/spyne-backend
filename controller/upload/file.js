import File from "../../models/file.js";
import mongoose from "mongoose";

const CreateFile = async (req, res) => {
  try {
    const { filename, folder } = req.body;
    const userID = req.id;
    const userFilePath = req.file.path;
    const thumbnailPath = req.file.thumbnailPath;

    // Debugging logs
    console.log("body:", req.body);
    console.log("userFilePath:", userFilePath);

    const newFile = new File({
      name: filename,
      path: userFilePath,
      user: userID,
      folder: folder && folder !== 'undefined' ? folder : null,
      thumbnail: thumbnailPath
    });

    const savedFile = await newFile.save();
    return res.status(201).json({ success: true, file: savedFile });
  } catch (error) {
    console.log("error:", error);
    return res.status(400).json({ error: error.message });
  }
};

const getfile = async (req, res) => {
  try {
    const userId = req.id;
    const { search, folderId } = req.query; // Get search and folderId from query parameters

    // Build the query object
    let query = { user: userId };

    if (folderId) {
      query.folder = folderId;
    } else {
      query.folder = null; // Only get files that are not in any folder if folderId is not provided
    }

    if (search) {
      query.name = { $regex: search, $options: "i" }; // Case-insensitive regex search on the file name
    }

    const files = await File.find(query);
    return res.status(200).json({ success: true, files });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



const searchFiles = async (req, res) => {
  try {
    const userId = req.id;
    const folderId = req.body.folderId;
    const searchTerm = req.query.q; // Assuming the search term is passed as a query parameter

    const files = await File.find({
      user: mongoose.Types.ObjectId(userId),
      folder: folderId || null, // Assuming the folder ID is optional
      name: { $regex: searchTerm, $options: "i" } // Case-insensitive regex search
    });

    return res.status(200).json({ success: true, files });
  } catch (error) {
    console.log("error:", error);
    return res.status(400).json({ error: error.message });
  }
};

export {
  CreateFile, getfile, searchFiles
}