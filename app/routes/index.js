import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  timeManager: Ember.inject.service(),

  beforeModel() {
    this.transitionTo('index.inbox');
  },

  model() {
    const groupQuery = this.store.findAll('group');

    return RSVP.hash({
      tasks: this.store.findAll('task'),
      subtasks: this.store.findAll('subtask'),
      comments: this.store.findAll('comment'),
      groups: groupQuery
    });
  }
});
