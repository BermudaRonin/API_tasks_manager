[⟵ Back home](../README.md)

# Documentation

## API

- [User management](./v1/user-management.md)
- [User authentication](./v1/user-authentication.md)
- [Email verification](./v1/email-verification.md)
- [Password reset](./v1/password-reset.md)

## Guide

#### Versioning

```CURL
{BASE_URL}/api/{VERSION}/{ENDPOINT}

Example : POST http://localhost:4000/api/v1/user
```

#### Private Requests

```JSON
{
    "authorization": "Bearer  <access-token>"
}
```

#### Responses

**Successful  Response**

```JS
// With data
{
    "success" : true,
    "message" : "...",
    "data": {},
    "errors": null,
}

// Without data
{
    "success" : true,
    "message" : "...",
    "data": null,
    "errors": null,
}
```
**Error Response**

```JS
// With errors
{
    "success" : false,
    "message" : "...",
    "data": null,
    "errors": [],
}

// Without errors
{
    "success" : false,
    "message" : "...",
    "data": null,
    "errors": null,
}
```