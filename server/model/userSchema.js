const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens:[
        {
            token:{
                type:String,
                required: true
            }
        }
    ]
})

const departmentSchema = new mongoose.Schema({
    departmentName: {
        type: String, 
        required: true
    },
    departmentShortName:{
        type: String,
        required: true
    },
    departmentCode:{
        type: String,
        required: true
    },
    creationDate:{
        type:Date,
        default: Date.now()
    }
})

const employeeSchema = new mongoose.Schema({
    empId: {
        type: Number,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    dob:{
        type: Date
    },
    departmentName:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    phone:{
        type:Number,
        required: true
    },
    empStatus:{
        type: Number
       
    },
    regDate:{
        type: Date,
        default:Date.now()
    },
    tokens:[
        {
            token:{
                type:String,
                required: true
            }
        }
    ]
  
})

const leavesSchema = new mongoose.Schema({
    leaveType: {
        type: String,
        required: true
    },
    toDate: {
        type: Date
    },
    fromDate:{
        type: Date
    },
    description: {
        type: String,
        required: true
    },
    postingDate:{
        type: Date,
        default:Date.now()
    },
    adminRemark: {
        type: Number,
        default:2
        
    },
    adminRemarkDate:{
       type: Date,
       default:undefined
    },
    adminRemarkDesc:{
       type: String,
       default:" "
    },
    status: {
        type: Number,
    },
    isRead:{
        type: Boolean,
       
    },
    empId:{
        type:Number     
    },
    firstName:{
        type: String,
    },
    lastName:{
        type: String,   
    }

})

const leavetypeSchema = new mongoose.Schema({
    leaveType: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    creationDate:{
        type: Date,
        default: Date.now()
    }
})


// hashing the password
employeeSchema.pre('save',async function(next){
    
    if(this.isModified('password')){
        
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
        console.log("password is hashed");
    }
   next();

});

//generating token jwt
employeeSchema.methods.generateAuthToken = async function(){
    try {
        let token =jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;

    } catch (err) {
        console.log(err);
    }
}

adminSchema.methods.generateAuthToken = async function(){
    try {
        let token =jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;

    } catch (err) {
        console.log(err);
    }
}



const Admin = mongoose.model('ADMIN',adminSchema);
const Department = mongoose.model('DEPARTMENT',departmentSchema);
const Employee = mongoose.model('EMPLOYEE',employeeSchema);
const Leaves = mongoose.model('LEAVES',leavesSchema);
const LeaveType = mongoose.model('LEAVETYPE',leavetypeSchema);



module.exports ={
    Admin,Department,Employee,Leaves,LeaveType
};

