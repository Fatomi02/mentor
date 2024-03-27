// Selecting DOM elements
const startBtn = document.querySelector("#startBtn"),
  endBtn = document.querySelector("#endBtn"),
  prevNext = document.querySelectorAll(".prevNext"),
  numbers = document.querySelectorAll(".link");
const contents = [{
    img: 'assets/img/course-details-tab-1.png',
    text: "Technique"
},
{
    img: 'assets/img/course-details-tab-1.png',
    text: "Technique"
},
{
    img: 'assets/img/course-details-tab-1.png',
    text: "Technique"
},
{
    img: 'assets/img/course-details-tab-1.png',
    text: "Technique"
},
{
    img: 'assets/img/course-details-tab-1.png',
    text: "Technique"
},
{
    img: 'assets/img/course-details-tab-1.png',
    text: "Technique"
},
{
    img: 'assets/img/course-details-tab-1.png',
    text: "Technique"
},
{
    img: 'assets/img/course-details-tab-1.png',
    text: "Technique"
},
{
    img: 'assets/img/course-details-tab-1.png',
    text: "Technique"
},
{
    img: 'assets/img/course-details-tab-1.png',
    text: "Technique"
},
{
    img: 'assets/img/course-details-tab-1.png',
    text: "Technique"
}]
// Setting an initial step
let currentStep = 0;
let html = ''

let defaultList  =   contents.slice(0, 3)
defaultList.forEach((content, idx)=>{
  if((idx+1)%2 != 0)
   html += `
   <div class="row technique">
   <div class="col">
     <img src="${content.img}" alt="" class="img-fluid">

   </div>
   <div class="col d-flex align-items-center  ">
      ${content.text} + ${idx+1}

   </div>
 </div>
 `
 else
  html += `
 <div class="row technique">

 <div class="col d-flex align-items-center  ">
    ${content.text} + ${idx+1}

 </div>
 <div class="col">
 <img src="${content.img}" alt="" class="img-fluid">

</div>
</div>
 `
})

let techniquesEl = document.getElementById("techniques")

techniquesEl.innerHTML = html

// Function to update the button states
const updateBtn = () => {
  // If we are at the last step
  if (currentStep === 4) {
    endBtn.disabled = true;
    prevNext[1].disabled = true;
  } else if (currentStep === 0) {
    // If we are at the first step
    startBtn.disabled = true;
    prevNext[0].disabled = true;
  } else {
    endBtn.disabled = false;
    prevNext[1].disabled = false;
    startBtn.disabled = false;
    prevNext[0].disabled = false;
  }
};

// Add event listeners to the number links
numbers.forEach((number, numIndex) => {
  number.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(numIndex)
    // Set the current step to the clicked number link
    currentStep = numIndex;
   let start = currentStep == 0 ?  0 :  (4 *currentStep)
    let end = currentStep == 0 ? 4*1 :  ((currentStep+1) * 4 )
    
    let filterContents =  contents.slice(start, end)
    let techniquesEl = document.getElementById("techniques")
  
    filterContents.forEach((content, idx)=>{
      if((idx+1)%2 != 0)
       html += `
       <div class="row technique">
       <div class="col">
         <img src="${content.img}" alt="" class="img-fluid">

       </div>
       <div class="col d-flex align-items-center  ">
          ${content.text} + ${idx+1}

       </div>
     </div>
     `
     else
      html += `
     <div class="row technique">
  
     <div class="col d-flex align-items-center  ">
        ${content.text} + ${idx+1}

     </div>
     <div class="col">
     <img src="${content.img}" alt="" class="img-fluid">

   </div>
   </div>
     `
    })

    techniquesEl.innerHTML = html


        // Remove the "active" class from the previously active number link
    Array.from(document.querySelectorAll(".activeIndex")).forEach((item) =>{
        item.classList.remove("activeIndex")
      });

  
    // Add the "active" class to the clicked number link
    number.classList.add("activeIndex");
    updateBtn(); // Update the button states
  });
});

// Add event listeners to the "Previous" and "Next" buttons
prevNext.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Increment or decrement the current step based on the button clicked
    currentStep += e.target.id === "next" ? 1 : -1;
    numbers.forEach((number, numIndex) => {
      // Toggle the "active" class on the number links based on the current step
      number.classList.toggle("activeIndex", numIndex === currentStep);
      updateBtn(); // Update the button states
    });
  });
});

// Add event listener to the "Start" button
startBtn.addEventListener("click", () => {
  // Remove the "active" class from the previously active number link
  Array.from(document.querySelectorAll(".activeIndex")).forEach((item) =>{
    item.classList.remove("activeIndex")
  });
  // Add the "active" class to the first number link
  numbers[0].classList.add("activeIndex");
  currentStep = 0;
  updateBtn(); // Update the button states
  endBtn.disabled = false;
  prevNext[1].disabled = false;
});

// Add event listener to the "End" button
endBtn.addEventListener("click", () => {
  // Remove the "active" class from the previously active number link
  Array.from(document.querySelectorAll(".activeIndex")).forEach((item) =>{
    item.classList.remove("activeIndex")
  });
  // Add the "active" class to the last number link
  numbers[4].classList.add("activeIndex");
  currentStep = 4;
  updateBtn(); // Update the button states
  startBtn.disabled = false;
  prevNext[0].disabled = false;
});
