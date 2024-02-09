"use client";

import Image from "next/image";
import logoLight from "../../public/logo-light.png";
import leftSide from "../../public/left-side.png";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoLogoDiscord } from "react-icons/io5";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import * as actions from "@/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AuthForm() {
  const [toggleSignIn, setToggleSignIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error1, setError1] = useState({ email: "", password: "" });
  const [error2, setError2] = useState({
    name: "",
    newEmail: "",
    newPassword: "",
  });

  function validate1() {
    let isValid = true;
    let newError = { email: "", password: "" };

    if (email === "") {
      newError.email = "Email is required";
      isValid = false;
    } else if (!/^[a-z0-9. _%+-]+@[a-z0-9. -]+\.[a-z]{2,4}$/.test(email)) {
      newError.email = "Invalid email";
      isValid = false;
    }
    if (password === "") {
      newError.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newError.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setError1(newError);
    return isValid;
  }

  function validate2() {
    let isValid = true;
    let newError = { name: "", newEmail: "", newPassword: "" };

    if (name === "") {
      newError.name = "Name is required";
      isValid = false;
    } else if (name.length < 3) {
      newError.name = "Name must be at least 3 characters";
      isValid = false;
    } else if (name.length > 50) {
      newError.name = "Name must be at most 50 characters";
      isValid = false;
    }

    if (newEmail === "") {
      newError.newEmail = "Email is required";
      isValid = false;
    } else if (!/^[a-z0-9. _%+-]+@[a-z0-9. -]+\.[a-z]{2,4}$/.test(newEmail)) {
      newError.newEmail = "Invalid email";
      isValid = false;
    }

    if (newPassword === "") {
      newError.newPassword = "Password is required";
      isValid = false;
    } else if (newPassword.length < 8) {
      newError.newPassword = "Password must be at least 8 characters";
      isValid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        newPassword,
      )
    ) {
      newError.newPassword =
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character";
      isValid = false;
    }

    setError2(newError);
    return isValid;
  }

  function handleSignIn(e: any) {
    e.preventDefault();
    if (validate1()) {
      actions.googleSignIn();
    }
  }

  function handleSignUp(e: any) {
    e.preventDefault();
    if (validate2()) {
      actions.googleSignIn();
    }
  }
  return (
    <div className="mx-auto mt-48 flex w-full max-w-[26.415rem] flex-col items-start justify-center px-4 md:p-0 lg:mt-0 ">
      <h2 className="mb-[.75rem] text-4xl font-bold text-[var(--text-primary-color)]">
        Sign In
      </h2>
      <p className="mb-[1.78rem] text-[1rem] text-[var(--text-secondary-color)]">
        Sign in to your account
      </p>
      <div className="mb-[1.715rem] flex w-full justify-center gap-2 text-[var(--text-primary-color)]">
        <form action={actions.googleSignIn} className="w-full">
          <button className="flex h-[2rem] w-full items-center justify-center gap-2 rounded-[.625rem] bg-[var(--primary-color)] text-[.75rem] text-[var(--text-light-grey)] ">
            <FcGoogle className="text-[1.125rem]" /> Sign in with Google
          </button>
        </form>
        <form action={actions.githubSignIn} className="w-full">
          <button className="flex h-[2rem] w-full items-center justify-center gap-2 rounded-[.625rem] bg-[var(--primary-color)] text-[.75rem] text-[var(--text-light-grey)] ">
            <FaGithub className="text-[1.125rem]" /> Sign in with Github
          </button>
        </form>
      </div>
      {!toggleSignIn && (
        <form className="w-full" onSubmit={handleSignIn}>
          <div className="mb-[1.5rem] flex w-full flex-col rounded-[1.25rem] bg-[var(--primary-color)] p-[2.058rem] shadow-[var(--box-shadow)]">
            <label className="mb-[.625rem]" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="h-[2.75rem] w-full rounded-[.625rem] bg-[rgb(245,245,245)] p-4"
            />
            <span className="mb-[1.5rem] text-red-500">{error1.email}</span>
            <label className="mb-[.625rem]" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="h-[2.75rem] w-full rounded-[.625rem] bg-[rgb(245,245,245)] p-4"
            />
            <span className="mb-[1.5rem] text-red-500">{error1.password}</span>
            <span
              onClick={() => actions.googleSignIn()}
              className="mb-[1.5rem] w-max cursor-pointer text-[var(--link-color)] hover:underline"
            >
              Forgot password?
            </span>
            <button className="h-[2.75rem] w-full rounded-[.625rem] bg-[var(--accent-color)] text-[1rem] font-bold text-white">
              Sign In
            </button>
          </div>
        </form>
      )}
      {toggleSignIn && (
        <form className="w-full" onSubmit={handleSignUp}>
          <div className="mb-[1.5rem] flex w-full flex-col rounded-[1.25rem] bg-[var(--primary-color)] p-[2.058rem] shadow-[var(--box-shadow)]">
            <label className="mb-[.625rem]" htmlFor="email">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="h-[2.75rem] w-full rounded-[.625rem] bg-[rgb(245,245,245)] p-4"
            />
            <span className="mb-[1.5rem] text-red-500">{error2.name}</span>
            <label className="mb-[.625rem]" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Email"
              required
              className="h-[2.75rem] w-full rounded-[.625rem] bg-[rgb(245,245,245)] p-4"
            />
            <span className="mb-[1.5rem] text-red-500">{error2.newEmail}</span>
            <label className="mb-[.625rem]" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Password"
              required
              className="h-[2.75rem] w-full rounded-[.625rem] bg-[rgb(245,245,245)] p-4"
            />
            <span className="mb-[1.5rem] text-red-500">
              {error2.newPassword}
            </span>
            <button className="h-[2.75rem] w-full rounded-[.625rem] bg-[var(--accent-color)] text-[1rem] font-bold text-white">
              Sign Up
            </button>
          </div>
        </form>
      )}
      {!toggleSignIn && (
        <p className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row lg:gap-1">
          <span className="text-[var(--text-secondary-color)]">
            Don&apos;t have an account?
          </span>
          <span
            onClick={() => setToggleSignIn(true)}
            className="cursor-pointer text-[var(--link-color)] hover:underline"
          >
            Register here
          </span>
        </p>
      )}
      {toggleSignIn && (
        <p className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row lg:gap-1">
          <span className="text-[var(--text-secondary-color)]">
            Already have an account?
          </span>
          <span
            onClick={() => setToggleSignIn(false)}
            className="cursor-pointer text-[var(--link-color)] hover:underline"
          >
            Sign in
          </span>
        </p>
      )}
    </div>
  );
}
