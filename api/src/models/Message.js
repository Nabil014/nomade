const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MessageSchema = new Schema({
    conversationId:{
        type: String
    },
    sender:{
        type:String
    },
    text:{
        type: String
    }
}, {timestamps:true}, { versionKey: false});


const model = mongoose.model("Message", MessageSchema);

module.exports = model;