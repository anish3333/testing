exports.getUser = (req, res) => {
    res.json({
        message: `Fetching user with ID: ${req.params.id}`,
        userId: req.params.id,
    });
};

// ✅ New POST controller function
exports.createUser = (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    res.status(201).json({
        message: "User created successfully!",
        user: {
            name,
            email,
        },
    });
};
