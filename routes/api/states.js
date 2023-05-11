const express = require('express');
const router = express.Router();
const path = require('path');

const statesController = require ('../../controller/statesController')


router.route('/')
.get(statesController.getAllStates)
.post(statesController.createNewState)
.put(statesController.updateState)
.delete(statesController.DeleteState)

router.route('/:code')
.get(statesController.getState)

router.route('/:code/funfacts')
.get(statesController.getFunfacts)

router.route('/:code/capital')
.get(statesController.getCapital)

router.route('/:code/Admission')
.get(statesController.getAdmission)

router.route('/:code/Population')
.get(statesController.getPopulation)


router.route('/:code/nickname')
.get(statesController.getNickname)






module.exports = router;