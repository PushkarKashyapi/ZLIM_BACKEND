require("dotenv").config()

const express = require("express")
const cors = require("cors")

const workspaceRoutes =
  require("./routes/routers")

const connectDB =
  require("./mongo")

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Zlim Backend Running 🚀")
})

app.use("/api", workspaceRoutes)

const PORT =
  process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  )
})
