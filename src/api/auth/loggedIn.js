import { BASE_API_URL } from "../constants";

export async function loggedIn() {
  try {
    const response = await fetch(`${BASE_API_URL}/user/logged_in`, {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
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
