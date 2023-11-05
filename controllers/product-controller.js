import redisClient from "../config/redis";
import Product from "../models/Product";
import User from "../models/User";

export const addNewProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const product = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).josn(err);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json("err");
  }
};

// export const getProduct = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id)
//         res.status(200).json(product)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

// export const getAllProducts = async (req, res) => {
//   const countQuery = req.query.count;
//   const categoryQuery = req.query.category;

//   try {
//     let products;
//     if (countQuery) {
//       products = await Product.find().sort({ createdAt: -1 }).limit(1);
//     } else if (categoryQuery) {
//       products = await Product.find({
//         categories: {
//           $in: [categoryQuery],
//         },
//       });
//     } else {
//       products = await Product.find();
//     }
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

/////////////######## Cached Controllers #########///////////

export const getProduct = async (req, res) => {
  try {
    const cachedProduct = await redisClient.get(`product:${req.params.id}`); // Check if the product data is cached in Redis

    if (cachedProduct) {
      // If cached data exists, return it
      const parsedProduct = JSON.parse(cachedProduct);
      res.status(200).json(parsedProduct);
    } else {
      const product = await Product.findById(req.params.id); // If data is not in Redis cache, fetch it from MongoDB

      if (!product) {
        // Handle the case when the product is not found in MongoDB
        return res.status(404).json({ error: "Product not found" });
      }

      // Cache the product data in Redis for future requests
      await redisClient.set(
        `product:${req.params.id}`,
        JSON.stringify(product),
        "EX",
        3600
      );
      res.status(200).json(product);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

export const getAllProducts = async (req, res) => {
  const countQuery = req.query.count;
  const categoryQuery = req.query.category;

  try {
    // Create a unique key for this query based on the request URL and query parameters
    const cacheKey = `products:${req.originalUrl}`;

    // Check if the product data is cached in Redis
    const cachedProducts = await redisClient.get(cacheKey);

    if (cachedProducts) {
      // If cached data exists, return it
      const parsedProducts = JSON.parse(cachedProducts);
      res.status(200).json(parsedProducts);
    } else {
      let products;

      if (countQuery) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
      } else if (categoryQuery) {
        products = await Product.find({
          categories: {
            $in: [categoryQuery],
          },
        });
      } else {
        products = await Product.find();
      }

      // Cache the product data in Redis for future requests with a TTL (time-to-live)
      await redisClient.set(cacheKey, JSON.stringify(products), "EX", 3600); // Cache for 1 hour (3600 seconds)

      res.status(200).json(products);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

///########//wishlist controllers/////########///

export const addWishlist = async (req, res) => {
  const userId = req.params.userId;
  const item = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the item is already in the wishlist
    if (user.wishlist.includes(item)) {
      return res
        .status(400)
        .json({ message: "Item is already in the wishlist" });
    }

    user.wishlist.push(item);
    await user.save();
    return res
      .status(200)
      .json({ message: "Item added to wishlist successfully", item });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err });
  }
};

export const removeWishlist = async (req, res) => {
  const userId = req.params.userId;
  const item = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if the item is in the wishlist
    const itemIndex = user.wishlist.indexOf(item);
    // console.log(itemIndex);

    // Remove the item from the wishlist using splice
    user.wishlist.splice(itemIndex, 1);
    await user.save();
    return res
      .status(200)
      .json({ message: "Item removed from wishlist successfully", item });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err });
  }
};

export const getAllWishlist = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);

    const wishlist = user.wishlist;
    return res.status(200).json(wishlist);
  } catch (err) {
    return res.status(500).json(err);
  }
};
