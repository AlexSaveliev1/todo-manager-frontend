import Ember from 'ember';

export default Ember.Component.extend({
  timeManager: Ember.inject.service(),

  classNames: ['task-list-item-wrapper'],
  classNameBindings: ['addNewMode:no-border'],
  tagName: 'li',

  id: '',
  title: '',
  dueDate: '',
  dueDateToChange: '', // TODO: make min date of current day
  editMode: false,
  addNewMode: false,

  titleToChange: Ember.computed.reads('title'),
  dueDateObserver: Ember.on('init', Ember.observer('dueDateMs', function () {
    let ms = this.get('dueDateMs'),
      convertedMsToDate = this.get('timeManager').convertMsToDate(ms, 'MMM D');

    return ms && this.setProperties({
      dueDateToChange: convertedMsToDate,
      dueDate: convertedMsToDate
    });
  })),

  actions: {
    cancel() {
      this.get('cancelAction') ? this.sendAction('cancelAction') : this.set('editMode', !this.editMode);
    },

    save() {
      const { id, titleToChange, dueDateToChange } = this.getProperties('id', 'titleToChange', 'dueDateToChange');

      if (!titleToChange) {
        return;
      }

      let updatedItem = {
        id,
        titleToChange,
        dueDateToChange: this.get('timeManager').getMidnightMsOfDate(dueDateToChange),
        updatedAt: this.get('timeManager').getTodayMidnightMs()
      };

      this.setProperties({ title: titleToChange, dueDate: dueDateToChange, editMode: false });
      this.sendAction('onSave', updatedItem);
    },

    addNew() {
      const title = this.get('titleToChange'),
        dueDate = this.get('dueDateToChange'),
        newItem = {
          title,
          dueDate: this.get('timeManager').getMidnightMsOfDate(dueDate),
          createdAt: this.get('timeManager').getTodayMidnightMs()
        };

      title && this.sendAction('onAddNew', newItem);
    },

    delete() {
      this.sendAction('onDelete', {
        id: this.get('id'),
        title: this.get('title')
      });
    }
  }
});
