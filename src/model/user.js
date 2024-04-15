const  mongoose  = require("mongoose");

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20
    }
})

module.exports = mongoose.model('User', UserSchema)
