import Ember from 'ember';
import _ from 'lodash';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  
  actions: {
    close() {
      this.sendAction('onClose');
    }
  }
});
