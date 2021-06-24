import { BASE_API_URL } from "./constants";

export async function registerApi(password, name, surname, email) {
  try {
    const response = await fetch(`${BASE_API_URL}/user/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ password, name, surname, email }),
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
