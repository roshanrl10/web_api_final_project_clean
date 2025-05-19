const express = require("express")
const router = express.Router()
const { createUser, 
    getUsers, getOneUser, updateOne, deleteOne
} = require("../../controllers/admin/usermanagement")

// 5 common api route
router.post(
    "/",
    createUser
)
router.get(
    "/",
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