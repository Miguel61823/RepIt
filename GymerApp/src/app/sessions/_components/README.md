# Sessions Components

This directory contains React components for managing and displaying sessions in the app, which handles session creation, editing, and listing.

## Components

### EditSession

This component is a container for the edit session form for editing an existing session, which preloads the form fields with the current session details and allows users to modify and save updates.

#### Features

- Pre-filled form fields for existing session data.

#### Example

```
import { EditSessionForm } from './editSession';

function EditSessionPage() {
  return (
    <EditSessionForm
      session_id="123"
      name="Running"
      type="Running"
      date={new Date('2024-01-15')}
      session_data="Ran 10 miles"
    />
  );
}
```

#### References

- `GymerApp/src/app/sessions/_components/sessionCard.tsx`

### NewSession

This component is a container to render the session form for creating a new session, enabling users to provide a name, type, date, and session details.

#### Features

- Button to open up the session form
- Clean, user-friendly form for inputting session details

#### Example

```
import { SessionForm } from './newSession';

function NewSessionPage() {
  return <SessionForm />;
}
```

#### References

- `GymerApp/src/app/sessions/_components/sessionHistory.tsx`

### SessionCard

This component renders a styled card for displaying an individual session's details, such as name, type, and date.

#### Features

- Displays key session information in a card
- Supports editing and deleting the session
- Responsive design for various screen sizes

#### Example

```
import { SessionCard } from './sessionCard';

function Sessions() {
  return (
    <SessionCard
      name="Running"
      type="Running"
      date={new Date('2024-02-10')}
      session_data="Ran 5 miles"
    />
  );
}
```

#### References

- `GymerApp/src/app/sessions/_components/sessionsList.tsx`

### SessionHistory

This component is a container to hold a session list, providing users with a history of their sessions.

#### Features

- Displays session details in chronological order

#### Example

```
import { SessionsList } from './sessionsList';

function Dashboard() {
  return <SessionsList />;
}
```

#### References

- `GymerApp/src/app/sessions/page.tsx`

### SessionList

This component displays an entire list of the user's sessions, allowing users to manage or view them all at once.

#### Features

- List multiple sessions with their names, types, and dates

#### Example

```
import { SessionsList } from '../sessionsList';

function Dashboard() {
  return <SessionsList />;
}
```

#### References

- `GymerApp/src/app/dashboard/page.tsx`
- `GymerApp/src/app/sessions/_components/sessionHistory.tsx`
