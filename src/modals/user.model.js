import mongoose, {Schema} from "mongoose"

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    staus:{
        type:String,
    },
    role:{
        type:String,
        default:"user"
    },
    responses:{
        type: [String],
        default:[]
    },
    cheating:{
        type: Number,
        default:0
    },
    url:[{
        type: [String],
        default:[]
    }],    
},{timestamps:true})

const User = mongoose.model("User",userSchema)
export default User