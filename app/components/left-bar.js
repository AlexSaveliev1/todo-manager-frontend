import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  router: Ember.inject.service('-routing'),
  timeManager: Ember.inject.service(),

  classNames: ['left-bar-wrapper', 'flex-100', 'flex-gt-sm-25'],

  tasks: [],

  filters: [],
  menuTabs: [],

  filtersObserver: Ember.on('init', Ember.observer('tasks.@each.dueDate', 'tasks.@each.group', function () {
    const inboxTasks = this.get('tasks').filter(task => !task.get('group')),
      todayTasks = this.get('tasks').filter(task => task.get('dueDate') === this.get('timeManager').getTodayMidnightMs()),
      weekTasks = this.get('tasks').filter(task => {
        const taskDueDate = task.get('dueDate'),
          from = this.get('timeManager').getTodayMidnightMs(),
          to = this.get('timeManager').getMidnightMsAfterWeek();

        if (taskDueDate >= from && taskDueDate <= to) {
          return task;
        }
      }),
      filters = [{
        label: 'Inbox',
        icon: 'Inbox',
        tagName: 'li',
        className: 'left-bar-item',
        link: 'index.inbox',
        tasks: inboxTasks,
        totalTasks: inboxTasks.filter(task => !task.get('finishedAt')).get('length')
      },
      {
        label: 'Today',
        icon: 'Today',
        tagName: 'li',
        className: 'left-bar-item',
        link: 'index.today',
        tasks: todayTasks,
        totalTasks: todayTasks.filter(task => !task.get('finishedAt')).get('length')
      },
      {
        label: 'Next 7 days',
        icon: 'schedule',
        tagName: 'li',
        className: 'left-bar-item',
        link: 'index.week',
        tasks: weekTasks,
        totalTasks: weekTasks.filter(task => !task.get('finishedAt')).get('length')
      }];

    this.set('filters', filters);
  })),

  menuTabsObserver: Ember.on('init', Ember.observer('tasks', function () {
    const allTasks = this.get('tasks'),
      firstPriorityTasks = allTasks.filter(task => task.get('priority') === 1),
      secondPriorityTasks = allTasks.filter(task => task.get('priority') === 2),
      thirdPriorityTasks = allTasks.filter(task => task.get('priority') === 3),
      menuTabs = [{
        title: 'Groups',
        groups: this.get('groups').map(group => {
          let tasks = allTasks.filter(task => task.get('group') === Number(group.get('id')));

          return Object.assign(group, { tasks, totalTasks: tasks.filter(task => !task.get('finishedAt')).get('length') }, { link: 'index.groups' }, { param: group.get('id') })
        })
      },
      {
        title: 'Filters',
        filters: [{
          title: 'Priority 1',
          link: 'index.filters',
          param: '1',
          tasks: firstPriorityTasks,
          totalTasks: firstPriorityTasks.filter(task => !task.get('finishedAt')).get('length')
        },
        {
          title: 'Priority 2',
          link: 'index.filters',
          param: '2',
          tasks: secondPriorityTasks,
          totalTasks: secondPriorityTasks.filter(task => !task.get('finishedAt')).get('length')
        },
        {
          title: 'Priority 3',
          link: 'index.filters',
          param: '3',
          tasks: thirdPriorityTasks,
          totalTasks: thirdPriorityTasks.filter(task => !task.get('finishedAt')).get('length')
        }]
      }];

    this.set('menuTabs', menuTabs);
  })),

  actions: {
    stopPropagation(event) {
      event.stopPropagation();
    },

    dragTask(task, dragOptions) {
      const id = dragOptions.target.group.get('id');

      task.set('group', id);
      task.save();
    },

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
