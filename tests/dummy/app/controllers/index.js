import IronController from 'ember-iron/controller';
import IronProp from 'ember-iron/prop';

export default IronController.extend({
  searchText: IronProp('test'),
  actions: {
    updateSearchText(searchText) {
      this.updateIron({ searchText }, 'application index controller #updateSearchText');
    }
  }
});
