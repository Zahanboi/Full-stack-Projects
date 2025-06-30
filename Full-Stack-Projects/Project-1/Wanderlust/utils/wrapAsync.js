module.exports = (fn) => {
    return (req,res,next) => {
        fn(req, res, next).catch(next);
    }
}

//passing next callback as argument meaning like err => next(err)