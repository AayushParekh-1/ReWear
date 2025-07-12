import Item from '../models/Item.js'

export const approveItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        if (!item) return res.status(404).json({ message: "Item not found" })

        item.status = 'available'
        await item.save()

        res.json({ message: "Item approved", item })
    } catch (err) {
        console.error("Approve item error:", err)
        res.status(500).json({ message: "Server error" })
    }
}

export const deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id)
        if (!item) return res.status(404).json({ message: "Item not found" })

        res.json({ message: "Item removed" })
    } catch (err) {
        console.error("Delete item error:", err)
        res.status(500).json({ message: "Server error" })
    }
}
