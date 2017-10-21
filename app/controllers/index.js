import Ember from 'ember';

const ANGULAR_MATERIAL_SM_LAYOUT = 960;

export default Ember.Controller.extend({
  desktopMode: true,
  menuOpened: false,

  init() {
    const $window = $(window);

    $window.width() < ANGULAR_MATERIAL_SM_LAYOUT ? this.set('desktopMode', false) : this.set('desktopMode', true);

    $window.on('resize', () => {
      const desktopMode = this.get('desktopMode');

      if ($window.width() < ANGULAR_MATERIAL_SM_LAYOUT) {
        desktopMode && this.set('desktopMode', false);
      } else {
        !desktopMode && this.set('desktopMode', true);
      }
    });
  }
});
