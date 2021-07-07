const dogBar = document.querySelector("#dog-bar")
const dogInfoDiv = document.querySelector('#dog-info')
fetchDogInfo()

function fetchDogInfo(){
    fetch("http://localhost:3000/pups")
    .then(r => r.json())
    .then((dogObj) => {
        dogObj.forEach((dog) => {
            renderDogName(dog)
        })
    })
}

function renderDogName(dog){
    let dogSpan = document.createElement("span")
    dogSpan.innerText = dog.name
    dogSpan.id = dog.id
    dogBar.append(dogSpan)
    renderDogInfo(dogSpan, dog)
}

function renderDogInfo(dogSpan, dog){
    dogSpan.addEventListener("click", (event) => { 
        dogInfoDiv.removeChild(dogInfoDiv.firstChild)
        let dogDiv = document.createElement('div')
        let dogImg = document.createElement('img')
        dogImg.src = dog.image
        let dogH2 = document.createElement('h2')
        dogH2.innerText = dog.name
        let dogBtn = document.createElement('button')
        dog.isGoodDog ? `${dogBtn.textContent  = 'Good Dog!'}`: `${dogBtn.textContent = 'Bad Dog!'} `  
        dogDiv.append(dogImg, dogH2, dogBtn)
        dogInfoDiv.append(dogDiv)
        dogBtn.addEventListener( 'click', (e)=>{
        //    dog.isGoodDog ? `${e.target.textContent  = 'Bad Dog!'}`: `${e.target.textContent = 'Good Dog!'} `
                //    changing what is displayed on the DOM
                dogBtn.innerText = `${ dog.isGoodDog ? "Good Dog!" : "Bad Dog!" }`
                // changing JS memory
                dog.isGoodDog = !dog.isGoodDog
            fetch(`http://localhost:3000/pups/${dog.id}`,{
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                // updating the DB
                body: JSON.stringify({
                    isGoodDog: dog.isGoodDog
                })
            })
            .then(res => res.json())
            .then(data => {
            })
        })
 })
}