import { addProductService, deleteProductService, getProductsService, getProductByIdService, refreshProductPriceService, toggleFavoriteService, searchProductsService } from "./product.service.js";

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

export const getProductById = async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.id, req.user._id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const refreshProductPrice = async (req, res) => {
  try {
    const product = await refreshProductPriceService(req.params.id, req.user._id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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

import { searchProduct } from "../../services/scraper.service.js";

export const compareProduct = async (req, res) => {
  try {
    const { query, targetSite } = req.body;
    if (!query || !targetSite) {
      return res.status(400).json({ error: "Missing query or targetSite" });
    }

    const competitorProduct = await searchProduct(query, targetSite);
    
    if (!competitorProduct) {
      return res.status(404).json({ error: `Could not find product on ${targetSite}` });
    }

    res.status(200).json(competitorProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { search, site, sortBy, page = 1, limit = 9 } = req.query;
    
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    
    const result = await searchProductsService(
      req.user._id,
      search,
      site,
      sortBy,
      parsedPage,
      parsedLimit
    );
    
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
