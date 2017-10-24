import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  router: Ember.inject.service('-routing'),
  timeManager: Ember.inject.service(),

  classNames: ['left-bar-wrapper', 'flex-100'],

  tasks: [],

  filters: [],

  filtersObserver: Ember.on('init', Ember.observer('tasks.@each.finishedAt', 'tasks.@each.dueDate', 'tasks.@each.group', function () {
    const inboxTasks = this.get('tasks').filter(task => !task.get('group')),
      todayTasks = this.get('tasks').filter(task => task.get('dueDate') === this.get('timeManager').getTodayMidnightMs()),
      weekTasks = this.get('tasks').filter(task => {
        const taskDueDate = task.get('dueDate'),
          from = this.get('timeManager').getTodayMidnightMs(),
          to = this.get('timeManager').getMidnightMsAfterWeek();

        return taskDueDate >= from && taskDueDate <= to;
      }),
      filters = [{
        label: 'Inbox',
        icon: 'Inbox',
        link: 'index.inbox',
        tasks: inboxTasks,
        totalTasks: inboxTasks.filter(task => !task.get('finishedAt')).get('length')
      },
      {
        label: 'Today',
        icon: 'Today',
        link: 'index.today',
        tasks: todayTasks,
        totalTasks: todayTasks.filter(task => !task.get('finishedAt')).get('length')
      },
      {
        label: 'Next 7 days',
        icon: 'schedule',
        link: 'index.week',
        tasks: weekTasks,
        totalTasks: weekTasks.filter(task => !task.get('finishedAt')).get('length')
      }];

    this.set('filters', filters);
  })),

  menuTabs: Ember.computed('tasks', function () {
    const allTasks = this.get('tasks'),
      firstPriorityTasks = allTasks.filter(task => task.get('priority') === 1),
      secondPriorityTasks = allTasks.filter(task => task.get('priority') === 2),
      thirdPriorityTasks = allTasks.filter(task => task.get('priority') === 3);

    return [{
      title: 'Groups',
      groups: this.get('groups').map(group => {
        let tasks = allTasks.filter(task => task.get('group') === Number(group.get('id')));

        return Object.assign(group,
          { tasks
          },
          { param: group.get('id')
          });
      })
    },
    {
      title: 'Filters',
      filters: [{
        title: 'Priority 1',
        link: 'index.filters',
        param: '1',
        tasks: firstPriorityTasks
      },
      {
        title: 'Priority 2',
        link: 'index.filters',
        param: '2',
        tasks: secondPriorityTasks
      },
      {
        title: 'Priority 3',
        link: 'index.filters',
        param: '3',
        tasks: thirdPriorityTasks
      }]
    }];
  }),

  actions: {
    stopPropagation(event) {
      event.stopPropagation();
    },

    dragTask(task, dragOptions) {
      const id = dragOptions.target.group.get('id');

      task.set('group', id);
      task.save();
    },

    addGroup(item) {
      const newGroup = this.get('store').createRecord('group', item);

      return newGroup.save()
        .then(addedGroup => Object.assign(addedGroup, { param: addedGroup.get('id') }))
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
