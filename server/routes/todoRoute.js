

const express = require("express")
const router = express.Router()
const verifyJWT=require('../middleware/verifyJWT')

const todoController = require("../controller/todoController");

router.get('/',verifyJWT,todoController.getAllTodos)
router.get('/:id',verifyJWT,todoController.getTodoByUserId)
router.post('/',verifyJWT,todoController.createNewTodo )
router.delete('/:id',verifyJWT,todoController.deleteTodo)
router.put('/',verifyJWT,todoController.updateTodo)


module.exports = router