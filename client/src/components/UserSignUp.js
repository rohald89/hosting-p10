import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

const UserSignUp = function (props) {
    const { context } = props
    const navigate = useNavigate()
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const password = useRef()

    const [valErrors, setValErrors] = useState([])

    const handleCancel = function (e) {
        e.preventDefault()
        navigate("/")
    }
    const handleSubmit = function (e) {
        e.preventDefault()
        // Create user
        // Use the refs in form inputs to build a user object
        const user = { "firstName": firstName.current.value, "lastName": lastName.current.value, "emailAddress": email.current.value, "password": password.current.value }
        // Use the createUser method on Data class with the user object to create a new user in db
        context.data.createUser(user)
            .then(res => {
                // If validation errors are returned, render the errors onto the page
                if (res.length) {
                    setValErrors((<div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {res.map((error, i) => <li key={i}>{error}</li>)}
                        </ul>
                    </div>))
                }
                else {
                    // Use the signIn method on context to authenticate the new user
                    context.actions.signIn(email.current.value, password.current.value)
                        .then(() => {
                            navigate('/')
                        })
                        .catch(console.log)
                }
            })
            .catch(() => {
                navigate('/error')
            })
    }
    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                {valErrors}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" ref={firstName} />
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" ref={lastName} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={email} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={password} />
                    <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Already have a user account? Click here to <a href="/signin">sign in</a>!</p>
            </div>
        </main>
    )
}
export default UserSignUp