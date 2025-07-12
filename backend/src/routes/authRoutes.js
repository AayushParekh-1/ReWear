import express from 'express'
import { loginOrCreateUser } from '../controllers/authController.js'

const router = express.Router()

router.post('/login', loginOrCreateUser)

export default router
