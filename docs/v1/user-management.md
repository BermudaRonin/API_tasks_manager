[⟵ Back to documentation](../README.md)

# User management

## Create user
### `POST /user`

Creates a user and generate an access token.

<details>
<summary>Request body</summary>
<br />

```JSON
{
    "username": "...",
    "email": "...",
    "password": "..."
}
```

| Field  | Type | Description | Required | Default Value |
|---------|------|-------------|----------|---------------|
| `username` | string | The username of the user. | true | - |
| `email` | string | The email of the user. | true | - |
| `password` | string | The password of the user. | true | - |

<br />
</details>

<details>
<summary>Response</summary>
<br />

☑️ **201** Success `has data`

- User created and access token generated.

❎ **400** Validation error `has errors`

- Invalid credentials.

❎ **409** Duplicates error `has errors`

- Email already exists.
- Username already exists.

❎ **500** Other errors

- Database errors. 🚨
- Token errors. 🚨
- Encryption errors. 🚨
- Server errors. 🚨

</details>


## Update user
### 🔒 `PUT /user`

Updates user data.

<details>
<summary>Request body</summary>
<br />

```JSON
{
    "username": "...",
    "email": "...",
    "password": "..."
}
```

| Field  | Type | Description | Required | Default Value |
|---------|------|-------------|----------|---------------|
| `username` | string | The new username. | false | - |
| `email` | string | The new email. | false | - |
| `password` | string | The new password. | false | - |

<br />
</details>

<details>
<summary>Response</summary>
<br />

☑️ **200** Success.

- User updated.

❎ **400** Validation error `has errors`

- Bad Request.
- Invalid credentials.

❎ **500** Other errors

- Database errors. 🚨
- Encryption errors. 🚨
- Server errors. 🚨

</details>

## Delete user
### 🔒 `DELETE /user`

Delete user.

<details>
<summary>Response</summary>
<br />

☑️ **200** Success.

- User deleted.

❎ **500** Other errors

- Database errors. 🚨
- Server errors. 🚨

</details>
