// Проверяем себя, если не понимаем почему так а не иначе пишем в чат или в ЛС, желательно объяснять почему то или иное решение

// Типы данных

console.log([1, 2, 3] + ' is the answer.'); // ? '1,2,3 is the answer.', используем '+', один из операндов - строка => в ответе будет строка
console.log(false || true * 2); // ? 2, первым выполняется умножение, при умножении true преобразуется в 1, получается (false || 2) в ответе 2
console.log({ valueOf: () => 42 } * 2); // ? NaN, при попытке привести массив к числу получается NaN, а при умножении NaN получится NaN
console.log(parseInt('7.5') + parseFloat('2.5')); // ? 9.5, parseInt прервется на точке и вернет первое число - 7, parseFloat возвращает число с плавающей точкой, вернет 2.5
console.log(!!'Hello' - 1); // ? 0, true - 1 = 0
console.log(new String('hello') instanceof Object); // ? true Object - это родительский тип для всех объектов
console.log((true ^ false) === (false ^ true)); // ?
// true, если рассматривать ^ как исключающее или, то a^b можно разложить как !a * b + a * !b, тогда с обоих сторон равенства будет 1
// false, если рассматривать ^ как возведение в степень т.к. (1 ^ 0) = 1 и (0 ^ 1) = 0
console.log(true && '5' + 5); // ? '55' оператор && возвращает последнее не falsy значение ('5'), заем при сложении числа и строки получается строка
console.log({ valueOf: () => '10', toString: () => '20' } + 5); // ? '105'
// при сложении объекта вызывается сначала метод valueOf() и возвращается строка '10', т.к. есть такой ключ, при сложении строки и числа - в ответе строка
console.log((5).toString() === '5'); // ? true
console.log(null || false || undefined); // ? undefined, оператор || возвращает первое не falsy значение, если все значения falsy, то вернет последнее
console.log(0 || 2 || NaN); // ? 2, оператор || возвращает первое не falsy значение
console.log(1 && null && 2); // ? null, оператор && возвращает первое falsy, если таких нет, то возвращает последнее

//

function xy() { }

console.log(typeof xy); //? function
console.log(xy instanceof Object); //? true, Object - это родительский тип для всех объектов

var str1 = String(123); // возвращает строку
var str2 = new String(123); // возвращает экземпляр объекта, т.е. объект

console.log(typeof str1 === typeof str2); //? false
console.log(str1 === str2); //? false
console.log(str1 === String(123)); //? true, т.к и слева и справа строка '123'
console.log(str2 === new String(123)); //? false, т.к объект - ссылочный тип, слева и справа разные ссылки
console.log(str1 === 123); //? false, при жестком сравнении тип данных имеет значение, слева - string, справа - number
console.log(str1 === '123'); //? true, и справа и слева строка '123'
console.log(str1 == str2); //? true, при гибком сравнении выполняется неявное преобразование объекта в строку 
console.log(str1 == 123); //? true, при гибком сравнении выполняется неявное преобразование, строка '123' преобразуется в число
console.log(str1 == '123'); //? true, и справа и слева строка '123'

var arr = [];
console.log(typeof arr); //? object

var str3 = '123';
str3[0] = '2';
console.log(str3); //? err, переменная объявлена со строчным типом данных, к строчным типам нельзя обращаться по индексу

var p = 1 + 2 + 3 + ''; // сначала производим сложение (получаем число 6), потом неявное преобразование числа в строку - '6'
var z = '' + 1 + 2 + 3; // первое слагаемое - строка, следующие слагаемые преобразуются также в строку, получается '123'

console.log(p, typeof p); // ? '6' string
console.log(z, typeof z); // ? '123' string

var o = '123x';
console.log(Number(o)); // ? NaN, из-за 'х' 
console.log(parseInt(o, 10)); // 123, parseInt прервется на 'х' и вернет число 123
console.log(+o); // NaN, неявное преобразование, также как и в сдучае с Number(o)
console.log(typeof +o); // ? number
console.log(Boolean(String(false))); //? true, т.к если строка не пустая, то она не равна false

var h = [];
console.log(h ? 1 : 2); // ? 1, условный оператор ? возвращает значение до :, если условие true и после, если false
// выводится 1, т.к неявное преобразование [] в логический тип (true)

// Переменные

let a = a + 1;
console.log(a); // ? err, т.к a - не определена, вызывается до того, как ее определили, при объявлении с let возникает ошибка

//

var b = b + 1;
console.log(b); // ? NaN, т.к b не определена, однако, при объявлении с var b = undefined,
// при прибавлении к undefined единицы, undefined никак не преобразовать к числу, поэтому в ответе NaN

//

