# Frontend_React + Vite _Book management App_GraphQL
## Development

This frontend application is implemented using GraphQL. Compared to a backend using REST APIs, it is designed with attention to **frontend data fetching and cache management characteristics** as well as **security considerations**.

- Data fetching and cache management
  - Queries use `cache-first` policy for fast rendering
  - Cache is manually updated after mutations to keep the UI consistent
- Security
  - Authentication errors are handled by error codes, without exposing internal details to the user
  - Sensitive data is controlled as needed


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

## Apollo Client Cache Management

This section highlights key points of cache handling in Apollo Client using the `DataFetchProvider` example.

### Key Points

- **Cache-first policy**
  - Queries like `GET_BOOKS` use `{ fetchPolicy: 'cache-first' }`  
  - Returns cached data first if available; otherwise fetches from network  
  - Fast rendering and reduced network load  
  - Potential drawback: cached data may be outdated if not refreshed after mutations

- **Manual cache updates after mutations**
  - Mutations (e.g., `ADD_BOOK`) do not automatically update the cache  
  - Developers must update cache manually using `cache.writeQuery()` or the `update()` function
  - Example:
    ```js
    const [addBook] = useAddBook({
      update(cache, { data: { addBook } }) {
        const existing = cache.readQuery({ query: GET_BOOKS });
        cache.writeQuery({
          query: GET_BOOKS,
          data: { books: [...existing.books, addBook] },
        });
      }
    });
    ```

- **Separation of concerns**
  - `useQuery` for fetching and caching data  
  - `useMutation` for adding/updating/deleting data  
  - Proper cache management ensures data consistency and a smooth user experience

### Summary

Using `cache-first` and manually updating the cache after mutations is essential in GraphQL apps. This approach highlights the **responsibility developers have over client-side cache**, compared to REST APIs where HTTP caching is automatic.

## How to start
npm install   npm run dev

## Backnd (JWT)
GraphQL

## Log in
- Admin1 email:miwa@example.com  password:123
- User1 email:oskar@example.com  password:234
- User2 lotta@example.com  password:345