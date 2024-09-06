[⟵ Back](../../README.md)

# POST /users

`POST {BASE_URL}/api/v1/users`

Creates a new user

### Request Body

```JSON
{
    "username": "...",
    "email": "...",
    "password": "..."
}
```

### Response

##### 201 - Success

User is created.

```JSON
{
    "accessToken": "...",
    "user": {},
}
```
##### 400 - Validation

- The body is not a valid JSON.
- The body data is invalid,

##### 409 - Duplicates

- Email already exits

##### 500 - Server Error

- Other errors.

