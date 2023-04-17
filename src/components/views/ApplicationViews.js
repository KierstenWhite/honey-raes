import { Outlet, Route, Routes } from "react-router-dom"
import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"
import { TicketSearch } from "../tickets/TicketSearch"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>
                {/*we want to componenets to be displayed when the route is "tickets"*/}
                <Route path="tickets" element={ 
                    <>
                        <TicketSearch />
                        <TicketList />
                    </>
               
               } /> 

				<Route path="ticket/create" element={ <TicketForm /> } />
            </Route>
        </Routes>
    )
}