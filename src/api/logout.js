import { BASE_API_URL } from "./constants";

export async function logoutApi() {
  try {
    const response = await fetch(`${BASE_API_URL}/user/logout`, {
      method: "POST",
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
    throw "Unknown error";
  }
}
