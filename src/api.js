import axios from 'axios';

export default {
    user: {
        signIn: credentials =>
            axios.post("/api/auth", { credentials }).then(res => res.data.user),
        signUp: user =>
            axios.post("/api/users", { user }).then(res => res.data.user),
        confirm: token =>
            axios.post("/api/auth/confirmation", { token }).then(res => res.data.user),
        confirmEmail: email =>
            axios.post("/api/auth/confirm_email", { email }),
        validateToken: token =>
            axios.post("/api/auth/validate_token", { token }),
        resetPassword: data =>
            axios.post("/api/auth/reset_password", { data }),
        resendConfirmationMessage: email =>
            axios.post("api/users/send_email", { email })
    }
}