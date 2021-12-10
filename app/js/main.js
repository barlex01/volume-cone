


let num1 = document.querySelector('#num1');
let num2 = document.querySelector('#num2');
let btn = document.querySelector('.btn');
let clockFace = document.querySelector('.window');
let label = document.querySelectorAll('.label');
let borderCone = document.querySelector('.inner__cone');

function getSquareCone(radius,height){
    let volume ;
    let halfOne = 0.3333;
    let pi = Math.PI;
   
    volume = halfOne * pi * square(radius)* height;
    return volume; 
 } 

 function square(num) {
       return num ** 2;
}
btn.addEventListener('click', function() {
    clockFace.innerHTML = Math.round(getSquareCone(num1.value, num2.value));
})

let mainTitle = document.querySelector('.main__title');

mainTitle.addEventListener('click',function black(){
    this.classList.toggle('shadowWhite')
    let body = document.querySelector('body');

        for (let el of label){
            el.classList.toggle('whiteText');
    }

    borderCone.classList.toggle('red');
    btn.classList.add('white')
    body.classList.add('bodyBlack');

    this.removeEventListener('click',black);

    mainTitle.addEventListener('click',function whiteOnce() {

        this.classList.toggle('shadowWhite')
        body.classList.remove('bodyBlack');
        btn.classList.toggle('white');
        borderCone.classList.toggle('red');

        for (let el of label){
            el.classList.toggle('whiteText')
        }

       this.removeEventListener('click', whiteOnce);
       mainTitle.addEventListener('click', black);
    })
   

})


