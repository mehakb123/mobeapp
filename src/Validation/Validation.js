import * as yup from "yup"

export const userSchema = yup.object().shape({
    // name: yup.string().required('Required!'),
    email: yup.string().email('Invalid Email Format').required(),
    password: yup.string().min(6).max(10).required()
});
export const forgotPasswordSchema = yup.object().shape({
    // name: yup.string().required('Required!'),
    email: yup.string().email('Invalid Email Format').required(),
    // password: yup.string().min(6).max(10).required()
});
