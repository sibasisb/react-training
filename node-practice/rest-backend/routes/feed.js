const router=require('express').Router()

const feedController=require('../controllers/feed')
const addPostController=require('../controllers/addPosts')

router.get('/getPosts',feedController.getPosts)

router.post('/createPost',addPostController.createPost)

module.exports=router