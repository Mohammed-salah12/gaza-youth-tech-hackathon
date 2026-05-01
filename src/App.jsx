import { useEffect, useMemo, useState } from 'react'
import codeSproutsLogo from '../assets/code-sprouts-palestine-logo.jpeg'
import techFromPalestineLogo from '../assets/tech-from-palestine-logo-highres.jpg'
import hackathonLogo from '../assets/hackathon-logos/hackathon-logo-master.png'

const routeStorageKey = 'gaza-youth-tech-hackathon-application'
const submissionsStorageKey = 'gaza-youth-tech-hackathon-submissions'
const languageStorageKey = 'gaza-youth-tech-hackathon-language'
const defaultCategory = ''
const defaultStage = ''
const defaultReviewStage = 'submitted'
const techFromPalestineUrl = 'https://techfrompalestine.org/'
const contactEmail = 'contact@techfrompalestine.org'
const contactPhone = '00972597262318'

const initialFormState = {
  submissionId: '',
  fullName: '',
  age: '',
  applicationOwner: '',
  city: '',
  school: '',
  teamType: 'solo',
  teamMemberTwoName: '',
  teamMemberTwoAge: '',
  teamMemberTwoCity: '',
  teamMemberTwoContact: '',
  teamMemberThreeName: '',
  teamMemberThreeAge: '',
  teamMemberThreeCity: '',
  teamMemberThreeContact: '',
  adultRole: '',
  adultName: '',
  mentorEnabled: 'no',
  mentorName: '',
  mentorContact: '',
  projectName: '',
  category: defaultCategory,
  projectStage: defaultStage,
  problem: '',
  description: '',
  recordingLink: '',
  projectLink: '',
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
      mediaCards: [
        {
          badge: 'Contest visual',
          type: 'photo',
          title: 'Summer 2026 launch',
          note: 'A youth contest for apps, robotics, Arduino builds, and local problem solving.',
          image: hackathonLogo,
          imageAlt: 'Gaza Youth Tech Hackathon launch visual',
        },
        {
          badge: 'Demo stage',
          type: 'video',
          title: 'Student pitch clips',
          note: 'Short videos from participating teams will bring each idea to life during the contest.',
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
      featured: {
        badge: 'Opening photo',
        type: 'photo',
        title: 'Teams in the build zone',
        note: 'The build zone fills with focus, teamwork, laptops, sketches, wires, and the first signs of working ideas.',
        size: 'hero',
        tone: 'mist',
      },
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
        },
      ],
    },
    mediaMoments: {
      eyebrow: 'Around the room',
      title: 'Random moments, reactions, and quick clips from the day',
      body:
        'Not every strong memory follows the project timeline. This section captures the atmosphere around it: crowd energy, mentor conversations, surprise reactions, and short videos that make the event feel alive.',
      notes: ['Crowd shots', 'Mentor clips', 'Reaction moments', 'Celebration'],
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
        },
        {
          badge: 'Venue photo',
          type: 'photo',
          title: 'The room in full motion',
          note: 'A wider scene shows laptops open, tables busy, people moving, and the contest atmosphere building in every corner.',
          size: 'square',
          tone: 'mist',
        },
        {
          badge: 'Mentor moment',
          type: 'photo',
          title: 'Advice in the middle of the build',
          note: 'Some of the best images come from a mentor leaning in, pointing at a detail, and helping a team see the next step clearly.',
          size: 'landscape',
          tone: 'mint',
        },
        {
          badge: 'Backstage clip',
          type: 'video',
          title: 'Fast videos between demos',
          note: 'Quick footage between formal presentations can show real personality, movement, and the natural rhythm of the event.',
          size: 'square',
          tone: 'night',
        },
        {
          badge: 'Celebration photo',
          type: 'photo',
          title: 'The moment a team knows it works',
          note: 'Smiles, raised hands, and shared excitement turn into the kind of photo people remember long after the day ends.',
          size: 'banner',
          tone: 'sun',
        },
      ],
    },
    mediaModal: {
      eyebrow: 'Video spotlight',
      openLabel: 'Open video preview',
      closeLabel: 'Close preview',
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
          logo: techFromPalestineLogo,
          href: techFromPalestineUrl,
          body:
            'Tech From Palestine is a nonprofit founded in Gaza to expand access to quality technology education and global opportunity for Palestinian youth and engineers. Through hands-on training in programming, robotics, electronics, and embedded systems, and through community programs such as Tech Explorers and Tech Teens, it has supported more than 1,000 engineers, connected 100+ professionals with international opportunities, and introduced 500+ children and youth to the world of technology in safe, practical learning spaces.',
        },
        {
          name: 'Code Sprouts Palestine',
          logo: codeSproutsLogo,
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
      mediaCards: [
        {
          badge: 'صورة الحدث',
          type: 'photo',
          title: 'إطلاق صيف 2026',
          note: 'مسابقة شبابية للتطبيقات والروبوت والأردوينو والأفكار التقنية التي تخدم المجتمع.',
          image: hackathonLogo,
          imageAlt: 'الصورة البصرية لهاكاثون غزة للتكنولوجيا للشباب',
        },
        {
          badge: 'منصة العرض',
          type: 'video',
          title: 'مقاطع عرض الطلاب',
          note: 'فيديوهات الفرق المشاركة ستمنح كل فكرة حضورها الحقيقي خلال المسابقة.',
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
      featured: {
        badge: 'الصورة الافتتاحية',
        type: 'photo',
        title: 'الفرق داخل مساحة البناء',
        note: 'تمتلئ مساحة البناء بالتركيز والعمل الجماعي واللابتوبات والرسومات والأسلاك وبدايات الأفكار التي تتحول إلى شيء حقيقي.',
        size: 'hero',
        tone: 'mist',
      },
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
        },
      ],
    },
    mediaMoments: {
      eyebrow: 'من أجواء المكان',
      title: 'لقطات عفوية وردود فعل ومقاطع سريعة من يوم الهاكاثون',
      body:
        'ليست كل الذكريات مرتبطة بخطوات المشروع فقط. هذا القسم يوثق الأجواء المحيطة بها: طاقة القاعة، أحاديث المرشدين، ردود الفعل المفاجئة، والمقاطع القصيرة التي تجعل الحدث حيًا في الذاكرة.',
      notes: ['لقطات الجمهور', 'مقاطع المرشدين', 'لحظات التفاعل', 'فرحة الإنجاز'],
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
        },
        {
          badge: 'صورة المكان',
          type: 'photo',
          title: 'القاعة وهي تتحرك بالحياة',
          note: 'المشهد الواسع يُظهر اللابتوبات المفتوحة والطاولات المزدحمة والحركة التي تصنع أجواء المسابقة في كل زاوية.',
          size: 'square',
          tone: 'mist',
        },
        {
          badge: 'لحظة إرشاد',
          type: 'photo',
          title: 'نصيحة في منتصف البناء',
          note: 'من أجمل الصور تلك التي يظهر فيها المرشد وهو يقترب من الفريق ويوجه النظر إلى تفصيلة تصنع الفارق.',
          size: 'landscape',
          tone: 'mint',
        },
        {
          badge: 'مقطع خلف الكواليس',
          type: 'video',
          title: 'فيديوهات سريعة بين العروض',
          note: 'المشاهد القصيرة بين الفقرات الرسمية تكشف الشخصية الحقيقية للطلاب وحركة اليوم كما هي.',
          size: 'square',
          tone: 'night',
        },
        {
          badge: 'صورة احتفال',
          type: 'photo',
          title: 'لحظة يعرف فيها الفريق أن المشروع نجح',
          note: 'الابتسامات والأيدي المرفوعة والفرح المشترك تصنع صورًا تبقى في الذاكرة بعد انتهاء اليوم.',
          size: 'banner',
          tone: 'sun',
        },
      ],
    },
    mediaModal: {
      eyebrow: 'واجهة الفيديو',
      openLabel: 'افتح معاينة الفيديو',
      closeLabel: 'إغلاق المعاينة',
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
          logo: techFromPalestineLogo,
          href: techFromPalestineUrl,
          body:
            'Tech From Palestine هي مؤسسة غير ربحية انطلقت من غزة لتوسيع الوصول إلى تعليم تكنولوجي عالي الجودة وفتح فرص عالمية أمام الشباب والمهندسين الفلسطينيين. ومن خلال التدريب العملي في البرمجة والروبوتات والإلكترونيات والأنظمة المدمجة، وبرامج مجتمعية مثل Tech Explorers وTech Teens، دعمت المؤسسة أكثر من 1000 مهندس، وربطت أكثر من 100 محترف بفرص دولية، وقدّمت لأكثر من 500 طفل ويافع مدخلًا عمليًا وآمنًا إلى عالم التكنولوجيا.',
        },
        {
          name: 'Code Sprouts Palestine',
          logo: codeSproutsLogo,
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

function getAgeDetails(ageValue) {
  const numericAge = Number(ageValue)
  const hasAge = Number.isFinite(numericAge) && numericAge > 0
  const isEligible = hasAge && numericAge < 18
  const isUnder13 = hasAge && numericAge < 13
  const canSelfApply = hasAge && numericAge >= 13 && numericAge < 18

  return {
    numericAge,
    hasAge,
    isEligible,
    isUnder13,
    canSelfApply,
  }
}

function getApplicationOwnerLabel(ownerId, formContent) {
  const ownersById = Object.fromEntries(
    (formContent.applicationPaths || []).map((item) => [item.id, item.label]),
  )

  return ownersById[ownerId] || formContent.missingApplicationOwner
}

function getAdditionalTeamMembers(formState, formContent) {
  const members = []

  if (formState.teamType === 'duo' || formState.teamType === 'trio') {
    members.push({
      id: 'teamMemberTwo',
      title: formContent.teamMemberCards.secondTitle,
      nameKey: 'teamMemberTwoName',
      ageKey: 'teamMemberTwoAge',
      cityKey: 'teamMemberTwoCity',
      contactKey: 'teamMemberTwoContact',
    })
  }

  if (formState.teamType === 'trio') {
    members.push({
      id: 'teamMemberThree',
      title: formContent.teamMemberCards.thirdTitle,
      nameKey: 'teamMemberThreeName',
      ageKey: 'teamMemberThreeAge',
      cityKey: 'teamMemberThreeCity',
      contactKey: 'teamMemberThreeContact',
    })
  }

  return members
}

function buildSubmissionSummary(formState, formContent, categoriesById, stagesById) {
  const teamModesById = Object.fromEntries(
    (formContent.teamModes || []).map((item) => [item.id, item.label]),
  )
  const ageDetails = getAgeDetails(formState.age)
  const applicationOwner = ageDetails.isUnder13 ? 'adult' : formState.applicationOwner
  const applicationOwnerLabel = getApplicationOwnerLabel(applicationOwner, formContent)
  const additionalTeamMembers = getAdditionalTeamMembers(formState, formContent)

  const lines = [
    formContent.summaryTitle,
    '',
    `${formContent.summaryLabels.fullName}: ${formState.fullName}`,
    `${formContent.summaryLabels.age}: ${formState.age}`,
    `${formContent.summaryLabels.city}: ${formState.city}`,
    `${formContent.summaryLabels.school}: ${formState.school || formContent.missingSchool}`,
    `${formContent.summaryLabels.applicationOwner}: ${applicationOwnerLabel}`,
    `${formContent.summaryLabels.teamType}: ${
      teamModesById[formState.teamType] || formState.teamType || formContent.missingTeamType
    }`,
  ]

  additionalTeamMembers.forEach((member) => {
    lines.push(
      '',
      `${member.title}:`,
      `${formContent.summaryLabels.fullName}: ${formState[member.nameKey]}`,
      `${formContent.summaryLabels.age}: ${formState[member.ageKey]}`,
      `${formContent.summaryLabels.city}: ${formState[member.cityKey]}`,
      `${formContent.summaryLabels.teamMemberContact}: ${formState[member.contactKey]}`,
    )
  })

  if (!additionalTeamMembers.length && isFilled(formState.teamMembers)) {
    lines.push(`${formContent.summaryLabels.teamMembers}: ${formState.teamMembers}`)
  }

  if (applicationOwner === 'adult') {
    if (isFilled(formState.adultRole)) {
      lines.push(`${formContent.summaryLabels.adultRole}: ${formState.adultRole}`)
    }

    if (isFilled(formState.adultName)) {
      lines.push(`${formContent.summaryLabels.adultName}: ${formState.adultName}`)
    }
  }

  if (isFilled(formState.mentorName)) {
    lines.push(`${formContent.summaryLabels.mentorName}: ${formState.mentorName}`)
  }

  if (isFilled(formState.mentorContact)) {
    lines.push(`${formContent.summaryLabels.mentorContact}: ${formState.mentorContact}`)
  }

  lines.push(
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
  )

  if (isFilled(formState.projectLink)) {
    lines.push(`${formContent.summaryLabels.projectLink}: ${formState.projectLink}`)
  }

  lines.push(`${formContent.summaryLabels.contact}: ${formState.contact}`)

  return lines.join('\n')
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

function getVideoPreviewSource(item) {
  if (!item || item.type !== 'video') {
    return { kind: 'placeholder' }
  }

  if (item.embedUrl) {
    return { kind: 'embed', src: item.embedUrl }
  }

  if (!item.videoUrl) {
    return { kind: 'placeholder' }
  }

  try {
    const parsedUrl = new URL(item.videoUrl)
    const hostname = parsedUrl.hostname.replace(/^www\./, '')

    if (hostname === 'youtu.be') {
      const videoId = parsedUrl.pathname.replace('/', '')

      if (videoId) {
        return { kind: 'embed', src: `https://www.youtube-nocookie.com/embed/${videoId}` }
      }
    }

    if (hostname.includes('youtube.com')) {
      const videoId = parsedUrl.searchParams.get('v')

      if (videoId) {
        return { kind: 'embed', src: `https://www.youtube-nocookie.com/embed/${videoId}` }
      }
    }

    if (hostname === 'vimeo.com') {
      const videoId = parsedUrl.pathname.split('/').filter(Boolean)[0]

      if (videoId) {
        return { kind: 'embed', src: `https://player.vimeo.com/video/${videoId}` }
      }
    }

    if (/\.(mp4|webm|ogg)$/i.test(parsedUrl.pathname)) {
      return { kind: 'file', src: item.videoUrl }
    }

    return { kind: 'external', src: item.videoUrl }
  } catch {
    if (/\.(mp4|webm|ogg)$/i.test(item.videoUrl)) {
      return { kind: 'file', src: item.videoUrl }
    }

    return { kind: 'external', src: item.videoUrl }
  }
}

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
            onNavigate={handleNavigate}
            onOpenVideo={setActiveVideoItem}
          />
        ) : route.page === 'dashboard' ? (
          <DashboardPage content={pageContent} language={language} onNavigate={handleNavigate} />
        ) : (
          <ContactPage
            content={pageContent}
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

function PartnerLogoBadge({ logo, alt, name, href, variant, className = '' }) {
  const classes = ['partner-logo-badge', `partner-logo-badge--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  const image = <img className="partner-logo-badge__image" src={logo} alt={alt} />

  if (href) {
    return (
      <a className={classes} href={href} aria-label={`Visit ${name}`}>
        {image}
      </a>
    )
  }

  return <div className={classes}>{image}</div>
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
              <PartnerLogoBadge
                logo={codeSproutsLogo}
                alt="Code Sprouts Palestine logo"
                name="Code Sprouts Palestine"
                variant="nav"
              />
              <PartnerLogoBadge
                logo={techFromPalestineLogo}
                alt="Tech From Palestine logo"
                name="Tech From Palestine"
                href={techFromPalestineUrl}
                variant="nav"
              />
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

function HomePage({ content, onNavigate, onOpenVideo }) {
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

            <div className="hero-media-strip" aria-label={content.mediaGallery.title}>
              {content.hero.mediaCards.map((item) => (
                <MediaSlotCard
                  key={item.title}
                  item={item}
                  compact
                  onOpenVideo={onOpenVideo}
                  videoActionLabel={content.mediaModal.openLabel}
                />
              ))}
            </div>

            <div className="logo-float logo-float--left">
              <PartnerLogoBadge
                logo={codeSproutsLogo}
                alt="Code Sprouts Palestine logo"
                name="Code Sprouts Palestine"
                variant="float"
              />
            </div>
            <div className="logo-float logo-float--right">
              <PartnerLogoBadge
                logo={techFromPalestineLogo}
                alt="Tech From Palestine logo"
                name="Tech From Palestine"
                href={techFromPalestineUrl}
                variant="float"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--visual" id="gallery">
        <div className="container visual-story-layout visual-story-layout--gallery">
          <div className="visual-story-copy">
            <SectionTitle
              eyebrow={content.mediaGallery.eyebrow}
              title={content.mediaGallery.title}
              body={content.mediaGallery.body}
            />

            <div className="visual-chip-row">
              {content.mediaGallery.notes.map((item) => (
                <span key={item} className="visual-chip">
                  {item}
                </span>
              ))}
            </div>

            <article className="gallery-support-card">
              <span className="gallery-support-card__badge">{content.mediaGallery.support.badge}</span>
              <h3>{content.mediaGallery.support.title}</h3>
              <p>{content.mediaGallery.support.body}</p>

              <div className="gallery-support-list">
                {content.mediaGallery.support.steps.map((item) => (
                  <div key={item} className="gallery-support-step">
                    <span className="gallery-support-step__dot" aria-hidden="true" />
                    <strong>{item}</strong>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="visual-storyboard visual-storyboard--gallery">
            <MediaSlotCard
              item={content.mediaGallery.featured}
              variant="gallery"
              onOpenVideo={onOpenVideo}
              videoActionLabel={content.mediaModal.openLabel}
            />
            {content.mediaGallery.cards.map((item) => (
              <MediaSlotCard
                key={item.title}
                item={item}
                variant="gallery"
                onOpenVideo={onOpenVideo}
                videoActionLabel={content.mediaModal.openLabel}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--media-burst" id="moments">
        <div className="container">
          <div className="moments-head">
            <SectionTitle
              eyebrow={content.mediaMoments.eyebrow}
              title={content.mediaMoments.title}
              body={content.mediaMoments.body}
              inverted
            />

            <div className="visual-chip-row visual-chip-row--inverted">
              {content.mediaMoments.notes.map((item) => (
                <span key={item} className="visual-chip visual-chip--inverted">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="visual-storyboard visual-storyboard--moments">
            {content.mediaMoments.cards.map((item) => (
              <MediaSlotCard
                key={item.title}
                item={item}
                variant="moments"
                onOpenVideo={onOpenVideo}
                videoActionLabel={content.mediaModal.openLabel}
              />
            ))}
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
                <PartnerLogoBadge
                  logo={partner.logo}
                  alt={`${partner.name} logo`}
                  name={partner.name}
                  href={partner.href}
                  variant="partner"
                />
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

function ContactPage({ content, onNavigate, onOpenVideo }) {
  return (
    <>
      <section className="contact-hero">
        <div className="container contact-hero-grid">
          <div className="contact-hero-copy">
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

      <section className="section section--soft">
        <div className="container visual-story-layout visual-story-layout--contact">
          <div className="visual-story-copy">
            <SectionTitle
              eyebrow={content.contactMedia.eyebrow}
              title={content.contactMedia.title}
              body={content.contactMedia.body}
            />

            <div className="visual-chip-row">
              {content.contactMedia.notes.map((item) => (
                <span key={item} className="visual-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="media-workbench-grid">
            {content.contactMedia.cards.map((item) => (
              <MediaSlotCard
                key={item.title}
                item={item}
                onOpenVideo={onOpenVideo}
                videoActionLabel={content.mediaModal.openLabel}
              />
            ))}
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
  const teamModesById = useMemo(
    () => Object.fromEntries(content.form.teamModes.map((item) => [item.id, item.label])),
    [content.form.teamModes],
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
        submission.teamMembers,
        submission.teamMemberTwoName,
        submission.teamMemberTwoAge,
        submission.teamMemberTwoCity,
        submission.teamMemberTwoContact,
        submission.teamMemberThreeName,
        submission.teamMemberThreeAge,
        submission.teamMemberThreeCity,
        submission.teamMemberThreeContact,
        submission.adultRole,
        submission.adultName,
        submission.mentorName,
        submission.mentorContact,
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
  const selectedAdditionalTeamMembers = selectedSubmission
    ? getAdditionalTeamMembers(selectedSubmission, content.form)
    : []

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
                        <span>{content.form.summaryLabels.applicationOwner}</span>
                        <strong>
                          {getApplicationOwnerLabel(
                            getAgeDetails(selectedSubmission.age).isUnder13
                              ? 'adult'
                              : selectedSubmission.applicationOwner,
                            content.form,
                          )}
                        </strong>
                      </div>
                      <div className="dashboard-meta-item">
                        <span>{content.form.summaryLabels.contact}</span>
                        <strong>{selectedSubmission.contact}</strong>
                      </div>
                      <div className="dashboard-meta-item">
                        <span>{content.form.summaryLabels.teamType}</span>
                        <strong>
                          {teamModesById[selectedSubmission.teamType] ||
                            selectedSubmission.teamType ||
                            content.form.missingTeamType}
                        </strong>
                      </div>
                      <div className="dashboard-meta-item">
                        <span>{content.form.summaryLabels.school}</span>
                        <strong>
                          {selectedSubmission.school || content.form.missingSchool}
                        </strong>
                      </div>
                    </div>
                    {selectedAdditionalTeamMembers.length ? (
                      <div className="team-member-stack team-member-stack--compact">
                        {selectedAdditionalTeamMembers.map((member) => (
                          <article key={member.id} className="team-member-card">
                            <div className="team-member-card__head">
                              <strong>{member.title}</strong>
                            </div>
                            <div className="response-inline-grid">
                              <div className="dashboard-meta-item">
                                <span>{content.form.summaryLabels.fullName}</span>
                                <strong>{selectedSubmission[member.nameKey] || '—'}</strong>
                              </div>
                              <div className="dashboard-meta-item">
                                <span>{content.form.summaryLabels.age}</span>
                                <strong>{selectedSubmission[member.ageKey] || '—'}</strong>
                              </div>
                              <div className="dashboard-meta-item">
                                <span>{content.form.summaryLabels.city}</span>
                                <strong>{selectedSubmission[member.cityKey] || '—'}</strong>
                              </div>
                              <div className="dashboard-meta-item">
                                <span>{content.form.summaryLabels.teamMemberContact}</span>
                                <strong>{selectedSubmission[member.contactKey] || '—'}</strong>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    ) : selectedSubmission.teamMembers ? (
                      <div className="response-block">
                        <h3>{content.form.summaryLabels.teamMembers}</h3>
                        <p>{selectedSubmission.teamMembers}</p>
                      </div>
                    ) : null}
                    {selectedSubmission.adultName || selectedSubmission.adultRole ? (
                      <div className="response-inline-grid">
                        <div className="dashboard-meta-item">
                          <span>{content.form.summaryLabels.adultRole}</span>
                          <strong>{selectedSubmission.adultRole || '—'}</strong>
                        </div>
                        <div className="dashboard-meta-item">
                          <span>{content.form.summaryLabels.adultName}</span>
                          <strong>{selectedSubmission.adultName || '—'}</strong>
                        </div>
                      </div>
                    ) : null}
                    {selectedSubmission.mentorName || selectedSubmission.mentorContact ? (
                      <div className="response-inline-grid">
                        <div className="dashboard-meta-item">
                          <span>{content.form.summaryLabels.mentorName}</span>
                          <strong>{selectedSubmission.mentorName || '—'}</strong>
                        </div>
                        <div className="dashboard-meta-item">
                          <span>{content.form.summaryLabels.mentorContact}</span>
                          <strong>{selectedSubmission.mentorContact || '—'}</strong>
                        </div>
                      </div>
                    ) : null}
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
  const [showValidation, setShowValidation] = useState(false)
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  useEffect(() => {
    window.localStorage.setItem(routeStorageKey, JSON.stringify(formState))
  }, [formState])

  const categoriesById = Object.fromEntries(
    content.form.categories.map((item) => [item.id, item.label]),
  )
  const stagesById = Object.fromEntries(
    content.form.stages.map((item) => [item.id, item.label]),
  )
  const ageDetails = getAgeDetails(formState.age)
  const effectiveApplicationOwner = ageDetails.isUnder13 ? 'adult' : formState.applicationOwner
  const needsAdultSupport = effectiveApplicationOwner === 'adult'
  const additionalTeamMembers = getAdditionalTeamMembers(formState, content.form)
  const hasMentor = formState.mentorEnabled === 'yes'
  const applicationPathMessage = !ageDetails.hasAge
    ? content.form.applicationCard.empty
    : ageDetails.isUnder13
      ? content.form.applicationCard.under13
      : ageDetails.canSelfApply
        ? content.form.applicationCard.teen
        : content.form.feedback.invalidAge
  const contactHelperText = needsAdultSupport
    ? content.form.helpers.contactAdult
    : content.form.helpers.contactSelf

  const requiredFieldDefinitions = useMemo(
    () => {
      const fields = [
        { key: 'fullName', label: content.form.fields.fullName, value: formState.fullName },
        { key: 'age', label: content.form.fields.age, value: formState.age },
        {
          key: 'applicationOwner',
          label: content.form.fields.applicationOwner,
          value: effectiveApplicationOwner,
        },
        { key: 'city', label: content.form.fields.city, value: formState.city },
        { key: 'category', label: content.form.fields.category, value: formState.category },
        {
          key: 'projectStage',
          label: content.form.fields.projectStage,
          value: formState.projectStage,
        },
        { key: 'projectName', label: content.form.fields.projectName, value: formState.projectName },
        { key: 'problem', label: content.form.fields.problem, value: formState.problem },
        { key: 'description', label: content.form.fields.description, value: formState.description },
        {
          key: 'recordingLink',
          label: content.form.fields.recordingLink,
          value: formState.recordingLink,
        },
        { key: 'contact', label: content.form.fields.contact, value: formState.contact },
      ]

      if (needsAdultSupport) {
        fields.splice(3, 0, {
          key: 'adultRole',
          label: content.form.fields.adultRole,
          value: formState.adultRole,
        })
        fields.splice(4, 0, {
          key: 'adultName',
          label: content.form.fields.adultName,
          value: formState.adultName,
        })
      }

      additionalTeamMembers.forEach((member, index) => {
        const insertAt = 5 + index * 4
        fields.splice(
          insertAt,
          0,
          {
            key: member.nameKey,
            label: `${member.title} - ${content.form.fields.fullName}`,
            value: formState[member.nameKey],
          },
          {
            key: member.ageKey,
            label: `${member.title} - ${content.form.fields.age}`,
            value: formState[member.ageKey],
          },
          {
            key: member.cityKey,
            label: `${member.title} - ${content.form.fields.city}`,
            value: formState[member.cityKey],
          },
          {
            key: member.contactKey,
            label: `${member.title} - ${content.form.fields.teamMemberContact}`,
            value: formState[member.contactKey],
          },
        )
      })

      if (hasMentor) {
        fields.splice(6, 0, {
          key: 'mentorName',
          label: content.form.fields.mentorName,
          value: formState.mentorName,
        })
      }

      return fields
    },
    [
      content.form.fields,
      effectiveApplicationOwner,
      formState.age,
      formState.adultName,
      formState.adultRole,
      formState.category,
      formState.city,
      formState.contact,
      formState.description,
      formState.fullName,
      formState.mentorName,
      formState.problem,
      formState.projectName,
      formState.projectStage,
      formState.recordingLink,
      formState.teamMemberTwoName,
      formState.teamMemberTwoAge,
      formState.teamMemberTwoCity,
      formState.teamMemberTwoContact,
      formState.teamMemberThreeName,
      formState.teamMemberThreeAge,
      formState.teamMemberThreeCity,
      formState.teamMemberThreeContact,
      additionalTeamMembers,
      hasMentor,
      needsAdultSupport,
    ],
  )
  const missingRequiredFields = requiredFieldDefinitions.filter(
    ({ value }) => !isFilled(value),
  )
  const filledCount = requiredFieldDefinitions.length - missingRequiredFields.length
  const progress = Math.round((filledCount / requiredFieldDefinitions.length) * 100)
  const readyForSummary = missingRequiredFields.length === 0

  const basicsStepFields = [
    { key: 'fullName', label: content.form.fields.fullName, value: formState.fullName },
    { key: 'age', label: content.form.fields.age, value: formState.age },
    {
      key: 'applicationOwner',
      label: content.form.fields.applicationOwner,
      value: effectiveApplicationOwner,
    },
    { key: 'city', label: content.form.fields.city, value: formState.city },
    ...(needsAdultSupport
      ? [
          {
            key: 'adultRole',
            label: content.form.fields.adultRole,
            value: formState.adultRole,
          },
          {
            key: 'adultName',
            label: content.form.fields.adultName,
            value: formState.adultName,
          },
        ]
      : []),
    { key: 'teamType', label: content.form.fields.teamType, value: formState.teamType },
    ...additionalTeamMembers.flatMap((member) => [
      {
        key: member.nameKey,
        label: `${member.title} - ${content.form.fields.fullName}`,
        value: formState[member.nameKey],
      },
      {
        key: member.ageKey,
        label: `${member.title} - ${content.form.fields.age}`,
        value: formState[member.ageKey],
      },
      {
        key: member.cityKey,
        label: `${member.title} - ${content.form.fields.city}`,
        value: formState[member.cityKey],
      },
      {
        key: member.contactKey,
        label: `${member.title} - ${content.form.fields.teamMemberContact}`,
        value: formState[member.contactKey],
      },
    ]),
    ...(hasMentor
      ? [
          {
            key: 'mentorName',
            label: content.form.fields.mentorName,
            value: formState.mentorName,
          },
        ]
      : []),
  ]

  const setupStepFields = [
    { key: 'category', label: content.form.fields.category, value: formState.category },
    {
      key: 'projectStage',
      label: content.form.fields.projectStage,
      value: formState.projectStage,
    },
  ]

  const storyStepFields = [
    { key: 'projectName', label: content.form.fields.projectName, value: formState.projectName },
    { key: 'problem', label: content.form.fields.problem, value: formState.problem },
    { key: 'description', label: content.form.fields.description, value: formState.description },
  ]

  const pitchStepFields = [
    {
      key: 'recordingLink',
      label: content.form.fields.recordingLink,
      value: formState.recordingLink,
    },
    { key: 'contact', label: content.form.fields.contact, value: formState.contact },
  ]

  const stepMissingFields = [
    basicsStepFields.filter(({ value }) => !isFilled(value)),
    setupStepFields.filter(({ value }) => !isFilled(value)),
    storyStepFields.filter(({ value }) => !isFilled(value)),
    pitchStepFields.filter(({ value }) => !isFilled(value)),
  ]

  const stepCompletion = [
    stepMissingFields[0].length === 0 && ageDetails.isEligible,
    stepMissingFields[1].length === 0,
    stepMissingFields[2].length === 0,
    stepMissingFields[3].length === 0,
  ]
  const firstIncompleteStepIndex = stepCompletion.findIndex((item) => !item)
  const stepDefinitions = [
    {
      key: 'basics',
      ...content.form.sections.basics,
      milestone: content.form.milestones[0],
    },
    {
      key: 'setup',
      ...content.form.sections.setup,
      milestone: content.form.milestones[1],
    },
    {
      key: 'story',
      ...content.form.sections.story,
      milestone: content.form.milestones[2],
    },
    {
      key: 'pitch',
      ...content.form.sections.pitch,
      milestone: content.form.milestones[3],
    },
  ]
  const currentStep = stepDefinitions[activeStepIndex]
  const currentStepMissingFields = stepMissingFields[activeStepIndex]
  const currentStepComplete = stepCompletion[activeStepIndex]
  const lastStepIndex = stepDefinitions.length - 1
  const isLastStep = activeStepIndex === lastStepIndex

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((current) => {
      const nextState = { ...current, [name]: value }

      if (name === 'age') {
        const nextAgeDetails = getAgeDetails(value)

        if (!nextAgeDetails.hasAge) {
          nextState.applicationOwner = ''
        } else if (nextAgeDetails.isUnder13) {
          nextState.applicationOwner = 'adult'
        } else if (!current.applicationOwner) {
          nextState.applicationOwner = 'self'
        }
      }

      return nextState
    })
  }

  const updateField = (name, value) => {
    setFormState((current) => {
      const nextState = { ...current, [name]: value }

      if (name === 'applicationOwner' && getAgeDetails(current.age).isUnder13) {
        nextState.applicationOwner = 'adult'
      }

      if (name === 'mentorEnabled' && value === 'no') {
        nextState.mentorName = ''
        nextState.mentorContact = ''
      }

      if (name === 'teamType' && value === 'solo') {
        nextState.teamMemberTwoName = ''
        nextState.teamMemberTwoAge = ''
        nextState.teamMemberTwoCity = ''
        nextState.teamMemberTwoContact = ''
        nextState.teamMemberThreeName = ''
        nextState.teamMemberThreeAge = ''
        nextState.teamMemberThreeCity = ''
        nextState.teamMemberThreeContact = ''
      }

      if (name === 'teamType' && value === 'duo') {
        nextState.teamMemberThreeName = ''
        nextState.teamMemberThreeAge = ''
        nextState.teamMemberThreeCity = ''
        nextState.teamMemberThreeContact = ''
      }

      return nextState
    })
  }

  const handleOpenStep = (index) => {
    const isUnlocked = index === 0 || stepCompletion.slice(0, index).every(Boolean)

    if (!isUnlocked) {
      return
    }

    setActiveStepIndex(index)
    setFeedback('')
  }

  const handleNextStep = () => {
    setShowValidation(true)

    if (activeStepIndex === 0 && ageDetails.hasAge && !ageDetails.isEligible) {
      setFeedback(content.form.feedback.invalidAge)
      return
    }

    if (!currentStepComplete) {
      setFeedback(content.form.feedback.completeRequired)
      return
    }

    setFeedback('')
    setShowValidation(false)
    setActiveStepIndex((current) => Math.min(current + 1, lastStepIndex))
  }

  const handlePreviousStep = () => {
    setFeedback('')
    setActiveStepIndex((current) => Math.max(current - 1, 0))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setShowValidation(true)

    if (firstIncompleteStepIndex !== -1) {
      setActiveStepIndex(firstIncompleteStepIndex)
    }

    if (missingRequiredFields.length > 0) {
      setFeedback(content.form.feedback.completeRequired)
      return
    }

    if (!ageDetails.isEligible) {
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
      applicationOwner: effectiveApplicationOwner,
    }
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
    setShowValidation(false)
    setFeedback(content.form.feedback.prepared)
  }

  const handleReset = () => {
    setFormState(initialFormState)
    setShowValidation(false)
    setActiveStepIndex(0)
    setFeedback(content.form.feedback.cleared)
    window.localStorage.removeItem(routeStorageKey)
  }

  return (
    <div className="form-shell form-shell--enhanced">
      <form className="application-form" onSubmit={handleSubmit} noValidate>
        <div className="form-header">
          <span className="card-eyebrow">{content.form.eyebrow}</span>
          <h2>{content.form.title}</h2>
          <p>{content.form.text}</p>

          <div className="application-guide">
            {content.form.infoPills.map((item) => (
              <span key={item} className="guide-pill">
                {item}
              </span>
            ))}
          </div>

          <div className="save-status">{content.form.saveNote}</div>
        </div>

        <div className="progress-card">
          <div className="progress-copy">
            <strong>{content.form.progressLabel}</strong>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar">
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="wizard-step-row">
            {stepDefinitions.map((step, index) => (
              <button
                key={step.key}
                type="button"
                className={`wizard-step-chip ${
                  activeStepIndex === index ? 'is-active' : stepCompletion[index] ? 'is-complete' : ''
                }`}
                onClick={() => handleOpenStep(index)}
                disabled={index !== 0 && !stepCompletion.slice(0, index).every(Boolean)}
              >
                <span className="wizard-step-chip__count">{step.step}</span>
                <strong>{step.milestone}</strong>
              </button>
            ))}
          </div>
          <div className="progress-focus">
            <span>{content.form.currentStepLabel}</span>
            <strong>{currentStep.title}</strong>
            <p>{currentStep.text}</p>
          </div>

          {readyForSummary ? (
            <div className="completion-banner">
              <strong>{content.form.readyTitle}</strong>
              <p>{content.form.readyText}</p>
            </div>
          ) : currentStepComplete ? (
            <div className="completion-banner">
              <strong>{currentStep.milestone}</strong>
              <p>{content.form.nextStepReady}</p>
            </div>
          ) : (
            <div className="missing-block">
              <strong>{content.form.missingTitle}</strong>
              <div className="missing-chip-row">
                {currentStepMissingFields.map((item) => (
                  <span key={item.key} className="missing-chip">
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {activeStepIndex === 0 ? (
        <FormSection
          step={content.form.sections.basics.step}
          title={content.form.sections.basics.title}
          text={content.form.sections.basics.text}
        >
          <div className="field-grid">
            <Field
              label={content.form.fields.fullName}
              name="fullName"
              value={formState.fullName}
              onChange={handleChange}
              placeholder={content.form.placeholders.fullName}
              required
              invalid={showValidation && !isFilled(formState.fullName)}
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
              invalid={showValidation && !isFilled(formState.age)}
            />
            <Field
              label={content.form.fields.city}
              name="city"
              value={formState.city}
              onChange={handleChange}
              placeholder={content.form.placeholders.city}
              required
              invalid={showValidation && !isFilled(formState.city)}
            />
            <Field
              label={content.form.fields.school}
              name="school"
              value={formState.school}
              onChange={handleChange}
              placeholder={content.form.placeholders.school}
              optionalText={content.form.optionalLabel}
            />
          </div>

          <article
            className={`age-path-card ${
              ageDetails.isUnder13 ? 'is-under13' : ageDetails.canSelfApply ? 'is-open' : ''
            }`}
          >
            <span className="card-eyebrow">{content.form.applicationCard.eyebrow}</span>
            <strong>{content.form.applicationCard.title}</strong>
            <p>{applicationPathMessage}</p>
            <div className="age-path-card__chips">
              <span className="age-path-chip">{content.form.applicationCard.team}</span>
            </div>
          </article>

          <div
            className={`selection-block selection-block--soft ${
              showValidation && !isFilled(effectiveApplicationOwner) ? 'has-error' : ''
            }`}
          >
            <div className="selection-heading selection-heading--stacked">
              <div>
                <strong>{content.form.fields.applicationOwner}</strong>
                <p>{content.form.applicationCard.title}</p>
              </div>
            </div>
            <div className="stage-row">
              {content.form.applicationPaths.map((path) => (
                <button
                  key={path.id}
                  type="button"
                  className={`stage-chip ${
                    effectiveApplicationOwner === path.id ? 'is-selected' : ''
                  }`}
                  aria-pressed={effectiveApplicationOwner === path.id}
                  onClick={() => updateField('applicationOwner', path.id)}
                  disabled={path.id === 'self' && ageDetails.isUnder13}
                >
                  {path.label}
                </button>
              ))}
            </div>
          </div>

          {needsAdultSupport ? (
            <div className="selection-block selection-block--accent">
              <div className="selection-heading selection-heading--stacked">
                <div>
                  <strong>{content.form.adultCardTitle}</strong>
                  <p>{content.form.adultCardText}</p>
                </div>
              </div>
              <div className="field-grid">
                <Field
                  label={content.form.fields.adultRole}
                  name="adultRole"
                  value={formState.adultRole}
                  onChange={handleChange}
                  placeholder={content.form.placeholders.adultRole}
                  helper={content.form.helpers.adultRole}
                  required
                  invalid={showValidation && !isFilled(formState.adultRole)}
                />
                <Field
                  label={content.form.fields.adultName}
                  name="adultName"
                  value={formState.adultName}
                  onChange={handleChange}
                  placeholder={content.form.placeholders.adultName}
                  required
                  invalid={showValidation && !isFilled(formState.adultName)}
                />
              </div>
            </div>
          ) : null}

          <div className="selection-block selection-block--soft">
            <div className="selection-heading selection-heading--stacked">
              <div>
                <strong>{content.form.fields.teamType}</strong>
                <p>{content.form.teamHint}</p>
              </div>
            </div>
            <div className="stage-row">
              {content.form.teamModes.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  className={`stage-chip ${formState.teamType === mode.id ? 'is-selected' : ''}`}
                  aria-pressed={formState.teamType === mode.id}
                  onClick={() => updateField('teamType', mode.id)}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {additionalTeamMembers.length ? (
              <div className="team-member-stack">
                <p className="team-member-stack__intro">{content.form.teamMemberCards.intro}</p>
                {additionalTeamMembers.map((member) => (
                  <article key={member.id} className="team-member-card">
                    <div className="team-member-card__head">
                      <strong>{member.title}</strong>
                    </div>
                    <div className="field-grid">
                      <Field
                        label={content.form.fields.fullName}
                        name={member.nameKey}
                        value={formState[member.nameKey]}
                        onChange={handleChange}
                        placeholder={content.form.placeholders.fullName}
                        required
                        invalid={showValidation && !isFilled(formState[member.nameKey])}
                      />
                      <Field
                        label={content.form.fields.age}
                        name={member.ageKey}
                        type="number"
                        value={formState[member.ageKey]}
                        onChange={handleChange}
                        min="8"
                        max="17"
                        placeholder={content.form.placeholders.age}
                        required
                        invalid={showValidation && !isFilled(formState[member.ageKey])}
                      />
                      <Field
                        label={content.form.fields.city}
                        name={member.cityKey}
                        value={formState[member.cityKey]}
                        onChange={handleChange}
                        placeholder={content.form.placeholders.city}
                        required
                        invalid={showValidation && !isFilled(formState[member.cityKey])}
                      />
                      <Field
                        label={content.form.fields.teamMemberContact}
                        name={member.contactKey}
                        type="tel"
                        value={formState[member.contactKey]}
                        onChange={handleChange}
                        placeholder={content.form.placeholders.teamMemberContact}
                        helper={content.form.helpers.teamMemberContact}
                        required
                        invalid={showValidation && !isFilled(formState[member.contactKey])}
                      />
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>

          <div className="selection-block selection-block--soft">
            <div className="selection-heading selection-heading--stacked">
              <div>
                <strong>{content.form.mentorToggleTitle}</strong>
                <p>{content.form.mentorToggleText}</p>
              </div>
            </div>
            <div className="stage-row">
              {content.form.mentorChoices.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  className={`stage-chip ${
                    formState.mentorEnabled === choice.id ? 'is-selected' : ''
                  }`}
                  aria-pressed={formState.mentorEnabled === choice.id}
                  onClick={() => updateField('mentorEnabled', choice.id)}
                >
                  {choice.label}
                </button>
              ))}
            </div>

            {hasMentor ? (
              <div className="mentor-fields">
                <div className="selection-heading selection-heading--stacked">
                  <div>
                    <strong>{content.form.mentorCardTitle}</strong>
                    <p>{content.form.mentorCardText}</p>
                  </div>
                </div>
                <div className="field-grid">
                  <Field
                    label={content.form.fields.mentorName}
                    name="mentorName"
                    value={formState.mentorName}
                    onChange={handleChange}
                    placeholder={content.form.placeholders.mentorName}
                    required
                    invalid={showValidation && !isFilled(formState.mentorName)}
                  />
                  <Field
                    label={content.form.fields.mentorContact}
                    name="mentorContact"
                    value={formState.mentorContact}
                    onChange={handleChange}
                    placeholder={content.form.placeholders.mentorContact}
                    helper={content.form.helpers.mentorContact}
                    optionalText={content.form.optionalLabel}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </FormSection>
        ) : null}

        {activeStepIndex === 1 ? (
        <FormSection
          step={content.form.sections.setup.step}
          title={content.form.sections.setup.title}
          text={content.form.sections.setup.text}
        >
          <div
            className={`selection-block ${
              showValidation && !isFilled(formState.category) ? 'has-error' : ''
            }`}
          >
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

          <div
            className={`selection-block ${
              showValidation && !isFilled(formState.projectStage) ? 'has-error' : ''
            }`}
          >
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
        </FormSection>
        ) : null}

        {activeStepIndex === 2 ? (
        <FormSection
          step={content.form.sections.story.step}
          title={content.form.sections.story.title}
          text={content.form.sections.story.text}
        >
          <div className="field-grid">
            <Field
              label={content.form.fields.projectName}
              name="projectName"
              value={formState.projectName}
              onChange={handleChange}
              placeholder={content.form.placeholders.projectName}
              required
              invalid={showValidation && !isFilled(formState.projectName)}
            />

            <div className={`field ${showValidation && !isFilled(formState.problem) ? 'is-invalid' : ''}`}>
              <div className="field-label">
                <strong>{content.form.fields.problem}</strong>
              </div>
              <input
                name="problem"
                value={formState.problem}
                onChange={handleChange}
                placeholder={content.form.placeholders.problem}
                aria-invalid={showValidation && !isFilled(formState.problem)}
                required
              />
              <small className="field-helper">{content.form.helpers.problem}</small>
            </div>
          </div>

          <div className="field-grid">
            <div
              className={`field field--full ${
                showValidation && !isFilled(formState.description) ? 'is-invalid' : ''
              }`}
            >
              <div className="field-label">
                <strong>{content.form.fields.description}</strong>
              </div>
              <textarea
                name="description"
                value={formState.description}
                onChange={handleChange}
                rows="5"
                placeholder={content.form.placeholders.description}
                aria-invalid={showValidation && !isFilled(formState.description)}
                required
              />
              <div className="field-meta">
                <small className="field-helper">{content.form.helpers.description}</small>
                <small>{formState.description.trim().length}</small>
              </div>
            </div>
          </div>

          <div className="prompt-block">
            <p className="prompt-block__title">{content.form.ideaPromptTitle}</p>
            <div className="prompt-grid">
              {content.form.ideaPrompts.map((item) => (
                <article key={item.title} className="prompt-card">
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </FormSection>
        ) : null}

        {activeStepIndex === 3 ? (
        <FormSection
          step={content.form.sections.pitch.step}
          title={content.form.sections.pitch.title}
          text={content.form.sections.pitch.text}
        >
          <div className="field-grid">
            <div
              className={`field ${
                showValidation && !isFilled(formState.recordingLink) ? 'is-invalid' : ''
              }`}
            >
              <div className="field-label">
                <strong>{content.form.fields.recordingLink}</strong>
              </div>
              <input
                name="recordingLink"
                type="url"
                value={formState.recordingLink}
                onChange={handleChange}
                placeholder={content.form.placeholders.recordingLink}
                aria-invalid={showValidation && !isFilled(formState.recordingLink)}
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
              helper={contactHelperText}
              required
              invalid={showValidation && !isFilled(formState.contact)}
            />
          </div>

          <div className="field-grid">
            <Field
              label={content.form.fields.projectLink}
              name="projectLink"
              type="url"
              value={formState.projectLink}
              onChange={handleChange}
              placeholder={content.form.placeholders.projectLink}
              helper={content.form.helpers.projectLink}
              optionalText={content.form.optionalLabel}
            />
          </div>
        </FormSection>
        ) : null}

        <div className="wizard-actions">
          <button
            type="button"
            className="ghost-button"
            onClick={handlePreviousStep}
            disabled={activeStepIndex === 0}
          >
            {content.form.back}
          </button>
          {isLastStep ? (
            <button type="submit" className="primary-button">
              {content.form.submit}
            </button>
          ) : (
            <button type="button" className="primary-button" onClick={handleNextStep}>
              {content.form.next}
            </button>
          )}
        </div>

        <div className="wizard-footer">
          <button type="button" className="ghost-button ghost-button--soft" onClick={handleReset}>
            {content.form.reset}
          </button>
          <span>
            {currentStep.step} / {stepDefinitions.length}
          </span>
        </div>

        {feedback ? <p className="form-feedback">{feedback}</p> : null}
      </form>
    </div>
  )
}

function FormSection({ step, title, text, children }) {
  return (
    <section className="form-section">
      <div className="form-section__head">
        <span className="form-section__step">{step}</span>
        <div>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

function Field({ label, helper, optionalText, invalid = false, ...props }) {
  return (
    <label className={`field ${invalid ? 'is-invalid' : ''}`}>
      <div className="field-label">
        <strong>{label}</strong>
        {optionalText ? <small>{optionalText}</small> : null}
      </div>
      <input {...props} aria-invalid={invalid || undefined} />
      {helper ? <small className="field-helper">{helper}</small> : null}
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

function MediaSlotCard({
  item,
  wide = false,
  compact = false,
  variant = 'default',
  onOpenVideo,
  videoActionLabel,
}) {
  const isVideo = item.type === 'video'
  const classes = [
    'media-slot',
    `media-slot--${variant}`,
    `media-slot--${item.type || 'photo'}`,
    wide ? 'media-slot--wide' : '',
    compact ? 'media-slot--compact' : '',
    item.size ? `media-slot--${item.size}` : '',
    item.tone ? `media-slot--tone-${item.tone}` : '',
    item.image ? 'has-image' : 'is-placeholder',
    isVideo ? 'media-slot--interactive' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const Element = isVideo ? 'button' : 'article'
  const interactiveProps = isVideo
    ? {
        type: 'button',
        onClick: () => onOpenVideo?.(item),
        'aria-label': videoActionLabel ? `${videoActionLabel}: ${item.title}` : item.title,
      }
    : {}

  return (
    <Element className={classes} {...interactiveProps}>
      <div className="media-slot__frame">
        {item.image ? (
          <img
            className={item.imageFit === 'contain' ? 'is-contain' : ''}
            src={item.image}
            alt={item.imageAlt || item.title}
          />
        ) : (
          <div className="media-slot__mock" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        )}

        <span className="media-slot__badge">{item.badge}</span>

        {item.type === 'video' ? <div className="media-slot__play" aria-hidden="true" /> : null}
      </div>

      <div className="media-slot__copy">
        <strong>{item.title}</strong>
        <p>{item.note}</p>
      </div>
    </Element>
  )
}

function VideoPreviewModal({ item, content, onClose }) {
  const videoSource = useMemo(() => getVideoPreviewSource(item), [item])

  useEffect(() => {
    if (!item) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [item, onClose])

  if (!item) {
    return null
  }

  return (
    <div
      className="video-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="video-modal__panel">
        <button
          type="button"
          className="video-modal__close"
          aria-label={content.closeLabel}
          onClick={onClose}
          autoFocus
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className={`video-modal__stage video-modal__stage--${videoSource.kind}`}>
          <div className="video-modal__stage-topbar" aria-hidden="true">
            <div className="video-modal__stage-meta">
              <span className="video-modal__stage-badge">{item.badge}</span>
              <span className="video-modal__stage-signal" />
              <span className="video-modal__stage-tag">{content.eyebrow}</span>
            </div>
            <span className="video-modal__stage-title">{item.title}</span>
          </div>

          <div className="video-modal__viewport">
            {videoSource.kind === 'embed' ? (
              <iframe
                src={videoSource.src}
                title={item.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : videoSource.kind === 'file' ? (
              <video controls autoPlay playsInline poster={item.videoPoster}>
                <source src={videoSource.src} />
              </video>
            ) : (
              <div
                className={`video-modal__placeholder-screen ${
                  item.tone ? `video-modal__placeholder-screen--${item.tone}` : ''
                }`}
                aria-hidden="true"
              >
                <div className="video-modal__placeholder-grid" />
                <div className="video-modal__placeholder-play" />
                <div className="video-modal__placeholder-bars">
                  <span />
                  <span />
                </div>
                <div className="video-modal__placeholder-orb" />
                <div className="video-modal__placeholder-copy">
                  <strong>{content.placeholderTitle}</strong>
                  <p>{content.placeholderText}</p>
                </div>
              </div>
            )}
          </div>

          <div className="video-modal__stage-dock" aria-hidden="true">
            <div className="video-modal__timeline">
              <span />
            </div>
            <div className="video-modal__controls">
              <span className="video-modal__control video-modal__control--play" />
              <span className="video-modal__control" />
              <span className="video-modal__control" />
              <span className="video-modal__time">00:45</span>
            </div>
          </div>
        </div>

        <div className="video-modal__content">
          <span className="card-eyebrow">{content.eyebrow}</span>
          <h3 id="video-modal-title">{item.title}</h3>
          <p>{item.note}</p>

          <div className="video-modal__chips">
            <span className="video-modal__chip">{item.badge}</span>
          </div>

          <div className="video-modal__highlight-list">
            {content.highlights.map((highlight) => (
              <div key={highlight} className="video-modal__highlight">
                <span aria-hidden="true" />
                <strong>{highlight}</strong>
              </div>
            ))}
          </div>

          {videoSource.kind === 'external' ? (
            <a
              className="secondary-button video-modal__external"
              href={videoSource.src}
              target="_blank"
              rel="noreferrer"
            >
              {content.openExternal}
            </a>
          ) : null}
        </div>
      </div>
    </div>
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
            <PartnerLogoBadge
              logo={codeSproutsLogo}
              alt="Code Sprouts Palestine logo"
              name="Code Sprouts Palestine"
              variant="footer"
            />
            <PartnerLogoBadge
              logo={techFromPalestineLogo}
              alt="Tech From Palestine logo"
              name="Tech From Palestine"
              href={techFromPalestineUrl}
              variant="footer"
            />
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

      <div className="container footer-legal">
        <p>{content.footer.rights}</p>
      </div>
    </footer>
  )
}

export default App
