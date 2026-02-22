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

// interview jobs function
function showInterviewJobs() {
  filterSec.innerHTML = '';

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

  // Delete icon এর জন্য event listener যোগ করি
  addDeleteListeners();
}

// শুধু রিজেক্টেড jobs দেখানোর ফাংশন
function showRejectedJobs() {
  filterSec.innerHTML = '';

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

  // Delete icon এর জন্য event listener যোগ করি
  addDeleteListeners();
}

// 🗑️ **DELETE FUNCTIONALITY**
function addDeleteListeners() {
  // সব delete icon সিলেক্ট করি
  const deleteIcons = document.querySelectorAll('.delete-icon');

  deleteIcons.forEach((icon) => {
    icon.addEventListener('click', function (e) {
      e.stopPropagation(); // Event bubbling বন্ধ করি

      // Job এর তথ্য বের করি
      const company = this.dataset.company;
      const position = this.dataset.position;

      // কনফার্মেশন নিই
      if (confirm(`Are you sure you want to delete ${position} at ${company}?`)) {
        // কোন কার্ডে আছে সেটা বের করি
        const card = this.closest('.job');

        // Interview List থেকে delete করি
        for (let i = 0; i < interviewList.length; i++) {
          if (interviewList[i].company === company && interviewList[i].position === position) {
            interviewList.splice(i, 1);
            break;
          }
        }

        // Rejected List থেকে delete করি
        for (let i = 0; i < rejectedList.length; i++) {
          if (rejectedList[i].company === company && rejectedList[i].position === position) {
            rejectedList.splice(i, 1);
            break;
          }
        }

        // UI থেকে কার্ড remove করি
        if (card) {
          card.remove();
        }

        // কাউন্ট আপডেট করি
        calculateJobCount();

        // Success message
        alert(`✅ Deleted: ${position} at ${company}`);

        // যদি filter section খোলা থাকে, তাহলে আপডেট করি
        if (!totalCards.classList.contains('hidden')) {
          // All cards view এ থাকলে কিছু করার দরকার নেই
        } else if (!filterSec.classList.contains('hidden')) {
          // Filter view এ থাকলে রি-রেন্ডার করি
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

// Main click handler
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

    // Add delete attribute to the delete icon
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

    // Add delete attribute to the delete icon
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

  // ===== DELETE ICON (Original cards-এর জন্য) =====
  if (e.target.classList.contains('ri-delete-bin-6-line')) {
    const deleteIcon = e.target;
    const card = deleteIcon.closest('.job');
    if (!card) return;

    // Job details বের করি
    const company = card.querySelector('.company')?.textContent;
    const position = card.querySelector('.position')?.textContent;

    if (confirm(`Are you sure you want to delete this job?`)) {
      // Interview List থেকে খুঁজে বের করে delete করি
      for (let i = 0; i < interviewList.length; i++) {
        if (interviewList[i].company === company && interviewList[i].position === position) {
          interviewList.splice(i, 1);
          break;
        }
      }

      // Rejected List থেকে খুঁজে বের করে delete করি
      for (let i = 0; i < rejectedList.length; i++) {
        if (rejectedList[i].company === company && rejectedList[i].position === position) {
          rejectedList.splice(i, 1);
          break;
        }
      }

      // কার্ড remove করি
      card.remove();

      // কাউন্ট আপডেট করি
      calculateJobCount();

      alert('✅ Job deleted successfully!');
    }
  }
});
