import { BASE_API_URL } from "../constants";

export async function deleteNote(noteId) {
  try {
    console.log({ eventId: noteId });
    const response = await fetch(`${BASE_API_URL}/family/note/${noteId}`, {
      method: "Delete",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const res = await response.json();
    if (202 === response.status) {
      return res;
    } else {
      throw res;
    }
  } catch (e) {
    if ("string" === typeof e) {
      throw e;
    }
    throw e;
  }
}
