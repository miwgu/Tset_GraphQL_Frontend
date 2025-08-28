# Frontend_React + Vite _Book management App_GraphQL
## Development
This is fashion Applicatin for e-commerce. I try to use Material UI to create interface. There is a customer role as user just now.

## Client-side Authentication Error Handling

In this React application, authentication errors are handled on the client using structured error information returned from the backend via GraphQL's `formatError` function. Key points of the implementation:

- **Use of explicit error codes (`err.code`)**  
  - Avoids relying on `err.message`, which may vary between development and production environments  
  - Ensures consistent and robust error handling across environments

- **User-friendly messaging**  
  - Example: if the backend returns `extensions.code: "UNAUTHENTICATED"`, the client displays a generic message:  
    `"Login failed. Please try again."`  
  - Internal authentication details are never exposed to the user, reducing the risk of information disclosure attacks

- **Separation of error types**  
  - Technical errors (e.g., network failures: `"Failed to fetch"`)  
  - Business logic errors (e.g., invalid login credentials)  
  - This allows the UI to respond differently depending on the nature of the error

  
## How to start
npm install   npm run dev

## Backnd (JWT)
GraphQL

## Log in
- Admin1 email:miwa@example.com  password:123
- User1 email:oskar@example.com  password:234
- User2 lotta@example.com  password:345