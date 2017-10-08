import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  queryParams: {
    from: { refreshModel: true },
    to: { refreshModel: true }
  },

  model(queryParams) {
    console.log(queryParams, 'query params')
    const { from, to } = queryParams,
      areQueryParamsDefined = from && to,
      tasksQuery = !areQueryParamsDefined && this.store.findAll('task');

    return RSVP.hash({
      tasks: tasksQuery
    });
  }
});
