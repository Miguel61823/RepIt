# Equipment Service Documentation

This documentation outlines the functionality and structure of the Equipment Service, which handles adding new equipment and retrieving equipment by facility.

---

## **Functions**

### `addEquipment(data: EquipmentData)`

This function is responsible for adding new equipment data to the `MachinesTable` in the database.

#### **Parameters**

- `data` (EquipmentData): The equipment details to be added.
  - `osm_id` (string): The OSM ID of the facility to which the equipment is linked (Required).
  - `user_id` (string): The ID of the user adding the equipment (Required).
  - `name` (string): The name of the equipment (Required).
  - `identifier` (string): A unique identifier for the equipment (Required).
  - `type` (string): The type of the equipment (Optional).
  - `condition` (string): The condition of the equipment (Optional).
  - `description` (string): A description of the equipment (Optional).
  - `maintenance_date` (string): The maintenance date for the equipment (ISO format, Optional).
  - `quantity` (number): The quantity of the equipment (Defaults to 1, Optional).

#### **Workflow**

1. **Validation**: The function first checks if the `osm_id` exists in the `FacilitiesTable` to ensure that it maps to a valid facility.
2. **Formatted Data**: The equipment data is then formatted and prepared for insertion, including setting `null` values for optional fields and converting the maintenance date to a `Date` object if provided.
3. **Database Insertion**: The data is inserted into the `MachinesTable` using the `db.insert()` method.

#### **Responses**

- **Success**:

  - Returns an object containing the success status and the inserted equipment data.
  - Example:
    ```json
    {
      "success": true,
      "data": { ... } // Inserted equipment data
    }
    ```

- **Failure**:
  - If the `osm_id` does not map to a valid facility, an error is thrown with the message `'Invalid osm_id, no matching facility found'`.
  - If any other error occurs during the process, an error is thrown with the message `'Failed to add equipment'`.

---

### `getEquipmentByFacility(osmId: string)`

This function retrieves all equipment associated with a given facility using the `osm_id`.

#### **Parameters**

- `osmId` (string): The OSM ID of the facility (Required).

#### **Workflow**

1. **Database Query**: The function queries the `MachinesTable` to fetch all equipment records linked to the provided `osmId`.
2. **Return Equipment**: The function returns the equipment data for the specified `osm_id`.

#### **Responses**

- **Success**:

  - Returns an array of equipment objects for the given `osmId`.
  - Example:
    ```json
    [
      { "osm_id": "12345", "name": "Drill Machine", "type": "Heavy", "quantity": 2, ... },
      { "osm_id": "12345", "name": "Excavator", "type": "Heavy", "quantity": 1, ... }
    ]
    ```

- **Failure**:
  - If an error occurs while fetching the equipment, an error is thrown with the message `'Failed to fetch equipment'`.

---

## **Error Handling**

- **Invalid `osm_id`**: If the `osm_id` does not correspond to a valid facility, an error with the message `'Invalid osm_id, no matching facility found'` is thrown.
- **Database Errors**: If an error occurs while interacting with the database, an error with the message `'Failed to add equipment'` or `'Failed to fetch equipment'` is thrown.

---

## **Example Usage**

### Adding Equipment

```javascript
const equipmentData = {
  osm_id: '12345',
  user_id: 'user123',
  name: 'Excavator',
  identifier: 'excavator-12345',
  type: 'Heavy',
  quantity: 1,
};

const result = await addEquipment(equipmentData);
console.log(result);
```
