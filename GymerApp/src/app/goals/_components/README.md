# Goals Components

This directory contains React components for managing and displaying goals in the app, which handles goal creation, editing, listing, and progress tracking.

## Components

### EditGoal

This component is a container for the edit goal form, allowing users to modify existing goals by preloading the form fields with current goal details and saving updates.

#### Features

- Pre-filled form fields for existing goal data
- Ability to update goal details such as name, target, and deadline

#### Example

```
import { EditGoalForm } from './editGoal';

function EditGoalPage() {
  return (
    <EditGoalForm
      goal_id="123"
      name="Bench Press 225lbs"
      target={225}
      deadline={new Date('2024-12-31')}
      progress={200}
    />
  );
}
```

#### References

- `GymerApp/src/app/goals/_components/goalCard.tsx`

### NewGoal

This component renders the goal form for creating a new goal, enabling users to set a name, target, deadline, and other relevant details.

#### Features

- Button to open the goal creation form
- User-friendly form for inputting goal details

#### Example

```
import { GoalForm } from './newGoal';

function NewGoalPage() {
  return <GoalForm />;
}
```

#### References

- `GymerApp/src/app/goals/_components/goalsList.tsx`

### GoalCard

This component displays an individual goal's details in a styled card format, showing information such as name, target, deadline, and progress.

#### Features

- Presents key goal information in a card layout
- Supports editing and deleting goals
- Displays progress towards the goal target

#### Example

```
import { GoalCard } from './goalCard';

function Goals() {
  return (
    <GoalCard
      name="Bench Press 225lbs"
      target={225}
      deadline={new Date('2024-12-31')}
      progress={200}
    />
  );
}
```

#### References

- `GymerApp/src/app/goals/_components/goalsList.tsx`

### GoalsList

This component renders a list of all user goals, allowing for easy management and viewing of multiple goals at once.

#### Features

- Displays multiple goals with their names, targets, deadlines, and progress
- Option to add new goals

#### Example

```
import { GoalsList } from './goalsList';

function Dashboard() {
  return <GoalsList />;
}
```

#### References

- `GymerApp/src/app/dashboard/page.tsx`
- `GymerApp/src/app/goals/page.tsx`

### GoalList

This component displays an entire list of the user's goals, allowing users to view and manage all their goals at once.

#### Features

- Fetches and displays all user goals using the getGoalHistory function
- Renders individual goals using the GoalCard component

#### Example

```
import { GoalsList } from '../goalsList';

function Dashboard() {
  return <GoalsList />;
}
```

#### References

- `GymerApp/src/app/goals/_components/goalHistory.tsx`
- `GymerApp/src/app/dashboard/page.tsx`