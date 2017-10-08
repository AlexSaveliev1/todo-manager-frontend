import Ember from 'ember';

export default Ember.Controller.extend({
  taskManager: Ember.inject.service(),

  tasks: Ember.computed.alias('model.tasks'),
  taskIdToDelete: '',
  taskTitleToDelete: '',
  addNewTaskMode: false,
  isConfirmDialogVisible: false,

  actions: {
    saveTask({ id, titleToChange, dueDateToChange }) {
      this.get('taskManager').save(id, { title: titleToChange, dueDate: dueDateToChange });
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
      const id = this.get('taskIdToDelete');

      this.get('taskManager').delete(id)
        .then(() => this.setProperties({ taskIdToDelete: '', taskTitleToDelete: '', isConfirmDialogVisible: false }));
    },

    addTask({ titleToChange, dueDateToChange }) {
      this.get('taskManager').addOne({ title: titleToChange, dueDate: dueDateToChange })
        .then(() => this.set('addNewTaskMode', false));
    }
  }
});
