// ticketObject.js is a child component of TicketList.js

import { Link } from "react-router-dom"

export const Ticket = ({ ticketObject, currentUser, employees, getAllTickets }) => { // all the variables in {} are props being passed down from the parent for us to use here (the child)
    
    // Find the assigned employee for the current ticket
    let assignedEmployee = null
    if (ticketObject.employeeTickets.length > 0) { //greater than 0, meaning "if an employee is assigned to a ticket"
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }
    
    // Find the employee profile object for the current user
    const userEmployee = employees.find(employee => currentUser.id === employee.userId)

    //To Do: Function that determines if the current user can close the ticket
    const canClose = () => {
        if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "") { //Is the current user's pk the same as the pk for the user assigned to the ticket && is the dateCompleted field empty (ticket is not marked as completed)
            return <button onClick={closeTicket} className="ticket__finish">Finish</button> //If the above conditions are met, show the button, else, don't show the button
        }
        else {
            return ""
        }
    }

    // Function that allows customers to delete a ticket that they created
    const deleteButton = () => {
        if (!currentUser.staff) {  //If the person is not staff, return this button
            return <button onClick={() => {
                fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        getAllTickets()

                    })
            }} className="ticket__delete">Delete</button>
        }
        else {
            return ""
        }
    }

    //To Do: Function that updates the ticket with a new date completed
    const closeTicket = () => {
        const copy = {
            userId: ticketObject.userId,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()

        }

        return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "PUT", //Method is PUT because we are updating the data
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy) //Making a copy and turning it into a string
        })
            .then(response => response.json())
            .then(getAllTickets)
    }

    // Conditional to show claim button; nested ternary statements are not cool so take out the logic and just make a function (look at the return)
    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return <button
                        onClick={() => {
                            fetch(`http://localhost:8088/employeeTickets`, {
                                method: "POST", //send to API, please create this for me
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    employeeId: userEmployee.id,
                                    serviceTicketId: ticketObject.id
                                })
                            })
                                .then(response => response.json()) //parse what you create back out
                                .then (() => {
                                    // GET the state from the API again so it will rerender after we click the button, display the current state to the user
                                    getAllTickets()
                                })
                        }}
                        >Claim</button>
        }
        else {
            return ""
        }
    }

    // callback function - for each ticket, return HTML representation; footer is condensed if/else statement
    return <section className="ticket" key={`ticket--${ticketObject.id}`}>
        <header>
            {
                currentUser.staff
                ? `Ticket ${ticketObject.id}`
                : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
            }
        </header>
        <section>{ticketObject.description}</section>
        <section>Emergency: {ticketObject.emergency ? "🚨" : "No"}</section>
        <footer>
            {
                ticketObject.employeeTickets.length
                    ? `Currently being worked on ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                    : buttonOrNoButton()
            }
            {
                canClose() //For Employees to complete a ticket
            }
            {
                deleteButton()
            }
        </footer>
    </section>
}