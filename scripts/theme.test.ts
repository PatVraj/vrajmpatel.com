import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

const layout = readFileSync(new URL("../src/layouts/BaseLayout.astro", import.meta.url), "utf8");
const toggle = readFileSync(new URL("../src/components/ThemeToggle.astro", import.meta.url), "utf8");
const initialScript = layout.match(/<script is:inline>([\s\S]*?)<\/script>/i)![1];
const toggleScript = ts.transpileModule(toggle.match(/<script>([\s\S]*?)<\/script>/i)![1], {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;

for (const stored of [null, "dark", "light", "invalid", "blocked"]) {
  test(`theme initializes and toggles with storage ${stored}`, () => {
    let dark = false;
    let click: () => void;
    const attributes = new Map();
    const label = { textContent: "Dark" };
    const button = {
      dataset: {},
      setAttribute: (key: string, value: string) => attributes.set(key, value),
      querySelector: () => label,
      addEventListener: (_: string, listener: () => void) => { click = listener; },
    };
    const root = {
      classList: {
        contains: () => dark,
        toggle: (_: string, force?: boolean) => (dark = force ?? !dark),
      },
      style: { colorScheme: "" },
    };
    const context = vm.createContext({
      document: { documentElement: root, querySelectorAll: () => [button], addEventListener() {} },
      window: { matchMedia: () => ({ matches: true }) },
      localStorage: {
        getItem() { if (stored === "blocked") throw new Error("Storage blocked"); return stored; },
        setItem() { throw new Error("Storage blocked"); },
      },
    });
    vm.runInContext(initialScript, context);
    const expected = stored !== "light";
    assert.equal(dark, expected);
    vm.runInContext(toggleScript, context);
    click!();
    assert.equal(dark, !expected);
    assert.equal(root.style.colorScheme, dark ? "dark" : "light");
    assert.equal(label.textContent, dark ? "Light" : "Dark");
    assert.equal(attributes.get("aria-pressed"), String(dark));
    assert.equal(attributes.get("aria-label"), dark ? "Switch to light mode" : "Switch to dark mode");
  });
}
