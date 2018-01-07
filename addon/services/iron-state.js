import Service from '@ember/service';
import { assert } from '@ember/debug';
import EmberObject, { get, set, setProperties } from '@ember/object';
import { A as EmberArray } from '@ember/array';
import deepFreeze from '../deep-freeze';

export default Service.extend({
  buckets: null,
  history: null,

  init() {
    this._super(...arguments);
    setProperties(this, {
      buckets: EmberObject.create(),
      history: EmberArray()
    })
  },

  _createBucket(guid, type) {
    const path = `buckets.${guid}`;

    assert(`Ember-Iron: Bucket creation failed, bucket already exists, ${guid}`, !get(this, path));

    const bucket = {
      type,
      props: {}
    };

    deepFreeze(bucket);
    set(this, path, bucket);
    this._log(guid, null, bucket, 'create bucket');
  },

  _destroyBucket(guid) {
    const path = `buckets.${guid}`;
    const bucket = get(this, path);

    assert(`Ember-Iron: Bucket destruction failed, bucket doesn't exist, ${guid}`, bucket);

    delete this[path];

    this._log(guid, bucket, null, 'destroy bucket');
  },

  _update(guid, hash, msg) {
    const path = `buckets.${guid}`;
    assert(`Ember-Iron: Bucket update failed, bucket doesn't exist, ${guid}`, get(this, path));

    const oldBucket = get(this, path);
    const newBucket = JSON.parse(JSON.stringify(oldBucket));

    Object.assign(newBucket.props, hash);

    set(this, path, deepFreeze(newBucket));
    this._log(guid, oldBucket, newBucket, msg);
  },

  _log(guid, oldBucket, newBucket, msg) {
    get(this, 'history').pushObject({
      guid,
      oldBucket,
      newBucket,
      msg
    });
  }
});
