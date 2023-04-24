import { useEffect, useState } from "react"
import { getCustomerProfile, getProfileId } from "../ApiManager"

export const CustomerForm = () => {
    // TODO: Provide initial state for profile
    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: "",
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


    // TODO: Get customer profile info from API and update state
        useEffect(() => {
            getCustomerProfile(honeyUserObject)
                .then((data) => {
                    const customerObject = data[0]
                    updateProfile(customerObject)
                })
        }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT (put means replace) fetch() call here to update the profile.
            Navigate user to home page when done.
        */
            getProfileId(profile)
                .then(() => {
                    setFeedback("Customer profile successfully saved")
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
                    <label htmlFor="address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                // TODO: Update address property
                                const copy = {...profile}
                                copy.address = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                // TODO: Update address property
                                const copy = {...profile}
                                copy.phoneNumber = evt.target.value
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