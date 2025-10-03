test("GET to /api/v1/status return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);

  // Verificando se a data foi recebida
  expect(responseBody.updated_at).toBeDefined();

  // Convertendo a string de volta para poder conferir a data ( barrar null por exemplo )
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(parsedUpdatedAt).toEqual(responseBody.updated_at);

  expect(responseBody.max_connections).toBeDefined();
  expect(typeof responseBody.max_connections).toBe("number");
  expect(responseBody.max_connections).toBeGreaterThan(0);

  expect(responseBody.active_connections).toBeDefined();
  expect(typeof responseBody.active_connections).toBe("number");
  expect(responseBody.active_connections).toBeGreaterThan(0);
});
