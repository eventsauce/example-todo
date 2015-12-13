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
 * The CompleteItemEvent represents an item being marked as completed.
 * @class
 **/
class CompleteItemEvent {

  /**
   * Initialize a new CompleteItemEvent
   * @param itemId    {String}      Id of item that was completed.
   **/
  constructor(itemId) {
    this._itemId = itemId;
  }

  /**
   * Item Id
   * @returns     {String}    Item identifier.
   **/
  get id() {
    return this._itemId;
  }

}

module.exports = CompleteItemEvent;
