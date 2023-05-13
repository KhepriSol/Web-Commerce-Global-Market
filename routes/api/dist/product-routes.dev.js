"use strict";

var router = require('express').Router();

var _require = require('../../models'),
    Product = _require.Product,
    Category = _require.Category,
    Tag = _require.Tag,
    ProductTag = _require.ProductTag; // The `/api/products` endpoint
// get all products


router.get('/', function _callee(req, res) {
  var dbProductData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Product.findAll({
            attributes: ['id', 'product_name', 'price', 'stock'],
            include: [{
              model: Category,
              attributes: ['category_name']
            }, {
              model: Tag,
              attributes: ['tag_name']
            }]
          }));

        case 3:
          dbProductData = _context.sent;
          res.json(dbProductData);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // get one product

router.get('/:id', function _callee2(req, res) {
  var dbProductData;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Product.findOne({
            where: {
              id: req.params.id
            },
            attributes: ['id', 'product_name', 'price', 'stock'],
            include: [{
              model: Category,
              attributes: ['category_name']
            }, {
              model: Tag,
              attributes: ['tag_name']
            }]
          }));

        case 3:
          dbProductData = _context2.sent;

          if (dbProductData) {
            _context2.next = 7;
            break;
          }

          res.status(404).json({
            message: 'No product found with this id'
          });
          return _context2.abrupt("return");

        case 7:
          res.json(dbProductData);
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).json(_context2.t0);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); // create new product

router.post('/', function (req, res) {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body).then(function (product) {
    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds.length) {
      var productTagIdArr = req.body.tagIds.map(function (tag_id) {
        return {
          product_id: product.id,
          tag_id: tag_id
        };
      });
      return ProductTag.bulkCreate(productTagIdArr);
    } // if no product tags, just respond


    res.status(200).json(product);
  }).then(function (productTagIds) {
    return res.status(200).json(productTagIds);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).json(err);
  });
}); // update product

router.put('/:id', function (req, res) {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(function (product) {
    // find all associated tags from ProductTag
    return ProductTag.findAll({
      where: {
        product_id: req.params.id
      }
    });
  }).then(function (productTags) {
    // get list of current tag_ids
    var productTagIds = productTags.map(function (_ref) {
      var tag_id = _ref.tag_id;
      return tag_id;
    }); // create filtered list of new tag_ids

    var newProductTags = req.body.tagIds.filter(function (tag_id) {
      return !productTagIds.includes(tag_id);
    }).map(function (tag_id) {
      return {
        product_id: req.params.id,
        tag_id: tag_id
      };
    }); // figure out which ones to remove

    var productTagsToRemove = productTags.filter(function (_ref2) {
      var tag_id = _ref2.tag_id;
      return !req.body.tagIds.includes(tag_id);
    }).map(function (_ref3) {
      var id = _ref3.id;
      return id;
    }); // run both actions

    return Promise.all([ProductTag.destroy({
      where: {
        id: productTagsToRemove
      }
    }), ProductTag.bulkCreate(newProductTags)]);
  }).then(function (updatedProductTags) {
    return res.json(updatedProductTags);
  })["catch"](function (err) {
    // console.log(err);
    res.status(400).json(err);
  });
});
router["delete"]('/:id', function (req, res) {// delete one product by its `id` value
});
module.exports = router;
//# sourceMappingURL=product-routes.dev.js.map
