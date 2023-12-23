//  Привязать контекст объекта к функции logger, чтобы при вызове this.item выводило - some value
// (Привязать через bind, call, apply)

function logger() {
  console.log(`I output only external context: ${this.item}`);
}
const obj = { item: 'some value' };

logger.bind(obj)();
logger.call(obj);
logger.apply(obj);

//////////////////////////////////

// Требуется создать функцию createCache, которая возвращает объект для кэширования результатов выполнения других функций. Кэш должен хранить значения, которые были возвращены функцией при определенных входных параметрах.

// Функция createCache должна иметь два метода:

// cache(fn): принимает функцию fn и возвращает новую функцию, которая кэширует результаты выполнения fn. Если кэш уже содержит результат для данного набора входных параметров, то новая функция должна возвращать сохраненное значение, не вызывая fn.
// clear(): очищает весь кэш.

function createCache() {
  let c = {}; // переменная для записи передаваемых аргументов;
  return {
    cache: function (fn) {
      return function (x) {
        if (!c[x]) {
          console.log('новое значение');
          c[x] = fn(x);
        }
        console.log('кэш :', c);
        return c[x]
      }
    },
    clear: function () {
      c = {};
      console.log('кэш очищен : ', c);
    }
  }
}

var myCache = createCache();

function multiplyByTwo(x) {
  return x * 2;
}

var cachedMultiplyByTwo = myCache.cache(multiplyByTwo);

console.log(cachedMultiplyByTwo(5)); // Вывод: Выполнил: 10
console.log(cachedMultiplyByTwo(5)); // Вывод: Выполнил: 10 (значение взято из кэша)

console.log(cachedMultiplyByTwo(3)); // Вывод: Выполнил: 6
console.log(cachedMultiplyByTwo(3)); // Вывод: Выполнил: 6 (значение взято из кэша)

myCache.clear(); // Вывод : Кэш отчищен

console.log(cachedMultiplyByTwo(5)); // Вывод: Выполнил: 10

//////////////////////////////////////////

// Бонус
// Реализовать полифил(собственную функцию реализующую встроенную в js) метода bind()

// Код здесь

// как функция
function bindPolyfillFunction(f, ...a) {
  console.log(...a, f);
  return function (...b) {
    return f.call(...b, a);
  }
}
// как метод
function bindPolyfill(...a) {
  let fn = this;
  return function (...b) {
    return fn.call(...a, ...b);
  }
}
Function.prototype.bindPolyfill = bindPolyfill;

//

function hello(yourName, yourSecondMame) {
  console.log('Hello, ', this);
  console.log('My name is ', yourName, yourSecondMame);
}

const world = 'World!';
const yourName = 'Dasha';
const yourSecondMame = 'Tarasova';

bindPolyfillFunction(hello)(world, yourName, yourSecondMame);
hello.bindPolyfill(world)(yourName, yourSecondMame);
//
