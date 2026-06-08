/**
 * Qisati Digital Library - Application Core
 * Interactive Logic, 3D Page Flip, Sign Language Animations, and Alphabet Board
 */

// Global App State
const state = {
  currentTab: 'library', // 'library' or 'alphabet'
  activeBookId: null,
  currentPageIndex: 0,
  isHighContrast: false,
  soundEffects: true
};

// -------------------------------------------------------------
// STORES DATABASE (STORIES, VOCABULARY, & ALPHABET)
// -------------------------------------------------------------

const stories = [
  {
    id: 'rabbit_lion',
    title: 'الأرنب الذكي والأسد',
    author: 'حكاية شعبية دافئة',
    category: 'حيوانات',
    coverClass: 'cover-rabbit',
    coverGradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
    badgeColor: 'var(--accent-green)',
    stickerSVG: `
      <svg viewBox="0 0 100 100" class="book-sticker-svg">
        <circle cx="50" cy="50" r="45" fill="#fff" stroke="var(--accent-yellow)" stroke-width="5"/>
        <path d="M35,45 C35,25 43,10 43,10 C43,10 49,25 45,45" fill="#ffb7b2" stroke="#2c3e50" stroke-width="3"/>
        <path d="M65,45 C65,25 57,10 57,10 C57,10 51,25 55,45" fill="#ffb7b2" stroke="#2c3e50" stroke-width="3"/>
        <ellipse cx="50" cy="65" rx="20" ry="15" fill="#f8edeb" stroke="#2c3e50" stroke-width="3"/>
        <circle cx="42" cy="58" r="4" fill="#2c3e50"/>
        <circle cx="58" cy="58" r="4" fill="#2c3e50"/>
        <polygon points="50,65 46,61 54,61" fill="#ff6b6b"/>
      </svg>
    `,
    pages: [
      {
        text: 'كان يا ما كان، في <span class="story-word-clickable" data-word="غابة">غابة</span> جميلة هادئة، تعيش <span class="story-word-clickable" data-word="حيوانات">حيوانات</span> كثيرة بسعادة وأمان.',
        illustration: `
          <svg viewBox="0 0 400 250" style="width:100%; height:100%; background:#e8f5e9;">
            <!-- Trees -->
            <path d="M50,180 L70,180 L60,110 Z" fill="#5d4037"/>
            <circle cx="60" cy="90" r="40" fill="#2e7d32"/>
            <path d="M340,180 L360,180 L350,120 Z" fill="#5d4037"/>
            <circle cx="350" cy="100" r="35" fill="#388e3c"/>
            <!-- Sun -->
            <circle cx="200" cy="60" r="30" fill="#ffd54f"/>
            <path d="M200,20 L200,30 M200,90 L200,100 M160,60 L170,60 M230,60 L240,60" stroke="#ffd54f" stroke-width="4" stroke-linecap="round"/>
            <!-- Ground -->
            <path d="M0,180 Q200,160 400,180 L400,250 L0,250 Z" fill="#81c784"/>
            <!-- Cute Little Rabbit -->
            <g transform="translate(180, 130)">
              <ellipse cx="20" cy="35" rx="15" ry="12" fill="#fff"/>
              <circle cx="20" cy="20" r="10" fill="#fff"/>
              <path d="M16,12 Q14,0 12,0 Q10,0 14,12" fill="#fff" stroke="#ffb7b2" stroke-width="2"/>
              <path d="M24,12 Q26,0 28,0 Q30,0 26,12" fill="#fff" stroke="#ffb7b2" stroke-width="2"/>
              <circle cx="17" cy="18" r="1.5" fill="#2c3e50"/>
              <circle cx="23" cy="18" r="1.5" fill="#2c3e50"/>
              <circle cx="20" cy="35" r="3" fill="#ffb7b2"/>
            </g>
          </svg>
        `,
        videoUrl: 'https://www.youtube.com/embed/5T2o2L-fHxk' // Illustrative Sign Language story
      },
      {
        text: 'لكن <span class="story-word-clickable" data-word="الأسد">الأسد</span> القوي كان يخيف <span class="story-word-clickable" data-word="حيوانات">الحيوانات</span> ويأكل منها كل يوم حيواناً.',
        illustration: `
          <svg viewBox="0 0 400 250" style="width:100%; height:100%; background:#fff3e0;">
            <path d="M0,180 Q200,160 400,180 L400,250 L0,250 Z" fill="#ffb74d"/>
            <!-- Lion -->
            <g transform="translate(150, 80)">
              <!-- Mane -->
              <circle cx="50" cy="50" r="48" fill="#e65100"/>
              <circle cx="50" cy="50" r="36" fill="#f57c00"/>
              <!-- Head -->
              <circle cx="50" cy="50" r="28" fill="#ffe082"/>
              <!-- Ears -->
              <circle cx="30" cy="25" r="8" fill="#ffe082"/>
              <circle cx="70" cy="25" r="8" fill="#ffe082"/>
              <!-- Eyes -->
              <circle cx="40" cy="45" r="3.5" fill="#2c3e50"/>
              <circle cx="60" cy="45" r="3.5" fill="#2c3e50"/>
              <!-- Snout -->
              <ellipse cx="50" cy="56" rx="8" ry="6" fill="#fff"/>
              <polygon points="50,54 47,50 53,50" fill="#2c3e50"/>
              <!-- Body -->
              <path d="M22,78 C22,78 50,110 78,78" stroke="#ffe082" stroke-width="20" stroke-linecap="round"/>
            </g>
          </svg>
        `,
        videoUrl: 'https://www.youtube.com/embed/5T2o2L-fHxk?start=15'
      },
      {
        text: 'قرر <span class="story-word-clickable" data-word="الأرنب">الأرنب</span> وضع <span class="story-word-clickable" data-word="خطة">خطة</span> ذكية للتخلص من الأسد وإنقاذ أصدقائه.',
        illustration: `
          <svg viewBox="0 0 400 250" style="width:100%; height:100%; background:#e0f2f1;">
            <path d="M0,180 Q200,160 400,180 L400,250 L0,250 Z" fill="#80cbc4"/>
            <!-- Thinking Rabbit -->
            <g transform="translate(180, 110)">
              <ellipse cx="20" cy="35" rx="15" ry="12" fill="#fff"/>
              <circle cx="20" cy="20" r="10" fill="#fff"/>
              <path d="M16,12 Q14,0 12,0" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
              <path d="M24,12 Q20,2 17,2" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/> <!-- Bent ear -->
              <circle cx="17" cy="18" r="1.5" fill="#2c3e50"/>
              <circle cx="23" cy="18" r="1.5" fill="#2c3e50"/>
              <!-- Lightbulb representing idea -->
              <g transform="translate(35, -40)" style="animation: bounceGently 2s infinite">
                <circle cx="15" cy="15" r="10" fill="#ffd54f"/>
                <path d="M11,24 L19,24 M13,27 L17,27" stroke="#2c3e50" stroke-width="2"/>
                <path d="M15,5 L15,2" stroke="#ffd54f" stroke-width="2"/>
              </g>
            </g>
          </svg>
        `,
        videoUrl: 'https://www.youtube.com/embed/5T2o2L-fHxk?start=30'
      },
      {
        text: 'قاد الأرنب الأسد إلى <span class="story-word-clickable" data-word="بئر">بئر</span> عميقة، فظن الأسد ظله أسداً آخر وقفز في الماء!',
        illustration: `
          <svg viewBox="0 0 400 250" style="width:100%; height:100%; background:#eceff1;">
            <path d="M0,180 Q200,160 400,180 L400,250 L0,250 Z" fill="#b0bec5"/>
            <!-- Deep Well -->
            <g transform="translate(150, 110)">
              <!-- Brick Base -->
              <rect x="10" y="30" width="80" height="40" fill="#90a4ae" rx="5"/>
              <line x1="10" y1="50" x2="90" y2="50" stroke="#37474f" stroke-width="2"/>
              <line x1="36" y1="30" x2="36" y2="70" stroke="#37474f" stroke-width="2"/>
              <line x1="63" y1="30" x2="63" y2="70" stroke="#37474f" stroke-width="2"/>
              <!-- Well Opening -->
              <ellipse cx="50" cy="30" rx="40" ry="12" fill="#37474f"/>
              <ellipse cx="50" cy="30" rx="35" ry="9" fill="#00e5ff" opacity="0.8"/> <!-- Water surface -->
            </g>
            <!-- Lion Looking Down -->
            <g transform="translate(100, 70) rotate(25)">
              <circle cx="30" cy="30" r="22" fill="#f57c00"/>
              <circle cx="30" cy="30" r="16" fill="#ffe082"/>
              <circle cx="24" cy="27" r="2" fill="#000"/>
              <circle cx="36" cy="27" r="2" fill="#000"/>
            </g>
          </svg>
        `,
        videoUrl: 'https://www.youtube.com/embed/5T2o2L-fHxk?start=45'
      }
    ]
  },
  {
    id: 'golden_fish',
    title: 'السمكة الذهبية والشبكة',
    author: 'مغامرة في المحيط',
    category: 'مغامرة',
    coverClass: 'cover-fish',
    coverGradient: 'linear-gradient(135deg, #00c6ff, #0072ff)',
    badgeColor: 'var(--primary-blue)',
    stickerSVG: `
      <svg viewBox="0 0 100 100" class="book-sticker-svg">
        <circle cx="50" cy="50" r="45" fill="#fff" stroke="var(--primary-blue)" stroke-width="5"/>
        <path d="M20,50 Q45,25 70,45 Q85,50 80,60 Q70,70 50,55 Q35,70 20,50" fill="#ffa200" stroke="#2c3e50" stroke-width="3"/>
        <path d="M72,46 L85,38 L80,50 L88,58 Z" fill="#ff5e00" stroke="#2c3e50" stroke-width="2"/>
        <circle cx="35" cy="42" r="3" fill="#fff"/>
        <circle cx="35" cy="42" r="1" fill="#000"/>
      </svg>
    `,
    pages: [
      {
        text: 'في أعماق <span class="story-word-clickable" data-word="البحر">البحر</span> الأزرق، تعيش <span class="story-word-clickable" data-word="سمكة">سمكة</span> ذهبية صغيرة تلمع تحت أشعة الشمس.',
        illustration: `
          <svg viewBox="0 0 400 250" style="width:100%; height:100%; background:#e0f7fa;">
            <!-- Waves -->
            <path d="M0,30 Q100,50 200,30 T400,30 L400,0 L0,0 Z" fill="#b2ebf2" opacity="0.5"/>
            <!-- Seabed -->
            <path d="M0,210 Q200,190 400,210 L400,250 L0,250 Z" fill="#ffe082"/>
            <!-- Sea plants -->
            <path d="M40,210 Q30,150 50,120 Q60,150 50,210" fill="#4caf50"/>
            <path d="M350,210 Q360,160 340,130 Q330,160 340,210" fill="#81c784"/>
            <!-- Golden Fish -->
            <g transform="translate(160, 100)">
              <path d="M10,30 Q40,5 70,25 Q90,30 85,42 Q75,55 50,38 Q30,55 10,30" fill="#ffd54f" stroke="#ff8f00" stroke-width="2"/>
              <path d="M72,26 L88,18 L83,32 L92,40 Z" fill="#ff8f00"/>
              <circle cx="28" cy="22" r="3" fill="#000"/>
              <!-- Air bubbles -->
              <circle cx="5" cy="15" r="4" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
              <circle cx="-5" cy="5" r="2.5" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
            </g>
          </svg>
        `,
        videoUrl: 'https://www.youtube.com/embed/-_Xn_tYyEuk' // Arabic Sign Language Kids Clip
      },
      {
        text: 'كانت السمكة تحب <span class="story-word-clickable" data-word="مساعدة">مساعدة</span> الكائنات البحرية وتنظيف <span class="story-word-clickable" data-word="المرجان">المرجان</span> الجميل.',
        illustration: `
          <svg viewBox="0 0 400 250" style="width:100%; height:100%; background:#e0f7fa;">
            <path d="M0,210 Q200,190 400,210 L400,250 L0,250 Z" fill="#ffe082"/>
            <!-- Corals -->
            <g fill="#ff4081">
              <path d="M80,210 L90,150 L100,210 Z"/>
              <path d="M90,180 L115,160 L100,190 Z"/>
              <path d="M85,190 L65,170 L80,200 Z"/>
            </g>
            <g fill="#e040fb" transform="translate(200,0)">
              <path d="M80,210 L90,140 L100,210 Z"/>
              <path d="M90,170 L110,155 L100,185 Z"/>
            </g>
            <!-- Fish assisting a crab -->
            <g transform="translate(100, 110) scale(0.7)">
              <path d="M10,30 Q40,5 70,25" fill="none" stroke="#ffd54f" stroke-width="5"/>
            </g>
            <g transform="translate(280, 180)">
              <!-- Crab -->
              <ellipse cx="20" cy="15" rx="15" ry="10" fill="#ff5252"/>
              <circle cx="10" cy="5" r="3" fill="#000"/>
              <circle cx="30" cy="5" r="3" fill="#000"/>
              <path d="M5,15 Q-5,10 -3,2 Q0,8 10,15" fill="#ff5252"/>
              <path d="M35,15 Q45,10 43,2 Q40,8 30,15" fill="#ff5252"/>
            </g>
          </svg>
        `,
        videoUrl: 'https://www.youtube.com/embed/-_Xn_tYyEuk?start=15'
      },
      {
        text: 'ذات يوم، سقطت <span class="story-word-clickable" data-word="شبكة">شبكة</span> صيد كبيرة وحبست <span class="story-word-clickable" data-word="سمكة">الأسماك</span> الصغيرة داخلها.',
        illustration: `
          <svg viewBox="0 0 400 250" style="width:100%; height:100%; background:#b2dfdb;">
            <!-- Net lines -->
            <g stroke="#37474f" stroke-width="1.5" opacity="0.6">
              <line x1="50" y1="0" x2="150" y2="180"/>
              <line x1="100" y1="0" x2="200" y2="180"/>
              <line x1="150" y1="0" x2="250" y2="180"/>
              <line x1="200" y1="0" x2="300" y2="180"/>
              <line x1="150" y1="180" x2="50" y2="0"/>
              <line x1="200" y1="180" x2="100" y2="0"/>
              <line x1="250" y1="180" x2="150" y2="0"/>
              <line x1="300" y1="180" x2="200" y2="0"/>
            </g>
            <!-- Trapped small fishes -->
            <g transform="translate(140, 80) scale(0.6)">
              <path d="M10,20 Q25,5 40,15 L45,10 L43,20 Z" fill="#ff5252"/>
              <circle cx="20" cy="13" r="1.5" fill="#000"/>
            </g>
            <g transform="translate(180, 110) scale(0.6)">
              <path d="M10,20 Q25,5 40,15 L45,10 L43,20 Z" fill="#448aff" />
              <circle cx="20" cy="13" r="1.5" fill="#000"/>
            </g>
          </svg>
        `,
        videoUrl: 'https://www.youtube.com/embed/-_Xn_tYyEuk?start=30'
      },
      {
        text: 'قامت السمكة الذهبية بقضم خيوط <span class="story-word-clickable" data-word="شبكة">الشبكة</span> بأسنانها حتى أنقذت <span class="story-word-clickable" data-word="أصدقاؤه">الجميع</span>!',
        illustration: `
          <svg viewBox="0 0 400 250" style="width:100%; height:100%; background:#e0f7fa;">
            <!-- Broken Net -->
            <g stroke="#37474f" stroke-width="2" opacity="0.7">
              <path d="M100,20 L130,70 M150,70 L190,110 M120,120 L90,160" stroke-dasharray="5,5"/>
            </g>
            <!-- Happy Fish -->
            <g transform="translate(160, 90)">
              <path d="M10,30 Q40,5 70,25 Q90,30 85,42 Q75,55 50,38 Q30,55 10,30" fill="#ffd54f" stroke="#ff8f00" stroke-width="2"/>
              <path d="M72,26 L88,18 L83,32 L92,40 Z" fill="#ff8f00"/>
              <!-- Smiling mouth open -->
              <path d="M22,28 Q26,33 30,28" fill="none" stroke="#2c3e50" stroke-width="2" stroke-linecap="round"/>
              <circle cx="28" cy="20" r="3" fill="#000"/>
            </g>
            <!-- Saved small fish celebrating -->
            <g transform="translate(260, 60) rotate(-20) scale(0.6)">
              <path d="M10,20 Q25,5 40,15 L45,10 L43,20 Z" fill="#ff5252"/>
            </g>
            <g transform="translate(80, 70) rotate(30) scale(0.6)">
              <path d="M10,20 Q25,5 40,15 L45,10 L43,20 Z" fill="#448aff" />
            </g>
          </svg>
        `,
        videoUrl: 'https://www.youtube.com/embed/-_Xn_tYyEuk?start=45'
      }
    ]
  },
  {
    id: 'lazy_bird',
    title: 'العصفور الكسلان والطيران',
    author: 'حكاية الأخلاق وحب العمل',
    category: 'أخلاق',
    coverClass: 'cover-bird',
    coverGradient: 'linear-gradient(135deg, #f54ea2, #ff7676)',
    badgeColor: 'var(--accent-orange)',
    stickerSVG: `
      <svg viewBox="0 0 100 100" class="book-sticker-svg">
        <circle cx="50" cy="50" r="45" fill="#fff" stroke="var(--accent-orange)" stroke-width="5"/>
        <circle cx="50" cy="50" r="30" fill="#ffcbd5"/>
        <path d="M35,48 C35,48 45,35 65,48" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
        <polygon points="50,52 43,45 57,45" fill="#ffd54f" stroke="#2c3e50" stroke-width="2"/>
        <circle cx="42" cy="40" r="3" fill="#2c3e50"/>
        <circle cx="58" cy="40" r="3" fill="#2c3e50"/>
      </svg>
    `,
    pages: [
      {
        text: 'كان هناك <span class="story-word-clickable" data-word="عصفور">عصفور</span> صغير كسلان يفضل <span class="story-word-clickable" data-word="النوم">النوم</span> واللعب على تعلم الطيران.',
        illustration: `
          <svg viewBox="0 0 400 250" style="width:100%; height:100%; background:#fff9c4;">
            <!-- Tree Branch -->
            <path d="M0,150 Q150,130 300,160 M200,147 L220,120" stroke="#8d6e63" stroke-width="8" stroke-linecap="round"/>
            <!-- Sleeping Bird -->
            <g transform="translate(160, 95)">
              <circle cx="25" cy="25" r="22" fill="#ff8a80"/>
              <!-- Wings folded -->
              <ellipse cx="25" cy="28" rx="8" ry="12" fill="#ff5252"/>
              <!-- Closed Eyes 'Z' -->
              <path d="M12,18 L20,18 L12,24 L20,24" fill="none" stroke="#2c3e50" stroke-width="2" stroke-linejoin="round"/>
              <path d="M32,18 L40,18 L32,24 L40,24" fill="none" stroke="#2c3e50" stroke-width="2" stroke-linejoin="round"/>
              <polygon points="25,28 21,24 29,24" fill="#ffd54f"/>
              <!-- Zzz text bubble -->
              <text x="45" y="5" font-family="var(--font-kids)" font-size="16" fill="#ff5252" font-weight="bold">Zzz</text>
            </g>
          </svg>
        `,
        videoUrl: 'https://www.youtube.com/embed/-_Xn_tYyEuk'
      },
      {
        text: 'جاء فصل <span class="story-word-clickable" data-word="الخريف">الخريف</span> البارد، وبدأت <span class="story-word-clickable" data-word="عصفور">الطيور</span> تستعد للسفر إلى بلاد دافئة.',
        illustration: `
          <svg viewBox="0 0 400 250" style="width:100%; height:100%; background:#ffe0b2;">
            <!-- Falling leaves -->
            <path d="M80,40 Q60,60 80,80" fill="none" stroke="#e65100" stroke-width="3" stroke-linecap="round"/>
            <path d="M300,30 Q280,50 300,70" fill="none" stroke="#d84315" stroke-width="3" stroke-linecap="round"/>
            <!-- Migrating birds silhouette in sky -->
            <g stroke="#5d4037" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.7">
              <path d="M220,50 Q230,40 240,50 Q250,40 260,50" />
              <path d="M160,80 Q170,70 180,80 Q190,70 200,80" transform="scale(0.8) translate(50, 20)" />
              <path d="M280,70 Q290,60 300,70 Q310,60 320,70" transform="scale(0.7) translate(100, 30)" />
            </g>
            <!-- Tree losing leaves -->
            <path d="M350,220 L350,150" stroke="#8d6e63" stroke-width="6"/>
            <path d="M320,150 C340,110 380,110 350,150" fill="#e65100"/>
          </svg>
        `,
        videoUrl: 'https://www.youtube.com/embed/-_Xn_tYyEuk?start=15'
      },
      {
        text: 'شعر العصفور <span class="story-word-clickable" data-word="الخوف">بالخوف</span> و<span class="story-word-clickable" data-word="البرد">البرد</span> لأنه لا يعرف كيف يطير لمسافات طويلة.',
        illustration: `
          <svg viewBox="0 0 400 250" style="width:100%; height:100%; background:#cfd8dc;">
            <!-- Snowflakes -->
            <circle cx="50" cy="50" r="3" fill="#fff"/>
            <circle cx="150" cy="30" r="4" fill="#fff"/>
            <circle cx="280" cy="60" r="3" fill="#fff"/>
            <!-- Shivering bird -->
            <g transform="translate(160, 100)" style="animation: wiggle 0.5s infinite">
              <circle cx="25" cy="25" r="22" fill="#ff8a80"/>
              <!-- Scared wide eyes -->
              <circle cx="17" cy="18" r="5" fill="#fff"/>
              <circle cx="17" cy="18" r="2" fill="#000"/>
              <circle cx="33" cy="18" r="5" fill="#fff"/>
              <circle cx="33" cy="18" r="2" fill="#000"/>
              <polygon points="25,26 22,22 28,22" fill="#ffd54f"/>
              <!-- Cold sweat drop -->
              <path d="M8,12 Q5,15 8,18 Q11,15 8,12" fill="#00e5ff"/>
            </g>
          </svg>
        `,
        videoUrl: 'https://www.youtube.com/embed/-_Xn_tYyEuk?start=30'
      },
      {
        text: 'ساعده <span class="story-word-clickable" data-word="أصدقاؤه">أصدقاؤه</span> وعلموه <span class="story-word-clickable" data-word="الطيران">الطيران</span> خطوة بخطوة حتى طار معهم سعيداً.',
        illustration: `
          <svg viewBox="0 0 400 250" style="width:100%; height:100%; background:#e3f2fd;">
            <!-- Flying birds together -->
            <g transform="translate(100, 80)" style="animation: bounceGently 3s infinite">
              <!-- Bird 1 (our bird learning) -->
              <g transform="translate(80, 30)">
                <circle cx="20" cy="20" r="18" fill="#ff8a80"/>
                <!-- Flapping wings -->
                <path d="M5,20 Q-15,5 5,15" fill="#ff5252"/>
                <circle cx="14" cy="14" r="2.5" fill="#000"/>
                <polygon points="20,20 24,17 20,14" fill="#ffd54f"/>
              </g>
              <!-- Friend Bird 2 leading -->
              <g transform="translate(180, 0)">
                <circle cx="20" cy="20" r="18" fill="#4fc3f7"/>
                <path d="M5,20 Q-15,-5 5,10" fill="#0288d1"/>
                <circle cx="14" cy="14" r="2.5" fill="#000"/>
                <polygon points="20,20 24,17 20,14" fill="#ffd54f"/>
              </g>
            </g>
            <!-- Clouds -->
            <ellipse cx="60" cy="50" rx="30" ry="15" fill="#fff" opacity="0.9"/>
            <ellipse cx="320" cy="70" rx="40" ry="20" fill="#fff" opacity="0.9"/>
          </svg>
        `,
        videoUrl: 'https://www.youtube.com/embed/-_Xn_tYyEuk?start=45'
      }
    ]
  },
  // ──────────────────────────────────────────────────────────────
  // NEW BOOK: عندما نام القمر
  // ──────────────────────────────────────────────────────────────
  {
    id: 'moon_sleep',
    title: 'عندما نام القمر',
    author: 'منى الشايب | رسوم: سمر صلاح الدين',
    category: 'حيوانات',
    coverGradient: `url('imgs/moon_book_cover.png') center/cover no-repeat`,
    badgeColor: '#f59e0b',
    stickerSVG: `
      <svg viewBox="0 0 100 100" class="book-sticker-svg">
        <!-- Sun glow ring -->
        <circle cx="50" cy="50" r="44" fill="#ffd166" opacity="0.25"/>
        <!-- Sun body -->
        <circle cx="50" cy="50" r="28" fill="#ff9f1c"/>
        <!-- Sun rays -->
        <line x1="50" y1="10" x2="50" y2="2"  stroke="#ffd166" stroke-width="4" stroke-linecap="round"/>
        <line x1="50" y1="90" x2="50" y2="98" stroke="#ffd166" stroke-width="4" stroke-linecap="round"/>
        <line x1="10" y1="50" x2="2"  y2="50" stroke="#ffd166" stroke-width="4" stroke-linecap="round"/>
        <line x1="90" y1="50" x2="98" y2="50" stroke="#ffd166" stroke-width="4" stroke-linecap="round"/>
        <line x1="22" y1="22" x2="16" y2="16" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/>
        <line x1="78" y1="22" x2="84" y2="16" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/>
        <line x1="22" y1="78" x2="16" y2="84" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/>
        <line x1="78" y1="78" x2="84" y2="84" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/>
        <!-- Crescent moon overlapping -->
        <path d="M58,35 C45,40 40,58 50,68 C38,66 32,52 38,40 C42,32 52,30 58,35 Z" fill="#e0e8f0" stroke="#b0bec5" stroke-width="1.5"/>
        <!-- Moon sleeping eyes -->
        <path d="M43,47 Q45,44 47,47" fill="none" stroke="#607d8b" stroke-width="2" stroke-linecap="round"/>
        <path d="M46,52 Q48,49 50,52" fill="none" stroke="#607d8b" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `,
    pages: [
      {
        text: 'في كل ليلة، كان <span class="story-word-clickable" data-word="القمر">القمرُ</span> يضيء <span class="story-word-clickable" data-word="السماء">السماءَ</span> بنوره الجميل، وتنام الكائنات على أضوائه الفضية الساحرة.',
        illustration: `
          <svg viewBox="0 0 400 250" style="width:100%;height:100%;background:linear-gradient(180deg,#0f0c29,#302b63,#24243e);">
            <!-- Stars -->
            <circle cx="50"  cy="30"  r="1.5" fill="#fff" opacity="0.9"/>
            <circle cx="120" cy="15"  r="2"   fill="#fff" opacity="0.8"/>
            <circle cx="200" cy="25"  r="1.5" fill="#fff" opacity="0.7"/>
            <circle cx="300" cy="10"  r="2"   fill="#fff" opacity="0.9"/>
            <circle cx="370" cy="35"  r="1.5" fill="#fff" opacity="0.8"/>
            <circle cx="80"  cy="60"  r="1"   fill="#fff" opacity="0.6"/>
            <circle cx="250" cy="50"  r="1.5" fill="#fff" opacity="0.7"/>
            <circle cx="340" cy="65"  r="1"   fill="#fff" opacity="0.6"/>
            <!-- Moon -->
            <circle cx="200" cy="80" r="45" fill="#e0e8f0" opacity="0.15"/>
            <path d="M220,55 C190,65 180,100 200,115 C175,112 160,88 170,65 C178,48 205,45 220,55 Z" fill="#e8f0f8" stroke="#b0c4d8" stroke-width="2"/>
            <!-- Moon face -->
            <circle cx="184" cy="78" r="3" fill="#789"/>
            <circle cx="188" cy="92" r="2" fill="#789"/>
            <path d="M182,85 Q186,88 190,85" fill="none" stroke="#789" stroke-width="1.5" stroke-linecap="round"/>
            <!-- Ground/Hills -->
            <path d="M0,200 Q100,170 200,185 Q300,200 400,175 L400,250 L0,250 Z" fill="#1a1a2e"/>
            <!-- Houses silhouette -->
            <rect x="50"  y="185" width="30" height="25" fill="#0d0d1a"/>
            <polygon points="50,185 80,185 65,170" fill="#0d0d1a"/>
            <rect x="310" y="178" width="35" height="30" fill="#0d0d1a"/>
            <polygon points="310,178 345,178 327,160" fill="#0d0d1a"/>
          </svg>
        `,
        videoUrl: 'https://www.youtube.com/embed/Y0lRzvrIKRg'
      },
      {
        text: 'لكن ذات <span class="story-word-clickable" data-word="الليل">ليلةٍ</span>، شعر <span class="story-word-clickable" data-word="القمر">القمرُ</span> بتعبٍ شديد، وبدأت جفونه الثقيلة تنغلق ببطء وببطء...',
        illustration: `
          <svg viewBox="0 0 400 250" style="width:100%;height:100%;background:linear-gradient(180deg,#1a1a2e,#16213e);">
            <!-- Dim stars -->
            <circle cx="60"  cy="20" r="1"   fill="#fff" opacity="0.4"/>
            <circle cx="150" cy="35" r="1.5" fill="#fff" opacity="0.3"/>
            <circle cx="320" cy="25" r="1"   fill="#fff" opacity="0.4"/>
            <!-- Sleepy moon with drooping eyes -->
            <circle cx="200" cy="100" r="55" fill="#c5d5e8" opacity="0.12"/>
            <path d="M225,70 C192,80 180,120 200,138 C172,135 155,108 167,82 C176,62 208,58 225,70 Z" fill="#dce8f5" stroke="#a0b8d0" stroke-width="2"/>
            <!-- Sleepy drooping eyes (half closed) -->
            <path d="M178,92 Q183,87 188,92" fill="#b0c4d8" stroke="#789aab" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M183,105 Q188,100 193,105" fill="#b0c4d8" stroke="#789aab" stroke-width="1.5" stroke-linecap="round"/>
            <!-- ZZZ -->
            <text x="230" y="75" font-family="Arial" font-size="14" fill="#a0b8c8" font-weight="bold" opacity="0.8">z</text>
            <text x="242" y="62" font-family="Arial" font-size="18" fill="#a0b8c8" font-weight="bold" opacity="0.6">z</text>
            <text x="256" y="45" font-family="Arial" font-size="22" fill="#a0b8c8" font-weight="bold" opacity="0.4">Z</text>
            <!-- Ground -->
            <path d="M0,200 Q200,180 400,195 L400,250 L0,250 Z" fill="#0d0d1a"/>
          </svg>
        `,
        videoUrl: 'https://www.youtube.com/embed/Y0lRzvrIKRg'
      },
      {
        text: 'وفجأةً... <span class="story-word-clickable" data-word="القمر">نامَ القمرُ</span>! وحلّ الظلامُ الدامسُ، ففزعت <span class="story-word-clickable" data-word="حيوانات">الحيواناتُ</span> وبكى الأطفالُ خوفاً من الظلام.',
        illustration: `
          <svg viewBox="0 0 400 250" style="width:100%;height:100%;background:#050510;">
            <!-- Total darkness with just a tiny sleeping moon -->
            <circle cx="200" cy="70" r="30" fill="#2a3a4a" opacity="0.5"/>
            <!-- Sleeping moon face - eyes tightly shut -->
            <path d="M188,65 Q192,62 196,65" fill="none" stroke="#456" stroke-width="2" stroke-linecap="round"/>
            <path d="M192,75 Q196,72 200,75" fill="none" stroke="#456" stroke-width="2" stroke-linecap="round"/>
            <!-- Scared animals silhouettes -->
            <!-- Rabbit scared -->
            <g transform="translate(80,170)">
              <ellipse cx="15" cy="25" rx="12" ry="9" fill="#1a1a2e"/>
              <circle cx="15" cy="15" r="8" fill="#1a1a2e"/>
              <path d="M12,7 Q10,0 9,0" stroke="#1a1a2e" stroke-width="3" stroke-linecap="round" fill="none"/>
              <path d="M18,7 Q20,0 21,0" stroke="#1a1a2e" stroke-width="3" stroke-linecap="round" fill="none"/>
              <!-- Wide scared eyes (white dots only) -->
              <circle cx="12" cy="13" r="2" fill="#fff" opacity="0.6"/>
              <circle cx="18" cy="13" r="2" fill="#fff" opacity="0.6"/>
            </g>
            <!-- Bird scared -->
            <g transform="translate(280,165)">
              <circle cx="20" cy="15" r="12" fill="#1a1a2e"/>
              <circle cx="12" cy="10" r="2" fill="#fff" opacity="0.6"/>
              <circle cx="20" cy="10" r="2" fill="#fff" opacity="0.6"/>
            </g>
            <!-- Ground very dark -->
            <path d="M0,210 Q200,195 400,210 L400,250 L0,250 Z" fill="#080818"/>
            <!-- Child crying (simple silhouette) -->
            <g transform="translate(190,158)">
              <circle cx="10" cy="0"  r="10" fill="#1a1a2e"/>
              <rect x="4"  y="10" width="12" height="18" fill="#1a1a2e" rx="4"/>
              <path d="M6,5 Q10,10 14,5" fill="none" stroke="#4a6fa5" stroke-width="1.5"/>
            </g>
          </svg>
        `,
        videoUrl: 'https://www.youtube.com/embed/Y0lRzvrIKRg'
      },
      {
        text: 'استيقظ <span class="story-word-clickable" data-word="القمر">القمرُ</span> على أصوات البكاء، فتذكّر مسؤوليته، وأشرق من جديد بأجمل من أي وقتٍ مضى، وعادت <span class="story-word-clickable" data-word="السعادة">السعادةُ</span> لجميع الكائنات!',
        illustration: `
          <svg viewBox="0 0 400 250" style="width:100%;height:100%;background:linear-gradient(180deg,#0f0c29,#1a237e,#283593);">
            <!-- Bright glowing moon returning -->
            <circle cx="200" cy="85" r="65" fill="#fff" opacity="0.08"/>
            <circle cx="200" cy="85" r="50" fill="#fff" opacity="0.1"/>
            <path d="M225,58 C190,70 178,112 200,128 C170,125 154,97 166,70 C175,50 208,46 225,58 Z" fill="#f0f6ff" stroke="#c5d8f0" stroke-width="2"/>
            <!-- Happy moon face -->
            <circle cx="182" cy="82" r="3.5" fill="#5c7a9a"/>
            <circle cx="188" cy="96" r="2.5" fill="#5c7a9a"/>
            <path d="M180,90 Q186,95 192,90" fill="none" stroke="#5c7a9a" stroke-width="2" stroke-linecap="round"/>
            <!-- Stars celebrating -->
            <circle cx="50"  cy="25"  r="2" fill="#ffd166"/>
            <circle cx="100" cy="15"  r="2.5" fill="#ffd166"/>
            <circle cx="300" cy="20"  r="2" fill="#ffd166"/>
            <circle cx="350" cy="40"  r="2.5" fill="#ffd166"/>
            <circle cx="150" cy="40"  r="1.5" fill="#fff"/>
            <circle cx="260" cy="50"  r="1.5" fill="#fff"/>
            <!-- Happy hills/ground -->
            <path d="M0,195 Q100,172 200,185 Q300,198 400,175 L400,250 L0,250 Z" fill="#1a237e"/>
            <!-- Happy animals -->
            <g transform="translate(70,178)">
              <ellipse cx="15" cy="25" rx="12" ry="9" fill="#fff" opacity="0.15"/>
              <circle cx="15" cy="14" r="8" fill="#fff" opacity="0.15"/>
              <path d="M12,7 Q10,0 9,0" stroke="#fff" stroke-width="2" fill="none" opacity="0.15"/>
              <path d="M18,7 Q20,0 21,0" stroke="#fff" stroke-width="2" fill="none" opacity="0.15"/>
            </g>
            <!-- Celebration sparkles -->
            <path d="M310,80 L314,70 L318,80 L308,74 L320,74 Z" fill="#ffd166" opacity="0.8"/>
            <path d="M80,100 L83,92 L86,100 L78,95 L88,95 Z" fill="#ffd166" opacity="0.8"/>
          </svg>
        `,
        videoUrl: 'https://www.youtube.com/embed/Y0lRzvrIKRg'
      }
    ]
  }
];


