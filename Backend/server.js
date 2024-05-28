const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json()); // Use express.json() to parse JSON data
app.use(cors()); 
const port = 5000;

// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2002@gansaiesh',
  database: 'ecommerce'
});

// Connect to the database
const connectToDb = () => {
  db.connect((err) => {
    if (err) {
      console.log("An error occurred while connecting to the database");
      console.log(err);
      return;
    }
    app.listen(port, () => { console.log("Connected to DB, server initialized") });
  });
}
connectToDb();

// Logging middleware for debugging
app.get("/" , (req , res)=> {
  res.send("from server");
})

app.post("/user/" , (req , res)=> {
  const {user} = req.body;
  const gettingUserDetailsQuery = `SELECT * FROM customersall where customer_name = ${user};`;
db.query(gettingUserDetailsQuery , (err , result)=> {
  if(err) {
    console.log(err);
    res.json({ok : false , errorMsg : err});
  }
  const data = result;
  res.json({ok : true , data});
})
})


app.post("/login/" , (req , res)=> {
  const {user} = req.body;
  const gettingUserDetailsQuery = `SELECT * FROM customersall WHERE LOWER(customer_name) = LOWER('${user}');`;

  db.query(gettingUserDetailsQuery , async (err , result)=> {
    try {
      if(err) {
        console.log(err);
        res.status(401).json({ok : false , msg : "server side error"});
      }
      const data = result;
      console.log(data);
      if(data.length === 0) {
        res.status(200).json({ok : false , msg : "no customer exists" });
      }
      else {
        // const generatedToken = await jwt.sign({customer_id : result[0].customer_id} , "jwt_token");
        res.status(200).json({ok : true , customer_id : data[0].customer_id});
      }

    }
    catch(e) {
      console.log("error from server side");
    }

  })
})