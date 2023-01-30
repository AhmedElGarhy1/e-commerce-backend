module.exports = {
  productsAPI: {
    getAllProducts: {
      method: "GET",
      url: "/api/products",
    },
    getOneProduct: {
      method: "GET",
      url: "/api/products/{ProductID}",
    },
    createProduct: {
      method: "POST",
      url: "/api/products/create",
      body: {
        name: {
          type: "String",
        },
        price: {
          type: "Number",
        },
        quantity: {
          type: "Number",
        },
        highlights: [
          {
            type: "String",
          },
        ],
        specifications: [[{ type: "String" }]],
        category_id: {
          type: "userID",
        },
        seller_id: {
          type: "userID",
        },
        img: {
          type: "String 64bit",
        },
      },
    },
  },
  userAPI: {
    signupUser: {
      method: "POST",
      url: "/api/user/signup",
      body: {
        fname: {
          type: "String",
        },
        lname: {
          type: "String",
        },
        password: {
          type: "String",
        },
        email: {
          type: "String",
        },
        phone: {
          type: "String",
        },
      },
    },
    loginUser: {
      method: "POST",
      url: "/api/user/login",
      body: {
        password: {
          type: "String",
        },
        email: {
          type: "String",
        },
      },
    },
  },
  cartAPI: {
    addToChart: {
      method: "POST",
      url: "/api/cart/add",
      body: {
        product_id: {
          type: "productID",
        },
        quantity: {
          type: "Number",
        },
      },
    },
    updateProduct: {
      method: "PATCH",
      url: "/api/cart/update",
      body: {
        quantity: {
          type: "Number",
        },
      },
    },
    deleteProduct: {
      method: "DELETE",
      url: "/api/cart/delete/{ProductID}",
    },
    getAllCartProducts: {
      method: "GET",
      url: "/api/cart/",
    },
  },
};
