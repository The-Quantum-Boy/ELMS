// const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;

const jwt = require("jsonwebtoken");
// const authenticate = require("../middleware/authenticate");

require("../db/conn");
const { Admin, Employee, Leaves } = require("../model/userSchema");
const leaveauth = require("../middleware/leaveauth");
const admnauth = require("../middleware/admnauth");

//using async and await and this page is for the registration
router.post("/registerEmp", async (req, res) => {
  const {
    empId,
    gender,
    dob,
    firstName,
    lastName,
    departmentName,
    address,
    email,
    city,
    country,
    phone,
    password,
    cpassword,
  } = req.body;
  if (
    !empId ||
    !gender ||
    !dob ||
    !firstName ||
    !lastName ||
    !departmentName ||
    !address ||
    !email ||
    !city ||
    !country ||
    !phone ||
    !password ||
    !cpassword
  ) {
    return res.status(422).json({ error: "please fill the field properly" });
  }
  //checking whether the user already exists
  try {
    const empExist = await Employee.findOne({ email: email });
    if (empExist) {
      console.log("email already exist");
      return res.status(423).json({ error: "email already exist" });
    } else if (password != cpassword) {
      console.log("Password does does not match");
      return res.status(424).json({ error: "Password does does not match " });
    } else {
      const employee = new Employee({
        empId,
        gender,
        dob,
        firstName,
        lastName,
        departmentName,
        address,
        email,
        city,
        country,
        phone,
        password,
        cpassword,
        empStatus: 1,
      }); //if both key and value are same no need to write both for ex. name:name= name

      await employee.save();
      console.log("employee registered successfully");
      res.status(201).json({ message: "employee registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }

  //console.log(name);
  //console.log(email);
  // res.json({message:req.body });
  //res.send("router page");
});

// admin login route code
router.post("/AdminSignin", async (req, res) => {
  console.log("I am in Signin");
  //  console.log(req.body);
  // res.json({message:"Awesome"});
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "plz filled the data correct" });
    }
    const adminLogin = await Admin.findOne({ username: username });
    const adminPassword = await Admin.findOne({ password: password });
    if (adminLogin) {
      if (adminPassword) {
        const token = await adminLogin.generateAuthToken();
        // console.log("admin",token);
        res.cookie("jwtokenadmn", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        console.log("Admin sign in successfully");
        res.status(200).json({ error: " Admin login successfully " });
      } else {
        res.status(400).json({ error: "Invalid crenditial " });
      }
    } else {
      res.status(400).json({ error: "Invalid crenditial " });
    }
  } catch (err) {
    console.log(err);
  }
});

//employee login
router.post("/EmpLogin", async (req, res) => {
  // console.log(req.body);
  // res.json({message:"Awesome"});
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "plz filled the data" });
    }
    const employeeLogin = await Employee.findOne({ email: email });
    //console.log(userLogin);
    const empId = employeeLogin.empId;
    if (employeeLogin) {
      const isMatch = await bcrypt.compare(password, employeeLogin.password);

      if (!isMatch) {
        res.status(402).json({ error: "Invalid crenditial pass" });
        console.log("invalid password");
      } else {
        const token = await employeeLogin.generateAuthToken();
        res.cookie("jwtokenemp", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        console.log("cookies created");
        res.status(200).json({
          message: "User Signin Successfully ",
          empId: employeeLogin.empId,
        });
        console.log("User Signin Successfully");
      }
    } else {
      res
        .status(403)
        .json({ message: "employee is not registered please contact admin" });
      console.log("you are not registered please contact admin");
    }
  } catch (err) {
    console.log(err);
  }
});

