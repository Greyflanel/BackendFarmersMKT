const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
const { join } = require("path");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const stripe = require("stripe")('sk_test_LWw3jny5c46xHynXBzLoM3xl00M9eSkVfa');
const { v4: uuidv4 } = require("uuid");
const authConfig = require("./auth_config.json");
require("dotenv").config();

// Server instance
const server = express();

const PORT = process.env.API_PORT || 4000;
const appPort = process.env.SERVER_PORT || 3000;
// const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;
const appOrigin = authConfig.appOrigin || 'http://localhost:3000';
if (
  !authConfig.domain ||
  !authConfig.audience ||
  authConfig.audience === "YOUR_API_IDENTIFIER"
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
  );

  process.exit();
}

// Middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger('short'));
server.use(express.static(join(__dirname, "build")));
server.use(cors({ origin: '*' }));

const productRouter = require("./products/products-router");

server.use("/", productRouter);

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

server.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


// server.get("/external-api", checkJwt, (req, res) => {
//   console.log(req.body)
//   res.send({
//     msg: "Your access token was successfully validated!",
//   });
// });



server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = server;

