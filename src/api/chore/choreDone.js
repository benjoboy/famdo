import { BASE_API_URL } from "../constants";

export async function choreDone(choreId, points) {
  try {
    console.log(choreId);
    const response = await fetch(`${BASE_API_URL}/family/chore/done`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ completed: true, id: choreId, points: points }),
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
