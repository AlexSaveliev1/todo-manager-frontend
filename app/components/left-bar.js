import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  router: Ember.inject.service('-routing'),
  timeManager: Ember.inject.service(),

  classNames: ['left-bar-wrapper', 'flex-25'],

  tasks: [],

  filters: Ember.computed(function () {
    return [{
      label: 'Inbox',
      icon: 'Inbox',
      tagName: 'li',
      className: 'left-bar-item',
      link: 'index.inbox',
      tasks: this.get('tasks').filter(task => !task.get('group'))
    },
    {
      label: 'Today',
      icon: 'Today',
      tagName: 'li',
      className: 'left-bar-item',
      link: 'index.today',
      tasks: this.get('tasks').filter(task => task.get('dueDate') === this.get('timeManager').now())
    },
    {
      label: 'Next 7 days',
      icon: 'schedule',
      tagName: 'li',
      className: 'left-bar-item',
      link: 'index.week',
      tasks: this.get('tasks').filter(task => {
        const taskDueDate = task.get('dueDate'),
          from = this.get('timeManager').getTodayMidnightMs(),
          to = this.get('timeManager').getMidnightMsAfterWeek();

        if (taskDueDate >= from && taskDueDate <= to) {
          return task;
        }
      })
    }];
  }),

  menuTabs: Ember.computed('groups', function () {
    return [{
      title: 'Groups',
      groups: this.get('groups').map(group => {
        const allTasks = this.get('tasks'),
          tasks = allTasks.filter(task => task.get('group') === Number(group.get('id')));

        return Object.assign(group, { tasks }, { link: 'index.groups' }, { param: group.get('id') })
      })
    },
    {
      title: 'Filters',
      filters: [{
        title: 'Priority 1',
        link: 'index.filters',
        param: '1',
        tasks: this.get('tasks').filter(task => task.get('priority') === 1)
      },
      {
        title: 'Priority 2',
        link: 'index.filters',
        param: '2',
        tasks: this.get('tasks').filter(task => task.get('priority') === 2)
      },
      {
        title: 'Priority 3',
        link: 'index.filters',
        param: '3',
        tasks: this.get('tasks').filter(task => task.get('priority') === 3)
      }]
    }];
  }),

  actions: {
    addGroup(title) {
      const newGroup = this.get('store').createRecord('group', {
        title
      });

      return newGroup.save()
        .then(addedGroup => Object.assign(addedGroup, { link: 'index.groups' }, { param: addedGroup.get('id') }))
        .then(group => this.get('menuTabs.firstObject.groups').pushObject(group))
        .then(() => this.set('isAddGroupFormVisible', false));
    },

    saveGroup(item) {
      return item.save()
        .then(() => this.set('isAddGroupFormVisible', false));
    },

    deleteGroup(item) {
      item.deleteRecord();
      item.save()
        .then(group => this.get('menuTabs.firstObject.groups').removeObject(group));
    }
  }
});
