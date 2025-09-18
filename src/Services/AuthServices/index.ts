/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const loginUser = async (userData: Record<string, unknown>) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    // console.log(result);
    if (result?.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};


export const logout = async () => {
  (await cookies()).delete("accessToken");
};
