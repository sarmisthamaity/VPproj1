const userModel = require('../models/user.model');
const Joi = require('joi');

const registration = async (req, res) => {
    const userValidation = Joi.object({
        firstName: Joi.
            string()
            .min(3)
            .max(20)
            .required(),
        lastName: Joi.
            string()
            .min(3)
            .max(20)
            .required(),
        email: Joi.
            string()
            .email()
            .required(),
        password: Joi.
            string()
            .alphanum()
            .max(8)
            .min(1)
            .required(),
        confirmpassword: Joi.
            string()
            .max(8)
            .min(1)
            .required(),
        mobileNumber: Joi
            .string()
            .alphanum()
            .max(10)
            .min(1)
            .required()
    });
    let dataValidationWithjoi = userValidation.validate(req.body);
    if (dataValidationWithjoi.error) {
        console.log(dataValidationWithjoi.error, "OOOO");
        return res.status(300).send({
            status: 300,
            errorMessage: dataValidationWithjoi.error.details[0].message
        });
    }else{
        dataValidationWithjoi = dataValidationWithjoi.value;
    }
    const existingUser = await userModel.findOne({ email: dataValidationWithjoi.email });
    if (existingUser) {
        return res.status(202).send({
            status: 202,
            message: "user already exists"
        });
    } else{
        
    };
    try {
        const userdetails = {
            firstName: dataValidationWithjoi.firstName,
            lastName: dataValidationWithjoi.lastName,
            email: dataValidationWithjoi.email,
            password: dataValidationWithjoi.password,
            confirmpassword: dataValidationWithjoi.confirmpassword,
            mobileNumber: dataValidationWithjoi.mobileNumber
        };
        const saveData = await userModel.create(userdetails);
        return res.status(202)
            .send({
                message: 'user created',
                data: saveData,
                status: 202
            });
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            status: 400,
            error: err
        });
    };
};

module.exports = { registration };