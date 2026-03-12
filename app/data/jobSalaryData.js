// Top 50 jobs with national median salary data (BLS 2024 estimates)
// Each job: { title, slug, median, low, high, growth, category, description }
const JOB_SALARY_DATA = {
  "software-developer": { title: "Software Developer", median: 132270, low: 79000, high: 208000, growth: "25%", category: "Technology", description: "Design, develop, and maintain software applications and systems." },
  "registered-nurse": { title: "Registered Nurse", median: 86070, low: 60000, high: 120000, growth: "6%", category: "Healthcare", description: "Provide patient care, administer medications, and coordinate with healthcare teams." },
  "accountant": { title: "Accountant", median: 79880, low: 50000, high: 130000, growth: "4%", category: "Finance", description: "Prepare financial statements, ensure tax compliance, and audit financial records." },
  "financial-analyst": { title: "Financial Analyst", median: 95080, low: 60000, high: 160000, growth: "8%", category: "Finance", description: "Analyze financial data, prepare reports, and guide business investment decisions." },
  "marketing-manager": { title: "Marketing Manager", median: 156580, low: 85000, high: 240000, growth: "6%", category: "Business", description: "Plan and direct marketing policies, manage campaigns, and oversee brand strategy." },
  "data-scientist": { title: "Data Scientist", median: 108020, low: 65000, high: 180000, growth: "35%", category: "Technology", description: "Analyze complex data sets using statistical methods and machine learning." },
  "mechanical-engineer": { title: "Mechanical Engineer", median: 96310, low: 63000, high: 140000, growth: "2%", category: "Engineering", description: "Design and oversee manufacturing of mechanical devices and systems." },
  "teacher": { title: "Teacher (K-12)", median: 63770, low: 42000, high: 90000, growth: "1%", category: "Education", description: "Educate students in academic subjects and develop curriculum plans." },
  "physician-assistant": { title: "Physician Assistant", median: 130020, low: 90000, high: 175000, growth: "28%", category: "Healthcare", description: "Examine patients, diagnose illnesses, and prescribe medications under physician supervision." },
  "project-manager": { title: "Project Manager", median: 98580, low: 60000, high: 155000, growth: "6%", category: "Business", description: "Plan, execute, and close projects while managing teams, budgets, and timelines." },
  "electrician": { title: "Electrician", median: 61590, low: 38000, high: 100000, growth: "6%", category: "Trades", description: "Install, maintain, and repair electrical systems in buildings and structures." },
  "graphic-designer": { title: "Graphic Designer", median: 57990, low: 36000, high: 98000, growth: "3%", category: "Creative", description: "Create visual concepts using software to communicate ideas and captivate consumers." },
  "pharmacist": { title: "Pharmacist", median: 136030, low: 100000, high: 165000, growth: "-2%", category: "Healthcare", description: "Dispense prescription medications and advise patients on proper drug usage." },
  "civil-engineer": { title: "Civil Engineer", median: 95890, low: 62000, high: 140000, growth: "5%", category: "Engineering", description: "Design and supervise construction of infrastructure like roads, bridges, and buildings." },
  "dental-hygienist": { title: "Dental Hygienist", median: 87530, low: 60000, high: 115000, growth: "7%", category: "Healthcare", description: "Clean teeth, examine patients for oral diseases, and provide preventive dental care." },
  "web-developer": { title: "Web Developer", median: 85760, low: 48000, high: 140000, growth: "16%", category: "Technology", description: "Design and create websites, ensuring functionality, performance, and user experience." },
  "human-resources-manager": { title: "Human Resources Manager", median: 136350, low: 82000, high: 210000, growth: "5%", category: "Business", description: "Plan and coordinate HR activities including recruiting, compensation, and employee relations." },
  "physical-therapist": { title: "Physical Therapist", median: 99710, low: 70000, high: 130000, growth: "15%", category: "Healthcare", description: "Help injured or ill patients improve movement and manage pain through therapeutic exercises." },
  "plumber": { title: "Plumber", median: 61550, low: 37000, high: 100000, growth: "2%", category: "Trades", description: "Install and repair piping systems for water, gas, and drainage in buildings." },
  "real-estate-agent": { title: "Real Estate Agent", median: 56620, low: 30000, high: 120000, growth: "3%", category: "Sales", description: "Help clients buy, sell, and rent properties while negotiating deals and managing contracts." },
  "cybersecurity-analyst": { title: "Cybersecurity Analyst", median: 120360, low: 75000, high: 175000, growth: "32%", category: "Technology", description: "Protect computer networks and systems from cyber threats and security breaches." },
  "lawyer": { title: "Lawyer", median: 145760, low: 65000, high: 240000, growth: "8%", category: "Legal", description: "Advise and represent clients in legal matters, draft documents, and argue cases in court." },
  "occupational-therapist": { title: "Occupational Therapist", median: 96370, low: 65000, high: 125000, growth: "12%", category: "Healthcare", description: "Help patients develop or recover daily living and work skills after injury or illness." },
  "sales-manager": { title: "Sales Manager", median: 135160, low: 75000, high: 220000, growth: "4%", category: "Sales", description: "Direct sales teams, set goals, develop training programs, and analyze sales statistics." },
  "architect": { title: "Architect", median: 93310, low: 55000, high: 150000, growth: "5%", category: "Engineering", description: "Design buildings and structures, preparing blueprints and overseeing construction." },
  "dental-assistant": { title: "Dental Assistant", median: 46540, low: 32000, high: 62000, growth: "8%", category: "Healthcare", description: "Assist dentists during procedures, take X-rays, and manage patient records." },
  "paralegal": { title: "Paralegal", median: 60970, low: 38000, high: 90000, growth: "4%", category: "Legal", description: "Assist lawyers by researching laws, preparing documents, and organizing case files." },
  "ux-designer": { title: "UX Designer", median: 104420, low: 60000, high: 160000, growth: "16%", category: "Technology", description: "Research user needs and design intuitive digital interfaces and experiences." },
  "veterinarian": { title: "Veterinarian", median: 119100, low: 75000, high: 170000, growth: "19%", category: "Healthcare", description: "Diagnose and treat diseases and injuries in animals, and advise pet owners on care." },
  "construction-manager": { title: "Construction Manager", median: 104900, low: 65000, high: 170000, growth: "5%", category: "Trades", description: "Plan, coordinate, and supervise construction projects from start to finish." },
  "social-worker": { title: "Social Worker", median: 58380, low: 38000, high: 82000, growth: "7%", category: "Social Services", description: "Help people cope with challenges by providing counseling, resources, and advocacy." },
  "database-administrator": { title: "Database Administrator", median: 101510, low: 60000, high: 150000, growth: "8%", category: "Technology", description: "Design, implement, and maintain database systems to store and secure data." },
  "speech-pathologist": { title: "Speech-Language Pathologist", median: 89290, low: 60000, high: 125000, growth: "19%", category: "Healthcare", description: "Diagnose and treat speech, language, and swallowing disorders in patients." },
  "operations-manager": { title: "Operations Manager", median: 101280, low: 60000, high: 170000, growth: "4%", category: "Business", description: "Oversee daily operations, improve efficiency, and manage organizational processes." },
  "hvac-technician": { title: "HVAC Technician", median: 57300, low: 36000, high: 85000, growth: "6%", category: "Trades", description: "Install, maintain, and repair heating, ventilation, and air conditioning systems." },
  "financial-manager": { title: "Financial Manager", median: 156100, low: 90000, high: 250000, growth: "16%", category: "Finance", description: "Direct financial activities including planning, investing, and managing organizational funds." },
  "dietitian": { title: "Dietitian/Nutritionist", median: 69680, low: 45000, high: 95000, growth: "7%", category: "Healthcare", description: "Plan nutrition programs, advise on dietary habits, and promote healthy eating." },
  "industrial-engineer": { title: "Industrial Engineer", median: 96350, low: 62000, high: 140000, growth: "12%", category: "Engineering", description: "Design efficient systems that integrate workers, machines, and materials." },
  "police-officer": { title: "Police Officer", median: 74910, low: 45000, high: 110000, growth: "3%", category: "Public Safety", description: "Protect communities by enforcing laws, responding to emergencies, and investigating crimes." },
  "nurse-practitioner": { title: "Nurse Practitioner", median: 126260, low: 90000, high: 165000, growth: "40%", category: "Healthcare", description: "Provide advanced nursing care including diagnosing conditions and prescribing treatment." },
  "product-manager": { title: "Product Manager", median: 121000, low: 75000, high: 190000, growth: "10%", category: "Technology", description: "Guide product development strategy, define roadmaps, and coordinate cross-functional teams." },
  "welder": { title: "Welder", median: 48690, low: 34000, high: 72000, growth: "2%", category: "Trades", description: "Join metal parts together using welding equipment and various techniques." },
  "psychologist": { title: "Psychologist", median: 92740, low: 55000, high: 140000, growth: "6%", category: "Healthcare", description: "Study mental processes and behavior, diagnose disorders, and provide therapy." },
  "supply-chain-manager": { title: "Supply Chain Manager", median: 98560, low: 60000, high: 155000, growth: "18%", category: "Business", description: "Oversee and manage supply chain and logistics operations for efficiency." },
  "respiratory-therapist": { title: "Respiratory Therapist", median: 77960, low: 52000, high: 105000, growth: "13%", category: "Healthcare", description: "Treat patients with breathing difficulties and manage cardiopulmonary conditions." },
  "biomedical-engineer": { title: "Biomedical Engineer", median: 100330, low: 62000, high: 155000, growth: "5%", category: "Engineering", description: "Apply engineering principles to medicine and biology for healthcare solutions." },
  "chef": { title: "Chef/Head Cook", median: 58920, low: 34000, high: 95000, growth: "5%", category: "Hospitality", description: "Direct food preparation, create menus, and manage kitchen operations." },
  "information-security-analyst": { title: "Information Security Analyst", median: 120360, low: 75000, high: 175000, growth: "32%", category: "Technology", description: "Plan and implement security measures to protect organizational computer systems." },
  "environmental-engineer": { title: "Environmental Engineer", median: 100090, low: 62000, high: 145000, growth: "4%", category: "Engineering", description: "Develop solutions to environmental problems using engineering and science principles." },
  "medical-assistant": { title: "Medical Assistant", median: 42000, low: 30000, high: 56000, growth: "14%", category: "Healthcare", description: "Perform administrative and clinical tasks in medical offices and clinics." },
};

