import { BASE_API_URL } from "./constants";

export async function loginApi(email, password) {
  try {
    const response = await fetch(`${BASE_API_URL}/user/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });
    const user = await response.json();
    if (201 === response.status) {
      console.log(user, "here");
      return user;
    } else {
      throw user;
    }
  } catch (e) {
    if ("string" === typeof e) {
      throw e;
    }
    throw e;
  }
}