const vocabulary = {
  'غابة': {
    title: 'غابة (Forest)',
    desc: 'مكان أخضر واسع تنمو فيه أشجار كثيرة وتعيش فيه الحيوانات المختلفة.',
    svg: `
      <svg viewBox="0 0 100 100" width="100" height="100">
        <!-- Two animated trees -->
        <g transform="translate(15, 20)">
          <rect x="12" y="35" width="6" height="20" fill="#5c3a21"/>
          <path d="M15,5 C5,20 10,40 15,40 C20,40 25,20 15,5" fill="#06d6a0"/>
        </g>
        <g transform="translate(45, 10)">
          <rect x="17" y="45" width="8" height="25" fill="#5c3a21"/>
          <path d="M21,5 C7,25 14,50 21,50 C28,50 35,25 21,5" fill="#4caf50"/>
        </g>
      </svg>
    `
  },
  'حيوانات': {
    title: 'حيوانات (Animals)',
    desc: 'مخلوقات حية تتحرك، تأكل، وتلعب في الغابة أو المزرعة أو البحر.',
    svg: `
      <svg viewBox="0 0 100 100" width="100" height="100">
        <!-- Elephant face & bird -->
        <circle cx="50" cy="55" r="25" fill="#b0bec5"/>
        <ellipse cx="30" cy="45" rx="12" ry="16" fill="#90a4ae"/>
        <ellipse cx="70" cy="45" rx="12" ry="16" fill="#90a4ae"/>
        <path d="M50,55 Q50,85 40,85 Q35,85 45,75 Q45,65 50,55" fill="none" stroke="#b0bec5" stroke-width="8" stroke-linecap="round"/>
        <circle cx="42" cy="48" r="3" fill="#2c3e50"/>
        <circle cx="58" cy="48" r="3" fill="#2c3e50"/>
      </svg>
    `
  },
  'الأسد': {
    title: 'أسد (Lion)',
    desc: 'ملك الغابة القوي، ذو الفراء الذهبي والزئير العالي الجريء.',
    svg: `
      <svg viewBox="0 0 100 100" width="100" height="100">
        <!-- Waving Mane and head -->
        <circle cx="50" cy="50" r="40" fill="#e65100"/>
        <circle cx="50" cy="50" r="30" fill="#ffe082"/>
        <circle cx="38" cy="45" r="3" fill="#000"/>
        <circle cx="62" cy="45" r="3" fill="#000"/>
        <polygon points="50,55 45,49 55,49" fill="#e65100"/>
        <path d="M40,65 Q50,72 60,65" fill="none" stroke="#000" stroke-width="2"/>
      </svg>
    `
  },
  'الأرنب': {
    title: 'أرنب (Rabbit)',
    desc: 'حيوان صغير أبيض لطيف وسريع، ذو أذنين طويلتين ويحب أكل الجزر.',
    svg: `
      <svg viewBox="0 0 100 100" width="100" height="100">
        <path d="M40,35 Q30,5 30,5 Q30,5 42,25" fill="#fff" stroke="#ffb7b2" stroke-width="2"/>
        <path d="M60,35 Q70,5 70,5 Q70,5 58,25" fill="#fff" stroke="#ffb7b2" stroke-width="2"/>
        <circle cx="50" cy="55" r="22" fill="#fff"/>
        <circle cx="42" cy="50" r="2.5" fill="#000"/>
        <circle cx="58" cy="50" r="2.5" fill="#000"/>
        <circle cx="50" cy="58" r="4" fill="#ffb7b2"/>
      </svg>
    `
  },
  'خطة': {
    title: 'خطة (Plan / Idea)',
    desc: 'فكرة ذكية نقوم بالتفكير فيها وتجهيزها لحل المشكلات بنجاح.',
    svg: `
      <svg viewBox="0 0 100 100" width="100" height="100" style="animation: bounceGently 3s infinite">
        <circle cx="50" cy="45" r="22" fill="#ffd166"/>
        <rect x="42" y="65" width="16" height="10" fill="#b0bec5" rx="2"/>
        <path d="M45,78 L55,78" stroke="#37474f" stroke-width="3"/>
        <path d="M50,15 L50,8" stroke="#ffd166" stroke-width="4" stroke-linecap="round"/>
        <path d="M25,35 L18,32" stroke="#ffd166" stroke-width="4" stroke-linecap="round"/>
        <path d="M75,35 L82,32" stroke="#ffd166" stroke-width="4" stroke-linecap="round"/>
      </svg>
    `
  },
  'بئر': {
    title: 'بئر (Well)',
    desc: 'فتحة دائرية عميقة مبنية من الحجارة في الأرض، نجد الماء العذب في أسفلها.',
    svg: `
      <svg viewBox="0 0 100 100" width="100" height="100">
        <rect x="25" y="45" width="50" height="35" fill="#90a4ae" rx="4"/>
        <ellipse cx="50" cy="45" rx="25" ry="8" fill="#37474f"/>
        <ellipse cx="50" cy="45" rx="20" ry="5" fill="#00e5ff"/>
        <!-- Rope -->
        <line x1="50" y1="20" x2="50" y2="45" stroke="#8d6e63" stroke-width="3" stroke-dasharray="3,3"/>
      </svg>
    `
  },
  'البحر': {
    title: 'بحر (Sea)',
    desc: 'مياه مالحة زرقاء وواسعة تعيش فيها الأسماك الملونة والكائنات اللطيفة.',
    svg: `
      <svg viewBox="0 0 100 100" width="100" height="100">
        <path d="M10,40 Q30,25 50,40 T90,40 L90,80 L10,80 Z" fill="#29b6f6"/>
        <path d="M10,55 Q30,40 50,55 T90,55 L90,80 L10,80 Z" fill="#0288d1" opacity="0.7"/>
        <!-- Small fish -->
        <path d="M30,60 Q40,55 50,60 L53,57 L52,63 Z" fill="#ffd54f"/>
      </svg>
    `
  },
  'سمكة': {
    title: 'سمكة (Fish)',
    desc: 'حيوان مائي لطيف يسبح بمهارة مستخدماً ذيله وزعانفه الملونة.',
    svg: `
      <svg viewBox="0 0 100 100" width="100" height="100">
        <path d="M15,50 Q45,20 75,45 L85,35 L83,55 L88,60 Z" fill="#ff7043" stroke="#d84315" stroke-width="2"/>
        <circle cx="35" cy="40" r="3.5" fill="#fff"/>
        <circle cx="35" cy="40" r="1.5" fill="#000"/>
        <path d="M25,52 Q35,58 45,52" fill="none" stroke="#d84315" stroke-width="2"/>
      </svg>
    `
  },
  'مساعدة': {
    title: 'مساعدة (Help)',
    desc: 'تقديم يد العون لأصدقائنا ومن يحتاج إلينا، مما ينشر الفرح والمحبة.',
    svg: `
      <svg viewBox="0 0 100 100" width="100" height="100" style="animation: bounceGently 4s infinite">
        <path d="M15,70 Q30,50 45,70 L55,60 Q40,40 25,60 Z" fill="#4db6ac"/>
        <!-- Heart floating between hands -->
        <path d="M50,35 C50,30 45,25 40,25 C34,25 34,32 40,38 L50,48 L60,38 C66,32 66,25 60,25 C55,25 50,30 50,35 Z" fill="#ff5252"/>
      </svg>
    `
  },
  'المرجان': {
    title: 'مرجان (Coral)',
    desc: 'كائنات حية ملونة تشبه النباتات، تنمو في قاع البحر وتوفر بيتاً آمناً للأسماك.',
    svg: `
      <svg viewBox="0 0 100 100" width="100" height="100">
        <g fill="#ec407a">
          <path d="M30,90 L40,40 L50,90 Z"/>
          <path d="M40,65 L55,50 L47,75 Z"/>
          <path d="M35,70 L20,55 L32,80 Z"/>
        </g>
        <g fill="#ab47bc" transform="translate(25, 10) scale(0.8)">
          <path d="M30,90 L40,45 L50,90 Z"/>
          <path d="M40,68 L58,55 L48,78 Z"/>
        </g>
      </svg>
    `
  },
  'شبكة': {
    title: 'شبكة صيد (Fishing Net)',
    desc: 'أداة مصنوعة من خيوط متقاطعة يستخدمها الصياد لجمع الأسماك من الماء.',
    svg: `
      <svg viewBox="0 0 100 100" width="100" height="100">
        <g stroke="#37474f" stroke-width="2" opacity="0.8">
          <line x1="10" y1="10" x2="90" y2="90"/>
          <line x1="30" y1="10" x2="90" y2="70"/>
          <line x1="10" y1="30" x2="70" y2="90"/>
          <line x1="90" y1="10" x2="10" y2="90"/>
          <line x1="70" y1="10" x2="10" y2="70"/>
          <line x1="90" y1="30" x2="30" y2="90"/>
        </g>
      </svg>
    `
  },
  'أصدقاؤه': {
    title: 'أصدقاء (Friends)',
    desc: 'أشخاص رائعون نحبهم، نلعب معهم، نساعدهم ونتشارك الأوقات السعيدة معاً.',
    svg: `
      <svg viewBox="0 0 100 100" width="100" height="100">
        <!-- Two kids hugging -->
        <circle cx="35" cy="40" r="12" fill="#ffb74d"/>
        <circle cx="65" cy="40" r="12" fill="#81c784"/>
        <path d="M15,80 C15,65 35,60 35,80" stroke="#ffb74d" stroke-width="12" stroke-linecap="round"/>
        <path d="M85,80 C85,65 65,60 65,80" stroke="#81c784" stroke-width="12" stroke-linecap="round"/>
        <!-- Heart in middle -->
        <path d="M50,50 Q45,45 50,40 Q55,45 50,50" fill="#ff5252" transform="scale(1.5) translate(-17, -13)"/>
      </svg>
    `
  },
  'عصفور': {
    title: 'عصفور (Bird)',
    desc: 'طائر صغير وجميل يغرد بألحان عذبة وله أجنحة تطير به عالياً في السماء.',
    svg: `
      <svg viewBox="0 0 100 100" width="100" height="100">
        <circle cx="45" cy="50" r="20" fill="#4fc3f7"/>
        <path d="M25,50 Q10,40 20,45" fill="#0288d1"/>
        <circle cx="38" cy="44" r="2.5" fill="#000"/>
        <polygon points="45,52 53,48 45,44" fill="#ffd54f"/>
        <!-- Tail -->
        <path d="M63,45 L75,38 L72,52 Z" fill="#0288d1"/>
      </svg>
    `
  },
  'النوم': {
    title: 'نوم (Sleep)',
    desc: 'إغلاق الأعين والاسترخاء ليلاً ليرتاح الجسم ويحلم بأحلام سعيدة.',
    svg: `
      <svg viewBox="0 0 100 100" width="100" height="100" style="animation: bounceGently 4s infinite">
        <path d="M70,30 C50,30 35,45 35,65 C35,73 39,80 45,85 C30,80 20,65 20,50 C20,30 36,15 55,15 C62,15 68,18 70,30 Z" fill="#ffd166"/>
        <text x="50" y="55" font-family="var(--font-kids)" font-size="14" fill="#ff5252" font-weight="bold">Z</text>
        <text x="63" y="42" font-family="var(--font-kids)" font-size="18" fill="#ff5252" font-weight="bold">Z</text>
      </svg>
    `
  },
  'الخريف': {
    title: 'خريف (Autumn)',
    desc: 'فصل لطيف في السنة، تتساقط فيه أوراق الأشجار الصفراء ويصبح الهواء بارداً.',
    svg: `
      <svg viewBox="0 0 100 100" width="100" height="100">
        <!-- Falling Orange Leaf -->
        <path d="M50,15 C20,40 45,75 50,85 C55,75 80,40 50,15 Z" fill="#ff9100"/>
        <line x1="50" y1="15" x2="50" y2="85" stroke="#d84315" stroke-width="2"/>
        <path d="M50,35 Q35,45 50,55" fill="none" stroke="#d84315" stroke-width="1.5"/>
        <path d="M50,50 Q65,60 50,70" fill="none" stroke="#d84315" stroke-width="1.5"/>
      </svg>
    `
  },
  'الخوف': {
    title: 'خوف (Fear)',
    desc: 'شعور طبيعي بالقلق أو التردد عند مواجهة شيء مخيف أو مجهول.',
    svg: `
      <svg viewBox="0 0 100 100" width="100" height="100">
        <circle cx="50" cy="50" r="35" fill="#cfd8dc"/>
        <circle cx="38" cy="45" r="7" fill="#fff"/>
        <circle cx="38" cy="45" r="3" fill="#000"/>
        <circle cx="62" cy="45" r="7" fill="#fff"/>
        <circle cx="62" cy="45" r="3" fill="#000"/>
        <!-- Shaky mouth -->
        <path d="M35,70 Q40,65 45,70 T55,70 T65,70" fill="none" stroke="#37474f" stroke-width="3"/>
      </svg>
    `
  },
  'البرد': {
    title: 'برد (Cold)',
    desc: 'انخفاض درجات الحرارة والشعور بالحاجة لارتداء معطف دافئ وحضن الأصدقاء.',
    svg: `
      <svg viewBox="0 0 100 100" width="100" height="100">
        <!-- Snowflake design -->
        <line x1="50" y1="10" x2="50" y2="90" stroke="#00e5ff" stroke-width="4" stroke-linecap="round"/>
        <line x1="10" y1="50" x2="90" y2="50" stroke="#00e5ff" stroke-width="4" stroke-linecap="round"/>
        <line x1="20" y1="20" x2="80" y2="80" stroke="#00e5ff" stroke-width="4" stroke-linecap="round"/>
        <line x1="80" y1="20" x2="20" y2="80" stroke="#00e5ff" stroke-width="4" stroke-linecap="round"/>
        <circle cx="50" cy="50" r="8" fill="#e0f7fa" stroke="#00e5ff" stroke-width="3"/>
      </svg>
    `
  },
  'الطيران': {
    title: 'طيران (Flying)',
    desc: 'التحليق عالياً في الفضاء الشاسع ونسمات الهواء المبهجة باستخدام الأجنحة.',
    svg: `
      <svg viewBox="0 0 100 100" width="100" height="100" style="animation: bounceGently 2s infinite">
        <path d="M20,50 Q50,20 80,50 Q50,80 20,50 Z" fill="none" stroke="#2ab7ca" stroke-width="4"/>
        <path d="M30,50 Q50,30 70,50" fill="none" stroke="#ff6b6b" stroke-width="3"/>
        <path d="M40,50 Q50,40 60,50" fill="none" stroke="#ffd166" stroke-width="2"/>
      </svg>
    `
  }
};

