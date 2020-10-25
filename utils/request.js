/**
 * Checks if a network request came back fine, and throws an error if not
 * @param {object} response - A response from a network request
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

/**
 * Parses the JSON returned by a network request
 * @param {object} response - A response from a network request
 * @return {object} The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Parse error message from error object
 * @param {object} [error] - Error object
 * @param {string} [string] - Fallback error message
 * @returns {string} Error message
 */
export async function getErrorMessage(error = {}, fallbackMessage = "Something went wrong") {
  let message = fallbackMessage;
  if (error.response) {
    const response = await error.response.json();
    message = response.message;
  }
  return message;
}

/**
 * Requests a URL, returning a promise
 * @param {string} url - The URL we want to request
 * @param {object} [options] - The options we want to pass to "fetch"
 * @return {object} The response data
 */
export default function Fetch(url, options) {
  return fetch(url, options).then(checkStatus).then(parseJSON);
}
