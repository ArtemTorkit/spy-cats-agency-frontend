// src/services/missions.js
import api from "./index";

/**
 * Fetch all missions
 */
export const getMissions = () => api.get("missions/");

/**
 * Create a new mission
 * @param {Object} missionData
 */
export const createMission = (missionData) =>
  api.post("missions/", missionData);

/**
 * Delete a mission by ID
 * @param {number} missionId
 */
export const deleteMission = (missionId) =>
  api.delete(`missions/${missionId}/`);

/**
 * Assign a cat to a mission
 * @param {number} missionId
 * @param {number} catId
 */
export const assignCat = (missionId, catId) =>
  api.post(`missions/${missionId}/assign/`, { cat_id: catId });

/**
 * Complete a target in a mission
 * @param {number} missionId
 * @param {number} targetId
 */
export const completeTarget = (missionId, targetId) =>
  api.post(`missions/${missionId}/targets/${targetId}/complete/`);

/**
 * Update notes for a target
 * @param {number} missionId
 * @param {number} targetId
 * @param {string} notes
 */
export const updateTargetNotes = (missionId, targetId, notes) =>
  api.patch(`missions/${missionId}/targets/${targetId}/notes/`, { notes });
