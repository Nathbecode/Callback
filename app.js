
// const color = () => {
//     setTimeout(() => {
//         body.style.backgroundColor = 'blue';
//         setTimeout(() => {
//             body.style.backgroundColor = 'yellow';
//             setTimeout(() => {
//                 body.style.backgroundColor = 'red';
//                 setTimeout(() => {
//                     body.style.backgroundColor = 'cyan';
//                     setTimeout(() => {
//                         body.style.backgroundColor = 'violet';
//                         setTimeout(() => {
//                             body.style.backgroundColor = 'green';
//                             setTimeout(() => {
//                                 body.style.backgroundColor = 'purple';
//                             }, 1000);
//                         }, 1000);
//                     }, 1000);
//                 }, 1000);
//             }, 1000);
//         }, 1000);
//     }, 1000);
// };

// color();
const body = document.querySelector('body');

// const colorPromises = (color) => {
//     return new Promise((resolve, reject) => {
//         if (color) {
//             setTimeout(() => {
//                 body.style.backgroundColor = color;
//                 resolve();
//             }, 1000);
//         } else {
//             reject(new Error('No color provided'));
//         }
//     });
// };

// colorPromises('blue')
//     .then(() => colorPromises('yellow'))
//     .then(() => colorPromises('red'))
//     .then(() => colorPromises('cyan'))
//     .then(() => colorPromises('violet'))
//     .then(() => colorPromises('green'))
//     .then(() => colorPromises('purple'))
//     .catch((error) => console.error(error));

//FUNCTION RAINBOW BUT WITH A RAMDOM DELAY AND A CONDITION

// const generateBG=(color)=> {
//     const delay = Math.random();
//     return new Promise((resolve, reject) => {
//                 if (delay<0.5) {
//                     setTimeout(() => {
//                         body.style.backgroundColor = color;
//                         resolve();
//                     }, delay);
//                 } else {
//                     reject(new Error('oh no! an error!'));
//                 }
// })
// }

// const myFunc = async()=> {
//     await generateBG('blue');
//     await generateBG('yellow');
//     await generateBG('red');
//     await generateBG('cyan');
//     await generateBG('violet');
//     await generateBG('green');
//     await generateBG('purple');
// }

// myFunc();

//#region FETCH 

// fetch("https://catfact.ninja/fact")
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//TWO DIFFERENTS WAYS TO OBTAIN SAME THING:

// const fetchData = async () => {
//     const res = await fetch("https://catfact.ninja/fact");
//     const data = await res.json();
//     console.log(data);
//   };

//   fetchData();

// console.log(fetch("https://catfact.ninja/fact", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     }, // etc.
//   }))

//#region API PAG USERS 

// document.getElementById('getText').addEventListener('click', getText);

// function getText() {
//     fetch('sample.json')
//     .then(function(res){
//         return res.json();
//     })
//     .then(function(data) {
//         let output = "<h2>Users are:</h2>";
//         data.forEach(element => {
//             output += `
//             <ul>
//                 <li>ID: ${element.id}</li>
//                 <li>Name: ${element.name}</li>
//                 <li>Email: ${element.email}</li>
//             </ul>
//             `;
//         })
//         document.getElementById('output').innerHTML = output;
//     })
//     .catch((err) => console.log(err));
// }

//#region API EXERCISE

document.getElementById('getMeal').addEventListener('click', getMeal);


function getMeal() {
    let letre = document.getElementById('input').value;
    if(letre.length === 1){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letre}`)
        .then(function(res){
            return res.json();
        })
        .then(function(data) {
            let output = `<h2>The results for "${letre}"</h2>
                <div class="container">`
            data.meals.forEach(element => {
                output += `
                    <div class="meal" data-meal='${JSON.stringify(element)}'>
                        <ul>
                            <li><img src="${element.strMealThumb}" class="imagen"></li>
                            <li>${element.strMeal}</li>
                        </ul>
                    </div>`
            });
            document.getElementById('output').innerHTML = output;
            output += '</div>'
            document.querySelectorAll('.imagen').forEach((ele)=> {
                ele.style.width = '100%';
                ele.style.transition= 'width 0.3s ease-in-out';
            })
            document.querySelector('.container').addEventListener('click',(e)=>{
                const mealElement = e.target.closest('.meal');
                if(mealElement){
                    const mealData = JSON.parse(mealElement.getAttribute('data-meal'));
                    showModal(mealData);}
            })
        })            
        .catch((err) => console.log(err));
    }  
    else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${letre}`)
        .then(function(res){
            return res.json();
        })
        .then(function(data) {
            let output = `<h2>The results for "${letre}"</h2>
                <div class="container">`
            data.meals.forEach(element => {
                output += `
                    <div class="meal" data-meal='${JSON.stringify(element)}'>
                        <ul>
                            <li><img src="${element.strMealThumb}" class="imagen"></li>
                            <li>${element.strMeal}</li>
                        </ul>
                    </div>`;
            });
            document.getElementById('output').innerHTML = output;
            output += '</div>'
            document.querySelectorAll('.imagen').forEach((ele)=> {
                ele.style.width = '100%';
                ele.style.transition= 'width 0.3s ease-in-out';
            })
            document.querySelector('.container').addEventListener('click',(e)=>{
                const mealElement = e.target.closest('.meal');
                if(mealElement){
                    const mealData = JSON.parse(mealElement.getAttribute('data-meal'));
                    showModal(mealData)}})
        })
        .catch((err) => console.log(err));
    }}

    function showModal(mealData) {
        let modal = document.getElementById("myModal");
        let span = document.getElementsByClassName("close")[0];
        let body = document.querySelector('body');
        
        let modalContent;

    if (mealData === null) {
        modalContent = `
            <p></p>
        `;
    } else {
        modalContent = `
            <h2>${mealData.strMeal}</h2>
            <img src="${mealData.strMealThumb}" class="img-modal">
            <p><strong>Ingredients :</strong><br></p>
            <ul>`;

        for (let i = 1; i <= 20; i++) {
            const ingredient = mealData[`strIngredient${i}`];
            const measure = mealData[`strMeasure${i}`];
            if (ingredient && measure) {
                modalContent += `<li>${ingredient}, ${measure}</li>`;
            }
        }
        modalContent += `
            </ul> <br>
            <p>${mealData.strInstructions.replace(/\r\n/g, '<br>')}</p>
        `;
    }

        document.querySelector('.modal-content .mealcontent').innerHTML = modalContent;
    
        modal.style.display = "block";
        body.style.position = 'fixed';
    
        span.onclick = function() {
            modal.style.display = "none";
            body.style.position = 'static';
        }
    
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                body.style.position = 'static';
            }
        }
    }

