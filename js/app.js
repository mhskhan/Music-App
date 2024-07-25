/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Md Hasin Shadab Khan
 *      Student ID: 130899230
 *      Date:       July 25, 2024
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.

const { artists, songs } = window;

window.addEventListener("DOMContentLoaded", defaultDisplay);

function createButton(artist) {
  var button = document.createElement("button");
  button.textContent = artist.name;
  button.addEventListener("click", function () {
    displaySongs(artist);
  });
  return button;
}

function createButtons() {
  var menu = document.getElementById("menu");

  for (let i = 0; i < window.artists.length; i++) {
    var artist = window.artists[i];
    var button = createButton(artist);
    menu.appendChild(button);
  }
}

function defaultDisplay() {
  createButtons();
  displaySongs(window.artists[0]);
}

function createSongCard(song) {
  const card = document.createElement("div");
  card.classList.add("productCard");

  const songImg = document.createElement("img");
  songImg.src = song.imageUrl;
  songImg.classList.add("image");
  card.appendChild(songImg);

  const details = document.createElement("div");
  details.classList.add("card__details");

  const songTitle = document.createElement("div");
  songTitle.textContent = song.title;
  songTitle.classList.add("songName");
  details.appendChild(songTitle);

  const year = document.createElement("div");
  year.textContent = song.year;
  year.classList.add("yearRecorded");
  details.appendChild(year);

  const durationContainer = document.createElement("div");
  durationContainer.classList.add("durationContainer");

  const playIcon = document.createElement("span");
  playIcon.textContent = "▶";
  playIcon.classList.add("playIcon");
  durationContainer.appendChild(playIcon);

  const duration = document.createElement("span");
  var minutes = Math.floor(song.duration / 60);
  var seconds = song.duration % 60;
  duration.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  duration.classList.add("duration");
  durationContainer.appendChild(duration);
  details.appendChild(durationContainer);

  card.appendChild(details);

  card.addEventListener("click", function () {
    window.open(song.url, "_blank");
  });

  return card;
}

function displaySongs(artist) {
  var urls = artist.urls
    .map(function (urls) {
      return `<a href="${urls.url}" target="_blank">${urls.name}</a>`;
    })
    .join(", ");

  var selectedArtistTitle = document.getElementById("selected-artist");
  selectedArtistTitle.innerHTML = `${artist.name} (${urls})`;

  var container = document.querySelector(".container");
  container.innerHTML = "";

  var artistSongs = window.songs.filter(function (song) {
    return song.artistId === artist.artistId && !song.explicit;
  });

  artistSongs.forEach(function (song) {
    const songCard = createSongCard(song);
    container.appendChild(songCard);
  });
}

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");
