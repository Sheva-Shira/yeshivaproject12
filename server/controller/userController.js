const User = require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")
const createNewUser = async (req, res) => {
    // if (!req.user.role == "manager") {
    //     return res.status(400).json({ message: "you are not permitted go to your manager" })
    // }
    const { userName, password, name, email, phone, role } = req.body
    if (!userName || !password) {
        return res.status(400).json({ message: 'username and password are required' })
    }
    const users = await User.find({ userName: userName }).lean()
    if (users?.length) {
        return res.status(400).json({ message: 'username is not unique' })
    }
    if (role) {
        if (!(role === "user" || role === "manager" || role === "advancedWorker"))
            return res.status(400).json({ message: 'roles not in enum' })
    }
    const duplicates = await User.findOne({ userName: userName }).lean()
    if (duplicates) {
        return res.status(409).json({ message: "This Name Already Exists and Required Unique" })
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = { name, userName, phone,role, password: hashedPwd }
    const user = await User.create(userObject)
    if (user) {
        return res.status(201).json({ message: `New User created${user.userName}` })
    }
    return res.status(400).json({ message: "Invalid user" })


    res.json(user)
}
const getUserById = async (req, res) => {
    if (!req.user.role == "manager") {
        return res.status(400).json({ message: "you are not permitted go to your manager" })
    }
    const { _id } = req.params
    const user = await User.find({ _id }, { password: 0 }).lean()
    res.json(user)

}

const getAllUsers = async (req, res) => {
    if (!req.user.role == "manager") {
        return res.status(400).json({ message: "you are not permitted go to your manager" })
    }
    const users = await User.find({}, { password: 0 }).lean()
    if (!users?.length) {
        return res.status(400).json({ message: "no users were found" })
    }
    res.json(users)
}

const deleteUser = async (req, res) => {
    log(req.user.role)
    if (!(req.user.role == "manager")) {
        return res.status(400).json({ message: "you are not permitted go to your manager" })
    }
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
        return res.status(400).json({ message: 'no users found' })
    }
    const result = await user.deleteOne()
    const reply = `User deleted `
    res.json(reply)
}
const updateUser = async (req, res) => {
    const { _id, userName, password, name, email, phone, role } = req.body
    if (!userName || !_id) {
        return res.status(400).json({ message: 'username and password are required' })
    }
    const user = await User.findById(_id).exec()
    if (!user) {
        return res.status(400).json({ message: 'no user was found' })
    }
    if (!(req.user.role == "manager")) {
        if (req.user._id != _id) {
            return res.status(400).json({ message: "you are not permitted !!!!" })
        }

        user.name = name
        // user.password = password
        user.email = email
        user.phone = phone
    }
    else {
        if (role) {
            if (!(role === "user" || role === "manager" || role === "advancedWorker"))
                return res.status(400).json({ message: 'roles not in enum' })
        }
        // user.password = password
        user.email = email
        user.phone = phone
        user.role = role
        user.name = name
    }
    const updateuser = user.save()
    res.json(`${updateuser.name} updated`)
}

module.exports = { createNewUser, getAllUsers, deleteUser, updateUser, getUserById }