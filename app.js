const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) =>{
    const blog = { id: 1, title: "Blog title", description: "Blog description" }
    res.send(blog)
}) 
app.listen(port, () => console.log(`CleanBlog projesi ${port} dan dinleniyor!`))