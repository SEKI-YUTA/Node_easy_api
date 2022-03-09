const { Client, Pool } = require("pg");
const { client } = require("./db_client");
const userInsert = "insert into users (name,age,email) values ($1,$2,$3);";
// const pg_user = "postgres";
// const pg_host = "127.0.0.1";
// const pg_database = "sample_pj";
// const pg_password = "rootadmin";
// const pg_port = 5432;

async function getAllUser() {
  let users;
  await client
    .query("select * from users;")
    .then((res) => {
      //   console.log(res.rows);
      users = res.rows;
      client.end();
    })
    .finally(() => {
      if (client) {
        client.end();
      }
    });
  return users;
}

async function createUser(info) {
  let result = false;
  if (Array.isArray(info)) {
    await client
      .query(userInsert, info)
      .then((res) => {
        console.log("新規作成しました");
        result = true;
        client.end();
      })
      .catch((err) => {
        console.log("新規作成に失敗しました");
        client.end();
      })
      .finally(() => {
        console.log("finally");
        if (client) {
          client.end();
        }
      });
    console.log("client" + client);
  } else {
    result = false;
  }
  console.log("finish");
  return result;
}

// (async () => {
//   const users = await getAllUser();
//   console.log(users);
// })();
// console.log(getAllUser());
exports.getAllUser = getAllUser;
exports.createUser = createUser;
// client.end();
