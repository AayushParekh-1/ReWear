import express from 'express';
import multer from 'multer';
import { addItem } from '../controllers/itemController.js';

const router = express.Router();

// Multer setup for single image upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/items - add new item with image upload
router.post('/', upload.single('image'), addItem);

// ✅ GET /api/items?ownerId=uid&page=1
router.get('/', async (req, res) => {
  try {
    const { page = 1, ownerId } = req.query;
    const limit = 6;
    const skip = (page - 1) * limit;

    const query = ownerId ? { ownerId } : {};

    const items = await Item.find(query).skip(skip).limit(limit);
    const totalItems = await Item.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      items,
      totalPages
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch items" });
  }
});

export default router;
