import Ember from 'ember';

const COMPLETED_TASK_DELAY = 400;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  timeManager: Ember.inject.service(),

  classNames: ['task-board-wrapper', 'flex-100', 'flex-gt-sm-75'],

  tasks: [],
  sortedTasks: Ember.computed('tasks.[]', function () {
    return this.get('tasks').sortBy('order');
  }),
  addNewTaskMode: false,
  isConfirmDialogVisible: false,

  actions: {
    sortEndAction() {
      const tasks = this.get('sortedTasks');

      tasks.forEach((task, newOrder) => {
        const currentOrder = task.get('order');

        if (currentOrder !== newOrder) {
          task.set('order', newOrder);
          task.save();
        }
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
      const order = this.get('sortedTasks.lastObject.order') + 1;

      this.get('store').createRecord('task', Object.assign({}, properties, { order })).save()
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
