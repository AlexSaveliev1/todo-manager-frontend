import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  dueDate: DS.attr('number'),
  createdAt: DS.attr('number'),
  finishedAt: DS.attr('number'),
  updatedAt: DS.attr('number'),
  deletedAt: DS.attr('number'),
  subtasks: DS.attr('array')
});
