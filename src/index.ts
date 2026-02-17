import { R2Explorer } from "r2-explorer";

const fullAccess = R2Explorer({
  readonly: false,          // allow upload / delete
  basicAuth: [{
    username: "phadmin",
    password: "phadmin"
  }]
});

const limitedAdmin = R2Explorer({
  readonly: true,           // view only
  bucket: "phcloud", // restrict to single bucket
  basicAuth: [{
    username: "admin",
    password: "123"
  }]
});

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Admin-only bucket view
    if (url.pathname.startsWith("/admin")) {
      return limitedAdmin.fetch(request, env, ctx);
    }

    // Full control explorer
    return fullAccess.fetch(request, env, ctx);
  }
};
