// Fetch Function - CustomerList.js
export const getAllCustomers = () => {
    return fetch(`http://localhost:8088/users?isStaff=false&customers`) //? - query; isStaff=false - setting parameters for that boolean to find only values that are false
        .then(res => res.json())
}

// Fetch Function - EmployeeList.js
export const getAllEmployees = () => {
    return fetch(`http://localhost:8088/users?isStaff=true`)  //? - query; isStaff=true - setting parameters for that boolean to find only values that are true
        .then(res => res.json())
}

// Fetch Function - TicketList.js
export const getAllTicketsFetch = () => {
    return fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
        .then(res => res.json())
}

// Fetch Function - TicketList.js
export const getAllEmployeeUserInformation = () => {
    return fetch(`http://localhost:8088/employees?_expand=user`)
        .then(res => res.json())
}

// POST Function - TicketForm.js
export const getServiceTickets = (ticketToSendToAPI) => {
    return fetch(`http://localhost:8088/serviceTickets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ticketToSendToAPI) // we're stringifying the object (from above), send a POST request to JSON server saying "please save this for me"
    })
        .then(res => res.json())
}

// Fetch Function - CustomerDetails.js
export const getCustomerById = (customerId) => {
    return fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
        .then(res => res.json())
}

// Fetch Function - EmployeeDetails.js
export const getEmployeeById = (employeeId) => {
    return fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`) //expanding to include tickets that each employee are working on and match with their employeeId
        .then(res => res.json())
}

// Fetch Function - TicketEdit.js
export const getIndividualServiceTickets = (ticketId) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
        .then(res => res.json())
}

// PUT Function - TicketEdit.js
export const getTicketsAndReplace = (ticket) => { 
    return fetch (`http://localhost:8088/serviceTickets/${ticket.id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(ticket)
})
        .then(res => res.json())
}

// Fetch Function - CustomerForm.js
export const getCustomerProfile = (honeyUserObject) => {
    return fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
        .then(res => res.json())
}

// PUT Function - CustomerForm.js
export const getProfileId = (profile) => {
    return fetch(`http://localhost:8088/customers/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
        .then(res => res.json())
}

// Fetch Function - EmployeeForm.js
export const getEmployeeProfile = (honeyUserObject) => {
    return fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
        .then(res => res.json())
}

// PUT Function - EmployeeForm.js
export const getEmployeeProfileId = (profile) => {
    return fetch(`http://localhost:8088/employees/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
        .then(res => res.json())
}

// DELETE Function - ticket.js

export const deleteTickets = (ticketObject) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
                    method: "DELETE"
                })
        .then(res => res.json())
}

// PUT Function - Ticket.js
export const updateServiceTickets = (ticketObject, copy) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
        method: "PUT", //Method is PUT because we are updating the data
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(copy) //Making a copy and turning it into a string
    })
        .then(res => res.json())
}

// POST Function - TicketForm.js
export const ClaimButtonPostFunction = (userEmployee, ticketObject) => {
    return fetch(`http://localhost:8088/employeeTickets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            employeeId: userEmployee.id,
            serviceTicketId: ticketObject.id
        })
    })
        .then(res => res.json())
}

// DELETE Function - Ticket.js








// export const getAllCustomers = () => {
//     return fetch(`insert URL here`)
//         .then(res => res.json())
// }

