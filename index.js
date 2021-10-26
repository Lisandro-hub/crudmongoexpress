const express = require('express');
const router = express.Router(); // El mismo manejo de rutas pero con el método Router de express
const Task = require('../model/task');
//endpoint de la raiz del sitio
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.render('index', {
    tasks
  });
});
// endpoint para agregar una task (middleware)
router.post('/add', async (req, res, next) => {
  const task = new Task(req.body);
  await task.save();
  res.redirect('/');
});
// endpoint para alternar boton hecho de cada tarea
router.get('/turn/:id', async (req, res, next) => {
  let { id } = req.params;
  const task = await Task.findById(id);
  task.status = !task.status;
  await task.save();
  res.redirect('/');
});

//endpoint para editar la task
router.get('/edit/:id', async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  console.log(task)
  res.render('edit', { task });
});

// endpoint para actualizar la task
router.post('/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await Task.update({_id: id}, req.body);
  res.redirect('/');
});
// endpoint para eliminar
router.get('/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await Task.remove({_id: id});
  res.redirect('/');
});

module.exports = router;