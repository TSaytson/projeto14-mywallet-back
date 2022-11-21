import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/users.route.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use(usersRoutes);

app.listen(5000, console.log('Running on port 5000'));