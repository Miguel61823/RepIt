# Supplements Components

This directory contains React components for managing and displaying supplements in the app, which handles supplement creation, editing, listing, and tracking.

## Components

### EditSupplement

This component is a container for the edit supplement form, allowing users to modify existing supplements by preloading the form fields with current supplement details and saving updates.

#### Features

- Pre-filled form fields for existing supplement data
- Ability to update supplement details such as name, dosage, and frequency

#### Example

```
import { EditSupplement } from './editSupplement';

function EditSupplementPage() {
  return (
    <EditSupplement
      supplement={{
        id: "123",
        name: "Vitamin D",
        dosage: "1000 IU",
        frequency: "Daily",
        instructions: "Take with food",
        startDate: new Date('2024-01-01'),
        endDate: null,
        isActive: true
      }}
    />
  );
}
```

#### References

- `GymerApp/src/app/supplements/_components/supplementCard.tsx`

### NewSupplement

This component renders the supplement form for creating a new supplement, enabling users to set a name, dosage, frequency, and other relevant details.

#### Features

- Button to open the supplement creation form
- User-friendly form for inputting supplement details

#### Example

```
import { NewSupplement } from './newSupplement';

function NewSupplementPage() {
  return <NewSupplement />;
}
```

#### References

- `GymerApp/src/app/supplements/_components/supplementHistory.tsx`

### SupplementCard

This component displays an individual supplement's details in a styled card format, showing information such as name, dosage, frequency, and active status.

#### Features

- Presents key supplement information in a card layout
- Supports editing and deleting supplements
- Displays start date, end date (if applicable), and active status

#### Example

```
import { SupplementCard } from './supplementCard';

function Supplements() {
  return (
    <SupplementCard
      id="123"
      name="Vitamin D"
      dosage="1000 IU"
      frequency="Daily"
      instructions="Take with food"
      startDate={new Date('2024-01-01')}
      endDate={null}
      isActive={true}
    />
  );
}
```

#### References

- `GymerApp/src/app/supplements/_components/supplementHistory.tsx`

### SupplementHistory

This component renders a list of all user supplements, categorized by their active status.

#### Features

- Displays supplements grouped by active and inactive status
- Includes a section for adding new supplements

#### Example

```
import { SupplementHistory } from './supplementHistory';

function SupplementsPage() {
  return <SupplementHistory />;
}
```

#### References

- `GymerApp/src/app/supplements/page.tsx`

### SupplementsList

This component displays an entire list of the user's supplements, allowing users to view and manage all their supplements at once.

#### Features

- Fetches and displays all user supplements using the `getSupplementHistory` function
- Renders individual supplements using the `SupplementCard` component
- Separates active and inactive supplements into different sections
- Provides an option to add new supplements

#### Example

```
import { SupplementsList } from '../supplementsList';

function Dashboard() {
  return <SupplementsList />;
}
```

#### References

- `GymerApp/src/app/supplements/_components/supplementHistory.tsx`
- `GymerApp/src/app/dashboard/page.tsx`