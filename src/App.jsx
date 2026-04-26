import { useEffect, useState } from 'react'
import codeSproutsLogo from '../assets/code-sprouts-palestine-logo.jpeg'
import techFromPalestineLogo from '../assets/tech-from-palestine-logo.jpeg'

const routeStorageKey = 'gaza-youth-tech-hackathon-application'
const languageStorageKey = 'gaza-youth-tech-hackathon-language'
const defaultCategory = 'web'

const initialFormState = {
  fullName: '',
  age: '',
  city: '',
  school: '',
  projectName: '',
  category: defaultCategory,
  problem: '',
  description: '',
  recordingLink: '',
  contact: '',
}

const content = {
  en: {
    metaTitle: 'Gaza Youth Tech Hackathon',
    brandKicker: 'Tech From Palestine x Code Sprouts Palestine',
    brandTitle: 'Gaza Youth Tech Hackathon',
    nav: {
      home: 'Home',
      tracks: 'Tracks',
      partners: 'Partners',
      faq: 'FAQ',
      contact: 'Contact',
      apply: 'Apply Now',
    },
    languageSwitch: {
      en: 'EN',
      ar: 'AR',
    },
    hero: {
      eyebrow: 'Youth innovation from Gaza',
      title: 'Build what Gaza needs next.',
      text:
        'A youth-first hackathon for builders under 18. Share your project idea, add a short voice or video link, and show how your technology can solve real problems.',
      primary: 'Start your application',
      secondary: 'Explore the hackathon',
      stats: [
        { value: 'Under 18', label: 'Youth-only eligibility' },
        { value: 'Gaza', label: 'Local roots, big ambition' },
        { value: '3 mins', label: 'Voice or video intro link' },
        { value: 'Any tech', label: 'Software, robotics, hardware' },
      ],
      panelBadges: ['Open call', 'Summer 2026'],
      panelTitle: 'Idea to impact',
      panelText:
        'The stage is open for web builders, robotics teams, Arduino experimenters, mobile creators, and students with bold technical ideas.',
    },
    submissionSteps: [
      'Share your project name and the problem you want to solve.',
      'Choose your tech category, from robotics to mobile or web.',
      'Explain how the idea helps people, students, families, or communities.',
      'Add one link to a voice note or short video up to 3 minutes.',
    ],
    about: {
      eyebrow: 'About the challenge',
      title: 'A launchpad for young builders with local ideas and technical courage',
      body:
        'If you are under 18 and your idea uses technology to make life better, smarter, safer, or more creative, this space is for you.',
      cards: [
        {
          title: 'Youth-first entry',
          body: 'Built for teenagers and younger makers with energy, originality, and a real desire to create.',
        },
        {
          title: 'Idea stage is welcome',
          body: 'A finished product is not required. A strong concept and a clear technical direction are enough.',
        },
        {
          title: 'Built in Gaza',
          body: 'The event voice, examples, and challenge framing are rooted in Gaza and shaped by local creativity.',
        },
      ],
    },
    tracks: {
      eyebrow: 'Accepted categories',
      title: 'Bring the technology that feels most like you',
      body:
        'Applicants can come from many directions. The goal is not one format, but a strong idea powered by serious technical thinking.',
      cards: [
        {
          eyebrow: 'Build With Hardware',
          title: 'Arduino, IoT, and smart devices',
          body: 'Bring sensors, automation, wearables, smart farming ideas, assistive tools, or anything that connects code with the real world.',
        },
        {
          eyebrow: 'Create Digital Products',
          title: 'Websites, mobile apps, and platforms',
          body: 'Design an app, a learning platform, a service for your community, or a digital tool people can use every day.',
        },
        {
          eyebrow: 'Make Things Move',
          title: 'Robotics and interactive systems',
          body: 'From line followers to creative machines, robotics ideas are welcome even if your prototype is still in an early stage.',
        },
        {
          eyebrow: 'Open Tech Track',
          title: 'Games, AI, media, and wild ideas',
          body: 'If it solves a problem with technology, it belongs here. We want ambitious ideas with a clear story and local relevance.',
        },
      ],
    },
    submit: {
      eyebrow: 'What to submit',
      title: 'A simple application that keeps the focus on the idea',
      body:
        'The submission flow stays lightweight so young participants can spend more time thinking and building, not fighting complicated forms.',
    },
    timeline: {
      eyebrow: 'Journey',
      title: 'A clear path from application to showcase',
      body: 'Exact dates can be added later. The site already tells a strong launch story for the event.',
      cards: [
        {
          phase: 'Phase 01',
          title: 'Applications open',
          body: 'Young makers in Gaza submit an idea or early prototype during the open call window.',
        },
        {
          phase: 'Phase 02',
          title: 'Shortlist and coaching',
          body: 'Selected applicants receive feedback, pitch support, and a stronger path toward demo day.',
        },
        {
          phase: 'Phase 03',
          title: 'Showcase day',
          body: 'Finalists present their work, explain the build, and show what Gaza youth can create with technology.',
        },
      ],
    },
    partners: {
      eyebrow: 'Powered together',
      title: 'Two identities, one shared energy',
      body:
        "The visual language blends both logos: TFP's strong tech-blue frame and Code Sprouts' organic growth shapes and community warmth.",
      cards: [
        {
          name: 'Tech From Palestine',
          logo: techFromPalestineLogo,
          body: 'Brings the sharp outward-facing Palestinian tech story: visibility, ambition, and the sense that local ideas deserve a global spotlight.',
        },
        {
          name: 'Code Sprouts Palestine',
          logo: codeSproutsLogo,
          body: 'Brings the youth-builder heartbeat: coding, experimentation, robotics, and the belief that small beginnings can grow into serious innovation.',
        },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Clear enough for students, parents, and mentors',
      body:
        'The key details are easy to understand at a glance, which matters when the audience includes younger applicants and families.',
      items: [
        {
          question: 'Who can apply?',
          answer: 'Participants should be under 18 and based in Gaza, with an original technology idea or early project.',
        },
        {
          question: 'Do I need a finished prototype?',
          answer: 'No. A strong idea is enough. If you already built something, that is a bonus, not a requirement.',
        },
        {
          question: 'Can I submit robotics or Arduino work?',
          answer: 'Yes. Hardware, robotics, Arduino, apps, websites, games, and other technology-driven ideas are all welcome.',
        },
        {
          question: 'What kind of recording should I send?',
          answer: 'Share one voice note or short video link, up to 3 minutes, to introduce your project idea and why it matters.',
        },
      ],
    },
    cta: {
      eyebrow: 'Ready to take the next step?',
      title: 'Open the application page and shape your submission.',
      body:
        'The form collects the project basics, the problem, and a recording link so applicants can present their ideas with clarity.',
      button: 'Go to contact and apply',
    },
    contactHero: {
      eyebrow: 'Contact and apply',
      title: "Prepare a young builder's submission in one place.",
      text:
        'This page keeps the application journey simple: eligibility, project details, and a clean way to prepare a submission summary.',
      primary: 'Jump to the form',
      secondary: 'Back to landing page',
      sideEyebrow: 'Application journey',
      sideTitle: 'A clear page for students, families, and mentors',
      sideBody:
        'Use this page to understand what the organizers need, prepare the idea clearly, and submit through the official channel when applications open.',
    },
    contact: {
      eyebrow: 'Get ready',
      title: 'Everything applicants need before they submit',
      body:
        'Young makers can review the expectations, prepare a sharper idea, and organize the short recording that introduces their project.',
      cards: [
        {
          title: 'Project clarity',
          body: 'Help students explain the problem, the solution, and the value of the idea in a short and confident way.',
        },
        {
          title: 'Recording support',
          body: 'Applicants can prepare one short voice note or video link that tells the story of the project in under 3 minutes.',
        },
        {
          title: 'Family-friendly process',
          body: 'The page stays readable for students, parents, and mentors who may help organize the submission.',
        },
      ],
    },
    form: {
      eyebrow: 'Application form',
      title: 'Submit your project idea',
      text:
        'Fill in the details, add one recording link, and prepare a clean summary for the official submission channel.',
      fields: {
        fullName: 'Full name',
        age: 'Age',
        city: 'City',
        school: 'School or club',
        projectName: 'Project name',
        category: 'Category',
        problem: 'What problem are you solving?',
        description: 'Project idea',
        recordingLink: 'Voice or video link (up to 3 minutes)',
        contact: 'Contact details',
      },
      placeholders: {
        fullName: 'Your full name',
        age: 'Under 18',
        city: 'Gaza',
        school: 'Optional',
        projectName: 'Give your idea a name',
        problem: 'Describe the need or challenge',
        description: 'Explain how the idea works, who it helps, and what makes it exciting.',
        recordingLink: 'https://...',
        contact: 'Email, phone number, or parent contact',
      },
      categories: [
        { id: 'web', label: 'Website or web app' },
        { id: 'mobile', label: 'Mobile application' },
        { id: 'arduino', label: 'Arduino or IoT' },
        { id: 'robotics', label: 'Robotics' },
        { id: 'game', label: 'Game or media experience' },
        { id: 'other', label: 'Other technology idea' },
      ],
      submit: 'Prepare my submission',
      reset: 'Clear form',
      resultEyebrow: 'Submission summary',
      resultTitle: 'A ready message for the official channel',
      resultText:
        'Once the form is prepared, this panel becomes the version applicants can copy and share with the organizing team.',
      resultEmpty: 'No submission summary yet. Fill in the form and prepare it here.',
      copy: 'Copy summary',
      summaryTitle: 'Gaza Youth Tech Hackathon Submission',
      missingSchool: 'Not provided',
      summaryLabels: {
        fullName: 'Full name',
        age: 'Age',
        city: 'City',
        school: 'School or club',
        projectName: 'Project name',
        category: 'Category',
        problem: 'Problem to solve',
        description: 'Project idea',
        recordingLink: 'Voice or video link',
        contact: 'Contact details',
      },
      feedback: {
        invalidAge: 'This hackathon is currently designed for participants under 18.',
        prepared: 'Submission summary prepared. You can copy it and send it through the official event channel.',
        copied: 'Submission summary copied to the clipboard.',
        blocked: 'Copy was blocked by the browser. You can still select the summary manually.',
        cleared: 'Form cleared.',
      },
    },
    footer: {
      eyebrow: 'Gaza Youth Tech Hackathon',
      title: 'Built to spotlight young Palestinian technology talent.',
      home: 'Home',
      tracks: 'Tracks',
      apply: 'Apply',
    },
  },
  ar: {
    metaTitle: 'هاكاثون غزة للتكنولوجيا للشباب',
    brandKicker: 'Tech From Palestine × Code Sprouts Palestine',
    brandTitle: 'هاكاثون غزة للتكنولوجيا للشباب',
    nav: {
      home: 'الرئيسية',
      tracks: 'المجالات',
      partners: 'الشركاء',
      faq: 'الأسئلة',
      contact: 'التقديم',
      apply: 'قدّم الآن',
    },
    languageSwitch: {
      en: 'EN',
      ar: 'عربي',
    },
    hero: {
      eyebrow: 'ابتكار شبابي من غزة',
      title: 'ابنِ ما تحتاجه غزة في المرحلة القادمة.',
      text:
        'هاكاثون مخصص للمبدعين تحت 18 سنة. شارك فكرة مشروعك، وأضف رابطًا لتسجيل صوتي أو فيديو قصير، وعرّفنا كيف يمكن لتقنيتك أن تحل مشكلة حقيقية.',
      primary: 'ابدأ التقديم',
      secondary: 'اكتشف الهاكاثون',
      stats: [
        { value: 'أقل من 18', label: 'فئة شبابية فقط' },
        { value: 'غزة', label: 'جذور محلية وطموح كبير' },
        { value: '3 دقائق', label: 'رابط صوتي أو فيديو تعريفي' },
        { value: 'أي تقنية', label: 'برمجيات وروبوت وعتاد' },
      ],
      panelBadges: ['باب التقديم', 'صيف 2026'],
      panelTitle: 'من الفكرة إلى الأثر',
      panelText:
        'المجال مفتوح لمطوري الويب، وفرق الروبوت، وتجارب الأردوينو، وصنّاع التطبيقات، وكل طالب لديه فكرة تقنية جريئة.',
    },
    submissionSteps: [
      'شارك اسم مشروعك والمشكلة التي تريد حلها.',
      'اختر المجال التقني المناسب، من الروبوت إلى تطبيقات الويب والموبايل.',
      'اشرح كيف يمكن للفكرة أن تساعد الناس أو الطلاب أو العائلات أو المجتمع.',
      'أضف رابطًا واحدًا لتسجيل صوتي أو فيديو قصير لا يتجاوز 3 دقائق.',
    ],
    about: {
      eyebrow: 'عن التحدي',
      title: 'منصة انطلاق للشباب أصحاب الأفكار المحلية والجرأة التقنية',
      body:
        'إذا كنت تحت 18 سنة وكانت فكرتك تستخدم التكنولوجيا لتجعل الحياة أفضل أو أذكى أو أكثر أمانًا أو إبداعًا، فهذه المساحة لك.',
      cards: [
        {
          title: 'مسار شبابي أولًا',
          body: 'مصمم للمراهقين واليافعين الذين يملكون طاقة وأصالة ورغبة حقيقية في البناء.',
        },
        {
          title: 'مرحلة الفكرة مقبولة',
          body: 'لا تحتاج إلى منتج مكتمل. يكفي أن تكون لديك فكرة قوية واتجاه تقني واضح.',
        },
        {
          title: 'من غزة وإليها',
          body: 'لغة الحدث وأمثلته وروحه مستمدة من غزة ومن إبداع المجتمع المحلي.',
        },
      ],
    },
    tracks: {
      eyebrow: 'المجالات المقبولة',
      title: 'قدّم التقنية التي تشبهك أكثر',
      body:
        'يمكن للمتقدمين أن يأتوا من اتجاهات متعددة. الهدف ليس شكلًا واحدًا، بل فكرة قوية مدعومة بتفكير تقني جاد.',
      cards: [
        {
          eyebrow: 'ابنِ بالعتاد',
          title: 'أردوينو وإنترنت الأشياء والأجهزة الذكية',
          body: 'قدّم حساسات أو أتمتة أو أدوات مساعدة أو أفكار زراعة ذكية أو أي شيء يربط البرمجة بالعالم الحقيقي.',
        },
        {
          eyebrow: 'اصنع منتجات رقمية',
          title: 'مواقع وتطبيقات ومنصات',
          body: 'صمّم تطبيقًا أو منصة تعليمية أو خدمة لمجتمعك أو أداة رقمية يمكن استخدامها يوميًا.',
        },
        {
          eyebrow: 'اصنع الحركة',
          title: 'الروبوتات والأنظمة التفاعلية',
          body: 'من الروبوتات البسيطة إلى الآلات الإبداعية، كل فكرة روبوتية مرحّب بها حتى لو كانت ما زالت في بدايتها.',
        },
        {
          eyebrow: 'مسار تقني مفتوح',
          title: 'ألعاب وذكاء اصطناعي وإعلام وأفكار جريئة',
          body: 'إذا كانت فكرتك تحل مشكلة بالتكنولوجيا فهي تنتمي هنا. نريد أفكارًا طموحة وقريبة من الواقع المحلي.',
        },
      ],
    },
    submit: {
      eyebrow: 'ماذا سترسل؟',
      title: 'نموذج بسيط يبقي التركيز على الفكرة',
      body:
        'تم تصميم مسار التقديم ليكون خفيفًا حتى يقضي المشاركون وقتًا أكبر في التفكير والبناء بدلًا من النماذج المعقدة.',
    },
    timeline: {
      eyebrow: 'الرحلة',
      title: 'مسار واضح من التقديم إلى يوم العرض',
      body: 'يمكن إضافة المواعيد الدقيقة لاحقًا، لكن الموقع جاهز ليحكي قصة الإطلاق بشكل قوي من الآن.',
      cards: [
        {
          phase: 'المرحلة 01',
          title: 'فتح باب التقديم',
          body: 'يشارك المبدعون الشباب في غزة فكرة أو نموذجًا أوليًا خلال فترة التقديم المفتوحة.',
        },
        {
          phase: 'المرحلة 02',
          title: 'قائمة مختصرة ودعم',
          body: 'يحصل المشاركون المختارون على ملاحظات ودعم في العرض وتوجيه أفضل نحو يوم التقديم النهائي.',
        },
        {
          phase: 'المرحلة 03',
          title: 'يوم العرض',
          body: 'يعرض المتأهلون أعمالهم ويشرحون البناء ويقدّمون صورة عمّا يستطيع شباب غزة صنعه بالتكنولوجيا.',
        },
      ],
    },
    partners: {
      eyebrow: 'بقوة الشراكة',
      title: 'هويتان وطاقة واحدة',
      body:
        'الهوية البصرية تمزج بين الأزرق التقني القوي في TFP وبين الأشكال العضوية الدافئة وروح النمو في Code Sprouts.',
      cards: [
        {
          name: 'Tech From Palestine',
          logo: techFromPalestineLogo,
          body: 'تمنح المشروع حدة القصة التقنية الفلسطينية وطموحها، والشعور بأن الأفكار المحلية تستحق حضورًا عالميًا.',
        },
        {
          name: 'Code Sprouts Palestine',
          logo: codeSproutsLogo,
          body: 'تمنح المشروع نبض البناء الشبابي: برمجة وتجريب وروبوت وإيمان بأن البدايات الصغيرة يمكن أن تصبح ابتكارًا حقيقيًا.',
        },
      ],
    },
    faq: {
      eyebrow: 'الأسئلة الشائعة',
      title: 'معلومات واضحة للطلاب والأهل والمرشدين',
      body:
        'التفاصيل الأساسية سهلة الفهم من النظرة الأولى، وهذا مهم عندما يكون الجمهور من المشاركين الصغار وعائلاتهم.',
      items: [
        {
          question: 'من يمكنه التقديم؟',
          answer: 'المشاركون يجب أن يكونوا تحت 18 سنة ومن غزة، ولديهم فكرة تقنية أصلية أو مشروع في بدايته.',
        },
        {
          question: 'هل أحتاج إلى نموذج أولي مكتمل؟',
          answer: 'لا. الفكرة القوية تكفي. وإذا كنت قد بنيت شيئًا بالفعل فهذه ميزة إضافية وليست شرطًا.',
        },
        {
          question: 'هل يمكنني تقديم مشروع روبوت أو أردوينو؟',
          answer: 'نعم. العتاد والروبوت والأردوينو والمواقع والتطبيقات والألعاب وكل الأفكار التقنية مرحّب بها.',
        },
        {
          question: 'ما نوع التسجيل المطلوب؟',
          answer: 'أرسل رابطًا واحدًا لتسجيل صوتي أو فيديو قصير لا يتجاوز 3 دقائق لتقديم فكرتك ولماذا هي مهمة.',
        },
      ],
    },
    cta: {
      eyebrow: 'جاهز للخطوة التالية؟',
      title: 'افتح صفحة التقديم وابدأ ترتيب فكرتك.',
      body:
        'النموذج يجمع أساسيات المشروع والمشكلة ورابط التسجيل حتى يتمكن المتقدم من عرض فكرته بشكل واضح ومقنع.',
      button: 'اذهب إلى صفحة التقديم',
    },
    contactHero: {
      eyebrow: 'التواصل والتقديم',
      title: 'جهّز طلب المشارك الصغير في مكان واحد.',
      text:
        'هذه الصفحة تجعل رحلة التقديم أسهل: شروط الأهلية، تفاصيل المشروع، وطريقة واضحة لتحضير ملخص جاهز للإرسال.',
      primary: 'اذهب إلى النموذج',
      secondary: 'العودة إلى الرئيسية',
      sideEyebrow: 'رحلة التقديم',
      sideTitle: 'صفحة واضحة للطلاب والعائلات والمرشدين',
      sideBody:
        'استخدم هذه الصفحة لفهم المطلوب من المنظمين، وصياغة الفكرة بشكل أوضح، وتجهيزها للإرسال عبر القناة الرسمية عند فتح التقديم.',
    },
    contact: {
      eyebrow: 'استعد جيدًا',
      title: 'كل ما يحتاجه المتقدم قبل الإرسال',
      body:
        'يمكن للمشاركين مراجعة التوقعات، وصقل فكرتهم، وتنظيم التسجيل القصير الذي يقدّم المشروع بطريقة قوية.',
      cards: [
        {
          title: 'وضوح الفكرة',
          body: 'ساعد الطلاب على شرح المشكلة والحل وقيمة الفكرة بشكل قصير وواثق.',
        },
        {
          title: 'دعم التسجيل',
          body: 'يمكن للمتقدم تجهيز تسجيل صوتي أو فيديو قصير يروي قصة المشروع خلال أقل من 3 دقائق.',
        },
        {
          title: 'مسار مناسب للعائلة',
          body: 'الصفحة مكتوبة بطريقة سهلة للطلاب والأهل والمرشدين الذين قد يساعدون في تنظيم التقديم.',
        },
      ],
    },
    form: {
      eyebrow: 'نموذج التقديم',
      title: 'قدّم فكرة مشروعك',
      text:
        'املأ التفاصيل، وأضف رابط تسجيل واحد، وجهّز ملخصًا واضحًا لإرساله عبر قناة التقديم الرسمية.',
      fields: {
        fullName: 'الاسم الكامل',
        age: 'العمر',
        city: 'المدينة',
        school: 'المدرسة أو النادي',
        projectName: 'اسم المشروع',
        category: 'المجال',
        problem: 'ما المشكلة التي تحاول حلها؟',
        description: 'فكرة المشروع',
        recordingLink: 'رابط الصوت أو الفيديو (حتى 3 دقائق)',
        contact: 'بيانات التواصل',
      },
      placeholders: {
        fullName: 'اكتب اسمك الكامل',
        age: 'أقل من 18',
        city: 'غزة',
        school: 'اختياري',
        projectName: 'أعطِ فكرتك اسمًا',
        problem: 'صف الحاجة أو التحدي',
        description: 'اشرح كيف تعمل الفكرة، ومن تساعد، ولماذا هي مميزة.',
        recordingLink: 'https://...',
        contact: 'إيميل أو رقم هاتف أو وسيلة تواصل مع ولي الأمر',
      },
      categories: [
        { id: 'web', label: 'موقع أو تطبيق ويب' },
        { id: 'mobile', label: 'تطبيق موبايل' },
        { id: 'arduino', label: 'أردوينو أو إنترنت الأشياء' },
        { id: 'robotics', label: 'روبوتات' },
        { id: 'game', label: 'لعبة أو تجربة إعلامية' },
        { id: 'other', label: 'فكرة تقنية أخرى' },
      ],
      submit: 'جهّز طلبي',
      reset: 'مسح النموذج',
      resultEyebrow: 'ملخص التقديم',
      resultTitle: 'رسالة جاهزة للقناة الرسمية',
      resultText:
        'بعد تجهيز النموذج، يصبح هذا القسم نسخة يمكن للمتقدم نسخها ومشاركتها مع فريق التنظيم.',
      resultEmpty: 'لا يوجد ملخص بعد. املأ النموذج وجهّزه هنا.',
      copy: 'نسخ الملخص',
      summaryTitle: 'تقديم هاكاثون غزة للتكنولوجيا للشباب',
      missingSchool: 'غير مذكور',
      summaryLabels: {
        fullName: 'الاسم الكامل',
        age: 'العمر',
        city: 'المدينة',
        school: 'المدرسة أو النادي',
        projectName: 'اسم المشروع',
        category: 'المجال',
        problem: 'المشكلة التي يحاول حلها',
        description: 'فكرة المشروع',
        recordingLink: 'رابط الصوت أو الفيديو',
        contact: 'بيانات التواصل',
      },
      feedback: {
        invalidAge: 'هذا الهاكاثون مخصص حاليًا للمشاركين تحت 18 سنة.',
        prepared: 'تم تجهيز ملخص التقديم. يمكنك نسخه وإرساله عبر القناة الرسمية للحدث.',
        copied: 'تم نسخ ملخص التقديم إلى الحافظة.',
        blocked: 'تعذّر النسخ من المتصفح. ما زال بإمكانك تحديد الملخص ونسخه يدويًا.',
        cleared: 'تم مسح النموذج.',
      },
    },
    footer: {
      eyebrow: 'هاكاثون غزة للتكنولوجيا للشباب',
      title: 'مساحة تبرز المواهب التقنية الشابة في فلسطين.',
      home: 'الرئيسية',
      tracks: 'المجالات',
      apply: 'قدّم',
    },
  },
}

function parseHash() {
  const rawHash = window.location.hash.replace('#', '')

  if (!rawHash) {
    return { page: 'home', section: '' }
  }

  const [page, section = ''] = rawHash.split(':')

  return {
    page: page === 'contact' ? 'contact' : 'home',
    section,
  }
}

function scrollToRoute(section) {
  if (!section) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const target = document.getElementById(section)

  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function getPreferredLanguage() {
  const languageFromUrl = new URLSearchParams(window.location.search).get('lang')

  if (languageFromUrl === 'ar' || languageFromUrl === 'en') {
    return languageFromUrl
  }

  const savedLanguage = window.localStorage.getItem(languageStorageKey)

  if (savedLanguage === 'ar' || savedLanguage === 'en') {
    return savedLanguage
  }

  return navigator.language.toLowerCase().startsWith('ar') ? 'ar' : 'en'
}

function buildLanguageHref(nextLanguage) {
  const hash = window.location.hash || '#home'
  return `?lang=${nextLanguage}${hash}`
}

function App() {
  const [route, setCurrentRoute] = useState(() => parseHash())
  const [menuOpen, setMenuOpen] = useState(false)
  const [language] = useState(() => getPreferredLanguage())

  const pageContent = content[language]
  const direction = language === 'ar' ? 'rtl' : 'ltr'

  const handleNavigate = (page, section = '') => {
    const nextHash = section ? `${page}:${section}` : page
    const currentHash = window.location.hash.replace('#', '')

    if (currentHash === nextHash) {
      const nextRoute = { page, section }
      setCurrentRoute(nextRoute)
      setMenuOpen(false)
      scrollToRoute(section)
      return
    }

    window.location.hash = nextHash
  }

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(parseHash())
      setMenuOpen(false)
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    scrollToRoute(route.section)
  }, [route])

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = 'home'
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = direction
    document.title = pageContent.metaTitle
    window.localStorage.setItem(languageStorageKey, language)
  }, [direction, language, pageContent.metaTitle])

  return (
    <div className="app-shell" data-lang={language} dir={direction}>
      <SiteHeader
        content={pageContent}
        currentLanguage={language}
        route={route}
        menuOpen={menuOpen}
        onNavigate={handleNavigate}
        onToggleMenu={() => setMenuOpen((open) => !open)}
      />

      <main>
        {route.page === 'home' ? (
          <HomePage content={pageContent} onNavigate={handleNavigate} />
        ) : (
          <ContactPage content={pageContent} onNavigate={handleNavigate} />
        )}
      </main>

      <SiteFooter content={pageContent} onNavigate={handleNavigate} />
    </div>
  )
}

