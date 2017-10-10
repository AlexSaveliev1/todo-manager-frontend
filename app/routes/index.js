import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  groupManager: Ember.inject.service(),

  model() {
    const groupQuery = this.get('groupManager').getAll();

    return RSVP.hash({
      groups: groupQuery
    });
  }
});
