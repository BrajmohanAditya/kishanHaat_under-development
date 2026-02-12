const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "database_development",
  process.env.DB_USER || "root",
  process.env.DB_PASS || null,
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "mysql",
    timezone: "+05:30",
    logging: false, // 👈 disables console SQL logs

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
);
try {
  sequelize.authenticate();
  console.log("==connected db successfully==");
} catch (err) {
  console.log(err);
}
