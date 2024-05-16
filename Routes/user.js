import express from 'express'
import userControler from '../Controller/user.js'
const router=express.Router()

router.get('/',userControler.GET_ALL_USER)
router.get('/:id',userControler.GET_USER_BY_ID)
router.post('/login',userControler.LOGIN)
router.post('/create',userControler.CREATE_USER)
router.put('/edit/:id',userControler.EDIT_USER)

export default router
