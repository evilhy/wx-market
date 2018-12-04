/**
 * Created by duy on 2018/7/3 15:06.
 */
/* eslint-disable */
import DebugEngine from './DebugEngine';

const $errorMessage = Symbol('errorMessage');

export default class DebugFail extends DebugEngine {

  constructor () {
    super();
    this.printMethod = 'error';
  }

  [$errorMessage] = '';

  set message (value) {
    if (!_.isString(value)) throw TypeError('DebugFail.message 类型应为 String');
    this[$errorMessage] = value;
  }

  getCollectionInfo () {
    let collection = super.getCollectionInfo();
    return collection.concat([
      {title: '错误信息', content: this[$errorMessage]}
    ]);
  }
}
