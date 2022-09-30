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
        "thoughts":[],
    });
  }
  // We create users then using those users

  await Reaction.deleteMany({});
  let reactions = [];
  // we are passing users for names, and thoughts too add it self too.
  reactions = getReaction(20,users); // here we should have all the thoughts and maybe users too add too create reactions too.
  let reacts = await Reaction.collection.insertMany(reactions);
  console.info("Seeding Reacts");

  let reactArray =[];
  for(let i in reacts.insertedIds){
    reactArray.push( reacts.insertedIds[i] );
  }
  await Thought.deleteMany({});
  let thoughts = [];
  // we creates thoughts. we are passing users too it.
  thoughts = getRandomThought(10,users,reactArray); // We here should have it had all the users to create thoughts with.
  let thoughts2 = await Thought.collection.insertMany(thoughts);
  console.info("Seeding Thoughts");
  let thoughtArray =[];

  // So we need to find the username in these so 
  for(let i in thoughts2.insertedIds){
    let oneThought = await Thought.findOne({ _id: thoughts2.insertedIds[i] });
    for(let e in users){
      if(users[e].username === oneThought.username){
        users[e].thoughts.push(thoughts2.insertedIds[i]);
      }
    }
  }

  // then we take those thoughts and add it to users thoughts.
  await User.collection.insertMany(users);
  console.info("Seeding Users");


  //console.table(users);
  //console.table(videos);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
