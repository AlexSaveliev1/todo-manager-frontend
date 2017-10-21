import Ember from 'ember';

const COMPLETED_TASK_DELAY = 400;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  timeManager: Ember.inject.service(),

  classNames: ['task-board-wrapper', 'flex-100', 'flex-gt-sm-75'],

  tasks: [],
  addNewTaskMode: false,
  isConfirmDialogVisible: false,

  actions: {
    sortEndAction() {
      const tasks = this.get('tasks');

      let orderedTasks = tasks.map((task, index) => {
        const id = task.get('id');

        // task.set('order', Number(id) + index);
        // task.save()
      });
    },

    completeTask(item) {
      item.save()
        .then(() => setTimeout(() => {
          this.get('tasks').removeObject(item);
        }, COMPLETED_TASK_DELAY));
    },

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
      item.setProperties({
        priority,
        updatedAt: this.get('timeManager').now()
      });

      item.save();
    }
  }
});
