import express from 'express'
import { getProfile, updatePoints } from '../controllers/userController.js'

const router = express.Router()

router.get('/profile/:uid', getProfile)
router.patch('/points', updatePoints)

export default router
