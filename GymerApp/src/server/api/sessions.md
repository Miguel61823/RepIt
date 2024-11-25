# Sessions API

The `sessions.ts` provides functions for managing and query user session data, leveraging Anthropic AI for advanced parsing and analysis.

## Features

- Session creation, retrieval, updating, and deletion.
- AI-powered filtering and query answering.
- User authentication and data validation.

## Functions

### getSessionHistory

- **Purpose**: Fetches all sessions for the current user, ordered by date.
- **Inputs**: None (authentication requried).
- **Outputs**:

  - Success: `Promise<Session[]>` - List of sessions.
  - Error: Redirects unauthenticated users to the sign-in page.

### createSession

- **Purpose**: Creates a new session.
- **Inputs**: `dirty`: Object matching the `sessionFormSchema` (includes `type`, `name`, `date`, `session_data`).
- **Outputs**:

  - Success: `undefined`
  - Error: `{ error: true }` if validation fails or user is unauthenticated.

- **Example Request**:

  ```
  {
    "type": "workout",
    "name": "Morning Routine",
    "date": "2024-11-25T00:00:00Z",
    "session_data": "{\"exercise\": \"running\", \"duration\": \"30 mins\"}"
  }
  ```

- **Example Response**:

  - Success: `undefined`
  - Error: `{ "error": true }`

### deleteSession

- **Purpose**: Deletes a session by ID.
- **Inputs**: `deletedSessionId`: The ID of the session to be deleted.
- **Outputs**:

  - Success: `undefined`
  - Error: `{ error: true }` if deletion fails.


### updateSession

- **Purpose**: Updates session details of an existing session.
- **Inputs**:

  - `sessionId`: The ID of the session to update.
  - `dirty`: Updated session data conforming to `sessionFormSchema`.

- **Outputs**:

  - Success: `undefined`
  - Error: `{ error: true }` if validation fails or user is unauthenticated.

- **Example Request**:

  ```
  {
    "type": "workout",
    "name": "Evening Routine",
    "date": "2024-11-25T00:00:00Z",
    "session_data": "{\"exercise\": \"yoga\", \"duration\": \"20 mins\"}"
  }
  ```

### getAISessionsByDate

- **Purpose**: Filters sessions by date range.
- **Inputs**: `date_range`: Object with `startDate` and `endDate`.
- **Outputs**: Success: `Promise<AISession[]>` - List of sessions with a date between `startDate` and `endDate`.


### *TODO*: add rest of the functions

## Error Handling

- Validation errors return a ``{ "error": true }` response.
- Unauthenticated users are redirected to the sign-in page.
