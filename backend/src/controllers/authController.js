import User from '../models/User.js'

export const loginOrCreateUser = async (req, res) => {
    try {
        const { firebaseUid, name, email, profileImage } = req.body

        let user = await User.findOne({ firebaseUid })
        if (!user) {
            user = await User.create({
                firebaseUid,
                name,
                email,
                profileImage
            })
        }

        res.status(200).json(user)
    } catch (err) {
        console.error("Login error:", err)
        res.status(500).json({ message: "Server error" })
    }
}
