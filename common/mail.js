var mailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const emailValidation = (mail) => {
    if (!mail) {
        return "invalid";
    }
    if (mail.length > 100) {
        return "invalid";
    }
    var validation = mailRegex.test(mail);
    if (!validation) {
        return "invalid";
    }
    var parts = mail.split("@");
    if (parts[0].length > 64) {
        return "invalid";
    }
    var domainParts = parts[1].split(".");
    if (domainParts.some(function (part) { 
        return part.length > 10; })) {
        return "invalid";
    }
    return mail;
};


module.exports = {emailValidation};