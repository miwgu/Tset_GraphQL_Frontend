export const login = async (config, email, password, token) => {
    const { apiUrl } = config;

    const query = `
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                id
                email
                role
                favorites {
                    id
                    title
                    isbn
                    sensitiveNotes
                    thumbnailUrl
                }
            }
        }
    }
`;

   const variables = { email, password };

    try{
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         },
        body: JSON.stringify({ query, variables }),
        credentials: 'include'
    });

    const result = await response.json();

    if (result.errors) {
        const firstError = result.errors[0];
        console.error('GraphQL error:', firstError.message);  
        
        throw {
            message: firstError.message,
            code: firstError.extensions?.code || 'UNKNOWN_ERROR',
            fullError: firstError
        };
    }

    const { token: authToken } = result.data.login;

    // Store the token (for example, in localStorage)
    localStorage.setItem('authToken', authToken);

/*     const data = await response.json();
    sessionStorage.setItem('csrfToken', data.csrfToken);
    return { isLoggedIn: true, csrfToken: data.csrfToken }; */
    return { isLoggedIn: true, token: authToken };
 
} catch (error){
   console.error('Login error:', error.message);
   throw error;

 }
};

export const refresh = async (config) => {
    const { apiUrl } = config;
    const response = await fetch(`${apiUrl}/refresh`, {
        method: 'POST',
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.statusText}`);
    }
    const data = await response.json();
    sessionStorage.setItem('csrfToken', data.csrfToken);
    return { success: true, csrfToken: data.csrfToken };
};

export const secureCall = async (config, url, options = {}) => {
    const { apiUrl } = config;
    const csrfToken = sessionStorage.getItem('csrfToken');
    let response = await fetch(`${apiUrl}${url}`, {
        ...options,
        headers: {
            ...((options && options.headers) || {}),
            'X-CSRF-Token': csrfToken,
            'Content-Type': 'Content-Type' in (options.headers ||{}) // If headers is undefined, assign an empty object
              ? options.headers['Content-Type'] : 'application/json'
        },
        credentials: 'include'
    });
    if (response.status === 403) {
        await refresh(config);
        response = await fetch(`${apiUrl}${url}`, {
            ...options,
            headers: {
                ...((options && options.headers) || {}),
                'X-CSRF-Token': sessionStorage.getItem('csrfToken')
            },
            credentials: 'include'
        });
    }
    if (!response.ok) {
        throw new Error(`API call to ${url} failed: ${response.statusText}`);
    }
    return await response.json();
};

export const logout = async (config) => {
    
        sessionStorage.removeItem('csrfToken');
        localStorage.clear();

    //return { isLoggedIn: false };
};

