import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  queryParams: {
    dueDate: { refreshModel: true },
    priority: { refreshModel: true },
    relatedToGroup: { refreshModel: true },
    from: { refreshModel: true },
    to: { refreshModel: true }
  },

  model(queryParams) {
    console.log(queryParams, 'query params')
    const { dueDate, from, to, priority } = queryParams,
      areQueryParamsDefined = from && to && priority && dueDate,
      filter = {},
      tasksQuery = !areQueryParamsDefined && this.store.findAll('task');

      Object.keys(queryParams).forEach(queryKey => console.log(queryParams[queryKey]));

    return RSVP.hash({
      tasks: tasksQuery
    });
  }
});
