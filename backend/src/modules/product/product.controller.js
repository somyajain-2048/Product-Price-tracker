import { addProductService,deleteProductService,getProductsService, toggleFavoriteService } from "./product.service.js";

import { productSchemaValidation } from "./product.validation.js";

// export const addProduct = async(req,res)=>{
//     try {
//         const parsed = productSchemaValidation.parse(req.body);

//         const product = await addProductService(
//             req.user._id,
//             parsed
//         );

//         res.status(201).json(product);
//     } catch (error) {
//          res.status(400).json({
//            error: error.message,
//          });
//     };
// };

export const addProduct = async (req, res) => {
  try {
    // Validate body
    const parsed = productSchemaValidation.parse(req.body);

    // Add product
    const product = await addProductService(req.user._id, parsed.url);

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
export const getProducts = async(req,res)=>{
    try {
        const products = await getProductsService(req.user._id);

        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({
            error:error.message,
        });
    }
};

export const deleteProduct = async(req,res)=>{
    try {
        const product = await deleteProductService(
            req.params.id,
            req.user._id
        );

       res.status(200).json({
         message: "Product deleted",
         product,
       });
  
    } catch (error) {
         res.status(400).json({
           error: error.message,
         });
    }
}

export const toggleFavorite = async (req, res) => {
  try {
    const product = await toggleFavoriteService(req.params.id, req.user._id);
    res.status(200).json({
      message: "Favorite status updated",
      product
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};
