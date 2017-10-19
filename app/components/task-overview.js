import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  timeManager: Ember.inject.service(),

  classNames: ['task-overview-wrapper', 'flex-75'],

  task: {},
  addNewSubtaskMode: false,

  actions: {
    markAsCompleted() {
      const task = this.get('task');

      task.set('finishedAt', this.get('timeManager').now());
      task.save();
    },

    markAsUncompleted() {
      const task = this.get('task');

      task.set('finishedAt', null);
      task.save();
    },

    addSubtask(properties) {
      this.get('store').createRecord('subtask', properties).save()
        .then(addedTask => this.get('subtasks').pushObject(addedTask))
        .then(() => this.set('addNewSubtaskMode', false));
    },

    saveSubtask(subtask) {
      subtask.save();
    },

    deleteSubtask(subtask) {
      subtask.destroyRecord()
        .then(() => this.get('subtasks').removeObject(subtask));
    }
  }
});
