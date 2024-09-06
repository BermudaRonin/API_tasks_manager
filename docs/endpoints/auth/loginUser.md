[⟵ Back](../../README.md)

# POST /auth - (PUBLIC)

`POST {BASE_URL}/api/v1/auth`

Log a user in.

### Request Body

Option A

```JSON
{
    "email": "...",
    "password": "..."
}
```

Option A

```JSON
{
    "username": "...",
    "password": "..."
}
```

### Response

##### 200 - Success

User credentials are correct, and an access token was generated.

```JSON
// response.data
{
    "accessToken": "...",
    "user": {},
}
```

##### 400 - Validation

- The body is not a valid JSON.
- The body data is invalid,

##### 404 - Not found

- User not found.

##### 500 - Server Error

- Other errors.

