const { googleOAuth } = require("../../helpers/oauth.helper");

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Auth operations
 */

/**
 * @swagger
 * definitions:
 *  Auth:
 *   type: object
 *   required: [id_token, access_token]
 *   properties:
 *    id_token:
 *      type: string
 *      example: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYzMWZhZTliNTk0MGEyZDFmYmZmYjAwNDAzZDRjZjgwYTIxYmUwNGUiLCJ0eXAiOiJKV1QifQ"
 *    access_token:
 *      type: number
 *      example: "ya29.A0AVA9y1sFbzIUTouE3JviUcHEVmqbt1zN8ilDMfLi-KO7e7B8BkRA4knR7CFn5w4FX2VBLyZodRI3FJWGlsZmYANSdZWuu1"
 */
module.exports = {
  /**
   * @swagger
   * /v1/auth/google/url:
   *  get:
   *   tags:
   *      - Auth
   *   summary: Get google auth URL
   *   description: Get URL for authorization request
   *   responses:
   *     200:
   *       description: A successful response
   */
  googleAuthUrl: async (req, res) => {
    try {
      res.send(googleOAuth.getURL());
    } catch (err) {
      console.log(err);
      res.failServerError(err);
    }
  },

  /**
   * @swagger
   * /v1/auth/google:
   *  get:
   *   tags:
   *      - Auth
   *   summary: Get authourization token
   *   description: Get authourization token from google
   *   parameters:
   *     - in: query
   *       name: code
   *       schema:
   *         type: string
   *         description: Authorization code
   *   responses:
   *     200:
   *       description: A successful response
   */
  googleAuth: async (req, res) => {
    try {
      const { id_token, access_token } = await googleOAuth.getTokens(
        req.query.code
      );

      res.send({ id_token, access_token });
    } catch (err) {
      console.log(err);
      res.failServerError(err);
    }
  },

  /**
   * @swagger
   * /v1/auth/google/me:
   *  post:
   *   tags:
   *      - Auth
   *   summary: Get google user details
   *   description: Get google user details
   *   requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/definitions/Auth'
   *   responses:
   *     200:
   *       description: A successful response
   */
  googleUser: async (req, res) => {
    try {
      const user = await googleOAuth.getUser(
        req.body.id_token,
        req.body.access_token
      );
      res.send(user);
    } catch (err) {
      console.log(err);
      res.failServerError(err);
    }
  },
};
