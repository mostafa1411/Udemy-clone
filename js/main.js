let courses = [];
let cards = document.querySelector(".cards");

const fetchCourses = async () => {
    try {
        const response = await fetch("../courses.json");
        courses = await response.json();
        renderCourses(courses);
    }
    catch(err) {
        console.error(err);
    } 
};

const renderCourses = (courses) => {

    for (let i = 0; i < courses.length; i++) {
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
        courseImg.src = courses[i].image;
        courseTitle.innerHTML = courses[i].title;
        courseCreator.innerHTML = courses[i].author;
        courseRate.innerHTML = courses[i].rating;
        coursePrice.innerHTML = `E£${courses[i].price}`;
        courseReviews.innerHTML = `(${courses[i].reviews})`;
        bestSeller.innerHTML = `Bestseller`;
        for (let j = 0; j < 5; j++) {
            let icon = document.createElement("i");
            if (j + 0.8 <= courses[i].rating) {
                icon.classList.add("fa-solid", "fa-star", "icon");
            }
            else if (j + 0.2 >= courses[i].rating) {
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
        if (courses[i].bestseller) {
            courseInfo.appendChild(bestSeller);
        }
        courseCard.appendChild(courseImgContainer);
        courseCard.appendChild(courseInfo);
        cards.appendChild(courseCard);

        // add event listeners for cards
        courseCard.addEventListener('click', () => {
            window.open(`${courses[i].link}`, '_blank');
        });

        courseCard.addEventListener('mouseover', () => {
            courseImg.style.opacity = 0.8;
        });

        courseCard.addEventListener('mouseleave', () => {
            courseImg.style.opacity = 1;
        });
    }
};

window.addEventListener('load', fetchCourses);


// make search bar usable
let searchBar = document.querySelector("#search");

searchBar.addEventListener('keyup', (e) => {
    // clear the courses
    cards.innerHTML = ``;

    // filter courses
    const searchValue = e.target.value.toLowerCase();
    const filteredCourses = courses.filter((course) => course.title.toLowerCase().includes(searchValue));
    
    // render the filtered courses
    renderCourses(filteredCourses);
});