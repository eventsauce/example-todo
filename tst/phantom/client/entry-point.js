/**
 *   ___             _   ___                       EventSauce
 *   | __|_ _____ _ _| |_/ __| __ _ _  _ __ ___    CQRS / Event Sourcing Framework for NodeJS
 *   | _|\ V / -_) ' \  _\__ \/ _` | || / _/ -_)   (c) 2016 Steve Gray / eventualconsistency.net
 *   |___|\_/\___|_||_\__|___/\__,_|\_,_\__\___|   This code is GPL v2.0 licenced.
 *
 *   Example Application: Todo List
 **/
'use strict';
/* global describe */
/* global it */

const chai = require('chai');
const should = chai.should();
const Client = require('../../lib/client');

describe('Client', () => {
  describe('Entry-Point', () => {
    it('Should parse succesfully', () => {
      should.exist(Client);
    });
  });
});
