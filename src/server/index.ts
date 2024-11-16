import express from 'express';
import cors from 'cors';
import { connectDB } from './config/mongodb-memory';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { appointmentRouter } from './routes/appointment.routes';
import { productRouter } from './routes/product.routes';
import { orderRouter } from './routes/order.routes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});