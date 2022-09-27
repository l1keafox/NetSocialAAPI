const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
    {
        username:{
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
        thoughts:[
            {
//Array of _id values referencing the Thought model
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends:[{
//Array of _id values referencing the User model (self-reference)
                type: Schema.Types.ObjectId,
                ref: 'user'
        }],
    },
    {
    toJSON: {
      getters: true,
    },
    id: false,
    }

);


//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
const User = model('user',userSchema);
module.exports = User;