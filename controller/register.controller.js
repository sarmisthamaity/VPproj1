const userModel = require('../models/user.model');
const mailvalidation = require('../common/mail');
const mobileValidation = require('../common/mobile');
const nameValidation = require('../common/name');

const registration = async (req, res) => {
    const {firstName, lastName, password, confirmpassword, email, mobileNumber} = req.body;
    let mailValidation = await mailvalidation.emailValidation(email);
    const firstNameValidation = await nameValidation.nameValidation(firstName);
    const lastNameValidation = await nameValidation.nameValidation(lastName);
    const mobileNumberValidation = await mobileValidation.regexPhoneNumber(mobileNumber);
    if(firstNameValidation === "invalid" || lastNameValidation === "invalid"){
        return res.status(300).send({
            status: 300,
            message: "invalid" + " " + "firstname" + " " + " or lastname"
        });
    }
    if(password != confirmpassword){
        return res.status(300).send({
            status: 300,
            message: "password not corrected"
        });
    }
    if(mailValidation == "invalid"){
        return res.status(300).send({
            status: 300,
            message: mailValidation + "mail"
        });
    }
    if(mobileNumberValidation === "invalid"){
        return res.status(300).send({
            status: 300,
            message: mobileNumberValidation + " " + "phonenumber"
        });
    }
    const existingUser = await userModel.findOne({ email: mailValidation });
    if (existingUser) {
        return res.status(202).send({
            status: 202,
            message: "user already exists"
        });
    } else{
        
    };
    try {
        const userdetails = {
            firstName: firstNameValidation,
            lastName: lastNameValidation,
            email: mailValidation,
            password: password,
            confirmpassword: confirmpassword,
            mobileNumber: mobileNumberValidation
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