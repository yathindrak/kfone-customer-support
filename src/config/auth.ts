const authConfig = {
  signInRedirectURL: process.env.REACT_APP_ASGARDEO_CALLBACK_URL ?? "",
  signOutRedirectURL: process.env.REACT_APP_ASGARDEO_CALLBACK_URL ?? "",
  clientID: process.env.REACT_APP_ASGARDEO_CLIENT_ID ?? "",
  baseUrl: process.env.REACT_APP_ASGARDEO_BASE_URL ?? "",
  scope: ["openid", "profile"],
  disableTrySignInSilently: false,
  stsConfig: {
    client_id: "CCthS7f4DvpRc1hzQyka8JSBuaAa",
    scope: ["apim:api_manage","apim:subscription_manage","apim:tier_manage","apim:admin","apim:publisher_settings","environments:view_prod","environments:view_dev","apim:api_generate_key"],
    orgHandle: "asgardeodemo",
  },
  stsTokenEndpoint: "https://sts.choreo.dev/oauth2/token",
  resourceServerURLs: "https://42807e1f-07ba-4fb0-a6d2-ecc7b41dd143-prod.e1-us-east-azure.choreoapis.dev",
};

export default authConfig;
