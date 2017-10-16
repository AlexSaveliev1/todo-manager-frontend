import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  groupManager: Ember.inject.service(),
  statisticsManager: Ember.inject.service(),
  timeManager: Ember.inject.service(),

  model() {
    const groupQuery = this.get('groupManager').findAll(),
      inboxStatistic = this.get('statisticsManager').filterByQuery({ noGroup: true });

    return RSVP.hash({
      groups: groupQuery,
      inboxStatistic
    });
  }
});
