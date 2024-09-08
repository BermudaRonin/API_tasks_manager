[⟵ Back to documentation](../README.md)

# Email verification

## Generate email token
### 🔒 `POST /auth/email`

Send an `emailToken` to the user's mail. expires in 30 minutes.


<details>
<summary>Response</summary>
<br />

☑️ **200** Success
- Email already verified.
- Email token sent.

❎ **401** Unauthorized

❎ **500** Other errors
- Token errors. 🚨
- Mailing errors. 🚨
- Server errors. 🚨

<br />
</details>

## Verify email token
### 🔒 `POST /auth/email/:emailToken`

Verify `emailToken` and update user.

<details>
<summary>Request params</summary>
<br />


```CURL
POST /auth/email/:emailToken

Example : POST /auth/email/iam_an_email_token
```

| Field  | Type | Description | Required | Default Value |
|---------|------|-------------|----------|---------------|
| emailToken | string | Email token | Yes | - |

<br />
</details>

<details>
<summary>Response</summary>
<br />

☑️ **200** Success
- Email already verified.
- Email verified and user updated.

❎ **400** Validation errors `has errors`
- Invalid token.
- Expired token.

❎ **401** Unauthorized

❎ **500** Other errors
- Token errors. 🚨

<br />
</details>


