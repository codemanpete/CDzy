import validator from 'validator';
import isEmpty from 'is-empty';

const validateRegisterInput = function (data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password1 = !isEmpty(data.password1) ? data.password1 : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // validator.isEmpty is different from isEmpty
    // validator.isEmpty checks if string has length 0.
    if (validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (validator.isEmpty(data.password1)) {
        errors.password = "Password field is required";
    }

    if (validator.isEmpty(data.password2)) {
        errors.password = "Confirm password field is required";
    }

    if (!validator.isLength(data.password1, {
            min: 6,
            max: 100
        })) {
        errors.password = "Password must be between 6-100 characters long";
    }

    if (!validator.equals(data.password1, data.password2)) {
        errors.password = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};

export default validateRegisterInput;