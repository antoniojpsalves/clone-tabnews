test("GET to /api/v1/status return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  // console.log(responseBody);

  // Convertendo a string de volta para poder conferir a data ( barrar null por exemplo )
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(parsedUpdatedAt).toEqual(responseBody.updated_at);

  // Verificando se a versão é a 16
  expect(responseBody.dependencies.database.version).toEqual("16.0");

  // Verificações de max connections
  expect(typeof responseBody.dependencies.database.max_connections).toBe(
    "number",
  );
  expect(responseBody.dependencies.database.max_connections).toBeGreaterThan(0);
  expect(responseBody.dependencies.database.max_connections).toBe(100);

  // Verificações de active connections
  expect(typeof responseBody.dependencies.database.opened_connections).toBe(
    "number",
  );
  expect(responseBody.dependencies.database.opened_connections).toBe(1);
});