//for the adding leaves
router.post("/addLeave", leaveauth, async (req, res) => {
  const { leaveType, fromDate, toDate, description } = req.body;
  if (!leaveType || !fromDate || !toDate || !description) {
    console.log("please fill the field properly");
    return res.status(422).json({ error: "please fill the field properly" });
  }

  try {
    let doc = await Leaves.findOne({ empId: req.empId });
    let updatedDoc;

    if (!doc) {
      console.log("No document found with empId 2");
      updatedDoc = await new Leaves({
        leaveType,
        fromDate,
        toDate,
        description,
        status: 2,
        empId: req.empId,
        firstName: req.firstName,
        lastName: req.lastName,
        adminRemark: 2,
        takenLeave: 0,
      }).save();
    } else {
      updatedDoc = await Leaves.findOneAndUpdate(
        { empId: req.empId },
        { $inc: { takenLeave: 1 } },
        { new: true }
      );
    }

    const leave = new Leaves({
      leaveType,
      fromDate,
      toDate,
      description,
      status: 2,
      empId: req.empId,
      firstName: req.firstName,
      lastName: req.lastName,
      adminRemark: 2,
      takenLeave: updatedDoc.takenLeave,
    });

    await leave.save();
    console.log("Leave applied successfully!");
    res
      .status(201)
      .json({ message: "Leave applied successfully!", empId: req.empId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//retrieve all leaves
router.get("/allLeaves", leaveauth, (req, res) => {
  // const {empId}=req.empId;
  // console.log(empId);{empId:req.empId}
  console.log("I am showing all leaves");
  Leaves.find({ empId: req.empId }).then((result) => {
    console.log("Leave history", result);
    res.status(200).send(result.length > 0 ? result : "Empty leave history");
  });
});
// allLeavesapply
router.get("/allLeavesapply", (req, res) => {
  // const {empId}=req.empId;
  // console.log(empId);{empId:req.empId}
  console.log("I am showing all leaves");
  Leaves.find().then((result) => {
    console.log("Leave history", result);
    res.status(200).send(result.length > 0 ? result : "Empty leave history");
  });
});

router.post("/getobjDetails", async (req, res) => {
  const { objId } = req.body;
  // const obj=new ObjectId(objId);
  // // console.log("hi how are you"+obj);
  const detail = await Leaves.findOne({ _id: objId });
  res.status(200).send(detail);
});

router.post("/getEmployeeDetails", async (req, res) => {
  const { empId } = req.body;
  const user = await Employee.findOne({ empId: empId });
  res.status(200).send(user);
});

router.post("/getLeaveDetails", async (req, res) => {
  const { empId } = req.body;
  const user = await Leaves.findOne({ empId: empId });
  res.status(200).send(user);
});

router.get("/pendingLeaves", (req, res) => {
  console.log("I am showing all leaves");
  Leaves.find({ status: 2 }).then((result) => {
    console.log("Leave history", result);
    res.send(result.length > 0 ? result : "Empty leave history");
  });
});

router.get("/approvedLeaves", (req, res) => {
  console.log("I am showing all leaves");
  Leaves.find({ status: 1 }).then((result) => {
    console.log("Leave history", result);
    res.send(result.length > 0 ? result : "Empty leave history");
  });
});

router.get("/notapprovedLeaves", (req, res) => {
  console.log("I am showing all leaves");
  Leaves.find({ status: 0 }).then((result) => {
    console.log("Leave history", result);
    res.send(result.length > 0 ? result : "Empty leave history");
  });
});

// addAction
router.post("/addAction", async (req, res) => {
  const { admnAction, admnDesc, objId } = req.body;
  if (!admnAction) {
    console.log("please fill the field properly");
    return res.status(422).json({ error: "please fill the field properly" });
  }
  let status = 0;
  if (admnAction == 1) {
    status = 1;
  } else {
    status = 0;
  }
  console.log(req.body);
  // if (!admnAction || !admnDesc) {
  //    console.log("please fill the field properly");
  //    return res.status(422).json({ error: "please fill the field properly" });
  // }
  // update one value
  try {
    Leaves.findOneAndUpdate(
      { _id: objId },
      {
        $set: {
          adminRemark: admnAction,
          status: status,
          adminRemarkDesc: admnDesc,
          adminRemarkDate: Date.now(),
        },
      }
    ).exec(function (err, Leaves) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        console.log("Leaves updated successfully");
        console.log("adminRemark added!");
        res.status(200).send(Leaves);
      }
    });
  } catch (err) {
    console.log(err);
  }
});
//
router.get("/getEmpDetail", (req, res) => {
  console.log("I am showing Employee detail");
  Employee.find().then((result) => {
    console.log("Employee detail", result);
    res.send(result.length > 0 ? result : "Empty employee detail");
  });
});

// getemployeData get  employee data for update
router.post("/getemployeedata", async (req, res) => {
  const { empId } = req.body;
  const user = await Employee.findOne({ empId: empId });
  res.status(200).send(user);
});

//update employee information
router.post("/UpdateEmp", async (req, res) => {
  const {
    empId,
    gender,
    dob,
    firstName,
    lastName,
    departmentName,
    address,
    city,
    email,
    country,
    phone,
    password,
    cpassword,
  } = req.body;
  console.log(req.body);
  if (
    !empId ||
    !gender ||
    !dob ||
    !firstName ||
    !lastName ||
    !departmentName ||
    !email ||
    !address ||
    !city ||
    !country ||
    !phone
  ) {
    return res.status(422).json({ error: "please fill the field properly" });
  }
  try {
    Employee.findOneAndUpdate(
      { empId: empId },
      {
        $set: {
          empId,
          gender,
          dob,
          firstName,
          lastName,
          departmentName,
          email,
          address,
          city,
          country,
          phone,
          password,
          cpassword,
        },
      }
    ).exec(function (err, Employee) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        console.log("Employee updated successfully");
        return res
          .status(200)
          .json({ message: "employee updated successfully" });
      }
    });
    // await Employee.save();
    // console.log("Updated employee");
    // console.log(Employee);
  } catch (err) {
    console.log(err);
  }
});

//add leave count
router.post("/addLeaveNum", async (req, res) => {
  console.log("i am now in leave add fetch");
  const { empId, leaveNum } = req.body;
  if (!leaveNum) {
    return res.status(422).json({ error: "please fill the field properly" });
  }
  try {
    Employee.findOneAndUpdate(
      { empId: empId },
      { $set: { leaveNum: leaveNum } }
    ).exec(function (err, Leaves) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        console.log("Leavesnum updated successfully");
        res.status(200).send(Leaves);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// changestatus
router.post("/changestatus", async (req, res) => {
  const { empId, empStatus } = req.body;
  console.log(req.body);
  try {
    if (empStatus === 0) {
      Employee.findOneAndUpdate(
        { empId: empId },
        { $set: { empStatus: 1 } }
      ).exec(function (err, Employee) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          console.log("Employee is Actived now");
          res.status(200).send(Employee);
        }
      });
    } else {
      Employee.findOneAndUpdate(
        { empId: empId },
        { $set: { empStatus: 0 } }
      ).exec(function (err, Employee) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          console.log("Employee is inactived now");
          res.status(201).send(Employee);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});
//admin logout
router.get("/adminlogout", (req, res) => {
  console.log("admin logged out");
  res.clearCookie("jwtoken");
  res.status(200).send("admin logout");
});

// emplogout
router.get("/emplogout", (req, res) => {
  console.log("employee logged out");
  res.clearCookie("jwtoken");
  res.status(200).send("employee logged out");
});

// notifyLeave
router.post("/notifyLeave", async (req, res) => {
  const leaves = await Leaves.find({ adminRemark: 2, status: 2 });
  res.status(200).send(leaves);
});

module.exports = router;
