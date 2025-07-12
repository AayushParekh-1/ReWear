import express from 'express'
import { addItem, getAllItems, getItemById } from '../controllers/itemController.js'

const router = express.Router()

router.post('/', addItem)
router.get('/', getAllItems)
router.get('/:id', getItemById)

export default router
