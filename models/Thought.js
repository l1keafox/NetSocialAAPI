const { Schema, Types } = require('mongoose');


const thoughtSchema = new Schema(
    {
        toJSON: {
          getters: true,
        },
        id: false,
        }
    
    );
    
    module.exports = thoughtSchema;