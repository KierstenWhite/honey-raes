import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getEmployeeById } from "../ApiManager"

// Capture the employee id, hook is UseParams (parameters)
export const EmployeeDetails = () => {
    const {employeeId} = useParams()
    const [employee, updateEmployee] = useState()

    useEffect(
        () => {
           getEmployeeById(employeeId)
            .then((data) => {
                const singleEmployee = data[0]
                updateEmployee(singleEmployee)
            })
        },
        [employeeId]
    )
        // ? optional chaining will only keep looking if the property exists
    return <section className="employee">
                <header className="employee__header">{employee?.user?.fullName}</header>
                    <div>Email: {employee?.user?.email}</div>
                    <div>Specialty: {employee?.specialty}</div>
                    <div>Rate: {employee?.rate}</div>
                <footer className="employee__footer">Currently working on {employee?.employeeTickets?.length} tickets</footer>
            </section>
}