export const verifyAdmin = (req, res, next) => {
    const { isAdmin } = req.query

    if (!isAdmin) {
        return res.status(403).json({ message: 'Access denied. Admins only.' })
    }

    next()
}
