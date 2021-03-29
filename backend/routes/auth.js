const router=require('express').Router()
const getController=require('../controllers/getController')
const postController=require('../controllers/postController')
const putController=require('../controllers/putController')
const deleteController=require('../controllers/deleteController')
const requireLogin = require('../middlewares/requireLogin')

router.get('/users',getController.getAllUsers)

router.route('/signin').post(postController.signIn)

router.delete('/:userId',requireLogin,deleteController.deleteUser)

router.put('/:userId',requireLogin,putController.updateUser)

router.post('/signup',requireLogin,postController.signUp)

router.get('/getUser/:userId',requireLogin,getController.findUserById)

module.exports=router