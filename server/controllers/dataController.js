exports.receiveData = (req, res) => {
    console.log('Received data:', req.body);
    res.status(201).json({
        message: 'Data received successfully',
        data: req.body,
    });
};
