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
console.log(mainContainer);

//calculate total job count
function calculateJobCount() {
  totalCount.innerText = totalCards.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
calculateJobCount();

//toggle
function toggleBtn(id) {
  allBtn.classList.remove('bg-[#3B82F6]', 'text-white');
  interviewBtn.classList.remove('bg-[#3B82F6]', 'text-white');
  rejectedBtn.classList.remove('bg-[#3B82F6]', 'text-white');

  allBtn.classList.add('text-[#64748B]');
  interviewBtn.classList.add('text-[#64748B]');
  rejectedBtn.classList.add('text-[#64748B]');
  //adding for current btn
  const selected = document.getElementById(id);
  selected.classList.add('bg-[#3B82F6]', 'text-white');
}
mainContainer.addEventListener('click', (e) => {
  const container = e.target.closest('.job1');
  const companyName = container.querySelector('.location').textContent;
  console.log(companyName);
});
/* job1 ---- company position location salary inner-apply-btn descriptionJob inner-interview-btn inner-rejected-btn */

