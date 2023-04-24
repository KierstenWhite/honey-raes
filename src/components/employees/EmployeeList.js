import { useState, useEffect } from "react"
import "./Employees.css"
import { Employee } from "./Employee"
import { getAllEmployees } from "../ApiManager"

// set its initial state, fetch all the employees from API, and in JSX, will render a list of employees
export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            getAllEmployees()
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