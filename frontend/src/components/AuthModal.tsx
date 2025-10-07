import { FormEvent, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  clearAuthSession,
  isAuthSessionValid,
  storeAuthSession,
  type LoginResponse,
} from "../utils/auth";

type AuthMode = "signin" | "signup";
type Status = "idle" | "loading" | "success" | "error";

const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  "http://localhost:8000";

interface RegisterResponse {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

type AuthResponse = LoginResponse | RegisterResponse;

function buildApiUrl(path: string) {
  const normalizedBase = API_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

async function authRequest(
  mode: AuthMode,
  credentials: { email: string; password: string }
): Promise<AuthResponse> {
  const email = credentials.email.trim().toLowerCase();
  const password = credentials.password;
  const endpoint = mode === "signup" ? "/auth/register" : "/auth/login";
  const url = buildApiUrl(endpoint);

  const requestInit: RequestInit =
    mode === "signup"
      ? {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      : {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            username: email,
            password,
          }).toString(),
        };

  let response: Response;
  try {
    response = await fetch(url, requestInit);
  } catch {
    throw new Error(
      "Unable to reach the authentication service. Try again shortly."
    );
  }

  if (!response.ok) {
    let detail = "Authentication failed.";

    try {
      const errorBody = await response.json();
      if (typeof errorBody === "object" && errorBody !== null) {
        if ("detail" in errorBody && typeof errorBody.detail === "string") {
          detail = errorBody.detail;
        } else if (
          "message" in errorBody &&
          typeof errorBody.message === "string"
        ) {
          detail = errorBody.message;
        }
      }
    } catch {
      // Ignore JSON parsing errors and keep the default message.
    }

    throw new Error(detail);
  }

  return (await response.json()) as AuthResponse;
}

function isLoginResponse(payload: AuthResponse): payload is LoginResponse {
  return "access_token" in payload;
}

export default function AuthModal() {
  const navigate = useNavigate({ from: "/auth" });
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const isSignUp = mode === "signup";
  const isLoading = status === "loading";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError("");
    setMessage("");

    try {
      const response = await authRequest(mode, { email, password });

      if (isLoginResponse(response)) {
        storeAuthSession(response);

        if (isAuthSessionValid()) {
          setStatus("success");
          await navigate({ to: "/dashboard" });
          return;
        }

        clearAuthSession();
        setStatus("error");
        setError("Session expired immediately. Please sign in again.");
        return;
      }

      setStatus("success");
      setMessage(
        `Account created for ${response.email}. You can now sign in with your credentials.`
      );
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unknown error occurred.");
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "signin" ? "signup" : "signin"));
    setError("");
    setMessage("");
    setStatus("idle");
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <form
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onSubmit={handleSubmit}
        noValidate
        aria-modal="true"
        role="dialog"
      >
        <div className="space-y-2 text-center">
          {/* <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
            {isSignUp ? "Join Trellah" : "Welcome back"}
          </span> */}
          <h1 className="text-2xl font-semibold text-indigo-900">
            {isSignUp ? "Create an account" : "Welcome back"}
          </h1>
          <p className="text-sm text-slate-600">
            {isSignUp
              ? "Sign up with your email address to get started."
              : "Sign in to access your account."}
          </p>
        </div>

        <div className="mt-6 space-y-2">
          <label
            className="block text-sm font-medium text-slate-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            disabled={isLoading}
            className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div className="space-y-2">
          <label
            className="mt-2 block text-sm font-medium text-slate-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={8}
            disabled={isLoading}
            className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        {isSignUp && (
          <div className="space-y-2">
            <label
              className="mt-2 block text-sm font-medium text-slate-700"
              htmlFor="confirmPassword"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              minLength={8}
              disabled={isLoading}
              className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        )}

        {error && (
          <p
            className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
        {message && status === "success" && (
          <p
            className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-600"
            role="status"
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading
            ? "Submitting..."
            : isSignUp
              ? "Create account"
              : "Sign in"}
        </button>

        <div className="mt-4 text-center text-sm text-slate-600">
          {isSignUp ? "Already have an account?" : "Need an account?"}{" "}
          <button
            type="button"
            onClick={toggleMode}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </div>
      </form>
    </div>
  );
}
