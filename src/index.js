let dogBarDiv = document.querySelector('#dog-bar')
let dogInfoDiv = document.querySelector('#dog-info')
let goodDogFilterButton = document.querySelector('#good-dog-filter')
let goodDogStatus = true

goodDogFilterButton.addEventListener('click',(evt) => {
    
    goodDogStatus = !goodDogStatus
    goodDogFilterButton.innerText = `${ goodDogStatus ? "OFF!" : "ON!"}`

    fetch('http://localhost:3000/pups')
    .then(r => r.json())
    .then((dogArr) => {
           
        let filtereddogs = dogArr.filter(dog => dog.isGoodDog)

        

    })
})





let getAllDogs = () => {
    fetch(`http://localhost:3000/pups`)
    .then(resp => resp.json())
    .then(dogArray => {
        dogArray.forEach(dog => {
            addDogToDogBar(dog)
        });
    })
}

// function getDogs(){
//     fetch(`url`)
//     .then(resp => resp.json())
//     .then((dogArr) => {
//         dogArr.forEach((dog) => {
//             let dogLi = document.createElement()
//         })
//     }).then()
// }

let addDogToDogBar = (dogObj) => {
    let dogSpan = document.createElement("span")
    dogSpan.innerText = dogObj.name
    dogSpan.addEventListener("click", (event) => {
        let dogImg = document.createElement("img")
        dogImg.src = dogObj.image
        let dogH2 = document.createElement("h2")
        dogH2.innerText = dogObj.name
        let dogButton = document.createElement("button")
        dogButton.innerText = `${dogObj.isGoodDog ? "Good Dog!" : "Bad Dog!"}`
        dogButton.addEventListener("click", (evt) => {
            console.log(evt.target)
            dogObj.isGoodDog = !dogObj.isGoodDog
            fetch(`http://localhost:3000/pups/${dogObj.id}`, {
              method:'PATCH',
             headers: { 
                 'Content-type': 'application/json',
                 'accept': 'application/json'
             },
             body: JSON.stringify({
            isGoodDog: dogObj.isGoodDog
              })
            })
            .then(resp => resp.json())
            .then((dog) =>{
                dogButton.innerText = `${dogObj.isGoodDog ? "Good Dog!" : "Bad Dog!"}`

            } )
        })
        dogInfoDiv.append(dogImg, dogH2, dogButton)
    })
    dogBarDiv.append(dogSpan)
}

getAllDogs()

