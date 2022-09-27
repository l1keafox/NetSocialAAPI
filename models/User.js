const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
    {
        username:{
            //String,unique,required,trimmed
            type:String,
            required: true,
            unique:true,
            trim: true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            // Must match a valid email address
            validate: [ isEmail, 'invalid email' ]
        },
        thoughts:{
//Array of _id values referencing the Thought model
        },
        friends:{
//Array of _id values referencing the User model (self-reference)
        },
    },
    {
    toJSON: {
      getters: true,
    },
    id: false,
    }

);


//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

module.exports = userSchema;