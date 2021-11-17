import express from 'express';
import path from 'path';
const PORT = process.env.PORT || 5000
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import mealRoutes from './routes/mealRoutes.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'


const app = express();
dotenv.config();
connectDB();
app.use(express.json())
app.use('/api/meals', mealRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);


const __dirname = path.resolve();

if (process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
if(process.env.NODE_ENV ==='production'){
  app.use(express.static(path.join(__dirname,'/frontend/build')))
  app.get("*",(req,res) => res.sendFile(path.resolve(__dirname,'frontend','build','index.html')))
}
else{
  app.get('/', (req,res) => {res.json("Api is running...")})
}
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, (error) => {
  if (error)
    return console.log(error)
  console.log(`Server is listening in ${process.env.NODE_ENV} on PORT ${PORT} CNTL-C to quit`)
  console.log(`To Test:`)
  console.log(`http://localhost:${PORT}/`)
})