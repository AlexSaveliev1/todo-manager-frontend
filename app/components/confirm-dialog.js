import Ember from 'ember';

export default Ember.Component.extend({
  cancelButtonLabel: 'Cancel',
  confirmButtonLabel: 'Confirm',

  actions: {
    cancel() {
      this.sendAction('onCancel');
    },

    confirm() {
      this.sendAction('onConfirm');
    }
  }
});
