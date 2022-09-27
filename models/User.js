const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
    {
    toJSON: {
      getters: true,
    },
    id: false,
    }

);

module.exports = userSchema;