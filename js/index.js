'use strict'

/*
Map

Пусть даны 2 массива. Создайте коллекцию Map из этих массивов.
Получите список ключей и значений отдельно.
Получите текущее количество элементов.
Добавьте и удалите элемент
Произведите поиск по ключу
*/

const arr1 = [11, 'eleven'];
const arr2 = ['deep', "sky"];

const map = new Map( [arr1, arr2] );

console.log( 'map.keys() :>> ', map.keys() );
console.log( 'map.values() :>> ', map.values() );
console.log('map.size :>> ', map.size);

map.set('sun', {rise: true});
map.delete(11);
console.log('map :>> ', map);

console.log('map.has(\'deep\') :>> ', map.has('deep'));

/*
Set

Создайте коллекцию Set с начальными значениями 1,2,3. 
С помощью метода has проверьте наличие элемента со значением 3, а затем элемента со значением 4.
Добавите еще несколько элементов.
С помощью цикла for-of переберите ее значения и выведите в консоль.
Найдите сумму этих значений.
Удалите элемент 2.
Очистите всю коллекцию.
*/
const set = new Set([1, 2, 3]);

console.log('set.has(3) :>> ', set.has(3));
console.log('set.has(4) :>> ', set.has(4));

set.add(17);
set.add(88);

let res = 0;
for (let val of set) {
    console.log('val :>> ', val);
    res += val;
};
console.log('res :>> ', res);

set.delete(2);
console.log('set :>> ', set);
set.clear();


// * Сделать MyArray итерируемым.
console.group('* Iterator');
    function MyArray() {
        if (!new.target) {
            return new MyArray();
        }
        this.length = 0;
    }
    
    const myArrayProto = new MyArray();
    
    myArrayProto.pop = function () {
        if (this.length === 0) {
            return;
        }
        const lastItem = this[this.length - 1];
        delete this[--this.length];
        return lastItem;
    };
    
    myArrayProto.push = function (item) {
        this[this.length] = item;
        return ++this.length;
    };
    
    myArrayProto.shift = function () {
        if (this.length === 0) {
            return;
        }
        const fistItem = this[0];
        for (let i = 0; i < this.length - 1; i++) {
            this[i] = this[i + 1];
        }
        delete this[--this.length];
        return fistItem;
    };
    
    myArrayProto.filter = function (callback) {
        const returningArray = new MyArray();
        for (let i = 0; i < this.length; i++) {
            if (callback(this[i], i, this)) {
                returningArray.push(this[i]);
            }
        }
        return returningArray;
    };
  
    myArrayProto.flat = function(n = 1) {

        const superObj = new MyArray();
        const m = n;

        if (n === 0) {
            return this;
        };

        flatten.call(this, n);
        
        function flatten(n) {
            for(let i = 0; i < this.length; i++) {
                if ( Array.isArray(this[i]) ) {
                    this[i].forEach(item => {
                        if ( !Array.isArray(item) ) {
                            superObj.push(item);
                        } else if (n === 1) { 
                            superObj.push(item);
                        } else {
                            flatten.call(this[i], n - 1);
                        }
                    });
                } else if (this[i] === ' ') {
                    continue;
                } else {
                    if (n === m) {
                        superObj.push(this[i]);
                    };
                };      
            };
        };
        return superObj;
    };

    myArrayProto[Symbol.iterator] = function() {
        let from = 0;
        const to = this.length - 1;

        return {
            next() {
              if (from > to) {
                return {
                  value: undefined,
                  done: true,
                };
              }
              return {
                value: from++,
                done: false,
              };
            }
        }  
    };

    MyArray.prototype = myArrayProto;
  
    const myArr1 = new MyArray();

    for(let i = 0; i <= 6; i++) {
        if (i === 2) {
            myArr1.push('RRR');
        };
        if(i === 3) {
            myArr1.push(['lll', ['dddd', ['Ivan', 'Hert'], 'ffd'], 'GGGG']);
        };
        if(i === 4) {
            myArr1.push(['af', 'ft']);
        };
        if (i === 5) {
            myArr1.push(['w', 's', 'uyu']);
        };

        myArr1.push(i);
    };

    console.dir(myArr1);
    
    // for (const key of myArr1) {
    //     console.log(`myArr1[${key}] :>> `, myArr1[key]);
    // };

    for (const key of myArr1) {
        console.log(`myArr2[${key}] :>> `, myArr1[key]);
    };
    
console.groupEnd();

