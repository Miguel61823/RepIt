import {NextResponse} from 'next/server';
import {addEquipment, getEquipmentByFacility, markEquipmentAsDeleted} from '@/drizzle/api/equipment';
import {auth} from '@clerk/nextjs/server';

export async function POST(request: Request) {
  const {userId} = auth();
  if (!userId) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  try {
    const body = await request.json();
    const {
      name,
      type,
      condition,
      description,
      maintenanceDate,
      quantity,
      osm_id,
    } = body;

    if (!name || !osm_id) {
      return NextResponse.json(
        {error: 'Missing required fields'},
        {status: 400},
      );
    }

    const identifier = name.toLowerCase().replace(/\s+/g, '-');
    const equipmentData = {
      osm_id,
      user_id: userId,
      name,
      identifier,
      type: type || null,
      condition: condition || null,
      description: description || null,
      maintenance_date: maintenanceDate || null,
      quantity: parseInt(quantity) || 1,
    };

    const result = await addEquipment(equipmentData);

    return NextResponse.json(
      {message: 'Equipment added successfully', data: result},
      {status: 200},
    );
  } catch (error) {
    console.error('Error in POST request:', error);
    return NextResponse.json({error: 'Failed to add equipment'}, {status: 500});
  }
}

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const osmId = searchParams.get('osm_id');

  if (!osmId) {
    return NextResponse.json({error: 'osmId is required'}, {status: 400});
  }

  try {
    const equipment = await getEquipmentByFacility(osmId);
    return NextResponse.json({data: equipment}, {status: 200});
  } catch (error) {
    console.error('Error fetching equipment:', error);
    return NextResponse.json(
      {error: 'Failed to fetch equipment'},
      {status: 500},
    );
  }
}

export async function DELETE(request: Request) {
  const {userId} = auth();
  if (!userId) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  try {
    const body = await request.json();
    console.log('Received body:', body);  // Log the received body

    const {identifier} = body;

    if (!identifier) {
      return NextResponse.json(
        {error: 'Identifier is required'},
        {status: 400},
      );
    }

    const result = await markEquipmentAsDeleted(identifier);

    return NextResponse.json(
      {message: 'Equipment marked as deleted', data: result},
      {status: 200},
    );
  } catch (error) {
    console.error('Error in DELETE request:', error);
    return NextResponse.json(
      {error: 'Failed to mark equipment as deleted'},
      {status: 500},
    );
  }
}
