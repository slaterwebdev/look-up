//API KEY
const apiKey = "wlNkqg9nAzbYp5Y40CR6k501z5A0cunUtv4d2qcc";
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
//Api Endpoint data request
const getData = async (Url) => {
    const response = await fetch(Url);
    const data = await response.json();
    return data;
};
//APOD API
const apodReq = document.querySelector('.apod-search');
const apodDate = document.querySelector('.apod-date');
const date = new Date();
apodDate.innerHTML = `Todays Date: ${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`;
apodReq.addEventListener('submit', (e) => {
    e.preventDefault();
    const apodPic = document.querySelector('.apod-pic');
    const apodDesc = document.querySelector('.apod-desc');
    const apodValue = apodInput.value;
    const apodQueryParam = `&date=${apodValue}`;
    const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}${apodQueryParam}`;
    const formDate = datePattern.test(apodValue);
    getData(apodUrl)
    .then(response => {
        const copyright = document.querySelector('.copyright');
        const date = document.querySelector('.date');
        const exp = document.querySelector('.explanation');
        const title = document.querySelector('.title');
        const apodRegexFail = document.querySelector('.apod-regex-fail');
        if(formDate){
            apodPic.setAttribute('src', response.url);
            apodPic.classList.remove('d-none')
            apodDesc.classList.remove('d-none');
            copyright.innerText = response.copyright;
            date.innerText = response.date;
            exp.innerText = response.explanation;
            title.innerText = response.title;
            apodInput.style.border = '0px solid red';
        } else {
            apodInput.style.border = '2px solid red';
            apodRegexFail.innerHTML = '<p class="apod-fail-msg">Please submit a correctly formatted date.<br> If format is correct, try another date as some dates have no data.</p>';
        }
    })
    .catch(err => console.log(err, 'There was an error recieving information from the server.'));
    apodReq.reset();
});
//MARS ROVER PHOTOS
let rover = null;
const marsSearch = document.querySelector('.mars-rover-search');
const roverBtns = document.querySelector('.rover-btns');
const maxRoverDate = document.querySelector('.max-date');
roverBtns.addEventListener('click', (e) => {
    if(e.target.classList.contains('curiosity')){
       rover = 'curiosity';
       maxRoverDate.innerText = 'Max Searchable Date: 2021-12-03';
    } else if (e.target.classList.contains('oppurtunity')) {
       rover = 'opportunity';
       maxRoverDate.innerText = 'Max Searchable Date: 2018-06-11';
    } else if (e.target.classList.contains('spirit')) {
       rover = 'spirit';
       maxRoverDate.innerText = 'Max Searchable Date: 2010-03-21';
    }
});
marsSearch.addEventListener('submit' , (e) => {
    e.preventDefault();
    const date = marsSearch.solReq.value;
    const insightReq = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?name=${rover}&earth_date=${date}&api_key=${apiKey}`;
    const carousel = document.querySelector('.carousel-inner');
    const marsImgContainer = document.querySelector('.mars-image-container');
    const formDate = datePattern.test(date);
    const marsRegexFail = document.querySelector('.mars-regex-fail');
    getData(insightReq)
    .then(response => {
        if(formDate){
        marsRegexFail.innerHTML = '';
        carousel.innerHTML = ``;
        for (let i = 0; i < response.photos.length; i++) {
            carousel.innerHTML += `
            <div class="carousel-item">
            <img src=${response.photos[i].img_src} class="d-block w-100" alt="Photos from the surface of mars!">
            <div class="carousel-caption d-none d-md-block">
                <h5>${response.photos[i].earth_date}</h5>
            </div>
            </div>
            `;
        }
        const carouselItems = document.querySelectorAll('.carousel-item');
        carouselItems[0].classList.add('active');
        marsImgContainer.classList.remove('d-none');
        } else {
            solReq.style.border = '2px solid red';
            marsRegexFail.innerHTML = `<p class="max-date text-center text-secondary text-danger">Please ensure date format is correct and a rover is selected.<br>A portion of dates has no available photos from the rovers, if date format is correct then try a new date.</p>`;
        }
    })
    .catch((err) => {
        carousel.innerHTML = ``;
        solReq.style.border = '2px solid red';
        marsRegexFail.innerHTML = `<p class="max-date text-center text-secondary text-danger">Please ensure date format is correct and a rover is selected.<br>A portion of dates has no available photos from the rovers, if date format is correct then try a new date.</p>`;
    });
    marsSearch.reset();
});
//EPIC EARTH IMAGE LIBRARY
const nasaPic = document.querySelector('.nasa-pic');
const nasaSearch = document.querySelector('.nasa-search');
nasaSearch.addEventListener('submit', (e) => {
    e.preventDefault();
    const nasaRegexFail = document.querySelector('.nasa-regex-fail');
    const searchDate = nasaSearch.nasaImgSearch.value;
    let nasaImgReq = `https://api.nasa.gov/EPIC/api/natural/date/${searchDate}?api_key=${apiKey}`;
    getData(nasaImgReq)
    .then(data => {
        nasaRegexFail.innerHTML = '';
        nasaImgSearch.classList.remove('red-border');
        const imgData = data[0].image;
        const date = searchDate.replace(/-/g, '/');
        const formDate = datePattern.test(searchDate);
        const imgSrc = `https://api.nasa.gov/EPIC/archive/natural/${date}/png/${imgData}.png?api_key=${apiKey}`;
        if(formDate){
            nasaPic.setAttribute('src', imgSrc)
        } 
    })
    .catch(err => {
        nasaPic.setAttribute('src', '')
        nasaImgSearch.classList.add('red-border');
        nasaRegexFail.innerHTML = `<p class="text-center earth-fail-msg">Please submit a correctly formatted date.<br> If format is correct, try another date as some dates have no data.</p>`;
    });
    nasaSearch.reset();
});
