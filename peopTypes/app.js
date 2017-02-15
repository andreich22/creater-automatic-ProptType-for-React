const person = {
    name: 'some name',
    lastName: 'some last name',
    age: 20,
    placeOfWork: {
        nameCompany: 'wiley',
        work: {
            experience: 200,
            position: "javascript developer",
            departament: "Frontend"
        },
        function: function() {},
    },
    married: true,
    list: [
        { test: 'test' },
        { test1: 'test1' },
    ],
};

const STRING = 'PropTypes.string,';
const NUMBER = 'PropTypes.number,';
const FUNC = 'PropTypes.func,';
const BOOLEAN = 'PropTypes.bool,';
const ARRAY = 'PropTypes.array,';
const ELEMENT_REACT = 'PropTypes.element,'

//перебор объекта
function iterations(object) { //TODO rename function
    let newObject = Object.assign({}, object);
    let prop = {};
    for (let key in newObject) {
        if (newObject.hasOwnProperty(key)) {
            const element = newObject[key];
            prop = assingDiscription(prop, element, key);
        }
    }
    return prop;
}

//Присваивает описание на основе типа данных
function assingDiscription(prop, elem, key) {
    let copyProp = Object.assign({}, prop);
    if(typeof elem === 'object' && elem._owner) {
        copyProp[key] = ELEMENT_REACT
        return copyProp
    }    
    if (Array.isArray(elem)) {
        copyProp[key] = ARRAY
        return copyProp
    }
    if (typeof elem === 'function') {
        copyProp[key] = FUNC
        return copyProp
    }
    if (typeof elem === 'object' && !Array.isArray(elem)) {
        copyProp[key] = 'PropTypes.shape({\n' + objToString(iterations(elem)) + '}),'
        return copyProp
    }
    if (typeof elem === 'string') {
        copyProp[key] = STRING
        return copyProp
    }
    if (typeof elem === 'number') {
        copyProp[key] = NUMBER
        return copyProp
    }
    if (typeof elem === 'boolean') {
        copyProp[key] = BOOLEAN
        return copyProp
    }
}

//приводит объект к строке
function objToString(obj) {
    let str = '';
    for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + ':' + obj[p] + '\n';
        }
    }
    return str;
}

//получить описание proptypes
function getDiscriptionProptypes(props) {
  return '{\n' + objToString(iterations(props)) + '}';
}


console.log(getDiscriptionProptypes(person));