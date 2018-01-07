import Mixin from '@ember/object/mixin';
import { guidFor } from '@ember/object/internals';
import { get } from '@ember/object';

export default Mixin.create({
  willDestroyElement() {
    get(this, 'ironState')._destroyBucket(guidFor(this));
  }
});