// 28 Arabic Alphabet database for Sign language learning
const alphabetList = [
  { char: 'أ', word: 'أرنب', translation: 'Rabbit', gestureName: 'الإبهام للأعلى', svgHand: `
    <g transform="translate(10, 10)">
      <!-- Wrist -->
      <path d="M35,80 L35,60 Q35,50 45,50 L55,50 Q65,50 65,60 L65,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- Fist -->
      <rect x="35" y="35" width="30" height="25" rx="8" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- Standing index finger for Alif -->
      <rect x="37" y="10" width="10" height="30" rx="5" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
    </g>
  `},
  { char: 'ب', word: 'بطة', translation: 'Duck', gestureName: 'اليد المفرودة أفقياً مع النقطة', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M25,80 L25,50 Q30,40 50,40 L60,40 Q75,40 75,55 L75,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- Horizontal Flat Hand -->
      <rect x="30" y="30" width="45" height="15" rx="7" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- Dot under hand -->
      <circle cx="52" cy="60" r="5" fill="#ff6b6b" />
    </g>
  `},
  { char: 'ت', word: 'تمساح', translation: 'Crocodile', gestureName: 'إصبعان مفرودان للأعلى ونقطتان', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M30,80 L30,55 Q35,45 50,45 Q65,45 65,55 L65,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <rect x="33" y="35" width="28" height="25" rx="5" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- Index & Middle extended -->
      <rect x="38" y="12" width="8" height="28" rx="4" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <rect x="48" y="12" width="8" height="28" rx="4" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- Two dots -->
      <circle cx="34" cy="55" r="3.5" fill="#ff6b6b" />
      <circle cx="43" cy="55" r="3.5" fill="#ff6b6b" />
    </g>
  `},
  { char: 'ث', word: 'ثعلب', translation: 'Fox', gestureName: 'ثلاثة أصابع مفرودة للأعلى وثلاث نقاط', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M30,80 L30,55 Q35,45 50,45 Q65,45 65,55 L65,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <rect x="30" y="35" width="35" height="25" rx="5" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- Three fingers extended -->
      <rect x="33" y="12" width="7" height="28" rx="3.5" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <rect x="42" y="10" width="7" height="30" rx="3.5" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <rect x="51" y="12" width="7" height="28" rx="3.5" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
    </g>
  `},
  { char: 'ج', word: 'جمل', translation: 'Camel', gestureName: 'قبضة نصف دائرية أسفل الذقن', svgHand: `
    <g transform="translate(10, 10)">
      <!-- Curved hand shape for Jeem -->
      <path d="M25,75 Q30,40 50,40 T75,40" fill="none" stroke="#2c3e50" stroke-width="12" stroke-linecap="round"/>
      <path d="M25,75 Q30,40 50,40 T75,40" fill="none" stroke="#ffd166" stroke-width="8" stroke-linecap="round"/>
      <circle cx="50" cy="55" r="6" fill="#ff6b6b" />
    </g>
  `},
  { char: 'ح', word: 'حمامة', translation: 'Pigeon', gestureName: 'يد مقوسة كحرف الحاء', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M25,70 Q30,35 50,35 T75,35" fill="none" stroke="#2c3e50" stroke-width="12" stroke-linecap="round"/>
      <path d="M25,70 Q30,35 50,35 T75,35" fill="none" stroke="#ffd166" stroke-width="8" stroke-linecap="round"/>
    </g>
  `},
  { char: 'خ', word: 'خروف', translation: 'Sheep', gestureName: 'يد مقوسة مع نقطة بالأعلى', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M25,70 Q30,35 50,35 T75,35" fill="none" stroke="#2c3e50" stroke-width="12" stroke-linecap="round"/>
      <path d="M25,70 Q30,35 50,35 T75,35" fill="none" stroke="#ffd166" stroke-width="8" stroke-linecap="round"/>
      <circle cx="50" cy="20" r="6" fill="#ff6b6b" />
    </g>
  `},
  { char: 'د', word: 'دلفين', translation: 'Dolphin', gestureName: 'سبابة مائلة لليمين كالدال', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M30,80 L35,55 Q40,48 50,50 L65,58 L65,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- Slanted pointer -->
      <path d="M35,45 L55,25 Q60,20 65,25 L45,48 Z" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
    </g>
  `},
  { char: 'ذ', word: 'ذئب', translation: 'Wolf', gestureName: 'سبابة مائلة مع نقطة بالأعلى', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M30,80 L35,55 Q40,48 50,50 L65,58 L65,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <path d="M35,45 L55,25 Q60,20 65,25 L45,48 Z" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <circle cx="65" cy="15" r="5" fill="#ff6b6b" />
    </g>
  `},
  { char: 'ر', word: 'أرنب', translation: 'Rabbit', gestureName: 'سبابة منثنية لأسفل كالراء', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M40,80 L40,60 L58,60 L58,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- Curved down finger -->
      <path d="M40,60 C40,40 60,40 55,60" fill="none" stroke="#2c3e50" stroke-width="12" stroke-linecap="round"/>
      <path d="M40,60 C40,40 60,40 55,60" fill="none" stroke="#ffd166" stroke-width="8" stroke-linecap="round"/>
    </g>
  `},
  { char: 'ز', word: 'زرافة', translation: 'Giraffe', gestureName: 'سبابة منثنية لأسفل مع نقطة', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M40,80 L40,60 L58,60 L58,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <path d="M40,60 C40,40 60,40 55,60" fill="none" stroke="#2c3e50" stroke-width="12" stroke-linecap="round"/>
      <path d="M40,60 C40,40 60,40 55,60" fill="none" stroke="#ffd166" stroke-width="8" stroke-linecap="round"/>
      <circle cx="50" cy="30" r="5.5" fill="#ff6b6b" />
    </g>
  `},
  { char: 'س', word: 'سمكة', translation: 'Fish', gestureName: 'أصابع اليد مضمومة ومفرودة كالمشط', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M25,80 L25,50 Q30,40 50,40 Q70,40 70,50 L70,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- 4 flat upright fingers close together -->
      <rect x="30" y="15" width="7" height="35" rx="3" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <rect x="39" y="12" width="7" height="38" rx="3" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <rect x="48" y="12" width="7" height="38" rx="3" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <rect x="57" y="15" width="7" height="35" rx="3" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
    </g>
  `},
  { char: 'ش', word: 'شمس', translation: 'Sun', gestureName: 'كف مفرود متباعد الأصابع مع ثلاث نقاط', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M25,80 L25,55 C30,48 50,45 50,55 L50,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- Splayed fingers -->
      <path d="M20,30 L30,45 M32,15 L40,43 M55,12 L48,43 M70,22 L55,48" stroke="#2c3e50" stroke-width="12" stroke-linecap="round"/>
      <path d="M20,30 L30,45 M32,15 L40,43 M55,12 L48,43 M70,22 L55,48" stroke="#ffd166" stroke-width="8" stroke-linecap="round"/>
      <!-- Three dots -->
      <circle cx="48" cy="65" r="3" fill="#ff6b6b" />
      <circle cx="56" cy="65" r="3" fill="#ff6b6b" />
      <circle cx="52" cy="58" r="3" fill="#ff6b6b" />
    </g>
  `},
  { char: 'ص', word: 'صقر', translation: 'Falcon', gestureName: 'قبضة يد مضمومة بالكامل', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M30,80 L30,55 Q35,45 50,45 Q65,45 65,55 L65,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- Tight Fist -->
      <circle cx="48" cy="48" r="18" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
    </g>
  `},
  { char: 'ض', word: 'ضفدع', translation: 'Frog', gestureName: 'قبضة يد مضمومة مع نقطة بالأعلى', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M30,80 L30,55 Q35,45 50,45 Q65,45 65,55 L65,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <circle cx="48" cy="48" r="18" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <circle cx="48" cy="22" r="5" fill="#ff6b6b" />
    </g>
  `},
  { char: 'ط', word: 'طائرة', translation: 'Airplane', gestureName: 'كف مفرود وسبابة ممتدة أفقياً', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M25,80 L25,50 Q30,40 50,40 L60,40 Q75,40 75,55 L75,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <rect x="25" y="32" width="45" height="15" rx="7" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- Upright thumb like Taa -->
      <rect x="42" y="14" width="8" height="20" rx="3" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
    </g>
  `},
  { char: 'ظ', word: 'ظرف', translation: 'Envelope', gestureName: 'كف مفرود وسبابة ممتدة مع نقطة', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M25,80 L25,50 Q30,40 50,40 L60,40 Q75,40 75,55 L75,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <rect x="25" y="32" width="45" height="15" rx="7" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <rect x="42" y="14" width="8" height="20" rx="3" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <circle cx="62" cy="18" r="5" fill="#ff6b6b" />
    </g>
  `},
  { char: 'ع', word: 'عصفور', translation: 'Bird', gestureName: 'إبهام وسبابة يشكلان نصف دائرة مفتوحة', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M30,80 L35,55 Q40,48 50,50 L65,58 L65,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- Open C shape -->
      <path d="M60,25 C40,25 35,45 55,45" fill="none" stroke="#2c3e50" stroke-width="12" stroke-linecap="round"/>
      <path d="M60,25 C40,25 35,45 55,45" fill="none" stroke="#ffd166" stroke-width="8" stroke-linecap="round"/>
    </g>
  `},
  { char: 'غ', word: 'غزال', translation: 'Gazelle', gestureName: 'نصف دائرة مفتوحة مع نقطة بالأعلى', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M30,80 L35,55 Q40,48 50,50 L65,58 L65,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <path d="M60,25 C40,25 35,45 55,45" fill="none" stroke="#2c3e50" stroke-width="12" stroke-linecap="round"/>
      <path d="M60,25 C40,25 35,45 55,45" fill="none" stroke="#ffd166" stroke-width="8" stroke-linecap="round"/>
      <circle cx="50" cy="14" r="5" fill="#ff6b6b" />
    </g>
  `},
  { char: 'ف', word: 'فراشة', translation: 'Butterfly', gestureName: 'حلقة دائرية بالسبابة والإبهام مع نقطة واحدة', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M30,80 L35,58 Q40,50 50,50 Q60,50 65,58 L65,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- Circular pinch -->
      <circle cx="50" cy="35" r="14" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <circle cx="50" cy="35" r="6" fill="#e0f7fa" />
      <circle cx="50" cy="12" r="5.5" fill="#ff6b6b" />
    </g>
  `},
  { char: 'ق', word: 'قرد', translation: 'Monkey', gestureName: 'حلقة دائرية بالإبهام والسبابة مع نقطتين', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M30,80 L35,58 Q40,50 50,50 Q60,50 65,58 L65,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <circle cx="50" cy="35" r="14" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <circle cx="50" cy="35" r="6" fill="#e0f7fa" />
      <circle cx="42" cy="12" r="4.5" fill="#ff6b6b" />
      <circle cx="58" cy="12" r="4.5" fill="#ff6b6b" />
    </g>
  `},
  { char: 'ك', word: 'كتاب', translation: 'Book', gestureName: 'كف مقوس بشكل حرف الكاف الكبير', svgHand: `
    <g transform="translate(10, 10)">
      <!-- Large L/C shape -->
      <path d="M25,65 L55,65 L55,25" fill="none" stroke="#2c3e50" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M25,65 L55,65 L55,25" fill="none" stroke="#ffd166" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  `},
  { char: 'ل', word: 'ليمون', translation: 'Lemon', gestureName: 'السبابة والإبهام يشكلان زاوية قائمة كحرف L', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M35,80 L35,55 L58,55 L58,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- L Shape fingers -->
      <rect x="35" y="15" width="8" height="40" rx="3.5" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <rect x="42" y="47" width="25" height="8" rx="3.5" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
    </g>
  `},
  { char: 'م', word: 'موز', translation: 'Banana', gestureName: 'إبهام مضموم للداخل مع أصابع مطوية', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M30,80 L30,55 Q35,45 50,45 Q65,45 65,55 L65,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- Closed hand, thumb crossing -->
      <circle cx="48" cy="48" r="16" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <path d="M38,48 Q48,58 55,42" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
    </g>
  `},
  { char: 'ن', word: 'نحلة', translation: 'Bee', gestureName: 'السبابة مفرودة للأعلى ونقطة بداخل الكف', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M30,80 L30,55 Q35,45 50,45 Q65,45 65,55 L65,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <rect x="34" y="38" width="28" height="20" rx="4" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- Upright Index -->
      <rect x="36" y="12" width="8" height="26" rx="4" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- Dot inside Palm -->
      <circle cx="48" cy="48" r="4.5" fill="#ff6b6b"/>
    </g>
  `},
  { char: 'هـ', word: 'هلال', translation: 'Crescent', gestureName: 'الكف مفتوح ومقوس كالهلال', svgHand: `
    <g transform="translate(10, 10)">
      <!-- Semicircular open hand -->
      <path d="M22,50 C22,25 68,25 68,50" fill="none" stroke="#2c3e50" stroke-width="12" stroke-linecap="round"/>
      <path d="M22,50 C22,25 68,25 68,50" fill="none" stroke="#ffd166" stroke-width="8" stroke-linecap="round"/>
    </g>
  `},
  { char: 'و', word: 'وردة', translation: 'Flower', gestureName: 'الأصابع ملتوية على شكل دائرة مغلقة بالكامل', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M30,80 L35,60 Q40,52 50,52 Q60,52 65,60 L65,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- Complete circle loop -->
      <circle cx="50" cy="38" r="16" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <circle cx="50" cy="38" r="7" fill="#e0f7fa" />
    </g>
  `},
  { char: 'ي', word: 'يد', translation: 'Hand', gestureName: 'خنصر وإبهام مفرودان كإشارة الاتصال V', svgHand: `
    <g transform="translate(10, 10)">
      <path d="M30,80 L30,55 Q35,48 50,48 Q65,48 65,55 L65,80" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <rect x="35" y="38" width="28" height="22" rx="4" fill="#ffd166" stroke="#2c3e50" stroke-width="3"/>
      <!-- Pinky and thumb extended -->
      <path d="M25,32 L35,42 M60,42 L72,32" stroke="#2c3e50" stroke-width="10" stroke-linecap="round"/>
      <path d="M25,32 L35,42 M60,42 L72,32" stroke="#ffd166" stroke-width="6" stroke-linecap="round"/>
    </g>
  `}
];

// -------------------------------------------------------------
// ENGLISH SIGN LANGUAGE ALPHABET (A-Z) — local images
// -------------------------------------------------------------
const englishAlphabet = [
  { letter: 'A', imgUrl: 'imgs/Sign_Language_A.png' },
  { letter: 'B', imgUrl: 'imgs/Sign_Language_B.png' },
  { letter: 'C', imgUrl: 'imgs/Sign_Language_C.png' },
  { letter: 'D', imgUrl: 'imgs/Sign_Language_D.png' },
  { letter: 'E', imgUrl: 'imgs/Sign_Language_E.png' },
  { letter: 'F', imgUrl: 'imgs/Sign_Language_F.png' },
  { letter: 'G', imgUrl: 'imgs/Sign_Language_G.png' },
  { letter: 'H', imgUrl: 'imgs/Sign_Language_H.png' },
  { letter: 'I', imgUrl: 'imgs/Sign_Language_I.png' },
  { letter: 'J', imgUrl: 'imgs/Sign_Language_J.png' },
  { letter: 'K', imgUrl: 'imgs/Sign_Language_K.png' },
  { letter: 'L', imgUrl: 'imgs/Sign_Language_L.png' },
  { letter: 'M', imgUrl: 'imgs/Sign_Language_M.png' },
  { letter: 'N', imgUrl: 'imgs/Sign_Language_N.png' },
  { letter: 'O', imgUrl: 'imgs/Sign_Language_O.png' },
  { letter: 'P', imgUrl: 'imgs/Sign_Language_P.png' },
  { letter: 'Q', imgUrl: 'imgs/Sign_Language_Q.png' },
  { letter: 'R', imgUrl: 'imgs/Sign_Language_R.png' },
  { letter: 'S', imgUrl: 'imgs/Sign_Language_S.png' },
  { letter: 'T', imgUrl: 'imgs/Sign_Language_T.png' },
  { letter: 'U', imgUrl: 'imgs/Sign_Language_U.png' },
  { letter: 'V', imgUrl: 'imgs/Sign_Language_V.png' },
  { letter: 'W', imgUrl: 'imgs/Sign_Language_W.png' },
  { letter: 'X', imgUrl: 'imgs/Sign_Language_X.png' },
  { letter: 'Y', imgUrl: 'imgs/Sign_Language_Y.png' },
  { letter: 'Z', imgUrl: 'imgs/Sign_Language_Z.png' },
];

// -------------------------------------------------------------
// ENGLISH SIGN LANGUAGE NUMBERS (1-9) — local images
// Arabic numerals shown alongside
// -------------------------------------------------------------
const signNumbers = [
  { num: 1, arabic: '١', imgUrl: 'imgs/Number_1-Filled.png' },
  { num: 2, arabic: '٢', imgUrl: 'imgs/Number_2-Filled.png' },
  { num: 3, arabic: '٣', imgUrl: 'imgs/Number_3-Filled.png' },
  { num: 4, arabic: '٤', imgUrl: 'imgs/Number_4-Filled.png' },
  { num: 5, arabic: '٥', imgUrl: 'imgs/Number_5-Filled.png' },
  { num: 6, arabic: '٦', imgUrl: 'imgs/Number_6-Filled.png' },
  { num: 7, arabic: '٧', imgUrl: 'imgs/Number_7-Filled.png' },
  { num: 8, arabic: '٨', imgUrl: 'imgs/Number_8-Filled.png' },
  { num: 9, arabic: '٩', imgUrl: 'imgs/Number_9-Filled.png' },
];



// UI CONTROLLER & ROUTING
// -------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  renderBookshelf();
  renderAlphabetGrid();
  setupEventListeners();
});

