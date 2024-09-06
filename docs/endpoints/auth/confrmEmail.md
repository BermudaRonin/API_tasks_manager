[⟵ Back](../../README.md)

# POST /auth/email

`POST {BASE_URL}/api/v1/auth/email`

Confirm email verification.

### Request Body

```JSON
{
    "pin": "..."
}
```

### Response

##### 200 - Success

Email confirmed

##### 400 - Validation

- The body is not a valid JSON.
- The body data is invalid,

##### 403 - Unauthorized

- The `Authorization` header is missing.
- The `Bearer` token header is malformatted.
- The acesss token  is invalid.

##### 500 - Server Error

- The user email is already verified;
- Verification never created;
- Incorrect PIN.
- Other errors.