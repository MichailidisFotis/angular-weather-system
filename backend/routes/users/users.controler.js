import { v4 as uuidv4 } from "uuid";
import validator from "email-validator";
import bcrypt from "bcrypt";
import register_user from "./validation_schemas/register_user.js";
import userModel from "./models/userModel.js";

//*route to get all users from the Database
const getUsers = async (req, res) => {
  const users = await userModel.find();
  res.send(users);
};

//*Singup method
const signup = async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var verify_password = req.body.verify_password;
  var firstname = req.body.firstname;
  var surname = req.body.surname;
  var email = req.body.email;

  //*check if passwords are the same
  if (password != verify_password)
    return res.status(400).send({
      message: "Passwords must match",
      signup: false,
    });

  const { error } = register_user(req.body);

  if (error) {
    return res.status(400).send({
      message: error.details[0].message.replace("_", " ").replace(/"/g, ""),

      signup: false,
    });
  }

  //*check if email form is valid
  const emailValid = validator.validate(email);

  if (!emailValid) return res.status(400).send({ message: "Email is invalid" });

  //*Check if username already exists
  const username_exists = await userModel
    .where({ username: username })
    .countDocuments();

  if (username_exists)
    return res.status(400).send({
      message: "Username already exists",
      signup: false,
    });

  //*check if email exists
  const email_exists = await userModel.where({ email: email }).countDocuments();

  if (email_exists)
    return res.status(400).send({
      message: "Email Already Exists",
      signup: false,
    });

  var hashedPassword = await bcrypt.hash(password, 10);

  //*Create user
  const user = new userModel({
    username: username,
    password: hashedPassword,
    firstname: firstname,
    surname: surname,
    email: email,
  });

  //*save document to Database
  await user.save();

  //*send response
  return res.status(201).send({
    message: "Signup Successful",
    signup: true,
  });
};

const login = async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  //*check if username is inserted
  if (!username)
    return res.status(400).send({
      message: "Username must be inserted",
      login: false,
    });

  //*check if password is inserted
  if (!password)
    return res.status(400).send({
      message: "Password must be inserted",
      login: false,
    });

  const findUser = await userModel.findOne({
    username: username,
  });

  if (!findUser) {
    return res.status(400).send({
      message: "Username not found",
      login: false,
    });
  }

  var loginUser =  await bcrypt.compare(password,findUser.password);


//   const loginUser = await userModel.findOne({
//     username: findUser.username,
//     password: md5(password),
//   });




  if (loginUser) {
    req.session.user_id = loginUser.id;
    req.session.username = loginUser.username;
    req.session.firstname = loginUser.firstname;
    req.session.surname = loginUser.surname;
    req.session.email = loginUser.email;
    req.session.preferences = loginUser.preferences;

    // return res.redirect("/users/userIndex");
    return res.send({
        message:"logged"
    })



} else
    return res.status(400).send({
      message: "Credentials are wrong",
      login: false,
    });
};

const signout = async (req, res) => {
  req.session.destroy();

 return res.redirect("/");
};


const save_preferences = async (req, res) => {
  var preferences = req.body.preferences



  await userModel.findOneAndUpdate(
    { _id: req.session.user_id },
    {
      preferences: preferences,
    }
  );

  return res.status(200).send({
    message: "Preferences Updated",
    update:true
  });


};



const get_user_inforamation = async (req, res) => {
  return res.status(200).send({
    user_id: req.session.user_id,
    username: req.session.username,
    firtname: req.session.firstname,
    surname: req.session.surname,
    email: req.session.email,
    preferences: req.session.preferences,
  });
};



export default {
  getUsers,
  signup,
  login,
  signout,
  save_preferences,
  get_user_inforamation,
};