// Setup Initial App State Visuals
function initApp() {
  // Generate Background Clouds
  const cloudsBg = document.querySelector('.clouds-bg');
  for (let i = 1; i <= 3; i++) {
    const cloud = document.createElement('div');
    cloud.className = `cloud cloud-${i}`;
    cloudsBg.appendChild(cloud);
  }
}

// -------------------------------------------------------------
// BOOKSHELF DRAWING & FILTERING
// -------------------------------------------------------------

function renderBookshelf(filterCategory = 'all', searchQuery = '') {
  const container = document.getElementById('bookshelf-rows');
  container.innerHTML = ''; // Reset shelf rows

  // Filter stories
  let filtered = stories;
  if (filterCategory !== 'all') {
    filtered = stories.filter(s => s.category === filterCategory);
  }
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(s => s.title.includes(q) || s.author.includes(q));
  }

  // Group books onto shelves (max 3 books per shelf row)
  const booksPerShelf = 3;
  const numShelves = Math.max(1, Math.ceil(filtered.length / booksPerShelf));

  for (let i = 0; i < numShelves; i++) {
    const shelfRow = document.createElement('div');
    shelfRow.className = 'shelf-row';

    // Get books for this shelf
    const startIndex = i * booksPerShelf;
    const shelfBooks = filtered.slice(startIndex, startIndex + booksPerShelf);

    shelfBooks.forEach(book => {
      const bookEl = document.createElement('div');
      bookEl.className = 'book-spine-card';
      bookEl.dataset.id = book.id;
      bookEl.innerHTML = `
        <div class="book-cover" style="background: ${book.coverGradient}">
          <span class="book-badge" style="background: ${book.badgeColor}">${book.category}</span>
          ${book.stickerSVG}
          <div class="book-info-holder">
            <h3 class="book-title">${book.title}</h3>
            <span class="book-author">${book.author}</span>
          </div>
        </div>
      `;
      bookEl.addEventListener('click', () => openBook(book.id));
      shelfRow.appendChild(bookEl);
    });

    // Add wooden shelf bar
    const wood = document.createElement('div');
    wood.className = 'shelf-wood';
    shelfRow.appendChild(wood);

    container.appendChild(shelfRow);
  }

  // Handle empty state
  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; font-weight: bold; color: #64748b;">
        <p style="font-size: 1.3rem; margin-bottom: 10px;">أوه! لم نجد أي قصة بهذا الاسم 😢</p>
        <button class="filter-btn" onclick="resetSearchFilters()" style="margin-top: 10px;">عرض كل القصص</button>
      </div>
    `;
  }
}

function resetSearchFilters() {
  document.getElementById('search-books').value = '';
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
  renderBookshelf('all', '');
}

// -------------------------------------------------------------
// 3D BOOK VIEWER LOGIC (FLIPPING PAGES)
// -------------------------------------------------------------

// -------------------------------------------------------------
// SMART VIDEO PLAYER BUILDER
// YouTube links → clickable thumbnail (file:// can't embed YT)
// Other URLs → direct iframe
// -------------------------------------------------------------
function buildVideoPlayer(videoUrl) {
  // Extract YouTube video ID from embed or short URLs
  const ytMatch = videoUrl.match(/(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([A-Za-z0-9_-]{11})/);

  if (ytMatch) {
    const videoId = ytMatch[1];
    const isLocalhost = location.protocol === 'http:' || location.protocol === 'https:';

    if (isLocalhost) {
      // Served via HTTP — YouTube iframe works perfectly
      return `<iframe class="sign-video-player"
        src="https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1"
        title="Sign language story video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>`;
    } else {
      // Opened via file:// — show clickable thumbnail instead
      const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
      return `
        <a href="${watchUrl}" target="_blank" rel="noopener" class="yt-thumb-link" title="شاهد على يوتيوب">
          <img src="${thumbnail}" alt="فيديو القصة بلغة الإشارة" class="yt-thumb-img"
               onerror="this.src='https://img.youtube.com/vi/${videoId}/mqdefault.jpg'" />
          <div class="yt-play-btn">
            <svg viewBox="0 0 68 48" width="68" height="48">
              <path d="M66.5 7.7c-.8-2.9-3-5.2-5.9-6C55.8 0 34 0 34 0S12.2 0 7.4 1.7c-2.9.8-5.1 3.1-5.9 6C0 12.5 0 24 0 24s0 11.5 1.5 16.3c.8 2.9 3 5.2 5.9 6C12.2 48 34 48 34 48s21.8 0 26.6-1.7c2.9-.8 5.1-3.1 5.9-6C68 35.5 68 24 68 24S68 12.5 66.5 7.7z" fill="#ff0000"/>
              <path d="M45 24L27 14v20" fill="#fff"/>
            </svg>
          </div>
          <div class="yt-watch-label">▶ شاهد على يوتيوب</div>
        </a>`;
    }
  }

  // Default: standard iframe (Google Drive, direct video, etc.)
  return `<iframe class="sign-video-player" src="${videoUrl}" title="Sign language story video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}

function openBook(bookId) {

  const book = stories.find(s => s.id === bookId);
  if (!book) return;

  state.activeBookId = bookId;
  state.currentPageIndex = 0;

  // Set Title Badge
  document.getElementById('reader-title-badge').innerText = book.title;

  // Build Book Pages inside the 3D Container
  const container3d = document.getElementById('book-container-3d');
  container3d.innerHTML = ''; // Clear

  // 1. Cover Page Front & inside (Page 0)
  const coverPage = document.createElement('div');
  coverPage.className = 'page-3d';
  coverPage.style.zIndex = '105';
  coverPage.id = 'page-cover';
  coverPage.innerHTML = `
    <div class="page-side" style="background: ${book.coverGradient}; color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius: 0 16px 16px 0;">
      <h1 style="font-size: 2.2rem; font-weight: 900; margin-bottom: 20px; text-shadow: 2px 2px 5px rgba(0,0,0,0.2);">${book.title}</h1>
      <div style="width: 150px; height: 150px; background: rgba(255,255,255,0.15); border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-bottom: 20px;">
        ${book.stickerSVG}
      </div>
      <p style="font-size: 1.2rem; font-weight: 600;">تأليف: ${book.author}</p>
      <button class="btn-reader-next" onclick="turnNextPage()" style="margin-top: 30px; animation: bounceGently 2s infinite;">ابدأ القراءة 📖</button>
    </div>
    <div class="page-side back" style="background: #fffcf0;">
      <div class="page-content-wrapper" style="justify-content: center;">
        <h2 style="font-weight: 900; color: var(--primary-blue); margin-bottom: 15px;">مرحباً بك يا بطل! 👋</h2>
        <p style="font-size: 1.25rem; line-height: 1.8; color: var(--text-dark); font-weight: 600; text-align: center; padding: 0 20px;">
          في هذه القصة، ستجد كلمات ملونة تحتها خط. انقر عليها لتتعلم حركتها بلغة الإشارة! كما يمكنك مشاهدة القصة كاملة بلغة الإشارة في الشاشة المجاورة.
        </p>
      </div>
    </div>
  `;
  container3d.appendChild(coverPage);

  // 2. Story Pages
  book.pages.forEach((pageData, idx) => {
    const pageEl = document.createElement('div');
    pageEl.className = 'page-3d';
    pageEl.id = `page-${idx + 1}`;
    pageEl.style.zIndex = 100 - idx; // Stacking order
    pageEl.innerHTML = `
      <!-- LEFT PAGE (Text, Illustration, Word Clicks) -->
      <div class="page-side">
        <div class="page-content-wrapper">
          <div class="story-page-text">${pageData.text}</div>
          <div class="story-illustration-holder">${pageData.illustration}</div>
          <span class="story-page-num">${(idx * 2) + 1}</span>
        </div>
      </div>
      <!-- RIGHT PAGE (Sign Language Video Player) -->
      <div class="page-side back">
        <div class="page-content-wrapper">
          <div class="sign-video-container">
            ${buildVideoPlayer(pageData.videoUrl)}
          </div>
          <div class="sign-subtitle-overlay">
            ترجمة الصفحة بلغة الإشارة العربية للأطفال الصم والبكم.
          </div>
          <span class="story-page-num">${(idx * 2) + 2}</span>
        </div>
      </div>
    `;
    container3d.appendChild(pageEl);
  });

  // Bind clickable vocabulary words
  setTimeout(() => {
    document.querySelectorAll('.story-word-clickable').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = el.getAttribute('data-word');
        showVocabularyModal(word);
      });
    });
  }, 100);

  // Open Modal with high-end transition
  const modal = document.getElementById('book-reader-modal');
  modal.classList.add('active');
  updateReaderButtons();
  playAudioClip('book_open');
}

function closeBook() {
  const modal = document.getElementById('book-reader-modal');
  modal.classList.remove('active');
  state.activeBookId = null;
  playAudioClip('book_close');
}

function turnNextPage() {
  const book = stories.find(s => s.id === state.activeBookId);
  if (!book) return;

  const totalPages = book.pages.length + 1; // including cover page
  if (state.currentPageIndex < totalPages - 1) {
    let currentPage;
    if (state.currentPageIndex === 0) {
      currentPage = document.getElementById('page-cover');
    } else {
      currentPage = document.getElementById(`page-${state.currentPageIndex}`);
    }

    if (currentPage) {
      currentPage.classList.add('flipped');
      // Set high z-index during flip, then lower it
      currentPage.style.zIndex = 100 + state.currentPageIndex;
    }

    state.currentPageIndex++;
    updateReaderButtons();
    playAudioClip('page_flip');
  }
}

function turnPrevPage() {
  if (state.currentPageIndex > 0) {
    state.currentPageIndex--;
    let prevPage;
    if (state.currentPageIndex === 0) {
      prevPage = document.getElementById('page-cover');
    } else {
      prevPage = document.getElementById(`page-${state.currentPageIndex}`);
    }

    if (prevPage) {
      prevPage.classList.remove('flipped');
      // Reset z-index
      if (state.currentPageIndex === 0) {
        prevPage.style.zIndex = '105';
      } else {
        prevPage.style.zIndex = 101 - state.currentPageIndex;
      }
    }

    updateReaderButtons();
    playAudioClip('page_flip');
  }
}

function updateReaderButtons() {
  const book = stories.find(s => s.id === state.activeBookId);
  if (!book) return;

  const totalPages = book.pages.length + 1;
  const nextBtn = document.getElementById('btn-reader-next');
  const prevBtn = document.getElementById('btn-reader-prev');

  prevBtn.disabled = (state.currentPageIndex === 0);
  nextBtn.disabled = (state.currentPageIndex === totalPages - 1);
}

// -------------------------------------------------------------
// INTERACTIVE VOCABULARY POPUP (SIGN DICTIONARY)
// -------------------------------------------------------------

function showVocabularyModal(word) {
  // Clean up punctuation from word lookup
  const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
  const def = vocabulary[cleanWord];
  if (!def) return;

  const modal = document.getElementById('vocab-overlay');
  document.getElementById('vocab-word-title').innerText = def.title;
  document.getElementById('vocab-desc').innerText = def.desc;
  document.getElementById('vocab-animation-holder').innerHTML = def.svg;

  modal.classList.add('active');
  playAudioClip('pop');
  triggerSparkles(window.innerWidth / 2, window.innerHeight / 2);
}

function closeVocabularyModal() {
  const modal = document.getElementById('vocab-overlay');
  modal.classList.remove('active');
}

// -------------------------------------------------------------
// ARABIC SIGN LANGUAGE ALPHABET GAME/BOARD
// -------------------------------------------------------------

function renderAlphabetGrid() {
  const grid = document.getElementById('alphabet-grid');
  grid.innerHTML = '';

  alphabetList.forEach((item, idx) => {
    const bubble = document.createElement('div');
    bubble.className = `letter-bubble`;
    bubble.innerText = item.char;
    bubble.style.background = getPastelColor(idx);
    bubble.addEventListener('click', () => selectLetter(idx, bubble));
    grid.appendChild(bubble);
  });

  // Select Alif by default
  setTimeout(() => {
    const firstBubble = grid.querySelector('.letter-bubble');
    if (firstBubble) firstBubble.click();
  }, 100);
}

function selectLetter(index, elementNode) {
  // Clear active classes
  document.querySelectorAll('.letter-bubble').forEach(b => b.classList.remove('active-letter'));
  elementNode.classList.add('active-letter');

  const letter = alphabetList[index];

  // Update Detail Panel
  document.getElementById('detail-char').innerText = letter.char;
  document.getElementById('detail-sign-hand').innerHTML = `
    <svg viewBox="0 0 100 100" width="160" height="160" style="animation: bounceGently 3s ease-in-out infinite">
      ${letter.svgHand}
    </svg>
  `;
  document.getElementById('detail-word').innerText = `أمثلة: ${letter.word}`;
  document.getElementById('detail-word-en').innerText = letter.translation;
  document.getElementById('detail-gesture-name').innerText = `إشارة الحرف: ${letter.gestureName}`;

  playAudioClip('tap');
}

function getPastelColor(idx) {
  const colors = [
    '#ffe3e3', '#fff0f6', '#f3f0ff', '#e8f7ff', 
    '#e3fafc', '#e6fcf5', '#ebfbee', '#fff9db', 
    '#fff4e6', '#f8f9fa', '#fff0f6', '#f3f0ff'
  ];
  return colors[idx % colors.length];
}

// -------------------------------------------------------------
// ENGLISH A-Z SIGN LANGUAGE GRID
// -------------------------------------------------------------
function renderEnglishGrid() {
  const grid = document.getElementById('english-grid');
  if (!grid || grid.dataset.rendered) return;
  grid.innerHTML = '';

  englishAlphabet.forEach(item => {
    const card = document.createElement('div');
    card.className = 'en-card';
    card.innerHTML = `
      <span class="en-letter-label">${item.letter}</span>
      <img src="${item.imgUrl}" alt="Sign language for letter ${item.letter}" 
           loading="lazy" onerror="this.style.display='none'"/>
      <div class="en-card-footer">Letter ${item.letter}</div>
    `;
    card.addEventListener('click', () => {
      playAudioClip('tap');
      triggerSparkles(
        card.getBoundingClientRect().left + card.offsetWidth / 2,
        card.getBoundingClientRect().top + card.offsetHeight / 2
      );
    });
    grid.appendChild(card);
  });
  grid.dataset.rendered = '1';
}

// -------------------------------------------------------------
// NUMBERS 1-9 SIGN LANGUAGE GRID
// -------------------------------------------------------------
function renderNumbersGrid() {
  const grid = document.getElementById('numbers-grid');
  if (!grid || grid.dataset.rendered) return;
  grid.innerHTML = '';

  signNumbers.forEach(item => {
    const card = document.createElement('div');
    card.className = 'en-card number-card';
    card.innerHTML = `
      <span class="en-letter-label">${item.num} <span style="font-size:1.4rem;color:var(--accent-coral)">${item.arabic}</span></span>
      <img src="${item.imgUrl}" alt="Sign language for number ${item.num}" 
           loading="lazy" onerror="this.style.display='none'"/>
      <div class="en-card-footer">Number ${item.num} · ${item.arabic}</div>
    `;
    card.addEventListener('click', () => {
      playAudioClip('tap');
      triggerSparkles(
        card.getBoundingClientRect().left + card.offsetWidth / 2,
        card.getBoundingClientRect().top + card.offsetHeight / 2
      );
    });
    grid.appendChild(card);
  });
  grid.dataset.rendered = '1';
}

// -------------------------------------------------------------
// ALPHA SUB-TAB SWITCHER (Arabic / English / Numbers)
// -------------------------------------------------------------
function switchAlphaTab(tabId) {
  // Update button states
  document.querySelectorAll('.alpha-tab-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btn-tab-${tabId}`);
  if (activeBtn) activeBtn.classList.add('active');

  // Show matching panel
  document.querySelectorAll('.alpha-panel').forEach(panel => panel.classList.remove('active'));
  const panel = document.getElementById(`alpha-panel-${tabId}`);
  if (panel) panel.classList.add('active');

  // Lazy-render grids on first switch
  if (tabId === 'english') renderEnglishGrid();
  if (tabId === 'numbers') renderNumbersGrid();

  playAudioClip('tab_switch');
}

