"use server";

import * as auth from "@/auth";

export async function githubSignIn() {
  return auth.signIn("github");
}

export async function googleSignIn() {
  return auth.signIn("google");
}
