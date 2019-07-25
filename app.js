import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from 'morgan';

//Routes
import productRoutes from "./api/routes/products";
import orderRoutes from "./api/routes/orders";
import userRoutes from "./api/routes/user";


mongoose.connect(
  "mongodb://felipegs31:" +
    process.env.MONGO_ATLAS_PW +
    "@gestao-contratados-shard-00-00-wmchk.mongodb.net:27017,gestao-contratados-shard-00-01-wmchk.mongodb.net:27017,gestao-contratados-shard-00-02-wmchk.mongodb.net:27017/test?ssl=true&replicaSet=gestao-contratados-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useMongoClient: true
  }
);
mongoose.Promise = global.Promise;

const app = express();

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

export default app;
