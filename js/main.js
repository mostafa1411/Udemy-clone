let data = [];
let currentActive = 0;
let coursesContent = document.querySelector(".content");

const fetchCourses = async () => {
    try {
        const response = await fetch("http://localhost:3000/content");
        data = await response.json();
        renderCourses(data[0]);
    }
    catch(err) {
        console.error(err);
    } 
};

const renderCourses = (data) => {
    // heading
    coursesContent.innerHTML = `
        <h3 class="heading">${data.header}</h3>
        <p class="description">${data.description}</p>
        <button class="explore-btn">Explore ${data.name}</button>
        <div class="splide">
            <div class="splide__arrows">
                <button class="splide__arrow splide__arrow--prev">
                    <i class="fa-solid fa-angle-left"></i>
                </button>
                <button class="splide__arrow splide__arrow--next">
                    <i class="fa-solid fa-angle-right"></i>
                </button>
            </div>
            <div class="cards splide__track">
                <div class="splide__list">
                    
                </div>
            </div>
        </div>
    `;

    let cardsList = document.querySelector(".splide__list");

    for (let i = 0; i < data.courses.length; i++) {
        // create elements
        cardsList.innerHTML += `
            <div class="course-card splide__slide">
                <div class="course-img">
                    <img src="${data.courses[i].image}">
                </div>
                <div class="course-info">
                    <div class="title">${data.courses[i].title}</div>
                    <div class="creator">${data.courses[i].author}</div>
                    <div class="rating">
                        <span class="rate">${data.courses[i].rating}</span>
                        <span class="stars">
                            <i class="fa-solid fa-star icon"></i>
                            <i class="fa-solid fa-star icon"></i>
                            <i class="fa-solid fa-star icon"></i>
                            <i class="fa-solid fa-star icon"></i>
                            <i class="${data.courses[i].rating >= 4.8 ? `fa-solid fa-star` : `fa-solid fa-star-half-stroke`} icon"></i>
                        </span>
                        <span class="reviews">(${data.courses[i].reviews})</span>
                    </div>
                    <div class="price">E£${data.courses[i].price}</div>
                    ${data.courses[i].bestseller ? `<div class="bestseller">Bestseller</div>` : ``}
                </div>
            </div>
        `;
    }
    
    // add event listeners for cards
    const cards = document.querySelectorAll(".course-card");

    for (let i = 0; i < cards.length; i++) {

        cards[i].addEventListener('click', () => {
            window.open(`${data.courses[i].link}`, '_blank');
        });

        cards[i].addEventListener('mouseover', () => {
            cards[i].querySelector("img").style.opacity = 0.8;
        });

        cards[i].addEventListener('mouseleave', () => {
            cards[i].querySelector("img").style.opacity = 1;
        });
    }

    // make the slider
    new Splide( '.splide', {
        type   : 'slide',
        perPage: 5,
        perMove: 5,
        pagination: false,
        breakpoints: {
            1200: {
                perPage: 4,
                perMove: 4,
            },
            980: {
                perPage: 3,
                perMove: 3,
            },
            700: {
                perPage: 2,
                perMove: 2,
            },
            550: {
                perPage: 1,
                perMove: 1,
            },
        },
    } ).mount();
};

window.addEventListener('load', fetchCourses); 

// make courses section buttons usable
const btns = document.querySelectorAll(".course-section");

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', () => {
        // remove active from all buttons
        for (let j = 0; j < btns.length; j++) {
            btns[j].classList.remove("active");
        }

        // add active class to the current button
        btns[i].classList.add("active");
        currentActive = i;

        // clear the content
        coursesContent.innerHTML = ``;

        // render the current active section
        renderCourses(data[currentActive]);
    });
}

// make search bar usable
document.querySelector("#search").addEventListener('keyup', (e) => {
    // clear the courses
    coursesContent.innerHTML = ``;

    // filter courses
    const searchValue = e.target.value.toLowerCase();
    let filteredData = Object.assign({}, data[currentActive]);
    filteredData.courses = filteredData.courses.filter((course) => course.title.toLowerCase().includes(searchValue));

    // render the filtered data
    renderCourses(filteredData);
});