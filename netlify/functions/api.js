/**
 * Netlify serverless function – wraps the Express app so all /api/* routes
 * work when deployed to Netlify. Set env vars in Netlify: Site settings → Environment variables.
 */
const serverless = require("serverless-http");
const app = require("../../server");

const handler = serverless(app);

exports.handler = async (event, context) => {
  // Netlify rewrite sends path as /.netlify/functions/api/... – make Express see /api/...
  if (event.path && event.path.startsWith("/.netlify/functions/api")) {
    event.path = "/api" + (event.path.slice("/.netlify/functions/api".length) || "") || "/api";
  }
  return handler(event, context);
};
