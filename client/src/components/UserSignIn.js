import React, { useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const UserSignIn = function (props) {
    const location = useLocation()
    console.log(location.state)
    const { context } = props
    const navigate = useNavigate()
    const email = useRef()
    const password = useRef()

    const handleCancel = function (e) {
        e.preventDefault()
        navigate("/")
    }
    const handleSubmit = function (e) {
        e.preventDefault()
        // Use the signIn method on context to authenticate the user
        context.actions.signIn(email.current.value, password.current.value)
            .then(() => {
                if (location?.state?.targetRoute) {
                    navigate(location.state.targetRoute)
                } else {
                    navigate(-1)
                }
            })
            .catch(() => {
                navigate('/error')
            })
    }
    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={email} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={password} />
                    <button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <a href="/signup">sign up</a>!</p>

            </div>
        </main>
    )
}

export default UserSignIn