console.log('Hola Mundo');
/*------------------------Efecto de escritura--------------------------*/
const profession = document.querySelector('.know');

const words = ["Frontend Developer.", "Web Developer.",];

let index = 0;
let counter = 0;
let writing = true; 

function changeWord(){
    const word = words[index];
    if(writing){
        profession.textContent += word.charAt(counter);
        counter++;
        if(profession.textContent === word){
            writing = false;
        }
    }else{
        profession.textContent = profession.textContent.slice(0, -1);
        counter--;
        if(counter === 0){
            writing = true;
            counter = 0;
            index = (index + 1) % words.length;
        }
    }    
}
setInterval(changeWord, 300);
/*----------------------------- animation index----------------------*/

const buttonLis = document.querySelectorAll('.interactive-list li a');

buttonLis.forEach((link) =>{
    link.addEventListener('click', (e) =>{
        e.preventDefault();
        const currentId = e.target.attributes.href.value;
        const section = document.querySelector(currentId);
        const sectionPos = section.offsetTop;

        section.scrollIntoView({
            behavior: 'smooth',
        });
    });
    console.log('lol')
});
/*--------------------------------slidershow------------------------*/
(function() {
    const sliders = [...document.querySelectorAll('.slider__body')];
    const arrowNext = document.querySelector('#next');
    const arrowBefore = document.querySelector('#before');
    let currentIndex = 0;

    arrowNext.addEventListener('click', () => changePosition(1));
    arrowBefore.addEventListener('click', () => changePosition(-1));

    function changePosition(change) {
        currentIndex += change;

        if (currentIndex === sliders.length) {
            currentIndex = 0;
        }else if (currentIndex === -1) {
            currentIndex = sliders.length - 1;
        }

    sliders.forEach(slider => slider.classList.remove('slider__body--show'));
    sliders[currentIndex].classList.add('slider__body--show');
}

let intervalId = setInterval(function() {
    changePosition(1);
}, 6000);

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(intervalId);
    }else{
    intervalId = setInterval(function() {
        changePosition(1);
    }, 6500);
    }
    });
})();

/*-----------------------------------contact me--------------------*/
function validateEmail(email){
    const expresionReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return expresionReg.test(String(email).toLowerCase());
}

function showError(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    if(message){
        formControl.classList = 'input-container';
        small.innerText = message;
        small.style.color = 'red';
    }else{
        formControl.classList = 'input-container';
        small.innerText = 'valido';
        small.style.color = 'green'
    }
}

const $form = document.querySelector('#form');

$form.addEventListener('submit', handleSubmit);

async function handleSubmit(event){
    event.preventDefault();

    const name = document.querySelector('#name').value;
    if(!name){
        console.log('1');
        showError(document.querySelector('#name'),'El nombre es obligatorio');
        return;
    }else{
        showError(document.querySelector('#name'));
    }

    const email = document.querySelector('#email').value;
    if(!validateEmail(email)){
        console.log('2');
        showError(document.querySelector('#email'),'Email no valido');
        return;
    }else{
        showError(document.querySelector('#email'));
    }

    const message = document.querySelector('#message').value;
    if(!message){
       console.log('3');
        showError(document.querySelector('#message'),'El mensaje es obligatorio');
        return;
    }else{
        showError(document.querySelector('#message'));
    }

    const form = new FormData(this);
    const response = await fetch(this.action, {
        method: this.method,
        body: form,
        headers: {
            'Accept': 'appliction.json'
        }
    });
    if(response.ok){
        this.reset();
        alert('Gracias por contactarme, Te escribire pronto.');
    }
}