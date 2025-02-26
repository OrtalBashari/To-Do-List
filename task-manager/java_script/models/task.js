const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        /*
        title : the name of the task.
        completed : if the task is completed or not.
        createdAt : when the task was create.
        */ 
        title: {type: String, require: true}, 
        completed: {type: Boolean, default: false}, 
        createdAt: {type: Date, default: Date.now}

    });


const Task = mongoose.model("Task", taskSchema);
module.exports = Task;