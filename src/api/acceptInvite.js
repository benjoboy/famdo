import { BASE_API_URL } from "./constants";

export async function acceptInvite(familyId) {
  try {
    const response = await fetch(`${BASE_API_URL}/family/invite/accept`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ familyId }),
    });
    const res = await response.json();
    if (200 === response.status) {
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
