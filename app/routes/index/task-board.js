import Ember from 'ember';
import RSVP from 'rsvp';
import _ from 'lodash';

export default Ember.Route.extend({
  queryParams: {
    dueDate: { refreshModel: true },
    priority: { refreshModel: true },
    from: { refreshModel: true },
    to: { refreshModel: true },
    groupId: { refreshModel: true }
  },

  model(queryParams) {
    console.log(queryParams)
    let filter = Object.assign({}, queryParams),
      { groupId, title } = queryParams,
      queryFilter,
      tasks;

    delete filter['title'];
    queryFilter = Object.assign({}, filter);

    Object.keys(filter).forEach(queryKey => !filter[queryKey] && delete filter[queryKey]);

    if (_.isEmpty(filter)) {
      tasks = this.store.filter('task', { noGroup: true }, function (item) {
        if (!item.get('groupId')) {
          return item;
        }
      });
    } else {
      tasks = this.store.filter('task', filter, function (item) {
        const isDueDateExist = Number(item.get('dueDate')) === Number(queryFilter['dueDate']),
          isPriorityExist = Number(item.get('priority')) === Number(queryFilter['priority']),
          isGroupIdExist = Number(item.get('groupId')) === Number(queryFilter['groupId']),
          isRangeExist = Number(item.get('dueDate')) >= Number(queryFilter['from']) && Number(item.get('dueDate')) <= Number(queryFilter['to']);

        if (isDueDateExist || isPriorityExist || isGroupIdExist || isRangeExist) {
          return item;
        }
      });
    }

    return RSVP.hash({
      groupId,
      boardTitle: title,
      tasks,
      groups: this.store.findAll('group')
    });
  }
});
