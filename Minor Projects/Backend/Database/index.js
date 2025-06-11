const mysql = require('mysql2');//if use import then use different syntax because in that a promise is returned so use await async
const { faker } = require('@faker-js/faker');
const { log } = require("console");
const express = require("express");
const app = express();
const methodOverride = require("method-override");
exports.app = app;
const { v4: uuidv4 } = require("uuid");

const path = require("path");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname , "/public")));
app.use(express.static(path.join(__dirname , "/public/js")));// for folder inside public

app.set("views", path.join(__dirname , "/views"));

app.set("view engine" , "ejs");

let port = 4000;

app.listen (port , ()=> {
   console.log(`this known as ${port}`);
})

function createRandomUser() {
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

  const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    database: 'first',
    password: 'sexydata101',
  });


app.get("/" , (req,res)=>{
  let q = `SELECT count(*) FROM user`;
  try {
    connection.query(q , (err , results)=>{
      if(err) throw err;
      // console.log(results);// gives [{`count(*)` : 100}] so use results[0] to access object and then use key to access value
      
      let count = results[0]["count(*)"];//In JavaScript, when accessing object properties, you have two options: dot notation and bracket notation. Dot notation is simpler and more readable, but it has limitations. Bracket notation is more flexible and allows you to use keys that are not valid identifiers (e.g., keys with spaces, special characters, or reserved words).In your case, the key count(*) contains special characters (( and )), which are not valid in dot notation. Therefore, you need to use bracket notation to access the value associated with this key.
      res.render("index.ejs" , {count});
    });
  } catch (error) {
    console.log(error);
    
  }
});

app.get("/user" , (req,res)=>{
  let q = `SELECT * FROM user`;
  try {
    connection.query(q , (err , users)=>{
      if(err) throw err;
      // console.log(users);
      
      res.render("show.ejs" , {users});
    });
  } catch (error) {
    console.log(error);
    
  }
});

app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    res.send("some error with DB");
  }
});

app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { username, password } = req.body;
  console.log(username);
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];

      if (user.password != password) {
        res.send("WRONG Password entered!");
      } else {
        let q2 = `UPDATE user SET username='${username}' WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          else {
            console.log(result);
            console.log("updated!");
            res.redirect("/user");
          }
        });
      }
    });
  } catch (err) {
    res.send("some error with DB");
  }
});

app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/user/new", (req, res) => {
  let { username, email, password } = req.body;
  let id = uuidv4();
  //Query to Insert New User
  let q = `INSERT INTO user (id, username, email, password) VALUES ('${id}','${username}','${email}','${password}') `;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log("added new user");
      res.redirect("/user");
    });
  } catch (err) {
    res.send("some error occurred");
  }
});

app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    res.send("some error with DB");
  }
});

app.delete("/user/:id/", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];

      if (user.password != password) {
        res.send("WRONG Password entered!");
      } else {
        let q2 = `DELETE FROM user WHERE id='${id}'`; //Query to Delete
        connection.query(q2, (err, result) => {
          if (err) throw err;
          else {
            console.log(result);
            console.log("deleted!");
            res.redirect("/user");
          }
        });
      }
    });
  } catch (err) {
    res.send("some error with DB");
  }
});


// create the connection to database

// try {
//   for (let i = 0; i < 10; i++) {
//    const user = createRandomUser();
//   let insertQuery = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
//   connection.query(insertQuery, [user.id, user.username, user.email, user.password]);

//   let selectQuery = "SELECT * FROM user"; //have to present queries differentlu like workbench
//   connection.query(selectQuery , (err, results, fields) => {
//     if (err) {
//       console.error(err);
//     }
//     console.log(results);
//   });
  
//   }
    
//    connection.end(); // close the connection
      
// } catch (err) {
//   console.log(err);
// }

// console.log("Connected to database");

//   // execute will internally call prepare and query
//   const [results, fields] = await connection.execute(
//     'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//     ['Rick C-137', 53]
  //   );

  //   console.log(results); // results contains rows returned by server
  //   console.log(fields); // fields contains extra meta data about results, if available