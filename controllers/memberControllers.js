const Member = require("../models/memberModels");
const mongoose = require("mongoose");
const fs = require("fs");
require('dotenv').config();
const sharp = require('sharp');


// get all Members

const getmembers = async (req, res) => {
  /* const user_id = res.user._id */

  const members = await Member.find({}).sort({ createdAt: -1 });

  res.status(200).json(members);
};
//get one Member
const getmember = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such member" });
  }

  const member = await Member.findById(id);

  if (!member) {
    return res.status(400).json({ error: "no such member" });
  }

  res.status(200).json(member);
};

// create a Members



const createmember = async (req, res) => {
  const {
    name,
    phone,
    email,
    dob,
    center,
    joindate,
    gender,
    martialstatus,
    pack,
    offerprice,
    startdate,
    paidamount,
    dues,
    paymentdate,
    paymentmethod,
    expiredate,
    status,
  } = req.body;
  /* const userid = res.user._id */
  const { file } = req;

  if (!file) {
    // Check if an image file was not provided
    return res.status(400).json({ error: "Image (img) is required" });
  }

  const existingMember = await Member.findOne({ phone });

  if (existingMember) {
    return res.status(400).json({ error: "A member with this phone number already exists" });
  }

  const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number

  if (!phone || !phone.match(phoneRegex)) {
    return res.status(400).json({ error: "Invalid phone number. Please provide a 10-digit phone number." });
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
  if (!pack) {
    emptyField.push("pack");
  }
  if (!offerprice) {
    emptyField.push("offerprice");
  }
  if (!startdate) {
    emptyField.push("startdate");
  }
  if (!paidamount) {
    emptyField.push("paidamount");
  }
  if (!dues) {
    emptyField.push("dues");
  }
  if (!paymentdate) {
    emptyField.push("paymentdate");
  }
  if (!paymentmethod) {
    emptyField.push("paymentmethod");
  }
  if (!expiredate) {
    emptyField.push("expiredate");
  }
  if (!status) {
    emptyField.push("status");
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
    const filename = `member_${Date.now()}`;
    await sharp(compressedImage).toFile(`uploads/${filename}`);

    /* const user_id = res.user._id */
    const member = await Member.create({
      name,
      phone,
      email,
      dob,
      center,
      joindate,
      gender,
      martialstatus,
      pack,
      offerprice,
      startdate,
      paidamount,
      dues,
      paymentdate,
      paymentmethod,
      expiredate,
      status,
      img:filename,
    });
    res.status(200).json({ member });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }


    

};

// delete a Member
const deletemember = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such Member" });
  }

  const member = await Member.findById(id);

  if (!member) {
    return res.status(400).json({ error: "no such Member" });
  }
  // Delete the image file associated with the trainer
  const imagePath = `uploads/${member.img}`;
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
  await Member.findByIdAndDelete(id);

  res.status(200).json(member);
};

// update a Member
const updatemember = async (req, res) => {
  const { id } = req.params;
  let filename;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such Member" });
  }

  const member = await Member.findById(id);

  if (!member) {
    return res.status(400).json({ error: "no such Member" });
  }

  // Remove the old image if a new image is provided
  if (req.file) {
    const oldImagePath = `uploads/${member.img}`;
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
    filename = `member_${Date.now()}`;
    await sharp(compressedImage).toFile(`uploads/${filename}`);
    


  }

  const updatedMember = {
    ...req.body,
    img: req.file ? filename : member.img, // Keep the old image if a new image is not provided
  };

  const updatedMemberDoc = await Member.findByIdAndUpdate(id, updatedMember, { new: true });

  if (!updatedMemberDoc) {
    return res.status(400).json({ error: "Failed to update Member" });
  }

  res.status(200).json(updatedMemberDoc);
};

module.exports = {
  createmember,
  getmember,
  getmembers,
  deletemember,
  updatemember,
};
