import { R2Explorer } from "r2-explorer";

const users = {
  "admin": {
    password: "admin123",
    bucket: "phcloud",
    readonly: false
  },
  "user1": {
    password: "user123",
    bucket: "phshare",
    readonly: true
  },
  "user2": {
    password: "user456",
    bucket: "phgrn",
    readonly: false
  }
};

export default {
  async fetch(request, env, ctx) {
    const auth = request.headers.get("Authorization");
    if (!auth) return new Response("Unauthorized", { status: 401 });

    const encoded = auth.split(" ")[1];
    const decoded = atob(encoded);
    const [username, password] = decoded.split(":");

    const user = users[username];
    if (!user || user.password !== password) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Dynamically select bucket
    return R2Explorer({
      bucket: env[user.bucket],
      readonly: user.readonly
    }).fetch(request, env, ctx);
  }
};
