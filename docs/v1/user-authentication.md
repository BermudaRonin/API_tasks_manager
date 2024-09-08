[⟵ Back to documentation](../README.md)

# User authentication

## Login
### `POST /auth`

Verify user credentials, and generates an access token.
The user can choose to login by email/password or username/password.

<details>
<summary>Request body</summary>
<br />

```JSON
{
    "email": "...",
    "username": "...",
    "password": "...",
    "rememberMe": false,
}
```

| Field  | Type | Description | Required | Default Value |
|---------|------|-------------|----------|---------------|
| `username` | string | The username to login with | true (if no email) | - |
| `email` | string | The email to login with | true (if no password) | - |
| `password` | string | The password to login with | true | - |
| `rememberMe` | boolean | Whether to extend the token expiration time | false | false |

<br />
</details>

<details>
<summary>Response</summary>
<br />

☑️ **201** Success `has data`
- User validated and `accessToken` generated. 

❎ **400** Validation error `has errors`
- Invalid credentials & options.

❎ **404** Not found.
- User not found.

❎ **500** Other errors
- Database errors. 🚨
- Token errors. 🚨
- Encryption errors. 🚨
- Server errors. 🚨

<br />
</details>


## Verify tokens & get user
### 🔒 `GET /auth`

Decode the access token and fetch user. usefull for both getting the authenticated user and verifying the access token.


<details>
<summary>Response</summary>
<br />

☑️ **200** Success `has data`
- Token validated & User fetched. 

❎ **401** Unauthorized
- Missing/Invalid authorization header.
- Invalid access token. 
- Expired access token. 
- User not found. 

❎ **500** Other errors
- Database errors. 🚨
- Token errors. 🚨
- Server errors. 🚨

<br />
</details>


