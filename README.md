#### ** Example GraphQL Queries**

```mutation LoginUser($loginUserInput: LoginUserInput!) {
  loginUser(LoginUserInput: $loginUserInput) {
   email
   role
   id
  }
}

{
  "loginUserInput": {
    "email": "zeyad@zeyad.com",
    "password": "zeyad"
  }
}
```

### Mutations

#### User Mutations

signupUser

```
mutation SignupUser($createUserInput: CreateUserInput!) {
  signupUser(createUserInput: $createUserInput) {
    id
    role
    firstName
    lastName
    email
    passportId
    nationality
    employeeID
  }
}
```

loginUser

```
mutation LoginUser($LoginUserInput: LoginUserInput!) {
  loginUser(LoginUserInput: $LoginUserInput) {
    id
    role
    firstName
    lastName
    email
  }
}
```

updateUserInfo

```
mutation UpdateUserInfo($UpdateUserInput: UpdateUserInput!, $id: String!) {
  updateUserInfo(UpdateUserInput: $UpdateUserInput, id: $id) {
    id
    firstName
    lastName
    email
  }
}
```

logoutUser

```
mutation LogoutUser($id: String!) {
  logoutUser(id: $id)
}
```

resetPassword

```
mutation ResetPassword($forgetPassword: forgetPasswordDto!, $token: String!) {
  resetPassword(forgetPassword: $forgetPassword, token: $token) {
    message
  }
}
```

approveMembers

```
mutation ApproveMembers($id: String!) {
  approveMembers(id: $id) {
    id
    approved
  }
}
```

### Flight Mutations

createFlight

```
mutation CreateFlight($CreateFlightInput: CreateFlightInput!) {
  createFlight(CreateFlightInput: $CreateFlightInput) {
    id
    flightNumber
    departureAirport
    destinationAirport
    date
    departureTime
    arrivalTime
    airLine
    availableSeats
  }
}
```

updateFlight

```
mutation UpdateFlight($id: String!, $UpdateFlightInput: UpdateFlightInput!) {
  updateFlight(id: $id, UpdateFlightInput: $UpdateFlightInput) {
    id
    flightNumber
    departureAirport
    destinationAirport
    date
    departureTime
    arrivalTime
    airLine
    availableSeats
  }
}
```

removeFlight

```
mutation RemoveFlight($id: String!) {
  removeFlight(id: $id) {
    message
  }
}
```

assignFlight

```
mutation AssignFlight($assignflight: FlightAssign!) {
  assignFlight(assignflight: $assignflight) {
    id
    responsibleBy {
      id
      role
      firstName
      lastName
    }
  }
}
```

unAssignFlight

```
mutation UnAssignFlight($assignflight: FlightAssign!) {
  unAssignFlight(assignflight: $assignflight) {
    id
    responsibleBy {
      id
      role
      firstName
      lastName
    }
  }
}
```

### Booking Mutations

createBooking

```
mutation CreateBooking($createBooking: CreateBooking!) {
  createBooking(createBooking: $createBooking) {
    id
    userId
    flightId
    seatId
    createdAt
    user {
      id
      firstName
      lastName
    }
    flight {
      id
      flightNumber
    }
    seat {
      seatNo
      rowNo
      isAvailable
      flightId
    }
  }
}
```

cancelBooking

```
mutation CancelBooking($cancelBooking: CancelBooking!) {
  cancelBooking(cancelBooking: $cancelBooking) {
    message
  }
}
```
