import React, { Component } from 'react'
import Cookies from 'js-cookie'
import Data from './Data'

const Context = React.createContext()

export class Provider extends Component {

  constructor() {
    super()
    this.cookie = Cookies.get('authenticatedUser')
    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null
    }
    this.data = new Data()
  }
  // Set provider value to all items that need to be accessed via context
  render() {
    const { authenticatedUser } = this.state
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }

  // Action to set credentials from a sign in to the cookie
  signIn = async (emailAddress, password) => {
    const creds = { "emailAddress": emailAddress, "password": password }
    const cookieOptions = {
      "expires": 1
    }
    Cookies.set("credentials", JSON.stringify(creds), cookieOptions)
    // If the user exists in db with the creds, put user in globally accessible context
    const user = await this.data.getUser(creds)
    if (user !== null) {
      this.setState(() => {
        return {
          "authenticatedUser": user,
        }
      })
      Cookies.set("authenticatedUser", JSON.stringify(user), cookieOptions)
    }
    return user
  }
  // Action to remove credentials from cookie and auth state
  signOut = () => {
    this.setState({ "authenticatedUser": null })
    Cookies.remove("authenticatedUser")
    Cookies.remove("credentials")
  }
}

export const Consumer = Context.Consumer

/**
 * A higher order component that wraps the provided component in a Context Consumer component
 * @param {class} Component - A React component
 * @returns {function} A higher order component
 */

export default function withContext(Component, props = []) {
  return (
    <Context.Consumer>
      {context => <Component {...props} context={context} />}
    </Context.Consumer>
  )
}
