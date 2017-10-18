import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  classNames: ['task-board-wrapper', 'flex-75'],

  tasks: [],
  addNewTaskMode: false,
  isConfirmDialogVisible: false,

  actions: {
    saveTask(item) {
      item.save();
    },

    deleteTask(item) {
      item.destroyRecord();
      this.get('tasks').removeObject(item);
    },

    addTask(properties) {
      this.get('store').createRecord('task', properties).save()
        .then(addedTask => this.get('tasks').pushObject(addedTask));

      this.set('addNewTaskMode', false);
    },

    changePriority(item, priority) {
      item.set('priority', priority);
      item.save();
    }
  }
});
