#!/usr/bin/env node
var plugin = require('../');
var expect    = require("chai").expect;

describe("Color Variable Conversion", function() {
  describe("Check Variable Declaration in One Statement", function() {
    it("converts basic colors in one css statement", function() {
      var css = plugin('a  { color: red; border-top: 1px solid red; background-color: blue; }');
      expect(css).to.contain("var(--");
      expect(css).to.contain("1"); // Check that we have at least 2 var decs
      expect(css).to.not.contain("2"); // But not more than that
    });
  });
  describe("Variables in Different Statements", function() {
    it("converts the basic colors in multiple css statements", function() {
      var css = plugin('a  { color: red; border-top: 1px solid red;} body{ background-color: blue; }');
      expect(css).to.contain("var(--");
      expect(css).to.contain("1"); // Check that we have at least 2 var decs
      expect(css).to.not.contain("2"); // But not more than that
    });
  });
  describe("Produces Css", function() {
    it("produces the correct css", function() {
      var css = plugin('a  { color: red; border-top: 1px solid red;} body{ background-color: blue; }');
      expect(css).to.equal("a  { color: var(--color_0, red); border-top: 1px solid var(--color_0);} body{ background-color: var(--color_1, blue); }");
    });
  });
  describe("More Complex Variable Declaration", function() {
    it("converts more complex colors", function() {
      var css = plugin('a  { color: rgba(155,155,155,.5); border-top: 1px solid rgba(155,155,155,.5); background-color: rgba(155,155,155, 1); }');
      expect(css).to.contain("var(--");
      expect(css).to.contain("1"); // Check that we have at least 2 var decs
      expect(css).to.not.contain("2"); // But not more than that
    });
  });
});