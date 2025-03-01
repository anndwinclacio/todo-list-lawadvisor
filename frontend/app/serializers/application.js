import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class ApplicationSerializer extends JSONAPISerializer {
  host = 'http://localhost:3000';
}
