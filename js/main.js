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
    let heading = document.createElement("h3");
    heading.classList.add("heading");
    heading.innerHTML = data.header;

    // description
    let description = document.createElement("p");
    description.classList.add("description");
    description.innerHTML = data.description;

    // explore button
    let exploreBtn = document.createElement("button");
    exploreBtn.classList.add("explore-btn");
    exploreBtn.innerHTML = `Explore ${data.name}`;


    // cards
    let cards = document.createElement("div");
    cards.classList.add("cards", "carousel-inner");

    for (let i = 0; i < data.courses.length; i++) {
        // create elements
        let courseCard = document.createElement("div");
        let courseImgContainer = document.createElement("div");
        let courseImg = document.createElement("img");
        let courseInfo = document.createElement("div");
        let courseTitle = document.createElement("div");
        let courseCreator = document.createElement("div");
        let courseRating = document.createElement("div");
        let courseRate = document.createElement("span");
        let courseStars = document.createElement("span");
        let courseReviews = document.createElement("span");
        let coursePrice = document.createElement("div");
        let bestSeller = document.createElement("div");

        // fill elements with content
        courseImg.src = data.courses[i].image;
        courseTitle.innerHTML = data.courses[i].title;
        courseCreator.innerHTML = data.courses[i].author;
        courseRate.innerHTML = data.courses[i].rating;
        coursePrice.innerHTML = `E£${data.courses[i].price}`;
        courseReviews.innerHTML = `(${data.courses[i].reviews})`;
        bestSeller.innerHTML = `Bestseller`;
        for (let j = 0; j < 5; j++) {
            let icon = document.createElement("i");
            if (j + 0.8 <= data.courses[i].rating) {
                icon.classList.add("fa-solid", "fa-star", "icon");
            }
            else if (j + 0.2 >= data.courses[i].rating) {
                icon.classList.add("fa-regular", "fa-star", "icon");
            }
            else {
                icon.classList.add("fa-solid", "fa-star-half-stroke", "icon");
            }
            courseStars.appendChild(icon);
        }
    

        // assign classes to elements
        courseCard.classList.add("course-card");
        courseImgContainer.classList.add("course-img");
        courseInfo.classList.add("course-info");
        courseTitle.classList.add("title");
        courseCreator.classList.add("creator");
        courseRating.classList.add("rating");
        courseRate.classList.add("rate");
        courseStars.classList.add("stars")
        courseReviews.classList.add("reviews");
        coursePrice.classList.add("price");
        bestSeller.classList.add("bestseller");

        // append children
        courseRating.appendChild(courseRate);
        courseRating.appendChild(courseStars);
        courseRating.appendChild(courseReviews);
        courseImgContainer.appendChild(courseImg);
        courseInfo.appendChild(courseTitle);
        courseInfo.appendChild(courseCreator);
        courseInfo.appendChild(courseRating);
        courseInfo.appendChild(coursePrice);
        if (data.courses[i].bestseller) {
            courseInfo.appendChild(bestSeller);
        }
        courseCard.appendChild(courseImgContainer);
        courseCard.appendChild(courseInfo);
        cards.appendChild(courseCard);

        // add event listeners for cards
        courseCard.addEventListener('click', () => {
            window.open(`${data.courses[i].link}`, '_blank');
        });

        courseCard.addEventListener('mouseover', () => {
            courseImg.style.opacity = 0.8;
        });

        courseCard.addEventListener('mouseleave', () => {
            courseImg.style.opacity = 1;
        });
    }

    coursesContent.appendChild(heading);
    coursesContent.appendChild(description);
    coursesContent.appendChild(exploreBtn);
    coursesContent.appendChild(cards);
};

window.addEventListener('load', fetchCourses);

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
let searchBar = document.querySelector("#search");

searchBar.addEventListener('keyup', (e) => {
    // clear the courses
    coursesContent.innerHTML = ``;

    // filter courses
    const searchValue = e.target.value.toLowerCase();
    let filteredData = Object.assign({}, data[currentActive]);
    filteredData.courses = filteredData.courses.filter((course) => course.title.toLowerCase().includes(searchValue));

    // render the filtered data
    renderCourses(filteredData);
});