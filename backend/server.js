import express from 'express'
import db from './Database/db.js';
import cors from 'cors'
import Router from './Router/Router.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT=process.env.PORT;
const app=express();
app.use(express.json({limit:"50mb"}))

app.use('/storage',express.static('storage'))
// app.use(cors(
//   {
//   origin: 'https://new.khudii.com', // Vite's default dev server port
//   credentials: true
//   }
// ))


app.use(cors(
  {
<<<<<<< HEAD
    origin:'http://localhost:5173',
=======
    origin:'http://localhost:5174',
>>>>>>> 592b394 (20/11/2025)
  // origin: 'https://new.khudii.com',
  credentials: true
  }
))


app.use(Router)


app.get('/',(req,res)=>{
  res.json("backend is running")
})

app.listen(PORT,()=>{
    console.log(`App is running on the port ${PORT} `)
})
// export default app



