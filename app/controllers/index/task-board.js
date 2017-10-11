import Ember from 'ember';

export default Ember.Controller.extend({
  taskManager: Ember.inject.service(),
  groupManager: Ember.inject.service(),

  groups: Ember.computed('model.groups', function () {
    return this.get('model.groups');
  }),

  tasks: Ember.computed('model.tasks', function () {
    return this.get('model.tasks');
  }),

  taskIdToDelete: '',
  taskTitleToDelete: '',
  addNewTaskMode: false,
  isConfirmDialogVisible: false,

  actions: {
    saveTask({ id, titleToChange, dueDateToChange, updatedAt }) {
      this.get('taskManager').save(id, { title: titleToChange, dueDate: dueDateToChange, updatedAt });
    },

    confirmDelete({ id, title }) {
      this.setProperties({
        taskIdToDelete: id,
        taskTitleToDelete: title,
        isConfirmDialogVisible: true
      });
    },

    cancelDelete() {
      this.setProperties({ taskIdToDelete: '', taskTitleToDelete: '', isConfirmDialogVisible: false });
    },

    deleteTask() {
      const id = this.get('taskIdToDelete')

      this.get('taskManager').delete(id)
        .then(() => this.setProperties({ taskIdToDelete: '', taskTitleToDelete: '', isConfirmDialogVisible: false }));
    },

    addTask({ title, dueDate, createdAt }) {
      this.get('taskManager').addOne({ title, dueDate, createdAt })
        .then(() => this.set('addNewTaskMode', false));
    },

    changePriority({ id, value }) {
      this.get('taskManager').save(id, { priority: value });
    }

  }
});
