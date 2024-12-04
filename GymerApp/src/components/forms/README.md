# Form Components

This directory contains the form components used in the application.

## Forms

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

### GoalForm

This form enables users to create new goals with title, description, due date, and completion status.

#### Features

- Input fields for goal title and description
- Calendar-based due date selection
- Completion status toggle
- Form validation using Zod schema
- Real-time error feedback

#### Example

```
import { GoalForm } from '@/components/GoalForm';

export default function Dashboard() {
  return (
    <div>
      <h1>Create New Goal</h1>
      <GoalForm />
    </div>
  );
}
```

#### References:

- `src/app/goals/_components/newGoal.tsx`

### EditGoalForm

This form component handles the editing of existing goals, pre-populating the form with current goal data.

#### Features

- Pre-fills all fields with existing goal data
- Calendar picker for due date modification
- Completion status management
- Same validation and input fields as GoalForm
- Updates goal records while maintaining data integrity

#### Example

```
import { EditGoalForm } from '@/components/EditGoalForm';

export default function EditPage() {
  const goal = {
    goal_id: "123",
    title: "Complete Project",
    description: "Finish the documentation",
    dueDate: new Date('2024-12-31'),
    completed: false
  };

  return (
    <EditGoalForm {...goal} />
  );
}
```

#### References:

- `src/app/goals/_components/editGoal.tsx`

### SupplementForm

This form enables users to create new supplement entries with detailed information about dosage, frequency, and scheduling.

#### Features

- Input fields for supplement name, dosage, and frequency
- Date selection for start and optional end dates
- Instructions field for detailed usage notes
- Active status toggle
- Form validation using Zod schema

#### Example

```
import { SupplementForm } from '@/components/SupplementForm';

export default function Dashboard() {
  return (
    <div>
      <h1>Add New Supplement</h1>
      <SupplementForm />
    </div>
  );
}
```

#### References:

- `src/app/supplements/_components/newSupplement.tsx`

### EditSupplementForm

This form component handles the editing of existing supplement entries, pre-populating the form with current supplement data.

#### Features

- Pre-fills all fields with existing supplement data
- Provides the same validation and input fields as SupplementForm
- Updates supplement records while maintaining data integrity
- Includes active/inactive status management

#### Example

```
import { EditSupplementForm } from '@/components/EditSupplementForm';

export default function EditPage() {
  const supplement = {
    id: "123",
    name: "Vitamin D",
    dosage: "1000 IU",
    frequency: "Daily",
    instructions: "Take with food",
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    isActive: true
  };

  return (
    <EditSupplementForm supplement={supplement} />
  );
}
```

#### References:

- `src/app/supplements/_components/editSupplement.tsx`
