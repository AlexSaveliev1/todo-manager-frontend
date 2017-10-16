import Ember from 'ember';
import _ from 'lodash';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  didReceiveAttrs() {
    let queryParams = this.get('queryParams'),
      filter = Object.assign({}, queryParams);

    delete filter['title'];
    Object.keys(filter).forEach(queryKey => !filter[queryKey] && delete filter[queryKey]);

    if (_.isEmpty(filter)) {
      this.get('store').queryRecord('statistic', { noGroup: true })
        .then(statistics => this.set('statistics', statistics))
    } else {
      this.get('store').queryRecord('statistic', filter)
        .then(statistics => this.set('statistics', statistics));
    }
  },

  summaryEstimatedObserver: Ember.observer('statistics', function () {
    const summaryEstimated = this.get('statistics.summaryEstimated'),
      summaryEstimetedAsHours = moment.duration(summaryEstimated, 'milliseconds').asHours();

    return this.set('summaryEstimated', summaryEstimetedAsHours);
  }),

  summaryEstimated: '',

  actions: {
    close() {
      this.sendAction('onClose');
    }
  }
});
