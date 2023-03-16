/*------------------------Efecto de escritura--------------------------*/
const profession = document.querySelector('.know');

const words = ["Frontend Developer.", ];

let index = 0;
let counter = 0;
let writing = true; 
let intervalId;

function changeWord(){
    const word = words[index];
    if(writing){
        profession.textContent += word.charAt(counter);
        counter++;
        if(counter === word.length){
            writing = false;
            clearInterval(intervalId);
        }
    }
}

intervalId = setInterval(changeWord, 180);
/*----------------------------- animation index----------------------*/



const buttonLis = document.querySelectorAll('.interactive-list li a');

buttonLis.forEach((link) =>{
    link.addEventListener('click', (e) =>{
        e.preventDefault();
        const sectionWorksFirts = document.querySelector('.container-slider');
        const sectionWorksSecond = document.querySelector('.slader-container');
        
        
        if(sectionWorksFirts.offsetParent === null){
            sectionWorksFirts.removeAttribute('id');
            sectionWorksSecond.setAttribute('id', 'works');
            
        }else{
            sectionWorksFirts.setAttribute('id', 'works');
            sectionWorksSecond.removeAttribute('id');
            
        }
        const currentId = e.target.attributes.href.value;
        const section = document.querySelector(currentId);
        const sectionPos = section.offsetTop;
        
            
            section.scrollIntoView({
                behavior: 'smooth',
            });
    });
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
    if(window.innerWidth <= 600){
        changePosition(1);
    }else{
        clearInterval(intervalId);
    }
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

const textError = document.querySelector('.message-info-text');
const containerThanks = document.querySelector('.thans-contact');
async function handleSubmit(event){
    event.preventDefault();

    const name = document.querySelector('#name').value;
    if(!name){
        showError(document.querySelector('#name'),'El nombre es obligatorio');
        return;
    }else{
        showError(document.querySelector('#name'));
    }

    const email = document.querySelector('#email').value;
    if(!validateEmail(email)){
        showError(document.querySelector('#email'),'Email no valido');
        return;
    }else{
        showError(document.querySelector('#email'));
    }
    
    const message = document.querySelector('#message').value;
    if(!message){
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
        containerThanks.classList.remove('inactive');
    }else{
        containerThanks.classList.remove('inactive');
        textError.innerText = 'Sus datos no son correctos o se produjo un error al envior sus datos.';
    }
}

const closeCard = document.getElementById('close-card');
closeCard.addEventListener('click', ()=>{
    containerThanks.classList.add('inactive');
});