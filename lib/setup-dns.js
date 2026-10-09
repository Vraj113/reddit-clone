import dns from "node:dns";

if (process.env.MONGODB_USE_PUBLIC_DNS !== "false") {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
}
