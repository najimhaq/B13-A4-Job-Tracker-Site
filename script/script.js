let interviewList = [];
let rejectedList = [];
let totalCount = document.getElementById('total');
let interviewCount = document.getElementById('interview');
let rejectedCount = document.getElementById('rejected');

let allBtn = document.getElementById('all-filter-btn');
let interviewBtn = document.getElementById('interview-filter-btn');
let rejectedBtn = document.getElementById('rejected-filter-btn');
let noJobSec = document.getElementById('noJob-section');

const totalCards = document.getElementById('all-cards');
const mainContainer = document.querySelector('main');
const filterSec = document.getElementById('filtered-section');

// ALL FUNCTIONS
// Calculate and update counts
function calculateJobCount() {
  totalCount.innerText = totalCards.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;

  // function Call
  checkAllJobsEmpty();
}
//Empty Function => Job thakle show korbe, na thakle nojosec dekhabe
function checkAllJobsEmpty() {
  if (totalCards.children.length === 0) {
    totalCards.classList.add('hidden');
    noJobSec.classList.remove('hidden');
  } else {
    totalCards.classList.remove('hidden');
    noJobSec.classList.add('hidden');
  }
}

// jodi jo/interview/rejected empty hoy tahole tar function =>
function showEmptyPlaceholder(container, type) {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-xl shadow-sm">
      <img src="./jobs.png" alt="jobs png" class="w-24 h-24 mb-4 opacity-50">
      <h3 class="text-2xl font-semibold text-gray-600 mb-2">No Jobs Available</h3>
      <p class="text-gray-400">You haven't added any ${type.toLowerCase()} jobs yet</p>
    </div>
  `;
}

// ===== Filtering Function =>
//Interview Jobs Function =>
function showInterviewJobs() {
  filterSec.innerHTML = '';

  if (interviewList.length === 0) {
    showEmptyPlaceholder(filterSec, 'Interview');
    return;
  }

  for (let job of interviewList) {
    let div = document.createElement('div');
    div.className = 'job rounded-xl shadow p-6 border border-gray-100';
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
          <i class="delete-icon ri-delete-bin-6-line text-[#64748B]/70 border-2 border-gray-200 rounded-full p-2 cursor-pointer" data-company="${job.company}" data-position="${job.position}"></i>
        </div>
      </div>
    `;
    filterSec.appendChild(div);
  }
  addDeleteListeners();
}

