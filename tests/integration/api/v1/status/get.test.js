test("GET to /api/v1/status returns status ok", async () => {
  const { status } = await fetch("http://localhost:3000/api/v1/status");

  expect(status).toBe(200);
});