// State salary adjustment multipliers (relative to national median)
// Based on BLS regional wage differentials
const STATE_SALARY_MULTIPLIERS = {
  "alabama": 0.84, "alaska": 1.08, "arizona": 0.95, "arkansas": 0.82, "california": 1.18,
  "colorado": 1.06, "connecticut": 1.12, "delaware": 1.02, "florida": 0.93, "georgia": 0.94,
  "hawaii": 1.10, "idaho": 0.86, "illinois": 1.02, "indiana": 0.90, "iowa": 0.88,
  "kansas": 0.89, "kentucky": 0.86, "louisiana": 0.87, "maine": 0.90, "maryland": 1.08,
  "massachusetts": 1.16, "michigan": 0.93, "minnesota": 1.01, "mississippi": 0.80, "missouri": 0.90,
  "montana": 0.85, "nebraska": 0.89, "nevada": 0.95, "new-hampshire": 1.03, "new-jersey": 1.13,
  "new-mexico": 0.87, "new-york": 1.15, "north-carolina": 0.93, "north-dakota": 0.91, "ohio": 0.91,
  "oklahoma": 0.85, "oregon": 1.02, "pennsylvania": 0.97, "rhode-island": 1.04, "south-carolina": 0.87,
  "south-dakota": 0.84, "tennessee": 0.90, "texas": 0.97, "utah": 0.93, "vermont": 0.93,
  "virginia": 1.06, "washington": 1.14, "west-virginia": 0.82, "wisconsin": 0.93, "wyoming": 0.90,
  "district-of-columbia": 1.30
};

