// /db/schema/types.ts
import { pgEnum } from 'drizzle-orm/pg-core';

export const nodeType = pgEnum('node_type', [
  'group',      // Any grouping or parent node (workouts, exercises, sets, etc)
  'metric'      // Any measurable value (weight, reps, distance, time, etc)
]);

export type NodeType = typeof nodeType.enumValues[number];
