const Todo = require("../models/Todo")


const createNewTodo = async (req, res) => {
    console.log(req.user.role);
    if (!(req.user.role == "manager")) {
        return res.status(400).json({ message: "you are not permitted ask your manager" })
    }
    const { title, workerComments, urgency, imageUrl, workerId, recievingDate, description } = req.body
    if (!title || !workerId) {
        return res.status(400).json({ message: 'title and workerId is required' })
    }
    const todo = await Todo.create({ title, workerComments, urgency, imageUrl, workerId, recievingDate, description })
    res.json(todo)
}

const getAllTodos = async (req, res) => {
    let todos
    if (req.user.role == "manager") {

        todos = await Todo.find().lean()
    }
    else {
        todos = await Todo.find({ workerId: req.user._id }).lean()
    }

    if (!todos?.length) {
        return res.status(400).json({ message: 'no todos found' })
    }
    res.json(todos)
}

const getTodoByUserId = async (req, res) => {
    if (!(req.user.role == "manager")) {
        return res.status(400).json({ message: "you are not permitted go to your manager" })
    }
    const { id } = req.params
    const todo = await Todo.find({ workerId: id }).lean()
    if (!todo) {
        return res.status(400).json({ message: 'no todos found' })
    }
    res.json(todo)
}

const deleteTodo = async (req, res) => {
  console.log(req.user.role)
    if (!(req.user.role == "manager")) {
        return res.status(400).json({ message: "you are not permitted go to your manager" })
    }
    const { id } = req.params
    const todo = await Todo.findById(id)
    if (!todo) {
        return res.status(400).json({ message: 'no todos found' })
    }
    const result = await todo.deleteOne()
    const reply = `Todo deleted `
    res.json(reply)
}

const updateTodo = async (req, res) => {
    const { _id, title, workerComments, urgency, imageUrlMan, imageUrlWor, workerId, description, complete, doneDate } = req.body
    if (!_id ) {
        return res.status(400).json({ message: 'id and title are required' })
    }
    const todo = await Todo.findById(_id).exec()

    if (!todo) {
        return res.status(400).json({ message: 'no todos found' })
    }                               

    if (!(req.user.role == "manager")) {
        if (req.user._id != workerId) {
            return res.status(400).json({ message: "you are not permitted !!!!" })
        }
        todo.workerComments = workerComments
        todo.complete = complete
        todo.doneDate = new Date()
        todo.imageUrlWor = imageUrlWor
    }

    else {
        if (title) {
             todo.title=title
        }
        todo.complete = complete
        todo.doneDate = doneDate
        todo.imageUrlMan=imageUrlMan
        todo.description=description
        todo.urgency=urgency
       
    }
    const updateTodo = await todo.save()
    res.json(`${updateTodo.title} updated`)
}

// const updateTodoComplete = async (req, res) => {
//     const { id } = req.params

//     const todo = await Todo.findById(id).exec()
//     if (!todo) {
//         return res.status(400).json({ message: 'no todos found' })
//     }
//     todo.complete = !todo.complete
//     const updatedTodo = await todo.save
//     res.json(`${updatedTodo.name} updated`)
// }


module.exports = { createNewTodo: createNewTodo, getAllTodos, getTodoByUserId, deleteTodo, updateTodo }