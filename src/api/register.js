export async function loginApi(
  username,
  password,
  name,
  surname,
  email,
  password
) {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const json = await response.json();
    if (200 === response.status) {
      const { token } = json;
      return token;
    } else {
      const { error } = json;
      throw error;
    }
  } catch (e) {
    if ("string" === typeof e) {
      throw e;
    }
    throw "Unknown error";
  }
}
