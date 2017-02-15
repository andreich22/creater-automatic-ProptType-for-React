const STRING = 'PropTypes.string,';
const NUMBER = 'PropTypes.number,';
const FUNC = 'PropTypes.func,';
const BOOLEAN = 'PropTypes.bool,';
const ARRAY = 'PropTypes.array,';
const ELEMENT_REACT = 'PropTypes.element,';

// перебор объекта
function iterations(object) { // TODO rename function
  const newObject = Object.assign({}, object);
  let prop = {};
  for (const key in newObject) {
      if (newObject.hasOwnProperty(key)) {
          const element = newObject[key];
          prop = assingDiscription(prop, element, key);
        }
    }
  return prop;
}

// Присваивает описание на основе типа данных
function assingDiscription(prop, elem, key) {
  const copyProp = Object.assign({}, prop);
    // if(typeof elem === 'object') {
    //   console.log(elem)
    //   const {_owner = false} = elem;
    //   debugger
    //   if(_owner) {
    //     debugger
    //       copyProp[key] = ELEMENT_REACT
    //       return copyProp
    //   }
    // }
  if (Array.isArray(elem)) {
      copyProp[key] = ARRAY;
      return copyProp;
    }
  if (typeof elem === 'function') {
      copyProp[key] = FUNC;
      return copyProp;
    }
  if (typeof elem === 'object' && !Array.isArray(elem)) {
      copyProp[key] = `PropTypes.shape({\n${  objToString(iterations(elem))  }}),`;
      return copyProp;
    }
  if (typeof elem === 'string') {
      copyProp[key] = STRING;
      return copyProp;
    }
  if (typeof elem === 'number') {
      copyProp[key] = NUMBER;
      return copyProp;
    }
  if (typeof elem === 'boolean') {
      copyProp[key] = BOOLEAN;
      return copyProp;
    }
}

// приводит объект к строке
function objToString(obj) {
  let str = '';
  for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
          str += `${p  }:${  obj[p]  }\n`;
        }
    }
  return str;
}

// приводит объект к строке
function objToString(obj) {
  let str = '';
  for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
          str += `${p  }:${  obj[p]  }\n`;
        }
    }
  return str;
}

// получить описание proptypes
function getDiscriptionProptypes(props) {
  return `{\n${  objToString(iterations(props))  }}`;
}
