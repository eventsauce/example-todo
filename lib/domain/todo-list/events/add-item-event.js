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
 * The AddItemEvent represents adding an item to the tail of the Todo-List.
 * @class
 **/
class AddItemEvent {

  /**
   * Initialize a new AddItemEvent
   * @param itemText    {String}      Text of item to add to list.
   **/
  constructor(itemId, itemText) {
    this._itemId = itemId;
    this._itemText = itemText;
  }

  /**
   * Item Id
   * @returns     {String}    Item identifier.
   **/
  get id() {
    return this._itemId;
  }

  /**
   * Item text
   * @returns     {String}    Item text.
   **/
  get text() {
    return this._itemText;
  }

}

module.exports = AddItemEvent;
