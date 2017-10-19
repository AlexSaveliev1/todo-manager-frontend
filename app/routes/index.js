import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  timeManager: Ember.inject.service(),

  model() {
    const groupQuery = this.store.findAll('group');

    return RSVP.hash({
      tasks: this.store.findAll('task'),
      subtasks: this.store.findAll('subtask'),
      groups: groupQuery
    });
  }
});
