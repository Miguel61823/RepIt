"use server";

import { db } from "@/drizzle/db";
import { GymsTable } from "@/drizzle/schema/tables/gym";
import { mockGyms } from "@/app/gyms/_components/gymListings";
import { eq } from "drizzle-orm";
import { revalidatePath } from 'next/cache';

export interface Gym {
  gym_id: string;
  map_id: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  image?: string;
  features?: string[];
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

export async function checkGymInDB(
  checked_map_id: string
): Promise<boolean> {
  const gym = await db.query.GymsTable.findFirst({
    where: ({ map_id }, { eq }) => eq(map_id, checked_map_id)
  });
  // console.log(gym);
  if (!gym || !Object.keys(gym).length) {
    // console.log(false);
    return false;
  } else {
    // console.log(true);
    return true;
  }
}

export async function addGym(
  gym: Gym
): Promise<undefined | {error: boolean}> {

  // console.log(gym);
  const {map_id, name, address, phone, website, image, features} = gym;
  await db.insert(GymsTable).values({
    name: name,
    map_id: map_id,
    address: address,
    phone: phone,
    website: website,
    image: image,
    features: features
  });
  
  revalidatePath('/gyms');
  return;
};
