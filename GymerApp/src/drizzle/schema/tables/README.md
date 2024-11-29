# Database Schema Documentation

This document provides an overview of the database schema, including tables and their relationships. It highlights both the deprecated and active tables used in the application.

## Tables Overview

### 1. Exercises Table (Deprecated)

The `ExercisesTable` stores exercise-related data. It has been marked as **deprecated**.

#### Fields:

- `exercise_id`: UUID, Primary Key. Auto-generated.
- `name`: Text. Name of the exercise.
- `workout_id`: UUID. References `WorkoutsTable.workout_id` (on delete: cascade).
- `user_id`: Text. User identifier.
- `order`: Integer. Position/order of the exercise in a workout.

#### Indexes:

- `workout_index`: Index on `workout_id`.

---

### 2. Facilities Table

The `FacilitiesTable` represents facilities such as gyms or parks.

#### Fields:

- `facility_id`: UUID, Primary Key. Auto-generated.
- `osm_id`: Text. Unique identifier for OpenStreetMap.
- `name`: Text. Facility name.
- `leisure`: Text. Type of leisure activity (e.g., gym, pool).
- `lat`: Double precision. Latitude of the facility.
- `lon`: Double precision. Longitude of the facility.
- `address`: Text. Address of the facility.
- `accessibility`: Text. Accessibility information.
- `opening_hours`: Text. Operating hours.
- `website`: Text. Facility's website URL.
- `phone`: Text. Facility's phone number.

#### Indexes:

- `location_index`: Index on `lat` and `lon`.
- `osm_index`: Index on `osm_id`.

---

### 3. Equipment Table

The `EquipmentTable` tracks equipment available at facilities.

#### Fields:

- `equipment_id`: UUID, Primary Key. Auto-generated.
- `facility_id`: UUID. References `FacilitiesTable.facility_id`.
- `user_id`: Text. User identifier.
- `name`: Text. Equipment name.
- `type`: Text. Type of equipment.
- `condition`: Text. Equipment condition.
- `description`: Text. Additional details.
- `maintenance_date`: Timestamp. Date of last maintenance.
- `quantity`: Integer. Quantity available. Defaults to `1`.
- `created_at`: Timestamp. Auto-generated.
- `updated_at`: Timestamp. Auto-generated.

#### Relationships:

- Many `Equipment` records belong to one `Facility`.

---

### 4. Goals Table

The `GoalsTable` stores user goals.

#### Fields:

- `goal_id`: UUID, Primary Key. Auto-generated.
- `user_id`: Text. User identifier.
- `title`: Text. Goal title.
- `description`: Text. Goal description.
- `dueDate`: Timestamp. Goal due date.
- `completed`: Boolean. Defaults to `false`.
- `createdAt`: Timestamp. Auto-generated.

#### Indexes:

- `user_goal_index`: Index on `user_id`.
- `due_date_index`: Index on `dueDate`.

---

### 5. Machines Table

The `MachinesTable` tracks fitness machines at facilities.

#### Fields:

- `id`: UUID, Primary Key. Auto-generated.
- `osm_id`: UUID. References `FacilitiesTable.facility_id`.
- `user_id`: Text. User identifier.
- `name`: Text. Machine name.
- `identifier`: Text. Unique identifier for the machine.
- `type`: Text. Type of machine.
- `condition`: Text. Machine condition.
- `description`: Text. Additional details.
- `maintenance_date`: Timestamp. Date of last maintenance.
- `quantity`: Integer. Defaults to `1`.
- `created_at`: Timestamp. Auto-generated.
- `updated_at`: Timestamp. Auto-generated.

---

### 6. Sets Table (Deprecated)

The `SetsTable` tracks exercise sets. This table is **deprecated**.

#### Fields:

- `id`: UUID, Primary Key. Auto-generated.
- `exercise_id`: UUID. References `ExercisesTable.exercise_id` (on delete: cascade).
- `reps`: Integer. Number of repetitions.
- `weight`: Integer. Weight used.
- `order`: Integer. Order of the set.
- `notes`: Text. Additional notes.

#### Indexes:

- `exercise_index`: Index on `exercise_id`.

---

### 7. Sessions Table

The `SessionsTable` logs user workout sessions.

#### Fields:

- `session_id`: UUID, Primary Key. Auto-generated.
- `user_id`: Text. User identifier.
- `name`: Text. Session name.
- `type`: Text. Session type.
- `date`: Timestamp. Defaults to current timestamp.
- `session_data`: Text. Raw session data.
- `parsed_data`: JSONB. Parsed session details.

#### Indexes:

- `user_session_index`: Index on `user_id`.

---

### 8. Supplements Table

The `SupplementsTable` tracks user supplement regimens.

#### Fields:

- `id`: UUID, Primary Key. Auto-generated.
- `user_id`: Text. User identifier.
- `name`: Text. Supplement name.
- `dosage`: Text. Dosage instructions.
- `frequency`: Text. Frequency of use.
- `instructions`: Text. Additional instructions.
- `startDate`: Timestamp. Start date of usage.
- `endDate`: Timestamp. End date of usage.
- `isActive`: Boolean. Indicates if supplement is currently used. Defaults to `true`.

#### Indexes:

- `user_supplement_index`: Index on `user_id`.

---

### 9. Workouts Table (Deprecated)

The `WorkoutsTable` logs user workout plans. This table is **deprecated**.

#### Fields:

- `workout_id`: UUID, Primary Key. Auto-generated.
- `user_id`: Text. User identifier.
- `title`: Text. Workout title.
- `description`: Text. Workout description.
- `date_completed`: Timestamp. Date the workout was completed.

#### Indexes:

- `user_index`: Index on `user_id`.

---

## Relationships Overview

- **Facilities ↔ Equipment**: One-to-many relationship. Each facility can have multiple pieces of equipment.
- **Facilities ↔ Machines**: One-to-many relationship. Each facility can have multiple machines.

## Deprecation Notes

- Tables marked as **deprecated** are no longer actively maintained and should not be used for new features. These include:
  - `ExercisesTable`
  - `SetsTable`
  - `WorkoutsTable`
