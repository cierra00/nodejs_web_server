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


module.exports = router;