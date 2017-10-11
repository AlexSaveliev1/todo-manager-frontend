import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['left-bar-group-item-wrapper'],

  itemId: '',
  title: '',
  editMode: false,
  addNewMode: false,

  titleToChange: Ember.computed.reads('title'),

  actions: {
    addNew() {
      const title = this.get('titleToChange');

      if (!title) {
        return;
      }

      this.sendAction('onAdd', title);
    },

    delete() {
      const id = this.get('itemId'),
        title = this.get('title');

      this.sendAction('onDelete', { id, title });
    },

    cancel() {
      this.sendAction('onCancel');
    },

    cancelEdit() {
      const title = this.get('title');

      this.setProperties({ titleToChange: title, editMode: false });
    },

    save() {
      const title = this.get('titleToChange'),
        id = this.get('itemId');

      if (!title) {
        return;
      }

      this.sendAction('onSave', { id, title });
      this.setProperties({ title, editMode: false });
    }
  }
});
