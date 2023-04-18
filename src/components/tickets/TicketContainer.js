
/* will maintain the state because children cannot share a state, get access to state via props; 
Two sibling componenets cannot talk directly to each other, they have to go through a parent 
If you want one sibling component to react to the change of another sibling, you have to put them in parent together
variable = value?; think of = as : */

// setterFunction is the key

import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"
import { useState } from "react"


export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <TicketSearch setterFunction={setSearchTerms} />
        <TicketList searchTermState={searchTerms}/>
    
    </>
}