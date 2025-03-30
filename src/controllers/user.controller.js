import User from "../modals/user.model.js";

export const PostUserData = async (req, res) => {
    const {name, email, staus, role, responses, cheating } = req.body
    try {

        // Check if user already exists
        const existedUser = await User.findOne({ email: email })
        
        if (existedUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create new user    
        const user = await User.create({
            name,
            email,
            staus,
            role,
            responses,
            cheating
        })
        res.status(201).json({ message: "User created successfully", user });
    
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
}

