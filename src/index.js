let allDogsInBar = document.querySelector('#dog-bar');
let dogInfo = document.querySelector('#dog-info');
fetch('http://localhost:3000/pups')
   .then(response => response.json())
   .then(arrOfDogs=> 
   {
       for(let dog of arrOfDogs)
         allDogSpan(dog);
   })


function allDogSpan(dog)
{
  let nameDogSpan = document.createElement('span');
  nameDogSpan.innerText = dog.name
  allDogsInBar.append(nameDogSpan);
  nameDogSpan.addEventListener('click',(event) => {
       dogInfo.innerHTML = ""

       let dogsImg = document.createElement('img');
       dogsImg.src = dog.image;

       let dogsName = document.createElement('h2');
       dogsName.innerText = dog.name;
       
       let dogsButton = document.createElement('button')
       dog.isGoodDog ? dogsButton.innerText = "Good Dog!" :  dogsButton.innerText = "Bad Dog!";
       
       
       dogInfo.append(dogsImg);
       dogInfo.append(dogsName);
       dogInfo.append(dogsButton);

       dogInfo.addEventListener('click', (event) => {
           dog.isGoodDog = !dog.isGoodDog
          fetch(`http://localhost:3000/pups/${dog.id}`, { //eslint-disable-line 
            method: 'PATCH',
            headers: {
              'content-type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({
               isGoodDog: dog.isGoodDog
            })
          })
            .then(response => response.json())
            .then(res => {
              // let newGoodDot = res.isGoodDog;
              // res.isGoodDog = !newGoodDot

               dog.isGoodDog ? dogsButton.innerText = "Good Dog!" :  dogsButton.innerText = "Bad Dog!";
            })
          
       })
       
  })
    
      
       
   
}
  

