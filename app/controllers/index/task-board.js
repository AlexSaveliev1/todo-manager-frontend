import Ember from 'ember';

export default Ember.Controller.extend({
  taskManager: Ember.inject.service(),

  addNewTaskMode: false,

  tasks: Ember.computed('model.tasks', function () {
    return this.get('model.tasks');
  }),

  actions: {
    test() {
      console.log('cancel action')
    },

    saveTask({ id, titleToChange, dueDateToChange }) {
      this.get('taskManager').save(id, { title: titleToChange, dueDate: dueDateToChange });
    },

    addTask({ titleToChange, dueDateToChange }) {
      this.get('taskManager').addOne({ title: titleToChange, dueDate: dueDateToChange })
        .then(() => this.set('addNewTaskMode', false))
    }
  }
});
