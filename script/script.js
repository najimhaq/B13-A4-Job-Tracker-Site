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

//total job count
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
  }
}

// 📱 **Responsive interview jobs function**
function showInterviewJobs() {
  filterSec.innerHTML = '';

  for (let job of interviewList) {
    let div = document.createElement('div');
    div.className =
      'job rounded-xl shadow p-4 sm:p-6 border border-gray-100 bg-white hover:shadow-lg transition-all duration-300';
    div.innerHTML = `
      <div class="flex flex-col md:flex-row md:justify-between relative">
        <!-- Delete Icon - Mobile friendly -->
        <div class="absolute top-2 right-2 md:static">
          <i class="delete-icon ri-delete-bin-6-line text-[#64748B]/70 border-2 border-gray-200 rounded-full p-2 cursor-pointer hover:bg-red-50 hover:border-red-200 transition-all text-lg sm:text-xl" 
             data-company="${job.company}" 
             data-position="${job.position}"></i>
        </div>
        
        <div class="flex-1 pr-8 md:pr-0">
          <!-- Company & Position -->
          <div class="mb-3 sm:mb-4">
            <h2 class="company text-lg sm:text-xl text-[#002C5C] font-medium mb-1">${job.company}</h2>
            <p class="position text-sm sm:text-base text-[#64748B] mb-1">${job.position}</p>
            <p class="location text-xs sm:text-sm text-[#64748B]">${job.location}</p>
          </div>
          
          <!-- Salary & Applied Button -->
          <div class="mb-3 sm:mb-4">
            <p class="salary text-xs sm:text-sm text-[#64748B] mb-2 sm:mb-3">${job.salary}</p>
            <button class="inner-apply-btn btn btn-soft bg-green-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 mb-2">
              Applied
            </button>
          </div>
          
          <!-- Description -->
          <p class="descriptionJob text-xs sm:text-sm text-[#323B49] font-normal mb-4 sm:mb-6 leading-relaxed">
            ${job.description}
          </p>
          
          <!-- Action Buttons - Responsive -->
          <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button class="btn bg-gray-400 text-white opacity-50 cursor-not-allowed text-xs sm:text-sm px-3 sm:px-4 py-2 flex-1 sm:flex-none" disabled>
              Interviewed
            </button>
            <button class="btn bg-gray-400 text-white opacity-50 cursor-not-allowed text-xs sm:text-sm px-3 sm:px-4 py-2 flex-1 sm:flex-none" disabled>
              Rejected
            </button>
          </div>
        </div>
      </div>
    `;
    filterSec.appendChild(div);
  }

  addDeleteListeners();
}

// 📱 **Responsive rejected jobs function**
function showRejectedJobs() {
  filterSec.innerHTML = '';

  for (let job of rejectedList) {
    let div = document.createElement('div');
    div.className =
      'job rounded-xl shadow p-4 sm:p-6 border border-gray-100 bg-white hover:shadow-lg transition-all duration-300';
    div.innerHTML = `
      <div class="flex flex-col md:flex-row md:justify-between relative">
        <!-- Delete Icon - Mobile friendly -->
        <div class="absolute top-2 right-2 md:static">
          <i class="delete-icon ri-delete-bin-6-line text-[#64748B]/70 border-2 border-gray-200 rounded-full p-2 cursor-pointer hover:bg-red-50 hover:border-red-200 transition-all text-lg sm:text-xl" 
             data-company="${job.company}" 
             data-position="${job.position}"></i>
        </div>
        
        <div class="flex-1 pr-8 md:pr-0">
          <!-- Company & Position -->
          <div class="mb-3 sm:mb-4">
            <h2 class="company text-lg sm:text-xl text-[#002C5C] font-medium mb-1">${job.company}</h2>
            <p class="position text-sm sm:text-base text-[#64748B] mb-1">${job.position}</p>
            <p class="location text-xs sm:text-sm text-[#64748B]">${job.location}</p>
          </div>
          
          <!-- Salary & Rejected Button -->
          <div class="mb-3 sm:mb-4">
            <p class="salary text-xs sm:text-sm text-[#64748B] mb-2 sm:mb-3">${job.salary}</p>
            <button class="inner-apply-btn btn btn-soft bg-red-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 mb-2">
              Rejected
            </button>
          </div>
          
          <!-- Description -->
          <p class="descriptionJob text-xs sm:text-sm text-[#323B49] font-normal mb-4 sm:mb-6 leading-relaxed">
            ${job.description}
          </p>
          
          <!-- Action Buttons - Responsive -->
          <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button class="btn bg-gray-400 text-white opacity-50 cursor-not-allowed text-xs sm:text-sm px-3 sm:px-4 py-2 flex-1 sm:flex-none" disabled>
              Interview
            </button>
            <button class="btn bg-gray-400 text-white opacity-50 cursor-not-allowed text-xs sm:text-sm px-3 sm:px-4 py-2 flex-1 sm:flex-none" disabled>
              Rejected
            </button>
          </div>
        </div>
      </div>
    `;
    filterSec.appendChild(div);
  }

  addDeleteListeners();
}

