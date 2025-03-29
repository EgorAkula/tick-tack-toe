let cells = document.querySelectorAll('#table td');
let table = document.querySelector('#table');
let modal = document.querySelector('#modal');
let reloadButton = document.querySelector('#btnReload');




// gameOver = переменная для проверки окончания игры

//  This = В теле каждого метода или функции, которая по сути всегда является методом какого-то объекта мы можем использовать this,
//  чтобы обратится к родительскому объекту который вызвал функцию,
//  или в котором находится метод.
//  Упрощенно можно сказать — this — это родительский объект который вызвал метод (функцию).

    

function start(cells) {
    let gameOver = false;
    let i = 0;
    // Счетчик ходов 
    for(let cell of cells) {
        cell.addEventListener('click', function step() {
            // Крестик появяется на четное значение счетчика, ноль на нечетное
            // Если игра окончена то выйти из функции
            if(gameOver == true) {
                return;
            }

            if(i % 2 == 0) {
                this.textContent = '✖';
            }else {
                this.textContent = '◯'
            }

            // Удалить обратотчик событий клика что-бы крести не поменялся на нолик в этой же ячейке
            this.removeEventListener('click', step)

            if(i == 8) {
                modal.textContent = `Ничья !`;
                gameOver = true;
            }

            if(isWictory(cells)) {
                modal.textContent = `Победил ${this.textContent} !`;
                gameOver = true;
                for (let cell of cells) {
                    cell.removeEventListener('click', step)
                }
            }

            


            // Увеличить счетчик на 1
            i++;
            console.log(i);
        })
    }
}

function isWictory(cells) {
    let combs = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    
    // По очереди в цикле проверяются все возможные комбинации и в результате если есть совпадение комбанации то
    // функция возвращает true
    for(let comb of combs) {
        if(cells[comb[0]].textContent == cells[comb[1]].textContent &&
            cells[comb[1]].textContent == cells[comb[2]].textContent &&
            cells[comb[0]].textContent != '') {
                return true;
            }
    }
}


// 0,1,2
// 3,4,5
// 6,7,8
// 0,3,6
// 1,4,7
// 2,5,8
// 0,4,8
// 2,4,6
start(cells);

// перезапуск игры

reloadButton.addEventListener('click', ()=> {
    for(let cell of cells) {
        console.log(cell);
        cell.textContent = '';
    }
    modal.textContent = "Кто же победит?";
    start(cells)
} )

// cells = [td0 td1 td2 td4 td5 td6 td7 td8]
// combs = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
// [0,1,2]