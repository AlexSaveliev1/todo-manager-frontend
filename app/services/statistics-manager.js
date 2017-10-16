import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  filterByQuery(query) {
    return this.get('store').queryRecord('statistic', query);
  }
});
