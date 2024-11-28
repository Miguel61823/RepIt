# Form Components

This directory contains the form components used in the application.

## Forms

### EditSessionForm

This form allows users to edit the details of an existing session, preloads data for the selected session, and provides input fields to modify it

#### Features

- Pre-populates fields with the existing session's data
- Validates user input before submission
- Includes a submit button to save the changes

#### Example

```
import { EditSessionForm } from '@/components/EditSessionForm';

export default function EditPage() {
  return (
    <EditSessionForm
      session_id="123"
      name="Running"
      type="Running"
      date={new Date('2024-01-01')}
      session_data="Ran 5 miles"
    />
  );
}
```


#### References:

  - `src/app/sessions/_components/editSession.tsx`

### SessionForm

This form allows users to create a new session by providing necessary details.

#### Features

- Provides fields for session name, date, time, and additional attributes.
- Validates user input before form submission.
- Includes a clear form option to reset fields.

#### Example

```
import { SessionForm } from '@/components/SessionForm';

export default function Dashboard() {
  return (
    <div>
      <h1>Create a New Session</h1>
      <SessionForm />
    </div>
  );
}
```

#### References:

  - `src/app/sessions/_components/newSession.tsx`

### (doc todo: goal, equipment, supplement,)