// Rejected Jobs Function =>
function showRejectedJobs() {
  filterSec.innerHTML = '';

  if (rejectedList.length === 0) {
    showEmptyPlaceholder(filterSec, 'Rejected');
    return;
  }

  for (let job of rejectedList) {
    let div = document.createElement('div');
    div.className = 'job rounded-xl shadow p-6 border border-gray-100';
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
          <i class="delete-icon ri-delete-bin-6-line text-[#64748B]/70 border-2 border-gray-200 rounded-full p-2 cursor-pointer" data-company="${job.company}" data-position="${job.position}"></i>
        </div>
      </div>
    `;
    filterSec.appendChild(div);
  }
  addDeleteListeners();
}
// Delete Function =>
function addDeleteListeners() {
  const deleteIcons = document.querySelectorAll('.delete-icon');

  deleteIcons.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      e.stopPropagation();

      const card = icon.closest('.job');
      if (!card) return;

      const company = icon.dataset.company;
      const position = icon.dataset.position;

      if (!confirm(`Delete ${position} at ${company}?`)) return;

      // Remove from both lists
      interviewList = interviewList.filter(
        (job) => !(job.company === company && job.position === position)
      );
      rejectedList = rejectedList.filter(
        (job) => !(job.company === company && job.position === position)
      );

      // Remove card
      card.remove();

      // Update counts
      calculateJobCount();

      // Update current view if in filtered section
      if (!filterSec.classList.contains('hidden')) {
        if (interviewBtn.classList.contains('bg-[#3B82F6]')) {
          showInterviewJobs();
        } else if (rejectedBtn.classList.contains('bg-[#3B82F6]')) {
          showRejectedJobs();
        }
      }

      alert(`✅ Deleted: ${position} at ${company}`);
    });
  });
}
// Toggle Button Function =>
function toggleBtn(id) {
  allBtn.classList.remove('bg-[#3B82F6]', 'text-white');
  interviewBtn.classList.remove('bg-[#3B82F6]', 'text-white');
  rejectedBtn.classList.remove('bg-[#3B82F6]', 'text-white');

  allBtn.classList.add('text-[#64748B]');
  interviewBtn.classList.add('text-[#64748B]');
  rejectedBtn.classList.add('text-[#64748B]');

  const selected = document.getElementById(id);
  selected.classList.add('bg-[#3B82F6]', 'text-white');

  if (id === 'interview-filter-btn') {
    totalCards.classList.add('hidden');
    filterSec.classList.remove('hidden');
    showInterviewJobs();
  } else if (id === 'rejected-filter-btn') {
    totalCards.classList.add('hidden');
    filterSec.classList.remove('hidden');
    showRejectedJobs();
  } else {
    totalCards.classList.remove('hidden');
    filterSec.classList.add('hidden');
    checkAllJobsEmpty(); // Check if All tab is empty
  }
}
// Click Handeler Function =>
mainContainer.addEventListener('click', (e) => {
  // INTERVIEW BUTTON
  if (e.target.id === 'inner-interview-btn') {
    const interviewButton = e.target;
    const card = e.target.closest('.job');
    if (!card) return;

    const company = card.querySelector('.company')?.textContent;
    const position = card.querySelector('.position')?.textContent;
    const location = card.querySelector('.location')?.textContent;
    const salary = card.querySelector('.salary')?.textContent;
    const desc = card.querySelector('.descriptionJob')?.textContent;
    const applyButton = card.querySelector('.inner-apply-btn');
    const rejectedButton = card.querySelector('#inner-rejected-btn');

    if (!company || !position) {
      alert('❌ Missing Information');
      return;
    }

    const job = {
      company: company.trim(),
      position: position.trim(),
      location: location?.trim() || 'No location',
      salary: salary?.trim() || 'No salary',
      description: desc?.trim() || 'No description',
      id: Date.now(),
      status: 'interview',
    };

    // Duplicate check
    for (let i = 0; i < interviewList.length; i++) {
      if (interviewList[i].company === job.company && interviewList[i].position === job.position) {
        alert('This job is already in interview list!');
        return;
      }
    }

    if (applyButton) {
      applyButton.textContent = 'Applied';
      applyButton.classList.remove('bg-[#EEF4FF]', 'text-[#002C5C]');
      applyButton.classList.add('bg-green-500', 'text-white');
    }

    if (interviewButton) {
      interviewButton.disabled = true;
      interviewButton.textContent = 'Interviewed';
      interviewButton.classList.remove('btn-outline', 'btn-success');
      interviewButton.classList.add(
        'bg-gray-400',
        'text-white',
        'opacity-50',
        'cursor-not-allowed'
      );
    }

    if (rejectedButton) {
      rejectedButton.disabled = true;
      rejectedButton.classList.remove('btn-outline', 'btn-secondary');
      rejectedButton.classList.add('bg-gray-400', 'text-white', 'opacity-50', 'cursor-not-allowed');
    }

    // Add delete attribute
    const deleteIcon = card.querySelector('.ri-delete-bin-6-line');
    if (deleteIcon) {
      deleteIcon.setAttribute('data-company', job.company);
      deleteIcon.setAttribute('data-position', job.position);
      deleteIcon.classList.add('delete-icon');
    }

    interviewList.push(job);
    calculateJobCount();
  }

  // REJECTED BUTTON
  if (e.target.id === 'inner-rejected-btn') {
    const rejectedButton = e.target;
    const card = e.target.closest('.job');
    if (!card) return;

    const company = card.querySelector('.company')?.textContent;
    const position = card.querySelector('.position')?.textContent;
    const location = card.querySelector('.location')?.textContent;
    const salary = card.querySelector('.salary')?.textContent;
    const desc = card.querySelector('.descriptionJob')?.textContent;
    const applyButton = card.querySelector('.inner-apply-btn');
    const interviewButton = card.querySelector('#inner-interview-btn');

    if (!company || !position) {
      alert('❌ Missing Information');
      return;
    }

    const job = {
      company: company.trim(),
      position: position.trim(),
      location: location?.trim() || 'No location',
      salary: salary?.trim() || 'No salary',
      description: desc?.trim() || 'No description',
      id: Date.now(),
      status: 'rejected',
    };

    // Duplicate check
    for (let i = 0; i < rejectedList.length; i++) {
      if (rejectedList[i].company === job.company && rejectedList[i].position === job.position) {
        alert('This job is already in rejected list!');
        return;
      }
    }

    if (applyButton) {
      applyButton.textContent = 'Rejected';
      applyButton.classList.remove('bg-[#EEF4FF]', 'text-[#002C5C]');
      applyButton.classList.add('bg-red-500', 'text-white');
    }

    if (rejectedButton) {
      rejectedButton.disabled = true;
      rejectedButton.textContent = 'Rejected';
      rejectedButton.classList.remove('btn-outline', 'btn-secondary');
      rejectedButton.classList.add('bg-gray-400', 'text-white', 'opacity-50', 'cursor-not-allowed');
    }

    if (interviewButton) {
      interviewButton.disabled = true;
      interviewButton.classList.remove('btn-outline', 'btn-success');
      interviewButton.classList.add(
        'bg-gray-400',
        'text-white',
        'opacity-50',
        'cursor-not-allowed'
      );
    }

    // Add delete attribute
    const deleteIcon = card.querySelector('.ri-delete-bin-6-line');
    if (deleteIcon) {
      deleteIcon.setAttribute('data-company', job.company);
      deleteIcon.setAttribute('data-position', job.position);
      deleteIcon.classList.add('delete-icon');
    }

    rejectedList.push(job);
    calculateJobCount();
  }

  // DELETE ICON (Original cards)
  if (e.target.classList.contains('ri-delete-bin-6-line')) {
    const deleteIcon = e.target;
    const card = deleteIcon.closest('.job');
    if (!card) return;

    const company = card.querySelector('.company')?.textContent;
    const position = card.querySelector('.position')?.textContent;

    if (confirm(`Are you sure you want to delete this job?`)) {
      // Remove from interviewList
      for (let i = 0; i < interviewList.length; i++) {
        if (interviewList[i].company === company && interviewList[i].position === position) {
          interviewList.splice(i, 1);
          break;
        }
      }

      // Remove from rejectedList
      for (let i = 0; i < rejectedList.length; i++) {
        if (rejectedList[i].company === company && rejectedList[i].position === position) {
          rejectedList.splice(i, 1);
          break;
        }
      }

      card.remove();
      calculateJobCount();
      alert('✅ Job deleted successfully!');
    }
  }
});

// Job Count Function call
calculateJobCount();
