const User = require("./../models/userModel");
exports.getAllUser = async (req, res) => {
  try {
    const uers = await User.find();
    res.status(201).json({
      status: "success",
      data: {
        uers,
      },
    });
  } catch (err) {
    res.status(401).json(err);
  }
};
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.deleteUsers = async (req, res) => {
  try {
    const result = await User.deleteMany();
    res.status(200).json({
      status: "success",
      message: "succesfully deleted",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateUsers = async (req, res) => {
  try {
    const targetname = req.body.name; // Assuming you send the targetId in the request body
    const updatedData = req.body.password;

    const result = await User.updateOne(
      { name: targetname }, //update the password of tht name we give only 1st match
      { password: updatedData }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.upsert = async (req, res) => {
  try {
    const newData = req.body;
    const targetId = req.body._id; // Assuming you send the targetId in the request body

    // Find the document by its unique identifier (_id) and update it

    const result = await User.findByIdAndUpdate(targetId, newData, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({ error: "Document not found." });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
