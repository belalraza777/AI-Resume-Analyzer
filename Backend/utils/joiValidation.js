const Joi = require("joi");
const { sanitize, sanitizeWithFormatting } = require("./sanitizer");

// Custom Joi extension for HTML sanitization
const joiWithSanitize = Joi.extend({
  type: 'string',
  base: Joi.string(),
  messages: {
    'string.sanitize': '{{#label}} contains invalid characters'
  },
  rules: {
    sanitize: {
      method() {
        return this.$_addRule({ name: 'sanitize' });
      },
      validate(value, helpers) {
        return sanitize(value);
      }
    },
    sanitizeWithFormatting: {
      method() {
        return this.$_addRule({ name: 'sanitizeWithFormatting' });
      },
      validate(value, helpers) {
        return sanitizeWithFormatting(value);
      }
    }
  }
});

// ------------------ User Registration Schema ------------------
const registerSchema = joiWithSanitize.object({
  username: joiWithSanitize.string().lowercase().trim().sanitize().required().messages({
    "string.empty": "Username is required",
  }),
  email: joiWithSanitize.string().email().lowercase().trim().sanitize().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
});

// ------------------ User Login Schema ------------------
const loginSchema = joiWithSanitize.object({
  email: joiWithSanitize.string().email().lowercase().trim().sanitize().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});



// ------------------ Middleware for Validation ------------------
const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { 
    abortEarly: false,
    stripUnknown: true // Remove unknown fields
  });
  
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({ success: false, errors });
  }
  
  // Replace req.body with sanitized and validated data
  req.body = value;
  next();
};

// Export schemas for middleware
const registerValidation = validate(registerSchema);
const loginValidation = validate(loginSchema);

module.exports = { registerValidation, loginValidation, validate };
