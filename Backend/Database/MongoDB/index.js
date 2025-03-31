const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const randomName = faker.person.fullName(); 
const randomEmail = faker.internet.email();
const randomage = Math.floor(faker.number.int() / 100000000000000);


main()
.then((res)=>{
    console.log(res);
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log('Connected to MongoDB');  
}

const userStyle = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model('User', userStyle);

const CustomerA = new User({
    name: randomName,
    email: randomEmail,
    age: randomage,
});

CustomerA.save()
    .then(() => console.log('CustomerA saved to the database'))
    .catch(err => console.log(err)); // no need to use .then here, but it's good to know if the save was successful or not as this also returns a promise (async bitch)


User.find({name: randomName}).then((data)=>{
    console.log(data);
});

User.updateOne({name : randomName}, {email: "zahansharma123@gmail.com"})
.then((data)=>{
    console.log(data);
    
});

User.findOneAndUpdate({ name: randomName }, { age: 30 }, { new: true })// new true options make return the modified doc not old one
.then((data) => {
    console.log('Updated user:', data);
})
.catch((err) => {
    console.log(err);
});

User.findOneAndDelete({email: "zahansharma123@gmail.com" })
.then((data)=>{
    console.log(data);
    
}) // can't delete if another one is being created