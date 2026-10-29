import portrait from "@/public/images/strahinja-babovic.jpeg";

/**
 * The person shown in "The people behind RAJAL" (Contact section).
 * To replace: drop the new photo into public/images/, update the import and
 * name here, and adjust `contact.people.role` / `portraitAlt` in content/*.json.
 */
export const featuredPerson = {
  name: "Strahinja Babović",
  portrait,
  /** Crop focus for the 4:5 frame (keeps the face, trims the chair at the bottom). */
  objectPosition: "50% 22%",
};
