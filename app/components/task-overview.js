import Ember from 'ember';

const TIME_FORMAT = 'm [min], h [hours], d [days], M [months]';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  timeManager: Ember.inject.service(),

  classNames: ['task-overview-wrapper', 'flex-100', 'flex-gt-sm-100'],

  estimatedTime: Ember.computed('task', function () {
    const task = this.get('task'),
      { createdAt, dueDate } = task.getProperties('createdAt', 'dueDate'),
      difference = dueDate - createdAt;

    if (!dueDate) {
      return 'none';
    }

    return this.get('timeManager').getDuration(difference, TIME_FORMAT);
  }),

  spentTime: Ember.computed('task', function () {
    const task = this.get('task'),
      { createdAt, finishedAt } = task.getProperties('createdAt', 'finishedAt'),
      difference = this.get('timeManager').now() - createdAt;

    if (finishedAt) {
      const spendedTime = finishedAt - createdAt;

      return this.get('timeManager').getDuration(spendedTime, TIME_FORMAT);
    }

    return this.get('timeManager').getDuration(difference, TIME_FORMAT);
  }),

  remainingTimeObserver: Ember.on('init', Ember.observer('task.finishedAt', 'task.dueDate', function () {
    let task = this.get('task'),
      { finishedAt, dueDate } = task.getProperties('finishedAt', 'dueDate'),
      now = this.get('timeManager').now(),
      timeLeft = dueDate - now,
      remainingTime;

    if (!dueDate) {
      remainingTime = 'none';
    }

    if (timeLeft < 0 && dueDate) {
      let overdueTime = this.get('timeManager').getDuration(Math.abs(timeLeft), TIME_FORMAT);

      remainingTime = finishedAt ? 0 : `Your task overdued for ${overdueTime}`;
    }

    if (timeLeft >= 0 && dueDate) {
      remainingTime = this.get('timeManager').getDuration(timeLeft, TIME_FORMAT);
    }

    return this.set('remainingTime', remainingTime);
  })),

  task: {},
  remainingTime: '',
  addNewSubtaskMode: false,

  actions: {
    markAsCompleted(task) {
      task.set('finishedAt', this.get('timeManager').now());
      task.save();
    },

    markAsUncompleted(task) {
      task.set('finishedAt', null);
      task.save();
    },

    saveTask(task) {
      task.save();
    },

    changePriority(task, priority) {
      task.setProperties({
        priority,
        updatedAt: this.get('timeManager').now()
      });

      task.save();
    },

    addSubtask(properties) {
      this.get('store').createRecord('subtask', properties).save()
        .then(addedTask => this.get('subtasks').pushObject(addedTask))
        .then(() => this.set('addNewSubtaskMode', false));
    },

    saveSubtask(subtask) {
      subtask.save();
    },

    deleteSubtask(subtask) {
      subtask.destroyRecord()
        .then(() => this.get('subtasks').removeObject(subtask));
    }
  }
});
