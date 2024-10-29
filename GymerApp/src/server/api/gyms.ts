import { db } from "@/drizzle/db";
import { GymsTable } from "@/drizzle/schema/tables/gym";
import { mockGyms } from "@/app/gyms/page";

interface Gym {
  gym_id: string;
  name: string;
  address: string;
}

// TODO: FETCH FROM DB INSTEAD OF MOCK DATA
export async function getGyms(query: string | undefined) {
  if (!query) {
    return mockGyms;
  }
  const gyms = mockGyms.filter(gym => 
    gym.name.toLowerCase().includes(query) ||
    gym.features.some(feature => feature.toLowerCase().includes(query))
  )
  gyms.forEach(gym=>{console.log(gym.name)});
  return gyms;
};
