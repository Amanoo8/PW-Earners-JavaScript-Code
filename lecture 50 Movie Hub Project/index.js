API="http://www.omdbapi.com/?i=tt3896198&apikey=8dede50b";
let search =document.querySelector("#search");
let movie=document.querySelector("#movie");
let movieHub=document.querySelector("#movieHub")
search.addEventListener("submit",(e)=>{
    e.preventDefault();
    let query=movie.value.trim();
    if(query.length<1)return; 
    // console.log(query);
     searchMovies(query);
})

async function searchMovies(query){
    movieHub.innerHTML=`<div class="loader"></div>`
let response= await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=8dede50b&s=${query}`);
let data =await response.json();
// console.log(data);
if(data.Response==="True")display(data.Search);
else movieHub.innerHTML=`<p>${data.Error}</p>`;
}

function display(data){
    movieHub.textContent="";
    data.forEach((movie) => {
    const div=document.createElement("div");

    div.dataset.imdbID=movie.imdbID;
    div.setAttribute("class","movie-card")

    div.innerHTML=`
        <div>
            <img src=${movie.Poster} alt="">
        </div>
         <div>
         <p>${movie.Title}</p>
         <p>${movie.Year}</p>
         </div>
    `
    movieHub.append(div);
    });
}
movieHub.addEventListener("click",(e)=>{
    e.stopPropagation();

   const moviecard= e.target.closest(".movie-card")
   const imdbID=moviecard.dataset.imdbID;
   location.href=`details.html?id=${imdbID}`;
   console.log(imdbID);
})