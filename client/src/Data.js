import config from './config'
import Cookies from 'js-cookie'

export default class Data {
    api(path, method = "GET", body = null) {
        const url = config.apiBaseUrl + path

        // Establish headers
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }

        // Allow json to be sent in body
        if (body !== null) {
            options.body = JSON.stringify(body)
        }

        // Get user credentials from cookie
        const cookie = Cookies.get("credentials")
        if (cookie) {
            const creds = JSON.parse(cookie)
            options.headers["Authorization"] = this.encodeCredentials(creds)
        }
        return fetch(url, options)
    }

    // Encode credentials using basic auth
    encodeCredentials(credentials) {
        const creds = `${credentials.emailAddress}:${credentials.password}`
        const encodedCreds = btoa(creds)
        return `Basic ${encodedCreds}`
    }

    // Call api route to get list of courses
    async getCourses() {
        const courses = await this.api("/courses", "GET")
        if (courses.status === 200) {
            return courses.json().then(data => data)
        } else {
            throw new Error()
        }
    }
    // Call api route to get a specific course
    async getCourse(id) {
        const course = await this.api(`/courses/${id}`, 'GET', null)
        if (course.status === 200) {
            return course.json().then(data => data)
        } else if (course.status === 404) {
            return { "error": "404" }
        } else {
            throw new Error()
        }
    }
    // Call api route to create a new course
    async createCourse(course) {
        const response = await this.api('/courses', 'POST', course)
        if (response.status === 201) {
            return []
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors
            })
        } else {
            throw new Error()
        }
    }
    // Call api route to update a course
    async updateCourse(courseForm, id) {
        const course = await this.api(`/courses/${id}`, 'PUT', courseForm)
        if (course.status === 204) {
            return []
            // return course.json().then(data => data)
        } else if (course.status === 400) {
            return course.json().then(data => {
                return data.errors
            })
        } else {
            throw new Error()
        }
    }
    // Call api route to delete a course
    async deleteCourse(id) {
        const course = await this.api(`/courses/${id}`, 'DELETE', null)
        if (course.status === 204) {
            return [course.json().then(data => data)]
            // return course.json().then(data => data)
        } else {
            throw new Error()
        }
    }
    // Call api route to get current user information
    async getUser() {
        const response = await this.api(`/users`, 'GET', null)
        if (response.status === 200) {
            return response.json().then(data => data)
        } else {
            throw new Error()
        }
    }
    // Call api route to create a new user
    async createUser(user) {
        const response = await this.api('/users', 'POST', user)
        if (response.status === 201) {
            return []
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors
            })
        }
        else {
            throw new Error()
        }
    }
}