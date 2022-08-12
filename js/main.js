window.addEventListener('load', fetchCourses);

function fetchCourses () {
    fetch("../courses.json")
    .then((response) => response.json())
    .then((data) => {
        renderCourses(data);
        
    })
    .catch((error) => error)
};

function renderCourses(data) {
    let cards = document.querySelector(".cards");

    for (let i = 0; i < data.length; i++) {
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
        courseImg.src = data[i].image;
        courseTitle.innerHTML = data[i].title;
        courseCreator.innerHTML = data[i].author;
        courseRate.innerHTML = data[i].rating;
        coursePrice.innerHTML = `E£${data[i].price}`;
        courseReviews.innerHTML = `(${data[i].reviews})`;
        bestSeller.innerHTML = `Bestseller`;
        for (let j = 0; j < 5; j++) {
            let icon = document.createElement("i");
            if (j + 0.8 <= data[i].rating) {
                icon.classList.add("fa-solid", "fa-star", "icon");
            }
            else if (j + 0.2 >= data[i].rating) {
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
        if (data[i].bestseller) {
            courseInfo.appendChild(bestSeller);
        }
        courseCard.appendChild(courseImgContainer);
        courseCard.appendChild(courseInfo);
        cards.appendChild(courseCard);

        // add event listeners for cards
        courseCard.addEventListener('click', function(e) {
            window.open(`${data[i].link}`, '_blank');
        });

        courseCard.addEventListener('mouseover', function() {
            courseImg.style.opacity = 0.8;
        });

        courseCard.addEventListener('mouseleave', function() {
            courseImg.style.opacity = 1;
        });
    }
};