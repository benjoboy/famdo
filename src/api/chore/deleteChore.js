import { BASE_API_URL } from "../constants";

export default async function deleteChore(choreId) {
  try {
    console.log({ choreId: choreId });
    const response = await fetch(`${BASE_API_URL}/family/chore/${choreId}`, {
      method: "Delete",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const res = await response.json();
    if (202 === response.status) {
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
