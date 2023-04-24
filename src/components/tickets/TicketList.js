// useEffect() and useState[()] are built in functions with React
// useEffect() observes State

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Tickets.css"
import { Ticket } from "./Ticket"
import { getAllEmployeeUserInformation, getAllTicketsFetch } from "../ApiManager"

export const TicketList = ( { searchTermState }) => {
    const [tickets, setTickets] = useState([]) // tickets variable initial state is an empty array; we're going to fill that array with data from the API, setTickets is a function
    const [employees, setEmployees] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false) //initial state of setEmergency will be false
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    // Filter down all of the tickets to ones that match what has been typed into Ticket Search Box (only matching first word, not just any word); we are updating the state of setFiltered
    useEffect(
        () => {
        //    console.log(searchTermState) 
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase()) //.toLowerCase makes it so the search box is not case sensitive
            })
            setFiltered(searchedTickets)
        },
        [ searchTermState ]
    )
    
    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
            else {
                setFiltered(tickets)
            }
        },
        [emergency]
    )
    //     // we took the fetch call out of the useEffect below so we can invoke it whenever we want
    // const getAllTickets = () => {
    //     // console.log("Initial state of tickets", tickets) // View the initial state of tickets
    //     fetch (`http://localhost:8088/serviceTickets?_embed=employeeTickets`) // Fetch/go get all of the tickets
    //     .then(response => response.json()) // get the response back, parse to json, put it back into a Javascript array
    //     .then((ticketArray) => {
    //         setTickets(ticketArray) // change tickets to entire array of service tickets retreived from API
    //     })
    // }

    
    const getAllTickets = () => {
        getAllTicketsFetch()
        .then((ticketArray) => {
            setTickets(ticketArray) // change tickets to entire array of service tickets retreived from API
        })
    }

    useEffect(
        () => {
            getAllTickets()

            getAllEmployeeUserInformation()
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },
        [] //When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            // console.log(tickets)
            if (honeyUserObject.staff) {
                // For employees
                setFiltered(tickets)
            }
            else {
                // For customers
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets]
    )

    useEffect(
        () => {
            if (openOnly) {
            const openTicketArray = tickets.filter(ticket => {
                return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
            })
            setFiltered(openTicketArray)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [ openOnly ]
    )


    return <>
        {
            honeyUserObject.staff 
                ? /* ? means "if honeyUserObject.staff" is true, show button */ <>
                    <button onClick={ () => setEmergency(true) } >Emergency Only</button> 
                    <button onClick={ () => setEmergency(false) } >ShowAll</button>
                </>
                // : means, if honeyUserObject.staff is false, show this button. Previously, it was : "" which just meant to show nothing
                : <>
                    <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
                    <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
                </>
        }
        
        <h2>List of Tickets</h2>

        <article className="tickets">
            {
                filteredTickets.map( // As this iterates, it will create a new ticket component; the prop is ticketObject; isStaff is also a prop
                    (ticket) => <Ticket key={`ticket--${ticket.id}`}
                                        getAllTickets={getAllTickets} //prop sharing the fetch call to rerender after the button is clicked in Ticket.js
                                        employees= {employees} 
                                        currentUser={honeyUserObject} //sending the whole object rather than just isStaff = {honeyUserObject.staff}
                                        ticketObject={ticket} />
                
                )
            }
        </article>
    </>
} 

/* for above - interpolation in React does not require ${}, just {} */
