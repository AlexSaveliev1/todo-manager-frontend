import DS from 'ember-data';

export default DS.Model.extend({
  total: DS.attr('number'),
  completed: DS.attr('number'),
  summaryEstimated: DS.attr('number'),
  summaryRemaining: DS.attr('number')
});
