import User from "../models/user.models.js";

const data = [
  {
    id: 1,
    name: "Sambhav",
    age: 20,
  },
  {
    id: 2,
    name: "Kunal",
    age: 22,
  },
  {
    id: 3,
    name: "Soham",
    age: 19,
  },
];

export const userController = (req, res) => {
  // Task1
  //   res.render("index", { data });
  // Task2
  // res.send(data);
  // Task3
  // res.render("form");
};

export const userForm = async (req, res) => {
  // Task2
  const { name, email, img } = req.body;
  const alreadyExists = await User.findOne({ email });
  if (alreadyExists) {
    return res.status(400).send("User already exists");
  }
  const user = new User({ name, email, img });
  user.save();
  return res.status(201).json({
    message: "User created successfully",
    user,
  });
  //Task3
  // const { name, email, img } = req.body;
  // const user = new User({ name, email, img });
  // const alreadyExists =await User.findOne({ email });
  // if (alreadyExists) {
  //   return res.status(400).send("User already exists");
  // }
  // user.save();
  // res.redirect("/show");
};

export const userShow = async (req, res) => {
  const user = await User.find(req.query.id);
  res.send(user);
  // try {
  //   const user = await User.find(req.query.id);
  //   if (!user) {
  //     return res.status(404).send("User not found");
  //   }
  //   res.render("show", { users: user });
  // } catch (error) {
  //   console.error("Error fetching user:", error);
  //   res.status(500).send("Error fetching user data");
  // }
};
