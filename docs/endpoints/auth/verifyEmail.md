[⟵ Back](../../README.md)

# GET /auth/email

`GET {BASE_URL}/api/v1/auth/email`

Send email verification.

### Response

##### 200 - Success

PIN generated and Email verification sent to the user.

```JSON
// response.data
{
    "pin": "", // Development only
}
```
##### 403 - Unauthorized

- The `Authorization` header is missing.
- The `Bearer` token header is malformatted.
- The acesss token  is invalid.

##### 500 - Server Error

- The user email is already verified;
- Couldn't create a verification.
- Couldn't send a verification email.
- Other errors.