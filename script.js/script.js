const totalCount = document.getElementById('total');
const interviewCount = document.getElementById('interview');
const rejectCount = document.getElementById('rejected');
const totalCards = document.getElementById('all-cards');

//calculate total job count
function calculateJobCount() {
  totalCount.innerText = totalCards.children.length;
}
calculateJobCount();

//
