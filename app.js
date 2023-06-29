require("dotenv").config()
const express = require("express")
const app = express()


const PORT = process.env.PORT || 4000

const routes = require("./controllers/routes")

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})