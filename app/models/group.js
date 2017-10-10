import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  tasks: DS.attr('array')
});
