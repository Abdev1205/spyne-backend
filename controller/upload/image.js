const uploadImage = async (req, res) => {
  try {
    const fileData = req?.file;
    if (!fileData) {
      return res.status(500).json({ message: 'Image Upload failed' });
    }
    res.json({ message: "File Uploaded Successfully", data: fileData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', error: error });
  }
}

export {
  uploadImage
}