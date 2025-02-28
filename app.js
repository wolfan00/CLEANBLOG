const express = require('express')
const app = express()
const ejs = require('ejs')
const port = 5000
//template engine
app.set("view engine","ejs")
//middle wares
app.use(express.static(`public`))
//routes
app.get('/', (req, res) =>{
    res.render(`index`)
}) 
app.get('/about', (req, res) =>{
    res.render(`about`)
}) 
app.get('/post', (req, res) =>{
    res.render(`post`)
}) 
app.get('/add_post', (req, res) =>{
    res.render(`add_post`)
}) 

app.listen(port, () => console.log(`CleanBlog projesi ${port} dan dinleniyor!`))