'use strict';

let places = [];

createButton.onclick = async function () {
    placeApi.create(createInput.value);
    places.push({ desc: createInput.value, id: places.length + 1, isVisited: false });
};

allPlaces.onclick = async function () {
    searchState.switchState('all');
    places = await placeApi.getAll();
    removeAllChild(placesListItems);
    for (let place of places) {
        new Place(place);
    }
};

visitedPlaces.onclick = async function () {
    searchState.switchState('visited');
    places = await placeApi.getAll();
    removeAllChild(placesListItems);
    for (let place of places.filter(elem => elem.isVisited === false)) {
        new Place(place);
    }
};

toVisitPlaces.onclick = async function () {
    searchState.switchState('toVisit');
    places = await placeApi.getAll();
    removeAllChild(placesListItems);
    for (let place of places.filter(elem => elem.isVisited === true)) {
        new Place(place);
    }
};

searchPlaces.onclick = function () {
    removeAllChild(placesListItems);
    let _places;
    if (searchState.toVisit) {
        _places = places.filter(place => place.isVisited === true);
    }
    if (searchState.visited) {
        _places = places.filter(place => place.isVisited === false);
    }
    if (searchState.all) {
        _places = places;
    }
    for (let place of _places.filter(elem => elem.desc === searchInput.value)) {
        new Place(place);
    }
};

deleteAllPlaces.onclick = async function () {
    await placeApi.clear();
    removeAllChild(placesListItems);
    places = [];
};

function removeAllChild(parent) {
    while (parent.length > 0) {
        parent[0].remove();
    }
}
