import express from 'express'
import { requestSwap, acceptSwap, getSwapsForUser } from '../controllers/swapController.js'

const router = express.Router()

router.get('/user/:userId', getSwapsForUser)
router.post('/', requestSwap)
router.patch('/:id/accept', acceptSwap)

export default router
