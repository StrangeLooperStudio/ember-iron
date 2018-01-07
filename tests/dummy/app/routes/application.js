import IronRoute from 'ember-iron/route';
import IronProp from 'ember-iron/prop';

export default IronRoute.extend({
  foo: IronProp('bar')
});
