const express = require("express")
const router = express.Router()
const { createUser, 
    getUsers, getOneUser, updateOne, deleteOne
} = require("../../controllers/admin/usermanagement")
const authorizedUsers = require("../../middlewares/authorizedUsers")
const isAdmin = require("../../middlewares/isAdmin")

// 5 common api route
router.post(
    "/",
    createUser
)

router.get(
    "/",
    authorizedUsers, // next() goes to next getUser
    isAdmin,
    getUsers
)

router.get(
    "/:id", // req.params.id
    getOneUser
)
router.put(
    "/:id", // req.params.id
    updateOne
)
router.delete(
    "/:id", // req.params.id
    deleteOne
)
module.exports = router

