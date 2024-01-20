const open_btns = document.querySelectorAll('button[data-modal]')
const close_btns = document.querySelectorAll('[data-close]')
const modal = document.querySelector('.modal')

open_btns.forEach((btn) => {
    btn.onclick = () => {
        modal.classList.add('show', 'fade')
    }
})
close_btns.forEach((btn) => {
    btn.onclick = () => {
        modal.classList.remove('show', 'fade')
    }
})


// slider

const slides = document.querySelectorAll('.offer__slide')
const next_btn = document.querySelector('.offer__slider-next')
const prev_btn = document.querySelector('.offer__slider-prev')
const current = document.querySelector('#current')
console.log(slides);
let slideIndex = 1

slideShow(slideIndex)

function slideShow(n) {
    current.innerHTML = '0' + n

    slides.forEach(slide => slide.classList.add('hide', 'fade'))
    slides[slideIndex - 1].classList.remove('hide')
}

next_btn.onclick = () => {
    if (slideIndex < slides.length) {
        slideIndex++
        slideShow(slideIndex)
    }
}

prev_btn.onclick = () => {
    if (slideIndex > 1) {
        slideIndex--
        slideShow(slideIndex)
    }
}



let tabheader_items = document.querySelectorAll('.tabheader__item')
let tabcontents = document.querySelectorAll('.tabcontent')

tabheader_items.forEach(item => {
    item.onclick = () => {
        tabheader_items.forEach(item2 => {
            item2.classList.remove('tabheader__item_active')
        });
        item.classList.add('tabheader__item_active')
        tabcontents.forEach(item2 => {
            item2.style.display = 'none'
            if (item2.id == item.id) {
                item2.style.display = 'flex'
            }
        });
    }
});

tabheader_items.forEach(item => {
    if (item.classList.contains('tabheader__item_active')) {
        tabcontents.forEach(item2 => {
            item2.style.display = 'none'
            if (item2.id == item.id) {
                item2.style.display = 'flex'
            }
        });
    }
});


const user_data = {
    gender: "woman"
}

const gender_btns = document.querySelectorAll('[data-gender]')
const inputs = document.querySelectorAll('.calculating__choose_medium input')
const actions = document.querySelectorAll('.calculating__choose_big div')
const result_view = document.querySelector('.calculating__result')

gender_btns.forEach(btn => {
    btn.onclick = () => {
        gender_btns.forEach(btn => btn.classList.remove('calculating__choose-item_active'))
        btn.classList.add('calculating__choose-item_active')

        const g = btn.dataset.gender
        user_data["gender"] = g
    }
})

inputs.forEach(inp => {
    inp.onkeyup = () => {
        user_data[inp.id] = inp.value
    }
})

let prev = 1
actions.forEach((div, idx) => {
    div.onclick = () => {
        actions[prev].classList.remove('calculating__choose-item_active')
        div.classList.add('calculating__choose-item_active')
        prev = idx
        let cft = div.dataset.cft

        if (user_data.gender === 'woman') {
            let result = (655.1 + (9.563 * user_data['weight']) + (1.85 * user_data['height']) - (4.676 * user_data['age'])) * cft
            result_view.innerHTML = Math.round(result)
        } else {
            let result = (66.5 + (13.75 * user_data['weight']) + (5.003 * user_data['height']) - (6.775 * user_data['age'])) * cft
            result_view.innerHTML = Math.round(result)
        }
    }
})



const minutes  = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');

function updateTimer() {
    const now = new Date().getTime();
    const deadline = new Date(now + 2 * 60 * 1000); 
    const x = setInterval(function() {
        const currentTime = new Date().getTime();
        const timeGap = deadline - currentTime;
        
        const m = Math.floor((timeGap / 1000 / 60) % 60);
        const s = Math.floor((timeGap / 1000) % 60);
        
        minutes.innerHTML = m < 10 ? "0" + m : m;
        seconds.innerHTML = s < 10 ? "0" + s : s;
      
        if (timeGap < 0) {
            clearInterval(x);
            minutes.innerHTML = "00";
            seconds.innerHTML = "00";
            
            startConfetti();
        }
    }, 1000);
}

function startConfetti() {
    const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
      };
      
      function shoot() {
        confetti({
          ...defaults,
          particleCount: 30,
          scalar: 1.2,
          shapes: ["circle", "square"],
          colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
        });
      
        confetti({
          ...defaults,
          particleCount: 20,
          scalar: 2,
          shapes: ["emoji"],
          shapeOptions: {
            emoji: {
              value: ["🦄", "🌈"],
            },
          },
        });
      }
      
      setTimeout(shoot, 0);
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);
}

updateTimer()