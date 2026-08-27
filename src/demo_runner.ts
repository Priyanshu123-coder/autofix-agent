import { AutoRepairLoop } from "./agent/repair_loop";

async function main() {
  const runner = new AutoRepairLoop();
  // Simulate autonomous resolution of CI workflow run #4829
  await runner.run("4829");
}

main().catch((err) => {
  console.error("Agent execution error:", err);
  process.exit(1);
});
