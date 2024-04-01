const Trainer = require("../models/trainerModel");
const mongoose = require("mongoose");
const fs = require("fs");
const sharp = require('sharp');


// get all Members

const gettrainers = async (req, res) => {
  /* const user_id = res.user._id */

  const trainers = await Trainer.find({}).sort({ createdAt: -1 });

  res.status(200).json(trainers);
};
//get one Trainer
const gettrainer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such Trainer" });
  }

  const trainer = await Trainer.findById(id);

  if (!trainer) {
    return res.status(400).json({ error: "no such Trainer" });
  }

  res.status(200).json(trainer);
};



// create a trainers
const createtrainer = async (req, res) => {
  const {
    name,
    phone,
    email,
    dob,
    center,
    joindate,
    gender,
    martialstatus,
  
    
  } = req.body;
  /* const userid = res.user._id */
  const { file } = req;





  if (!file) {
    // Check if an image file was not provided
    return res.status(400).json({ error: "Image (img) is required" });
  }
  let emptyField = [];

  if (!name) {
    emptyField.push("name");
  }
  if (!phone) {
    emptyField.push("phone");
  }
  if (!email) {
    emptyField.push("email");
  }
  if (!dob) {
    emptyField.push("dob");
  }
  if (!center) {
    emptyField.push("center");
  }
  if (!joindate) {
    emptyField.push("joindate");
  }
  if (!gender) {
    emptyField.push("gender");
  }
  if (!martialstatus) {
    emptyField.push("martialstatus");
  }
  if (emptyField.length > 0) {
    return res
      .status(400)
      .json({ error: "please fill in the all fields", emptyField });
  }

  // doc to DB
  try {
    const compressedImage = await sharp(file.buffer)
      .resize({ width: 800 }) // Adjust the dimensions as needed
      .jpeg({ quality: 80 }) // Adjust the quality as needed
      .toBuffer();

    // Check if the compressed image is under 1MB
    if (compressedImage.length > 1000000) {
      return res.status(400).json({ error: "Image size exceeds 1MB after compression" });
    }

    // Save the compressed image to the "uploads" folder
    const filename = `trainer_${Date.now()}`;
    await sharp(compressedImage).toFile(`uploads/${filename}`);
    /* const user_id = res.user._id */
    const trainer = await Trainer.create({
      name,
      phone,
      email,
      dob,
      center,
      joindate,
      gender,
      martialstatus,
      img:filename,
    });
    res.status(200).json({ trainer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Trainer
const deletetrainer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such Trainer" });
  }
  const trainer = await Trainer.findById(id);
  

  if (!trainer) {
    return res.status(400).json({ error: "no such Trainer" });
  }

   // Delete the image file associated with the trainer
   const imagePath = `uploads/${trainer.img}`;
   if (fs.existsSync(imagePath)) {
     fs.unlinkSync(imagePath);
   }
   await Trainer.findByIdAndDelete(id);

  res.status(200).json(trainer);
};

// update a Trainer
const updatetrainer = async (req, res) => {
  const { id } = req.params;
 let filename;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such Trainer" });
  }

  const trainer = await Trainer.findById(id);


  if (!trainer) {
    return res.status(400).json({ error: "no such Trainer" });
  }

  // Remove the old image if a new image is provided
  if (req.file) {
    const oldImagePath = `uploads/${trainer.img}`;
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }

    const compressedImage = await sharp(req.file.buffer)
    .resize({ width: 800 })
    .jpeg({ quality: 80 })
    .toBuffer();

  // Check if the compressed image is under 1MB
  if (compressedImage.length > 1000000) {
    return res.status(400).json({ error: "Image size exceeds 1MB after compression" });
  }

  // Save the compressed image to the "uploads" folder
  filename = `trainer_${Date.now()}`;
  await sharp(compressedImage).toFile(`uploads/${filename}`);

  }

  

  const updatedTrainer = {
    ...req.body,
    img: req.file ? filename : trainer.img, // Keep the old image if a new image is not provided
  };

  const updatedTrainerDoc = await Trainer.findByIdAndUpdate(id, updatedTrainer, { new: true });

  if (!updatedTrainerDoc) {
    return res.status(400).json({ error: "Failed to update Trainer" });
  }

  res.status(200).json(updatedTrainerDoc);

  
};

module.exports = {
  createtrainer,
  gettrainer,
  gettrainers,
  deletetrainer,
  updatetrainer,
};
