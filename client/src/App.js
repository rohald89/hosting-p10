import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Courses from "./components/Courses"
import CreateCourse from "./components/CreateCourse"
import UpdateCourse from "./components/UpdateCourse"
import CourseDetail from "./components/CourseDetail"
import UserSignIn from "./components/UserSignIn"
import UserSignUp from "./components/UserSignUp"
import UserSignOut from "./components/UserSignOut"
import Forbidden from "./components/Forbidden"
import UnhandledError from "./components/UnhandledError"
import Header from "./components/Header"
import NotFound from "./components/NotFound"
import withContext from "./Context"
import PrivateRoute from "./PrivateRoute"

// Create routing for rendering components
function App() {
  return (
    <BrowserRouter>
      {withContext(Header)}
      <Routes>
        <Route path="/" element={withContext(Courses)} />
        <Route path="/signin" element={withContext(UserSignIn)} />
        <Route path="/courses/:id" element={withContext(CourseDetail)} />
        <Route path="/signup" element={withContext(UserSignUp)} />
        <Route element={withContext(PrivateRoute)}>
          <Route path="/courses/create" element={withContext(CreateCourse)} />
          <Route path="/courses/:id/update" element={withContext(UpdateCourse)} />
        </Route>
        <Route path="/signout" element={withContext(UserSignOut)} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/error" element={<UnhandledError />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" replace={true} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
