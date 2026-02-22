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
const filterSec = document.getElementById('filtered-section');

//calculate total job count
function calculateJobCount() {
  totalCount.innerText = totalCards.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
calculateJobCount();

//toggle
function toggleBtn(id) {
  // সব বাটন থেকে bg color রিমুভ করি
  allBtn.classList.remove('bg-[#3B82F6]', 'text-white');
  interviewBtn.classList.remove('bg-[#3B82F6]', 'text-white');
  rejectedBtn.classList.remove('bg-[#3B82F6]', 'text-white');

  // সব বাটনে text color যোগ করি
  allBtn.classList.add('text-[#64748B]');
  interviewBtn.classList.add('text-[#64748B]');
  rejectedBtn.classList.add('text-[#64748B]');

  // যে বাটনে ক্লিক করেছে, তাতে bg color যোগ করি
  const selected = document.getElementById(id);
  selected.classList.add('bg-[#3B82F6]', 'text-white');

  // ✅ ফিল্টার সেকশন দেখানো/লুকানো
  if (id === 'interview-filter-btn') {
    // ইন্টারভিউ বাটনে ক্লিক করলে
    totalCards.classList.add('hidden'); // all cards লুকাও
    filterSec.classList.remove('hidden'); // filter section দেখাও

    // শুধু ইন্টারভিউ jobs দেখাও
    showInterviewJobs();
  } else if (id === 'rejected-filter-btn') {
    // রিজেক্টেড বাটনে ক্লিক করলে
    totalCards.classList.add('hidden');
    filterSec.classList.remove('hidden');

    // শুধু রিজেক্টেড jobs দেখাও
    showRejectedJobs();
  } else {
    // All বাটনে ক্লিক করলে
    totalCards.classList.remove('hidden'); // all cards দেখাও
    filterSec.classList.add('hidden'); // filter section লুকাও
  }
}

// শুধু ইন্টারভিউ jobs দেখানোর ফাংশন
function showInterviewJobs() {
  filterSec.innerHTML = '';

  for (let job of interviewList) {
    let div = document.createElement('div');
    div.className = 'rounded-xl shadow p-6 border border-gray-100';
    div.innerHTML = `
      <div class="flex md:justify-between">
        <div>
          <div>
            <h2 class="company text-xl text-[#002C5C] font-medium mb-1">${job.company}</h2>
            <p class="position text-[#64748B] mb-1">${job.position}</p>
            <p class="location text-[#64748B] mb-5">${job.location}</p>
          </div>
          <div>
            <p class="salary text-[#64748B] mb-5">${job.salary}</p>
            <button class="inner-apply-btn btn btn-soft bg-green-500 text-white mb-2">Applied</button>
            <p class="descriptionJob text-[#323B49] font-normal mb-7">${job.description}</p>
          </div>
          <div>
            <button class="btn bg-gray-400 text-white opacity-50 cursor-not-allowed" disabled>Interviewed</button>
            <button class="btn bg-gray-400 text-white opacity-50 cursor-not-allowed" disabled>Rejected</button>
          </div>
        </div>
        <div>
          <i class="ri-delete-bin-6-line text-[#64748B]/70 border-2 border-gray-200 rounded-full p-2 cursor-pointer"></i>
        </div>
      </div>
    `;
    filterSec.appendChild(div);
  }
}

// শুধু রিজেক্টেড jobs দেখানোর ফাংশন
function showRejectedJobs() {
  filterSec.innerHTML = '';

  for (let job of rejectedList) {
    let div = document.createElement('div');
    div.className = 'rounded-xl shadow p-6 border border-gray-100';
    div.innerHTML = `
      <div class="flex md:justify-between">
        <div>
          <div>
            <h2 class="company text-xl text-[#002C5C] font-medium mb-1">${job.company}</h2>
            <p class="position text-[#64748B] mb-1">${job.position}</p>
            <p class="location text-[#64748B] mb-5">${job.location}</p>
          </div>
          <div>
            <p class="salary text-[#64748B] mb-5">${job.salary}</p>
            <button class="inner-apply-btn btn btn-soft bg-red-500 text-white mb-2">Rejected</button>
            <p class="descriptionJob text-[#323B49] font-normal mb-7">${job.description}</p>
          </div>
          <div>
            <button class="btn bg-gray-400 text-white opacity-50 cursor-not-allowed" disabled>Interview</button>
            <button class="btn bg-gray-400 text-white opacity-50 cursor-not-allowed" disabled>Rejected</button>
          </div>
        </div>
        <div>
          <i class="ri-delete-bin-6-line text-[#64748B]/70 border-2 border-gray-200 rounded-full p-2 cursor-pointer"></i>
        </div>
      </div>
    `;
    filterSec.appendChild(div);
  }
}

mainContainer.addEventListener('click', (e) => {
  if (e.target.id === 'inner-interview-btn') {
    const interviewButton = e.target;
    const card = e.target.closest('.job');
    if (!card) return;

    // Get job details
    const company = card.querySelector('.company')?.textContent;
    const position = card.querySelector('.position')?.textContent;
    const location = card.querySelector('.location')?.textContent;
    const salary = card.querySelector('.salary')?.textContent;
    const desc = card.querySelector('.descriptionJob')?.textContent;
    const applyButton = card.querySelector('.inner-apply-btn');
    const rejectedButton = card.querySelector('#inner-rejected-btn');

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

    // Duplicate check
    let duplicateJob = false;
    for (let i = 0; i < interviewList.length; i++) {
      if (interviewList[i].company === job.company && interviewList[i].position === job.position) {
        duplicateJob = true;
        break;
      }
    }

    if (duplicateJob) {
      alert('This job is already saved!');
      return;
    }

    // Change button text
    if (applyButton) {
      applyButton.textContent = 'Applied';
      applyButton.classList.remove('bg-[#EEF4FF]', 'text-[#002C5C]');
      applyButton.classList.add('bg-green-500', 'text-white');
    }

    // DISABLE INTERVIEW BUTTON
    if (interviewButton) {
      interviewButton.disabled = true;
      interviewButton.textContent = 'Interviewed';
      interviewButton.classList.remove('btn-outline', 'btn-success');
      interviewButton.classList.add(
        'bg-gray-400',
        'text-white',
        'border-gray-400',
        'opacity-50',
        'cursor-not-allowed'
      );
    }


    //interview list push
    interviewList.push(job);
    console.log('Interview List:', interviewList);

    // Update counts
    calculateJobCount();
  }
});
