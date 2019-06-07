import validator from 'validator';

const validateLoginInput = function (data) {
    let error = {};

    data.email = data.email || "";
    data.password = data.password || "";

    if (validator.isEmpty(data.email)) {
        error.email = "Email field is required";
    } else if (!validator.isEmail(data.email)) {
        error.email = "Email is invalid";
    }

    if (validator.isEmpty(data.password)) {
        error.password = "Password field is required";
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    };
};

export default validateLoginInput;