import type { ColliderBehavior } from "./collider.behavior";

export interface CollisionEvent {
  other: ColliderBehavior;
  self: ColliderBehavior;
}
