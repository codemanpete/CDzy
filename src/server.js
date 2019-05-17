import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect(
        'mongodb://localhost/CDzy-Dev', {
            useNewUrlParser: true
        }
    ).then(() => {
        console.log("MongoDB has successfully connected");
    })
    .catch((err) => {
        console.log("Mongoose error: " + err);
    });

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Express server running on port ${port}`);
});