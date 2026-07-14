import assert from "node:assert/strict";
import test from "node:test";

const routes = [
  ["/", "Practical economics", "Everything we do is completely free"],
  ["/our-work", "Projects coming soon", "first businesses and organizations"],
  ["/about", "Economics should be useful beyond the classroom", "student-led beginning"],
  ["/contact", "Tell us about your business", "This form is a demo"],
];

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

for (const [path, heading, detail] of routes) {
  test(`server-renders ${path}`, async () => {
    const response = await render(path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, new RegExp(heading, "i"));
    assert.match(html, new RegExp(detail, "i"));
    assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
  });
}
