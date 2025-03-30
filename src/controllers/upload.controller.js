import File from "../modals/FileModal.js";
import User from "../modals/user.model.js";

export const uploadFile = async (req, res) => {
  if (!req.file) {
    console.log("No file uploaded");
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Ensure user ID is provided in the request body
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    let user = await User.findOne({ email: email });
    
    if (!user) {
      // Create new user if not found
      console.log("User not found, creating new user with email:", email);
      user = await User.create({
        name: email.split('@')[0], // Using part of email as name
        email: email,
        status: "new",
        role: "user"
      });
      console.log("New user created:", user);
    }

    console.log("User ID:", user._id);

    const userInFile = await File.findOne({ user: user._id });

    if (userInFile) {
      // Update existing document
      userInFile.url.push(req.file.path);
      await userInFile.save();

      return res.json({ message: "File updated", file: userInFile });
    } 

    // Create a new File document if none exists
    const newFile = new File({
      user: user._id,
      url: [req.file.path], // Initialize array with the new file path
    });

    // Save to MongoDB
    await newFile.save();

    console.log("File saved to MongoDB:", newFile);

    res.json(newFile);
  } catch (error) {
    console.error("Error saving file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
