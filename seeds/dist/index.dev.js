"use strict";

var seedCategories = require('./category-seeds');

var seedProducts = require('./product-seeds');

var seedTags = require('./tag-seeds');

var seedProductTags = require('./product-tag-seeds');

var sequelize = require('../config/connection');

var seedAll = function seedAll() {
  return regeneratorRuntime.async(function seedAll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(sequelize.sync({
            force: true
          }));

        case 2:
          console.log('\n----- DATABASE SYNCED -----\n');
          _context.next = 5;
          return regeneratorRuntime.awrap(seedCategories());

        case 5:
          console.log('\n----- CATEGORIES SEEDED -----\n');
          _context.next = 8;
          return regeneratorRuntime.awrap(seedProducts());

        case 8:
          console.log('\n----- PRODUCTS SEEDED -----\n');
          _context.next = 11;
          return regeneratorRuntime.awrap(seedTags());

        case 11:
          console.log('\n----- TAGS SEEDED -----\n');
          _context.next = 14;
          return regeneratorRuntime.awrap(seedProductTags());

        case 14:
          console.log('\n----- PRODUCT TAGS SEEDED -----\n');
          process.exit(0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
};

seedAll();
//# sourceMappingURL=index.dev.js.map
