const express = require('express');
const router = express.Router();


// require Module Model 
const Formation = require('../models/formation/Formation');
const Module = require('../models/formation/Module')
let check = require('../middlewar/checkRole')



// Get all celebrities 

router.get('/formation', check.isAuthenticated, check.checkGuest, (req, res, next) => {

  Formation.find()
    .populate('modules', 'title')
    .then(formation => {

      res.render('formation/formation.hbs', { user: req.user, formation })
    })
    .catch(err => console.log(err))
})


// // adding
// // Adding 

router.get('/formation/add', check.isAuthenticated, check.checkGuest, (req, res, next) => {
  Module.find()
    .then(module => {
      // je vais chercher tous les modules pour le select 
      res.render('formation/formation_adding_form.hbs', { user: req.user, module })
    })
    .catch(err => console.log(err))
})

router.post('/formation/add', (req, res, next) => {
  const { title, image, resume, modules } = req.body

  Formation.create({
    title, image, resume, modules
  })
    .then(formation => {
      res.redirect('/formation')
    })
    .catch(err => console.log(err))
})

// ///////////////////


// // // get a specific Formation

router.get('/formation/:id', (req, res, next) => {
  Formation.findOne({ _id: req.params.id })
    .populate('modules')
    .then(formation => {

      res.render('formation/OneFormation.hbs', { user: req.user, formation })
      // res.send(formation)
    })
    .catch(err => console.log(err))
})


// // //Update 
// router.get('/module/:id/edit', (req, res, next) => {
//   Module.findOne({ _id: req.params.id })
//     .then(module => {
//       res.render('module/module_update_form.hbs', { module })
//     })
//     .catch(err => console.log(err))
// })

// router.post('/module/:id', (req, res, next) => {
//   const { title, image, media_url } = req.body
//   const id = req.params.id
//   Module.update({ _id: id }, { $set: { title, image, media_url } })
//     .then(module => {
//       console.log(' Module modifié', module)
//       res.redirect(`/module`)
//     })
//     .catch(err => console.log(err))
// })



// // // Deleting 
// router.get('/module/:id/remove', (req, res, next) => {
//   Module.remove({ _id: req.params.id })
//     .then(module => {
//       console.log(module)
//       res.redirect('/module')
//     })
//     .catch(err => console.log(err))
// })



// /// 
module.exports = router;
