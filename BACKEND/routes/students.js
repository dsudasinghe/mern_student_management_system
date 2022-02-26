const router = require("express").Router();
let Student = require("../models/Student");

//add student
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const gender = req.body.gender;

  const newStudent = new Student({
    name,
    age,
    gender,
  });

  newStudent
    .save()
    .then(() => {
      res.json("Student Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//get student data
router.route("/").get((req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update student
router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const { name, age, gender } = req.body;

  const updateStudent = {
    name,
    age,
    gender,
  };

  const update = await Student.findByIdAndUpdate(userId, updateStudent)
    .then(() => {
      res.status(200).send({ status: "User Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

//delete student
router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  await Student.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "User deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete user", error: err.message });
    });
});

//fetch specific student
router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;

  const user = await Student.findById(userId)
    .then((student) => {
      res.status(200).send({ status: "User fetched", student });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Erroer with get user", error: err.message });
    });
});

module.exports = router;
