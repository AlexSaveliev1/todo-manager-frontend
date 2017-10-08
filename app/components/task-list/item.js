import Ember from 'ember';

export default Ember.Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    this.setProperties({ titleToChange: this.title, dueDateToChange: this.dueDate });
  },

  classNames: ['task-list-item-wrapper'],
  classNameBindings: ['addNewMode:no-border'],
  tagName: 'li',

  title: '',
  titleToChange: '', // TODO: Make object that will take all properties to change and push ot action
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

      titleToChange && this.sendAction('onAddNew', { titleToChange, dueDateToChange });
    },

    delete() {
      this.sendAction('onDelete', {
        id: this.get('id'),
        title: this.get('title')
      });
    }
  }
});
