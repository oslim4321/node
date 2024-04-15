const User = require("../model/user");

async function getAllUsers(req, res) {
    try {
        const response = await User.find()
        res.json({response, total: response.length}).status(200)
    } catch (error) {
        res.json(response).status(500)
    }
}

async function createNewUser(req, res){

    const {name, email, password} = req.body
    if (!name || !email || !password) return res.status(403).json({message:'please fill all details'});

    try {
        const response = await User.create({name, email, password});
        console.log(response);

        res.json({message: 'user created succeess', response}).status(201)
    } catch (error) {
        console.log(error);
        res.json({message: 'there is an error', error}).status(500)
    }
}

module.exports = {getAllUsers, createNewUser};

// sammieking247
// 2XU4AvR7Mt1FT2y0