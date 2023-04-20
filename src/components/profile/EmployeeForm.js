import { useEffect, useState } from "react"

export const EmployeeForm = () => {
    // TODO: Provide initial state for profile
    const [profile, updateProfile] = useState({
        specialty: "",
        rate: 0,
        userId: 0
    })

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const [feedback, setFeedback] = useState("")

        //For Profile Save Message
        useEffect(() => {
            if (feedback !== "") {
                // Clear feedback to make entire element disappear after 3 seconds
                setTimeout(() => setFeedback(""), 3000);
            }
        }, [feedback])


    // TODO: Get employee profile info from API and update state
        useEffect(() => {
            fetch (`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
                .then(response => response.json())
                .then((data) => {
                    const employeeObject = data[0]
                    updateProfile(employeeObject)
                })
        }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault() // Prevents page rerendering until something interactive, like a button, is clicked

        /*
            TODO: Perform the PUT (put means replace) fetch() call here to update the profile.
            Navigate user to home page when done.
        */
            fetch (`http://localhost:8088/employees/${profile.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)
            })
                .then(response => response.json())
                .then(() => {
                    setFeedback("Employee profile successfully saved")
                })
                .then(() => {

                })
    }

    
    return (
        
        <form className="profile">
            <h2 className="profile__title">Update Profile</h2>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.specialty}
                        onChange={
                            (evt) => {
                                // TODO: Update specialty property
                                const copy = {...profile}
                                copy.specialty = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Hourly rate:</label>
                    <input type="number"
                        className="form-control"
                        value={profile.rate}
                        onChange={
                            (evt) => {
                                // TODO: Update rate property
                                const copy = {...profile}
                                copy.rate = parseFloat(evt.target.value, 2) //parseFloat takes input and turns it into an integer, not a string, 2 means how many decimals places to collect
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    )
}