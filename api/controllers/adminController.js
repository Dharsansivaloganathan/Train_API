const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { Admin } = require('../models/adminModel');
const authAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const findAdmin = await Admin.findOne({ username })
    if (findAdmin && await bcrypt.compare(password, findAdmin.password)) {
        res.status(200).json({
            name: findAdmin.username,
            password: findAdmin.password,
            _id: findAdmin._id,
            token: findAdmin.token,

        })
    } else {
        res.status(400)
        throw new Error("Not an Admin")
    }
})
module.exports = { authAdmin };