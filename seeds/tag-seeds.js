const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'rock music',
  },
  {
    tag_name: 'punk music',
  },
  {
    tag_name: 'blue',
  },
  {
    tag_name: 'red',
  },
  {
    tag_name: 'green',
  },
  {
    tag_name: 'white',
  },
  {
    tag_name: 'Yellow',
  },
  {
    tag_name: 'punk culture',
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
