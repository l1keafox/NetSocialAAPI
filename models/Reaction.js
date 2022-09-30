const { Schema, Types , model} = require('mongoose');


// (SCHEMA ONLY)
const reactSchema = new Schema(
    {
        reactionId:{
            // Use Mongoose's ObjectId data type
            type: Types.ObjectId,
            // Default value is set to a new ObjectId
            default: () => new Types.ObjectId(),
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
            default: Date.now,
            get: date=>date.toDateString()
            // Set default value to the current timestamp
            // Use a getter method to format the timestamp on query            
        }
    },
    {
        toJSON: {
          getters: true,
          virtuals: true,
        },
        id: false,
        }
    
    );
    
    // Schema Settings

    // This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
// const React = model('reaction',reactSchema);
module.exports = reactSchema;