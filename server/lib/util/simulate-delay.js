"use strict";

// This module exports a utility function for simulating
// delay (for example, in network or file system operations)
// using the builtin setTimeout.

function someMilliseconds() {
  return Math.floor(Math.random() * 400) + 100;
}

module.exports = function simulateDelay(callback) {
  setTimeout(callback, someMilliseconds());
}