// -------------------------------------------------------------

// EVENT BINDINGS & SPA TAB TRANSITIONS
// -------------------------------------------------------------

function setupEventListeners() {
  // TAB NAVIGATION
  document.getElementById('btn-nav-library').addEventListener('click', () => switchTab('library'));
  document.getElementById('btn-nav-alphabet').addEventListener('click', () => switchTab('alphabet'));

  // FILTER SEARCH
  document.getElementById('search-books').addEventListener('input', (e) => {
    const activeFilter = document.querySelector('.filter-btn.active');
    const category = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
    renderBookshelf(category, e.target.value);
  });

  // FILTER BUTTONS
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      const search = document.getElementById('search-books').value;
      renderBookshelf(cat, search);
      playAudioClip('tap');
    });
  });

  // CLOSE BUTTONS
  document.getElementById('btn-close-reader').addEventListener('click', closeBook);
  document.getElementById('btn-close-vocab').addEventListener('click', closeVocabularyModal);
  
  // Close vocab modal on overlay click
  document.getElementById('vocab-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'vocab-overlay') closeVocabularyModal();
  });

  // SOUND & ACCESSIBILITY CONTROLS
  document.getElementById('btn-toggle-sound').addEventListener('click', () => {
    state.soundEffects = !state.soundEffects;
    const btn = document.getElementById('btn-toggle-sound');
    btn.innerHTML = state.soundEffects ? '<span>🔊</span>' : '<span>🔇</span>';
    btn.style.background = state.soundEffects ? 'white' : '#ffebee';
  });

  document.getElementById('btn-toggle-contrast').addEventListener('click', () => {
    state.isHighContrast = !state.isHighContrast;
    const btn = document.getElementById('btn-toggle-contrast');
    if (state.isHighContrast) {
      document.body.style.filter = 'contrast(1.3) saturate(1.1)';
      btn.style.background = 'var(--accent-yellow)';
    } else {
      document.body.style.filter = 'none';
      btn.style.background = 'white';
    }
    playAudioClip('tap');
  });
}

