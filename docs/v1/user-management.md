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

## Delete user

