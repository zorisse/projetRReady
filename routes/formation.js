const express = require('express');
const router = express.Router();


// require Module Model 
const Formation = require('../models/formation/Formation');
const Module = require('../models/formation/Module')
const ModuleSuccess = require('../models/formation/Module_success')
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

router.get('/formation/:id', check.isAuthenticated, check.checkGuest, (req, res, next) => {
  const user = req.user

  ModuleSuccess.find({ user })
    .populate('modules')
    .then(modulesDone => { // module déjà réalisé depuis la collection modulesucess 
      console.log("modulesdone =>", modulesDone.length)
      if (modulesDone.length > 0) {
        console.log("array")
        Formation.findOne({ _id: req.params.id })
          .populate('modules')
          .then(formation => {
            // console.log("modules réalisé => ", modulesDone[0].module)
            // console.log('formation=> ', formation.modules)

            let modulesDoneArray = formation.modules.map(module => {
              // les ID sont des obj il faut les transformer en string. 

              console.log(module._id);
              console.log("modules réalisé => ", modulesDone[0].module)
              let str = modulesDone[0].module.map(o => o.toString())
              // je passe les id en string popur les comparer
              if (str.includes(module._id.toString())) {
                // module.done = true
                return { ...module.toObject(), done: true }

              } else {
                return { ...module.toObject(), done: false }

                // module.done = false
              }
              // return module
            })




            console.log("who is done => ", modulesDoneArray);

            res.render('formation/OneFormation.hbs', { user: req.user, formation, modulesDoneArray })
            // res.send(formation)
          })

      } else {
        console.log("ok formation")
        Formation.findOne({ _id: req.params.id })
          .populate('modules')
          .then(formation => {
            res.render('formation/OneFormation.hbs', { user: req.user, formation })
            // res.send(formation)
          })
          .catch(err => console.log(err))

      }
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



// /// success






router.post('/formation/module-success', (req, res, next) => {
  const { user, module, formationid } = req.body


  // si le user n'a jamais validé le module 
  ModuleSuccess.find({ user, module })
    .then(moduleSuccess => {
      if (moduleSuccess.length > 0) {
        res.redirect(`/formation/${formationid}`)
      }


    })
  // le user existe 
  ModuleSuccess.find({ user })
    .then(userSuccess => {
      console.log(userSuccess.length);
      if (userSuccess.length > 0) {
        ModuleSuccess.updateOne({ user }, { $addToSet: { module } })
          .then(moduleSuccess => {
            console.log(' Module success => ', moduleSuccess)
            res.redirect(`/formation/` + formationid)
          })
      } else {
        ModuleSuccess.create({ module, user })
          .then(success => {
            console.log('success =>', success)
            res.redirect('/formation/' + formationid)
          })
      }


    })
    .catch(err => console.log(err))

})


module.exports = router;
