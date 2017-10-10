import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  getAll() {
    return this.get('store').findAll('group');
  },

  getOne(id) {
    return this.get('store').findRecord('group', id); // TODO: Include tasks property
  }
});
