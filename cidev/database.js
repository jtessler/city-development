/**
 * TODO(joseph): Make a more robust database system.
 * @fileoverview A simple, static database class, storing model information in
 * memory.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.database');

goog.require('goog.object');

/**
 * The in-memory database, storing building models by UID.
 * @type {Object.<string, !cidev.model.Building>}
 * @private
 */
cidev.database.db_ = {};

/**
 * Adds a building to the database and assigns it an ID.
 * @param {!cidev.model.Building} building The model to store.
 */
cidev.database.add = function(building) {
  building.id = 'in-memory-' + goog.getUid(building);
  goog.object.add(cidev.database.db_, building.id, building);
};

/**
 * Returns the building stored in the database.
 * @param {string} id The ID of the building in the database.
 * @return {!cidev.model.Building|undefined} The stored model.
 */
cidev.database.get = function(id) {
  return goog.object.get(cidev.database.db_, id);
};

/**
 * Returns all buildings stored in the database.
 * @return {Array.<!cidev.model.Building>} All stored buildings.
 */
cidev.database.getAll = function(id) {
  return goog.object.getValues(cidev.database.db_);
};

/**
 * Updates the stored building in the database.
 * NOTE: This is a no-op for this in-memory database.
 * @param {!cidev.model.Building} building The model to store.
 */
cidev.database.update = function(building) {
  // This is a no-op for an in-memory database.
};

/**
 * Removes the given building from the database.
 * @param {!cidev.model.Building} building The model to remove.
 */
cidev.database.remove = function(building) {
  goog.object.remove(cidev.database.db_, building.id);
};
