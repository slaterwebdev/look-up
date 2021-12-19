//NAVIGATION
const navBtns = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
navBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        for (let i = 0; i < sections.length; i++) {
            if(e.target.classList[0] === sections[i].classList[0]){
                sections[i].classList.remove('d-none', 'pe-none');
            } else if (e.target.classList[0] !== sections[i].classList[0]) {
                sections[i].classList.add('d-none', 'pe-none');
            }
        }  
    })
});
document.addEventListener('click', (e) => {
    if(!e.target.classList.contains('navbar-collapse')){
        document.querySelector('.navbar-toggler').setAttribute('aria-expanded','false');
        document.querySelector('.navbar-collapse').classList.remove('show');
    }
});
//AUTOTYPE FEATURE
const autoType = () => {
    let para = document.querySelector('.auto-type');
    const text = 'A site to see the sights above!';
    const letters = text.split('');
    let i=0;
    setInterval(() => {
    if(i<letters.length){
        para.textContent += letters[i];
        i++;
    }
    }, 200);
};
autoType();
//MARS ROVER PHOTO BTNS
roverBtns.addEventListener('click' , (e) => {
    if(!e.target.classList.contains('rover-btns')){
        const btns = Array.from(roverBtns.children);
        for (let i = 0; i < btns.length; i++) {
            btns[i].style.backgroundColor = '#323964';
            btns[i].style.color = '#ffffff';
        }
        e.target.style.backgroundColor = '#fff';
        e.target.style.color = '#323964 ';
    }
});

