const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/rbs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = new mongoose.Schema({ task: String });
const Task = mongoose.model('Task', taskSchema);

// Home page - list tasks
app.get('/', (req, res) => {
  Task.find({})
    .then(tasks => res.render('index', { tasks }))
    .catch(err => console.log(err));
});

// Add task
app.post('/', (req, res) => {
  const task = new Task({ task: req.body.newTask });
  task.save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

// Delete task
app.post('/delete/:id', (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

app.listen(8080, () =>
  console.log("✅ Server started on http://127.0.0.1:8080")
);
