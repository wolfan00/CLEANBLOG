const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Clean Blog'))
app.listen(port, () => console.log(`CleanBlog projesi ${port} dan dinleniyor!`))