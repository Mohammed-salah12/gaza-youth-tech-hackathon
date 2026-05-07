import codeSproutsLogoSrc from '../../assets/code-sprouts-palestine-logo.jpeg'
import techFromPalestineLogoSrc from '../../assets/tech-from-palestine-logo-highres.jpg'
import hackathonLogoSrc from '../../assets/hackathon-logos/hackathon-logo-master.png'

const aroundTheRoomMediaPath = '/media/around-the-room'
const buildersGalleryMediaPath = '/media/builders-gallery'
const heroMediaPath = '/media/hero'

// Single source of truth for every replaceable image in the app.
// If you want to swap images, start in this file.
//
// Brand assets:
// - `siteImages.brand.codeSproutsLogo`
// - `siteImages.brand.techFromPalestineLogo`
// - `siteImages.brand.hackathonLogo`
//
// Page media assets:
// - `siteImages.pages.en.*`
// - `siteImages.pages.ar.*`
//
// Each media object can define:
// - `image`
// - `imageAlt`
// - `imageFit`
// - `logo`
export const siteImages = {
  brand: {
    codeSproutsLogo: codeSproutsLogoSrc,
    techFromPalestineLogo: techFromPalestineLogoSrc,
    hackathonLogo: hackathonLogoSrc,
  },
  pages: {
    en: {
      hero: {
        mediaCards: [
          {
            image: hackathonLogoSrc,
            imageAlt: 'Gaza Youth Tech Hackathon launch visual',
          },
          {
            image: `${heroMediaPath}/student-pitch-clips-poster.webp`,
            imageAlt: 'Poster frame from student pitch clips on the demo stage',
            videoPoster: `${heroMediaPath}/student-pitch-clips-poster.webp`,
          },
        ],
      },
      mediaGallery: {
        featured: {
          image: `${buildersGalleryMediaPath}/teams-in-build-zone.jpg`,
          imageAlt: 'Students collaborating together in the build zone around a shared laptop',
        },
        support: {
          image: `${buildersGalleryMediaPath}/inside-the-room.jpg`,
          imageAlt: 'Students working together with Arduino parts and code inside the build room',
        },
        cards: [
          {
            image: `${buildersGalleryMediaPath}/building-the-first-version.jpg`,
            imageAlt: 'Students sketching and planning the first version of their project together',
          },
          {
            image: `${buildersGalleryMediaPath}/prototype-in-motion-poster.jpg`,
            imageAlt: 'A student demonstrates a coded prototype in motion on a laptop screen',
            videoPoster: `${buildersGalleryMediaPath}/prototype-in-motion-poster.jpg`,
          },
          {
            image: `${buildersGalleryMediaPath}/hands-on-building.jpg`,
            imageAlt: 'Arduino boards, wires, and tools spread across a table during hands-on building',
          },
          {
            image: `${buildersGalleryMediaPath}/the-builders-behind-the-project.jpg`,
            imageAlt: 'The student builders gathered behind their project during a team work session',
          },
          {
            image: `${buildersGalleryMediaPath}/pitch-rehearsal-and-final-demo-poster.jpg`,
            imageAlt: 'Students rehearsing their final demo presentation together',
            videoPoster: `${buildersGalleryMediaPath}/pitch-rehearsal-and-final-demo-poster.jpg`,
          },
        ],
      },
      mediaMoments: {
        cards: [
          {
            image: `${aroundTheRoomMediaPath}/friends-around-one-screen.webp`,
            imageAlt: 'Students gathered around one laptop during a coding moment',
          },
          {
            image: `${aroundTheRoomMediaPath}/quick-reactions-poster.webp`,
            imageAlt: 'Poster frame from a quick reaction clip inside the room',
            videoPoster: `${aroundTheRoomMediaPath}/quick-reactions-poster.webp`,
          },
          {
            image: `${aroundTheRoomMediaPath}/mentor-check-in-at-the-table.webp`,
            imageAlt: 'A mentor smiling beside students while they test an Arduino setup at the table',
          },
          {
            image: `${aroundTheRoomMediaPath}/building-the-first-version.webp`,
            imageAlt: 'An Arduino setup connected to a laptop during an early prototype build',
          },
          {
            image: `${aroundTheRoomMediaPath}/practical-build-poster.webp`,
            imageAlt: 'Poster frame from a close-up practical build clip',
            videoPoster: `${aroundTheRoomMediaPath}/practical-build-poster.webp`,
          },
          {
            image: `${aroundTheRoomMediaPath}/game-testing-together.webp`,
            imageAlt: 'Students gathered around a laptop while testing an Arduino game together',
          },
          {
            image: `${aroundTheRoomMediaPath}/teams-inside-the-build-space.webp`,
            imageAlt: 'A wide room shot showing the build space in action',
          },
          {
            image: `${aroundTheRoomMediaPath}/teams-inside-the-build-space-poster.webp`,
            imageAlt: 'Poster frame from a clip filmed inside the team workspace',
            videoPoster: `${aroundTheRoomMediaPath}/teams-inside-the-build-space-poster.webp`,
          },
          {
            image: `${aroundTheRoomMediaPath}/quiet-build-focus.webp`,
            imageAlt: 'Two students focused on a breadboard control beside a laptop',
          },
          {
            image: `${aroundTheRoomMediaPath}/the-people-behind-the-project.webp`,
            imageAlt: 'Students gathered closely around a mentor conversation',
          },
          {
            image: `${aroundTheRoomMediaPath}/first-version-in-motion-poster.webp`,
            imageAlt: 'Poster frame from a clip showing the first version in motion',
            videoPoster: `${aroundTheRoomMediaPath}/first-version-in-motion-poster.webp`,
          },
          {
            image: `${aroundTheRoomMediaPath}/prototype-score-on-screen.webp`,
            imageAlt: 'Close-up of a laptop screen showing score, speed, and lives in the prototype game',
          },
          {
            image: `${aroundTheRoomMediaPath}/hands-on-the-controls.webp`,
            imageAlt: 'Students testing breadboard controls connected to an Arduino board',
          },
          {
            image: `${aroundTheRoomMediaPath}/fast-demo-clips-poster.webp`,
            imageAlt: 'Poster frame from a fast demo clip between presentations',
            videoPoster: `${aroundTheRoomMediaPath}/fast-demo-clips-poster.webp`,
          },
          {
            image: `${aroundTheRoomMediaPath}/mentor-demo-in-motion-poster.webp`,
            imageAlt: 'Poster frame from a mentor explaining a small hardware component to the room',
            videoPoster: `${aroundTheRoomMediaPath}/mentor-demo-in-motion-poster.webp`,
          },
          {
            image: `${aroundTheRoomMediaPath}/holding-up-the-sensor.webp`,
            imageAlt: 'A mentor holding up a small sensor beside a laptop and Arduino tools',
          },
          {
            image: `${aroundTheRoomMediaPath}/checking-the-display-wiring.webp`,
            imageAlt: 'A mentor and students checking breadboard wiring near a projected display diagram',
          },
          {
            image: `${aroundTheRoomMediaPath}/the-room-learning-together.webp`,
            imageAlt: 'Students across a long room while a mentor explains at the front',
          },
          {
            image: `${aroundTheRoomMediaPath}/debugging-at-one-crowded-table.webp`,
            imageAlt: 'A student debugging beside a laptop crowded with jumper wires and components',
          },
          {
            image: `${aroundTheRoomMediaPath}/pair-programming-on-one-laptop.webp`,
            imageAlt: 'Two boys leaning over one laptop while reviewing code together',
          },
          {
            image: `${aroundTheRoomMediaPath}/students-coding-side-by-side.webp`,
            imageAlt: 'Students seated side by side around a laptop during a coding session',
          },
          {
            image: `${aroundTheRoomMediaPath}/sharing-a-laptop-from-every-angle.webp`,
            imageAlt: 'Students gathered around a shared laptop during a hands-on session',
          },
          {
            image: `${aroundTheRoomMediaPath}/working-through-the-browser-flow.webp`,
            imageAlt: 'Students using a browser-based coding tool while others watch across the table',
          },
          {
            image: `${aroundTheRoomMediaPath}/focus-on-the-next-fix.webp`,
            imageAlt: 'A student in a gray polo concentrating on a laptop while teammates watch',
          },
          {
            image: `${aroundTheRoomMediaPath}/mentor-feedback-circle.webp`,
            imageAlt: 'A mentor speaking with a small group of students around two laptops',
          },
          {
            image: `${aroundTheRoomMediaPath}/screen-review-together.webp`,
            imageAlt: 'Two students reviewing code together on a shared laptop',
          },
          {
            image: `${aroundTheRoomMediaPath}/reading-the-code-line-by-line.webp`,
            imageAlt: 'Students reading code line by line on a laptop screen together',
          },
          {
            image: `${aroundTheRoomMediaPath}/first-python-line-on-screen.webp`,
            imageAlt: 'Students watching a laptop with a simple Python editor open on screen',
          },
          {
            image: `${aroundTheRoomMediaPath}/one-more-try-from-the-girls-table.webp`,
            imageAlt: 'A girls team working on a laptop while teammates gather nearby',
          },
          {
            image: `${aroundTheRoomMediaPath}/quiet-corner-still-building.webp`,
            imageAlt: 'A student focused on a laptop in a quieter corner of the room',
          },
        ],
      },
      contactMedia: {
        cards: [
          {
            image: '',
            imageAlt: '',
          },
          {
            image: '',
            imageAlt: '',
          },
          {
            image: '',
            imageAlt: '',
          },
        ],
      },
      partners: {
        cards: [
          {
            logo: techFromPalestineLogoSrc,
          },
          {
            logo: codeSproutsLogoSrc,
          },
        ],
      },
    },
    ar: {
      hero: {
        mediaCards: [
          {
            image: hackathonLogoSrc,
            imageAlt: 'الصورة البصرية لهاكاثون غزة للتكنولوجيا للشباب',
          },
          {
            image: `${heroMediaPath}/student-pitch-clips-poster.webp`,
            imageAlt: 'إطار من فيديو مقاطع عرض الطلاب على منصة الديمو',
            videoPoster: `${heroMediaPath}/student-pitch-clips-poster.webp`,
          },
        ],
      },
      mediaGallery: {
        featured: {
          image: `${buildersGalleryMediaPath}/teams-in-build-zone.jpg`,
          imageAlt: 'طلاب يتعاونون داخل مساحة البناء حول حاسوب مشترك',
        },
        support: {
          image: `${buildersGalleryMediaPath}/inside-the-room.jpg`,
          imageAlt: 'طلاب يعملون معًا على الأردوينو والبرمجة داخل غرفة البناء',
        },
        cards: [
          {
            image: `${buildersGalleryMediaPath}/building-the-first-version.jpg`,
            imageAlt: 'طلاب يخططون للنسخة الأولى من مشروعهم معًا',
          },
          {
            image: `${buildersGalleryMediaPath}/prototype-in-motion-poster.jpg`,
            imageAlt: 'طالب يعرض نموذجًا مبرمجًا أثناء الحركة على شاشة الحاسوب',
            videoPoster: `${buildersGalleryMediaPath}/prototype-in-motion-poster.jpg`,
          },
          {
            image: `${buildersGalleryMediaPath}/hands-on-building.jpg`,
            imageAlt: 'لوحات أردوينو وأسلاك وأدوات على الطاولة أثناء البناء العملي',
          },
          {
            image: `${buildersGalleryMediaPath}/the-builders-behind-the-project.jpg`,
            imageAlt: 'الطلاب الذين يقفون خلف المشروع خلال لحظة عمل جماعي',
          },
          {
            image: `${buildersGalleryMediaPath}/pitch-rehearsal-and-final-demo-poster.jpg`,
            imageAlt: 'طلاب يتدرّبون على العرض النهائي للمشروع معًا',
            videoPoster: `${buildersGalleryMediaPath}/pitch-rehearsal-and-final-demo-poster.jpg`,
          },
        ],
      },
      mediaMoments: {
        cards: [
          {
            image: `${aroundTheRoomMediaPath}/friends-around-one-screen.webp`,
            imageAlt: 'طلاب مجتمعون حول حاسوب واحد في لحظة برمجة',
          },
          {
            image: `${aroundTheRoomMediaPath}/quick-reactions-poster.webp`,
            imageAlt: 'إطار من مقطع ردود فعل سريعة داخل القاعة',
            videoPoster: `${aroundTheRoomMediaPath}/quick-reactions-poster.webp`,
          },
          {
            image: `${aroundTheRoomMediaPath}/mentor-check-in-at-the-table.webp`,
            imageAlt: 'مرشد يبتسم بجوار الطلاب أثناء تجربة تجهيز أردوينو على الطاولة',
          },
          {
            image: `${aroundTheRoomMediaPath}/building-the-first-version.webp`,
            imageAlt: 'تجهيز أردوينو متصل بحاسوب أثناء بناء نموذج أولي مبكر',
          },
          {
            image: `${aroundTheRoomMediaPath}/practical-build-poster.webp`,
            imageAlt: 'إطار من مقطع قريب يوثق البناء العملي',
            videoPoster: `${aroundTheRoomMediaPath}/practical-build-poster.webp`,
          },
          {
            image: `${aroundTheRoomMediaPath}/game-testing-together.webp`,
            imageAlt: 'طلاب مجتمعون حول حاسوب أثناء تجربة لعبة موصولة بالأردوينو',
          },
          {
            image: `${aroundTheRoomMediaPath}/teams-inside-the-build-space.webp`,
            imageAlt: 'لقطة واسعة تُظهر مساحة البناء وهي مليئة بالحركة',
          },
          {
            image: `${aroundTheRoomMediaPath}/teams-inside-the-build-space-poster.webp`,
            imageAlt: 'إطار من مقطع مصور داخل مساحة الفريق',
            videoPoster: `${aroundTheRoomMediaPath}/teams-inside-the-build-space-poster.webp`,
          },
          {
            image: `${aroundTheRoomMediaPath}/quiet-build-focus.webp`,
            imageAlt: 'طالبتان تركزان على لوحة تجارب بجوار الحاسوب',
          },
          {
            image: `${aroundTheRoomMediaPath}/the-people-behind-the-project.webp`,
            imageAlt: 'طلاب متقاربون حول لحظة نقاش وإرشاد',
          },
          {
            image: `${aroundTheRoomMediaPath}/first-version-in-motion-poster.webp`,
            imageAlt: 'إطار من مقطع يُظهر النسخة الأولى وهي تعمل',
            videoPoster: `${aroundTheRoomMediaPath}/first-version-in-motion-poster.webp`,
          },
          {
            image: `${aroundTheRoomMediaPath}/prototype-score-on-screen.webp`,
            imageAlt: 'لقطة قريبة لشاشة تعرض النتيجة والسرعة وعدد المحاولات في نموذج اللعبة',
          },
          {
            image: `${aroundTheRoomMediaPath}/hands-on-the-controls.webp`,
            imageAlt: 'طلاب يختبرون لوحة تجارب موصولة بلوحة أردوينو',
          },
          {
            image: `${aroundTheRoomMediaPath}/fast-demo-clips-poster.webp`,
            imageAlt: 'إطار من فيديو سريع بين العروض',
            videoPoster: `${aroundTheRoomMediaPath}/fast-demo-clips-poster.webp`,
          },
          {
            image: `${aroundTheRoomMediaPath}/mentor-demo-in-motion-poster.webp`,
            imageAlt: 'إطار من مقطع لمرشد يشرح قطعة عتاد صغيرة أمام القاعة',
            videoPoster: `${aroundTheRoomMediaPath}/mentor-demo-in-motion-poster.webp`,
          },
          {
            image: `${aroundTheRoomMediaPath}/holding-up-the-sensor.webp`,
            imageAlt: 'مرشد يرفع حساسًا صغيرًا بجوار لابتوب وأدوات أردوينو',
          },
          {
            image: `${aroundTheRoomMediaPath}/checking-the-display-wiring.webp`,
            imageAlt: 'مرشد وطلاب يفحصون توصيلات لوحة تجارب قرب شرح معروض على الشاشة',
          },
          {
            image: `${aroundTheRoomMediaPath}/the-room-learning-together.webp`,
            imageAlt: 'طلاب موزعون في القاعة بينما يشرح المرشد في المقدمة',
          },
          {
            image: `${aroundTheRoomMediaPath}/debugging-at-one-crowded-table.webp`,
            imageAlt: 'طالب يصحح الأعطال قرب لابتوب مزدحم بالأسلاك والمكونات',
          },
          {
            image: `${aroundTheRoomMediaPath}/pair-programming-on-one-laptop.webp`,
            imageAlt: 'طالبان منحنِيان فوق لابتوب واحد وهما يراجعان الكود معًا',
          },
          {
            image: `${aroundTheRoomMediaPath}/students-coding-side-by-side.webp`,
            imageAlt: 'طلاب يجلسون جنبًا إلى جنب حول لابتوب أثناء جلسة برمجة',
          },
          {
            image: `${aroundTheRoomMediaPath}/sharing-a-laptop-from-every-angle.webp`,
            imageAlt: 'طلاب ملتفون حول لابتوب مشترك خلال جلسة عملية',
          },
          {
            image: `${aroundTheRoomMediaPath}/working-through-the-browser-flow.webp`,
            imageAlt: 'طلاب يستخدمون أداة برمجة عبر المتصفح بينما يراقب آخرون من حول الطاولة',
          },
          {
            image: `${aroundTheRoomMediaPath}/focus-on-the-next-fix.webp`,
            imageAlt: 'طالب بقميص رمادي يركز على اللابتوب بينما يراقب زملاؤه',
          },
          {
            image: `${aroundTheRoomMediaPath}/mentor-feedback-circle.webp`,
            imageAlt: 'مرشدة تتحدث مع مجموعة صغيرة من الطلاب حول لابتوبين',
          },
          {
            image: `${aroundTheRoomMediaPath}/screen-review-together.webp`,
            imageAlt: 'طالبان يراجعان الكود معًا على لابتوب مشترك',
          },
          {
            image: `${aroundTheRoomMediaPath}/reading-the-code-line-by-line.webp`,
            imageAlt: 'طلاب يقرؤون الكود سطرًا سطرًا على شاشة لابتوب مشتركة',
          },
          {
            image: `${aroundTheRoomMediaPath}/first-python-line-on-screen.webp`,
            imageAlt: 'طلاب يشاهدون لابتوبًا مفتوحًا على محرر بايثون بسيط',
          },
          {
            image: `${aroundTheRoomMediaPath}/one-more-try-from-the-girls-table.webp`,
            imageAlt: 'فريق من البنات يعمل على لابتوب بينما تجلس زميلات أخريات بالقرب',
          },
          {
            image: `${aroundTheRoomMediaPath}/quiet-corner-still-building.webp`,
            imageAlt: 'طالب يركز على لابتوب في زاوية أكثر هدوءًا من القاعة',
          },
        ],
      },
      contactMedia: {
        cards: [
          {
            image: '',
            imageAlt: '',
          },
          {
            image: '',
            imageAlt: '',
          },
          {
            image: '',
            imageAlt: '',
          },
        ],
      },
      partners: {
        cards: [
          {
            logo: techFromPalestineLogoSrc,
          },
          {
            logo: codeSproutsLogoSrc,
          },
        ],
      },
    },
  },
}

