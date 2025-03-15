exports.getUser = (req, res) => {
    res.json({
        message: `Fetching user with ID: ${req.params.id}`,
        userId: req.params.id,
    });
};
