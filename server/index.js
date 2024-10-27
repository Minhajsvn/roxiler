require('dotenv').config()
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;


mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('DB successfully connected'))
.catch(err => console.log('DB failed to connected', err))


app.listen(PORT, () => {
    console.log('Server connected to port', PORT);
});