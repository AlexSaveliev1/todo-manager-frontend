import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  createdAt: DS.attr('number'),
  finishedAt: DS.attr('number'),
  updatedAt: DS.attr('number'),
  deletedAt: DS.attr('number'),
  task: DS.attr('number')
});
