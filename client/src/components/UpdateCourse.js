import React, { useRef, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"


let UpdateCourse = function (props) {
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id

    const title = useRef()
    const description = useRef()
    const estimatedTime = useRef()
    const materialsNeeded = useRef()

    const { context } = props
    const [valErrors, setValErrors] = useState([])

    useEffect(() => {
        // Use the getCourse method on Data class with the course id from req.params to retrieve course info
        context.data.getCourse(id)
            .then(res => {
                if (res.error) {
                    navigate("/notfound")
                } else {
                    // Populate the update form with the existing course information
                    title.current.value = res.title
                    description.current.value = res.description
                    estimatedTime.current.value = res.estimatedTime
                    materialsNeeded.current.value = res.materialsNeeded
                    if (res.userId !== context.authenticatedUser.id) {
                        navigate("/forbidden")
                    }
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleSubmit = function (e) {
        e.preventDefault()
        // Update course
        const course = { title: title.current.value, description: description.current.value, estimatedTime: estimatedTime.current.value, materialsNeeded: materialsNeeded.current.value }
        // Use the refs in form inputs to build the course object
        // Use the updateCourse method on Data class with the course object to update the course in db
        context.data.updateCourse(course, id)
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
                    navigate(`/courses/${id}`)
                }
            })
            .catch((err) => {
                navigate('/error')
            })
    }

    const handleCancel = function (e) {
        e.preventDefault()
        navigate(`/courses/${id}`)
    }
    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                {valErrors}
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" ref={title} />

                            <p>By Joe Smith</p>

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
                    <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default UpdateCourse