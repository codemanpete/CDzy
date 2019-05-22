import validator from 'validator';
import isEmpty from 'is-empty';

const validateLoginInput = function (data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = data.password || ""; // see if this works
    console.log("flag 1 for removal");

    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0 // see if this works
    };
};

export default validateLoginInput;