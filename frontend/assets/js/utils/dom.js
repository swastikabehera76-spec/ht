// frontend/assets/js/utils/dom.js

/**
 * Shorthand for document.getElementById
 * @param {string} id - Element ID
 * @returns {HTMLElement|null} The element or null
 */
export function $(id) {
  return document.getElementById(id);
}

/**
 * Shorthand for querySelector
 * @param {string} selector - CSS selector
 * @param {HTMLElement} parent - Parent element (default: document)
 * @returns {HTMLElement|null}
 */
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Shorthand for querySelectorAll
 * @param {string} selector - CSS selector
 * @param {HTMLElement} parent - Parent element (default: document)
 * @returns {NodeList}
 */
export function qsa(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

/**
 * Show an element
 * @param {HTMLElement|string} element - Element or element ID
 */
export function show(element) {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) el.classList.remove('hidden');
}

/**
 * Hide an element
 * @param {HTMLElement|string} element - Element or element ID
 */
export function hide(element) {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) el.classList.add('hidden');
}

/**
 * Toggle element visibility
 * @param {HTMLElement|string} element - Element or element ID
 */
export function toggle(element) {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) el.classList.toggle('hidden');
}

/**
 * Set text content safely
 * @param {HTMLElement|string} element - Element or element ID
 * @param {string} text - Text content
 */
export function setText(element, text) {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) el.textContent = text ?? '';
}

/**
 * Set HTML content safely (be careful with user input!)
 * @param {HTMLElement|string} element - Element or element ID
 * @param {string} html - HTML content
 */
export function setHTML(element, html) {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) el.innerHTML = html ?? '';
}

/**
 * Add event listener
 * @param {HTMLElement|string} element - Element or element ID
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 */
export function on(element, event, handler) {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) el.addEventListener(event, handler);
}

/**
 * Remove event listener
 * @param {HTMLElement|string} element - Element or element ID
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 */
export function off(element, event, handler) {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) el.removeEventListener(event, handler);
}

/**
 * Create an element with attributes and content
 * @param {string} tag - HTML tag name
 * @param {Object} attrs - Attributes object
 * @param {string|HTMLElement} content - Content (text or element)
 * @returns {HTMLElement}
 */
export function create(tag, attrs = {}, content = '') {
  const el = document.createElement(tag);
  
  // Set attributes
  Object.keys(attrs).forEach(key => {
    if (key === 'class') {
      el.className = attrs[key];
    } else if (key === 'dataset') {
      Object.assign(el.dataset, attrs[key]);
    } else if (key.startsWith('on')) {
      el.addEventListener(key.slice(2).toLowerCase(), attrs[key]);
    } else {
      el.setAttribute(key, attrs[key]);
    }
  });
  
  // Set content
  if (typeof content === 'string') {
    el.textContent = content;
  } else if (content instanceof HTMLElement) {
    el.appendChild(content);
  }
  
  return el;
}