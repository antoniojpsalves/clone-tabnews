import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  // Verificando max conections do postgres
  const maxConnectionsResult = await database.query(`SHOW max_connections;`);

  // Verificando número de conexões ativas
  const activeConnectionsResult = await database.query(
    `SELECT COUNT(*) FROM pg_stat_activity;`,
  );

  // Existe um padrão para devolver objetos em API REST chamado snake case.
  response.status(200).json({
    updated_at: updatedAt,
    max_connections: Number(maxConnectionsResult.rows[0].max_connections),
    active_connections: Number(activeConnectionsResult.rows[0].count),
  });
}
export default status;
