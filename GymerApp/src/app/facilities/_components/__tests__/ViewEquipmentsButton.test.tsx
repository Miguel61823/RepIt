// __tests__/ViewEquipmentsButton.test.tsx
import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {ViewEquipmentsButton} from '../ViewEquipmentsButton';

global.fetch = jest.fn();

describe('ViewEquipmentsButton', () => {
  const mockSetEquipment = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the button correctly', () => {
    render(
      <ViewEquipmentsButton
        osmId="12345"
        equipment={[]}
        setEquipment={mockSetEquipment}
      />,
    );

    const button = screen.getByRole('button', {name: /View Equipment/i});
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('View Equipment');
  });

  it('displays loading state when clicked', async () => {
    render(
      <ViewEquipmentsButton
        osmId="12345"
        equipment={[]}
        setEquipment={mockSetEquipment}
      />,
    );

    const button = screen.getByRole('button', {name: /View Equipment/i});
    fireEvent.click(button);

    expect(button).toHaveTextContent('Loading...');
  });

  it('fetches equipment data and opens the sheet on success', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [
          {
            name: 'Treadmill',
            type: 'Cardio',
            condition: 'Good',
            description: 'High-performance treadmill',
            maintenance_date: '2024-12-01',
            quantity: 3,
          },
        ],
      }),
    });

    render(
      <ViewEquipmentsButton
        osmId="12345"
        equipment={[]}
        setEquipment={mockSetEquipment}
      />,
    );

    const button = screen.getByRole('button', {name: /View Equipment/i});
    fireEvent.click(button);

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith('/api/equipment?osm_id=12345'),
    );
    await waitFor(() =>
      expect(mockSetEquipment).toHaveBeenCalledWith(expect.any(Array)),
    );

    // Check that the sheet content is displayed
    expect(screen.getByText(/Equipment Inventory/i)).toBeInTheDocument();
    expect(screen.getByText('Treadmill')).toBeInTheDocument();
    expect(screen.getByText('Cardio')).toBeInTheDocument();
    expect(screen.getByText('Good')).toBeInTheDocument();
  });

  it('displays an error message if the API call fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(
      <ViewEquipmentsButton
        osmId="12345"
        equipment={[]}
        setEquipment={mockSetEquipment}
      />,
    );

    const button = screen.getByRole('button', {name: /View Equipment/i});
    fireEvent.click(button);

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith('/api/equipment?osm_id=12345'),
    );

    expect(
      screen.getByText(/Error loading equipment data/i),
    ).toBeInTheDocument();
  });

  it('displays a message when no equipment data is available', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({data: []}),
    });

    render(
      <ViewEquipmentsButton
        osmId="12345"
        equipment={[]}
        setEquipment={mockSetEquipment}
      />,
    );

    const button = screen.getByRole('button', {name: /View Equipment/i});
    fireEvent.click(button);

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith('/api/equipment?osm_id=12345'),
    );

    expect(
      screen.getByText(/No equipment found for this facility/i),
    ).toBeInTheDocument();
  });
});
