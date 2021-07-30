import { BASE_API_URL } from "../constants";

export async function createNote(note) {
  try {
    const response = await fetch(`${BASE_API_URL}/family/note/create`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ note: note }),
    });
    const res = await response.json();
    if (201 === response.status) {
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
