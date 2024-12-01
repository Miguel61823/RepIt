# Equipment API Documentation

This documentation outlines the structure and functionality of the Equipment API, which supports adding new equipment and retrieving equipment by facility.

---

## **End Points**

### `POST /api/equipment`

This endpoint adds new equipment to the database.

#### **Parameters (Request Body)**

- `name` (string): The name of the equipment (Required).
- `type` (string): The type of equipment (Optional).
- `condition` (string): The condition of the equipment (Optional).
- `description` (string): A description of the equipment (Optional).
- `maintenanceDate` (string): The last maintenance date (ISO format, Optional).
- `quantity` (number): The quantity of equipment (Defaults to 1, Optional).
- `osm_id` (string): The facility `osm_id` linked to the equipment (Required).

#### **Workflow**

1. **Authorization**: The request checks for a valid user ID from Clerk (`userId`). If no `userId` is found, it returns a `401 Unauthorized` response.
2. **Validation**: The request ensures that required fields (`name`, `osm_id`) are provided. If any required field is missing, it returns a `400 Bad Request` response.
3. **Equipment Data Creation**: The provided data is processed, and an `identifier` is created by converting the name into a lowercase format with spaces replaced by hyphens.
4. **Database Insertion**: The data is inserted into the `MachinesTable` using `addEquipment`.

#### **Responses**

- `200 OK`: Equipment added successfully.
  - **Response Body**:
    ```json
    {
      "message": "Equipment added successfully",
      "data": { ... } // Contains the inserted equipment data
    }
    ```
- `400 Bad Request`: Missing required fields or invalid data.
  - **Response Body**:
    ```json
    {
      "error": "Missing required fields"
    }
    ```
- `401 Unauthorized`: User not authenticated.
  - **Response Body**:
    ```json
    {
      "error": "Unauthorized"
    }
    ```
- `500 Internal Server Error`: Server or database failure.
  - **Response Body**:
    ```json
    {
      "error": "Failed to add equipment"
    }
    ```

#### **Example Usage**

```javascript
const response = await fetch('/api/equipment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Drill Machine',
    osm_id: '12345',
    type: 'Heavy',
    quantity: 2,
  }),
});
const data = await response.json();
```
### `DELETE /api/equipment`

This endpoint pseudo deletes equipment from the database by renaming and filtering.

#### **Parameters (Request Query)**

- `id` (string): The unique identifier of the equipment to be deleted (Required).

#### **Workflow**

1. **Authorization**: The request checks for a valid user ID from Clerk (`userId`). If no `userId` is found, it returns a `401 Unauthorized` response.
2. **Validation**: The request ensures that the `id` parameter is provided. If the `id` is missing, it returns a `400 Bad Request` response.
3. **Database Deletion**: The equipment with the given `id` is removed from the `MachinesTable`.

#### **Responses**

- `200 OK`: Equipment deleted successfully.
  - **Response Body**:
    ```json
    {
      "message": "Equipment deleted successfully"
    }
    ```
- `400 Bad Request`: Missing required fields or invalid data.
  - **Response Body**:
    ```json
    {
      "error": "Missing required field: id"
    }
    ```
- `401 Unauthorized`: User not authenticated.
  - **Response Body**:
    ```json
    {
      "error": "Unauthorized"
    }
    ```
- `404 Not Found`: Equipment with the provided `id` not found.
  - **Response Body**:
    ```json
    {
      "error": "Equipment not found"
    }
    ```
- `500 Internal Server Error`: Server or database failure.
  - **Response Body**:
    ```json
    {
      "error": "Failed to delete equipment"
    }
    ```

#### **Example Usage**

```javascript
const response = await fetch('/api/equipment?id=12345', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer your-token-here',
  },
});
const data = await response.json();



