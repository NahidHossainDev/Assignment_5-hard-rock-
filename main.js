const apiUrl = 'https://api.lyrics.ovh/';

function search() {
    const userInput = document.querySelector('#input').value;
    const usersQuery = apiUrl + "suggest/" + userInput;
    console.log(usersQuery);
    fetchElement(usersQuery).then(data => displayData(data));
}
async function fetchElement(api) {
    const response = await fetch(api);
    const data = await response.json();
    return data;
}

let array = [];
const displayData = (data) => {
    const display = document.getElementById('search-result');
    display.innerHTML = "";
    for (i = 0; i < 10; i++) {
        const id = data.data[i].id;
        const title = data.data[i].title;
        const artistName = data.data[i].artist.name;
        console.log("id =", id, 'title =', title, "artistName =", artistName);

        const lyricsApi = 'https://api.lyrics.ovh/v1/' + artistName + "/" + title;
        fetchingLyric(id, lyricsApi);

        display.innerHTML += `
                <!-- single result -->
                <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${title}</h3>
                        <p class="author lead">Album by: <span>${artistName}</span>
                          <img src="${data.data[i].artist.picture_small}" alt="Photos of Author">
                        </p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success"  data-toggle="collapse" data-target="#a${id}" onclick="lyricShow('${id}')">Get Lyrics</button>
                    </div>
                </div>
                <div class="result-lyric">
                    <div class="single-lyrics text-center collapse" id="a${id}">
                        <button class="btn go-back " data-toggle="collapse" data-target="#a${id}" >&lsaquo;</button>
                        <h2 class="text-success mb-4">${title}</h2>
                        <pre class="lyric text-white" id ="b${id}">
    Wont go whistling like the wind blows,
    </pre>
                        <button class="btn go-back" data-toggle="collapse" data-target="#a${id}">&lsaquo;</button>
                    </div>
                </div>
                <!-- ./ single result -->`;
    }
}

function fetchingLyric(id, lyricsApi) {
    fetchElement(lyricsApi).then(data => array.push({id,data}));
}
function lyricShow(id) {
    const lyricId = id;
    let lyric;

    // how to apply find method
    for (i = 0; i < array.length; i++){
        if (array[i].id == lyricId) {
            lyric = array[i].data;
            break;
        }
    }
    if (lyric.lyrics == undefined) {
        lyric.lyrics = "Ops...! No lyrics found...!!!"
    }
        console.log(lyric.lyrics)
        const display = document.getElementById(`b${lyricId}`);
        display.innerText = lyric.lyrics;
}