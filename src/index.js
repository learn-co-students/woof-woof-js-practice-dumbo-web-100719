//Fetching the dogs for the dog bar and adding their names by passing in the function:
fetch("http://localhost:3000/pups")
.then(r => r.json())
.then((dogObj) => {
    dogObj.forEach((dog) => {
        createAndAddDogToSpan(dog)
    })
})
//Grabbed the containers for the dog-bar and dog-info
let dogDiv = document.getElementById("dog-bar")
let dogInfoDiv = document.getElementById("dog-info")

//Made a function to add elements to the dog-info container and added and event listener on the dog-bar to click to the dog's page
function createAndAddDogToSpan(dog){
    let dogSpan = document.createElement("span")
        dogSpan.innerText = dog.name
    dogDiv.append(dogSpan)
    let dogImg = document.createElement("img")
        dogImg.src = dog.image
    let dogH2 = document.createElement("h2")
        dogH2.innerText = dog.name
    let dogButton = document.createElement("button")
        dogButton.innerText = dog.isGoodDog ? "Good Dog":"Bad Dog"
    
    dogSpan.addEventListener("click", () => {
        dogInfoDiv.innerText = " "
        dogInfoDiv.append(dogImg, dogH2, dogButton)  
        
    })
    //Added an event listener to update the isGoodDog status on the dogButton inside the dog-info container 

    dogButton.addEventListener("click", () => {
       !dog.isGoodDog //changing the JS memory  

        fetch(`http://localhost:3000/pups/${dog.id}`, {
          method:'PATCH',
         headers: { 
             'Content-type': 'application/json',
             'Sccept': 'application/json'
         },
         body: JSON.stringify({
             isGoodDog: !dog.isGoodDog
          })
        })
        .then(resp => resp.json())
        .then((dog) => {
            dogButton.innerText = dog.isGoodDog ? "Good Dog":"Bad Dog"
        })  
    })
}





