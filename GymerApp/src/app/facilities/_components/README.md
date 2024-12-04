# Facilities Components

This directory contains React components for managing and displaying fitness facilities in the app, which handles facility searching, viewing, and equipment management.

## Components

### FacilityCard

This component renders a styled card displaying individual facility details, including name, address, phone number, and equipment management options3

#### Features

- Displays facility name, address, and contact information
- Equipment management integration
- Website linking capability
- Leisure type categorization

#### Example

```
import FacilityCard from './FacilityCard';

function Facilities() {
  return (
    <FacilityCard
      facility={{
        name: "Gold's Gym",
        address: "123 Fitness St",
        phone: "555-0123",
        leisure: "fitness_centre",
        osm_id: "12345"
      }}
    />
  );
}
```

#### References

- `GymerApp/src/app/facilities/_components/FacilityCard.tsx`

### FacilitySearchBar

This component provides search functionality for facilities with debounced input handling2

#### Features

- Debounced search input
- Support for different search types (Nearby/Tracked)
- Dynamic URL updates based on search terms

#### Example

```
import { FacilitySearchBar } from './FacilitySearchBar';

function FacilitiesPage() {
  return <FacilitySearchBar searchType="Nearby" />;
}
```

#### References

- `GymerApp/src/app/facilities/_components/FacilitySearchBar.tsx`

### FacilityListings

This component manages the display of facility listings with location-based features4

#### Features

- Geolocation-based facility search
- Distance calculation using Haversine formula
- Adjustable search radius
- Sorting facilities by distance
- Loading states management

#### Example

```
import FacilityListings from './FacilityListings';

function FacilitiesPage() {
  return <FacilityListings search="gym" />;
}
```

#### References

- `GymerApp/src/app/facilities/_components/FacilityListings.tsx`

### ViewEquipmentsButton

This component provides equipment management functionality for facilities1

#### Features

- Equipment inventory viewing
- Equipment deletion capability
- Condition-based styling
- Loading and error state handling
- Real-time equipment list updates

#### Example

```
import { ViewEquipmentsButton } from './ViewEquipmentsButton';

function EquipmentManager() {
  return (
    <ViewEquipmentsButton
      osmId="12345"
      equipment={[]}
      setEquipment={setEquipmentState}
    />
  );
}
```

#### References

- `GymerApp/src/app/facilities/_components/ViewEquipmentsButton.tsx`