function SiteHeader({
  content,
  currentLanguage,
  route,
  menuOpen,
  onNavigate,
  onToggleMenu,
}) {
  const navItems = [
    { label: content.nav.home, page: 'home', section: '' },
    { label: content.nav.tracks, page: 'home', section: 'tracks' },
    { label: content.nav.partners, page: 'home', section: 'partners' },
    { label: content.nav.faq, page: 'home', section: 'faq' },
    { label: content.nav.contact, page: 'contact', section: '' },
  ]

  return (
    <header className="site-header">
      <div className="container nav-bar">
        <button
          type="button"
          className="brand"
          onClick={() => onNavigate('home')}
          aria-label={content.nav.home}
        >
          <div className="brand-logos">
            <img src={codeSproutsLogo} alt="Code Sprouts Palestine logo" />
            <img src={techFromPalestineLogo} alt="Tech From Palestine logo" />
          </div>
          <div className="brand-copy">
            <span className="brand-kicker">{content.brandKicker}</span>
            <strong>{content.brandTitle}</strong>
          </div>
        </button>

        <div className="header-actions">
          <div className="language-switcher" aria-label="Language switcher">
            <a
              className={`language-chip ${currentLanguage === 'en' ? 'is-active' : ''}`}
              href={buildLanguageHref('en')}
            >
              {content.languageSwitch.en}
            </a>
            <a
              className={`language-chip ${currentLanguage === 'ar' ? 'is-active' : ''}`}
              href={buildLanguageHref('ar')}
            >
              {content.languageSwitch.ar}
            </a>
          </div>

          <button
            type="button"
            className="menu-button"
            onClick={onToggleMenu}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={`${item.page}-${item.section || 'root'}`}
              type="button"
              className={`nav-link ${
                route.page === item.page && (!item.section || route.section === item.section)
                  ? 'is-active'
                  : ''
              }`}
              onClick={() => onNavigate(item.page, item.section)}
              aria-current={
                route.page === item.page && (!item.section || route.section === item.section)
                  ? 'page'
                  : undefined
              }
            >
              {item.label}
            </button>
          ))}

          <button
            type="button"
            className="nav-cta"
            onClick={() => onNavigate('contact', 'apply')}
          >
            {content.nav.apply}
          </button>
        </nav>
      </div>
    </header>
  )
}

