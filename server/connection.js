var connectionString = '';
console.log(connectionString);
if(process.env.DATABASE_URL !== undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/omicron';
    console.log('connected to database');
}

module.exports = connectionString;
