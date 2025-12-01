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


mutation SignupUser($createUserInput: CreateUserInput!) {
  signupUser(createUserInput: $createUserInput) {
    firstName,
    lastName,
    role
  }
}
{
  "createUserInput": {
    "firstName": "zeyad",
    "lastName": "alll",
    "email": "zeyadCrew@zeyad.com",
    "password": "zeyad",
    "role": "CREW",
    "nationality": "Egyptian",
    "passportId": "23344"
  }
}

mutation CreateFlight($createFlightInput: CreateFlightInput!) {
  createFlight(CreateFlightInput: $createFlightInput) {
    id
    flightNumber
  }
}

{
  "createFlightInput": {
    "flightNumber": 1323,
    "departureAirport": "gg",
    "destinationAirport": "fti",
    "date": "2026-12-19",
    "departureTime": "22:30:00+02",
    "arrivalTime": "23:30:00+02",
    "airLine": "@",
    "availableSeats": 22
  }
}

mutation AssignFlight($assignflight: FlightAssign!) {
  assignFlight(assignflight: $assignflight) {
    id
    flightNumber
  }
}

{
  "assignflight": {
    "flightId": "d67e21b8-fb7f-41f2-98fe-6eba9247988d",
    "userId": "056ba48b-7624-4ba5-a255-7b15095450ad"
  }
}

query Flights($flightFilter: FlightFilterDto!) {
  flights(flightFilter: $flightFilter) {
    flights {
      airLine
      date
      departureAirport
    }
    total
  }
}
{
  "flightFilter": {
    "page": 1,
    "limit": 12,
    "date": "2025-12-19",
    "departureAirport": "dameitta",
    "destinationAirport": "e"
  }
}
```

CRON expression to remove flights once its seat is 0
CRON Expression to remove flights when it passed the current date as it became in the past
