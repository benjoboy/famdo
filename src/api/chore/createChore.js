import { BASE_API_URL } from "../constants";

export async function createChore(chore) {
  try {
    const response = await fetch(`${BASE_API_URL}/family/chore/create`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ chore }),
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
