import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Mon / Wed / Fri at 10:00 AM UTC
crons.cron(
  "ai blog post monday",
  "0 10 * * 1",
  internal.blogAutomation.generateAndPublishPost,
  {},
);

crons.cron(
  "ai blog post wednesday",
  "0 10 * * 3",
  internal.blogAutomation.generateAndPublishPost,
  {},
);

crons.cron(
  "ai blog post friday",
  "0 10 * * 5",
  internal.blogAutomation.generateAndPublishPost,
  {},
);

export default crons;