function switchTab(tabId) {
  if (state.currentTab === tabId) return;

  // Toggle active button class
  document.querySelectorAll('.nav-item').forEach(li => li.classList.remove('active'));
  document.getElementById(`nav-${tabId}`).classList.add('active');

  // Slide content transitions
  const sections = document.querySelectorAll('.page-section');
  sections.forEach(sec => sec.classList.remove('active'));
  
  const targetSection = document.getElementById(`section-${tabId}`);
  targetSection.classList.add('active');

  state.currentTab = tabId;
  playAudioClip('tab_switch');
  
  // Re-trigger visual items
  if (tabId === 'library') {
    renderBookshelf();
  } else if (tabId === 'alphabet') {
    renderAlphabetGrid();
  }
}

// -------------------------------------------------------------
// AUDIO SYNTHESIS & SOUND EFFECTS FOR ENGAGEMENT
// -------------------------------------------------------------

function playAudioClip(type) {
  if (!state.soundEffects) return;

  // Using Web Audio API to synthesise cute cartoony blips/chimes so no media loads are required!
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    if (type === 'tap') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } 
    else if (type === 'pop') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } 
    else if (type === 'tab_switch') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } 
    else if (type === 'page_flip') {
      // Noise buffer synthesis for page rustle
      const bufferSize = ctx.sampleRate * 0.3; // 0.3 seconds
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1000;
      filter.Q.value = 1.0;
      
      noise.connect(filter);
      filter.connect(gain);
      
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      
      noise.start(now);
      noise.stop(now + 0.3);
    } 
    else if (type === 'book_open') {
      // Cute opening arpeggio
      osc.type = 'sine';
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      notes.forEach((freq, idx) => {
        const time = now + idx * 0.07;
        osc.frequency.setValueAtTime(freq, time);
      });
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    }
    else if (type === 'book_close') {
      // Decending chord for close
      osc.type = 'sine';
      const notes = [523.25, 392.00, 329.63, 261.63];
      notes.forEach((freq, idx) => {
        const time = now + idx * 0.07;
        osc.frequency.setValueAtTime(freq, time);
      });
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    }
  } catch (e) {
    console.warn('Audio Context failed to start (interaction required):', e);
  }
}

