const express = require('express');
const router = express.Router();


// require Module Model 
const Qcm = require('../models/qcm/Qcm');
const Question = require('../models/qcm/Question');



// Get all celebrities 

router.get('/qcm', (req, res, next) => {
  Qcm.find()
    .populate('questions', 'title')
    .then(qcm => {

      res.render('qcm/qcm.hbs', { qcm })
    })
    .catch(err => console.log(err))
})


// adding
// Adding 

router.get('/qcm/add', (req, res, next) => {
  Question.find()
    .then(question => {
      // je vais chercher tous les questions pour le select 
      res.render('qcm/qcm_adding_form.hbs', { user: req.user, question })
    })
    .catch(err => console.log(err))
})

router.post('/qcm/add', (req, res, next) => {
  const { title, question } = req.body
  console.log("les questions selctionées => ", question)
  Qcm.create({ title, question })
    .then(qcm => {
      res.redirect('/qcm')
    })
    .catch(err => console.log(err))
})


router.get('/question/add', (req, res, next) => {
  res.render('qcm/question_adding_form.hbs')
})

router.post('/question/add', (req, res, next) => {
  const { title,
    image,
    comment,
    reponse1,
    reponse2,
    reponse3,
    reponse4,
    reponse_correct, } = req.body
  Question.create({
    title,
    image,
    comment,
    reponse1,
    reponse2,
    reponse3,
    reponse4,
    reponse_correct,
  })
    .then(qcm => {
      res.redirect('/qcm')
    })
    .catch(err => console.log(err))
})

///////////////////


// // get a specific Celebrity 

router.get('/qcm/:id', (req, res, next) => {
  Qcm.findOne({ _id: req.params.id })
    .populate('question')
    .then(qcm => {
      res.render('qcm/qcmOne.hbs', { qcm })
    })
    .catch(err => console.log(err))
})
router.get('/qcm/:id/axios', (req, res, next) => {
  Qcm.findOne({ _id: req.params.id })
    .populate('question')
    .then(qcm => {
      res.send(qcm)
    })
    .catch(err => console.log(err))
})



// //Update 
router.get('/qcm/:id/edit', (req, res, next) => {
  Qcm.findOne({ _id: req.params.id })
    .then(qcm => {
      res.render('qcm/qcm_update_form.hbs', { qcm })
    })
    .catch(err => console.log(err))
})

router.post('/qcm/:id', (req, res, next) => {
  const { } = req.body
  const id = req.params.id
  Qcm.update({ _id: id }, { $set: {} })
    .then(qcm => {
      console.log(' Qcm modifié', qcm)
      res.redirect(`/qcm`)
    })
    .catch(err => console.log(err))
})



// // Deleting 
router.get('/qcm/:id/remove', (req, res, next) => {
  Qcm.remove({ _id: req.params.id })
    .then(qcm => {
      console.log(qcm)
      res.redirect('/qcm')
    })
    .catch(err => console.log(err))
})



/// 
module.exports = router;
