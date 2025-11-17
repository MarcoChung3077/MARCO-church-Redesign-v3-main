const calendarDates = document.querySelector('.calendar-dates');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const months = [
  '1', '2', '3', '4', '5', '6',
  '7', '8', '9', '10', '11', '12'
];

// Define your events
const events = {
    '5-10-2025': {
        title: '香港聖公會西九龍教區婦女團主辦 走訪《麥理浩夫人中心》',
        date: '2025-05-10',
        description: '西九龍教區婦女團本屆主題為《跨代手牽手•侍主肩並肩》！希望籍著不同活動，走到教區教省各處，認識聖公會的三頭馬車，怎樣將上帝的愛傳給每一個人！並透過團契活動，讓我們與不同年齡層的弟兄姊妹相知、相交，彰顯主基督的愛。',
        image: 'images/HKSKH Lady MacLehose Centre.png' // Add the image URL
    },

    '5-11-2025': {
        title: '母親節感恩慶典',
        date: '2025-05-11',
        description: '在這個特別的母親節，香港聖公會主愛堂誠邀您參加「母親節感恩慶典」。我們將一起慶祝母親們的無私奉獻與愛。活動中將有感人的演講、親子互動遊戲以及手作卡片環節，讓每位參加者能夠為自己的母親送上真摯的祝福和感謝。歡迎大家攜家帶眷，共同度過這個充滿愛的午後！',
        image: 'images/motherDay.jpg' // Add the image URL
    },

    '5-20-2025': {
        title: '社區聯歡日',
        date: '2025-05-20',
        description: '香港聖公會主愛堂誠邀您參加「社區聯歡日」。這是一個旨在促進社區聯繫與友誼的活動，適合所有年齡層的家庭參加。活動內容包括音樂表演、遊戲攤位、美食市集、手作工作坊等，讓大家在輕鬆愉快的氛圍中互相認識和交流。無論是想要享受音樂、品嚐美食，還是參加有趣的活動，這裡都能找到適合您的選擇。歡迎攜家帶眷，共度美好的一天！',
        image: 'images/socialGathering.jpg' // Add the image URL
    },

  // Add more events as needed
};

function renderCalendar(month, year) {
    calendarDates.innerHTML = '';
    monthYear.textContent = `${year}年 - ${months[month]}月`;
  
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement('div');
      calendarDates.appendChild(blank);
    }
  
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.textContent = i;

        if (i === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
            day.classList.add('current-date');
        }

        const dateString = `${month + 1}-${i}-${year}`;
        if (events[dateString]) {
            day.classList.add('event-date'); // Highlight days with events
            day.dataset.eventKey = dateString; // Store event key
            day.title = events[dateString].title; // Add a tooltip with the event title
        }

        calendarDates.appendChild(day);
    }
}

renderCalendar(currentMonth, currentYear);

prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

calendarDates.addEventListener('click', (e) => {
  const dayElement = e.target;
  if (dayElement.textContent !== '' && dayElement.dataset.eventKey) {
      const event = events[dayElement.dataset.eventKey];
      document.querySelector('.s2 h2').textContent = event.title;
      document.querySelector('.s2 h6').textContent = `日期: ${event.date}`;
      document.querySelector('.s2 p').textContent = event.description;
      document.querySelector('.s2-img img').src = event.image; // Update the image
      document.querySelector('.s2-img').style.display = 'block'; // Show image box
  } else {
      // Display "no event" message
      document.querySelector('.s2 h2').textContent = '無活動';
      document.querySelector('.s2 h6').textContent = '';
      document.querySelector('.s2 p').textContent = '該日沒有活動。';
      document.querySelector('.s2-img img').src = ''; // Clear the image
      document.querySelector('.s2-img').style.display = 'none'; // Hide image box
  }
});