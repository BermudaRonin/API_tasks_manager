[⟵ Back](./README.md)

# Documentation

## Versions

- Currently, a single version is supprted (v1)

## Authentication

- Every request must be private, except requests flagged as PUBLIC.
- Private requests must include an authorization header :
```JSON
{
    "authorization": "Bearer  <access-token>"
}
```

## Response

- Resonse is a semantic JSON
- Checkings must be based on `success`

```JS
{
    "success" : true || false,
    "message" : "...",
    "data": {} || null,
    "errors": [] || null,
}

```

## Endpoints

**Users**
-  **Create User**: Creates a new user. [`POST /users`](./endpoints/user/createUser.md)

**Auth**
-  **Log User In**: Log a user in. [`POST /auth`](./endpoints/auth/loginUser.md)
-  **Get User**: Check user authentication and get user. [`GET /auth`](./endpoints/auth/getUser.md)
-  **Send Email Verification**: Send email verification. [`GET /auth/email`](./endpoints/auth/verifyEmail.md)
-  **Confirm Email Verification**: Confirm email verification. [`POST /auth/email`](./endpoints/auth/confirmEmail.md)
