Job Tracker - Smart Job Application Management System
📋 Overview
Job Tracker is a sophisticated, personal job application management system designed for developers and professionals to streamline their job search process. Built with modern web technologies, this application helps you organize, track, and analyze your job applications efficiently.

Question Answer: 

Question 1: What is the difference between getElementById,       getElementsByClassName, and querySelector / querySelectorAll?
Answer 1: 
        > getElementById → নির্দিষ্ট id-ওয়ালা একটি মাত্র এলিমেন্ট খুঁজে পায়।
        > getElementsByClassName → নির্দিষ্ট class-ওয়ালা সব এলিমেন্ট খুঁজে পায়।
        > querySelector → CSS selector দিয়ে প্রথম যে এলিমেন্ট মেলে সেটি খুঁজে পায়।
        > querySelectorAll → CSS selector দিয়ে সব এলিমেন্ট খুঁজে পায়।
Question 2: How do you create and insert a new element into the DOM?
Answer 2: 
        1. Element তৈরি করা → `documentcreateElement(tagName) ব্যবহার করে নতুন element বানাও।
        2. Content বা Attribute যোগ করা → টেক্সট, ক্লাস, আইডি বা অন্য attribute সেট করো।
        3. DOM-এ যোগ করা → `appendhild, `prepend বা insertBefore ব্যবহার করে element-কে কোনো existing element-এর ভেতরে বসাও।
Question 3: What is Event Bubbling? And how does it work?
Answer 3: 
        যখন কোনো child element-এ event (যেমন click) ঘটে, সেটা শুধু child-এ থেমে থাকে না। Event উপরে parent element পর্যন্ত চলে যায়। এর মানে হলো parent element-গুলোও সেই event-এর প্রতিক্রিয়া জানাতে পারে।
Question 4: What is Event Delegation in JavaScript? Why is it useful?
Answer 4: 
        সাধারণত আমরা প্রতিটি child element-এ আলাদা আলাদা event listener বসাই। Event Delegation-এ আমরা সেটা করি না।বরং আমরা একটা parent element-এ একটাই listener বসাই। যখন child element-এ event ঘটে, সেটা event bubbling এর মাধ্যমে parent পর্যন্ত পৌঁছে যায়। তারপর parent listener event.target দেখে বুঝে নেয় কোন child element-এ event ঘটেছে।
Question 5:What is the difference between preventDefault() and stopPropagation() methods?
Answer 5: 
        preventDefault() → ব্রাউজারের নিজের কাজ বন্ধ করো।
        stopPropagation() → ইভেন্টকে উপরের দিকে যেতে দিও না।


🔗 Live Demo: https://yourusername.github.io/job-tracker
📦 Repository: github.com/yourusername/job-tracker

🛠️ Technology Stack
1.HTML
2.TailwindCSS
3.DaisyUI

B13-A4-job-tracker/
├── script/
│ ├── script.js
├── images/
│ ├── jobs.png
├── index.html
├── tailwind.init.css
└── README.md

Clone the repository
git clone https://github.com/najimhaq/job-tracker.git
cd job-tracker

📝 License
This project is licensed under the PH MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Icons by Remix Icon
Fonts by Google Fonts

⭐ Support
If you find this project helpful, please give it a ⭐ on GitHub!

Built with ❤️ for developers navigating their career journey
