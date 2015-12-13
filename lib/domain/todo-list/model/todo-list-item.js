/**
 *   ___             _   ___                       EventSauce
 *   | __|_ _____ _ _| |_/ __| __ _ _  _ __ ___    CQRS / Event Sourcing Framework for NodeJS
 *   | _|\ V / -_) ' \  _\__ \/ _` | || / _/ -_)   (c) 2016 Steve Gray / eventualconsistency.net
 *   |___|\_/\___|_||_\__|___/\__,_|\_,_\__\___|   This code is GPL v2.0 licenced.
 *
 *   Example Application: Todo List
 **/
'use strict';

/**
 * TodoListItem represents an item on our todo list. This is a model class,
 * referenced only by TodoListState.
 **/
class TodoListItem {

  /**
   * Initialize a new instance of the TodoListItem
   * @param itemId      {Guid}        Unique identifier of item in the todo-list
   * @param itemText    {String}      Description of todo-list item
   **/
  constructor(itemId, itemText) {
    this._id = itemId;
    this._itemText = itemText;
    this._complete = false;
  }

  /**
   * Set the item as being complete.
   **/
  setComplete() {
    this._complete = true;
  }

  /**
   * Todo list item Id
   **/
  get id() {
    return this._id;
  }

  /**
   * Item text value.
   * @returns {String}  Todo list item text
   **/
  get text() {
    return this._itemText;
  }

  /**
   * Is the item complete?
   * @returns {Boolean} Is the item complete? True if yes, false otherwise.
   **/
  get isComplete() {
    return this._complete;
  }

}

module.exports = TodoListItem;
