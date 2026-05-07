import { useEffect, useState } from 'react'
import SiteFooter from './components/layout/SiteFooter'
import SiteHeader from './components/layout/SiteHeader'
import ContactPage from './components/pages/ContactPage'
import DashboardPage from './components/pages/DashboardPage'
import HomePage from './components/pages/HomePage'
import VideoPreviewModal from './components/shared/VideoPreviewModal'
import { languageStorageKey, techFromPalestineUrl } from './config/appConfig'
import { applyPageImages } from './config/siteImages'
import { getPreferredLanguage, parseHash, scrollToRoute } from './utils/appUtils'

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
        'A youth-first hackathon for builders under 18. Share the idea, show the work, and add a short voice or video pitch.',
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
      // Developer note: the image for these cards now lives in `src/config/siteImages.js`.
      mediaCards: [
        {
          badge: 'Contest visual',
          type: 'photo',
          title: 'Summer 2026 launch',
          note: 'A youth contest for apps, robotics, Arduino builds, and local problem solving.',
        },
        {
          badge: 'Demo stage',
          type: 'video',
          title: 'Student pitch clips',
          note: 'Short videos from participating teams will bring each idea to life during the contest.',
          videoUrl: '/media/hero/student-pitch-clips.mp4',
        },
      ],
    },
    mediaGallery: {
      eyebrow: 'Builders gallery',
      title: 'Watch young makers move from idea to demo',
      body:
        'This gallery is made for the best moments of the hackathon: kids and teens planning, coding, wiring, testing, recording, and presenting the projects they believe in.',
      notes: ['Coding tables', 'Robot testing', 'App demos', 'Pitch practice'],
      support: {
        badge: 'Inside the room',
        title: 'The strongest gallery moments come from real work, real teamwork, and real excitement.',
        body:
          'When students sketch, test, fix, and explain ideas together, the story of the hackathon becomes much more powerful.',
        steps: [
          'A fast sketch turns into a shared plan',
          'A prototype test leads to a smarter next version',
          'A short demo makes the idea easy to feel and remember',
        ],
      },
      // Developer note: image fields now live in `src/config/siteImages.js`; keep `videoUrl` or `embedUrl` here only for video cards.
      featured: {
        badge: 'Opening photo',
        type: 'photo',
        title: 'Teams in the build zone',
        note: 'The build zone fills with focus, teamwork, laptops, sketches, wires, and the first signs of working ideas.',
        size: 'hero',
        tone: 'mist',
      },
      // Developer note: image fields now live in `src/config/siteImages.js`; keep `videoUrl` or `embedUrl` here only for video cards.
      cards: [
        {
          badge: 'Coding moment',
          type: 'photo',
          title: 'Building the first version',
          note: 'Students gather around code, flow sketches, and early experiments as the first version starts taking shape.',
          size: 'portrait',
          tone: 'mint',
        },
        {
          badge: 'Project video',
          type: 'video',
          title: 'Prototype in motion',
          note: 'Apps, robots, and sensors begin to move from concept to something visible, testable, and exciting.',
          size: 'landscape',
          tone: 'blue',
          videoUrl: '/media/builders-gallery/prototype-in-motion.mp4',
        },
        {
          badge: 'Making photo',
          type: 'photo',
          title: 'Hands-on building',
          note: 'Arduino parts, robot frames, cardboard models, notebooks, tools, and testing tables reveal the work behind the idea.',
          size: 'square',
          tone: 'sun',
        },
        {
          badge: 'Team portrait',
          type: 'photo',
          title: 'The builders behind the project',
          note: 'Each team brings its own story, energy, and point of view to the challenge.',
          size: 'square',
          tone: 'peach',
        },
        {
          badge: 'Demo video',
          type: 'video',
          title: 'Pitch rehearsal and final demo',
          note: 'Short demo runs help students explain the problem, show the solution, and build confidence before the final presentation.',
          size: 'landscape',
          tone: 'violet',
          videoUrl: '/media/builders-gallery/pitch-rehearsal-and-final-demo.mp4',
        },
      ],
    },
    mediaMoments: {
      eyebrow: 'Around the room',
      title: 'Random moments, reactions, and quick clips from the day',
      body:
        'Not every strong memory follows the project timeline. This section captures the atmosphere around it: crowd energy, mentor conversations, surprise reactions, and short videos that make the event feel alive.',
      notes: ['Crowd shots', 'Mentor clips', 'Reaction moments', 'Celebration'],
      loadMoreLabel: 'Load more moments',
      cards: [
        {
          badge: 'Candid photo',
          type: 'photo',
          title: 'Friends around one screen',
          note: 'Small circles form naturally when an idea suddenly works and everyone leans in to see what changed.',
          size: 'hero',
          tone: 'peach',
        },
        {
          badge: 'Phone video',
          type: 'video',
          title: 'Quick reactions from the floor',
          note: 'Short clips can capture the honest excitement that happens between testing, laughing, and showing someone a breakthrough.',
          size: 'story',
          tone: 'flash',
          videoUrl: '/media/around-the-room/quick-reactions.mp4',
        },
        {
          badge: 'Mentor moment',
          type: 'photo',
          title: 'Mentor check-in at the table',
          note: 'A quick check-in at the table shows how encouragement, explanation, and laughter often happen in the same moment.',
          size: 'square',
          tone: 'peach',
        },
        {
          badge: 'Build photo',
          type: 'photo',
          title: 'Building the first version',
          note: 'A breadboard, Arduino board, and a simple game on screen make the first working version feel real.',
          size: 'square',
          tone: 'sun',
        },
        {
          badge: 'Build clip',
          type: 'video',
          title: 'Practical build in motion',
          note: 'A close-up clip from the table keeps the hands-on side of the day visible, not just the final result.',
          size: 'landscape',
          tone: 'mint',
          videoUrl: '/media/around-the-room/practical-build.mp4',
        },
        {
          badge: 'Playtest photo',
          type: 'photo',
          title: 'Testing the game together',
          note: 'Watching the game on screen while the wires stay connected makes the whole table feel involved in the test, not just one student.',
          size: 'square',
          tone: 'mist',
        },
        {
          badge: 'Venue photo',
          type: 'photo',
          title: 'Inside the build space',
          note: 'A wider scene shows laptops open, tables busy, people moving, and the contest atmosphere building in every corner.',
          size: 'banner',
          tone: 'mist',
        },
        {
          badge: 'Team clip',
          type: 'video',
          title: 'Inside the workspace',
          note: 'This quick clip shows how naturally teams gather, explain progress, and pull others into the moment.',
          size: 'square',
          tone: 'mint',
          videoUrl: '/media/around-the-room/teams-inside-the-build-space.mp4',
        },
        {
          badge: 'Focus photo',
          type: 'photo',
          title: 'Quiet build focus',
          note: 'Some of the strongest room moments are quieter: a student holds the controls steady while the team watches for the next response.',
          size: 'story',
          tone: 'sun',
        },
        {
          badge: 'Mentor moment',
          type: 'photo',
          title: 'The people behind the project',
          note: 'The strongest room moments often come from the faces around the table: students listening closely, explaining ideas, and helping each other think.',
          size: 'square',
          tone: 'peach',
        },
        {
          badge: 'Prototype clip',
          type: 'video',
          title: 'First version in motion',
          note: 'A short screen-and-hardware clip turns early progress into something visible, testable, and easy to share.',
          size: 'square',
          tone: 'night',
          videoUrl: '/media/around-the-room/first-version-in-motion.mp4',
        },
        {
          badge: 'Screen close-up',
          type: 'photo',
          title: 'Prototype score on screen',
          note: 'A close-up of the live score, speed, and remaining lives turns testing into a visible little milestone.',
          size: 'square',
          tone: 'night',
        },
        {
          badge: 'Circuit photo',
          type: 'photo',
          title: 'Hands on the controls',
          note: 'A simple breadboard and a few careful fingers are enough to show how much attention goes into every tiny adjustment.',
          size: 'square',
          tone: 'sun',
        },
        {
          badge: 'Backstage clip',
          type: 'video',
          title: 'Fast videos between demos',
          note: 'Quick footage between formal presentations can show real personality, movement, and the natural rhythm of the event.',
          size: 'banner',
          tone: 'flash',
          videoUrl: '/media/around-the-room/fast-demo-clips.mp4',
        },
        {
          badge: 'Live demo clip',
          type: 'video',
          title: 'Mentor demo in motion',
          note: 'A short clip from the mentoring table captures the kind of explanation that makes the whole room pause and pay attention.',
          size: 'landscape',
          tone: 'blue',
          videoUrl: '/media/around-the-room/mentor-demo-in-motion.mp4',
        },
        {
          badge: 'Workshop photo',
          type: 'photo',
          title: 'Holding up the sensor',
          note: 'A tiny component lifted into view can turn an abstract explanation into something every student can immediately follow.',
          size: 'story',
          tone: 'sun',
        },
        {
          badge: 'Circuit photo',
          type: 'photo',
          title: 'Checking the display wiring',
          note: 'Wires, questions, and quick hand movements all point to the same thing: the table itself becomes part of the explanation.',
          size: 'story',
          tone: 'mist',
        },
        {
          badge: 'Room photo',
          type: 'photo',
          title: 'The room learning together',
          note: 'The wider classroom view shows every table testing, listening, and building at the same time.',
          size: 'story',
          tone: 'peach',
        },
        {
          badge: 'Debug photo',
          type: 'photo',
          title: 'Debugging at one crowded table',
          note: 'Open terminals, loose jumper wires, and people leaning in say a lot about how real debugging actually looks.',
          size: 'square',
          tone: 'night',
        },
        {
          badge: 'Coding photo',
          type: 'photo',
          title: 'Pair programming on one laptop',
          note: 'Two students leaning into one screen is often enough to move a stuck idea forward.',
          size: 'story',
          tone: 'mint',
        },
        {
          badge: 'Team photo',
          type: 'photo',
          title: 'Students coding side by side',
          note: 'Coding shoulder to shoulder turns the laptop into a shared workspace instead of a solo task.',
          size: 'story',
          tone: 'mist',
        },
        {
          badge: 'Table photo',
          type: 'photo',
          title: 'Sharing a laptop from every angle',
          note: 'When several students lean around one device, the laptop stops feeling personal and starts becoming the team\'s common ground.',
          size: 'landscape',
          tone: 'peach',
        },
        {
          badge: 'Browser photo',
          type: 'photo',
          title: 'Working through the browser flow',
          note: 'A browser-based tool on one screen can be just enough to get the next test, answer, or idea moving.',
          size: 'story',
          tone: 'blue',
        },
        {
          badge: 'Focus photo',
          type: 'photo',
          title: 'Focus on the next fix',
          note: 'Some progress comes from a quiet minute where a student studies the screen and decides what to change next.',
          size: 'story',
          tone: 'sun',
        },
        {
          badge: 'Mentor photo',
          type: 'photo',
          title: 'Mentor feedback circle',
          note: 'A mentor standing over a small circle can reset the direction of a whole team in just a few sentences.',
          size: 'story',
          tone: 'peach',
        },
        {
          badge: 'Review photo',
          type: 'photo',
          title: 'Screen review together',
          note: 'Sometimes the next step is simply slowing down together and reading the code line by line.',
          size: 'story',
          tone: 'night',
        },
        {
          badge: 'Code photo',
          type: 'photo',
          title: 'Reading the code line by line',
          note: 'A shared screen creates the kind of focused silence where one useful detail suddenly becomes obvious.',
          size: 'square',
          tone: 'mint',
        },
        {
          badge: 'Python photo',
          type: 'photo',
          title: 'First Python line on screen',
          note: 'Seeing the first small Python output on screen gives the whole table something concrete to react to.',
          size: 'story',
          tone: 'flash',
        },
        {
          badge: 'Girls team photo',
          type: 'photo',
          title: 'One more try from the girls table',
          note: 'This table has its own rhythm: patient, focused, and ready to try again until the idea works.',
          size: 'story',
          tone: 'mist',
        },
        {
          badge: 'Room photo',
          type: 'photo',
          title: 'Quiet corner still building',
          note: 'Even away from the center of the room, students keep building in their own steady rhythm.',
          size: 'story',
          tone: 'sun',
        },
      ],
    },
    mediaModal: {
      eyebrow: 'Video spotlight',
      openLabel: 'Open video preview',
      closeLabel: 'Close preview',
      playerLabels: {
        play: 'Play video',
        pause: 'Pause video',
        progress: 'Video progress',
        muteShort: 'Mute',
        unmuteShort: 'Sound on',
        restartShort: 'Restart',
      },
      placeholderTitle: 'Project clips deserve a stage of their own',
      placeholderText:
        'This cinematic viewer is ready for student demos, pitch rehearsals, mentor clips, and fast moments from the build room.',
      highlights: [
        'A short demo can show movement, testing, and real progress.',
        'Pitch clips help judges hear the student voice behind the project.',
        'Quick room footage adds energy, teamwork, and atmosphere to the story.',
      ],
      openExternal: 'Open full video',
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
        'This partnership brings together one organization focused on serious technology pathways and global opportunity, and another rooted in volunteer-led learning communities for children and teens in Gaza.',
      cards: [
        {
          name: 'Tech From Palestine',
          href: techFromPalestineUrl,
          body:
            'Tech From Palestine is a nonprofit founded in Gaza to expand access to quality technology education and global opportunity for Palestinian youth and engineers. Through hands-on training in programming, robotics, electronics, and embedded systems, and through community programs such as Tech Explorers and Tech Teens, it has supported more than 1,000 engineers, connected 100+ professionals with international opportunities, and introduced 500+ children and youth to the world of technology in safe, practical learning spaces.',
        },
        {
          name: 'Code Sprouts Palestine',
          body:
            'Code Sprouts Palestine helps establish volunteer-led coding clubs by training volunteers, sharing learning materials, and supporting clubs that are managed independently by their local teams. Its decentralized model encourages leadership, peer learning, creativity, and long-term community ownership, giving children and teens welcoming spaces to explore coding, problem solving, robotics, and technology with confidence.',
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
          answer:
            'Participants should be under 18 and based in Gaza. Students aged 13 to 17 can apply alone, while applicants under 13 should be submitted by a parent, mentor, or older family member. Teams of up to 3 students are welcome.',
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
      title: 'Prepare a strong youth submission with clarity and confidence.',
      text:
        'A quick guide for students, parents, and mentors before the application starts.',
      primary: 'Jump to the application',
      secondary: 'Back to landing page',
      facts: [
        { label: 'Accepted formats', value: 'Idea, prototype, or early build' },
        { label: 'Pitch support', value: 'Voice or video link up to 3 minutes' },
        { label: 'Audience', value: 'Students, parents, and mentors' },
      ],
    },
    contactMedia: {
      eyebrow: 'Project media board',
      title: 'Every team can tell its story with images and a short demo',
      body:
        'Each application can showcase one main image, one short demo video, and one making photo. This gives judges and visitors a fast visual sense of the idea before they read the details.',
      notes: ['Project cover image', 'Short demo video', 'Behind-the-build photo'],
      // Developer note: image fields now live in `src/config/siteImages.js`; keep `videoUrl` or `embedUrl` here only for video cards.
      cards: [
        {
          badge: 'Project image',
          type: 'photo',
          title: 'Project cover',
          note: 'The main visual can introduce the app, the robot, the device, or the prototype at first glance.',
        },
        {
          badge: 'Project video',
          type: 'video',
          title: 'Project demo',
          note: 'A short clip can show the build in action, explain the problem, and highlight the student solution.',
        },
        {
          badge: 'Team story',
          type: 'photo',
          title: 'Build journey',
          note: 'A making photo helps capture the student, the setup, and the effort behind the final project.',
        },
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
        'Applicants under 13 should be submitted by a parent, mentor, or older family member',
        'Teams can include up to 3 students and may also list a mentor',
        'Technology projects across software and hardware are welcome',
      ],
    },
    form: {
      eyebrow: 'Application form',
      title: 'Submit your project idea',
      text:
        'Four short steps. Add the essentials, move forward, and prepare a clean summary at the end.',
      progressLabel: 'Application progress',
      currentStepLabel: 'Current step',
      milestones: ['Student', 'Track', 'Idea', 'Pitch'],
      infoPills: ['About 4 minutes', 'Draft saves automatically', 'Solo or team up to 3'],
      back: 'Back',
      next: 'Continue',
      nextStepReady: 'This step looks good. You can move to the next one.',
      sections: {
        basics: {
          step: '01',
          title: 'Start with the student basics',
          text: 'Add the student details and choose who is submitting the form.',
        },
        setup: {
          step: '02',
          title: 'Choose the right track',
          text: 'Pick the category and project stage that fit the idea best.',
        },
        story: {
          step: '03',
          title: 'Tell the story of the idea',
          text: 'Keep it simple: problem, idea, and why it matters.',
        },
        pitch: {
          step: '04',
          title: 'Add the pitch and final links',
          text: 'Add one short pitch link and the best contact for follow-up.',
        },
      },
      teamModes: [
        { id: 'solo', label: 'Solo student' },
        { id: 'duo', label: '2-student team' },
        { id: 'trio', label: '3-student team' },
      ],
      applicationCard: {
        eyebrow: 'Age and support',
        title: 'The form changes slightly based on the student age.',
        empty: 'Add the student age first so we can show the right application path.',
        under13:
          'Students under 13 need a parent, mentor, or older family member to submit for them.',
        teen:
          'Students aged 13 to 17 can apply on their own or ask an adult to handle the submission.',
        team:
          'Teams can include up to 3 students, and one form can represent the whole team.',
      },
      applicationPaths: [
        { id: 'self', label: 'The student is applying directly' },
        {
          id: 'adult',
          label: 'A parent, mentor, or older family member is applying for the student',
        },
      ],
      teamHint:
        'Use one form for the whole team. If this is a 2-student or 3-student team, extra teammate cards will appear below.',
      teamMemberCards: {
        intro:
          'Add the key details for each extra student so the organizing team knows the full team clearly.',
        secondTitle: 'Student 2 details',
        thirdTitle: 'Student 3 details',
      },
      adultCardTitle: 'Adult support details',
      adultCardText:
        'This is required for applicants under 13, and available for older students who want an adult to submit for them.',
      mentorToggleTitle: 'Would you like to add a mentor?',
      mentorToggleText:
        'Optional, but helpful when a mentor is guiding the student or team during the project.',
      mentorChoices: [
        { id: 'no', label: 'No mentor listed' },
        { id: 'yes', label: 'Yes, add a mentor' },
      ],
      mentorCardTitle: 'Mentor details',
      mentorCardText:
        'Add the mentor name if someone is supporting the build, coaching the team, or helping the student prepare.',
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
        applicationOwner: 'Who is submitting this form?',
        city: 'City',
        school: 'School or club',
        teamType: 'Team format',
        teamMemberContact: 'Contact number',
        adultRole: 'Adult relationship to the student',
        adultName: 'Adult full name',
        mentorName: 'Mentor name',
        mentorContact: 'Mentor contact details',
        projectName: 'Project name',
        projectStage: 'Project stage',
        category: 'Category',
        problem: 'What problem are you solving?',
        description: 'Project idea',
        recordingLink: 'Voice or video link (up to 3 minutes)',
        projectLink: 'Extra project link',
        contact: 'Best contact for updates',
      },
      placeholders: {
        fullName: 'Your full name',
        age: 'Under 18',
        city: 'Gaza',
        school: 'Optional',
        teamMemberContact: 'Phone number',
        adultRole: 'Parent, guardian, mentor, aunt, older brother...',
        adultName: 'Name of the adult submitting or supporting',
        mentorName: 'Optional mentor name',
        mentorContact: 'Optional mentor phone or email',
        projectName: 'Give your idea a name',
        problem: 'Describe the need or challenge',
        description: 'Explain how the idea works, who it helps, and what makes it exciting.',
        recordingLink: 'https://...',
        projectLink: 'Prototype, repo, drive, or demo link',
        contact: 'Student email, phone number, or best family contact',
      },
      helpers: {
        teamMemberContact:
          'Add a student phone number or family number we can use if we need to reach this teammate.',
        adultRole:
          'Applicants under 13 must be submitted by an adult who is connected to the student.',
        problem: 'Try to describe the real-life issue in one or two simple sentences.',
        description: 'You can explain the build, the user journey, the hardware setup, or what makes your idea different.',
        recordingLink: 'The recording can be a voice note or a short video link. Keep it personal, short, and clear.',
        projectLink: 'Optional: add any extra link that helps judges understand the build better.',
        mentorContact:
          'Optional, but helpful if the team has a mentor the organizers may need to reach.',
        contactSelf:
          'Use the best contact for the student or team lead so organizers can follow up easily.',
        contactAdult:
          'Use the adult contact that organizers should reach for updates, questions, and follow-up.',
      },
      optionalLabel: 'Optional',
      saveNote: 'Your draft saves automatically on this device while you type.',
      missingTitle: 'Still needed before submission',
      readyTitle: 'Ready to submit',
      readyText: 'All key answers are in place. You can prepare the submission now.',
      ideaPromptTitle: 'What helps an application stand out',
      ideaPrompts: [
        {
          title: 'Name a real problem',
          body: 'Say who faces this issue and why it matters in daily life, school, or the community.',
        },
        {
          title: 'Show the build clearly',
          body: 'Explain what the student will make, not only the dream behind it.',
        },
        {
          title: 'Keep the pitch personal',
          body: 'A short honest voice note or video is stronger than a long perfect script.',
        },
      ],
      submit: 'Prepare my submission',
      reset: 'Clear form',
      resultEyebrow: 'Submission summary',
      resultTitle: 'A ready message for the official channel',
      resultText:
        'This panel turns the form into a clean summary the participant can copy when it is time to submit officially.',
      resultNextTitle: 'What to do next',
      resultNextSteps: [
        'Read the summary once and fix anything that still feels unclear.',
        'Copy it when you are ready to send it through the official event channel.',
        'Make sure your voice or video link opens correctly for the judges.',
      ],
      resultEmpty: 'No submission summary yet. Fill in the form and prepare it here.',
      copy: 'Copy summary',
      snapshotTitle: 'Quick project snapshot',
      snapshotEmpty: 'Still empty',
      statusReady: 'Strong draft',
      statusInProgress: 'In progress',
      readinessTitle: 'Readiness checklist',
      readinessItems: [
        'Student details and the application path are clear',
        'Team setup, category, and project stage are selected',
        'The problem and idea are explained clearly',
        'A voice or video pitch link and a working contact are attached',
      ],
      summaryTitle: 'Gaza Youth Tech Hackathon Submission',
      missingSchool: 'Not provided',
      missingTeamType: 'Not selected',
      missingApplicationOwner: 'Not selected',
      summaryLabels: {
        fullName: 'Full name',
        age: 'Age',
        applicationOwner: 'Application path',
        city: 'City',
        school: 'School or club',
        teamType: 'Team format',
        teamMembers: 'Team details',
        teamMemberContact: 'Contact number',
        adultRole: 'Adult relationship',
        adultName: 'Adult full name',
        mentorName: 'Mentor name',
        mentorContact: 'Mentor contact details',
        projectName: 'Project name',
        projectStage: 'Project stage',
        category: 'Category',
        problem: 'Problem to solve',
        description: 'Project idea',
        recordingLink: 'Voice or video link',
        projectLink: 'Extra project link',
        contact: 'Best contact for updates',
      },
      snapshotLabels: {
        projectName: 'Project',
        applicationOwner: 'Submitted by',
        teamType: 'Format',
        category: 'Track',
        projectStage: 'Stage',
        status: 'Status',
      },
      feedback: {
        completeRequired: 'Finish the key required fields before submitting.',
        invalidAge: 'This hackathon is currently designed for participants under 18.',
        prepared:
          'Your application was prepared and saved in the dashboard for organizer review.',
        cleared: 'Form cleared.',
      },
    },
    dashboard: {
      eyebrow: 'Organizer dashboard',
      title: 'Review applications, move them through stages, and keep the full story visible.',
      text:
        'This live dashboard reads submissions, organizer notes, admins, and Around the room media from the Express backend connected to Mongo Atlas.',
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
        'Once an application is submitted from the form, it will appear here from the backend for the whole organizer team.',
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
      rights: 'All copyrights reserved by TFP & CSP 2026',
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
        'هاكاثون مخصص للمبدعين تحت 18 سنة. شارك الفكرة، وأظهر العمل، وأضف رابطًا قصيرًا لصوت أو فيديو.',
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
      // Developer note: the image for these cards now lives in `src/config/siteImages.js`.
      mediaCards: [
        {
          badge: 'صورة الحدث',
          type: 'photo',
          title: 'إطلاق صيف 2026',
          note: 'مسابقة شبابية للتطبيقات والروبوت والأردوينو والأفكار التقنية التي تخدم المجتمع.',
        },
        {
          badge: 'منصة العرض',
          type: 'video',
          title: 'مقاطع عرض الطلاب',
          note: 'فيديوهات الفرق المشاركة ستمنح كل فكرة حضورها الحقيقي خلال المسابقة.',
          videoUrl: '/media/hero/student-pitch-clips.mp4',
        },
      ],
    },
    mediaGallery: {
      eyebrow: 'معرض البنّائين',
      title: 'تابع صُنّاع المستقبل وهم ينتقلون من الفكرة إلى العرض',
      body:
        'هذا المعرض مخصص لأجمل لحظات الهاكاثون: الأطفال والمراهقون وهم يخططون ويبرمجون ويوصلون القطع ويختبرون ويسجلون ويعرضون المشاريع التي يؤمنون بها.',
      notes: ['طاولات البرمجة', 'اختبار الروبوت', 'عروض التطبيقات', 'تجهيز العرض'],
      support: {
        badge: 'داخل القاعة',
        title: 'أقوى لحظات المعرض تأتي من العمل الحقيقي والتعاون الحقيقي والحماس الحقيقي.',
        body:
          'حين يرسم الطلاب الفكرة ويختبرونها ويعدّلونها ويشرحونها معًا، تصبح قصة الهاكاثون أكثر قوة ووضوحًا.',
        steps: [
          'رسم سريع يتحول إلى خطة مشتركة',
          'اختبار النموذج يقود إلى نسخة أذكى وأفضل',
          'عرض قصير يجعل الفكرة سهلة الإحساس وسهلة التذكّر',
        ],
      },
      // Developer note: image fields now live in `src/config/siteImages.js`; keep `videoUrl` or `embedUrl` here only for video cards.
      featured: {
        badge: 'الصورة الافتتاحية',
        type: 'photo',
        title: 'الفرق داخل مساحة البناء',
        note: 'تمتلئ مساحة البناء بالتركيز والعمل الجماعي واللابتوبات والرسومات والأسلاك وبدايات الأفكار التي تتحول إلى شيء حقيقي.',
        size: 'hero',
        tone: 'mist',
      },
      // Developer note: image fields now live in `src/config/siteImages.js`; keep `videoUrl` or `embedUrl` here only for video cards.
      cards: [
        {
          badge: 'لحظة برمجة',
          type: 'photo',
          title: 'بناء النسخة الأولى',
          note: 'يجتمع الطلاب حول الكود ورسومات الفكرة والتجارب الأولى بينما تبدأ النسخة الأولى من المشروع في الظهور.',
          size: 'portrait',
          tone: 'mint',
        },
        {
          badge: 'فيديو المشروع',
          type: 'video',
          title: 'النموذج أثناء الحركة',
          note: 'هنا يظهر المشروع وهو يتحول من فكرة إلى شيء يمكن رؤيته واختباره والإحساس بحضوره الحقيقي.',
          size: 'landscape',
          tone: 'blue',
          videoUrl: '/media/builders-gallery/prototype-in-motion.mp4',
        },
        {
          badge: 'صورة التنفيذ',
          type: 'photo',
          title: 'البناء العملي',
          note: 'قطع الأردوينو وهياكل الروبوت والنماذج والدفاتر والأدوات وطاولات الاختبار تكشف الجهد الحقيقي خلف الفكرة.',
          size: 'square',
          tone: 'sun',
        },
        {
          badge: 'صورة الفريق',
          type: 'photo',
          title: 'من يقفون خلف المشروع',
          note: 'لكل فريق طاقته الخاصة وقصته وطريقته في النظر إلى المشكلة وصناعة الحل.',
          size: 'square',
          tone: 'peach',
        },
        {
          badge: 'فيديو العرض',
          type: 'video',
          title: 'تجربة العرض النهائي',
          note: 'العرض القصير قبل التقديم النهائي يمنح الطلاب فرصة لشرح المشكلة وإبراز الحل وبناء الثقة أمام الآخرين.',
          size: 'landscape',
          tone: 'violet',
          videoUrl: '/media/builders-gallery/pitch-rehearsal-and-final-demo.mp4',
        },
      ],
    },
    mediaMoments: {
      eyebrow: 'من أجواء المكان',
      title: 'لقطات عفوية وردود فعل ومقاطع سريعة من يوم الهاكاثون',
      body:
        'ليست كل الذكريات مرتبطة بخطوات المشروع فقط. هذا القسم يوثق الأجواء المحيطة بها: طاقة القاعة، أحاديث المرشدين، ردود الفعل المفاجئة، والمقاطع القصيرة التي تجعل الحدث حيًا في الذاكرة.',
      notes: ['لقطات الجمهور', 'مقاطع المرشدين', 'لحظات التفاعل', 'فرحة الإنجاز'],
      loadMoreLabel: 'تحميل المزيد من اللقطات',
      cards: [
        {
          badge: 'صورة عفوية',
          type: 'photo',
          title: 'أصدقاء حول شاشة واحدة',
          note: 'تتكوّن الدوائر الصغيرة تلقائيًا عندما تنجح فكرة فجأة ويقترب الجميع ليروا ما الذي تغيّر.',
          size: 'hero',
          tone: 'peach',
        },
        {
          badge: 'فيديو هاتف',
          type: 'video',
          title: 'ردود فعل سريعة من القاعة',
          note: 'المقاطع القصيرة تلتقط الحماس الحقيقي بين الاختبار والضحك ومشاركة لحظة النجاح مع الآخرين.',
          size: 'story',
          tone: 'flash',
          videoUrl: '/media/around-the-room/quick-reactions.mp4',
        },
        {
          badge: 'لحظة إرشاد',
          type: 'photo',
          title: 'متابعة إرشادية على الطاولة',
          note: 'متابعة سريعة على الطاولة تُظهر كيف يجتمع التشجيع والشرح والضحك في لحظة واحدة.',
          size: 'square',
          tone: 'peach',
        },
        {
          badge: 'صورة تنفيذ',
          type: 'photo',
          title: 'بناء النسخة الأولى',
          note: 'لوحة الأردوينو والأسلاك والنسخة البسيطة على الشاشة تجعل الفكرة تبدو حقيقية منذ اللحظة الأولى.',
          size: 'square',
          tone: 'sun',
        },
        {
          badge: 'مقطع تنفيذ',
          type: 'video',
          title: 'البناء العملي وهو يتحرك',
          note: 'اللقطة القريبة من طاولة العمل تُبقي الجانب العملي من اليوم حاضرًا، لا النتيجة النهائية فقط.',
          size: 'landscape',
          tone: 'mint',
          videoUrl: '/media/around-the-room/practical-build.mp4',
        },
        {
          badge: 'صورة تجربة',
          type: 'photo',
          title: 'تجربة اللعبة معًا',
          note: 'متابعة اللعبة على الشاشة بينما تبقى الأسلاك موصولة تجعل الطاولة كلها جزءًا من التجربة، لا طالبًا واحدًا فقط.',
          size: 'square',
          tone: 'mist',
        },
        {
          badge: 'صورة المكان',
          type: 'photo',
          title: 'داخل مساحة البناء',
          note: 'المشهد الواسع يُظهر اللابتوبات المفتوحة والطاولات المزدحمة والحركة التي تصنع أجواء المسابقة في كل زاوية.',
          size: 'banner',
          tone: 'mist',
        },
        {
          badge: 'مقطع فريق',
          type: 'video',
          title: 'لقطة سريعة من داخل المساحة',
          note: 'هذا المقطع القصير يوضح كيف تتجمع الفرق تلقائيًا لتشرح التقدم وتشارك اللحظة مع من حولها.',
          size: 'square',
          tone: 'mint',
          videoUrl: '/media/around-the-room/teams-inside-the-build-space.mp4',
        },
        {
          badge: 'صورة تركيز',
          type: 'photo',
          title: 'تركيز هادئ أثناء البناء',
          note: 'بعض أقوى لحظات القاعة تكون هادئة: طالبة تثبّت التوصيلات بينما يراقب الفريق الاستجابة التالية.',
          size: 'story',
          tone: 'sun',
        },
        {
          badge: 'لحظة إرشاد',
          type: 'photo',
          title: 'من يقفون خلف المشروع',
          note: 'أقوى لحظات القاعة كثيرًا ما تظهر في الوجوه المحيطة بالطاولة: من يشرحون، ومن ينصتون، ومن يساعدون الفكرة على أن تتقدم.',
          size: 'square',
          tone: 'peach',
        },
        {
          badge: 'مقطع نموذج أولي',
          type: 'video',
          title: 'النسخة الأولى وهي تعمل',
          note: 'مقطع سريع من الشاشة والعتاد يحول التقدم المبكر إلى شيء مرئي وقابل للاختبار ويسهل مشاركته.',
          size: 'square',
          tone: 'night',
          videoUrl: '/media/around-the-room/first-version-in-motion.mp4',
        },
        {
          badge: 'لقطة شاشة',
          type: 'photo',
          title: 'نتيجة النموذج على الشاشة',
          note: 'اللقطة القريبة للنتيجة والسرعة وعدد المحاولات المتبقية تجعل الاختبار نفسه يبدو كإنجاز صغير ومرئي.',
          size: 'square',
          tone: 'night',
        },
        {
          badge: 'صورة دارة',
          type: 'photo',
          title: 'أيدٍ على أدوات التحكم',
          note: 'لوحة تجارب بسيطة وعدة أصابع دقيقة تكفي لتُظهر مقدار الانتباه الذي يدخل في كل تعديل صغير.',
          size: 'square',
          tone: 'sun',
        },
        {
          badge: 'مقطع خلف الكواليس',
          type: 'video',
          title: 'فيديوهات سريعة بين العروض',
          note: 'المشاهد القصيرة بين الفقرات الرسمية تكشف الشخصية الحقيقية للطلاب وحركة اليوم كما هي.',
          size: 'banner',
          tone: 'flash',
          videoUrl: '/media/around-the-room/fast-demo-clips.mp4',
        },
        {
          badge: 'مقطع إرشادي حي',
          type: 'video',
          title: 'شرح إرشادي أثناء الحركة',
          note: 'هذا المقطع القصير من طاولة الإرشاد يلتقط نوع الشرح الذي يجعل القاعة كلها تتوقف للحظة وتنتبه.',
          size: 'landscape',
          tone: 'blue',
          videoUrl: '/media/around-the-room/mentor-demo-in-motion.mp4',
        },
        {
          badge: 'صورة ورشة',
          type: 'photo',
          title: 'رفع الحساس أمام الجميع',
          note: 'قطعة صغيرة مرفوعة أمام العيون قادرة على تحويل الشرح النظري إلى شيء يمكن للجميع فهمه فورًا.',
          size: 'story',
          tone: 'sun',
        },
        {
          badge: 'صورة دارة',
          type: 'photo',
          title: 'فحص توصيلات الشاشة',
          note: 'الأسلاك والأسئلة وحركة الأيدي السريعة كلها تشير إلى شيء واحد: الطاولة نفسها تصبح جزءًا من الشرح.',
          size: 'story',
          tone: 'mist',
        },
        {
          badge: 'صورة القاعة',
          type: 'photo',
          title: 'القاعة تتعلم معًا',
          note: 'اللقطة الأوسع تُظهر كل طاولة وهي تختبر وتستمع وتبني في الوقت نفسه.',
          size: 'story',
          tone: 'peach',
        },
        {
          badge: 'صورة تصحيح',
          type: 'photo',
          title: 'تصحيح الأعطال على طاولة مزدحمة',
          note: 'الشاشات المفتوحة وأسلاك التوصيل المتناثرة والالتفاف حول الفكرة تكشف شكل التصحيح الحقيقي كما هو.',
          size: 'square',
          tone: 'night',
        },
        {
          badge: 'صورة برمجة',
          type: 'photo',
          title: 'برمجة ثنائية على لابتوب واحد',
          note: 'اقتراب طالبين من شاشة واحدة يكون أحيانًا كافيًا لتحريك فكرة متوقفة إلى الأمام.',
          size: 'story',
          tone: 'mint',
        },
        {
          badge: 'صورة فريق',
          type: 'photo',
          title: 'طلاب يبرمجون جنبًا إلى جنب',
          note: 'العمل كتفًا إلى كتف يجعل الحاسوب مساحة مشتركة لا مهمة فردية.',
          size: 'story',
          tone: 'mist',
        },
        {
          badge: 'صورة الطاولة',
          type: 'photo',
          title: 'مشاركة الشاشة من كل زاوية',
          note: 'حين يلتف عدة طلاب حول جهاز واحد، يتحول اللابتوب إلى نقطة عمل مشتركة للفريق كله.',
          size: 'landscape',
          tone: 'peach',
        },
        {
          badge: 'صورة متصفح',
          type: 'photo',
          title: 'متابعة المسار عبر المتصفح',
          note: 'أداة بسيطة على المتصفح قد تكون كافية لإطلاق الاختبار أو الإجابة أو الفكرة التالية.',
          size: 'story',
          tone: 'blue',
        },
        {
          badge: 'صورة تركيز',
          type: 'photo',
          title: 'تركيز على التعديل التالي',
          note: 'بعض التقدم يبدأ من دقيقة هادئة يحدق فيها الطالب في الشاشة قبل أن يقرر ما الذي سيغيره.',
          size: 'story',
          tone: 'sun',
        },
        {
          badge: 'صورة إرشاد',
          type: 'photo',
          title: 'دائرة إرشاد صغيرة',
          note: 'وقوف المرشد فوق مجموعة صغيرة قادر على إعادة توجيه الفريق كله في بضع جمل فقط.',
          size: 'story',
          tone: 'peach',
        },
        {
          badge: 'صورة مراجعة',
          type: 'photo',
          title: 'مراجعة الشاشة معًا',
          note: 'أحيانًا تكون الخطوة التالية مجرد أن يبطئ الجميع قليلًا ويقرأوا الكود سطرًا سطرًا.',
          size: 'story',
          tone: 'night',
        },
        {
          badge: 'صورة كود',
          type: 'photo',
          title: 'قراءة الكود سطرًا سطرًا',
          note: 'الشاشة المشتركة تصنع ذلك الصمت المركز الذي يجعل تفصيلة مفيدة تبدو فجأة واضحة للجميع.',
          size: 'square',
          tone: 'mint',
        },
        {
          badge: 'صورة بايثون',
          type: 'photo',
          title: 'أول سطر بايثون على الشاشة',
          note: 'رؤية أول ناتج بسيط لبايثون على الشاشة تمنح الطاولة كلها شيئًا ملموسًا تتفاعل معه.',
          size: 'story',
          tone: 'flash',
        },
        {
          badge: 'صورة فريق البنات',
          type: 'photo',
          title: 'محاولة جديدة من طاولة البنات',
          note: 'لهذه الطاولة إيقاعها الخاص: صبر وتركيز واستعداد لإعادة المحاولة حتى تنجح الفكرة.',
          size: 'story',
          tone: 'mist',
        },
        {
          badge: 'صورة القاعة',
          type: 'photo',
          title: 'زاوية هادئة لا تزال تبني',
          note: 'حتى بعيدًا عن مركز القاعة، يستمر الطلاب في البناء بإيقاعهم الهادئ والثابت.',
          size: 'story',
          tone: 'sun',
        },
      ],
    },
    mediaModal: {
      eyebrow: 'واجهة الفيديو',
      openLabel: 'افتح معاينة الفيديو',
      closeLabel: 'إغلاق المعاينة',
      playerLabels: {
        play: 'تشغيل الفيديو',
        pause: 'إيقاف الفيديو',
        progress: 'شريط تقدم الفيديو',
        muteShort: 'كتم',
        unmuteShort: 'تشغيل الصوت',
        restartShort: 'إعادة',
      },
      placeholderTitle: 'مقاطع المشاريع تستحق مساحة عرض خاصة بها',
      placeholderText:
        'هذه الواجهة جاهزة لعرض ديموهات الطلاب، وتجارب العرض، ولقطات المرشدين، واللحظات السريعة من مساحة العمل.',
      highlights: [
        'المقطع القصير يمكن أن يوضح الحركة والتجربة والتقدم الحقيقي.',
        'مقاطع العرض تساعد الحكام على سماع صوت الطالب خلف المشروع.',
        'اللقطات السريعة من المكان تضيف طاقة وروح فريق وحضورًا أقوى للقصة.',
      ],
      openExternal: 'افتح الفيديو الكامل',
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
        'هذه الشراكة تجمع بين جهة تركّز على المسارات التقنية الجادة والفرص العالمية، وجهة أخرى متجذّرة في مجتمعات التعلّم التطوعي للأطفال واليافعين في غزة.',
      cards: [
        {
          name: 'Tech From Palestine',
          href: techFromPalestineUrl,
          body:
            'Tech From Palestine هي مؤسسة غير ربحية انطلقت من غزة لتوسيع الوصول إلى تعليم تكنولوجي عالي الجودة وفتح فرص عالمية أمام الشباب والمهندسين الفلسطينيين. ومن خلال التدريب العملي في البرمجة والروبوتات والإلكترونيات والأنظمة المدمجة، وبرامج مجتمعية مثل Tech Explorers وTech Teens، دعمت المؤسسة أكثر من 1000 مهندس، وربطت أكثر من 100 محترف بفرص دولية، وقدّمت لأكثر من 500 طفل ويافع مدخلًا عمليًا وآمنًا إلى عالم التكنولوجيا.',
        },
        {
          name: 'Code Sprouts Palestine',
          body:
            'تساعد Code Sprouts Palestine في تأسيس نوادٍ تطوعية للبرمجة من خلال تدريب المتطوعين وتوفير المواد التعليمية ودعم الأندية التي تُدار بشكل مستقل من فرقها المحلية. هذا النموذج اللامركزي يعزّز القيادة والتعلّم التعاوني والإبداع وملكية المجتمع للمبادرات، ويمنح الأطفال واليافعين مساحات مرحّبة لاستكشاف البرمجة وحل المشكلات والروبوتات والتكنولوجيا بثقة.',
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
          answer:
            'يجب أن يكون المشاركون تحت 18 سنة ومن غزة. الطالب من عمر 13 إلى 17 سنة يمكنه التقديم بنفسه، أما من هو دون 13 سنة فيجب أن يُقدَّم له الطلب من أحد الوالدين أو مرشد أو قريب أكبر سنًا. كما نرحب بفرق تصل إلى 3 طلاب.',
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
      title: 'جهّز تقديمًا شبابيًا قويًا بوضوح وثقة.',
      text:
        'دليل سريع للطلاب وأولياء الأمور والمرشدين قبل بدء تعبئة الطلب.',
      primary: 'اذهب إلى النموذج',
      secondary: 'العودة إلى الرئيسية',
      facts: [
        { label: 'نوع التقديم', value: 'فكرة أو نموذج أولي أو بناء مبكر' },
        { label: 'دعم العرض', value: 'رابط صوتي أو فيديو حتى 3 دقائق' },
        { label: 'المستفيد', value: 'الطلاب والأهل والمرشدون' },
      ],
    },
    contactMedia: {
      eyebrow: 'لوحة وسائط المشروع',
      title: 'كل فريق يمكنه أن يروي قصته من خلال الصور وفيديو قصير',
      body:
        'يمكن لكل طلب أن يعرض صورة رئيسية واحدة وفيديو عرض قصيرًا وصورة من رحلة التنفيذ. هذا يمنح الحكام والزوار فهمًا بصريًا سريعًا للمشروع قبل قراءة التفاصيل.',
      notes: ['صورة الغلاف', 'فيديو العرض القصير', 'صورة من رحلة البناء'],
      // Developer note: image fields now live in `src/config/siteImages.js`; keep `videoUrl` or `embedUrl` here only for video cards.
      cards: [
        {
          badge: 'صورة المشروع',
          type: 'photo',
          title: 'غلاف المشروع',
          note: 'الصورة الرئيسية يمكن أن تعرّف بالتطبيق أو الروبوت أو الجهاز أو النموذج الأولي من النظرة الأولى.',
        },
        {
          badge: 'فيديو المشروع',
          type: 'video',
          title: 'عرض المشروع',
          note: 'المقطع القصير يمكن أن يوضح طريقة العمل والمشكلة والحل الذي يقدّمه الطالب.',
        },
        {
          badge: 'قصة الفريق',
          type: 'photo',
          title: 'رحلة البناء',
          note: 'صورة أثناء العمل تُظهر الطالب والمعدات والجهد الحقيقي خلف المشروع النهائي.',
        },
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
        'من هو دون 13 سنة يجب أن يُقدَّم له الطلب من ولي أمر أو مرشد أو قريب أكبر سنًا',
        'يمكن أن يضم الفريق حتى 3 طلاب مع إمكانية إضافة مرشد',
        'يرحب بالمشاريع التقنية في البرمجيات والعتاد',
      ],
    },
    form: {
      eyebrow: 'نموذج التقديم',
      title: 'قدّم فكرة مشروعك',
      text:
        'أربع خطوات قصيرة فقط. أضف الأساسيات، انتقل خطوة بخطوة، ثم جهّز ملخصًا واضحًا في النهاية.',
      progressLabel: 'تقدّم التقديم',
      currentStepLabel: 'الخطوة الحالية',
      milestones: ['الطالب', 'المسار', 'الفكرة', 'العرض'],
      infoPills: ['حوالي 4 دقائق', 'يُحفظ تلقائيًا', 'فردي أو فريق حتى 3'],
      back: 'رجوع',
      next: 'متابعة',
      nextStepReady: 'هذه الخطوة جاهزة ويمكنك الانتقال إلى التالية.',
      sections: {
        basics: {
          step: '01',
          title: 'ابدأ ببيانات الطالب',
          text: 'أضف بيانات الطالب وحدّد من الذي يقدّم النموذج.',
        },
        setup: {
          step: '02',
          title: 'اختر المسار المناسب',
          text: 'اختر المجال ومرحلة المشروع بشكل واضح ومباشر.',
        },
        story: {
          step: '03',
          title: 'احكِ قصة الفكرة',
          text: 'بشكل بسيط: ما المشكلة، ما الفكرة، ولماذا هي مهمة؟',
        },
        pitch: {
          step: '04',
          title: 'أضف العرض القصير والروابط',
          text: 'أضف رابط العرض القصير وأفضل وسيلة تواصل للمتابعة.',
        },
      },
      teamModes: [
        { id: 'solo', label: 'طالب واحد' },
        { id: 'duo', label: 'فريق من طالبين' },
        { id: 'trio', label: 'فريق من 3 طلاب' },
      ],
      applicationCard: {
        eyebrow: 'العمر والدعم',
        title: 'النموذج يتغير قليلًا بحسب عمر الطالب.',
        empty: 'أضف عمر الطالب أولًا حتى نعرض مسار التقديم المناسب.',
        under13:
          'الطلاب دون 13 سنة يحتاجون إلى ولي أمر أو مرشد أو قريب أكبر سنًا ليقدّم عنهم.',
        teen:
          'الطلاب من عمر 13 إلى 17 سنة يمكنهم التقديم بأنفسهم أو الطلب من شخص بالغ أن يقدّم عنهم.',
        team:
          'يمكن أن يضم الفريق حتى 3 طلاب، ويمكن لنموذج واحد أن يمثل الفريق كاملًا.',
      },
      applicationPaths: [
        { id: 'self', label: 'الطالب هو من يقدّم بنفسه' },
        {
          id: 'adult',
          label: 'ولي أمر أو مرشد أو قريب أكبر سنًا هو من يقدّم للطالب',
        },
      ],
      teamHint:
        'استخدم نموذجًا واحدًا للفريق كله. وإذا كان المشروع لفريق من طالبين أو 3 طلاب، ستظهر بطاقات إضافية لبيانات بقية الطلاب.',
      teamMemberCards: {
        intro:
          'أضف البيانات الأساسية لكل طالب إضافي حتى يكون فريق التنظيم على معرفة واضحة بكل أعضاء الفريق.',
        secondTitle: 'بيانات الطالب الثاني',
        thirdTitle: 'بيانات الطالب الثالث',
      },
      adultCardTitle: 'بيانات الشخص البالغ الداعم',
      adultCardText:
        'هذا القسم مطلوب لمن هو دون 13 سنة، ومتاح أيضًا للطلاب الأكبر سنًا إذا أرادوا أن يقدّم شخص بالغ عنهم.',
      mentorToggleTitle: 'هل تريد إضافة مرشد إلى هذا الطلب؟',
      mentorToggleText:
        'هذا اختياري، لكنه مفيد عندما يكون هناك مرشد يتابع الطالب أو الفريق أثناء تنفيذ المشروع.',
      mentorChoices: [
        { id: 'no', label: 'لا يوجد مرشد مذكور' },
        { id: 'yes', label: 'نعم، أضف مرشدًا' },
      ],
      mentorCardTitle: 'بيانات المرشد',
      mentorCardText:
        'أضف اسم المرشد إذا كان هناك من يدعم البناء أو يوجّه الفريق أو يساعد الطالب في التجهيز.',
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
        applicationOwner: 'من الذي يقدّم هذا النموذج؟',
        city: 'المدينة',
        school: 'المدرسة أو النادي',
        teamType: 'شكل الفريق',
        teamMemberContact: 'رقم التواصل',
        adultRole: 'صلة الشخص البالغ بالطالب',
        adultName: 'اسم الشخص البالغ',
        mentorName: 'اسم المرشد',
        mentorContact: 'بيانات تواصل المرشد',
        projectName: 'اسم المشروع',
        projectStage: 'مرحلة المشروع',
        category: 'المجال',
        problem: 'ما المشكلة التي تحاول حلها؟',
        description: 'فكرة المشروع',
        recordingLink: 'رابط الصوت أو الفيديو (حتى 3 دقائق)',
        projectLink: 'رابط إضافي للمشروع',
        contact: 'أفضل وسيلة تواصل للمتابعة',
      },
      placeholders: {
        fullName: 'اكتب اسمك الكامل',
        age: 'أقل من 18',
        city: 'غزة',
        school: 'اختياري',
        teamMemberContact: 'رقم الهاتف',
        adultRole: 'ولي أمر، وصي، مرشد، خالة، أخ أكبر...',
        adultName: 'اسم الشخص البالغ الذي يقدّم أو يدعم',
        mentorName: 'اسم المرشد إن وجد',
        mentorContact: 'هاتف أو بريد المرشد إن وجد',
        projectName: 'أعطِ فكرتك اسمًا',
        problem: 'صف الحاجة أو التحدي',
        description: 'اشرح كيف تعمل الفكرة، ومن تساعد، ولماذا هي مميزة.',
        recordingLink: 'https://...',
        projectLink: 'رابط نموذج أو مستودع أو عرض أو ملفات',
        contact: 'إيميل الطالب أو رقم الهاتف أو أفضل وسيلة تواصل عائلية',
      },
      helpers: {
        teamMemberContact:
          'أضف رقم الطالب أو رقم أحد أفراد العائلة الذي يمكننا استخدامه إذا احتجنا للتواصل مع هذا الطالب.',
        adultRole:
          'الطالب دون 13 سنة يجب أن يقدّم له شخص بالغ مرتبط به ويمكن التواصل معه.',
        problem: 'حاول وصف المشكلة الواقعية في جملة أو جملتين بسيطتين.',
        description: 'يمكنك شرح البناء أو الرحلة أو العتاد أو ما الذي يجعل فكرتك مختلفة.',
        recordingLink: 'يمكن أن يكون التسجيل صوتيًا أو فيديو قصيرًا. اجعله شخصيًا وواضحًا ومباشرًا.',
        projectLink: 'اختياري: أضف أي رابط إضافي يساعد الحكام على فهم المشروع بشكل أفضل.',
        mentorContact:
          'اختياري، لكنه مفيد إذا كان لدى الفريق مرشد قد يحتاج المنظمون إلى التواصل معه.',
        contactSelf:
          'استخدم أفضل وسيلة تواصل للطالب أو قائد الفريق حتى يتمكن المنظمون من المتابعة بسهولة.',
        contactAdult:
          'استخدم وسيلة تواصل الشخص البالغ الذي يجب أن يصل إليه فريق التنظيم عند المتابعة.',
      },
      optionalLabel: 'اختياري',
      saveNote: 'يتم حفظ المسودة تلقائيًا على هذا الجهاز أثناء الكتابة.',
      missingTitle: 'ما الذي ما زال مطلوبًا قبل التقديم',
      readyTitle: 'جاهز للتقديم',
      readyText: 'كل الإجابات الأساسية موجودة. يمكنك الآن تجهيز الطلب وإرساله.',
      ideaPromptTitle: 'ما الذي يجعل التقديم أقوى',
      ideaPrompts: [
        {
          title: 'ابدأ بمشكلة حقيقية',
          body: 'اذكر من يواجه هذه المشكلة ولماذا هي مهمة في الحياة اليومية أو المدرسة أو المجتمع.',
        },
        {
          title: 'اشرح البناء بوضوح',
          body: 'وضّح ما الذي سيبنيه الطالب فعلًا، وليس فقط الحلم وراء الفكرة.',
        },
        {
          title: 'اجعل العرض شخصيًا',
          body: 'تسجيل قصير وصادق بصوتك أو فيديوك أفضل من نص طويل يبدو رسميًا أكثر من اللازم.',
        },
      ],
      submit: 'جهّز طلبي',
      reset: 'مسح النموذج',
      resultEyebrow: 'ملخص التقديم',
      resultTitle: 'رسالة جاهزة للقناة الرسمية',
      resultText:
        'هذا القسم يحول النموذج إلى ملخص واضح يمكن للمتقدم نسخه عندما يحين وقت التقديم الرسمي.',
      resultNextTitle: 'ماذا بعد؟',
      resultNextSteps: [
        'اقرأ الملخص مرة واحدة وعدّل أي نقطة ما زالت غير واضحة.',
        'انسخه عندما تصبح جاهزًا لإرساله عبر القناة الرسمية للحدث.',
        'تأكد أن رابط الصوت أو الفيديو يعمل بشكل صحيح للحكام.',
      ],
      resultEmpty: 'لا يوجد ملخص بعد. املأ النموذج وجهّزه هنا.',
      copy: 'نسخ الملخص',
      snapshotTitle: 'ملخص سريع للمشروع',
      snapshotEmpty: 'لم يُكتب بعد',
      statusReady: 'مسودة قوية',
      statusInProgress: 'قيد التجهيز',
      readinessTitle: 'قائمة الجاهزية',
      readinessItems: [
        'بيانات الطالب ومسار التقديم واضحان',
        'تم تحديد الفريق والمجال ومرحلة المشروع',
        'المشكلة والفكرة مشروحتان بوضوح',
        'تم إرفاق رابط العرض ووسيلة تواصل مناسبة',
      ],
      summaryTitle: 'تقديم هاكاثون غزة للتكنولوجيا للشباب',
      missingSchool: 'غير مذكور',
      missingTeamType: 'غير محدد',
      missingApplicationOwner: 'غير محدد',
      summaryLabels: {
        fullName: 'الاسم الكامل',
        age: 'العمر',
        applicationOwner: 'مسار التقديم',
        city: 'المدينة',
        school: 'المدرسة أو النادي',
        teamType: 'شكل الفريق',
        teamMembers: 'تفاصيل الفريق',
        teamMemberContact: 'رقم التواصل',
        adultRole: 'صلة الشخص البالغ',
        adultName: 'اسم الشخص البالغ',
        mentorName: 'اسم المرشد',
        mentorContact: 'بيانات تواصل المرشد',
        projectName: 'اسم المشروع',
        projectStage: 'مرحلة المشروع',
        category: 'المجال',
        problem: 'المشكلة التي يحاول حلها',
        description: 'فكرة المشروع',
        recordingLink: 'رابط الصوت أو الفيديو',
        projectLink: 'رابط إضافي للمشروع',
        contact: 'أفضل وسيلة تواصل للمتابعة',
      },
      snapshotLabels: {
        projectName: 'المشروع',
        applicationOwner: 'تم التقديم بواسطة',
        teamType: 'التنسيق',
        category: 'المجال',
        projectStage: 'المرحلة',
        status: 'الحالة',
      },
      feedback: {
        completeRequired: 'أكمل الحقول الأساسية المطلوبة قبل إرسال الطلب.',
        invalidAge: 'هذا الهاكاثون مخصص حاليًا للمشاركين تحت 18 سنة.',
        prepared:
          'تم تجهيز الطلب وحفظه في لوحة المتابعة لمراجعته من قبل فريق التنظيم.',
        cleared: 'تم مسح النموذج.',
      },
    },
    dashboard: {
      eyebrow: 'لوحة المنظمين',
      title: 'راجع الطلبات، حرّكها بين المراحل، وابقِ القصة الكاملة واضحة أمامك.',
      text:
        'هذه اللوحة الحية تقرأ الطلبات وملاحظات المنظمين والمشرفين ووسائط Around the room من باك إند Express المرتبط مع Mongo Atlas.',
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
      emptyText: 'بمجرد إرسال طلب من النموذج سيظهر هنا من الخادم لكل فريق التنظيم.',
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
      rights: 'جميع الحقوق محفوظة لـ TFP و CSP لعام 2026',
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

applyPageImages(content)

function withMediaDeveloperMeta(item, objectPath) {
  const isVideo = item.type === 'video'

  return {
    ...item,
    developerImagePath: item.imageConfigPath || `src/App.jsx -> ${objectPath}`,
    developerVideoPath: isVideo ? `src/App.jsx -> ${objectPath}` : '',
    developerImageChecklist: isVideo
      ? [
          'This card thumbnail now lives in `src/config/siteImages.js`.',
          'Set `image` and `imageAlt` there if you want a real video thumbnail.',
        ]
      : [
          'Set `image` in `src/config/siteImages.js` to the asset you want to show.',
          'Set `imageAlt` there so the card has real alt text.',
          'Optional: set `imageFit: "contain"` there if the artwork should not crop.',
        ],
    developerVideoChecklist: isVideo
      ? [
          'Set `videoUrl` for MP4/WebM/OGG or `embedUrl` for YouTube/Vimeo.',
          'Optional: set `videoPoster` if you want a custom preview frame in the modal.',
        ]
      : [],
  }
}

function attachMediaDeveloperMeta(languageKey, pageContent) {
  const contentPath = `content.${languageKey}`

  pageContent.hero.mediaCards = pageContent.hero.mediaCards.map((item, index) =>
    withMediaDeveloperMeta(item, `${contentPath}.hero.mediaCards[${index}]`),
  )
  pageContent.mediaGallery.featured = withMediaDeveloperMeta(
    pageContent.mediaGallery.featured,
    `${contentPath}.mediaGallery.featured`,
  )
  pageContent.mediaGallery.cards = pageContent.mediaGallery.cards.map((item, index) =>
    withMediaDeveloperMeta(item, `${contentPath}.mediaGallery.cards[${index}]`),
  )
  pageContent.mediaMoments.cards = pageContent.mediaMoments.cards.map((item, index) =>
    withMediaDeveloperMeta(item, `${contentPath}.mediaMoments.cards[${index}]`),
  )
  pageContent.contactMedia.cards = pageContent.contactMedia.cards.map((item, index) =>
    withMediaDeveloperMeta(item, `${contentPath}.contactMedia.cards[${index}]`),
  )
}

attachMediaDeveloperMeta('en', content.en)
attachMediaDeveloperMeta('ar', content.ar)

function App() {
  const [route, setCurrentRoute] = useState(() => parseHash())
  const [menuOpen, setMenuOpen] = useState(false)
  const [language] = useState(() => getPreferredLanguage())
  const [activeVideoItem, setActiveVideoItem] = useState(null)

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
    setActiveVideoItem(null)
  }, [route.page, route.section])

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
          <HomePage
            content={pageContent}
            language={language}
            onNavigate={handleNavigate}
            onOpenVideo={setActiveVideoItem}
          />
        ) : route.page === 'dashboard' ? (
          <DashboardPage content={pageContent} language={language} onNavigate={handleNavigate} />
        ) : (
          <ContactPage
            content={pageContent}
            language={language}
            onNavigate={handleNavigate}
            onOpenVideo={setActiveVideoItem}
          />
        )}
      </main>

      <SiteFooter content={pageContent} onNavigate={handleNavigate} />

      <VideoPreviewModal
        item={activeVideoItem}
        content={pageContent.mediaModal}
        onClose={() => setActiveVideoItem(null)}
      />
    </div>
  )
}

export default App
