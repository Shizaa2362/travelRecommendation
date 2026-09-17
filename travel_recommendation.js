let travelData = {};

/* =========================================
FETCH TRAVEL DATA FROM JSON
========================================= */

fetch("travel_recommendation_api.json")
.then(function(response) {


    if (!response.ok) {
        throw new Error("Could not load travel data.");
    }

    return response.json();
})

.then(function(data) {

    travelData = data;

    console.log("Travel data loaded:", travelData);

})

.catch(function(error) {

    console.error("Error loading JSON:", error);

});


/* =========================================
IMAGE MAPPING

The JSON file provided by the course
contains placeholder image names.

We keep the JSON unchanged and map those
names to your local images folder.
========================================= */

const imageMap = {


"enter_your_image_for_sydney.jpg":
    "images/sydney.jpg",

"enter_your_image_for_melbourne.jpg":
    "images/melbourne.jpg",

"enter_your_image_for_tokyo.jpg":
    "images/tokyo.jpg",

"enter_your_image_for_kyoto.jpg":
    "images/kyoto.jpg",

"enter_your_image_for_rio.jpg":
    "images/rio.jpg",

"enter_your_image_for_sao-paulo.jpg":
    "images/sao-paulo.jpg",

"enter_your_image_for_angkor-wat.jpg":
    "images/angkor-wat.jpg",

"enter_your_image_for_taj-mahal.jpg":
    "images/taj-mahal.jpg",

"enter_your_image_for_bora-bora.jpg":
    "images/bora-bora.jpg",

"enter_your_image_for_copacabana.jpg":
    "images/copacabana.jpg"


};

/* =========================================
GET IMAGE PATH
========================================= */

function getImagePath(imageUrl) {


if (imageMap[imageUrl]) {
    return imageMap[imageUrl];
}

return imageUrl;


}

/* =========================================
SEARCH FUNCTION
========================================= */

function searchRecommendations() {


const input = document
    .getElementById("searchInput")
    .value
    .toLowerCase()
    .trim();

const resultsContainer =
    document.getElementById("recommendations");

resultsContainer.innerHTML = "";


/* Empty search */

if (input === "") {

    resultsContainer.innerHTML =
        '<div class="message">Please enter a destination or keyword to search.</div>';

    return;
}


let results = [];


/* =====================================
   BEACH SEARCH
===================================== */

if (
    input === "beach" ||
    input === "beaches" ||
    input.includes("beach")
) {

    results = travelData.beaches || [];

}


/* =====================================
   TEMPLE SEARCH
===================================== */

else if (
    input === "temple" ||
    input === "temples" ||
    input.includes("temple")
) {

    results = travelData.temples || [];

}


/* =====================================
   COUNTRY SEARCH
===================================== */

else if (
    input === "country" ||
    input === "countries"
) {

    results = getAllCountryCities();

}


/* =====================================
   SPECIFIC DESTINATION / COUNTRY SEARCH
===================================== */

else {

    results = searchSpecificDestination(input);

}


/* =====================================
   SHOW RESULTS
===================================== */

if (results.length === 0) {

    resultsContainer.innerHTML =
        '<div class="message">No recommendations found. Try searching for beach, temple, country, Japan, Australia, Tokyo, Bora Bora, etc.</div>';

    return;
}


displayResults(results);


}

/* =========================================
GET ALL COUNTRY CITIES
========================================= */

function getAllCountryCities() {

let results = [];

if (!travelData.countries) {
    return results;
}

travelData.countries.forEach(function(country) {

    if (country.cities) {

        country.cities.forEach(function(city) {

            results.push(city);

        });

    }

});

return results;


}

/* =========================================
SEARCH SPECIFIC DESTINATION

Examples:
Japan
Australia
Brazil
Tokyo
Sydney
Kyoto
Bora Bora
Taj Mahal
========================================= */

function searchSpecificDestination(input) {

let results = [];


/* Search countries and their cities */

if (travelData.countries) {

    travelData.countries.forEach(function(country) {

        const countryName =
            country.name.toLowerCase();

        /* Country name matches */

        if (countryName.includes(input)) {

            country.cities.forEach(function(city) {

                results.push(city);

            });

        }

        /* City name matches */

        else if (country.cities) {

            country.cities.forEach(function(city) {

                if (
                    city.name
                        .toLowerCase()
                        .includes(input)
                ) {

                    results.push(city);

                }

            });

        }

    });

}


/* Search temples */

if (travelData.temples) {

    travelData.temples.forEach(function(temple) {

        if (
            temple.name
                .toLowerCase()
                .includes(input)
        ) {

            results.push(temple);

        }

    });

}


/* Search beaches */

if (travelData.beaches) {

    travelData.beaches.forEach(function(beach) {

        if (
            beach.name
                .toLowerCase()
                .includes(input)
        ) {

            results.push(beach);

        }

    });

}


return results;


}

/* =========================================
DISPLAY RECOMMENDATION CARDS
========================================= */

function displayResults(results) {


const resultsContainer =
    document.getElementById("recommendations");

resultsContainer.innerHTML = "";


results.forEach(function(place) {

    const card =
        document.createElement("div");

    card.className =
        "recommendation-card";


    /* Image */

    const image =
        document.createElement("img");

    image.src =
        getImagePath(place.imageUrl);

    image.alt =
        place.name;


    /* If image does not exist */

    image.onerror = function() {

        this.src =
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828";

    };


    card.appendChild(image);


    /* Card content */

    const cardContent =
        document.createElement("div");

    cardContent.className =
        "card-content";


    /* Title */

    const title =
        document.createElement("h3");

    title.textContent =
        place.name;

    cardContent.appendChild(title);


    /* Description */

    const description =
        document.createElement("p");

    description.textContent =
        place.description;

    cardContent.appendChild(description);


    card.appendChild(cardContent);

    resultsContainer.appendChild(card);

});

}

/* =========================================
RESET / CLEAR FUNCTION
========================================= */

function clearResults() {


document.getElementById("searchInput").value = "";

document.getElementById("recommendations").innerHTML = "";


}

/* =========================================
CONTACT FORM
========================================= */

function submitContactForm(event) {


event.preventDefault();

alert("Thank you! Your message has been submitted.");

document.getElementById("name").value = "";

document.getElementById("email").value = "";

document.getElementById("message").value = "";


}
