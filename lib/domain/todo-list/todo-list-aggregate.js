/**
 *   ___             _   ___                       EventSauce
 *   | __|_ _____ _ _| |_/ __| __ _ _  _ __ ___    CQRS / Event Sourcing Framework for NodeJS
 *   | _|\ V / -_) ' \  _\__ \/ _` | || / _/ -_)   (c) 2016 Steve Gray / eventualconsistency.net
 *   |___|\_/\___|_||_\__|___/\__,_|\_,_\__\___|   This code is GPL v2.0 licenced.
 *
 *   Example Application: Todo List
 **/
'use strict';

const AddItemEvent = require('./events/add-item-event');
const CompleteItemEvent = require('./events/complete-item-event');
const Aggregate = require('eventsauce').Aggregate;
const Guid = require('Guid');
const TodoListState = require('./todo-list-state');

/**
 * The TodoListAggregate represents our Todo list of items. Since
 * each list is likely to be a single user, this is an example of
 * a good aggregate 'root'.
 * @class
 **/
class TodoListAggregate extends Aggregate {

  /**
   * Initialize a new instance of the TodoListAggregate.
   * @param key         {String}    Aggregate key.
   * @param stateObject {Object}    State object (or null, if new instance)
   **/
  constructor(key, stateObject) {
    super(key, stateObject);
  }

  /**
   * Create a new instance of the state object for this aggregate.
   * @returns   {TodoListState}   Empty todo-list state.
   **/
  createStateObject() {
    return new TodoListState();
  }

  /**
   * Create a new item in the todo-list.
   * @param itemText    {String}    Textual value of item.
   **/
  createNewItem(itemText) {
    // Validate inputs before mutating domain
    if (!itemText || !itemText.length) {
      throw new Error('itemText must be a string with a length of at least 1.');
    }

    // Build event
    const itemId = Guid.raw();
    const eventToApply = new AddItemEvent(itemId, itemText);

    // Apply event to model.
    this.applyEvent('addItem', eventToApply);
  }

  /**
   * Complete an item in the todo list.
   * @param itemId      {String}    Item Id to lookup from list.
   **/
  completeItem(itemId) {
    // Validate inputs before mutating domain
    if (!itemId || !itemId.length) {
      throw new Error('itemId must be a string with a length of at least 1.');
    } else if (!this.currentState.canComplete(itemId)) {
      throw new Error('The specified itemId either does not exist, or is not able to be completed.');
    }

    // Build events
    const eventToApply = new CompleteItemEvent(itemId);

    // Apply event to model
    this.applyEvent('completeItem', eventToApply);
  }
}

module.exports = TodoListAggregate;
