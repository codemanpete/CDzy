import validator from 'validator';

const validateLoginInput = function (data) {
    let errors = {};

    data.email = data.email || "";
    data.password = data.password || "";

    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};

export default validateLoginInput;