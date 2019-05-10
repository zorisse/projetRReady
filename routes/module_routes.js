const express = require('express');
const router = express.Router();


// require Module Model 
const Module = require('../models/formation/Module');



// Get all celebrities 

router.get('/module', (req, res, next) => {
  Module.find()
    .then(module => {

      res.render('module/module.hbs', { module })
    })
    .catch(err => console.log(err))
})


// adding
// Adding 

router.get('/module/add', (req, res, next) => {
  res.render('module/module_adding_form.hbs')
})

router.post('/module/add', (req, res, next) => {
  const { title, image, media_url } = req.body
  Module.create({ title, image, media_url })
    .then(module => {
      res.redirect('/module')
    })
    .catch(err => console.log(err))
})

///////////////////


// // get a specific Celebrity 

router.get('/module/:id', (req, res, next) => {
  Module.findOne({ _id: req.params.id })
    .then(module => {
      res.render('module/module.hbs', { module })
    })
    .catch(err => console.log(err))
})


// //Update 
router.get('/module/:id/edit', (req, res, next) => {
  Module.findOne({ _id: req.params.id })
    .then(module => {
      res.render('module/module_update_form.hbs', { module })
    })
    .catch(err => console.log(err))
})

router.post('/module/:id', (req, res, next) => {
  const { title, image, media_url } = req.body
  const id = req.params.id
  Module.update({ _id: id }, { $set: { title, image, media_url } })
    .then(module => {
      console.log(' Module modifié', module)
      res.redirect(`/module`)
    })
    .catch(err => console.log(err))
})



// // Deleting 
router.get('/module/:id/remove', (req, res, next) => {
  Module.remove({ _id: req.params.id })
    .then(module => {
      console.log(module)
      res.redirect('/module')
    })
    .catch(err => console.log(err))
})



/// 
module.exports = router;
