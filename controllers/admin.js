const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
            // formsCSS: true,
            // productCSS: true,
            // activeAddProduct: true
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    // const product = new Product(null, title, imageUrl, description, price);
    // product.save()
    //     .then(() => {
    //         res.redirect('/');
    //     })
    //     .catch(err => console.log(err));
    Product.create({
        title,
        price,
        imageUrl,
        description
    }).then((result) => {
        console.log("Created Product");
    }).catch(err => { console.log(err) });
};


exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit == 'true' ? true : false;
    const id = req.params.productId; //123

    if (!editMode) {
        return res.redirect('/');
    }
    Product.findByPk(id)
        .then((rows) => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: rows
            });
        })
        .catch((err) => {
            console.log(err);
        })

};

exports.postEditProduct = (req, res, next) => {
    const id = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImgUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    Product.findByPk(id)
        .then((product) => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImgUrl;
            product.description = updatedDescription;
            product.save();
        })
        .then((value) => {
            console.log('Updated Product')
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err))
        // product.save();

}

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => console.log(err))
        // Product.fetchAll(products => {
        //     res.render('admin/products', {
        //         prods: products,
        //         pageTitle: 'Admin Products',
        //         path: '/admin/products'
        //     });
        // });
};

exports.deleteProductbyId = (req, res, next) => {
    const id = req.body.productId;
    Product.deleteProduct(id);
    res.redirect('/admin/products');
}