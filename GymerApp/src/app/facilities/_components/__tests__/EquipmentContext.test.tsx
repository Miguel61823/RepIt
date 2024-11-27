import React from 'react';
import {render, screen} from '@testing-library/react';
import {EquipmentProvider, useEquipment, EquipmentData} from '../EquipmentContext';

// Mock component to test the context
const MockComponent: React.FC = () => {
  const {equipmentList, addEquipment} = useEquipment();

  const handleAddEquipment = () => {
    const newEquipment: EquipmentData = {
      osm_id: '123',
      user_id: 'user_1',
      name: 'Treadmill',
      identifier: 'T123',
      type: 'cardio',
      condition: 'excellent',
      description: 'High-end treadmill with multiple features',
      maintenance_date: '2024-11-01',
      quantity: 1,
    };
    addEquipment(newEquipment);
  };

  return (
    <div>
      <button onClick={handleAddEquipment} data-testid="add-button">
        Add Equipment
      </button>
      <ul data-testid="equipment-list">
        {equipmentList.map((equipment) => (
          <li key={equipment.identifier}>{equipment.name}</li>
        ))}
      </ul>
    </div>
  );
};

describe('EquipmentContext', () => {
  it('renders children correctly', () => {
    render(
      <EquipmentProvider>
        <div>Test Child</div>
      </EquipmentProvider>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('throws an error if useEquipment is used outside EquipmentProvider', () => {
    const TestComponent = () => {
      useEquipment(); // This will throw an error
      return null;
    };

    expect(() => render(<TestComponent />)).toThrow(
      'useEquipment must be used within an EquipmentProvider'
    );
  });

  it('adds equipment correctly', () => {
    render(
      <EquipmentProvider>
        <MockComponent />
      </EquipmentProvider>
    );

    const addButton = screen.getByTestId('add-button');
    const equipmentList = screen.getByTestId('equipment-list');

    // Initially, the list should be empty
    expect(equipmentList.children.length).toBe(0);

    // Add new equipment
    addButton.click();

    // Verify the new equipment is added
    expect(equipmentList.children.length).toBe(1);
    expect(screen.getByText('Treadmill')).toBeInTheDocument();
  });
});
