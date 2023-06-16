export const configUpgrades = [
  {
      toVersion: 1,
      statements: [
        `CREATE TABLE IF NOT EXISTS configuration (
          configid integer PRIMARY KEY AUTOINCREMENT NOT NULL,
          name varchar(20) NOT NULL,
          value varchar(20),
        );`,
        `CREATE INDEX config_index_configid ON configuration (configid);`
      ]
  },
]

