import express from 'express'
import { approveItem, deleteItem } from '../controllers/adminController.js'
import { verifyAdmin } from '../middleware/adminMiddleware.js'

const router = express.Router()

router.patch('/items/:id/approve', verifyAdmin, approveItem)
router.delete('/items/:id', verifyAdmin, deleteItem)

export default router
