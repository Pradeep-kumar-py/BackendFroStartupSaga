import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    url: {
        type: [String],
        default: []
    },
   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

}, { timestamps: true });

const File = mongoose.model("File", fileSchema);
export default File;
