const mongoose = require('mongoose');
const DB = 'mongodb+srv://yashd:webdev%401234@nodeexpressproject.qp0arwg.mongodb.net/JS?retryWrites=true&w=majority';

mongoose.connect(DB).then(() => {
  console.log("Connection successful...");
}).catch((err) => {
  console.log(err);
});
