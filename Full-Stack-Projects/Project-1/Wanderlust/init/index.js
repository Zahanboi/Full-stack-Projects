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
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

init();