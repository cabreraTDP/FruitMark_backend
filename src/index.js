const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors');

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}

require('dotenv').config('./');

const app = express();
const db = require('./utils/database');

const port = process.env.PORT || 7799;

app.unsubscribe(express.static('public'));
app.use(express.json({ extended: false}));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/stores', require('./api/stores/routes'))

db.connection().then(mongo => {
    app.listen(port, () => {
        console.log('Server started on port', port);
    })
}).catch(err => {
    console.error(err);
})
