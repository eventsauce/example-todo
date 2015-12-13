/**
 *   ___             _   ___                       EventSauce
 *   | __|_ _____ _ _| |_/ __| __ _ _  _ __ ___    CQRS / Event Sourcing Framework for NodeJS
 *   | _|\ V / -_) ' \  _\__ \/ _` | || / _/ -_)   (c) 2016 Steve Gray / eventualconsistency.net
 *   |___|\_/\___|_||_\__|___/\__,_|\_,_\__\___|   This code is GPL v2.0 licenced.
 *
 *   Example Application: Todo List
 **/
'use strict';
/* global beforeEach */
/* global describe */
/* global it */

const chai = require('chai');
const expect = chai.expect;
const Guid = require('guid');
const should = chai.should();
const TodoList = require('../../../lib/domain/todo-list');
const TodoListItem = require('../../../lib/domain/todo-list/model/todo-list-item');

describe('TodoList', () => {
  describe('Aggregate', () => {
    let instance = null;

    beforeEach(function initialize() {
      instance = new TodoList(Guid.raw());
    });

    describe('Construction', () => {
      it('Can be constructed from blank inputs', () => {
        // Arrange

        // Act

        // Assert
        should.exist(instance);
        expect(instance.pendingEvents).to.have.length(0);
      });
    });

    describe('Adding items', () => {
      it('Should succeed with valid text', () => {
        // Arrange

        // Act
        instance.createNewItem('Buy milk');

        // Assert
        expect(instance.pendingEvents).to.have.length(1);
        expect(instance.pendingEvents[0].eventType).to.equal('addItem');
        expect(instance.pendingEvents[0].eventData.text).to.equal('Buy milk');
      });

      it('Should fail with null text', () => {
        // Arrange
        function itemAdder() {
          instance.createNewItem(null);
        }

        // Act
        expect(itemAdder).to.throw(Error);

        // Assert
        expect(instance.pendingEvents).to.have.length(0);
      });

      it('Should fail with empty text', () => {
        // Arrange
        function itemAdder() {
          instance.createNewItem('');
        }

        // Act
        expect(itemAdder).to.throw(Error);

        // Assert
        expect(instance.pendingEvents).to.have.length(0);
      });
    });

    describe('Completing items', () => {
      it('Should succeed with valid item', () => {
        // Arrange
        instance.createNewItem('Buy milk');
        instance.createNewItem('Wash car');
        instance.createNewItem('Braid llama fur');
        const addWashEvent = instance.pendingEvents[1].eventData;
        instance.commitState();

        // Act
        instance.completeItem(addWashEvent.id);

        // Assert
        expect(instance.pendingEvents).to.have.length(1);
        expect(instance.pendingEvents[0].eventType).to.equal('completeItem');
        expect(instance.pendingEvents[0].eventData).deep.equal({
          _itemId: addWashEvent.id,
        });
      });

      it('Should fail with null item Id', () => {
        // Arrange

        // Act
        expect(function fail() {
          instance.completeItem(null);
        }).to.throw(Error);

        // Assert
        expect(instance.pendingEvents).to.have.length(0);
      });

      it('Should fail with bad item Id', () => {
        // Arrange
        instance.createNewItem('Buy milk');
        instance.createNewItem('Wash car');
        instance.createNewItem('Braid llama fur');
        instance.commitState();
        const nonExist = Guid.raw();

        // Act
        expect(function fail() {
          instance.completeItem(nonExist);
        }).to.throw(Error);

        // Assert
        expect(instance.pendingEvents).to.have.length(0);
      });
    });
  });

  describe('Model', () => {
    describe('TodoListItem', () => {
      describe('Constructor', () => {
        it('Should succed with no parameters', () => {
          // Arrange

          // Act
          const instance = new TodoListItem();

          // Assert
          should.exist(instance);
        });

        it('Should set expected properties', () => {
          // Arrange
          const guid = Guid.raw();
          const exampleText = 'Wash the car';

          // Act
          const instance = new TodoListItem(guid, exampleText);

          // Assert
          expect(instance.id).to.equal(guid);
          expect(instance.text).to.equal(exampleText);
          expect(instance.isComplete).to.equal(false);
        });
      });

      describe('Methods', () => {
        describe('setComplete', () => {
          it('Should set complete flag', () => {
            // Arrange
            const guid = Guid.raw();
            const exampleText = 'Wash the car';
            const instance = new TodoListItem(guid, exampleText);

            // Act
            instance.setComplete();

            // Assert
            expect(instance.isComplete).to.equal(true);
          });
        });
      });
    });
  });
});
