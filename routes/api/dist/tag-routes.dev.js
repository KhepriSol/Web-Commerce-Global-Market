"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var router = require('express').Router();

var _require = require('../../models'),
    Category = _require.Category,
    Product = _require.Product,
    Tag = _require.Tag; // GET all products with their categories and tags


router.get('/', function _callee(req, res) {
  var productData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Product.findAll({
            include: [{
              model: Category,
              attributes: ['category_name']
            }, {
              model: Tag,
              attributes: ['tag_name']
            }]
          }));

        case 3:
          productData = _context.sent;
          res.status(200).json(productData);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Failed to retrieve products'
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // GET a single product with its category and tags

router.get('/:id', function _callee2(req, res) {
  var productData;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Product.findByPk(req.params.id, {
            include: [{
              model: Category,
              attributes: ['category_name']
            }, {
              model: Tag,
              attributes: ['tag_name']
            }]
          }));

        case 3:
          productData = _context2.sent;

          if (productData) {
            _context2.next = 7;
            break;
          }

          res.status(404).json({
            message: 'No product found with this id'
          });
          return _context2.abrupt("return");

        case 7:
          res.status(200).json(productData);
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: 'Failed to retrieve the product'
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); // CREATE a new product

router.post('/', function _callee3(req, res) {
  var productData;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Product.create(req.body));

        case 3:
          productData = _context3.sent;
          res.status(200).json(productData);
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Failed to create the product'
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // UPDATE a product by its id

router.put('/:id', function _callee4(req, res) {
  var _ref, _ref2, updatedRows;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Product.update(req.body, {
            where: {
              id: req.params.id
            }
          }));

        case 3:
          _ref = _context4.sent;
          _ref2 = _slicedToArray(_ref, 1);
          updatedRows = _ref2[0];

          if (updatedRows) {
            _context4.next = 9;
            break;
          }

          res.status(404).json({
            message: 'No product found with this id'
          });
          return _context4.abrupt("return");

        case 9:
          res.status(200).json({
            message: 'Product updated successfully'
          });
          _context4.next = 16;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            message: 'Failed to update the product'
          });

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 12]]);
}); // DELETE a product by its id

router["delete"]('/:id', function _callee5(req, res) {
  var deletedRows;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Product.destroy({
            where: {
              id: req.params.id
            }
          }));

        case 3:
          deletedRows = _context5.sent;

          if (deletedRows) {
            _context5.next = 7;
            break;
          }

          res.status(404).json({
            message: 'No product found with this id'
          });
          return _context5.abrupt("return");

        case 7:
          res.status(200).json({
            message: 'Product deleted successfully'
          });
          _context5.next = 14;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).json({
            message: 'Failed to delete the product'
          });

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
module.exports = router;
//# sourceMappingURL=tag-routes.dev.js.map
