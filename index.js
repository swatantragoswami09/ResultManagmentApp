const express = require("express");
const path = require("path");
const app = express();
const db = require("./models");
const axios = require("axios");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/Teacher", async (req, res) => {
  try {
    const apidata = await axios.get(`http://localhost:3000/api/all`);
    // console.log(apidata.data);
    res.render("Teacher", { datas: apidata.data });
  } catch (err) {
    if (err.res) {
      console.log(err.res.apidata);
      console.log(err.res.this.status);
      console.log(err.res.headers);
    } else if (err.requiest) {
      console.log(err.requiest);
    } else {
      console.log("Error", err.message);
    }
  }
});

app.get("/Student", (req, res) => {
  res.render("Studentview");
});

app.get("/display", async (req, res) => {
  // console.log(req.query.rollno);
  var pid = 0;
  try {
    const apidata1 = await axios.get(`http://localhost:3000/api/all`);
    apidata1.data.forEach(function (d) {
      if (d.rollno == req.query.rollno) {
        pid = d.id;
      }
    });
    if (pid == 0)
      res.send(
        "<h1 style='text-align:center; color:red; margin-top:200px;'>*Wrong Roll no*</h1>"
      );
    const apidata2 = await axios.get(`http://localhost:3000/api/find/${pid}`);
    // console.log(apidata2.data);
    res.render("displayresult", {
      datas: apidata2.data,
    });
  } catch (err) {
    if (err.res) {
      console.log(err.res.apidata);
      console.log(err.res.this.status);
      console.log(err.res.headers);
    } else if (err.requiest) {
      console.log(err.requiest);
    } else {
      console.log("Error", err.message);
    }
  }
});

app.get("/NewResult", (req, res) => {
  res.render("NewResult");
});

app.get("/edit/:id", async (req, res) => {
  console.log(req.params.id);
  res.render("edit", { id: req.params.id });
});

app.get("save", async (req, res) => {
  await axios
    .put(`http://localhost:3000/api/edit/${req.body.id}`, {
      rollno: req.body.rollno,
      Name: req.body.Name,
      DOB: req.body.DOB,
      Score: req.body.Score,
    })
    .then(function (res) {
      console.log(res.data);
    });
  // res.render("Teacher");
});

app.get("/delete/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    await axios
      .delete(`http://localhost:3000/api/delete/${req.params.id}`)
      .then(function (res) {
        console.log(res.data);
      });
  } catch (err) {
    if (err.res) {
      console.log(err.res.apidata);
      console.log(err.res.this.status);
      console.log(err.res.headers);
    } else if (err.requiest) {
      console.log(err.requiest);
    } else {
      console.log("Error", err.message);
    }
  }
});

const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
