import { BASE_API_URL } from "./constants";

export async function loginApi(email, password) {
  try {
    const response = await fetch(`${BASE_API_URL}/user/logout`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    const user = await response.json();
    if (201 === response.status) {
      return user;
    } else {
      throw user;
    }
  } catch (e) {
    if ("string" === typeof e) {
      throw e;
    }
    throw "Unknown error";
  }
}
