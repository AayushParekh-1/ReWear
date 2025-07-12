import Item from '../models/Item.js'
import User from '../models/User.js'

export const addItem = async (req, res) => {
    try {
        const { ownerId, title, description, images, category, size, condition, tags } = req.body

        const owner = await User.findById(ownerId)
        if (!owner) return res.status(404).json({ message: "Owner not found" })

        const item = await Item.create({
            owner,
            title,
            description,
            images,
            category,
            size,
            condition,
            tags
        })

        res.status(201).json(item)
    } catch (err) {
        console.error("Add item error:", err)
        res.status(500).json({ message: "Server error" })
    }
}

export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find({ status: 'available' }).populate('owner', 'name profileImage')
        res.json(items)
    } catch (err) {
        console.error("Get all items error:", err)
        res.status(500).json({ message: "Server error" })
    }
}

export const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('owner', 'name profileImage')
        if (!item) return res.status(404).json({ message: "Item not found" })
        res.json(item)
    } catch (err) {
        console.error("Get item by id error:", err)
        res.status(500).json({ message: "Server error" })
    }
}
