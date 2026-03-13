import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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

const JOBS = Object.keys(JOB_SALARY_DATA);
const STATES = Object.keys(STATE_NAMES);

const FEDERAL_TAX_BRACKETS = {
  10000: 0.10, 41000: 0.12, 89075: 0.22, 170050: 0.24, 215950: 0.32, 539900: 0.35, Infinity: 0.37
};

function calculateFederalTax(income) {
  let tax = 0, prev = 0;
  for (const [limit, rate] of Object.entries(FEDERAL_TAX_BRACKETS).sort((a, b) => Number(a[0]) - Number(b[0]))) {
    const l = Number(limit) === Infinity ? Infinity : Number(limit);
    if (income <= prev) break;
    tax += (Math.min(income, l) - prev) * rate;
    prev = l;
  }
  return tax;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

export async function generateStaticParams() {
  const params = [];
  for (const job of JOBS) {
    for (const state of STATES) {
      params.push({ slug: `${job}-in-${state}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const inIdx = slug.indexOf("-in-");
  if (inIdx === -1) return {};
  const jobSlug = slug.substring(0, inIdx);
  const stateSlug = slug.substring(inIdx + 4);
  const job = JOB_SALARY_DATA[jobSlug];
  const stateName = STATE_NAMES[stateSlug];
  if (!job || !stateName) return {};

  const mult = STATE_SALARY_MULTIPLIERS[stateSlug];
  const stateMedian = Math.round(job.median * mult);

  return {
    title: `${job.title} Salary in ${stateName} â ${formatCurrency(stateMedian)}/Year (2025) | Pulsafi`,
    description: `${job.title} salary in ${stateName} averages ${formatCurrency(stateMedian)}/year. See pay range, take-home after taxes, how it compares to other states, and job growth outlook.`,
    openGraph: {
      title: `${job.title} Salary in ${stateName} â ${formatCurrency(stateMedian)}/Year`,
      description: `${job.title} in ${stateName}: median ${formatCurrency(stateMedian)}, range ${formatCurrency(Math.round(job.low * mult))}â${formatCurrency(Math.round(job.high * mult))}. Growth: ${job.growth}.`,
      url: `https://pulsafi.com/job-salary/${slug}`,
    },
  };
}

export default async function JobSalaryPage({ params }) {
  const { slug } = await params;
  const inIdx = slug.indexOf("-in-");
  if (inIdx === -1) notFound();
  const jobSlug = slug.substring(0, inIdx);
  const stateSlug = slug.substring(inIdx + 4);
  const job = JOB_SALARY_DATA[jobSlug];
  const stateName = STATE_NAMES[stateSlug];

  if (!job || !stateName) notFound();

  const mult = STATE_SALARY_MULTIPLIERS[stateSlug];
  const stateMedian = Math.round(job.median * mult);
  const stateLow = Math.round(job.low * mult);
  const stateHigh = Math.round(job.high * mult);

  const federalTax = calculateFederalTax(stateMedian);
  const fica = stateMedian * 0.0765;
  const totalTax = federalTax + fica;
  const afterTax = stateMedian - totalTax;
  const effectiveRate = (totalTax / stateMedian) * 100;
  const monthly = stateMedian / 12;
  const hourly = stateMedian / 2080;

  // Top and bottom paying states for this job
  const stateRankings = STATES.map(s => ({
    state: s, name: STATE_NAMES[s], salary: Math.round(job.median * STATE_SALARY_MULTIPLIERS[s])
  })).sort((a, b) => b.salary - a.salary);
  const currentRank = stateRankings.findIndex(s => s.state === stateSlug) + 1;

  // Similar jobs in same category
  const similarJobs = JOBS.filter(j => JOB_SALARY_DATA[j].category === job.category && j !== jobSlug).slice(0, 6);

  // Other states for this job
  const otherStates = ["california", "texas", "new-york", "florida", "illinois", "washington"].filter(s => s !== stateSlug).slice(0, 5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much does a ${job.title} make in ${stateName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The median ${job.title} salary in ${stateName} is ${formatCurrency(stateMedian)} per year, with a typical range of ${formatCurrency(stateLow)} to ${formatCurrency(stateHigh)} depending on experience, education, and employer.`
        }
      },
      {
        "@type": "Question",
        "name": `What is ${job.title} take-home pay in ${stateName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `A ${job.title} earning the median salary of ${formatCurrency(stateMedian)} in ${stateName} takes home approximately ${formatCurrency(afterTax)} per year (${formatCurrency(afterTax / 12)}/month) after estimated federal taxes and FICA. State taxes may further reduce take-home pay.`
        }
      },
      {
        "@type": "Question",
        "name": `Is ${job.title} a good career in ${stateName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${job.title} has a projected job growth rate of ${job.growth}, ${parseInt(job.growth) >= 10 ? "which is much faster than average" : parseInt(job.growth) >= 5 ? "which is about as fast as average" : "which is slower than average"}. In ${stateName}, the median salary of ${formatCurrency(stateMedian)} ranks #${currentRank} among all states.`
        }
      }
    ]
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px", fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>

        <nav style={{ marginBottom: "20px", fontSize: "14px", color: "#6b7280" }}>
          <a href="/" style={{ color: "#2563eb", textDecoration: "none" }}>Home</a>
          {" âº "}
          <a href="/job-salary" style={{ color: "#2563eb", textDecoration: "none" }}>Job Salaries</a>
          {" âº "}
          <span>{job.title} in {stateName}</span>
        </nav>

        <div style={{ display: "inline-block", padding: "4px 12px", background: "#eff6ff", color: "#1d4ed8", borderRadius: "6px", fontSize: "13px", fontWeight: "600", marginBottom: "12px" }}>
          {job.category} â¢ {job.growth} growth
        </div>

        <h1 style={{ fontSize: "34px", fontWeight: "800", marginBottom: "8px", color: "#111827" }}>
          {job.title} Salary in {stateName}
        </h1>
        <p style={{ fontSize: "18px", color: "#6b7280", marginBottom: "32px" }}>
          {job.description} See how much {job.title.toLowerCase()}s earn in {stateName} compared to the national average and other states.
        </p>

        {/* Quick Stats Card */}
        <div style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)", borderRadius: "16px", padding: "32px", color: "white", marginBottom: "32px" }}>
          <div style={{ fontSize: "16px", opacity: 0.8, marginBottom: "8px" }}>Median Salary in {stateName}</div>
          <div style={{ fontSize: "42px", fontWeight: "800", marginBottom: "8px" }}>{formatCurrency(stateMedian)}/year</div>
          <div style={{ fontSize: "16px", opacity: 0.9 }}>
            Range: {formatCurrency(stateLow)} â {formatCurrency(stateHigh)} â¢ National: {formatCurrency(job.median)} â¢ Rank: #{currentRank} of 51
          </div>
        </div>

        {/* Salary Breakdown */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Pay Breakdown
        </h2>
        <div style={{ overflowX: "auto", marginBottom: "32px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px" }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Period</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Gross</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Est. After Tax</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Hourly", hourly, hourly * (1 - totalTax / stateMedian)],
                ["Weekly", stateMedian / 52, (stateMedian / 52) * (1 - totalTax / stateMedian)],
                ["Biweekly", stateMedian / 26, (stateMedian / 26) * (1 - totalTax / stateMedian)],
                ["Monthly", monthly, monthly * (1 - totalTax / stateMedian)],
                ["Annual", stateMedian, afterTax],
              ].map(([label, gross, net], i) => (
                <tr key={label} style={{ background: i % 2 === 0 ? "white" : "#f9fafb" }}>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", fontWeight: "500" }}>{label}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>{formatCurrency(gross)}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid #e5e7eb", color: "#059669" }}>{formatCurrency(net)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tax Breakdown */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Estimated Tax Breakdown
        </h2>
        <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "24px", marginBottom: "32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>Federal Income Tax</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#dc2626" }}>{formatCurrency(federalTax)}</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>FICA (SS + Medicare)</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#dc2626" }}>{formatCurrency(fica)}</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>Total Tax</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#dc2626" }}>{formatCurrency(totalTax)}</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>Effective Rate</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#dc2626" }}>{effectiveRate.toFixed(1)}%</div>
            </div>
          </div>
          <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "16px" }}>
            * Federal taxes only (single filer, standard deduction). State income tax not included. See{" "}
            <a href={`/salary/${stateSlug}-${Math.round(stateMedian / 5000) * 5000}`} style={{ color: "#2563eb" }}>
              {stateName} salary after tax
            </a>{" "}for state-specific estimates.
          </p>
        </div>

        {/* State Comparison */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          {job.title} Salary by State (Top 10)
        </h2>
        <div style={{ overflowX: "auto", marginBottom: "32px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Rank</th>
                <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>State</th>
                <th style={{ padding: "10px 12px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Median Salary</th>
                <th style={{ padding: "10px 12px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>vs National</th>
              </tr>
            </thead>
            <tbody>
              {stateRankings.slice(0, 10).map((s, i) => (
                <tr key={s.state} style={{ background: s.state === stateSlug ? "#eff6ff" : i % 2 === 0 ? "white" : "#f9fafb" }}>
                  <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb" }}>#{i + 1}</td>
                  <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb" }}>
                    <a href={`/job-salary/${jobSlug}-in-${s.state}`} style={{ color: "#2563eb", textDecoration: "none", fontWeight: s.state === stateSlug ? "700" : "400" }}>
                      {s.name} {s.state === stateSlug ? "â" : ""}
                    </a>
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "right", borderBottom: "1px solid #e5e7eb", fontWeight: "500" }}>{formatCurrency(s.salary)}</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", borderBottom: "1px solid #e5e7eb", color: s.salary >= job.median ? "#059669" : "#dc2626" }}>
                    {s.salary >= job.median ? "+" : ""}{((s.salary / job.median - 1) * 100).toFixed(0)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Content */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          {job.title} Career Outlook in {stateName}
        </h2>
        <div style={{ color: "#4b5563", lineHeight: "1.8", marginBottom: "32px" }}>
          <p style={{ marginBottom: "16px" }}>
            {job.title}s in {stateName} earn a median salary of {formatCurrency(stateMedian)} per year, which is{" "}
            {mult > 1 ? `${((mult - 1) * 100).toFixed(0)}% above` : `${((1 - mult) * 100).toFixed(0)}% below`}{" "}
            the national median of {formatCurrency(job.median)}. This puts {stateName} at #{currentRank} out of 51 states and territories for {job.title.toLowerCase()} compensation.
          </p>
          <p style={{ marginBottom: "16px" }}>
            The projected job growth for this occupation is {job.growth},{" "}
            {parseInt(job.growth) >= 15 ? "significantly outpacing the average across all occupations" :
             parseInt(job.growth) >= 5 ? "roughly on par with the average for all occupations" :
             "slower than the average for all occupations"}.
            {parseInt(job.growth) >= 10 ? ` This strong demand means ${job.title.toLowerCase()}s in ${stateName} can expect competitive offers and good job security.` : ""}
          </p>
          <p>
            After estimated federal taxes and FICA, your take-home pay at the median salary would be about{" "}
            {formatCurrency(afterTax)} per year ({formatCurrency(afterTax / 12)}/month). For a detailed state-specific tax breakdown, visit our{" "}
            <a href={`/salary/${stateSlug}-${Math.round(stateMedian / 5000) * 5000}`} style={{ color: "#2563eb", textDecoration: "underline" }}>
              {stateName} salary after tax calculator
            </a>.
          </p>
        </div>

        {/* Similar jobs */}
        {similarJobs.length > 0 && (
          <>
            <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
              Similar {job.category} Jobs in {stateName}
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
              {similarJobs.map((j) => (
                <a key={j} href={`/job-salary/${j}-in-${stateSlug}`} style={{ padding: "8px 16px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", color: "#2563eb", textDecoration: "none", fontSize: "14px" }}>
                  {JOB_SALARY_DATA[j].title} ({formatCurrency(Math.round(JOB_SALARY_DATA[j].median * mult))})
                </a>
              ))}
            </div>
          </>
        )}

        {/* Other states */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          {job.title} Salary in Other States
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
          {otherStates.map((s) => (
            <a key={s} href={`/job-salary/${jobSlug}-in-${s}`} style={{ padding: "8px 16px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", color: "#2563eb", textDecoration: "none", fontSize: "14px" }}>
              {STATE_NAMES[s]} ({formatCurrency(Math.round(job.median * STATE_SALARY_MULTIPLIERS[s]))})
            </a>
          ))}
        </div>

        <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "24px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px", color: "#111827" }}>Related Tools</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              { href: "/tools/salary-breakdown-calculator", label: "Salary Calculator" },
              { href: "/tools/net-worth-calculator", label: "Net Worth Calculator" },
              { href: "/tools/fire-calculator", label: "FIRE Calculator" },
              { href: `/afford/${stateSlug}`, label: `Home Affordability in ${stateName}` },
            ].map((tool) => (
              <a key={tool.href} href={tool.href} style={{ padding: "8px 16px", background: "white", border: "1px solid #e5e7eb", borderRadius: "8px", color: "#2563eb", textDecoration: "none", fontSize: "14px" }}>
                {tool.label}
              </a>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}

