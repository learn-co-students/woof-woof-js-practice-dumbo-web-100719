let dogBar = document.getElementById("dog-bar")
let allDogInfoArea = document.getElementById("dog-info")

let filterButton = document.getElementById("good-dog-filter")
let onOrOff = filterButton.querySelector("span")

// let allTheGoodBoys = []



//when we click the filter button we want:
//  - off to switch to on
//      - if off, dog bar shows all dogs
//      - if on, dog bar just shows good dogs




fetch("http://localhost:3000/pups")
.then(r => r.json())
.then((dogs) => {
    
    
    
    
    dogs.forEach((dog) => {
        addDogToBar(dog)
        
        // if (dog.isGoodDog == true) {
        //     allTheGoodBoys.push(dog)
        // } 

    })
    
    let allDogsSpan = dogBar.querySelectorAll("span")
    console.log(allDogsSpan)


    filterButton.addEventListener("click", (event) => {

        
        // console.log(dogBar)
        if (onOrOff.innerText === "OFF") {
            onOrOff.innerText = "ON"
            allDogsSpan.forEach((dogSpanTag) => {
                
                if (dogSpanTag.dataset.isGoodDog === "false"){
                    dogBar.removeChild(dogSpanTag)
                } else {
                    dogBar.appendChild(dogSpanTag)
                }
            })
        } else {
            onOrOff.innerText = "OFF"
            allDogsSpan.forEach((dogSpanTag) => {
                dogBar.appendChild(dogSpanTag)
            })
            // dogBar.remove(dogSpan)
            // // dogBar.append(dog) 
        }
        })
})



function addDogToBar(dog){
    let dogSpan = document.createElement("span")
    dogSpan.dataset.isGoodDog = dog.isGoodDog
    
    dogSpan.innerText = dog.name
    dogBar.append(dogSpan)
    

    dogSpan.addEventListener('click', (event) => {
        allDogInfoArea.removeChild(allDogInfoArea.firstChild)
        
        let dogDiv = document.createElement("div")
        let dogHTwo = document.createElement("h2")
        let dogImg = document.createElement("img")
        let dogButton = document.createElement("button")
        
        dogHTwo.innerText = dog.name
        dogImg.src = dog.image
        dogButton.innerText = `${ dog.isGoodDog ? "Good Dog" : "Bad Dog"}`
        
        dogDiv.append(dogHTwo, dogImg, dogButton)
        allDogInfoArea.append(dogDiv)
        
        
        dogButton.addEventListener("click", (event) => {
            dog.isGoodDog = !dog.isGoodDog
            
            fetch(`http://localhost:3000/pups/${dog.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    isGoodDog: dog.isGoodDog
                })
            })
            .then(r => r.json())
            .then((updatedDog) => {
                dogButton.innerText = `${ dog.isGoodDog ? "Good Dog" : "Bad Dog"}`
                dogSpan.dataset.isGoodDog = dog.isGoodDog
            })
        })

    })
}