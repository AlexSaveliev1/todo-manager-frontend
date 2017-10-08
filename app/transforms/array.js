import Ember from 'ember';
import DS from 'ember-data';

export default DS.Transform.extend({
	  deserialize(serialized) {
    Ember.isArray(serialized) ? Ember.A(serialized) : Ember.A();
  },

  serialize(deserialized) {
    return Ember.isArray(deserialized) ? Ember.A(deserialized) : Ember.A();
  }
});
