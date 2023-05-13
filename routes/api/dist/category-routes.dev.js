"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../../models'),
    Category = _require.Category,
    Product = _require.Product; // GET all categories, including associated products


router.get('/', function _callee(req, res) {
  var dbCatData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Category.findAll({
            include: [{
              model: Product,
              attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
            }]
          }));

        case 3:
          dbCatData = _context.sent;

          if (dbCatData) {
            _context.next = 7;
            break;
          }

          res.status(404).json({
            message: 'No categories found'
          });
          return _context.abrupt("return");

        case 7:
          res.json(dbCatData);
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Server Error'
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); // GET a category by id, including associated products

router.get('/:id', function _callee2(req, res) {
  var dbCatData;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Category.findOne({
            where: {
              id: req.params.id
            },
            include: [{
              model: Product,
              attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
            }]
          }));

        case 3:
          dbCatData = _context2.sent;

          if (dbCatData) {
            _context2.next = 7;
            break;
          }

          res.status(404).json({
            message: 'No categories found'
          });
          return _context2.abrupt("return");

        case 7:
          res.json(dbCatData);
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: 'Server Error'
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); // POST a new category

router.post('/', function _callee3(req, res) {
  var dbCatData;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Category.create({
            category_name: req.body.category_name
          }));

        case 3:
          dbCatData = _context3.sent;
          res.json(dbCatData);
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Server Error'
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // PUT update a category by id

router.put('/:id', function _callee4(req, res) {
  var dbCatData;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Category.update(req.body, {
            where: {
              id: req.params.id
            }
          }));

        case 3:
          dbCatData = _context4.sent;

          if (dbCatData[0]) {
            _context4.next = 7;
            break;
          }

          res.status(404).json({
            message: 'No category found with this id'
          });
          return _context4.abrupt("return");

        case 7:
          res.json({
            message: 'Category updated'
          });
          _context4.next = 14;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            message: 'Server Error'
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); // DELETE a category by id

router["delete"]('/:id', function _callee5(req, res) {
  var dbCatData;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Category.destroy({
            where: {
              id: req.params.id
            }
          }));

        case 3:
          dbCatData = _context5.sent;

          if (dbCatData) {
            _context5.next = 7;
            break;
          }

          res.status(404).json({
            message: 'No category found with that id'
          });
          return _context5.abrupt("return");

        case 7:
          res.json({
            message: 'Category deleted'
          });
          _context5.next = 14;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).json({
            message: 'Server Error'
          });

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
module.exports = router;
//# sourceMappingURL=category-routes.dev.js.map
