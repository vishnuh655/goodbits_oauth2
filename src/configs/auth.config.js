module.exports = {
  GOOGLE: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    ROOT_URL:
      process.env.GOOGLE_ROOT_URL ||
      "https://accounts.google.com/o/oauth2/v2/auth",
    TOKEN_URL: "https://oauth2.googleapis.com/token",
    SCOPES: {
      USER_PROFILE: "https://www.googleapis.com/auth/userinfo.profile",
      USER_EMAIL: "https://www.googleapis.com/auth/userinfo.email",
    },
    REDIRECT_URI: "api/v1/auth/google",
  },
};
