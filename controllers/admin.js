const Product = require('../models/product');
const mongodb = require('mongodb')
    // const ObjectId = mongodb.ObjectId;
exports.getAddProduct = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        userId: req.user
    });
    product.save().then((result) => {
        if (this.id)
            console.log("Created Product");
        res.redirect('/admin/products');
    }).catch(err => { console.log(err) });
};


exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit == 'true' ? true : false;
    const id = req.params.productId; //123

    if (!editMode) {
        return res.redirect('/');
    }

    Product.findById(id)
        .then(product => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product,
                isAuthenticated: req.session.isLoggedIn
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
    // const product = new Product(updatedTitle, updatedPrice, updatedImgUrl, updatedDescription, new ObjectId(id))
    Product.findById(id).then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImgUrl;
            product.description = updatedDescription;
            product.save()
        }).then((value) => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
    Product.find()
        // .populate('userId')
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err))
};

exports.deleteProductbyId = (req, res, next) => {
    const id = req.body.productId;
    Product.findByIdAndRemove(id)
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err))
}