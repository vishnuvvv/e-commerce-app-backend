import { Redis } from "ioredis";

const redisConfig = {
  host: "localhost",
  port: 6379,
  // password: "1234567",
};

const redisClient = new Redis(redisConfig);

export default redisClient;
