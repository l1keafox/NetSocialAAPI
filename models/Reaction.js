const { Schema, Types } = require('mongoose');

const reactSchema = new Schema(
    {
        toJSON: {
          getters: true,
        },
        id: false,
        }
    
    );
    
module.exports = reactSchema;