const serverConfig = require("../configs/server.config");
const { GOOGLE } = require("../configs/auth.config");
const querystring = require("querystring");
const axios = require("axios");

const redirectUri = (redirectEndpoint) =>
  `${serverConfig.SERVER_ROOT_URI}:${serverConfig.port}/${redirectEndpoint}`;

module.exports = {
  googleOAuth: {
    /**
     * Get google auth url
     * @returns string
     */
    getURL: () => {
      const rootUrl = GOOGLE.ROOT_URL;
      const options = {
        redirect_uri: redirectUri(GOOGLE.REDIRECT_URI),
        client_id: GOOGLE.CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [GOOGLE.SCOPES.USER_PROFILE, GOOGLE.SCOPES.USER_EMAIL].join(" "),
      };

      return `${rootUrl}?${querystring.stringify(options)}`;
    },

    /**
     * Get access tokens using authorization code
     * @param {string} code
     * @returns
     */
    getTokens: (code) => {
      const url = GOOGLE.TOKEN_URL;
      const values = {
        code,
        client_id: GOOGLE.CLIENT_ID,
        client_secret: GOOGLE.CLIENT_SECRET,
        redirect_uri: redirectUri(GOOGLE.REDIRECT_URI),
        grant_type: "authorization_code",
      };

      return axios
        .post(url, querystring.stringify(values), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          console.error(`Failed to fetch auth tokens`);
          throw new Error(error);
        });
    },

    /**
     * Get user details using access token
     * @param {string} idToken
     * @param {string} accessToken
     * @returns
     */
    getUser: async (idToken, accessToken) => {
      return await axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        )
        .then((res) => res.data)
        .catch((error) => {
          console.error(`Failed to fetch user`);
          throw new Error(error.message);
        });
    },
  },
};
