import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    openMenu() {
      this.sendAction('onMenu');
    }
  }
});
