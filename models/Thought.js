const { Schema, Types } = require("mongoose");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      // Set default value to the current timestamp
      // Use a getter method to format the timestamp on query
    },
    userName: {
      //creator
      type: String,
      required: true,
    },
    reactions: {
      // sort of like replies.
      //Array of nested documents created with the reactionSchema
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

//     Schema Settings

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
module.exports = thoughtSchema;
