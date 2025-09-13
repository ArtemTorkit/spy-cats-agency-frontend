import api from "./index";

/**
 * Fetch all cats
 */
export const getCats = () => api.get("cats/");

/**
 * Create a new cat
 * @param {Object} catData
 */
export const createCat = (catData) => api.post("cats/", catData);

/**
 * Update a cat
 * @param {number} catId
 * @param {Object} catData
 */
export const updateCat = (catId, catData) =>
  api.patch(`cats/${catId}/`, catData);

/**
 * Delete a cat
 * @param {number} catId
 */
export const deleteCat = (catId) => api.delete(`cats/${catId}/`);