function foo(c) {
  if (c > 0) {
    var c = c + 10; // область видимости var в пределах функции, переопределение с, теперь с = 15 + 10
    return c; // возвращает с = 25
  }
  return c;
}
console.log(foo(15)); // ? 25

//

function foo() {
  console.log(d2); // '2', на момент вызов функции переменная уже определена
  let d1 = '1';
  return function () {
    console.log(d1); // '1', т.к ф-ция объявлена внутри другой ф-ции, она имеет доступ ко всем элементам родительской ф-ции
    console.log(d2); // '2'
  };
}

const d2 = '2';
const x = foo(); // предали результат выполнения ф-ции, здесь сработает первый console.log(d2) и выведет в консоль '2';
x(); // выполнение ф-ции после return ф-ции foo(), в консоль выведет console.log(d1) и console.log(d2), т.е. '1' и '2'

//

function giveMeX(showX) {
  if (showX) {
    let x = 5;
  }
  return x;
}

console.log(giveMeX(false)); // ? err, т.к преременная х не была объявлена
console.log(giveMeX(true)); // ? err, т.к переменная объявлена при помощи let и, следовательно, имеет блочную область видимости,
// т.е будет видна только в пределах блока if
console.log(x); // ? err, т.к объявлена внутри функции

//

var y = 1;

console.log(y); // ? 1

function car() {
  if (false) {
    var y = 2;
  }
  console.log(y);
}

car(); // ? undefined, т.к в ф-ции происходит переопределение переменной 'у' с помощью var, однако в блок if никак не попасть, следовательно,
// переменная объявлена, но ей не присвоено никакое значение
console.log(y); // ? 1, т.к y = 1 в глобальной области видимости

//

var i = 1;
var j = {};

// обе анонимные ф-ции объявлены в глобальной области видимости, 
// поэтому она имеет доступ ко всем переменным объявленым в глобальной области видимости
(function () {
  i++;
  j.j = 1;
})();  // ф-ция сработает сразу же
console.log(i, j); // ? 2 {j : 1}

(function (i, j) { // создаются новые переменные с переданными значениями, которые не видны в глобальной области
  i++;
  j.k = 1; // одна и та же ссыка на объект
})(i, j); // передано значенине i и ссылка на объект j
console.log(i, j); // ? 2 {j: 1, k: 1}

//

// Бонус
// Создать объект всеми возможными способами
const obj1 = {};
// const obj2 =  ваш код
// и тд
const obj2 = new Object;
const obj3 = Object.create({});
const obj4 = Object.assign({});
const obj5 = new class { };

//
// Написать функцию глубокого сравнения двух объектов:
// объекты могут быть любыми, и иметь любой уровень вложенности

const firstObj = { here: { is: 'on', other: '3' }, object: 'any' };
const secondObj = { here: { is: 'on', other: '2' }, object: 'any' };

const deepEqual = (firstObj, secondObj) => {

  const firstKeys = Object.keys(firstObj); // ключи первого объекта
  const secondKeys = Object.keys(secondObj); // ключт второго объекта

  if (!(firstKeys.length == secondKeys.length)) return false; // если длина ключей не совпадает, то объекты не могут быть равны
  else if (firstKeys.length > 1) {                            // если в объекте больше чем 1 ключ,
    for (let i = 0; i < firstKeys.length; i++) {              // то проходимся по всем ключам
      // если какого-то из ключей первого объекта нет в списке ключей второго - они не равны
      if (!secondKeys.includes(firstKeys[i])) return false;
      // если значение объекта - объект, то вызываем ф-цию deepEqual до тех пор,
      // пока не дойдем до примитивных значений
      if (firstObj[firstKeys[i]] instanceof Object && secondObj[firstKeys[i]] instanceof Object) {
        // если переменная вернула false, тогда не соблюден один из перечисленных выше пунктов, следовательно, объекты не равны
        if (!deepEqual(firstObj[firstKeys[i]], secondObj[firstKeys[i]])) return false
        // если значение объекта не объект, и сравниваемые значения не совпадают, то объекты не совпадают
      } else if (firstObj[firstKeys[i]] !== secondObj[firstKeys[i]]) {
        return false
      };
    }
    // если в объекте не соблюлись вышеперечисленные условия, то они совпадают
    return true
    // если в объекте не больше 1 ключа, то просто сравниваем значения
  } else {
    return firstObj[firstKeys] == secondObj[firstKeys]
  }
}

//

console.log(deepEqual(obj1, obj2)); // true, т.к  сравниваются два пустых объекта
console.log(deepEqual(firstObj, secondObj)); // у меня получилось false, т.к сравнивая значения по ключу other, в одном случае будет'3', а в другом '2'
