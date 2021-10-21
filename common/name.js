const regExp = /^[a-zA-Z\-]+$/g

const nameValidation = (username) => {
    if(username.length <= 20){
        if(username.match(regExp)){
            return username
        } else {
            return "invalid"
        }
    }else{
        return "invalid"
    }
};

module.exports = {nameValidation};