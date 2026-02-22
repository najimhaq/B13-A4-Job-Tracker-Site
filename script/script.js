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
  const card = e.target.closest('.job');
  if (!card) return;

  // Get job details
  const company = card.querySelector('.company')?.textContent;
  const position = card.querySelector('.position')?.textContent;
  const location = card.querySelector('.location')?.textContent;
  const salary = card.querySelector('.salary')?.textContent;
  const desc = card.querySelector('.descriptionJob')?.textContent;

  // Check if we have all info
  if (!company || !position) {
    alert('❌ Missing Information - Please check the job card');
    return;
  }

  // Create job object
  const job = {
    company: company.trim(),
    position: position.trim(),
    location: location?.trim() || 'No location',
    salary: salary?.trim() || 'No salary',
    description: desc?.trim() || 'No description',
    id: Date.now(),
  };

  
  let duplicateJob = false;
  for (let i = 0; i < interviewList.length; i++) {
    if (
      interviewList[i].company === job.company && 
      interviewList[i].position === job.position
    ) {
      duplicateJob = true;
      break;
    }
  }

  if (duplicateJob) {
    alert('This job is already saved!');
    return;
  }

  interviewList.push(job); 
  console.log(interviewList)

});

// Add this to load saved jobs when page starts
/* const savedJobs = localStorage.getItem('interviewList');
if (savedJobs) {
  interviewList = JSON.parse(savedJobs);
  console.log('Loaded', interviewList.length, 'saved jobs');
} */

/* job1 ---- company position location salary inner-apply-btn descriptionJob inner-interview-btn inner-rejected-btn */
