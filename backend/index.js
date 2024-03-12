const { Client } = require('pg');
const express = require('express');

const app = express();
const port = 3001;
app.use(express.json());

// PostgreSQL connection configuration
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'TestDB',
  password: 'Samyak@21052001',
  port: 5432,
});
client.connect();

// Define a route to retrieve records from the "Project" table
app.get('/projects', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM "public"."alternative"');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error retrieving projects');
  }
});

app.post('/create/project', async (req, res) => {
  const { project_name } = req.body;
  console.log("project_name is ", project_name);
  try {
    console.log('query is ', `INSERT INTO public.project(project_name) VALUES ('${project_name}');`)
    const result = await client.query(`INSERT INTO public.project(project_name) VALUES ('${project_name}') RETURNING id;`);
    res.json(result.rows[0].id);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error retrieving projects');
  }
})

app.post('/create/optimizer', async (req, res) => {
  const { project_id } = req.body;
  try {
    const id = await client.query(`SELECT id
        FROM public.project WHERE id = ${project_id} LIMIT 1;`);
    console.log("id is ", id.rows[0].id);
    const result = await client.query(`INSERT INTO public.optimizer(
          project_id)
          VALUES (${id.rows[0].id}) RETURNING optimizer_id;`);
    console.log("result is ", result)
    res.json({ result: result.rows[0].optimizer_id, task: "done" });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error retrieving projects');
  }
})

app.post('/create/optimizercontent', async (req, res) => {
  const { user_material, pollution, optimizer_id } = req.body;
  try {
    const result = await client.query(`INSERT INTO public.optimizercontent(
          user_material,pollution,optimizer_id)
          VALUES ('${user_material}',${pollution},${optimizer_id}) RETURNING optimizer_id;`);
    console.log("result is ", result)
    res.json({ result, task: "done" });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error retrieving projects');
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
