const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then((res)=>{
    console.log(res);
    console.log("Connected to MongoDB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const init = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "685d82a7687680ec119989c3"
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

init();