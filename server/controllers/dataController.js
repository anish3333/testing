exports.receiveData = (req, res) => {
    console.log('Received data:', req.body);
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber > 75) {
        return res.status(400).json({
            message: 'Random number is greater than 75',
            number: randomNumber,
        });
    }
    res.status(200).json({
        message: 'Data received successfully',
        data: req.body,
    });
};
