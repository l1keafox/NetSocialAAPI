const connection = require('../config/connection');
const {User,Thought,Reaction } = require('../models');
// const data


connection.on('error', (err) => err);

connection.once('open', async () => {
// connected
// Delete all that exist
await User.deleteMany({});
await Thought.deleteMany({});
await Reaction.deleteMany({});

const users = [];
const thoughts = [];
const reactions = [];




await User.collection.insertMany(users);
await Thought.collection.insertMany(thoughts);
await Reaction.collection.insertMany(reactions);



//console.table(users);
//console.table(videos);
console.info('Seeding complete! 🌱');
process.exit(0);


});