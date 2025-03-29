document.addEventListener("DOMContentLoaded", function(){

const canvas = document.getElementById('sky');
const ctx = canvas.getContext('2d');
const numStars = 1000;
const stars = [];

// размеры канваса равными размеру окна
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// создания звезды
function createStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5, //Меньше радиус
    opacity: Math.random(),
    delay: Math.random() * 5 //Задержка мерцания
  };
}

// Создаем массив звезд
for (let i = 0; i < numStars; i++) {
  stars.push(createStar());
}

// Функция для отрисовки звезды
function drawStar(star) {
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(Math.sin(Date.now() / 1000 + star.delay))})`; //Мерцание
  ctx.fill();
}

// Функция для анимации
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем канвас

  for (const star of stars) {
    drawStar(star);
  }

  requestAnimationFrame(animate); // Запускаем следующий кадр анимации
}


animate();


function setupCard(containerClass, imgClass, checkboxesClass, variants) {
  const container = document.querySelector(`.${containerClass}`);
  const img = container.querySelector(`.${imgClass}`);
  const frame = container.querySelector('.frame-sec2');
  const checkboxes = container.querySelectorAll(`.${checkboxesClass}`);
  
  const originalImgSrc = img.src;
  const originalFrameSrc = frame.src;
  const newFrameSrc = 'img/frame-sec2-big.svg';

  const bigFrame = document.createElement('img');
  bigFrame.src = newFrameSrc;
  bigFrame.className = 'frame-sec2-big';
  bigFrame.style.display = 'none';
  container.insertBefore(bigFrame, frame.nextSibling);

  // Обработчики для фрейма
  container.addEventListener('mouseenter', () => {
    frame.style.display = 'none';
    bigFrame.style.display = 'block';
  });

  container.addEventListener('mouseleave', () => {
    frame.style.display = 'block';
    bigFrame.style.display = 'none';
  });

  // Обработчики для чекбоксов
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      updateImage(img, checkboxes, variants, originalImgSrc);
    });
  });
}

// Функция обновления изображения (без изменений)
function updateImage(imgElement, checkboxes, variants, originalSrc) {
  const selectedOptions = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.dataset.option)
    .sort()
    .join('_');

  imgElement.src = variants[selectedOptions] || originalSrc;
}

// Варианты изображений
const rugVariants = {
  'food': 'img/rug4.png',
  'hookah': 'img/rug2.png',
  'music': 'img/rug-food-music-only.png',
  'food_hookah': 'img/rug3.png',
  'food_music': 'img/rug-food-music.png',
  'hookah_music': 'img/rug-hookah-music.png',
  'hookah_music_food': 'img/rug-all.png'
};

const nivaVariants = {
  'winch': 'img/niva-radar.png',
  'subwoofer': 'img/niva-turbo.png',
  'bullbar': 'img/niva-music.png',
  'winch_subwoofer': 'img/niva-radar-turbo.png',
  'winch_bullbar': 'img/niva-radar-music.png',
  'subwoofer_bullbar': 'img/niva-radar-turbo-music.png',
  'winch_subwoofer_bullbar': 'img/niva-radar-turbo.png'
};

const prioraVariants = {
  'spoiler': 'img/priora-sport.png',
  'tinting': 'img/priora-parash.png',
  'xenon': 'img/priora-kalyan.png',
  'spoiler_tinting': 'img/priora-sport-parah.png',
  'spoiler_xenon': 'img/priora-calyan-sport.png',
  'tinting_xenon': 'img/priora-kalyan-parash.png',
  'spoiler_tinting_xenon': 'img/priora-all.png'
};

const cosmobatonVariants = {
  'plasma': 'img/baton-black.png',
  'gravitsapa': 'img/baton-icra.png',
  'neural': 'img/baton-fish.png',
  'plasma_gravitsapa': 'img/baton-icra-black.png',
  'plasma_neural': 'img/baton-fish-blsck.png',
  'gravitsapa_neural': '',
  'plasma_gravitsapa_neural': 'img/baton-all.png'
};

// Инициализация всех карточек с  селекторами
setupCard('cover', 'rug', 'check-cover', rugVariants);
setupCard('niva', 'niva-img', 'check-niva', nivaVariants);
setupCard('priora', 'priora-img', 'check-priora', prioraVariants);
setupCard('cosmobaton', 'cosmobaton-img', 'check-cosmobaton', cosmobatonVariants);


const items = document.querySelectorAll('.items');
const universe = document.querySelector('.universe');
const container = document.querySelector('.section-3');

// Получаем центр черной дыры (universe)
function getBlackHoleCenter() {
  const universeRect = universe.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  
  return {
    x: universeRect.left + universeRect.width/2 - containerRect.left,
    y: universeRect.top + universeRect.height/2 - containerRect.top
  };
}

items.forEach(item => {
  let isDragging = false;
  let offsetX, offsetY;

  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = item.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    item.style.cursor = 'grabbing';
    item.style.zIndex = '2';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const newLeft = e.clientX - offsetX - container.getBoundingClientRect().left;
    const newTop = e.clientY - offsetY - container.getBoundingClientRect().top;

    item.style.left = newLeft + 'px';
    item.style.top = newTop + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;

    isDragging = false;
    item.style.cursor = 'grab';
    item.style.zIndex = '1';

    const itemRect = item.getBoundingClientRect();
    const universeRect = universe.getBoundingClientRect();

    const isOverlapping = !(itemRect.right < universeRect.left ||
                          itemRect.left > universeRect.right ||
                          itemRect.bottom < universeRect.top ||
                          itemRect.top > universeRect.bottom);

    const containerRect = container.getBoundingClientRect();
    const isInsideContainer = !(itemRect.right < containerRect.left ||
                              itemRect.left > containerRect.right ||
                              itemRect.bottom < containerRect.top ||
                              itemRect.top > containerRect.bottom);

    if (isOverlapping && isInsideContainer) {
      // Получаем центр черной дыры
      const blackHoleCenter = getBlackHoleCenter();
      
      // Устанавливаем CSS переменные для финальной позиции
      item.style.setProperty('--black-hole-center-x', `${blackHoleCenter.x}px`);
      item.style.setProperty('--black-hole-center-y', `${blackHoleCenter.y}px`);
      
      // Добавляем класс с анимацией
      item.classList.add('black-hole-suck');
      
      // Удаляем после завершения анимации
      setTimeout(() => {
        item.remove();
      }, 800);
    }
  });

  item.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });
});




const drawingArea = document.querySelector('.drawing-area');
const brushImageSrc = 'img/Group-73.svg';

setTimeout(function() {
  brushImageSrc.style.opacity = 0;
}, 500);

setTimeout(function() {
  brushImageSrc.remove();
}, 10000);

let isDrawing = false;

// Предзагрузка изображения кисти
const brushImagePreload = new Image();
brushImagePreload.src = brushImageSrc;

function getDrawingAreaCoordinates(e) {
  const rect = drawingArea.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function draw(e) {
  const coords = getDrawingAreaCoordinates(e);
  
  // Проверка границ области рисования
  if (coords.x < 0 || coords.y < 0 || 
      coords.x > drawingArea.offsetWidth || 
      coords.y > drawingArea.offsetHeight) {
    return;
  }

  const brushImage = document.createElement('img');
  brushImage.src = brushImageSrc;
  brushImage.classList.add('brush-image');
  
  brushImage.style.left = coords.x + 'px';
  brushImage.style.top = coords.y + 'px';
  
  drawingArea.appendChild(brushImage);
}

// Обработчики событий
drawingArea.addEventListener('mousedown', (e) => {
  isDrawing = true;
  draw(e);
});

drawingArea.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;
  draw(e);
});

drawingArea.addEventListener('mouseup', () => {
  isDrawing = false;
});

drawingArea.addEventListener('mouseleave', () => {
  isDrawing = false;
});


const agreement = document.querySelector('.agreement');
if (agreement) {
    const text = agreement.textContent;
    const words = text.split(' ');
    
    // Очищаем и перестраиваем текст с обёрнутыми словами
    agreement.innerHTML = '';
    
    words.forEach(word => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        agreement.appendChild(span);
    });

    function applyMassEffects() {
        const spans = agreement.querySelectorAll('span');
        const totalWords = spans.length;
        
        // Удаляем все текущие эффекты
        spans.forEach(span => {
            span.classList.remove('word-flicker', 'word-disappear');
        });

        // Выбираем 15-25 случайных слов для эффектов
        const effectCount = 15 + Math.floor(Math.random() * 11); // 15-25 слов
        const affectedIndices = new Set();

        // Гарантируем уникальные индексы слов
        while(affectedIndices.size < effectCount) {
            const randomIndex = Math.floor(Math.random() * totalWords);
            affectedIndices.add(randomIndex);
        }

        // Применяем эффекты к выбранным словам
        affectedIndices.forEach(index => {
            const randomSpan = spans[index];
            const effectType = Math.random() > 0.5 ? 'word-flicker' : 'word-disappear';
            randomSpan.classList.add(effectType);
            
            // Для разнообразия - случайная длительность эффекта
            const duration = 2000 + Math.random() * 3000; // 2-5 секунд
            randomSpan.style.animationDuration = `${duration}ms`;
        });

        // Планируем следующее обновление через 3-6 секунд
        const nextUpdate = 3000 + Math.random() * 3000;
        setTimeout(applyMassEffects, nextUpdate);
    }

    // Запускаем первый раз
    applyMassEffects();
}


const buttonContainer = document.querySelector('.section-7 .button-container');
  const modal = document.getElementById('errorModal');
  
  if (buttonContainer && modal) {
    const closeBtn = modal.querySelector('.close');
    
    // Обработчик клика по кнопке
    buttonContainer.addEventListener('click', function(e) {
      e.stopPropagation();
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
      }, 10);
    });

    // Обработчик клика по крестику
    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeModal();
      });
    }

    // Обработчик клика вне модального окна
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Функция для закрытия модального окна
    function closeModal() {
      modal.style.opacity = '0';
      modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
      document.body.style.overflow = '';
      
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    }
  }
});


