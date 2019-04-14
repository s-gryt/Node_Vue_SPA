import * as mongoose from 'mongoose';

const objectValidator = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send({
            success: false,
            message: "Invalid Id",
            data: null
        });
    next();
}

export default objectValidator;
