import React, { useEffect, useState } from "react"

const Header = function (props) {
    const [buttons, setButtons] = useState([])
    let { context } = props

    useEffect(() => {
        // Render the correct header items depending on whether there is a user signed in/authenticated
        if (!context.authenticatedUser) {
            setButtons((
                <span>
                    <li><a href="/signup">Sign Up</a></li>
                    <li><a href="/signin">Sign In</a></li>
                </span>
            ))
        } else {
            setButtons((
                <span>
                    <li>{context.authenticatedUser.firstName}</li>
                    <li><a href="/signout" onClick={context.actions.signOut}>Sign Out</a></li>
                </span>
            ))
        }
    }, [context])

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="/">Courses</a></h1>
                <nav>
                    <ul className="header--signedout">
                        {buttons}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header