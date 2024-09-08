[⟵ Back to documentation](../README.md)

# Password reset

## Generate reset token
### `POST /auth/reset`

Send `resetToken` to the user's mail. expires in 30 minutes.

<details>
<summary>Request body</summary>
<br />

```JSON
{
    "email": "...",
}
```

| Field  | Type | Description | Required | Default Value |
|---------|------|-------------|----------|---------------|
| `email` | string | The email of user | true | - |


<br />
</details>

<details>
<summary>Response</summary>
<br />

☑️ **200** Success
- Reset token sent.

❎ **400** Validation
- Invalid Email.

❎ **404** Not found
- User not found.

❎ **500** Other errors
- Token errors. 🚨
- Mailing errors. 🚨
- Server errors. 🚨

<br />
</details>

## Verify reset token
### `POST /auth/reset/:resetToken`

Verify `resetToken` and approves the password reset.

<details>
<summary>Request params</summary>
<br />


```CURL
POST /auth/reset/:resetToken

Example : POST /auth/reset/iam_a_reset_token
```

| Field  | Type | Description | Required | Default Value |
|---------|------|-------------|----------|---------------|
| `resetToken` | string | The reset token | true | - |

<br />
</details>

<details>
<summary>Response</summary>
<br />

☑️ **200** Success
- Valid token.

❎ **400** Validation errors `has errors`
- Invalid token.
- Expired token.

❎ **500** Other errors
- Token errors. 🚨

<br />
</details>


