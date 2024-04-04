require('dotenv').config();
const express = require('express')
const mongoose=require('mongoose')
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const twilio = require('twilio');
const cors = require('cors')


const workoutsroutes=require('./routes/workouts')
const userRoutes=require('./routes/user')
const centerRoutes=require('./routes/center')
const packageRoutes=require('./routes/package')
const memberRoutes=require('./routes/member')
const trainerRoutes=require('./routes/trainer')



// express app

const app=express()

app.use((req,res,next)=>{
console.log(req.path,req.method);
next()
})

app.use(express.json())

app.use(
  cors({
    origin:["https://gms-frontend-iota.vercel.app"],
    credentials:true,
  })
);
// Define storage for Multer

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//routes

app.use('/api/workouts/',workoutsroutes)
app.use('/api/user/',userRoutes)
app.use('/api/center/',centerRoutes)
app.use('/api/package/',packageRoutes)
app.use('/api/member/',memberRoutes)
app.use('/api/trainer/',trainerRoutes)



const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Define an endpoint to send SMS
app.post('/api/send-sms', (req, res) => {
  const { to, body } = req.body;
  console.log(to);

  twilioClient.messages
    .create({
      body: body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to:to,
    })
    .then((message) => {
      res.json({ success: true, message: 'SMS sent successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to send SMS' });
    });
});



mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("DB connected & running on PORT",process.env.PORT);
    })

})
.catch((error)=>{
    console.log(error);
})

