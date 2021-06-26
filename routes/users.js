const { request, response } = require("express");

const router = require("express").Router();

module.exports = db => {
  router.get("/users", (request, response) => {
    db.query(
      `
      SELECT *
      FROM users
      WHERE delete=false
      `
    ).then(({ rows: users }) => {
      response.json(users);
    }).catch(error => { error });
  });

  router.get("/users/:user_id", (request, response) => {
    db.query(
      `
      SELECT *
      FROM users
      WHERE id = ${request.params.user_id}
      `
    ).then(({ rows: users }) => {
      response.json(users);
    }).catch(error => { error });
  });

  router.post("/users/signup", (request, response) => {
    console.log(request.body)
    const { first_name, last_name, email, password } = request.body

    const values = [first_name, last_name, email, password, ""];
    const queryString = `INSERT INTO users(first_name, last_name, email, password,position)
    VALUES ($1, $2, $3, $4, $5 )`;

    db.query(queryString, values).then(({ rows: users }) => {
      response.json(users);
    }).catch(error => { console.log(error) });
  });


  router.get("/users/login", (request, response) => {
    const { email, password } = request.body

    const values = [email, password];
    const queryString = `SELECT * from users where email = $1 and password = $2)`;

    db.query(queryString, values).then(({ rows: users }) => {
      response.json(users);
    }).catch(error => {
      error
    });
  });

  router.delete("/users/:user_id", (request, response) => {
    const values = [request.params.user_id]
    const queryString = `UPDATE users SET delete=true WHERE id=$1`

    db.query(queryString, values)
      .then((result) => {
        response.json({ msg: 'success' })
      })
      .catch((err) => {
        console.log(err.message)
      });
  })
  return router;
}