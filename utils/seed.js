const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");
const { getRandomName ,getRandomComment,getReaction,getRandomThought} = require("./data");

// const data

connection.on("error", (err) => err);

connection.once("open", async () => {
  // connected
  // Delete all that exist
  await User.deleteMany({});
  let users = [];
  for (let i = 0; i < 20; i++) {
    const username = getRandomName();
    const first = username.split(' ')[0];
    const last = username.split(' ')[1];

    users.push({
        username,
        "email":`${last}@${first}.com`,
    });
  }
  await User.collection.insertMany(users);
  console.info("Seeding Users");

  await Thought.deleteMany({});
  let thoughts = [];
  thoughts = getRandomThought(10); // We here should have it had all the users to create thoughts with.
  await Thought.collection.insertMany(thoughts);
  console.info("Seeding Thoughts");

  await Reaction.deleteMany({});
  let reactions = [];
  reactions = getReaction(20); // here we should have all the thoughts and maybe users too add too create reactions too.
  await Reaction.collection.insertMany(reactions);
  console.info("Seeding Reacts");
  //console.table(users);
  //console.table(videos);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
