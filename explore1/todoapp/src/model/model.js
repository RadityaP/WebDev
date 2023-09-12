import mongoose from "mongoose";

const DocSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, "isi bro"]
    }
},{collection : "Item"})

export const Task = mongoose.model.task || mongoose.model('task',DocSchema)

module.exports = {Task}