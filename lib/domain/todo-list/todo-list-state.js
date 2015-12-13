/**
 *   ___             _   ___                       EventSauce
 *   | __|_ _____ _ _| |_/ __| __ _ _  _ __ ___    CQRS / Event Sourcing Framework for NodeJS
 *   | _|\ V / -_) ' \  _\__ \/ _` | || / _/ -_)   (c) 2016 Steve Gray / eventualconsistency.net
 *   |___|\_/\___|_||_\__|___/\__,_|\_,_\__\___|   This code is GPL v2.0 licenced.
 *
 *   Example Application: Todo List
 **/
'use strict';

const TodoListItem = require('./model/todo-list-item');

/**
 * State object / model root for TodoListAggregate
 * @class
 **/
class TodoListState {

  /**
   * Initialize a new instance of the TodoListState
   **/
  constructor() {
    this._items = [];
  }

  /**
   * Search for an item in the todo-list by id.
   * @param itemId    {String}          Item id to find.
   * @returns         {TodoListItem}    Item, or null if no such id.
   **/
  getItemById(itemId) {
    const searchResults = this._items.filter(item => {
      return item.id === itemId;
    });

    if (searchResults.length === 0) {
      return null;
    }

    return searchResults[0];
  }

  /**
   * Is the item in a state to be completed?
   * @param itemId    {String}      Item Id to check
   * @returns         {Boolean}     True if item can be completed, false otherwise (or if no such item)
   **/
  canComplete(itemId) {
    const item = this.getItemById(itemId);
    if (!item || item.isComplete) {
      return false;
    }

    return true;
  }

  /**
   * Add an item to the todo-list.
   * @param addItemEvent    {AddItemEvent}          Event for adding an item.
   **/
  onAddItem(addItemEvent) {
    const newItem = new TodoListItem(addItemEvent.id, addItemEvent.itemText);
    this._items.push(newItem);
  }

  /**
   * Complete an item in our todo-list.
   * @param completeItemEvent {CompleteItemEvent}   Event for completing an item.
   **/
  onCompleteItem(completeItemEvent) {
    const itemToComplete = this.getItemById(completeItemEvent.id);
    itemToComplete.setComplete();
  }
}

module.exports = TodoListState;
