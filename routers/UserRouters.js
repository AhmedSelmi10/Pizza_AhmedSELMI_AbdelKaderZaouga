const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/showUsers', userController.showUsers);
router.get('/getUser/:id', userController.getUserById);

router.delete('/deleteUser/:id', userController.deleteUser);
router.put('/updateUserRole/:id', userController.updateUserRole);
router.get('/getUserByEmail/:email', userController.getUserByEmail); // New route for getUserByEmail
router.get('/getUserFullName/:id', userController.getUserNameById);
router.get('/count', userController.countUsers);
router.get('/getUserImage/:id', userController.getUserImageById);
router.put('/updateUserProfile/:id', userController.updateUserProfile);
router.put('/updatePassword/:id', userController.updateUserPassword);
module.exports = router;
