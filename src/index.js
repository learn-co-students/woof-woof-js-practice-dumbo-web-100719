let dogBarDiv = document.getElementById('dog-bar')
let dogInfoDiv = document.getElementById('dog-info')
let dogFilterButton = document.getElementById("good-dog-filter")


function addPupToSpan(pup){
    let pupSpan = document.createElement("span")
    pupSpan.innerText = pup.name
    pupSpan.className = pup.id
    dogBarDiv.append(pupSpan)
   
  pupSpan.addEventListener("click", (pup) => {
    fetch(`http://localhost:3000/pups/${pupSpan.className}`)
    .then(resp => resp.json())
    .then((pup) => {
      dogInfoDiv.innerText= ""
      createNewPup(pup)
    })
        
  })
}

 function createNewPup(pup){
    let pupImage = document.createElement("img")
    let pupH2 = document.createElement("h2")
    let pupButton = document.createElement("button")
    
    pupImage.src = pup.image
    pupH2.innerText = pup.name
  
    pup.isGoodDog ? pupButton.innerText = "Good Dog!" : pupButton.innerText = "Bad Dog!"
        
 

    pupButton.addEventListener("click", () => {
        fetch(`http://localhost:3000/pups/${pup.id}`, {
          method:'PATCH',
          headers: { 
             'Content-type': 'application/json',
             'accept': 'application/json'
          },
          body: JSON.stringify({
            isGoodDog: !pup.isGoodDog
          })
        })
        .then(resp => resp.json())
        .then((updatedPup) => {
            pup.isGoodDog = updatedPup.isGoodDog
            if(pup.isGoodDog === true){
                pupButton.innerText = "Good Dog!"
              }else{
                pupButton.innerText = "Bad Dog!"
              }

        })
    })
        
    dogInfoDiv.append(pupImage, pupH2, pupButton)
 }

dogFilterButton.addEventListener("click", (button) => {
  if(dogFilterButton.innerText === "Filter good dogs: OFF"){
    dogFilterButton.innerText = "Filter good dogs: ON"
    dogBarDiv.innerText = ""
    fetch(`http://localhost:3000/pups`)
    .then(resp => resp.json())
    .then((puppies) => {
      puppies.forEach((pup) => {
        if(pup.isGoodDog === true){
          addPupToSpan(pup)
        }
      })
    })
  } else {
    dogFilterButton.innerText = "Filter good dogs: OFF"
    dogBarDiv.innerText = ""
    getAllPuppies()
  }
})
function getAllPuppies(){
  fetch("http://localhost:3000/pups")
  .then(resp => resp.json())
  .then((pupObj) => {
      pupObj.forEach((pup) => {
          addPupToSpan(pup)
      })
  })
}
getAllPuppies()