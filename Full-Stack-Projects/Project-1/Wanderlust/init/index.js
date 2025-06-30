const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js")
require('dotenv').config()


main()
.then((res)=>{
    console.log(res);
    console.log("Connected to MongoDB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);
}

const init = async () => {
    await Listing.deleteMany({});
    // initData.data = initData.data.map((obj) => ({
    //   ...obj,
    //   owner: "6862202de82cbba4d54877b3"
    // }));
    
    //  initData.data = initData.data.map((obj) => ({
    //   ...obj,
    //   geometry: {
    //     type: "Point",
    //     coordinates: [55, 55]
    //   }
    // }));

    // initData.data = initData.data.map((obj) => ({
    //   ...obj,
    //   image: {
    //     filename: "",
    //     url: "https://res.cloudinary.com/dxzuboyqh/image/upload/v1751216098/wanderlust/zouypbmepx4zhnkfmcd6.jpg"
    //   }
    // }));
    //  await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

init();