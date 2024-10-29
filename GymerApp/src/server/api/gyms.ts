import { db } from "@/drizzle/db";
import { GymsTable } from "@/drizzle/schema/tables/gym";

export interface Gym {
  gym_id: string;
  name: string;
  address: string;
}

export async function getGyms(query: string): Promise<Gym[]> {
  const gyms: Gym[] = [];

  // const test: Gym = {
  //   gym_id: "1i9ef23test",
  //   name: "Test Gym",
  //   address: "123 Test Street, Testville"
  // };
  // gyms.push();
  return gyms;
};
