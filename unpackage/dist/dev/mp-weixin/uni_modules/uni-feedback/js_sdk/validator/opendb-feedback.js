"use strict";
const validator = {
  "content": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "\u7559\u8A00\u5185\u5BB9/\u56DE\u590D\u5185\u5BB9"
  },
  "imgs": {
    "rules": [
      {
        "format": "array"
      },
      {
        "arrayType": "file"
      },
      {
        "maxLength": 6
      }
    ],
    "label": "\u56FE\u7247\u5217\u8868"
  },
  "contact": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "\u8054\u7CFB\u4EBA"
  },
  "mobile": {
    "rules": [
      {
        "format": "string"
      },
      {
        "pattern": "^\\+?[0-9-]{3,20}$"
      }
    ],
    "label": "\u8054\u7CFB\u7535\u8BDD"
  }
};
const enumConverter = {};
exports.enumConverter = enumConverter;
exports.validator = validator;