// 🗑️ DELETE FUNCTIONALITY (unchanged)
function addDeleteListeners() {
  const deleteIcons = document.querySelectorAll('.delete-icon');

  deleteIcons.forEach((icon) => {
    icon.addEventListener('click', function (e) {
      e.stopPropagation();

      const company = this.dataset.company;
      const position = this.dataset.position;

      if (confirm(`Are you sure you want to delete ${position} at ${company}?`)) {
        const card = this.closest('.job');

        // Interview List থেকে delete
        for (let i = 0; i < interviewList.length; i++) {
          if (interviewList[i].company === company && interviewList[i].position === position) {
            interviewList.splice(i, 1);
            break;
          }
        }

        // Rejected List থেকে delete
        for (let i = 0; i < rejectedList.length; i++) {
          if (rejectedList[i].company === company && rejectedList[i].position === position) {
            rejectedList.splice(i, 1);
            break;
          }
        }

        if (card) {
          card.remove();
        }

        calculateJobCount();
        alert(`✅ Deleted: ${position} at ${company}`);

        // Filter view update
        if (!totalCards.classList.contains('hidden')) {
          // All cards view
        } else if (!filterSec.classList.contains('hidden')) {
          if (interviewBtn.classList.contains('bg-[#3B82F6]')) {
            showInterviewJobs();
          } else if (rejectedBtn.classList.contains('bg-[#3B82F6]')) {
            showRejectedJobs();
          }
        }
      }
    });
  });
}

// Main click handler (with responsive support)
mainContainer.addEventListener('click', (e) => {
  // ===== INTERVIEW BUTTON =====
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

    // Update apply button with responsive classes
    if (applyButton) {
      applyButton.textContent = 'Applied';
      applyButton.classList.remove('bg-[#EEF4FF]', 'text-[#002C5C]');
      applyButton.classList.add('bg-green-500', 'text-white', 'text-xs', 'sm:text-sm');
    }

    // Update interview button
    if (interviewButton) {
      interviewButton.disabled = true;
      interviewButton.textContent = 'Interviewed';
      interviewButton.classList.remove('btn-outline', 'btn-success');
      interviewButton.classList.add(
        'bg-gray-400',
        'text-white',
        'opacity-50',
        'cursor-not-allowed',
        'text-xs',
        'sm:text-sm'
      );
    }

    // Update rejected button
    if (rejectedButton) {
      rejectedButton.disabled = true;
      rejectedButton.classList.remove('btn-outline', 'btn-secondary');
      rejectedButton.classList.add(
        'bg-gray-400',
        'text-white',
        'opacity-50',
        'cursor-not-allowed',
        'text-xs',
        'sm:text-sm'
      );
    }

    // Add delete attributes
    const deleteIcon = card.querySelector('.ri-delete-bin-6-line');
    if (deleteIcon) {
      deleteIcon.setAttribute('data-company', job.company);
      deleteIcon.setAttribute('data-position', job.position);
      deleteIcon.classList.add('delete-icon');
    }

    interviewList.push(job);
    console.log('✅ Interview List:', interviewList);
    calculateJobCount();
  }

  // ===== REJECTED BUTTON =====
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

    // Update apply button
    if (applyButton) {
      applyButton.textContent = 'Rejected';
      applyButton.classList.remove('bg-[#EEF4FF]', 'text-[#002C5C]');
      applyButton.classList.add('bg-red-500', 'text-white', 'text-xs', 'sm:text-sm');
    }

    // Update rejected button
    if (rejectedButton) {
      rejectedButton.disabled = true;
      rejectedButton.textContent = 'Rejected';
      rejectedButton.classList.remove('btn-outline', 'btn-secondary');
      rejectedButton.classList.add(
        'bg-gray-400',
        'text-white',
        'opacity-50',
        'cursor-not-allowed',
        'text-xs',
        'sm:text-sm'
      );
    }

    // Update interview button
    if (interviewButton) {
      interviewButton.disabled = true;
      interviewButton.classList.remove('btn-outline', 'btn-success');
      interviewButton.classList.add(
        'bg-gray-400',
        'text-white',
        'opacity-50',
        'cursor-not-allowed',
        'text-xs',
        'sm:text-sm'
      );
    }

    // Add delete attributes
    const deleteIcon = card.querySelector('.ri-delete-bin-6-line');
    if (deleteIcon) {
      deleteIcon.setAttribute('data-company', job.company);
      deleteIcon.setAttribute('data-position', job.position);
      deleteIcon.classList.add('delete-icon');
    }

    rejectedList.push(job);
    console.log('❌ Rejected List:', rejectedList);
    calculateJobCount();
  }

  // ===== DELETE ICON =====
  if (e.target.classList.contains('ri-delete-bin-6-line')) {
    const deleteIcon = e.target;
    const card = deleteIcon.closest('.job');
    if (!card) return;

    const company = card.querySelector('.company')?.textContent;
    const position = card.querySelector('.position')?.textContent;

    if (confirm(`Are you sure you want to delete this job?`)) {
      // Interview List থেকে delete
      for (let i = 0; i < interviewList.length; i++) {
        if (interviewList[i].company === company && interviewList[i].position === position) {
          interviewList.splice(i, 1);
          break;
        }
      }

      // Rejected List থেকে delete
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

