/**
 * @fileoverview A simple, static controller class, handling various events and
 * updating DOM / WebGL views.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.controller');

goog.require('cidev.database');
goog.require('cidev.model.ResidentialBuilding');
goog.require('cidev.view');

/**
 * @param {*} e The handled event.
 */
cidev.controller.addBuilding = function(e) {
  var building = new cidev.model.ResidentialBuilding();
  cidev.database.add(building);
  cidev.view.propertyPanel(building);
};

/**
 * @this {!cidev.model.Building} The building being removed.
 * @param {*} e The handled event.
 */
cidev.controller.removeBuilding = function(e) {
  cidev.database.remove(this);
  cidev.view.clearPropertyPanel();
};
