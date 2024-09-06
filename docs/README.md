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

```JSON
{
    "success" : true || false,
    "message" : "...",
    "data": {} || null,
    "errors": [] || null,
}

```

## Endpoints

**Users**
-  **POST /users** (PUBLIC): Creates a new user. [doc](./endpoints/user/createUser.md)

**Auth**

-  **POST /auth** (PUBLIC): Log a user in. [doc](./endpoints/auth/loginUser.md)
-  **GET /auth**: Check user authentication and get user. [doc](./endpoints/auth/getUser.md)
-  **GET /auth/email**: Send email verification. [doc](./endpoints/auth/verifyEmail.md)
-  **POST /auth/email**: Confirm email verification. [doc](./endpoints/auth/confrmEmail.md)

