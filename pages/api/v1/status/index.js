import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  // Verificando versão do Postgres
  const databaseVersionResult = await database.query(`SHOW server_version;`);

  // Verificando max conections do postgres
  const databaseMaxConnectionsResult = await database.query(
    `SHOW max_connections;`,
  );

  // Verificando número de conexões ativas
  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: `SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;`,
    values: [databaseName],
  });

  // Existe um padrão para devolver objetos em API REST chamado snake case.
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionResult.rows[0].server_version,
        max_connections: parseInt(
          databaseMaxConnectionsResult.rows[0].max_connections,
        ),
        opened_connections: databaseOpenedConnectionsResult.rows[0].count,
      },
    },
  });
}
export default status;
