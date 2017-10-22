import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['left-bar-item-wrapper'],

  item: {},
  statisticsModalVisible: false,
  isDeleteConfirmationDialogVisible: false,
  editMode: false,
  addNewMode: false,

  actions: {
    showStatisticsModal(event) {
      event.stopPropagation();
      event.preventDefault();

      const statisticsModalVisible = this.get('statisticsModalVisible');

      this.set('statisticsModalVisible', !statisticsModalVisible);
    },

    addNew() {
      this.sendAction('onAdd', this.get('item'));
      this.set('item.title', '');
    },

    delete() {
      this.sendAction('onDelete', this.get('item'));
    },

    cancel() {
      this.sendAction('onCancel');
    },

    cancelEdit() {
      const item = this.get('item');

      item.rollbackAttributes();
      this.set('editMode', false);
    },

    save() {
      this.sendAction('onSave', this.get('item'));
      this.set('editMode', false);
    },

    showDeleteConfirmationDialog() {
      this.set('isDeleteConfirmationDialogVisible', true);
    }
  }
});
