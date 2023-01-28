const express = require("express");
const router = express.Router();

const { getCourses, getCourseData, getTasks } = require("../api.js");


const NAME = "Semester 1 Final"
router.get("/", async (req, res, next) => {
  const { courses } = await getCourses(req.session.cookies, NAME);

  console.log(req.session.username);

  if (courses.length === 0) return res.redirect("/login/auto");

  res.render("index", { name: req.session.username, courses });
});

router.get("/class/:id", async (req, res) => {
  const { err, name, weights, assignments } = await getCourseData(req.session.cookies, req.params.id, NAME);

  if (err) return res.redirect("/login/auto");

  res.render("class", { title: name, weights, assignments });
});


router.use("/calendar", require("./calendar"));

router.get("/tasks", (req, res) => {
  getTasks()
    .then(data => {
      res.render("tasks", {
        tasks: data
      });
    });
});

module.exports = router;
