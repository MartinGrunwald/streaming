const pg = require('pg')
const QueryStream = require('pg-query-stream')
const JSONStream = require('JSONStream')

const { Pool, Client } = require('pg')



const main = async () => {
    await runPipeline();
  };
main();

async function runPipeline() {
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'postgres',
        port: 54321,
      })
//await client.connect()
//pipe 1,000,000 rows to stdout without blowing up your memory usage
pool.connect((err, client, done) => {

  if (err) throw err
  const query = new QueryStream('SELECT * FROM generate_series(0, $1) num', [1000000])
  const stream = client.query(query)
  //release the client when the stream is finished
  stream.on('end', done)
  stream.pipe(JSONStream.stringify()).pipe(process.stdout)
});
}