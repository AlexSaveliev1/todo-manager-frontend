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
      tasksQuery = !areQueryParamsDefined && this.store.findAll('task');

    return RSVP.hash({
      tasks: tasksQuery
    });
  }
});
