const express = require('express');
const moment = require("moment");
const {connection,getPosts} = require(`./models/posts`)
const app = express();
const ejs = require('ejs');
const port = 5000;
//template engine
app.set('view engine', 'ejs');
//middle wares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(`public`));
//routes
app.get('/', (req, res) => {
    getPosts((err,Posts)=>{
        if(err){
            console.log("veri çekilirken hata oluştu.")
            return
        }
        res.render(`index`,{
            Posts
          });
    })

});
app.get('/about', (req, res) => {
  res.render(`about`);
});
app.get('/post', (req, res) => {
  res.render(`post`);
});
app.get('/add_post', (req, res) => {
  res.render(`add_post`);
});
app.post(`/posts`, async (req, res) => {
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

        // Sorgu tamamlandıktan sonra yönlendirme yap
        res.redirect(`/`);
    } catch (err) {
        // Eğer herhangi bir hata meydana gelirse burada yakala
        res.status(500).send("Veri eklenirken hata oluştu!");
    }
});
app.listen(port, () =>
  console.log(`CleanBlog projesi ${port} dan dinleniyor!`)
);
