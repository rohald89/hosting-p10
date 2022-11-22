import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"


let CreateCourse = function (props) {
    const navigate = useNavigate()
    const { context } = props
    const title = useRef()
    const description = useRef()
    const estimatedTime = useRef()
    const materialsNeeded = useRef()

    const [valErrors, setValErrors] = useState([])

    const handleCancel = function (e) {
        e.preventDefault()
        navigate("/")
    }
    const handleSubmit = function (e) {
        e.preventDefault()
        // Create course
        // Use the refs in form inputs to build a course object
        const course = { title: title.current.value, description: description.current.value, estimatedTime: estimatedTime.current.value, materialsNeeded: materialsNeeded.current.value }
        // Use the createCourse method on Data class with the course object to create a new course in db
        context.data.createCourse(course)
            .then(res => {
                // If validation errors are returned, render the errors onto the page
                if (res.length !== 0) {
                    setValErrors(<div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {res.map((error, i) => <li key={i}>{error}</li>)}
                        </ul>
                    </div>)
                } else {
                    navigate('/')
                }
            })
            .catch(err => {
                navigate('/error')
            })
    }
    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                {valErrors}
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" ref={title} />
                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" ref={description}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default CreateCourse