const mysql = require(`mysql2`);

const connection = mysql.createConnection({
  host: 'localhost', // MySQL sunucu adresi
  user: 'root', // Kullanıcı adı
  password: 'Burhan1453*', // Şifren (boşsa '' bırak)
  database: 'cleanblog-test-db', // Kullanılacak veritabanı
});

connection.connect((err) => {
  if (err) {
    console.log(`mysql bağlantı hatası`);
    return;
  } else {
    console.log(`mysql bağlantı başarılı`);
  }
});

const getPosts = (callback) => {
  connection.query('SELECT * FROM blogs', (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    const Posts = result.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      date: row.date,
    }));
    callback(null, Posts);
  });
};
module.exports = {connection,getPosts};