// State display names
const STATE_NAMES = {
  "alabama": "Alabama", "alaska": "Alaska", "arizona": "Arizona", "arkansas": "Arkansas", "california": "California",
  "colorado": "Colorado", "connecticut": "Connecticut", "delaware": "Delaware", "florida": "Florida", "georgia": "Georgia",
  "hawaii": "Hawaii", "idaho": "Idaho", "illinois": "Illinois", "indiana": "Indiana", "iowa": "Iowa",
  "kansas": "Kansas", "kentucky": "Kentucky", "louisiana": "Louisiana", "maine": "Maine", "maryland": "Maryland",
  "massachusetts": "Massachusetts", "michigan": "Michigan", "minnesota": "Minnesota", "mississippi": "Mississippi", "missouri": "Missouri",
  "montana": "Montana", "nebraska": "Nebraska", "nevada": "Nevada", "new-hampshire": "New Hampshire", "new-jersey": "New Jersey",
  "new-mexico": "New Mexico", "new-york": "New York", "north-carolina": "North Carolina", "north-dakota": "North Dakota", "ohio": "Ohio",
  "oklahoma": "Oklahoma", "oregon": "Oregon", "pennsylvania": "Pennsylvania", "rhode-island": "Rhode Island", "south-carolina": "South Carolina",
  "south-dakota": "South Dakota", "tennessee": "Tennessee", "texas": "Texas", "utah": "Utah", "vermont": "Vermont",
  "virginia": "Virginia", "washington": "Washington", "west-virginia": "West Virginia", "wisconsin": "Wisconsin", "wyoming": "Wyoming",
  "district-of-columbia": "District of Columbia"
};

module.exports = { JOB_SALARY_DATA, STATE_SALARY_MULTIPLIERS, STATE_NAMES };
