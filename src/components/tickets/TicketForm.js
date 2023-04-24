import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getServiceTickets } from "../ApiManager"

export const TicketForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [ticket, update] = useState({
        description: "",
        emergency: false
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    // when the button is clicked, in the instructions in this function will run
    const handleSaveButtonClick = (event) => { 
        event.preventDefault()
        console.log("You clicked the button.")

        // TODO: Create the object to be saved to the API
        /* Example of what data we need/what will be sent to the API
            {
                "userId": 3,
                "description": "Vero est adipisci sed natus quasi consectetur occaecati. Modi maxime sunt officia cumque. Vel at culpa. Sint accusamus deserunt dolorem qui.",
                "emergency": true,
                "dateCompleted": ""
            },
        */
       //created a Javascript Object that has all the required properties on it
       const ticketToSendToAPI = {
        userId: honeyUserObject.id,
        description: ticket.description,
        emergency: ticket.emergency,
        dateCompleted: ""
       }

        // TODO: Perform the fetch() to POST the object to the API
        getServiceTickets(ticketToSendToAPI)
            .then (() => {
                navigate("/tickets") // When JSON server is done/responds back to me, I'm going to naviage the user back to the ticket list
            })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (evt) => {
                                const copy = {...ticket} // copying ticket object
                                copy.description = evt.target.value //evt.target.value is whatever is currently in the input field
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (evt) => {
                                const copy = {...ticket} // copying ticket object
                                copy.emergency = evt.target.checked // .value doesn't work for checkboxes, use checked; changing the boolean value between true and false
                                update(copy) // updating state to the copy you made
                            }
                        } />
                </div>
            </fieldset>
            <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}