export const translations: Record<string, Record<string, string>> = {
  "profile.title": {
    "en": "Welcome to iKHONO AI",
    "zu": "Siyakwamukela ku-iKHONO AI"
  },
  "profile.subtitle": {
    "en": "Who is learning today?",
    "zu": "Ubani ofundayo namhlanje?"
  },
  "profile.learner.title": {
    "en": "School & University Learner",
    "zu": "Umfundi Wesikole Nenanyuvesi"
  },
  "profile.learner.description": {
    "en": "For primary, high school, and tertiary students.",
    "zu": "Kwabafundi baseprayimari, abasesekondari, nasemanyuvesi."
  },
  "profile.adult.title": {
    "en": "Adult Learner",
    "zu": "Umfundi Omdala"
  },
  "profile.adult.description": {
    "en": "For skills development and lifelong learning.",
    "zu": "Ngokuthuthukiswa kwamakhono nokufunda impilo yonke."
  },
  "dashboard.greeting": {
    "en": "Hello, Learner!",
    "zu": "Sawubona, Mfundi!"
  },
  "dashboard.greeting.adult": {
    "en": "Hello!",
    "zu": "Sawubona!"
  },
  "header.switch_profile": {
    "en": "Switch Profile",
    "zu": "Shintsha Iphrofayili"
  },
  "chat.input_placeholder": {
    "en": "Ask me anything...",
    "zu": "Ngibuze noma yini..."
  },
  "chat.sample_questions_title": {
    "en": "Try asking",
    "zu": "Zama ukubuza"
  },
  "career.required_education": {
    "en": "Required Education",
    "zu": "Imfundo Edingekayo"
  },
  "career.suggested_path": {
    "en": "Suggested Learning Path",
    "zu": "Indlela Yokufunda Ephakanyisiwe"
  },
  "study.key_techniques": {
    "en": "Key Study Techniques",
    "zu": "Amasu Abalulekile Okufunda"
  },
  "video.select_key_title": {
    "en": "API Key Required",
    "zu": "Kudingeka Ukhiye we-API"
  },
  "video.select_key_description": {
    "en": "The AI Video Generator is a powerful tool that requires a personal API key. Please select a key to proceed. Usage is subject to billing.",
    "zu": "I-AI Video Generator iyithuluzi elinamandla elidinga ukhiye we-API womuntu siqu. Sicela ukhethe ukhiye ukuze uqhubeke. Ukusetshenziswa kungaphansi kokukhokhiswa."
  },
  "video.select_key_button": {
    "en": "Select API Key",
    "zu": "Khetha Ukhiye we-API"
  },
  "video.billing_link": {
    "en": "Learn about billing",
    "zu": "Funda ngokukhokhiswa"
  },
  "video.prompt_placeholder": {
    "en": "e.g., A robot riding a skateboard in space",
    "zu": "isb., Irobhothi ligibele isikeyitibhodi emkhathini"
  },
  "video.generate_button": {
    "en": "Generate Video",
    "zu": "Yenza Ividiyo"
  },
  "video.generating_message": {
    "en": "Your video is being created... This can take a few minutes.",
    "zu": "Ividiyo yakho iyenziwa... Lokhu kungathatha imizuzu embalwa."
  },
  "audio.start_recording": {
    "en": "Start Recording",
    "zu": "Qala Ukuqopha"
  },
  "audio.stop_recording": {
    "en": "Stop Recording",
    "zu": "Misa Ukuqopha"
  },
  "audio.type_to_speak_placeholder": {
    "en": "Type here and I will speak it...",
    "zu": "Bhala lapha ngizokukhulumela..."
  },
  "audio.speak_button": {
    "en": "Speak",
    "zu": "Khuluma"
  },
  "tutorial.skip": {
    "en": "Skip",
    "zu": "Yeqa"
  },
  "tutorial.done": {
    "en": "You're all set!",
    "zu": "Usulungile!"
  },
  "tutorial.step1.title": {
    "en": "Choose Your Path",
    "zu": "Khetha Indlela Yakho"
  },
  "tutorial.step1.content": {
    "en": "First, select the profile that best fits you to get a personalized experience.",
    "zu": "Okokuqala, khetha iphrofayili ekufanele kakhulu ukuze uthole ulwazi oluqondene nawe."
  },
  "tutorial.step2.title": {
    "en": "Your Learning Dashboard",
    "zu": "Ideshibhodi Yakho Yokufunda"
  },
  "tutorial.step2.content": {
    "en": "This is your home base. From here, you can access all the AI tutors tailored to your profile.",
    "zu": "Lena yindawo yakho. Kusuka lapha, ungafinyelela kubo bonke abafundisi be-AI abenzelwe iphrofayili yakho."
  },
  "tutorial.step3.title": {
    "en": "Meet Your AI Tutors",
    "zu": "Hlangana Nabafundisi Bakho be-AI"
  },
  "tutorial.step3.content": {
    "en": "Tap on any card to start a conversation with a specialized AI tutor. Each one is an expert in its field!",
    "zu": "Thepha kunoma yiliphi ikhadi ukuze uqale ingxoxo nomfundisi we-AI onguchwepheshe. Ngamunye unguchwepheshe emkhakheni wakhe!"
  },
  // Tutor names and descriptions
  ...Object.fromEntries(['en', 'zu'].flatMap(lang =>
    [
      ['daily_lesson', 'Daily Lesson', 'Isifundo Sansuku zonke', 'A quick, fun, and interactive 5-minute lesson.', 'Isifundo esisheshayo, esijabulisayo semizuzu emi-5.'],
      ['reading_tutor', 'Reading & Comprehension', 'Ukufunda Nokuqondisisa', 'Improve reading skills with personalized exercises.', 'Thuthukisa amakhono okufunda ngokuzivocavoca komuntu siqu.'],
      ['maths_tutor', 'Maths Tutor', 'Umfundisi Wezibalo', 'Step-by-step solutions for maths problems.', 'Izixazululo zezinkinga zezibalo isinyathelo ngesinyathelo.'],
      ['science_tutor', 'Science Tutor', 'Umfundisi Wesayensi', 'Explore biology, chemistry, and physics.', 'Hlola i-biology, i-chemistry, ne-physics.'],
      ['study_methods_coach', 'Study Methods Coach', 'Umqeqeshi Wezindlela Zokufunda', 'Learn effective study techniques for any subject.', 'Funda amasu okufunda aphumelelayo anoma yisiphi isifundo.'],
      ['career_navigator', 'Career Discovery Navigator', 'Umhlahlandlela Wokuthola Umsebenzi', 'Discover careers, education, and salaries.', 'Thola imisebenzi, imfundo, namaholo.'],
      ['video_content_analyzer', 'Video Content Analyzer', 'Umhlaziyi Wokuqukethwe Kwevidiyo', 'Get key insights from any video.', 'Thola imininingwane ebalulekile kunoma iyiphi ividiyo.'],
      ['complex_problem_solver', 'Complex Problem Solver', 'Isixazululi Sezinkinga Eziyinkimbinkimbi', 'Tackle tough questions with advanced reasoning.', 'Bhekana nemibuzo enzima ngokucabanga okuthuthukile.'],
      ['ai_video_generator', 'AI Video Generator', 'Umenzi Wamavidiyo we-AI', 'Create short videos from text descriptions.', 'Dala amavidiyo amafushane ngombhalo.'],
      ['quick_qa', 'Quick Q&A', 'Imibuzo Nezimpendulo Ezisheshayo', 'Get fast, concise answers to your questions.', 'Thola izimpendulo ezisheshayo, ezifingqiwe.'],
      ['adult_literacy', 'Adult Reading Skills', 'Amakhono Okufunda Abadala', 'Build foundational reading and writing skills.', 'Yakha amakhono ayisisekelo okufunda nokubhala.'],
      ['adult_numeracy', 'Adult Numeracy Skills', 'Amakhono Ezibalo Abadala', 'Practical maths for everyday life.', 'Izibalo eziwusizo zempilo yansuku zonke.'],
      ['modern_world_knowledge', 'Modern World Explained', 'Umhlaba Wanamuhla Uchaziwe', 'Understand technology, industries, and concepts.', 'Qondisisa ezobuchwepheshe, izimboni, nemiqondo.'],
      ['digital_skills_coach', 'Digital Skills Coach', 'Umqeqeshi Wekhono Ledijithali', 'Learn CV writing, social media, and devices.', 'Funda ukubhala i-CV, ezokuxhumana, namadivayisi.'],
      ['communication_assistant', 'Communication Assistant', 'Umsizi Wokuxhumana', 'Transcribe speech and speak text.', 'Bhala inkulumo futhi ukhulume umbhalo.'],
      ['sign_language_tutor', 'Sign Language Translator', 'Umhumushi Wolimi Lwezandla', 'Translate text into South African Sign Language.', 'Humusha umbhalo uye olimini lwezandla lwaseNingizimu Afrika.']
    ].map(([id, nameEn, nameZu, descEn, descZu]) => [
      [`tutor.${id}.name`, { en: nameEn, zu: nameZu }],
      [`tutor.${id}.description`, { en: descEn, zu: descZu }]
    ]).flat()
  ))
};
