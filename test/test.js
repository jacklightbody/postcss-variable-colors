#!/usr/bin/env node
var plugin = require('../');
var expect    = require("chai").expect;

it("Converts basic colors in one css statement", function() {
  var css = plugin.convertFromCss('a  { color: red; border-top: 1px solid red; background-color: blue; }');
  expect(css).to.contain("var(--");
  expect(css).to.contain("--color_1"); // Check that we have at least 2 var decs
  expect(css).to.not.contain("--color_2"); // But not more than that
});
it("Converts the basic colors in multiple css statements", function() {
  var css = plugin.convertFromCss('a  { color: red; border-top: 1px solid red;} body{ background-color: blue; }');
  expect(css).to.contain("var(--");
  expect(css).to.contain("--color_1"); // Check that we have at least 2 var decs
  expect(css).to.not.contain("--color_2"); // But not more than that
});
it("Produces the correct css", function() {
  var css = plugin.convertFromCss('a  { color: red; border-top: 1px solid red;} body{ background-color: blue; }');
  expect(css).to.equal("a  { color: var(--color_0, red); border-top: 1px solid var(--color_0);} body{ background-color: var(--color_1, blue); }");
});
it("Converts more complex colors", function() {
  var css = plugin.convertFromCss('a  { color: rgba(155,155,155,.5); border-top: 1px solid rgba(155,155,155,.5); background-color: rgba(155,155,155, 1); }');
  expect(css).to.contain("var(--");
  expect(css).to.contain("--color_1"); // Check that we have at least 2 var decs
  expect(css).to.not.contain("--color_2"); // But not more than that
});
it("Matches the same color in different formats", function() {
  var css = plugin.convertFromCss('a  { color: black; background-color: #000; }');
  expect(css).to.contain("--color_0"); // Check that we have at least 2 var decs
  expect(css).to.not.contain("--color_1"); // But not more than that
});
it("Matches the same color with different spacing", function() {
  var css = plugin.convertFromCss('a  { color: rgb(255,255,255); background-color: rgb(255, 255, 255); }');
  expect(css).to.contain("--color_0"); // Check that we have at least 2 var decs
  expect(css).to.not.contain("--color_1"); // But not more than that
});
it("Doesn't match the same color in different opacities", function() {
  var css = plugin.convertFromCss('a  { color: rgba(255,255,255,.5); background-color: rgba(255,255,255,.9); }');
  expect(css).to.contain("--color_1"); // Check that we have at least 2 var decs
});
