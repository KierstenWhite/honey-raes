import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCustomerById } from "../ApiManager"

// Capture the customer id, hook is UseParams (parameters)
export const CustomerDetails = () => {
    const {customerId} = useParams()
    const [customer, updateCustomer] = useState()

    useEffect(
        () => {
           getCustomerById(customerId)
            .then((data) => {
                const singleCustomer = data[0]
                updateCustomer(singleCustomer)
            })
        },
        [customerId]
    )
        // ? optional chaining will only keep looking if the property exists
    return <section className="customer">
                <header className="customer__header">{customer?.user?.fullName}</header>
                    <div>Email: {customer?.user?.email}</div>
                    <div>Address: {customer?.address}</div>
                    <div>Phone Number: {customer?.phoneNumber}</div>
            </section>
}
