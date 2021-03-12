const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  data.title = !isEmpty(data.title) ? data.title : "";

  if (!Validator.isLength(data.title, { min: 10, max: 100 })) {
    errors.title = "Title must be between 10 and 100 characters";
  }

  if (!Validator.isLength(data.text, { min: 10, max: 1000 })) {
    errors.text = "Post must be between 10 and 1000 characters";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Post field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
