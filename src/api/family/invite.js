import { BASE_API_URL } from "../constants";

export async function invite(familyId, email) {
  try {
    const response = await fetch(`${BASE_API_URL}/family/invite`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ familyId, email }),
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
