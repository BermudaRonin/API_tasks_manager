[⟵ Back](./README.md)

# Documentation

### API Map (v1)


<!-- ************************************************* -->
<!-- USER MANAGEMENT -->
<!-- ************************************************* -->

##### User management

<!-- USER MANAGEMENT > CREATE USER -->

<details>
<summary>Create user</summary>

<br />

Creates a user and generate an access token.

`POST /api/v1/user`
```JSON
// Body
{
    "username": "...", // required
    "email": "...", // required
    "password": "..." // required
}
```
- ☑️ **201** Success `has data`
    - User created and access token generated. 
- ❎ **400** Validation error `has errors`
    - Invalid credentials.
- ❎ **409** Duplicates error `has errors`
    - Email already exists.
    - Username already exists.
- ❎ **500** Other errors
    - Database errors. 🚨
    - Token errors. 🚨
    - Encryption errors. 🚨
    - Server errors. 🚨

<br />
</details>

<!-- USER MANAGEMENT > UPDATE USER -->

<details>
<summary>Update user data 🔒📝</summary>

<br />
TODO
<br />
</details>

<!-- USER MANAGEMENT > DELETE USER -->

<details>
<summary>Delete user 🔒📝</summary>

<br />
TODO
<br />
</details>

<!-- ************************************************* -->
<!-- USER AUTHENTICATION -->
<!-- ************************************************* -->

##### User authentication

<!-- USER AUTHENTICATION > LOGIN -->

<details>
<summary>Login</summary>

<br />
Verify user credentials, and generates an access token.
If `rememberMe` is true the token expiration time will be extended.

`POST /api/v1/auth`

```JSON
// Body option A
{
    "email": "...", // required
    "password": "...", // required
    "rememberMe": false, // required
}
// Body option B
{
    "username": "...", // required
    "password": "...", // required
    "rememberMe": false, // required
}
```
- ☑️ **201** Success `has data`
    - User validated and access token generated. 
- ❎ **400** Validation error `has errors`
    - Invalid credentials & options.
- ❎ **404** Not found.
    - User not found.
- ❎ **500** Other errors
    - Database errors. 🚨
    - Token errors. 🚨
    - Encryption errors. 🚨
    - Server errors. 🚨
<br />
</details>

<!-- USER AUTHENTICATION > AUTHENTICATE USER -->

<details>
<summary>Authenticate user 🔒</summary>

<br />
Decode the access token and fetch user. usefull for both getting the authenticated user and verifying the access token.

`GET /api/v1/auth`

- ☑️ **200** Success `has data`
    - Token validated & User fetched. 
- ❎ **401** Unauthorized
    - Missing/Invalid authorization header.
    - Invalid access token. 
    - Expired access token. 
    - User not found. 
- ❎ **500** Other errors
    - Database errors. 🚨
    - Token errors. 🚨
    - Server errors. 🚨
<br />
</details>

<!-- ************************************************* -->
<!-- ************************************************* -->

##### Email verification

<!-- EMAIL VERIFICATION > SEND EMAIL TOKEN -->

<details>
<summary>Send verification token 🔒</summary>

<br />

Send an `emailToken` to the user's mail. expires in 30 minutes.

`POST /api/v1/auth/email`

- ☑️ **200** Success
    - Email already verified.
    - Email verification sent.
- ❎ **401** Unauthorized
- ❎ **500** Other errors
    - Token errors. 🚨
    - Mailing errors. 🚨
    - Server errors. 🚨

<br />
</details>

<!-- EMAIL VERIFICATION > CONFIRM EMAIL TOKEN -->

<details>
<summary>Validate verification token 🔒</summary>

<br />

Verify `emailToken` and make user's email verified.

`POST /api/v1/auth/email/:emailToken`

- ☑️ **200** Success
    - Email already verified.
    - Email verified and user updated.
- ❎ **400** Validation errors `has errors`
    - Invalid token.
- ❎ **401** Unauthorized
- ❎ **500** Other errors
    - Token errors. 🚨
    - Server errors. 🚨

<br />
</details>



##### Password reset

<!-- PASSWORD RESET > SEND PASSWORD TOKEN -->

<details>
<summary>Send reset token 📝</summary>

<br />
TODO
<br />
</details>

<!-- PASSWORD RESET > CONFIRM PASSWORD TOKEN -->

<details>
<summary>Validate reset user 📝</summary>

<br />
TODO
<br />
</details>

### Usage


##### Versioning

```CURL
{BASE_URL}/api/{VERSION}/{ENDPOINT}

Example : POST http://localhost:4000/api/v1/user
```

##### Private Requests

```JSON
{
    "authorization": "Bearer  <access-token>"
}
```

##### Responses

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