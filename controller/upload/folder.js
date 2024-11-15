import Folder from "../../models/folder.js";
import File from "../../models/file.js";
import mongoose from "mongoose";

const CreateFolder = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const user = req.id;

    const newFolder = new Folder({
      name,
      user,
      parent: parent || null // Assuming parent folder ID is optional
    });

    const savedFolder = await newFolder.save();
    return res.status(201).json({ success: true, folder: savedFolder });
  } catch (error) {
    console.log("error:", error);
    return res.status(400).json({ error: error.message });
  }
};

const getAllFolders = async (req, res) => {
  try {
    let userId = req.id;
    let folders = await Folder.find({ user: userId });
    return res.status(200).json({ success: true, folders: folders });
  } catch (error) {
    console.log("error:", error);
    return res.status(400).json({ error: error.message });
  }
}

const getFolderById = async (req, res) => {
  try {
    let userId = req.id;
    let folderId = req.params.folderId;
    let folder = await Folder.findById(folderId);
    return res.status(200).json({ success: true, folder: folder });
  } catch (error) {
    console.log("error:", error);
    return res.status(400).json({ error: error.message });
  }
}

const getFilesByUserAndFolder = async (req, res) => {
  try {
    const userId = req.id;
    const folderId = req.params.folderId;

    const files = await File.find({ user: userId, folder: folderId });
    return res.status(200).json({ success: true, files });
  } catch (error) {
    console.log("error:", error);
    return res.status(400).json({ error: error.message });
  }
};

export {
  CreateFolder, getAllFolders, getFilesByUserAndFolder, getFolderById
}