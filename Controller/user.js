import userModel from "../Models/user.js";
import auth from "../utils/auth.js";


const GET_ALL_USER = async (req, res) => {
    try {
        let user = await userModel.find()
        res.status(200).send({
            message: "USER DATA SUCESSFULLY FETCHING",
            user
        })
    } catch (error) {
        res.status(500).send({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    }
}

const GET_USER_BY_ID = async (req, res) => {
    try {
        let user = await userModel.findById({ _id: req.params.id })
        if (user) {
            res.status(200).send({
                message: "USER DATA SUCESSFULLY FETCHING",
                user
            })
        }
        else {
            res.status(400).send({
                message: "THIS USER NOT EXCETS"
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    }
}

const CREATE_USER = async (req, res) => {
    try {
        let user = await userModel.findOne({ CostomerNumber: req.body.CostomerNumber })
        if (!user) {
            // req.body.password = await auth.CREATEHASH(req.body.password)
            let newUser = await userModel.create(req.body)
            res.status(201).send({
                message: "DATA ADDING SUCESSFULLY",
                newUser
            })

        }
        else {
            res.status(400).send({
                message: `THIS NUMBER IS ALREADY EXCETS ${req.body.CostomerNumber}`
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    }
}

const EDIT_USER = async (req, res) => {
    try {
        let user = await userModel.findById({ _id: req.params.id })
        if (user) {
            user.CostomerName = req.body.CostomerName,
                user.CostomerNumber = req.body.CostomerNumber,
                user.JPCode = req.body.JPCode,
                user.BookingDate = req.body.BookingDate,
                user.LeadStatus = req.body.LeadStatus,
                user.Status = req.body.Status
            await user.save()
            res.status(200).send({
                message: 'USER EDIT SUCESSFULLY'
            })
        }
        else {
            res.status(400).send({
                message: `THIS USER NOT EXCETS`
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    }
}

const LOGIN = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email })
        if (user) {
            if (await auth.HASHCOMPARE(req.body.password, user.password)) {
                const token = await auth.GENTOKEN({
                    name: user.name,
                    email: user.email,
                    role: user.role
                })
                res.status(200).send({
                    message: "LOGIN SUCESSFULLY",
                    token,
                    role: user.role
                })
            }
            else {
                res.status(400).send({
                    message: "INVALID PASSWORD"
                })
            }

        }
        else {
            res.status(400).send({
                message: "INVALID MAIL ID"
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    }
}

export default {
    GET_ALL_USER,
    GET_USER_BY_ID,
    LOGIN,
    CREATE_USER,
    EDIT_USER
}