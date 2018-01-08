import Component from '@ember/component';

export default Component.extend({
  didRender() {
    this.$().find('.iron-history__entry:last-child')[0].scrollIntoView()
  }
})
