import Ember from 'ember';

const QObject = Ember.Object.extend({
  isQueryParams: true,
  values: null
});

export function qpParser(params) {    
  return QObject.create({
    values: params[0]
  });
}

export default Ember.Helper.helper(qpParser);
