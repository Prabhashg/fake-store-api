import * as db from "../db/index.js"
import ApiResponse from "../utils/ApiResponse.js"

let response

const getAllProducts = async (req, res) => {
   try {
         if (req.query.page && req.query.records) {
            const { page, records } = req.query
            const limit = records
            const offset = records * (page - 1)

            response = await db.query("SELECT * FROM products LIMIT $1 OFFSET $2", [limit, offset])
         } else {
            response = await db.query("SELECT * FROM products")
         }

         const result = response.rows
         res.status(200).json(new ApiResponse(200, result, "success"))
   } catch (error) {
      console.log(error)
   }
}

const getProductwithId = async (req, res) => {
   try {
      response = await db.query("SELECT * FROM products WHERE id = $1", [req.params.id])
      const result = response.rows[0]
      res.status(200).json(new ApiResponse(200, result, "success"))
   } catch (error) {
      console.log(error)
   }
}

const createProduct = async (req, res) => {
   const { id, title, description, rating_rate, rating_count, price, img_url } = req.body
   const created_at = new Date(Date.now()).toISOString().replace('T', ' ').replace('Z', '')
   const created_by = req.user.name

   try {
      response = await db.query("INSERT INTO products \
         (id, title, description, rating_rate, rating_count, price, image_url, created_at, created_by)  \
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [id, title, description, rating_rate, rating_count, price, img_url, created_at, created_by])
   
      if(response.rowCount === 1){
         res.status(201).json(new ApiResponse(201, {}, "Product added successfully"))
      }

   } catch (error) {
      console.log(error.detail)
   }
}

const getLength = async ( _ , res) => {
   try {
      response = await db.query("SELECT count(*) FROM products")
      res.status(200).json(new ApiResponse(200, {length: response.rows[0]}, "success"))
   } catch (error) {
      console.log(error)
   }
}

const deleteProduct = async (req, res) => {
   try {
      response = await db.query("DELETE FROM products WHERE id = $1", [req.params.id])
      res.status(200).json(new ApiResponse(200, {}, "successfully deleted"))
   } catch (error) {
      console.log(error)
   }
}

export { getAllProducts, getProductwithId, createProduct, getLength, deleteProduct }











// const response = await db.query("CREATE TABLE products ( \
//    id SERIAL PRIMARY KEY,                             \
//    title VARCHAR (50) UNIQUE NOT NULL,                \
//    description VARCHAR (255) NOT NULL,                \
//    rating_rate SMALLINT NOT NULL,                     \
//    rating_count SMALLINT NOT NULL,                    \
//    price SMALLINT NOT NULL,                           \
//    image_url VARCHAR (512) NOT NULL,                  \
//    created_at TIMESTAMP NOT NULL,                     \
//    created_by VARCHAR (255) NOT NULL)                 \
// ")