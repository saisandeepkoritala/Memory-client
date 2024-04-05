import React from 'react'

export const SignIn = () => {
    return (
        <div>
            <a href="http://localhost:5000/api/v1/user/auth/google">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"></img>
                    <span>Login with Google</span>
                </a>
        </div>
    )
}
