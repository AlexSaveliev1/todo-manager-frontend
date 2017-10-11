import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  save(id, properties) {
    return this.get('store').findRecord('group', id)
      .then(group => {
        group.setProperties(properties);
        group.save();
      });
  },

  delete(id) {
    return this.get('store').findRecord('group', id, { reload: true })
      .then(group => {
        group.deleteRecord();
        group.save();
      });
  },

  findAll() {
    return this.get('store').findAll('group');
  },

  findOne(id) {
    return this.get('store').findRecord('group', id);
  },

  addOne(title) {
    const newGroup = this.get('store').createRecord('group', {
      title
    });

    return newGroup.save();
  }
});