// -------------------------------------------------------------
// SPARKLES PARTICLES ENGAGEMENT EFFECT
// -------------------------------------------------------------

function triggerSparkles(x, y) {
  const container = document.body;
  const numSparkles = 12;
  const colors = ['#ff6b6b', '#ffd166', '#06d6a0', '#2ab7ca', '#9b5de5'];

  for (let i = 0; i < numSparkles; i++) {
    const sparkle = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    sparkle.setAttribute('viewBox', '0 0 24 24');
    sparkle.setAttribute('class', 'sparkle');
    sparkle.style.width = Math.random() * 15 + 15 + 'px';
    sparkle.style.height = sparkle.style.width;
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';

    const color = colors[Math.floor(Math.random() * colors.length)];
    sparkle.innerHTML = `<path d="M12,0 L14,8 L22,12 L14,16 L12,24 L10,16 L2,12 L10,8 Z" fill="${color}"/>`;

    container.appendChild(sparkle);

    // Random trajectory directions
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 80 + 40;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    sparkle.animate([
      { transform: 'translate(0, 0) scale(0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${tx}px, ${ty}px) scale(1) rotate(180deg)`, opacity: 0 }
    ], {
      duration: Math.random() * 400 + 400,
      easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
      fill: 'forwards'
    });

    setTimeout(() => sparkle.remove(), 800);
  }
}


// Global exposure for event callbacks defined in raw HTML strings
window.turnNextPage = turnNextPage;
window.turnPrevPage = turnPrevPage;
window.resetSearchFilters = resetSearchFilters;
window.switchTab = switchTab;
window.switchAlphaTab = switchAlphaTab;
