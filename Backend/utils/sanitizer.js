// Sanitization utilities for user input

/**
 * Sanitize plain text by removing HTML tags and special characters
 * @param {string} input - The input string to sanitize
 * @returns {string} - Sanitized string
 */
const sanitize = (input) => {
  if (typeof input !== 'string') return input;
  
  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Remove potentially dangerous characters
  sanitized = sanitized.replace(/[<>]/g, '');
  
  return sanitized.trim();
};

/**
 * Sanitize text while preserving basic formatting
 * Allows certain HTML tags for formatting
 * @param {string} input - The input string to sanitize
 * @returns {string} - Sanitized string with formatting preserved
 */
const sanitizeWithFormatting = (input) => {
  if (typeof input !== 'string') return input;
  
  // Allow specific HTML tags for formatting (b, i, u, p, br, strong, em)
  const allowedTags = ['b', 'i', 'u', 'p', 'br', 'strong', 'em'];
  const tagPattern = new RegExp(`<(?!\\/?(${allowedTags.join('|')})\\b)[^>]*>`, 'gi');
  
  // Remove non-allowed HTML tags
  let sanitized = input.replace(tagPattern, '');
  
  // Remove script content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  return sanitized.trim();
};

module.exports = { sanitize, sanitizeWithFormatting };
