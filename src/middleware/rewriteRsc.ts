import type { Middleware } from "../config";

// This convension is just one idea.

const rewriteRsc: Middleware = async (_config, req, _res, next) => {
  const url = new URL(req.url || "", "http://" + req.headers.host);
  if (url.pathname.startsWith("/RSC/")) {
    url.pathname = url.pathname.replace(/^\/RSC\//, "/src/") + ".tsx";
    req.url = url.toString();
    req.headers["x-react-server-component-name"] = "default";
  }
  await next();
};

export default rewriteRsc;