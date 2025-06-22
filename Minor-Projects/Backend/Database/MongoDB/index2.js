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

const bookSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    author : {
        type: String,
    },
    pages : {
        type: Number,
        min : [100 , 'Too few pages'],
        max : 1000
    },

    genre : [String],

    price : {
        type: Number,
        required: function(){
            return this.pages > 200;// if return true then price is required otherwise not
        }
    },

    category : {
        type: String,
        enum : ['fiction', 'non-fiction', 'biography']
    },
});
 
const Book = mongoose.model('Book', bookSchema);

const book1 = new Book({
    title: 'kill yourself',
    author: "Zahanboi",
    pages: 300,
    genre: "crazy",
    price: 3000,
    category: 'fiction'
});

async function save() {
    await book1.save();
}
save();

console.log('Book saved successfully.');

async function update() {
   await Book.findByIdAndUpdate({_id: '67d0554dba1d5d271b24dcbb'}, {category: 'non-fiction'}, {runValidators: true})
.then((data) => {
    console.log('Updated user:', data);
})
.catch((err) => {
    console.log(err.errors.category.properties.message);
});

mongoose.connection.close();// wrote here because this works independently ofthe other code so connection gets closed even before establishing or even when ops are performed but using async func solves that but still they are called by a func so write it in a code block to execute after await is resolved

}

update();


