export const configUpgrades = [
  {
      toVersion: 1,
      statements: [
        `CREATE TABLE IF NOT EXISTS configuration (
          id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
          name varchar(20) NOT NULL,
          data varchar(10)
        );`,
        `CREATE INDEX configuration_index_Id ON configuration (id);`,
      ]
  },
]
