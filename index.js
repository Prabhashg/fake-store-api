import "dotenv/config"
import app from "./app.js"
import { sequelize } from "./src/db/index.js"

sequelize.sync()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`server listening on port: ${process.env.PORT}...`)
        })
    })
    .catch(error => {
        console.log("Error occured while connecting to db !!!" , error  )
    })

