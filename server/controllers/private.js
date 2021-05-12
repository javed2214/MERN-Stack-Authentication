exports.private = (req, res) => {
    res.status(200).json({
        message: 'You got the Access of Private Route'
    })
}