function withImageConfigPath(imageConfig, configPath) {
  return {
    ...imageConfig,
    imageConfigPath: `src/config/siteImages.js -> ${configPath}`,
  }
}

function mergeImageArray(targetItems, imageItems, basePath) {
  targetItems.forEach((item, index) => {
    Object.assign(
      item,
      withImageConfigPath(imageItems[index] || {}, `${basePath}[${index}]`),
    )
  })
}

export function applyPageImages(content) {
  Object.entries(siteImages.pages).forEach(([languageKey, pageImages]) => {
    const languageContent = content[languageKey]

    if (!languageContent) {
      return
    }

    mergeImageArray(
      languageContent.hero.mediaCards,
      pageImages.hero.mediaCards,
      `siteImages.pages.${languageKey}.hero.mediaCards`,
    )

    Object.assign(
      languageContent.mediaGallery.featured,
      withImageConfigPath(
        pageImages.mediaGallery.featured,
        `siteImages.pages.${languageKey}.mediaGallery.featured`,
      ),
    )

    Object.assign(
      languageContent.mediaGallery.support,
      withImageConfigPath(
        pageImages.mediaGallery.support,
        `siteImages.pages.${languageKey}.mediaGallery.support`,
      ),
    )

    mergeImageArray(
      languageContent.mediaGallery.cards,
      pageImages.mediaGallery.cards,
      `siteImages.pages.${languageKey}.mediaGallery.cards`,
    )

    mergeImageArray(
      languageContent.mediaMoments.cards,
      pageImages.mediaMoments.cards,
      `siteImages.pages.${languageKey}.mediaMoments.cards`,
    )

    mergeImageArray(
      languageContent.contactMedia.cards,
      pageImages.contactMedia.cards,
      `siteImages.pages.${languageKey}.contactMedia.cards`,
    )

    languageContent.partners.cards.forEach((item, index) => {
      Object.assign(item, pageImages.partners.cards[index] || {})
    })
  })
}
