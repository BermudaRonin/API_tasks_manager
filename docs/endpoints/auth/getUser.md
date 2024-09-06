[⟵ Back](../../README.md)

# GET /auth 

`GET {BASE_URL}/api/v1/auth`

Check user authentication and get user.

### Response

##### 200 - Success

User has a valid access token, and user is fetched.

```JSON
// response.data
{
    "user": {},
}
```
##### 403 - Unauthorized

- The `Authorization` header is missing.
- The `Bearer` token header is malformatted.
- The acesss token  is invalid.

##### 500 - Server Error

- Other errors.
