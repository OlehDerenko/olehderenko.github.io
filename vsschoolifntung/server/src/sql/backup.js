const { exec } = require("child_process");
const path = require("path");

const dbConfig = require("./config");

const BACKUP_PATH = path.resolve(__dirname, "backup.sql");
const PG_DUMP_PATH = path.resolve("C:/Program Files/PostgreSQL/16/bin/pg_dump");

const run = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const backup = async () => {
  const cmd = `"${PG_DUMP_PATH}" --file="${BACKUP_PATH}" --host="${dbConfig.host}" --port="${dbConfig.port}" --username="${dbConfig.username}" --password="${dbConfig.password}" -d "${dbConfig.database}"`;

  try {
    await run(cmd);
    console.log("Database backup successfully created.");
  } catch (e) {
    console.error("Error during backup:", e);
  }
};

backup();
