const Calculator = require("../src/calculator");
const assert = require("assert");

console.log("Running Calculator Unit Tests in TrueForge Sandbox...");

const calc = new Calculator();
let passed = 0;
let failed = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  ✓ ${desc}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${desc}`);
    console.error(`    Error: ${err.message}`);
    failed++;
  }
}

it("should add two numbers correctly", () => {
  assert.strictEqual(calc.add(2, 3), 5);
});

it("should subtract numbers correctly", () => {
  assert.strictEqual(calc.subtract(10, 4), 6);
});

it("should multiply numbers correctly", () => {
  assert.strictEqual(calc.multiply(3, 4), 12);
});

it("should divide positive numbers correctly", () => {
  assert.strictEqual(calc.divide(10, 2), 5);
});

it("should throw error on division by zero", () => {
  assert.throws(() => calc.divide(10, 0), /Cannot divide by zero/);
});

console.log(`\nTest Summary: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
