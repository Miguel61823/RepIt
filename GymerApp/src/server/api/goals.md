Goals API Documentation

Overview
The Goals API provides a complete set of server-side functions for managing user goals in a Next.js application. It integrates with Clerk for authentication and Drizzle ORM for database operations.
Table of Contents

Data Types
Authentication
API Methods
  getGoalHistory
  createGoal
  deleteGoal
  updateGoal
  toggleGoalCompletion



Data Types

interface Goal {
  goal_id: string;
  title: string;
  description: string | undefined;
  dueDate: Date;
  completed: boolean;
}

Authentication
All API methods use Clerk for authentication. Users must be authenticated to access any endpoint. Unauthenticated requests will trigger a redirect to the sign-in page.

API Methods
getGoalHistory - Retrieves all goals for the authenticated user.

async function getGoalHistory(): Promise<Goal[]>

Returns: An array of Goal objects ordered by due date
Empty array if user is not authenticated


Example:
const goals = await getGoalHistory();

createGoal - Creates a new goal for the authenticated user.

async function createGoal(
  dirty: z.infer<typeof goalFormSchema>
): Promise<undefined | {error: boolean}>
Parameters:

dirty: Unvalidated goal data conforming to the goalFormSchema

Returns:

undefined on success
{error: true} if validation fails or user is not authenticated

Example:
typescriptCopyconst result = await createGoal({
  title: "Complete project",
  description: "Finish the documentation",
  dueDate: new Date("2024-12-31"),
  completed: false
});
deleteGoal
Deletes a specific goal.
typescriptCopyasync function deleteGoal(
  deletedGoalId: string
): Promise<undefined | {error: boolean}>
Parameters:

deletedGoalId: The unique identifier of the goal to delete

Returns:

undefined on success
{error: true} if deletion fails

Example:
typescriptCopyconst result = await deleteGoal("123e4567-e89b-12d3-a456-426614174000");
updateGoal
Updates an existing goal.
typescriptCopyasync function updateGoal(
  goalId: string,
  dirty: z.infer<typeof goalFormSchema>
): Promise<undefined | {error: boolean}>
Parameters:

goalId: The unique identifier of the goal to update
dirty: Updated goal data conforming to the goalFormSchema

Returns:

undefined on success
{error: true} if validation fails or user is not authenticated

Example:
typescriptCopyconst result = await updateGoal(
  "123e4567-e89b-12d3-a456-426614174000",
  {
    title: "Updated title",
    description: "Updated description",
    dueDate: new Date("2024-12-31"),
    completed: true
  }
);
toggleGoalCompletion
Toggles the completion status of a goal.
typescriptCopyasync function toggleGoalCompletion(
  goalId: string
): Promise<undefined | {error: boolean}>
Parameters:

goalId: The unique identifier of the goal to toggle

Returns:

undefined on success
{error: true} if the goal is not found or user is not authenticated

Example:
typescriptCopyconst result = await toggleGoalCompletion("123e4567-e89b-12d3-a456-426614174000");
Error Handling
All methods return an error object {error: true} when:

The user is not authenticated
Input validation fails
Database operations fail
Required resources are not found

Dependencies

@clerk/nextjs: Authentication
zod: Schema validation
drizzle-orm: Database operations
uuid: Unique ID generation
next/cache: Cache revalidation

Notes

All successful mutations trigger a revalidation of the /goals path
The API uses server-side components (indicated by 'use server')
Database operations are performed using Drizzle ORM
All endpoints require authentication via Clerk