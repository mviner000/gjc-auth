/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/unli-book",
  "/auth/new-verification",
  "/authors",
  "/books",
  "/tags",
  "/posts",
  "/practice",
  "/not-allowed",
  "/static/about",
  "/static/faqs",
  "/static/team",
  "/static/contacts",
  "/static/terms",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authenticaion purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after loggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/continue";

/**
 * The default redirect path after registered success
 * @type {string}
 */
export const DEFAULT_REGISTER_REDIRECT = "/login";
