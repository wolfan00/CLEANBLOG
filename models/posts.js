const mysql = require(`mysql2`);
const moment = require("moment");
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
async function createPosts(req){
  
  const { title, description } = req.body; // POST ile gelen JSON verisi
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    let query = "INSERT INTO blogs (title, description, date) VALUES (?, ?, ?)";

    try {
        // db.query'yi Promise tabanlı hale getir
        await new Promise((resolve, reject) => {
            connection.query(query, [title, description, date], (err, result) => {
                if (err) {
                    console.error("Veri eklenirken hata:", err);
                    reject(err); // Hata durumunda reject çağır
                } else {
                    console.log("Veri başarıyla eklendi!");
                    resolve(result); // Başarılıysa resolve çağır
                }
            });
        });
        
}catch(err){
      console.log(err)    
}
}
module.exports = {connection,getPosts,createPosts};

