import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  findAll() {
    return this.get('store').findAll('group');
  },

  findOne(id) {
    return this.get('store').findRecord('group', id);
  },

  findOneAndRemoveTask() {
    return '';
  }
});
