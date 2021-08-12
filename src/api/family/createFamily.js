import { BASE_API_URL } from "../constants";

export async function createFamily(name) {
  try {
    const response = await fetch(`${BASE_API_URL}/family`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: name }),
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