function HomePage({ content, onNavigate }) {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">{content.hero.eyebrow}</span>
            <h1>{content.hero.title}</h1>
            <p className="hero-text">{content.hero.text}</p>

            <div className="hero-actions">
              <button
                type="button"
                className="primary-button"
                onClick={() => onNavigate('contact', 'apply')}
              >
                {content.hero.primary}
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => onNavigate('home', 'about')}
              >
                {content.hero.secondary}
              </button>
            </div>

            <div className="hero-stats">
              {content.hero.stats.map((item) => (
                <StatCard key={`${item.value}-${item.label}`} value={item.value} label={item.label} />
              ))}
            </div>
          </div>

          <div className="hero-panel">
            <div className="orbit-card">
              <div className="orbit-grid" />
              <div className="orbit-topline">
                <span className="tiny-badge">{content.hero.panelBadges[0]}</span>
                <span className="tiny-badge tiny-badge--warm">{content.hero.panelBadges[1]}</span>
              </div>

              <h2>{content.hero.panelTitle}</h2>
              <p>{content.hero.panelText}</p>

              <ul className="submission-list">
                {content.submissionSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>

            <div className="logo-float logo-float--left">
              <img src={codeSproutsLogo} alt="Code Sprouts Palestine logo" />
            </div>
            <div className="logo-float logo-float--right">
              <img src={techFromPalestineLogo} alt="Tech From Palestine logo" />
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <SectionTitle
            eyebrow={content.about.eyebrow}
            title={content.about.title}
            body={content.about.body}
          />

          <div className="feature-grid">
            {content.about.cards.map((card) => (
              <FeatureCard key={card.title} title={card.title} body={card.body} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tinted" id="tracks">
        <div className="container">
          <SectionTitle
            eyebrow={content.tracks.eyebrow}
            title={content.tracks.title}
            body={content.tracks.body}
          />

          <div className="track-grid">
            {content.tracks.cards.map((track) => (
              <article key={track.title} className="track-card">
                <span className="card-eyebrow">{track.eyebrow}</span>
                <h3>{track.title}</h3>
                <p>{track.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container story-layout">
          <div>
            <SectionTitle
              eyebrow={content.submit.eyebrow}
              title={content.submit.title}
              body={content.submit.body}
            />
          </div>

          <div className="steps-card">
            {content.submissionSteps.map((step, index) => (
              <div key={step} className="step-row">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <SectionTitle
            eyebrow={content.timeline.eyebrow}
            title={content.timeline.title}
            body={content.timeline.body}
            inverted
          />

          <div className="timeline-grid">
            {content.timeline.cards.map((item) => (
              <article key={item.title} className="timeline-card">
                <span className="card-eyebrow card-eyebrow--bright">{item.phase}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="partners">
        <div className="container">
          <SectionTitle
            eyebrow={content.partners.eyebrow}
            title={content.partners.title}
            body={content.partners.body}
          />

          <div className="partner-grid">
            {content.partners.cards.map((partner) => (
              <article key={partner.name} className="partner-card">
                <img src={partner.logo} alt={`${partner.name} logo`} />
                <div>
                  <h3>{partner.name}</h3>
                  <p>{partner.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tinted" id="faq">
        <div className="container">
          <SectionTitle
            eyebrow={content.faq.eyebrow}
            title={content.faq.title}
            body={content.faq.body}
          />

          <div className="faq-grid">
            {content.faq.items.map((item) => (
              <article key={item.question} className="faq-card">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-band">
          <div>
            <span className="eyebrow">{content.cta.eyebrow}</span>
            <h2>{content.cta.title}</h2>
            <p>{content.cta.body}</p>
          </div>

          <button
            type="button"
            className="primary-button"
            onClick={() => onNavigate('contact', 'apply')}
          >
            {content.cta.button}
          </button>
        </div>
      </section>
    </>
  )
}

function ContactPage({ content, onNavigate }) {
  return (
    <>
      <section className="contact-hero">
        <div className="container contact-hero-grid">
          <div>
            <span className="eyebrow">{content.contactHero.eyebrow}</span>
            <h1>{content.contactHero.title}</h1>
            <p className="hero-text">{content.contactHero.text}</p>

            <div className="hero-actions">
              <button
                type="button"
                className="primary-button"
                onClick={() => onNavigate('contact', 'apply')}
              >
                {content.contactHero.primary}
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => onNavigate('home')}
              >
                {content.contactHero.secondary}
              </button>
            </div>
          </div>

          <div className="contact-side-card">
            <span className="card-eyebrow">{content.contactHero.sideEyebrow}</span>
            <h2>{content.contactHero.sideTitle}</h2>
            <p>{content.contactHero.sideBody}</p>
          </div>
        </div>
      </section>

      <section className="section" id="apply">
        <div className="container contact-layout">
          <div className="contact-column">
            <SectionTitle
              eyebrow={content.contact.eyebrow}
              title={content.contact.title}
              body={content.contact.body}
            />

            <div className="contact-card-list">
              {content.contact.cards.map((card) => (
                <article key={card.title} className="contact-card">
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </div>

          <ApplicationForm content={content} />
        </div>
      </section>
    </>
  )
}

function ApplicationForm({ content }) {
  const [formState, setFormState] = useState(() => {
    const savedState = window.localStorage.getItem(routeStorageKey)

    if (!savedState) {
      return initialFormState
    }

    try {
      return { ...initialFormState, ...JSON.parse(savedState) }
    } catch {
      return initialFormState
    }
  })
  const [feedback, setFeedback] = useState('')
  const [resultText, setResultText] = useState('')

  useEffect(() => {
    window.localStorage.setItem(routeStorageKey, JSON.stringify(formState))
  }, [formState])

  const categoriesById = Object.fromEntries(
    content.form.categories.map((item) => [item.id, item.label]),
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const numericAge = Number(formState.age)

    if (!numericAge || numericAge >= 18) {
      setFeedback(content.form.feedback.invalidAge)
      return
    }

    const summary = [
      content.form.summaryTitle,
      '',
      `${content.form.summaryLabels.fullName}: ${formState.fullName}`,
      `${content.form.summaryLabels.age}: ${formState.age}`,
      `${content.form.summaryLabels.city}: ${formState.city}`,
      `${content.form.summaryLabels.school}: ${
        formState.school || content.form.missingSchool
      }`,
      `${content.form.summaryLabels.projectName}: ${formState.projectName}`,
      `${content.form.summaryLabels.category}: ${
        categoriesById[formState.category] || formState.category
      }`,
      `${content.form.summaryLabels.problem}: ${formState.problem}`,
      '',
      `${content.form.summaryLabels.description}:`,
      formState.description,
      '',
      `${content.form.summaryLabels.recordingLink}: ${formState.recordingLink}`,
      `${content.form.summaryLabels.contact}: ${formState.contact}`,
    ].join('\n')

    setResultText(summary)
    setFeedback(content.form.feedback.prepared)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resultText)
      setFeedback(content.form.feedback.copied)
    } catch {
      setFeedback(content.form.feedback.blocked)
    }
  }

  const handleReset = () => {
    setFormState(initialFormState)
    setResultText('')
    setFeedback(content.form.feedback.cleared)
    window.localStorage.removeItem(routeStorageKey)
  }

  return (
    <div className="form-shell">
      <form className="application-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <span className="card-eyebrow">{content.form.eyebrow}</span>
          <h2>{content.form.title}</h2>
          <p>{content.form.text}</p>
        </div>

        <div className="field-grid">
          <Field
            label={content.form.fields.fullName}
            name="fullName"
            value={formState.fullName}
            onChange={handleChange}
            placeholder={content.form.placeholders.fullName}
            required
          />
          <Field
            label={content.form.fields.age}
            name="age"
            type="number"
            value={formState.age}
            onChange={handleChange}
            min="8"
            max="17"
            placeholder={content.form.placeholders.age}
            required
          />
          <Field
            label={content.form.fields.city}
            name="city"
            value={formState.city}
            onChange={handleChange}
            placeholder={content.form.placeholders.city}
            required
          />
          <Field
            label={content.form.fields.school}
            name="school"
            value={formState.school}
            onChange={handleChange}
            placeholder={content.form.placeholders.school}
          />
        </div>

        <div className="field-grid">
          <Field
            label={content.form.fields.projectName}
            name="projectName"
            value={formState.projectName}
            onChange={handleChange}
            placeholder={content.form.placeholders.projectName}
            required
          />

          <label className="field">
            <span>{content.form.fields.category}</span>
            <select name="category" value={formState.category} onChange={handleChange}>
              {content.form.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="field-grid field-grid--stacked">
          <Field
            label={content.form.fields.problem}
            name="problem"
            value={formState.problem}
            onChange={handleChange}
            placeholder={content.form.placeholders.problem}
            required
          />

          <label className="field">
            <span>{content.form.fields.description}</span>
            <textarea
              name="description"
              value={formState.description}
              onChange={handleChange}
              rows="6"
              placeholder={content.form.placeholders.description}
              required
            />
          </label>

          <Field
            label={content.form.fields.recordingLink}
            name="recordingLink"
            type="url"
            value={formState.recordingLink}
            onChange={handleChange}
            placeholder={content.form.placeholders.recordingLink}
            required
          />

          <Field
            label={content.form.fields.contact}
            name="contact"
            value={formState.contact}
            onChange={handleChange}
            placeholder={content.form.placeholders.contact}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            {content.form.submit}
          </button>
          <button type="button" className="ghost-button" onClick={handleReset}>
            {content.form.reset}
          </button>
        </div>

        {feedback ? <p className="form-feedback">{feedback}</p> : null}
      </form>

      <aside className="result-card">
        <span className="card-eyebrow">{content.form.resultEyebrow}</span>
        <h3>{content.form.resultTitle}</h3>
        <p>{content.form.resultText}</p>

        <pre>{resultText || content.form.resultEmpty}</pre>

        <div className="result-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={handleCopy}
            disabled={!resultText}
          >
            {content.form.copy}
          </button>
        </div>
      </aside>
    </div>
  )
}

function Field({ label, ...props }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input {...props} />
    </label>
  )
}

function StatCard({ value, label }) {
  return (
    <div className="stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

function FeatureCard({ title, body }) {
  return (
    <article className="feature-card">
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  )
}

function SectionTitle({ eyebrow, title, body, inverted = false }) {
  return (
    <div className={`section-title ${inverted ? 'section-title--inverted' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  )
}

function SiteFooter({ content, onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <span className="eyebrow">{content.footer.eyebrow}</span>
          <h2>{content.footer.title}</h2>
        </div>

        <div className="footer-links">
          <button type="button" onClick={() => onNavigate('home')}>
            {content.footer.home}
          </button>
          <button type="button" onClick={() => onNavigate('home', 'tracks')}>
            {content.footer.tracks}
          </button>
          <button type="button" onClick={() => onNavigate('contact', 'apply')}>
            {content.footer.apply}
          </button>
        </div>
      </div>
    </footer>
  )
}

export default App
