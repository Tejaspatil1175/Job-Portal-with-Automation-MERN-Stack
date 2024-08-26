import dotenv from 'dotenv';
import app from "./app.js";
import cloudinary from "cloudinary";

dotenv.config(); // Load environment variables

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
  console.log(`Server listening at port ${process.env.PORT}`);
});
