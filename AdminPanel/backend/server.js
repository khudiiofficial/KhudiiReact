// Updated server file (replace your original backend file with this)
// Note: adjust import path to utils/ftpUpload.js if your file structure differs.

import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";

import dotenv from 'dotenv';
import router from "./routes/mainRoutes.js";



dotenv.config();
const PORT=process.env.PORT;
const JWT_SECRET=process.env.JWT_SECRET


const app=express();
app.use(express.json({limit:"500mb"}))
// app.use(express.urlencoded({ extended: true, limit: "500mb" }));

app.use(cookieParser())

app.use(cors(
  {
  origin: 'http://localhost:5174', // Vite's default dev server port
  credentials: true
  }
))
app.use(router)
// static route left as-is (if you still serve local files); you can remove if not needed
// app.use("/storage", express.static(path.join(process.cwd(), "storage")));
app.get('/',(req,res)=>{
  res.json('Admin Panel backend is running')
})

// export default app
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


