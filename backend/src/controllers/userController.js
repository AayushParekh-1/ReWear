import User from '../models/User.js'

export const getProfile = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.params.uid })
        if (!user) return res.status(404).json({ message: "User not found" })
        res.json(user)
    } catch (err) {
        console.error("Get profile error:", err)
        res.status(500).json({ message: "Server error" })
    }
}

export const updatePoints = async (req, res) => {
    try {
        const { firebaseUid, amount } = req.body
        const user = await User.findOne({ firebaseUid })
        if (!user) return res.status(404).json({ message: "User not found" })

        user.points += amount
        await user.save()

        res.json({ message: "Points updated", points: user.points })
    } catch (err) {
        console.error("Update points error:", err)
        res.status(500).json({ message: "Server error" })
    }
}
