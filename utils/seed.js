const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");
const { getRandomName ,getRandomComment,getReaction,getRandomThought} = require("./data");

// const data

connection.on("error", (err) => err);

connection.once("open", async () => {
  // connected
  // Delete all that exist
  await User.deleteMany({});
  await Thought.deleteMany({});
  await Reaction.deleteMany({});

  let users = [];
  let thoughts = [];
  let reactions = [];

  for (let i = 0; i < 20; i++) {
    const username = getRandomName();
    const first = username.split(' ')[0];
    const last = username.split(' ')[1];

    users.push({
        username,
        "email":`${last}@${first}.com`,
    });
  }
  thoughts = getRandomThought(10);
  reactions = getReaction(20);
   await User.collection.insertMany(users);
   await Thought.collection.insertMany(thoughts);
   await Reaction.collection.insertMany(reactions);

  //console.table(users);
  //console.table(videos);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
