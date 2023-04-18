import { useState, useEffect } from "react"
import "./Employees.css"
import { Employee } from "./Employee"

// set its initial state, fetch all the employees from API, and in JSX, will render a list of employees
export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=true`) //? - query; isStaff=true - setting parameters for that boolean to find only values that are true
            .then (response => response.json())
            .then((employeeArray) => {
                setEmployees(employeeArray)
            })
        },
        []
    )

    return <article className="employees">
        {
            employees.map(employee => <Employee key={`employee--${employee.id}`}
                id={employee.id} 
                fullName={employee.fullName} 
                email={employee.email} />)
        }
    </article>
}