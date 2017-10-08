import Ember from 'ember';

export default Ember.Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    this.setProperties({ titleToChange: this.title, dueDateToChange: this.dueDate });
  },

  classNames: ['task-list-item-wrapper'],
  tagName: 'li',

  title: '',
  titleToChange: '',
  dueDate: '',
  dueDateToChange: '',
  editMode: false,

  actions: {
    cancel() {
      this.cancelAction ? this.sendAction('cancelAction') : this.set('editMode', !this.editMode);
    },

    save() {
      const { id, titleToChange, dueDateToChange } = this;

      if (!titleToChange) {
        return;
      }

      this.setProperties({ title: titleToChange, dueDate: dueDateToChange, editMode: false });
      this.sendAction('onSave', { id, titleToChange, dueDateToChange });
    },

    addNew() {
      const titleToChange = this.get('titleToChange'),
        dueDateToChange = this.get('dueDateToChange');

      this.sendAction('onAddNew', { titleToChange, dueDateToChange})
    }
  }
});
