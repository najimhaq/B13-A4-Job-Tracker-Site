let interviewList = [];
let rejectedList = [];
let totalCount = document.getElementById('total');
let interviewCount = document.getElementById('interview');
let rejectedCount = document.getElementById('rejected');

let allBtn = document.getElementById('all-filter-btn');
let interviewBtn = document.getElementById('interview-filter-btn');
let rejectedBtn = document.getElementById('rejected-filter-btn');
const totalCards = document.getElementById('all-cards');
const mainContainer = document.querySelector('main');
console.log(mainContainer)

//calculate total job count
function calculateJobCount() {
  totalCount.innerText = totalCards.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
calculateJobCount();

//toggle
function toggleBtn(id){
  
}
