require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const nodemailer = require("nodemailer");
const { sendEmail } = require("./utils/emailhelper.js");
const app = express();
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173",
}));
app.use((req, res, next) => {
  console.log("Request: " + req.url);
  next();
});
app.use(morgan());//npm i morgan
app.use(express.json());
require("./config/dbconfig.js");
const Product = require('./models/productModelss.js');
const User = require('./models/UserModel.js');
const OTP = require('./models/otpModel.js');
port = 2002;
// {"title": "Chips","price": 20}
//http://www.localhost:2002/api/v1/users
app.post('/api/v1/users', async (req, res) => {
  try {
    const { otp, email, password } = req.body;
    console.log(otp, email, password);
    if (!otp || !email || !password) {
      res.status(400).json({
        status: "Bad Request",
        message: "Missing required fields",
      });
      return;
    }
    //OTP that is sent within last 3 minute
    const otpDoc = await OTP.findOne({
      createdAt: {
        $gte: new Date(Date.now() - 10 * 10 * 1000)
      }, email: email
    });
    // const otpDoc = await OTP.findOne()
    //   .where("createdAt")
    //   .gte(Date.now() - 10 * 60 * 1000)
    //   .where("email")
    //   .equals(email);
    if (otpDoc == null) {
      res.status(400).json({
        status: "Bad Request",
        message: "Invalid OTP or Expired OTP",
      });
      return;
    }
    const hashedOTP = otpDoc.otp;
    const isOTPValid = await bcrypt.compare(otp.toString(), hashedOTP);
    if (isOTPValid) {
      const salt = await bcrypt.genSalt(14);//2^14 comparisons
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        email: email,
        password: hashedPassword
      });
      res.status(201);
      res.json({
        success: "User created successfully",
        data: user
      });
      await OTP.findByIdAndDelete(otpDoc._id)
    }
    else {
      res.status(400).json({
        status: "Bad Request",
        message: "Invalid OTP or Expired OTP",
      });
    }
  } catch (error) {
    console.log(error.message);
    if (error) {
      console.log(error.message);
    }
    else {
      res.status(500).json({
        status: "Fail",
        message: "Internal Server Error",
      })
    };
  }
})
// app.post('/api/v1/users', async (req, res) => {
//   try {
//     const newUser = req.body;
//     const salt = await bcrypt.genSalt(14);//2^14 comparisons
//     const hashedPassword = await bcrypt.hash(newUser.password, salt);
//     console.log(hashedPassword);
//     newUser.password = hashedPassword;
//     const user = await User.create(newUser);
//     res.status(201);
//     res.json({
//       success: "User created successfully",
//       data: user
//     });
//   } catch (error) {
//     if (error.name == "ValidationError") {
//       res.status(400).json({
//         status: "Bad Request",
//         message: "Data Validation Error" + error.message,
//       })
//     }
//     else {
//       res.status(500).json({
//         status: "Fail",
//         message: "Internal Server Error",
//       })
//     };
//   }
// })
app.post('/api/v1/otps', async (req, res) => {
  try {
    const { email } = req.body;
    //email is required
    //otp is not sent within 10 minutes
    if (email && email.length > 0) {
      const otp = Math.floor(Math.random() * 9000 + 1000);
      //npm install nodemailer
      const isEmailSent = await sendEmail(email, otp);
      if (isEmailSent) {
        const hashedOTP = await bcrypt.hash(otp.toString(), 14); //""convert otp into string
        await OTP.create({ email, otp: hashedOTP })
        res.status(201).json({
          status: 'Success', message: 'Email sent successfully'
        });
      }
      else {
        res.status(500).json({
          status: 'Fail', message: 'Failed to send email'
        });
      }
    }
    else {
      return res.status(404).json({
        status: "Not Found",
        message: "Email is required",
      })
    }

  }

  catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "Internal Server Error",
    })
  }
})
app.get('/api/v1/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200);
    res.json({
      success: "Products retrieved successfully",
      data: users
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "Internal Server Error",
    })
  }

});
// https://jwt.io/
//http://www.localhost:2002/api/v1/login
app.post('/api/v1/login', async (req, res) => {
  try {
    const { email, password: plainPassword } = req.body;
    const currentUser = await User.findOne({ email: email });
    if (currentUser) {
      const { _id, name, password: hashedPassword } = currentUser;
      const isPasswordValid = await bcrypt.compare(plainPassword, hashedPassword);
      if (isPasswordValid) {
        //npm install jsonwebtoken
        const token = jwt.sign({
          email, _id, name
        }, "secret_key", { expiresIn: "1day" });
        console.log(token);
        res.cookie("authorization", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        res.status(200).json({
          success: "User logged in successfully",
          data: currentUser
        });
      }
      else {
        res.status(401).json({
          status: 'Fail', message: 'Invalid Email /password'
        });
        return;
      }
    }
    else {
      res.status(400);
      res.json({
        status: "Bad Request",
        message: "User not found",
      });
      return;
    }
  }

  catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "Internal Server Error",
    })
  }
})
//http://www.localhost:2002/api/v1/products
app.get('/api/v1/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200);
    res.json({
      success: "Products retrieved successfully",
      data: products
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "Internal Server Error",
    })
  }

});
//http://www.localhost:2002/api/v1/products?q=c
// app.get('/api/v1/products', async (req, res) => {
//   try {
//     const { q = "", size = 4, page = 1, fields = "" - __v } = req.query;
//     console.log("Query=", q)
//     const products = Product.find();
//     if (q.length > 0) {
//       const reg = new RegExp(q, 'i');
//       products.where('title').regex(reg);
//     }
//     products.sort("price -title"); //- means ascending order
//     products.limit(size);
//     products.select(fields); // projection
//     products.skip((page - 1) * size);
//     const productss = await products;
//     res.status(200);
//     res.json({
//       success: "Products retrieved successfully",
//       data: productss
//     });
//   } catch (error) {

//     console.error(error);
//     res.status(500).json({
//       status: "Fail",
//       message: "Internal Server Error",
//     })
//   }

// });

//http://www.localhost:2002/api/v1/products

const cookieparser = require('cookie-parser');
app.use(cookieparser());
app.use((req, res, next) => {
  //npm install cookie-parser     to read cookie
  const { authorization } = req.cookies;
  jwt.verify(authorization, "secret_key", (error, decoded) => {
    if (error) {
      res.status(401).json({
        status: "Fail",
        message: "Unauthorized",
      });
      return;
    }
    req.userinfo = decoded;
    next();
  });
});
app.get("/api/v1/isLoggedIn", async (req, res) => {
  try {
    res.status(200);
    res.json({
      status: "Success",
      message: "User is logged in",
      data: req.userinfo
    })
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "Internal Server Error",
    })
  }

});
app.post('/api/v1/products', async (req, res) => {
  try {
    const newProduct = req.body;
    const doc = await Product.create(newProduct);
    res.status(201);
    res.json({
      success: "Product created successfully",
      data: doc
    });
  } catch (error) {
    if (error.name == "ValidationError") {
      res.status(400).json({
        status: "Bad Request",
        message: "Data Validation Error",
      })
    }
    else {
      res.status(500).json({
        status: "Fail",
        message: "Internal Server Error",
      })
    };
  }
})
app.listen(port, () => {
  console.log('Server is running on port 2002');
});