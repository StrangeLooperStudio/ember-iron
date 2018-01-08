import Mixin from '@ember/object/mixin';
import { get, computed, defineProperty } from '@ember/object';
import { inject as service } from '@ember/service';
import { guidFor } from '@ember/object/internals';

export default Mixin.create({
  ironState: service(),

  init() {
    this._super(...arguments);

    const guid = guidFor(this)
    const path = `ironState.buckets.${guid}.props`;

    get(this, 'ironState')._createBucket(guid, this.toString());

    this._setupProps(path);
  },

  updateIron(hash, msg) {
    get(this, 'ironState')._update(guidFor(this), hash, msg);
  },

  cloneIron(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  _setupProps(path) {
    let props = {};

    allKeys(this)
    .filter(key=> key !== 'content' && typeof get(this, key) === 'object' && get(this, `${key}.isIronProp`))
    .forEach(key=> {
      const descriptor = get(this, key);
      props[key] = descriptor.defaultValue;
      defineProperty(this, key, computed.readOnly(`${path}.${key}`));
    });

    this.updateIron(props, 'init props');
  }
});

function allKeys(obj) {
  let keys = [];
  for(let key in obj) {
    keys.push(key);
  }
  return keys;
}
