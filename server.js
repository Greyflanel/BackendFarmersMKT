const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
const { join } = require("path");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const { v4: uuidv4 } = require("uuid");
const authConfig = require("./auth_config.json");
require("dotenv").config();

// Server instance
const server = express();

const PORT = process.env.API_PORT || 4000;
const appPort = process.env.SERVER_PORT || 3000;
// const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;
const appOrigin = authConfig.appOrigin || 'https://computerspartselectronics.com';
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

server.get("/external-api", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!",
  });
});

server.post("/payment", checkJwt, cors(), async (req, res) => {
  let { product, amount, id, token } = req.body;
  let idempontencyKey = uuid();
  console.log("PRODUCT", product)
  console.log("PRICE", product.price)
  try {
    const payment = await stripe.paymentIntents.create({
      amount: product.price * 100,
      currency: "USD",
      description: "Computer Parts and Electronics",
      payment_method: id,
      confirm: true,
      email: token.email,
      receipt_email: token.email,
      description: product.product_details,
      shipping: {
        name: token.card.name,
        address: {
          country: token.card.address_country
        }
      }
    }, {idempontencyKey})
    console.log("Payment", payment)
    res.json({ 
      message: "Payment Successful!"
     })
  } catch (error) {
    console.log("Error", error)
    res.json({
      message: "Payment Failed",
      success: false
    })

  }
  
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = server;
