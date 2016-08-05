/* @flow */
export const setIn = (target, field:string, value) => {
  let fields = field.split('.');
  let subField = fields.shift();
  let newValue = fields.length == 0 ? value : setIn(target[subField], fields.join('.'), value);
  console.log(target);
  console.log(subField, newValue);
  console.log({ ...target, [subField]: newValue });
  return { ...target, [subField]: newValue };
};

export const modifyArrayEntry = (arr, matcher:Function, modifier:Function) => {
  return arr.map(i => matcher(i) ? modifier(i) : i);
};

export function removeIn(value, prop:string, entry:any) {
  let arr:Array<any> = value[prop];
  return {
    ...value,
    [prop]: [...arr.filter(e => e !== entry)],
  };
}

export function pushIn(value:T, prop:string, entry:any) {
  return {
    ...value,
    [prop]: [...value[prop], entry],
  };
}

export function pop(array) {
  let value = array.pop();
  return [value, array.concat()];
}
