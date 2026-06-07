import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import ratelimit from './config/upstash.js';
import rateLimiter from './middleware/rateLimiter.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();
const app  = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();
if(process.env.NODE_ENV !== "production") { 
app.use(
  cors( {
    origin: 'http://localhost:5173', // Replace with your frontend URL
  })   ); 
}
app.use(express.json()); // Middleware to parse JSON request bodies

app.use(rateLimiter); // Apply the rate limiter middleware to all routes
// Enable CORS for all routes
 //app.use((req, res, next) => {
   // console.log(`Received request: ${req.method} ${req.url}`);
   // next();
 // });

 app.use("/api/notes",notesRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
  });
}

connectDB().then(() =>  {
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

 });

export default app;


