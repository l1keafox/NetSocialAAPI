const { Schema, Types } = require('mongoose');


// (SCHEMA ONLY)
const reactSchema = new Schema(
    {
        reactionId:{
            // Use Mongoose's ObjectId data type
            // Default value is set to a new ObjectId
        },
        reactionBody:{
            type:String,
            required:true,
            maxLength: 280,
        },
        userName:{
            type:String,
            required:true,
        },
        createdAt:{
            type:Date,
            // Set default value to the current timestamp
            // Use a getter method to format the timestamp on query            
        }
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
        }
    
    );
    
    // Schema Settings

    // This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

module.exports = reactSchema;