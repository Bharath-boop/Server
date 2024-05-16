import mongoose from "./index.js";


const userSchema=new mongoose.Schema({
    CostomerName:{
        type:String,
        required:[true,'Costomer Name is required']
    },
    // email:{
    //     type:String,
    //     required:[true,'Costomer Number is required']
    // },
    password:{
        type:String,
        default:"123456"
    },
    role:{
        type:String,
        default:'user'
    },
    CostomerNumber:{
        type:String,
        required:[true,'Costomer Number is required']
    },
    JPCode:{
        type:String,
        required:[true,'Costomer JPCode is required']
    },
    BookingDate:{
        type:String,
        required:[true,'Costomer Date is required']
    },
    LeadStatus:{
        type:String,
        required:[true,'Costomer Lead Status is required']
    },
    Status:{
        type:String,
        required:[true,'Costomer status is required']
    }
},{
    collection:'users',
    versionKey:false
})

const userModel=mongoose.model('user',userSchema)

export default userModel