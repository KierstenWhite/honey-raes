import { useState, useEffect } from "react"
import "./Customers.css"
import { Customer } from "./Customer"
import { getAllCustomers } from "../ApiManager"

// set its initial state, fetch all the employees from API, and in JSX, will render a list of employees
export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            getAllCustomers()
            .then((customerArray) => {
                setCustomers(customerArray)
            })
        },
        []
    )

    return <article className="customers">
        {
            customers.map(customer => <Customer key={`customer--${customer.id}`}
                id={customer.id} 
                fullName={customer.fullName} 
                email={customer.email}
                address={customer.address}
                phoneNumber={customer.phoneNumber} />)
        }
    </article>
}