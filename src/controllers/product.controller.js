import { Product }from "../db/index.js"
import ApiResponse from "../utils/ApiResponse.js"

const getAllProducts = async (req, res) => {
   let products
   try {
         if (req.query.page && req.query.records) {
            const { page, records } = req.query
            const limit = records
            const offset = records * (page - 1)

            products = await Product.findAll({
               limit,
               offset, 
               order : [
                  ['product_id']
               ]
            })

         } else {
            products = await Product.findAll({})
            
         }

         return res.status(200).json(new ApiResponse(200, products, "success"))
   } catch (error) {
      console.log(error)
      return res.status(500).json(new ApiResponse(500, {}, "Internal Error Occured"))
   }
}

const getProductwithId = async (req, res) => {
   try {
      const { id } = req.params
      const product = await Product.findOne({
         where: {
            product_id : id
         }
      })

      if (!product) {
         return res.status(400).json(new ApiResponse(400, {}, `Product with id: ${id} doesn't exist`))
      } else {
         return res.status(200).json(new ApiResponse(200, product, "success"))
      }
   } catch (error) {
      console.log(error)
      return res.status(500).json(new ApiResponse(500, {}, "Internal Error Occured"))
   }
}

const createProduct = async (req, res) => {
   const { id, title, description, rating_rate, rating_count, price, img_url } = req.body
   const createdBy =  req.user.name     //"user1"

   try {
      const product = await Product.create({
         product_id: id,
         title, 
         description, 
         rating_rate, 
         rating_count, 
         price,
         image_url: img_url,
         createdBy
      })

      return res.status(201).json(new ApiResponse(201, product, "success"))
   } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
         console.log('Product Id must be unique.');
         return res.status(400).json(new ApiResponse(400, {}, "Product Id must be unique"))
       } else {
         console.error('An error occurred:', error);
         return res.status(500).json(new ApiResponse(500, {}, "Internal Error Occured"))
       }
   }
}

const getLength = async ( _ , res) => {
   try {
      const count = await Product.count()
      return res.status(200).json(new ApiResponse(200, {length : count}, "success"))     // Need to change in frontend code too
   } catch (error) {
      console.log(error)
      return res.status(500).json(new ApiResponse(500, {}, "Internal Error Occured"))
   }
}

const deleteProduct = async (req, res) => {
   const { id } = req.params
   try {
      const isDeleted = await Product.destroy({
         where: {
            product_id : id
         }
      })

      if(!isDeleted){
         return res.status(400).json(new ApiResponse(400, {}, "Product doesn't exist to delete"))
      }

      return res.status(200).json(new ApiResponse(200, {}, "success"))
   } catch (error) {
      console.log(error)
      return res.status(500).json(new ApiResponse(500, {}, "Internal Error Occured"))
   }
}

const updateProduct = async (req, res) => {
   const {title, description, rating_rate, rating_count, price, img_url} = req.body
   const response = await Product.update({title, description, rating_count, rating_rate, price, image_url: img_url}, {
      where: {
         product_id : req.params.id
      }
   })

   if(response){ //need to check -----------------> NOt sure ------------------------------------->
      return res.status(200).json(new ApiResponse(200, {}, "successfully updated"))
   }

   return res.status(500).json(new ApiResponse(500, {}, "Internal Error Occured"))
}

export { getAllProducts, getProductwithId, createProduct, getLength, deleteProduct, updateProduct }