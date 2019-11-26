document.addEventListener('DOMContentLoaded',() => {
    console.log('done')
    let filterButton = document.querySelector('#good-dog-filter')
    filterButton.setAttribute('value', false)
    // filterDogButton()
    fetchDogs()
    

})

let fetchDogs = () => {

    const url = `http://localhost:3000/pups`
    fetch(url, {
      method:'GET',
     headers: { 
         'Content-type': 'application/json',
         'accept': 'application/json'
     }
    })
    .then(resp => resp.json())
    .then(buildList)
    .catch((error) => {console.error(error);})
   
}

let buildList = (dogObject) => {
    // console.log(dogFiltered)
    // dogFiltered.forEach((indivDog) => {
    //         addDogSpan(indivDog)
        
    // })
    console.log(dogObject)
    dogObject.forEach((indivDog) => {
        addDogSpan(indivDog)
    
    })
    filterDogButton(dogObject)
}

let addDogSpan = (indivDog) => {
    let dogBar = document.querySelector('#dog-bar')
    let dogSpan = document.createElement('span')
    dogSpan.addEventListener('click', () => {
        removeDogInfo()
        showDogInfo(indivDog)
    })
    dogSpan.innerText = indivDog.name
    dogBar.append(dogSpan)

}


let showDogInfo = (dogInfo) => {
    
    let dogInfoDiv = document.querySelector('#dog-info')
    let dogImage = document.createElement('img')
    dogImage.src = dogInfo.image
    let dogH2 = document.createElement('h2')
    dogH2.innerText = dogInfo.name
    let dogButton = document.createElement('button')
    dogButton.innerText = dogInfo.isGoodDog? 'Good Dog!': 'Bad Dog!'

    dogButton.addEventListener('click', () => {
       dogInfo.isGoodDog = !dogInfo.isGoodDog
       dogButton.innerText = dogInfo.isGoodDog? 'Good Dog!': 'Bad Dog!'
       patchDogInfo(dogInfo)
    })

    dogInfoDiv.append(dogImage,dogH2,dogButton)
}

let patchDogInfo = (dogInfo) => {
    const url = `http://localhost:3000/pups/${dogInfo.id}`
    fetch(url, {
      method:'PATCH',
     headers: { 
         'Content-type': 'application/json',
         'accept': 'application/json'
     },
     body: JSON.stringify({
    isGoodDog: dogInfo.isGoodDog
      })
    })
    .then(resp => resp.json())
    .then(json_resp => {console.log(json_resp)})
    .catch((error) => {console.error(error);})
    
}

let filterDogButton = (dogObject) => {
   
    
    let filterButton = document.querySelector('#good-dog-filter')
    // let filter = filterButton.value
   
    filterButton.addEventListener('click', () => {
        let filter = false
        // filter = filterButton.value? true:false
        filter = !filter
        filterButton.innerText = `Filter good dogs: ${filter? 'ON':'OFF'}`
    
        let dogFiltered = dogObject.filter((dog) => {
            return dog.isGoodDog === filter
        })
        removeDogBarInfo()
        buildList(dogFiltered)
    })
    
}
let removeDogInfo = () => {
    let dogInfoDiv = document.querySelector('#dog-info')
    dogInfoDiv.innerHTML = ''
}

let removeDogBarInfo = () => {
    let dogBarDiv = document.querySelector('#dog-bar')
    dogBarDiv.innerHTML = ''
}
