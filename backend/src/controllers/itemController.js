import Item from '../models/Item.js'
import User from '../models/User.js'
import cloudinary from '../utils/cloudinaryConfig.js'

export const addItem = async (req, res) => {
    try {
        const { ownerId, title, description, category, size, condition, tags } = req.body;

        const owner = await User.findById(ownerId);
        if (!owner) return res.status(404).json({ message: "Owner not found" });

        let imageUrl = '';
        if (req.file) {
            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) throw error;
                imageUrl = result.secure_url;
            });
            // Use a Promise to wait for upload_stream
            await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (error) return reject(error);
                    imageUrl = result.secure_url;
                    resolve();
                });
                stream.end(req.file.buffer);
            });
        }

        const item = await Item.create({
            owner,
            title,
            description,
            images: imageUrl ? [imageUrl] : [],
            category,
            size,
            condition,
            tags: tags ? (Array.isArray(tags) ? tags : [tags]) : []
        });

        res.status(201).json(item);
    } catch (err) {
        console.error("Add item error:", err);
        res.status(500).json({ message: "Server error" });
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
