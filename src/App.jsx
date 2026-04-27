import { useEffect, useMemo, useState } from 'react'
import codeSproutsLogo from '../assets/code-sprouts-palestine-logo.jpeg'
import techFromPalestineLogo from '../assets/tech-from-palestine-logo-highres.jpg'
import hackathonLogo from '../assets/hackathon-logos/hackathon-logo-master.png'

const routeStorageKey = 'gaza-youth-tech-hackathon-application'
const submissionsStorageKey = 'gaza-youth-tech-hackathon-submissions'
const languageStorageKey = 'gaza-youth-tech-hackathon-language'
const defaultCategory = 'web'
const defaultStage = 'idea'
const defaultReviewStage = 'submitted'
const techFromPalestineUrl = 'https://techfrompalestine.org/'
const contactEmail = 'contact@techfrompalestine.org'
const contactPhone = '+972597262318'

const initialFormState = {
  submissionId: '',
  fullName: '',
  age: '',
  city: '',
  school: '',
  projectName: '',
  category: defaultCategory,
  projectStage: defaultStage,
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
    hackathonLogoAlt: 'Gaza Youth Tech Hackathon icon',
    logoLockup: {
      primary: 'HACKATHON',
      primaryLang: 'en',
      secondary: 'هاكاثون',
      secondaryLang: 'ar',
      tagline: 'Innovate today, build tomorrow',
    },
    nav: {
      home: 'Home',
      tracks: 'Tracks',
      partners: 'Partners',
      faq: 'FAQ',
      contact: 'Apply',
      dashboard: 'Dashboard',
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
        'A youth-first hackathon for builders under 18. Bring your project idea, your technical spark, and a short voice or video pitch that explains why your idea matters.',
      primary: 'Start your application',
      secondary: 'Explore the hackathon',
      stats: [
        { value: 'Under 18', label: 'Youth-only eligibility' },
        { value: 'Gaza', label: 'Local roots, real impact' },
        { value: '3 mins', label: 'Voice or video intro link' },
        { value: 'Any tech', label: 'Web, robotics, Arduino, mobile' },
      ],
      badges: ['Open call', 'Summer 2026'],
      panelTitle: 'A youth stage with serious ambition',
      panelText:
        'The hackathon welcomes early ideas, prototypes, and bold concepts that use technology to solve community needs.',
      pillars: ['Code', 'Robotics', 'Arduino', 'Community impact'],
      quickList: [
        'Submit a project idea or early prototype',
        'Explain the problem and your solution clearly',
        'Add one short recording link to support your story',
      ],
    },
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
    whyJoin: {
      eyebrow: 'Why it matters',
      title: 'More than a competition, this is a confidence-building platform',
      body:
        'The hackathon is designed to help young people in Gaza feel seen as builders, thinkers, and problem solvers.',
      cards: [
        {
          title: 'Visibility for new talent',
          body: 'Give young makers a public stage to present original technical ideas and show what they can build.',
        },
        {
          title: 'Ideas connected to real needs',
          body: 'Projects are encouraged to solve local challenges in learning, daily life, access, creativity, or community services.',
        },
        {
          title: 'A stronger innovation culture',
          body: 'The event helps nurture a new generation of students who see technology as a tool for service and change.',
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
    experience: {
      eyebrow: 'What finalists gain',
      title: 'A strong experience should build confidence, not just choose winners',
      body:
        'The hackathon story becomes stronger when participants can imagine what happens after they apply: feedback, visibility, and the chance to present something meaningful.',
      cards: [
        {
          eyebrow: 'Pitch support',
          title: 'Learn to tell the story behind the build',
          body: 'Shortlisted participants can sharpen how they explain the problem, the solution, and the reason their project matters.',
        },
        {
          eyebrow: 'Mentor energy',
          title: 'Refine the idea with technical encouragement',
          body: 'A young builder often needs one good conversation to make a project clearer, smarter, and more realistic to develop.',
        },
        {
          eyebrow: 'Showcase moment',
          title: 'Present the project with pride',
          body: 'Finalists get a real stage to share what they made, what they learned, and what they want to build next.',
        },
      ],
    },
    submit: {
      eyebrow: 'Submission flow',
      title: 'A simple application that keeps the focus on the idea',
      body:
        'The submission flow stays lightweight so young participants can spend more time thinking and building, not fighting complicated forms.',
      steps: [
        'Introduce yourself and the project clearly.',
        'Choose the category that best fits the idea.',
        'Describe the problem, solution, and who benefits.',
        'Attach a short recording link that tells the story with your own voice.',
      ],
    },
    judging: {
      eyebrow: 'What stands out',
      title: 'What organizers and judges will care about most',
      body:
        'A strong project is not only technical. It also tells a clear story, serves a real need, and shows thoughtful effort.',
      cards: [
        {
          title: 'Local relevance',
          body: 'Does the idea respond to a real challenge, opportunity, or dream connected to life in Gaza?',
        },
        {
          title: 'Clarity of thinking',
          body: 'Can the participant explain the project simply, confidently, and with a clear sense of purpose?',
        },
        {
          title: 'Technical promise',
          body: 'Does the idea show technical curiosity, smart design, or an interesting build direction?',
        },
        {
          title: 'Potential to grow',
          body: 'Could this project become stronger with coaching, iteration, or more time to develop it?',
        },
      ],
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
          href: techFromPalestineUrl,
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
        'The application experience now guides the participant through categories, project stage, idea clarity, and the short supporting pitch link.',
      button: 'Go to contact and apply',
    },
    contactHero: {
      eyebrow: 'Application journey',
      title: "Prepare a young builder's submission with more clarity and confidence.",
      text:
        'This page helps applicants understand what to prepare, what makes an idea stand out, and how to turn early thoughts into a strong submission.',
      primary: 'Jump to the application',
      secondary: 'Back to landing page',
      facts: [
        { label: 'Accepted formats', value: 'Idea, prototype, or early build' },
        { label: 'Pitch support', value: 'Voice or video link up to 3 minutes' },
        { label: 'Audience', value: 'Students, parents, and mentors' },
      ],
    },
    prep: {
      eyebrow: 'Before you apply',
      title: 'Everything a strong application should prepare',
      body:
        'Great submissions do not need to be perfect. They need to be clear, honest, and full of potential.',
      checklistTitle: 'Application checklist',
      checklist: [
        'A project name that feels clear and memorable',
        'A simple explanation of the problem',
        'A short description of how the idea works',
        'A recording link that sounds personal and confident',
      ],
      standoutTitle: 'What makes a submission stronger',
      standout: [
        'Show why the project matters for people around you',
        'Keep the explanation simple instead of overly technical',
        'Use the recording to tell the story, not to repeat the form',
      ],
      eligibilityTitle: 'Quick eligibility view',
      eligibility: [
        'Designed for participants under 18',
        'Open to youth based in Gaza',
        'Technology projects across software and hardware are welcome',
      ],
    },
    form: {
      eyebrow: 'Application form',
      title: 'Submit your project idea',
      text:
        'Fill in the essentials, choose the right track, add your project stage, and prepare a clean submission summary.',
      progressLabel: 'Application progress',
      milestones: ['Your basics', 'Your idea', 'Your pitch'],
      categories: [
        {
          id: 'web',
          label: 'Website or web app',
          description: 'Platforms, portals, learning sites, or service tools built for the web.',
        },
        {
          id: 'mobile',
          label: 'Mobile application',
          description: 'Apps for Android, iPhone, or mobile-first community experiences.',
        },
        {
          id: 'arduino',
          label: 'Arduino or IoT',
          description: 'Sensors, smart devices, automation, and real-world connected ideas.',
        },
        {
          id: 'robotics',
          label: 'Robotics',
          description: 'Interactive machines, robotic systems, movement, control, or hardware logic.',
        },
        {
          id: 'game',
          label: 'Game or media experience',
          description: 'Games, playful experiences, digital storytelling, or creative technology.',
        },
        {
          id: 'other',
          label: 'Other technology idea',
          description: 'A strong technical idea that does not fit neatly into one track.',
        },
      ],
      stages: [
        { id: 'idea', label: 'Idea stage' },
        { id: 'prototype', label: 'Prototype' },
        { id: 'working', label: 'Working build' },
      ],
      fields: {
        fullName: 'Full name',
        age: 'Age',
        city: 'City',
        school: 'School or club',
        projectName: 'Project name',
        projectStage: 'Project stage',
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
      helpers: {
        problem: 'Try to describe the real-life issue in one or two simple sentences.',
        description: 'You can explain the build, the user journey, the hardware setup, or what makes your idea different.',
        recordingLink: 'The recording can be a voice note or a short video link. Keep it personal, short, and clear.',
      },
      submit: 'Prepare my submission',
      reset: 'Clear form',
      resultEyebrow: 'Submission summary',
      resultTitle: 'A ready message for the official channel',
      resultText:
        'This panel turns the form into a clean summary the participant can copy when it is time to submit officially.',
      resultEmpty: 'No submission summary yet. Fill in the form and prepare it here.',
      copy: 'Copy summary',
      snapshotTitle: 'Quick project snapshot',
      snapshotEmpty: 'Still empty',
      statusReady: 'Strong draft',
      statusInProgress: 'In progress',
      readinessTitle: 'Readiness checklist',
      readinessItems: [
        'Basic identity details are complete',
        'The category and project stage are selected',
        'The problem and idea are explained clearly',
        'A voice or video pitch link is attached',
      ],
      summaryTitle: 'Gaza Youth Tech Hackathon Submission',
      missingSchool: 'Not provided',
      summaryLabels: {
        fullName: 'Full name',
        age: 'Age',
        city: 'City',
        school: 'School or club',
        projectName: 'Project name',
        projectStage: 'Project stage',
        category: 'Category',
        problem: 'Problem to solve',
        description: 'Project idea',
        recordingLink: 'Voice or video link',
        contact: 'Contact details',
      },
      snapshotLabels: {
        projectName: 'Project',
        category: 'Track',
        projectStage: 'Stage',
        status: 'Status',
      },
      feedback: {
        invalidAge: 'This hackathon is currently designed for participants under 18.',
        prepared:
          'Submission summary prepared and saved in the dashboard. You can copy it and share it through the official event channel.',
        copied: 'Submission summary copied to the clipboard.',
        blocked: 'Copy was blocked by the browser. You can still select the summary manually.',
        cleared: 'Form cleared.',
      },
    },
    dashboard: {
      eyebrow: 'Organizer dashboard',
      title: 'Review applications, move them through stages, and keep the full story visible.',
      text:
        'This client-side dashboard helps the team read every response, track acceptance status, and keep notes while the official backend is still on the way.',
      primary: 'Open the application form',
      stats: {
        total: 'Saved responses',
        pending: 'Need review',
        shortlisted: 'Shortlisted',
        accepted: 'Accepted',
      },
      filtersTitle: 'Filter responses',
      searchLabel: 'Search responses',
      searchPlaceholder: 'Search by student, project, city, school, or contact',
      allStages: 'All stages',
      queueTitle: 'Response queue',
      queueText: 'Select a response to open the full project story and update its acceptance stage.',
      queueEmptyTitle: 'No responses match this filter yet',
      queueEmptyText: 'Try another search term or switch to a different stage.',
      emptyTitle: 'No submissions have been saved yet',
      emptyText:
        'Once an application is prepared from the form, it will appear here automatically on this device.',
      detailEyebrow: 'Submission details',
      detailTitle: 'Response details',
      stageLabel: 'Acceptance stage',
      projectStageLabel: 'Project stage',
      submittedAt: 'Submitted',
      updatedAt: 'Last updated',
      openRecording: 'Open pitch link',
      summaryTitle: 'Prepared summary',
      copySummary: 'Copy summary',
      notesTitle: 'Organizer notes',
      notesPlaceholder:
        'Write quick internal notes about promise, follow-up, concerns, or the next step.',
      saveNotes: 'Save notes',
      responsesTitle: 'Full response',
      reviewStages: [
        {
          id: 'submitted',
          label: 'New',
          description: 'Recently prepared and waiting for first review.',
        },
        {
          id: 'reviewing',
          label: 'Reviewing',
          description: 'Being checked for fit, clarity, and technical promise.',
        },
        {
          id: 'shortlisted',
          label: 'Shortlisted',
          description: 'Strong enough for a second look or mentor follow-up.',
        },
        {
          id: 'accepted',
          label: 'Accepted',
          description: 'Ready to move forward into the next round.',
        },
        {
          id: 'waitlisted',
          label: 'Waitlist',
          description: 'A promising project waiting on final capacity.',
        },
        {
          id: 'declined',
          label: 'Not selected',
          description: 'Not moving forward at this stage.',
        },
      ],
      feedback: {
        notesSaved: 'Organizer notes saved.',
        copied: 'Summary copied to the clipboard.',
        blocked: 'Copy was blocked by the browser. You can still copy the summary manually.',
      },
    },
    footer: {
      eyebrow: 'Gaza Youth Tech Hackathon',
      title: 'Built to spotlight young Palestinian technology talent.',
      text:
        'A youth hackathon shaped by Gaza, powered by partnership, and open to ideas that deserve a bigger stage.',
      contactTitle: 'Contact',
      contactText: 'Reach the organizing team for questions, support, or partnership follow-up.',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      home: 'Home',
      tracks: 'Tracks',
      dashboard: 'Dashboard',
      apply: 'Apply',
    },
  },
  ar: {
    metaTitle: 'هاكاثون غزة للتكنولوجيا للشباب',
    brandKicker: 'Tech From Palestine × Code Sprouts Palestine',
    brandTitle: 'هاكاثون غزة للتكنولوجيا للشباب',
    hackathonLogoAlt: 'أيقونة هاكاثون غزة للتكنولوجيا للشباب',
    logoLockup: {
      primary: 'هاكاثون',
      primaryLang: 'ar',
      secondary: 'HACKATHON',
      secondaryLang: 'en',
      tagline: 'نبتكر اليوم، لنصنع الغد',
    },
    nav: {
      home: 'الرئيسية',
      tracks: 'المجالات',
      partners: 'الشركاء',
      faq: 'الأسئلة',
      contact: 'التقديم',
      dashboard: 'لوحة المتابعة',
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
        'هاكاثون مخصص للمبدعين تحت 18 سنة. احضر فكرتك، وشرارتك التقنية، وأضف رابطًا لتسجيل صوتي أو فيديو قصير يشرح لماذا تستحق فكرتك أن تُرى.',
      primary: 'ابدأ التقديم',
      secondary: 'اكتشف الهاكاثون',
      stats: [
        { value: 'أقل من 18', label: 'فئة شبابية فقط' },
        { value: 'غزة', label: 'جذور محلية وأثر حقيقي' },
        { value: '3 دقائق', label: 'رابط صوتي أو فيديو تعريفي' },
        { value: 'أي تقنية', label: 'ويب وروبوت وأردوينو وموبايل' },
      ],
      badges: ['باب التقديم', 'صيف 2026'],
      panelTitle: 'منصة شبابية بطموح جاد',
      panelText:
        'الهاكاثون يرحب بالأفكار المبكرة، والنماذج الأولية، والمشاريع الجريئة التي تستخدم التكنولوجيا لخدمة المجتمع.',
      pillars: ['برمجة', 'روبوت', 'أردوينو', 'أثر مجتمعي'],
      quickList: [
        'قدّم فكرة مشروع أو نموذجًا أوليًا',
        'اشرح المشكلة والحل بشكل واضح',
        'أرفق رابط تسجيل قصير يدعم قصتك بصوتك',
      ],
    },
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
    whyJoin: {
      eyebrow: 'لماذا هذا مهم؟',
      title: 'ليس مجرد تنافس، بل مساحة تبني الثقة وتكشف المواهب',
      body:
        'الهاكاثون مصمم ليساعد الشباب في غزة على أن يُنظر إليهم كبنّائين ومفكرين وصنّاع حلول.',
      cards: [
        {
          title: 'إبراز المواهب الجديدة',
          body: 'يمنح المبدعين الصغار منصة حقيقية لعرض أفكارهم التقنية وإظهار ما يمكنهم بناؤه.',
        },
        {
          title: 'أفكار مرتبطة بحاجات حقيقية',
          body: 'يشجع المشاريع التي تخدم تحديات محلية في التعلم والحياة اليومية والوصول والخدمات والإبداع.',
        },
        {
          title: 'بناء ثقافة ابتكار أقوى',
          body: 'يساهم في تشكيل جيل جديد يرى التكنولوجيا أداة للخدمة والتغيير وليس مجرد مهارة تقنية.',
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
    experience: {
      eyebrow: 'ماذا سيكسب المتأهلون؟',
      title: 'التجربة القوية تبني الثقة ولا تكتفي باختيار الفائزين',
      body:
        'تصبح قصة الهاكاثون أقوى عندما يستطيع المشاركون تخيل ما بعد التقديم: ملاحظات، ظهور، وفرصة لعرض شيء يحمل معنى حقيقيًا.',
      cards: [
        {
          eyebrow: 'دعم العرض',
          title: 'تعلّم كيف تروي قصة المشروع',
          body: 'يمكن للمشاركين المتأهلين صقل طريقة شرح المشكلة والحل ولماذا تستحق فكرتهم أن تُسمع.',
        },
        {
          eyebrow: 'طاقة إرشادية',
          title: 'طوّر الفكرة بدفعة تقنية مشجعة',
          body: 'أحيانًا يحتاج المشارك الصغير إلى محادثة جيدة واحدة فقط ليجعل المشروع أوضح وأذكى وأكثر قابلية للتنفيذ.',
        },
        {
          eyebrow: 'لحظة عرض',
          title: 'قدّم المشروع بثقة وفخر',
          body: 'يحصل المتأهلون على منصة حقيقية لعرض ما صنعوه وما تعلموه وما يريدون بناءه لاحقًا.',
        },
      ],
    },
    submit: {
      eyebrow: 'مسار التقديم',
      title: 'نموذج بسيط يبقي التركيز على الفكرة',
      body:
        'تم تصميم مسار التقديم ليكون خفيفًا حتى يقضي المشاركون وقتًا أكبر في التفكير والبناء بدلًا من النماذج المعقدة.',
      steps: [
        'عرّف بنفسك وبالمشروع بوضوح.',
        'اختر المجال الأنسب للفكرة.',
        'اشرح المشكلة والحل ومن سيستفيد.',
        'أضف رابط تسجيل قصير يروي الفكرة بصوتك.',
      ],
    },
    judging: {
      eyebrow: 'ما الذي يلفت الانتباه؟',
      title: 'ما الذي سيهتم به المنظمون ولجنة التقييم أكثر',
      body:
        'المشروع القوي ليس تقنيًا فقط. بل يروي قصة واضحة، ويخدم حاجة حقيقية، ويظهر جهدًا وفكرًا ناضجًا.',
      cards: [
        {
          title: 'صلة بالمجتمع',
          body: 'هل تستجيب الفكرة لتحدٍ حقيقي أو فرصة أو حلم مرتبط بالحياة في غزة؟',
        },
        {
          title: 'وضوح الفكرة',
          body: 'هل يستطيع المشارك شرح المشروع ببساطة وثقة وبهدف واضح؟',
        },
        {
          title: 'وعد تقني',
          body: 'هل تُظهر الفكرة فضولًا تقنيًا أو تصميمًا ذكيًا أو اتجاهًا مثيرًا للبناء؟',
        },
        {
          title: 'قابلية للنمو',
          body: 'هل يمكن أن يصبح المشروع أقوى مع الإرشاد والتطوير والمزيد من الوقت؟',
        },
      ],
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
          href: techFromPalestineUrl,
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
      title: 'افتح صفحة التقديم وابدأ بصياغة مشروعك بشكل أقوى.',
      body:
        'تجربة التقديم الآن تساعد المشارك على اختيار المجال ومرحلة المشروع وشرح الفكرة وإضافة رابط التسجيل بشكل أوضح.',
      button: 'اذهب إلى صفحة التقديم',
    },
    contactHero: {
      eyebrow: 'رحلة التقديم',
      title: 'جهّز طلب المشارك الصغير بمزيد من الوضوح والثقة.',
      text:
        'هذه الصفحة تساعد المتقدم على معرفة ما يجب تحضيره، وما الذي يجعل الفكرة أقوى، وكيف يحول الفكرة الأولية إلى تقديم منظم.',
      primary: 'اذهب إلى النموذج',
      secondary: 'العودة إلى الرئيسية',
      facts: [
        { label: 'نوع التقديم', value: 'فكرة أو نموذج أولي أو بناء مبكر' },
        { label: 'دعم العرض', value: 'رابط صوتي أو فيديو حتى 3 دقائق' },
        { label: 'المستفيد', value: 'الطلاب والأهل والمرشدون' },
      ],
    },
    prep: {
      eyebrow: 'قبل أن تبدأ',
      title: 'كل ما يحتاجه التقديم القوي',
      body:
        'لا يشترط أن يكون التقديم كاملًا أو مثاليًا. المهم أن يكون واضحًا وصادقًا ومليئًا بالإمكانات.',
      checklistTitle: 'قائمة التقديم',
      checklist: [
        'اسم مشروع واضح وسهل التذكر',
        'شرح بسيط للمشكلة',
        'وصف مختصر لكيفية عمل الفكرة',
        'رابط تسجيل قصير بصوت شخصي وواثق',
      ],
      standoutTitle: 'ما الذي يقوّي التقديم؟',
      standout: [
        'بيّن لماذا يهم المشروع الناس من حولك',
        'اجعل الشرح بسيطًا بدلًا من أن يكون تقنيًا أكثر من اللازم',
        'استخدم التسجيل ليروي القصة بدل أن يكرر ما كُتب في النموذج',
      ],
      eligibilityTitle: 'نظرة سريعة على الأهلية',
      eligibility: [
        'مصمم للمشاركين تحت 18 سنة',
        'مفتوح للشباب في غزة',
        'يرحب بالمشاريع التقنية في البرمجيات والعتاد',
      ],
    },
    form: {
      eyebrow: 'نموذج التقديم',
      title: 'قدّم فكرة مشروعك',
      text:
        'املأ الأساسيات، واختر المسار المناسب، وحدد مرحلة مشروعك، ثم جهّز ملخصًا واضحًا يمكن استخدامه في التقديم الرسمي.',
      progressLabel: 'تقدّم التقديم',
      milestones: ['بياناتك', 'فكرتك', 'عرضك القصير'],
      categories: [
        {
          id: 'web',
          label: 'موقع أو تطبيق ويب',
          description: 'منصات ومواقع تعليمية وخدمات وأدوات رقمية تعمل عبر الويب.',
        },
        {
          id: 'mobile',
          label: 'تطبيق موبايل',
          description: 'تطبيقات للهواتف أو تجارب رقمية مصممة لاستخدام الهاتف أولًا.',
        },
        {
          id: 'arduino',
          label: 'أردوينو أو إنترنت الأشياء',
          description: 'حساسات وأجهزة ذكية وأتمتة وأفكار متصلة بالعالم الحقيقي.',
        },
        {
          id: 'robotics',
          label: 'روبوتات',
          description: 'أنظمة حركية وروبوتية وتفاعلية تعتمد على التحكم أو العتاد.',
        },
        {
          id: 'game',
          label: 'لعبة أو تجربة إعلامية',
          description: 'ألعاب أو تجارب تفاعلية أو سرد رقمي أو استخدام إبداعي للتكنولوجيا.',
        },
        {
          id: 'other',
          label: 'فكرة تقنية أخرى',
          description: 'فكرة تقنية قوية لا تنتمي بوضوح إلى مسار واحد محدد.',
        },
      ],
      stages: [
        { id: 'idea', label: 'مرحلة الفكرة' },
        { id: 'prototype', label: 'نموذج أولي' },
        { id: 'working', label: 'نسخة تعمل' },
      ],
      fields: {
        fullName: 'الاسم الكامل',
        age: 'العمر',
        city: 'المدينة',
        school: 'المدرسة أو النادي',
        projectName: 'اسم المشروع',
        projectStage: 'مرحلة المشروع',
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
      helpers: {
        problem: 'حاول وصف المشكلة الواقعية في جملة أو جملتين بسيطتين.',
        description: 'يمكنك شرح البناء أو الرحلة أو العتاد أو ما الذي يجعل فكرتك مختلفة.',
        recordingLink: 'يمكن أن يكون التسجيل صوتيًا أو فيديو قصيرًا. اجعله شخصيًا وواضحًا ومباشرًا.',
      },
      submit: 'جهّز طلبي',
      reset: 'مسح النموذج',
      resultEyebrow: 'ملخص التقديم',
      resultTitle: 'رسالة جاهزة للقناة الرسمية',
      resultText:
        'هذا القسم يحول النموذج إلى ملخص واضح يمكن للمتقدم نسخه عندما يحين وقت التقديم الرسمي.',
      resultEmpty: 'لا يوجد ملخص بعد. املأ النموذج وجهّزه هنا.',
      copy: 'نسخ الملخص',
      snapshotTitle: 'ملخص سريع للمشروع',
      snapshotEmpty: 'لم يُكتب بعد',
      statusReady: 'مسودة قوية',
      statusInProgress: 'قيد التجهيز',
      readinessTitle: 'قائمة الجاهزية',
      readinessItems: [
        'البيانات الأساسية مكتملة',
        'تم اختيار المجال ومرحلة المشروع',
        'المشكلة والفكرة مشروحتان بوضوح',
        'تم إرفاق رابط العرض الصوتي أو المرئي',
      ],
      summaryTitle: 'تقديم هاكاثون غزة للتكنولوجيا للشباب',
      missingSchool: 'غير مذكور',
      summaryLabels: {
        fullName: 'الاسم الكامل',
        age: 'العمر',
        city: 'المدينة',
        school: 'المدرسة أو النادي',
        projectName: 'اسم المشروع',
        projectStage: 'مرحلة المشروع',
        category: 'المجال',
        problem: 'المشكلة التي يحاول حلها',
        description: 'فكرة المشروع',
        recordingLink: 'رابط الصوت أو الفيديو',
        contact: 'بيانات التواصل',
      },
      snapshotLabels: {
        projectName: 'المشروع',
        category: 'المجال',
        projectStage: 'المرحلة',
        status: 'الحالة',
      },
      feedback: {
        invalidAge: 'هذا الهاكاثون مخصص حاليًا للمشاركين تحت 18 سنة.',
        prepared:
          'تم تجهيز ملخص التقديم وحفظه في لوحة المتابعة. يمكنك نسخه ومشاركته عبر القناة الرسمية للحدث.',
        copied: 'تم نسخ ملخص التقديم إلى الحافظة.',
        blocked: 'تعذّر النسخ من المتصفح. ما زال بإمكانك تحديد الملخص ونسخه يدويًا.',
        cleared: 'تم مسح النموذج.',
      },
    },
    dashboard: {
      eyebrow: 'لوحة المنظمين',
      title: 'راجع الطلبات، حرّكها بين المراحل، وابقِ القصة الكاملة واضحة أمامك.',
      text:
        'هذه اللوحة تعمل محليًا في المتصفح حاليًا، وتساعد الفريق على قراءة الردود، تتبع مراحل القبول، وتسجيل الملاحظات إلى أن تصبح المنصة الخلفية جاهزة.',
      primary: 'افتح نموذج التقديم',
      stats: {
        total: 'الردود المحفوظة',
        pending: 'تحتاج مراجعة',
        shortlisted: 'قائمة مختصرة',
        accepted: 'تم قبولهم',
      },
      filtersTitle: 'فلترة الطلبات',
      searchLabel: 'ابحث في الردود',
      searchPlaceholder: 'ابحث بالاسم أو المشروع أو المدينة أو المدرسة أو وسيلة التواصل',
      allStages: 'كل المراحل',
      queueTitle: 'قائمة الردود',
      queueText: 'اختر أي رد لقراءة تفاصيل المشروع كاملة وتحديث مرحلة قبوله.',
      queueEmptyTitle: 'لا توجد ردود تطابق هذا الفلتر حاليًا',
      queueEmptyText: 'جرّب كلمة بحث أخرى أو بدّل مرحلة القبول.',
      emptyTitle: 'لم يتم حفظ أي طلبات بعد',
      emptyText: 'بمجرد تجهيز طلب من النموذج سيظهر هنا تلقائيًا على هذا الجهاز.',
      detailEyebrow: 'تفاصيل الطلب',
      detailTitle: 'محتوى الرد',
      stageLabel: 'مرحلة القبول',
      projectStageLabel: 'مرحلة المشروع',
      submittedAt: 'تاريخ التقديم',
      updatedAt: 'آخر تحديث',
      openRecording: 'افتح رابط العرض',
      summaryTitle: 'الملخص الجاهز',
      copySummary: 'نسخ الملخص',
      notesTitle: 'ملاحظات المنظمين',
      notesPlaceholder: 'اكتب ملاحظات داخلية سريعة عن قوة الفكرة أو المتابعة أو المخاوف أو الخطوة القادمة.',
      saveNotes: 'حفظ الملاحظات',
      responsesTitle: 'الرد الكامل',
      reviewStages: [
        {
          id: 'submitted',
          label: 'جديد',
          description: 'تم تجهيزه مؤخرًا وينتظر المراجعة الأولى.',
        },
        {
          id: 'reviewing',
          label: 'قيد المراجعة',
          description: 'يتم فحصه من حيث الملاءمة والوضوح والوعد التقني.',
        },
        {
          id: 'shortlisted',
          label: 'قائمة مختصرة',
          description: 'فكرة قوية تستحق نظرة ثانية أو متابعة إرشادية.',
        },
        {
          id: 'accepted',
          label: 'مقبول',
          description: 'جاهز للانتقال إلى المرحلة التالية.',
        },
        {
          id: 'waitlisted',
          label: 'قائمة انتظار',
          description: 'مشروع واعد ينتظر الحسم حسب السعة المتاحة.',
        },
        {
          id: 'declined',
          label: 'غير مختار',
          description: 'لن ينتقل إلى المرحلة التالية حاليًا.',
        },
      ],
      feedback: {
        notesSaved: 'تم حفظ ملاحظات المنظمين.',
        copied: 'تم نسخ الملخص إلى الحافظة.',
        blocked: 'تعذّر النسخ من المتصفح. ما زال بإمكانك نسخ الملخص يدويًا.',
      },
    },
    footer: {
      eyebrow: 'هاكاثون غزة للتكنولوجيا للشباب',
      title: 'مساحة تبرز المواهب التقنية الشابة في فلسطين.',
      text:
        'هاكاثون شبابي تنطلق قصته من غزة، وتدعمه الشراكة، ويمنح الأفكار التي تستحق فرصة مساحة أكبر للظهور.',
      contactTitle: 'تواصل معنا',
      contactText: 'تواصل مع فريق التنظيم لأي سؤال أو دعم أو متابعة متعلقة بالشراكة.',
      emailLabel: 'البريد الإلكتروني',
      phoneLabel: 'رقم الهاتف',
      home: 'الرئيسية',
      tracks: 'المجالات',
      dashboard: 'اللوحة',
      apply: 'قدّم',
    },
  },
}

function readStoredJson(key, fallback) {
  const rawValue = window.localStorage.getItem(key)

  if (!rawValue) {
    return fallback
  }

  try {
    return JSON.parse(rawValue)
  } catch {
    return fallback
  }
}

function getStoredSubmissions() {
  const savedSubmissions = readStoredJson(submissionsStorageKey, [])

  if (!Array.isArray(savedSubmissions)) {
    return []
  }

  return savedSubmissions
    .map((item) => ({
      reviewStage: defaultReviewStage,
      organizerNotes: '',
      ...item,
    }))
    .sort((left, right) => {
      const leftTime = new Date(left.updatedAt || left.createdAt || 0).getTime()
      const rightTime = new Date(right.updatedAt || right.createdAt || 0).getTime()
      return rightTime - leftTime
    })
}

function saveStoredSubmissions(submissions) {
  window.localStorage.setItem(submissionsStorageKey, JSON.stringify(submissions))
}

function createSubmissionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `submission-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function buildSubmissionSummary(formState, formContent, categoriesById, stagesById) {
  return [
    formContent.summaryTitle,
    '',
    `${formContent.summaryLabels.fullName}: ${formState.fullName}`,
    `${formContent.summaryLabels.age}: ${formState.age}`,
    `${formContent.summaryLabels.city}: ${formState.city}`,
    `${formContent.summaryLabels.school}: ${formState.school || formContent.missingSchool}`,
    `${formContent.summaryLabels.projectName}: ${formState.projectName}`,
    `${formContent.summaryLabels.projectStage}: ${
      stagesById[formState.projectStage] || formState.projectStage
    }`,
    `${formContent.summaryLabels.category}: ${
      categoriesById[formState.category] || formState.category
    }`,
    `${formContent.summaryLabels.problem}: ${formState.problem}`,
    '',
    `${formContent.summaryLabels.description}:`,
    formState.description,
    '',
    `${formContent.summaryLabels.recordingLink}: ${formState.recordingLink}`,
    `${formContent.summaryLabels.contact}: ${formState.contact}`,
  ].join('\n')
}

function formatSubmissionDate(dateValue, language) {
  if (!dateValue) {
    return '—'
  }

  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return new Intl.DateTimeFormat(language === 'ar' ? 'ar' : 'en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function parseHash() {
  const rawHash = window.location.hash.replace('#', '')

  if (!rawHash) {
    return { page: 'home', section: '' }
  }

  const [page, section = ''] = rawHash.split(':')

  return {
    page: ['home', 'contact', 'dashboard'].includes(page) ? page : 'home',
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

function isFilled(value) {
  return String(value ?? '').trim().length > 0
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
      setCurrentRoute({ page, section })
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
        ) : route.page === 'dashboard' ? (
          <DashboardPage content={pageContent} language={language} onNavigate={handleNavigate} />
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
    { label: content.nav.dashboard, page: 'dashboard', section: '' },
  ]

  return (
    <header className="site-header">
      <div className="container nav-bar">
        <div className="brand">
          <div className="brand-stack">
            <button
              type="button"
              className="brand-home"
              onClick={() => onNavigate('home')}
              aria-label={content.nav.home}
            >
              <div className="brand-copy">
                <span className="brand-kicker">{content.brandKicker}</span>
                <strong>{content.brandTitle}</strong>
              </div>
            </button>

            <div className="brand-logos">
              <img src={codeSproutsLogo} alt="Code Sprouts Palestine logo" />
              <a
                className="logo-link logo-link--tfp"
                href={techFromPalestineUrl}
                aria-label="Visit Tech From Palestine"
              >
                <img src={techFromPalestineLogo} alt="Tech From Palestine logo" />
              </a>
            </div>
          </div>
        </div>

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
                onClick={() => onNavigate('home', 'tracks')}
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
            <div className="hero-logo-card">
              <div className="orbit-topline">
                <span className="tiny-badge">{content.hero.badges[0]}</span>
                <span className="tiny-badge tiny-badge--warm">{content.hero.badges[1]}</span>
              </div>

              <HackathonLockup content={content} variant="hero" />

              <h2>{content.hero.panelTitle}</h2>
              <p>{content.hero.panelText}</p>

              <div className="pillar-grid">
                {content.hero.pillars.map((pillar) => (
                  <span key={pillar} className="pillar-chip">
                    {pillar}
                  </span>
                ))}
              </div>
            </div>

            <div className="logo-float logo-float--left">
              <img src={codeSproutsLogo} alt="Code Sprouts Palestine logo" />
            </div>
            <a
              className="logo-float logo-float--right logo-link logo-link--tfp-float"
              href={techFromPalestineUrl}
              aria-label="Visit Tech From Palestine"
            >
              <img src={techFromPalestineLogo} alt="Tech From Palestine logo" />
            </a>
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

      <section className="section section--tinted">
        <div className="container">
          <SectionTitle
            eyebrow={content.whyJoin.eyebrow}
            title={content.whyJoin.title}
            body={content.whyJoin.body}
          />

          <div className="feature-grid">
            {content.whyJoin.cards.map((card) => (
              <FeatureCard key={card.title} title={card.title} body={card.body} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft" id="tracks">
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

      <section className="section section--tinted">
        <div className="container">
          <SectionTitle
            eyebrow={content.experience.eyebrow}
            title={content.experience.title}
            body={content.experience.body}
          />

          <div className="showcase-grid">
            {content.experience.cards.map((item) => (
              <article key={item.title} className="feature-card feature-card--showcase">
                <span className="card-eyebrow">{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
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
            {content.submit.steps.map((step, index) => (
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
            eyebrow={content.judging.eyebrow}
            title={content.judging.title}
            body={content.judging.body}
            inverted
          />

          <div className="timeline-grid judging-grid">
            {content.judging.cards.map((item) => (
              <article key={item.title} className="timeline-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow={content.timeline.eyebrow}
            title={content.timeline.title}
            body={content.timeline.body}
          />

          <div className="timeline-grid">
            {content.timeline.cards.map((item) => (
              <article key={item.title} className="timeline-card timeline-card--light">
                <span className="card-eyebrow">{item.phase}</span>
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
                {partner.href ? (
                  <a
                    className="logo-link logo-link--partner"
                    href={partner.href}
                    aria-label={`Visit ${partner.name}`}
                  >
                    <img src={partner.logo} alt={`${partner.name} logo`} />
                  </a>
                ) : (
                  <img src={partner.logo} alt={`${partner.name} logo`} />
                )}
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

          <div className="cta-logo-wrap">
            <HackathonLockup content={content} variant="compact" />
            <button
              type="button"
              className="primary-button"
              onClick={() => onNavigate('contact', 'apply')}
            >
              {content.cta.button}
            </button>
          </div>
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

          <div className="contact-brand-card">
            <HackathonLockup content={content} variant="section" />
            <div className="fact-grid">
              {content.contactHero.facts.map((fact) => (
                <div key={fact.label} className="fact-chip">
                  <strong>{fact.label}</strong>
                  <span>{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="apply">
        <div className="container application-hub">
          <aside className="prep-panel">
            <SectionTitle
              eyebrow={content.prep.eyebrow}
              title={content.prep.title}
              body={content.prep.body}
            />

            <article className="prep-card">
              <h3>{content.prep.checklistTitle}</h3>
              <ul className="prep-list">
                {content.prep.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="prep-card">
              <h3>{content.prep.standoutTitle}</h3>
              <ul className="prep-list">
                {content.prep.standout.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="prep-card prep-card--accent">
              <h3>{content.prep.eligibilityTitle}</h3>
              <ul className="prep-list">
                {content.prep.eligibility.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </aside>

          <div className="application-column">
            <div className="contact-card-list contact-card-list--wide">
              {content.submit.steps.map((step, index) => (
                <article key={step} className="contact-card contact-card--numbered">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </article>
              ))}
            </div>

            <ApplicationForm content={content} />
          </div>
        </div>
      </section>
    </>
  )
}

function DashboardPage({ content, language, onNavigate }) {
  const [submissions, setSubmissions] = useState(() => getStoredSubmissions())
  const [selectedId, setSelectedId] = useState(() => getStoredSubmissions()[0]?.id || '')
  const [stageFilter, setStageFilter] = useState('all')
  const [searchValue, setSearchValue] = useState('')
  const [notesDraft, setNotesDraft] = useState('')
  const [feedback, setFeedback] = useState('')

  const categoriesById = useMemo(
    () => Object.fromEntries(content.form.categories.map((item) => [item.id, item.label])),
    [content.form.categories],
  )
  const projectStagesById = useMemo(
    () => Object.fromEntries(content.form.stages.map((item) => [item.id, item.label])),
    [content.form.stages],
  )
  const reviewStagesById = useMemo(
    () =>
      Object.fromEntries(content.dashboard.reviewStages.map((item) => [item.id, item.label])),
    [content.dashboard.reviewStages],
  )

  useEffect(() => {
    const syncSubmissions = () => {
      setSubmissions(getStoredSubmissions())
    }

    window.addEventListener('storage', syncSubmissions)
    window.addEventListener('focus', syncSubmissions)

    return () => {
      window.removeEventListener('storage', syncSubmissions)
      window.removeEventListener('focus', syncSubmissions)
    }
  }, [])

  const filteredSubmissions = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase()

    return submissions.filter((submission) => {
      const matchesStage =
        stageFilter === 'all' || submission.reviewStage === stageFilter

      if (!matchesStage) {
        return false
      }

      if (!normalizedSearch) {
        return true
      }

      return [
        submission.fullName,
        submission.projectName,
        submission.city,
        submission.school,
        submission.contact,
        categoriesById[submission.category] || '',
      ].some((value) => String(value || '').toLowerCase().includes(normalizedSearch))
    })
  }, [categoriesById, searchValue, stageFilter, submissions])

  useEffect(() => {
    if (!selectedId && filteredSubmissions[0]) {
      setSelectedId(filteredSubmissions[0].id)
      return
    }

    if (
      filteredSubmissions.length > 0 &&
      !filteredSubmissions.some((submission) => submission.id === selectedId)
    ) {
      setSelectedId(filteredSubmissions[0].id)
    }
  }, [filteredSubmissions, selectedId])

  const selectedSubmission =
    filteredSubmissions.find((submission) => submission.id === selectedId) ||
    filteredSubmissions[0] ||
    null

  useEffect(() => {
    setNotesDraft(selectedSubmission?.organizerNotes || '')
    setFeedback('')
  }, [selectedSubmission?.id])

  const persistSubmissions = (updater) => {
    setSubmissions((current) => {
      const nextSubmissions =
        typeof updater === 'function' ? updater(current) : updater

      saveStoredSubmissions(nextSubmissions)
      return nextSubmissions
    })
  }

  const handleStageChange = (submissionId, reviewStage) => {
    persistSubmissions((current) =>
      current
        .map((submission) =>
          submission.id === submissionId
            ? {
                ...submission,
                reviewStage,
                updatedAt: new Date().toISOString(),
              }
            : submission,
        )
        .sort(
          (left, right) =>
            new Date(right.updatedAt || 0).getTime() - new Date(left.updatedAt || 0).getTime(),
        ),
    )
  }

  const handleSaveNotes = () => {
    if (!selectedSubmission) {
      return
    }

    persistSubmissions((current) =>
      current
        .map((submission) =>
          submission.id === selectedSubmission.id
            ? {
                ...submission,
                organizerNotes: notesDraft,
                updatedAt: new Date().toISOString(),
              }
            : submission,
        )
        .sort(
          (left, right) =>
            new Date(right.updatedAt || 0).getTime() - new Date(left.updatedAt || 0).getTime(),
        ),
    )
    setFeedback(content.dashboard.feedback.notesSaved)
  }

  const handleCopySummary = async () => {
    if (!selectedSubmission) {
      return
    }

    try {
      await navigator.clipboard.writeText(
        buildSubmissionSummary(selectedSubmission, content.form, categoriesById, projectStagesById),
      )
      setFeedback(content.dashboard.feedback.copied)
    } catch {
      setFeedback(content.dashboard.feedback.blocked)
    }
  }

  const stats = [
    {
      label: content.dashboard.stats.total,
      value: submissions.length,
    },
    {
      label: content.dashboard.stats.pending,
      value: submissions.filter((submission) =>
        ['submitted', 'reviewing'].includes(submission.reviewStage),
      ).length,
    },
    {
      label: content.dashboard.stats.shortlisted,
      value: submissions.filter((submission) => submission.reviewStage === 'shortlisted').length,
    },
    {
      label: content.dashboard.stats.accepted,
      value: submissions.filter((submission) => submission.reviewStage === 'accepted').length,
    },
  ]

  return (
    <>
      <section className="dashboard-hero">
        <div className="container dashboard-hero-grid">
          <div>
            <span className="eyebrow">{content.dashboard.eyebrow}</span>
            <h1>{content.dashboard.title}</h1>
            <p className="hero-text">{content.dashboard.text}</p>

            <div className="hero-actions">
              <button
                type="button"
                className="primary-button"
                onClick={() => onNavigate('contact', 'apply')}
              >
                {content.dashboard.primary}
              </button>
            </div>
          </div>

          <div className="dashboard-stat-grid">
            {stats.map((item) => (
              <article key={item.label} className="dashboard-stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container dashboard-layout">
          <aside className="dashboard-sidebar">
            <article className="dashboard-panel">
              <div className="panel-header">
                <div>
                  <span className="card-eyebrow">{content.dashboard.filtersTitle}</span>
                  <h2>{content.dashboard.queueTitle}</h2>
                </div>
                <p>{content.dashboard.queueText}</p>
              </div>

              <label className="field">
                <span>{content.dashboard.searchLabel}</span>
                <input
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder={content.dashboard.searchPlaceholder}
                />
              </label>

              <div className="filter-chip-row">
                <button
                  type="button"
                  className={`filter-chip ${stageFilter === 'all' ? 'is-active' : ''}`}
                  onClick={() => setStageFilter('all')}
                >
                  {content.dashboard.allStages}
                </button>
                {content.dashboard.reviewStages.map((stage) => (
                  <button
                    key={stage.id}
                    type="button"
                    className={`filter-chip ${stageFilter === stage.id ? 'is-active' : ''}`}
                    onClick={() => setStageFilter(stage.id)}
                  >
                    {stage.label}
                  </button>
                ))}
              </div>
            </article>

            <article className="dashboard-panel dashboard-panel--queue">
              {filteredSubmissions.length ? (
                <div className="dashboard-queue">
                  {filteredSubmissions.map((submission) => (
                    <button
                      key={submission.id}
                      type="button"
                      className={`queue-item ${
                        selectedSubmission?.id === submission.id ? 'is-active' : ''
                      }`}
                      onClick={() => setSelectedId(submission.id)}
                    >
                      <div className="queue-item__head">
                        <strong>{submission.projectName}</strong>
                        <span
                          className={`review-stage-badge review-stage-badge--${submission.reviewStage}`}
                        >
                          {reviewStagesById[submission.reviewStage] || submission.reviewStage}
                        </span>
                      </div>
                      <p>{submission.fullName}</p>
                      <div className="queue-item__meta">
                        <span>{submission.city}</span>
                        <span>{categoriesById[submission.category] || submission.category}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="dashboard-empty dashboard-empty--compact">
                  <h3>{content.dashboard.queueEmptyTitle}</h3>
                  <p>{content.dashboard.queueEmptyText}</p>
                </div>
              )}
            </article>
          </aside>

          <section className="dashboard-detail">
            {selectedSubmission ? (
              <>
                <article className="dashboard-panel dashboard-panel--detail">
                  <div className="dashboard-detail-head">
                    <div>
                      <span className="card-eyebrow">{content.dashboard.detailEyebrow}</span>
                      <h2>{selectedSubmission.projectName}</h2>
                      <p>
                        {selectedSubmission.fullName} • {selectedSubmission.age}
                      </p>
                    </div>
                    <span
                      className={`review-stage-badge review-stage-badge--${selectedSubmission.reviewStage}`}
                    >
                      {reviewStagesById[selectedSubmission.reviewStage] ||
                        selectedSubmission.reviewStage}
                    </span>
                  </div>

                  <div className="dashboard-meta-grid">
                    <div className="dashboard-meta-item">
                      <span>{content.form.summaryLabels.category}</span>
                      <strong>
                        {categoriesById[selectedSubmission.category] || selectedSubmission.category}
                      </strong>
                    </div>
                    <div className="dashboard-meta-item">
                      <span>{content.dashboard.projectStageLabel}</span>
                      <strong>
                        {projectStagesById[selectedSubmission.projectStage] ||
                          selectedSubmission.projectStage}
                      </strong>
                    </div>
                    <div className="dashboard-meta-item">
                      <span>{content.dashboard.submittedAt}</span>
                      <strong>
                        {formatSubmissionDate(selectedSubmission.createdAt, language)}
                      </strong>
                    </div>
                    <div className="dashboard-meta-item">
                      <span>{content.dashboard.updatedAt}</span>
                      <strong>
                        {formatSubmissionDate(selectedSubmission.updatedAt, language)}
                      </strong>
                    </div>
                  </div>

                  <div className="dashboard-stage-block">
                    <div className="selection-heading">
                      <strong>{content.dashboard.stageLabel}</strong>
                    </div>
                    <div className="review-stage-grid">
                      {content.dashboard.reviewStages.map((stage) => (
                        <button
                          key={stage.id}
                          type="button"
                          className={`review-stage-card ${
                            selectedSubmission.reviewStage === stage.id ? 'is-selected' : ''
                          }`}
                          onClick={() => handleStageChange(selectedSubmission.id, stage.id)}
                        >
                          <strong>{stage.label}</strong>
                          <span>{stage.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </article>

                <div className="dashboard-card-grid">
                  <article className="dashboard-panel dashboard-panel--response">
                    <span className="card-eyebrow">{content.dashboard.responsesTitle}</span>
                    <div className="response-block">
                      <h3>{content.form.summaryLabels.problem}</h3>
                      <p>{selectedSubmission.problem}</p>
                    </div>
                    <div className="response-block">
                      <h3>{content.form.summaryLabels.description}</h3>
                      <p>{selectedSubmission.description}</p>
                    </div>
                    <div className="response-inline-grid">
                      <div className="dashboard-meta-item">
                        <span>{content.form.summaryLabels.contact}</span>
                        <strong>{selectedSubmission.contact}</strong>
                      </div>
                      <div className="dashboard-meta-item">
                        <span>{content.form.summaryLabels.school}</span>
                        <strong>
                          {selectedSubmission.school || content.form.missingSchool}
                        </strong>
                      </div>
                    </div>
                    <div className="result-actions">
                      <a
                        className="secondary-button"
                        href={selectedSubmission.recordingLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {content.dashboard.openRecording}
                      </a>
                    </div>
                  </article>

                  <article className="dashboard-panel">
                    <span className="card-eyebrow">{content.dashboard.summaryTitle}</span>
                    <pre className="dashboard-summary">
                      {buildSubmissionSummary(
                        selectedSubmission,
                        content.form,
                        categoriesById,
                        projectStagesById,
                      )}
                    </pre>
                    <div className="result-actions">
                      <button type="button" className="secondary-button" onClick={handleCopySummary}>
                        {content.dashboard.copySummary}
                      </button>
                    </div>
                  </article>

                  <article className="dashboard-panel">
                    <span className="card-eyebrow">{content.dashboard.notesTitle}</span>
                    <label className="field">
                      <span>{content.dashboard.notesTitle}</span>
                      <textarea
                        rows="7"
                        value={notesDraft}
                        onChange={(event) => setNotesDraft(event.target.value)}
                        placeholder={content.dashboard.notesPlaceholder}
                      />
                    </label>
                    <div className="result-actions">
                      <button type="button" className="ghost-button" onClick={handleSaveNotes}>
                        {content.dashboard.saveNotes}
                      </button>
                    </div>
                    {feedback ? <p className="form-feedback">{feedback}</p> : null}
                  </article>
                </div>
              </>
            ) : submissions.length ? (
              <div className="dashboard-empty">
                <h2>{content.dashboard.queueEmptyTitle}</h2>
                <p>{content.dashboard.queueEmptyText}</p>
              </div>
            ) : (
              <div className="dashboard-empty">
                <h2>{content.dashboard.emptyTitle}</h2>
                <p>{content.dashboard.emptyText}</p>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => onNavigate('contact', 'apply')}
                >
                  {content.dashboard.primary}
                </button>
              </div>
            )}
          </section>
        </div>
      </section>
    </>
  )
}

function ApplicationForm({ content }) {
  const [formState, setFormState] = useState(() => {
    return { ...initialFormState, ...readStoredJson(routeStorageKey, initialFormState) }
  })
  const [feedback, setFeedback] = useState('')
  const [resultText, setResultText] = useState('')

  useEffect(() => {
    window.localStorage.setItem(routeStorageKey, JSON.stringify(formState))
  }, [formState])

  const categoriesById = Object.fromEntries(
    content.form.categories.map((item) => [item.id, item.label]),
  )
  const stagesById = Object.fromEntries(
    content.form.stages.map((item) => [item.id, item.label]),
  )

  const requiredFields = useMemo(
    () => [
      formState.fullName,
      formState.age,
      formState.city,
      formState.projectName,
      formState.problem,
      formState.description,
      formState.recordingLink,
      formState.contact,
    ],
    [formState],
  )
  const filledCount = requiredFields.filter(isFilled).length
  const progress = Math.round((filledCount / requiredFields.length) * 100)

  const readinessState = [
    isFilled(formState.fullName) &&
      isFilled(formState.age) &&
      isFilled(formState.city) &&
      isFilled(formState.contact),
    isFilled(formState.category) && isFilled(formState.projectStage),
    isFilled(formState.problem) && isFilled(formState.description),
    isFilled(formState.recordingLink),
  ]
  const statusLabel = progress >= 75 ? content.form.statusReady : content.form.statusInProgress

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((current) => ({ ...current, [name]: value }))
  }

  const updateField = (name, value) => {
    setFormState((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const numericAge = Number(formState.age)

    if (!numericAge || numericAge >= 18) {
      setFeedback(content.form.feedback.invalidAge)
      return
    }

    const now = new Date().toISOString()
    const submissionId = formState.submissionId || createSubmissionId()
    const existingSubmission = getStoredSubmissions().find(
      (submission) => submission.id === submissionId,
    )
    const nextFormState = {
      ...formState,
      submissionId,
    }
    const summary = buildSubmissionSummary(nextFormState, content.form, categoriesById, stagesById)
    const nextSubmission = {
      ...nextFormState,
      id: submissionId,
      reviewStage: existingSubmission?.reviewStage || defaultReviewStage,
      organizerNotes: existingSubmission?.organizerNotes || '',
      createdAt: existingSubmission?.createdAt || now,
      updatedAt: now,
    }

    saveStoredSubmissions(
      getStoredSubmissions()
        .filter((submission) => submission.id !== submissionId)
        .concat(nextSubmission)
        .sort(
          (left, right) =>
            new Date(right.updatedAt || 0).getTime() - new Date(left.updatedAt || 0).getTime(),
        ),
    )

    setFormState(nextFormState)
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
    <div className="form-shell form-shell--enhanced">
      <form className="application-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <span className="card-eyebrow">{content.form.eyebrow}</span>
          <h2>{content.form.title}</h2>
          <p>{content.form.text}</p>
        </div>

        <div className="progress-card">
          <div className="progress-copy">
            <strong>{content.form.progressLabel}</strong>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar">
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="milestone-row">
            {content.form.milestones.map((item) => (
              <span key={item} className="milestone-chip">
                {item}
              </span>
            ))}
          </div>
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

        <div className="selection-block">
          <div className="selection-heading">
            <strong>{content.form.fields.category}</strong>
          </div>
          <div className="category-grid">
            {content.form.categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`category-card ${
                  formState.category === category.id ? 'is-selected' : ''
                }`}
                aria-pressed={formState.category === category.id}
                onClick={() => updateField('category', category.id)}
              >
                <strong>{category.label}</strong>
                <span>{category.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="selection-block">
          <div className="selection-heading">
            <strong>{content.form.fields.projectStage}</strong>
          </div>
          <div className="stage-row">
            {content.form.stages.map((stage) => (
              <button
                key={stage.id}
                type="button"
                className={`stage-chip ${
                  formState.projectStage === stage.id ? 'is-selected' : ''
                }`}
                aria-pressed={formState.projectStage === stage.id}
                onClick={() => updateField('projectStage', stage.id)}
              >
                {stage.label}
              </button>
            ))}
          </div>
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

          <div className="field">
            <span>{content.form.fields.problem}</span>
            <input
              name="problem"
              value={formState.problem}
              onChange={handleChange}
              placeholder={content.form.placeholders.problem}
              required
            />
            <small className="field-helper">{content.form.helpers.problem}</small>
          </div>
        </div>

        <div className="field-grid">
          <div className="field field--full">
            <span>{content.form.fields.description}</span>
            <textarea
              name="description"
              value={formState.description}
              onChange={handleChange}
              rows="5"
              placeholder={content.form.placeholders.description}
              required
            />
            <div className="field-meta">
              <small className="field-helper">{content.form.helpers.description}</small>
              <small>{formState.description.trim().length}</small>
            </div>
          </div>
        </div>

        <div className="field-grid">
          <div className="field">
            <span>{content.form.fields.recordingLink}</span>
            <input
              name="recordingLink"
              type="url"
              value={formState.recordingLink}
              onChange={handleChange}
              placeholder={content.form.placeholders.recordingLink}
              required
            />
            <small className="field-helper">{content.form.helpers.recordingLink}</small>
          </div>

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

        <div className="snapshot-card">
          <h4>{content.form.snapshotTitle}</h4>
          <div className="snapshot-grid">
            <div className="snapshot-item">
              <span>{content.form.snapshotLabels.projectName}</span>
              <strong>{formState.projectName || content.form.snapshotEmpty}</strong>
            </div>
            <div className="snapshot-item">
              <span>{content.form.snapshotLabels.category}</span>
              <strong>
                {categoriesById[formState.category] || content.form.snapshotEmpty}
              </strong>
            </div>
            <div className="snapshot-item">
              <span>{content.form.snapshotLabels.projectStage}</span>
              <strong>{stagesById[formState.projectStage] || content.form.snapshotEmpty}</strong>
            </div>
            <div className="snapshot-item">
              <span>{content.form.snapshotLabels.status}</span>
              <strong>{statusLabel}</strong>
            </div>
          </div>
        </div>

        <div className="readiness-card">
          <h4>{content.form.readinessTitle}</h4>
          <ul className="readiness-list">
            {content.form.readinessItems.map((item, index) => (
              <li key={item} className={readinessState[index] ? 'is-complete' : ''}>
                <span>{readinessState[index] ? '✓' : '•'}</span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>

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

function HackathonLockup({ content, variant = 'hero' }) {
  return (
    <div className={`hackathon-lockup hackathon-lockup--${variant}`}>
      <img
        className="hackathon-lockup__icon"
        src={hackathonLogo}
        alt={content.hackathonLogoAlt}
      />
    </div>
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
        <div className="footer-brand-block">
          <button
            type="button"
            className="footer-hackathon-mark"
            onClick={() => onNavigate('home')}
            aria-label={content.footer.home}
          >
            <HackathonLockup content={content} variant="compact" />
          </button>

          <div>
            <span className="eyebrow">{content.footer.eyebrow}</span>
            <h2>{content.footer.title}</h2>
            <p>{content.footer.text}</p>
          </div>
        </div>

        <div className="footer-center-block">
          <div className="footer-logo-strip">
            <img src={codeSproutsLogo} alt="Code Sprouts Palestine logo" />
            <a
              className="logo-link logo-link--tfp-footer"
              href={techFromPalestineUrl}
              aria-label="Visit Tech From Palestine"
            >
              <img src={techFromPalestineLogo} alt="Tech From Palestine logo" />
            </a>
          </div>

          <div className="footer-links">
            <button type="button" onClick={() => onNavigate('home')}>
              {content.footer.home}
            </button>
            <button type="button" onClick={() => onNavigate('home', 'tracks')}>
              {content.footer.tracks}
            </button>
            <button type="button" onClick={() => onNavigate('dashboard')}>
              {content.footer.dashboard}
            </button>
            <button type="button" onClick={() => onNavigate('contact', 'apply')}>
              {content.footer.apply}
            </button>
          </div>
        </div>

        <div className="footer-contact-card">
          <span className="card-eyebrow">{content.footer.contactTitle}</span>
          <p>{content.footer.contactText}</p>

          <div className="footer-contact-list">
            <a className="footer-contact-link" href={`mailto:${contactEmail}`}>
              <span>{content.footer.emailLabel}</span>
              <strong>{contactEmail}</strong>
            </a>
            <a className="footer-contact-link" href={`tel:${contactPhone}`}>
              <span>{content.footer.phoneLabel}</span>
              <strong>{contactPhone}</strong>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default App
