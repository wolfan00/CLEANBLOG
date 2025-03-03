const express = require('express');
const {connection,getPosts,createPosts} = require(`./models/posts`)
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
   await createPosts(req)
   res.redirect(`/`)
    
});
app.listen(port, () =>
  console.log(`CleanBlog projesi ${port} dan dinleniyor!`)
);
