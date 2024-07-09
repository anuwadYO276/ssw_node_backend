// router/ExampleRoutes.js
const express = require('express');
const Controller = require('../controller/ExampleController');
const router = express.Router();

const NamePath = '/example_api';

router.use(express.json());
router.get(NamePath, Controller.selectAll);
router.get(NamePath + '/:id', Controller.selectById);
router.post(NamePath, Controller.createData);
router.put(NamePath + '/:id', Controller.updateById);
router.delete(NamePath + '/:id', Controller.deleteById);



module.exports = router;
