"use server";
import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const authHeader = async () => {
  const token = await getUserToken();
  const header = token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};
  return header;
};

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseURL}${path}`, {
    method: method,
    headers: {
      "content-type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });
  return handleStatusCode(res)
};

export const protectedFetch = async (path) => {
  const res = await fetch(`${baseURL}${path}`, {
    headers: {
      "content-type": "application/json",
      ...(await authHeader()),
    },
  });
  const data = await res.json();
  return data;
};

export const serverFetch = async (path) => {
  const res = await fetch(`${baseURL}${path}`);
  return handleStatusCode(res)
};

const handleStatusCode =async (res) => {
  if (res.status === 401) {
    redirect("/unauthorized");
  }
  if (res.status === 403) {
    redirect("/forbidden");
  }
  return res.json();
};
