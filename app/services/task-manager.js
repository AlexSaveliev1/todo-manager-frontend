import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  save(id, properties) {
    return this.get('store').findRecord('task', id)
      .then(task => {
        task.setProperties(properties);
        task.save();
      });
  },

  delete(id) {
    return this.get('store').findRecord('task', id, { reload: true })
      .then(task => {
        task.deleteRecord();
        task.save();
      });
  },

  addOne(properties) {
    return new Promise(resolve => {
      const newTask = this.get('store').createRecord('task', properties);

      newTask.save();
      resolve();
    });
  }
});
