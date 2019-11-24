// do the bonus this week, and also ask about how to toggle boolean values

document.addEventListener("DOMContentLoaded", event => {

    const filterDogsButton= document.getElementById("good-dog-filter")

    fetch("http://localhost:3000/pups")
    .then(r => r.json())
    .then(puppyArray => {

        // let goodDogs= []

        // let allDogs= []

        // puppyArray.forEach(puppyObj => {
        //     if puppyObj.isGoodDog 
        //     goodDogs.push(puppyObj)
        //     else
        //     allDogs.push(puppyObj)

        // })
        // closes out the puppyArray forEach statment

            // if filter is on only show the good dogs, if it is off, show all of the dogs

        // if I have time this week, I will try to figure this bonus out

        puppyArray.forEach(listThePuppies)

    })
    // closes out the 2nd .then statement


})
// closes out the first event listener

function listThePuppies(puppyObj) {

    let theDogsDiv= document.getElementById("dog-bar")

    let dogSpan= document.createElement("span")

    dogSpan.innerText= puppyObj.name

    theDogsDiv.append(dogSpan)

    dogSpan.addEventListener("click", (event) => {    
        
    let dogInformationDiv= document.getElementById("dog-info")
    let dogHeading= document.createElement("h2")
    dogHeading.innerText= puppyObj.name
    let dogImg= document.createElement("img")
    dogImg.src= puppyObj.image
    let goodOrBadButton= document.createElement("button")
    goodOrBadButton.innerText= `${puppyObj.isGoodDog ? "Good Dog!" : "Bad Dog!"}`
// figure out how to get only one image, etc. to appear on the page at a time;
    goodOrBadButton.addEventListener("click", (event) => {
goodOrBadButton.innerText= `${goodOrBadButton.innerText== "Good Dog!"? "Bad Dog!" : "Good Dog!"} `

        fetch(`http://localhost:3000/pups/${puppyObj.id}`, {
        method: "PATCH",
        headers: {
            "content-type" : "application/json", 
            "accept" : "application/json"
        },
        // closes out the headers section
        body: JSON.stringify({
            "isGoodDog": `${goodOrBadButton.innerText=="Bad Dog!"? false : true}`
            // for some reason false and true are strings instead of boolean values when I switch their status by clicking the button
            // ask how to fix this

        })
        // closes out the body section
        

    })
    // closes out the 1st part of the fetch body for the patch
    .then(r => r.json())
    .then (puppy => {
        goodOrBadButton.innerText
    })
    // closes out the second .then statement

    })
    // closes out the event listener for the goodOrBadButton

    dogInformationDiv.append(dogHeading, dogImg, goodOrBadButton)    
    })
    // closes out event listener for when a dog Span is clicked on

}
// closes out the function listThePuppies