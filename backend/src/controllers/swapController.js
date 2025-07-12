import Swap from '../models/Swap.js'
import Item from '../models/Item.js'
import User from '../models/User.js'

export const requestSwap = async (req, res) => {
    try {
        const { itemId, requestedById, type } = req.body;
        if (!itemId || !requestedById || !type) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const item = await Item.findById(itemId).populate('owner');
        if (!item) return res.status(404).json({ message: "Item not found" });

        const swap = await Swap.create({
            item: itemId,
            requestedBy: requestedById,
            owner: item.owner?._id || item.owner,
            type
        });

        res.status(201).json(swap);
    } catch (err) {
        console.error("Request swap error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export const acceptSwap = async (req, res) => {
    try {
        const swap = await Swap.findById(req.params.id)
            .populate('item')
            .populate('requestedBy')
            .populate('owner');

        if (!swap) return res.status(404).json({ message: "Swap not found" });

        swap.status = 'completed';
        await swap.save();

        swap.item.status = 'swapped';
        await swap.item.save();

        if (swap.type === 'points') {
            if (swap.requestedBy.points < 50) {
                return res.status(400).json({ message: "Insufficient points." });
            }
            swap.requestedBy.points -= 50;
            swap.owner.points += 50;
            await swap.requestedBy.save();
            await swap.owner.save();
        }

        res.json({ message: "Swap completed", swap });
    } catch (err) {
        console.error("Accept swap error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export const getSwapsForUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const swaps = await Swap.find({
            $or: [
                { owner: userId },
                { requestedBy: userId }
            ]
        }).populate('item requestedBy owner');

        if (!swaps.length) {
            return res.status(404).json({ message: "No swaps found for this user." })
        }

        res.json(swaps);
    } catch (err) {
        console.error("Get swaps for user error:", err)
        res.status(500).json({ message: "Server error" })
    }
}

