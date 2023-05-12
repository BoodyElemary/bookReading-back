const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const Router = require('./routes');

app.use(express.json());
app.use('/', Router);

try {
  mongoose.connect(
    `mongodb+srv://Abdelrahman:123@bookreadscluster.vq1hyqe.mongodb.net/bookReadsApp`,
  );
} catch (error) {
  console.log(error);
}

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`book app listening on port ${port}!`));
