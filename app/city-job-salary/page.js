"use client";
import { useState, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { jobSalaryData, topCities } from "../data/jobSalaryData";
import cityData from "../data/cityData";

// Group cities by state
function getCitiesByState() {
  const byState = {};
  for (const slug of topCities) {
    const city = cityData[slug];
    if (!city) continue;
    const state = city.stateFullName || city.state;
    if (!byState[state]) byState[state] = [];
    byState[state].push({ slug, ...city });
  }
  // Sort states alphabetically, and cities within each state
  const sorted = Object.entries(byState).sort((a, b) => a[0].localeCompare(b[0]));
  for (const [, cities] of sorted) {
    cities.sort((a, b) => a.city.localeCompare(b.city));
  }
  return sorted;
}

// Group jobs by category
function getJobsByCategory() {
  const byCategory = {};
  for (const [slug, job] of Object.entries(jobSalaryData)) {
    const cat = job.category || "Other";
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push({ slug, ...job });
  }
  const sorted = Object.entries(byCategory).sort((a, b) => a[0].localeCompare(b[0]));
  for (const [, jobs] of sorted) {
    jobs.sort((a, b) => a.title.localeCompare(b.title));
  }
  return sorted;
}

const allJobs = Object.entries(jobSalaryData).map(([slug, job]) => ({ slug, ...job })).sort((a, b) => a.title.localeCompare(b.title));
const citiesByState = getCitiesByState();
const jobsByCategory = getJobsByCategory();
const totalPages = topCities.length * Object.keys(jobSalaryData).length;

export default function CityJobSalaryIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [activeTab, setActiveTab] = useState("search"); // "search" | "jobs" | "cities"

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    const results = [];

    // Match jobs
    const matchedJobs = allJobs.filter(j => j.title.toLowerCase().includes(q)).slice(0, 5);
    // Match cities
    const matchedCities = topCities
      .map(s => ({ slug: s, ...cityData[s] }))
      .filter(c => c.city && (c.city.toLowerCase().includes(q) || (c.stateFullName && c.stateFullName.toLowerCase().includes(q))))
      .slice(0, 8);

    // If we have both job and city matches, create direct links
    if (matchedJobs.length > 0 && matchedCities.length > 0) {
      for (const job of matchedJobs.slice(0, 3)) {
        for (const city of matchedCities.slice(0, 3)) {
          results.push({
            type: "direct",
            label: `${job.title} in ${city.city}, ${city.state}`,
            href: `/city-job-salary/${job.slug}-salary-in-${city.slug}`,
          });
        }
      }
    }

    // Also show job-only results
    for (const job of matchedJobs) {
      results.push({ type: "job", label: job.title, slug: job.slug });
    }

    // And city-only results
    for (const city of matchedCities) {
      results.push({ type: "city", label: `${city.city}, ${city.state}`, slug: city.slug });
    }

    return results.slice(0, 15);
  }, [searchQuery]);

  // Get links for a selected job across popular cities
  const jobCityLinks = useMemo(() => {
    if (!selectedJob) return [];
    return topCities.slice(0, 50).map(citySlug => {
      const city = cityData[citySlug];
      return {
        href: `/city-job-salary/${selectedJob}-salary-in-${citySlug}`,
        label: `${city.city}, ${city.state}`,
      };
    });
  }, [selectedJob]);

  // Get links for a selected state across all jobs
  const stateCityData = useMemo(() => {
    if (!selectedState) return [];
    const stateEntry = citiesByState.find(([state]) => state === selectedState);
    if (!stateEntry) return [];
    return stateEntry[1];
  }, [selectedState]);

  const tabStyle = (active) => ({
    padding: "10px 20px",
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    color: active ? "var(--accent)" : "var(--text-muted)",
    background: active ? "var(--bg-card)" : "transparent",
    border: active ? "1px solid var(--border-card)" : "1px solid transparent",
    borderBottom: active ? "1px solid var(--bg-main)" : "1px solid var(--border-card)",
    borderRadius: "8px 8px 0 0",
    cursor: "pointer",
    marginBottom: -1,
  });

  const cardStyle = {
    backgroundColor: "var(--bg-card)",
    border: "1px solid var(--border-card)",
    borderRadius: 8,
    padding: 20,
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <Header />

      {/* Hero */}
      <section style={{ padding: "80px 24px 60px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>
          Salary Explorer
        </div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          City Job Salary Data
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
          Explore estimated salaries for {Object.keys(jobSalaryData).length.toLocaleString()} jobs across {topCities.length.toLocaleString()} cities — {totalPages.toLocaleString()} salary pages, adjusted for cost of living.
        </p>
      </section>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* Search Bar */}
        <div style={{ marginTop: -30, marginBottom: 32, position: "relative", zIndex: 10 }}>
          <input
            type="text"
            placeholder="Search jobs or cities... e.g. &quot;nurse Chicago&quot;"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "16px 20px",
              fontSize: 16,
              fontFamily: "'DM Sans', sans-serif",
              backgroundColor: "var(--bg-card)",
              border: "2px solid var(--border-card)",
              borderRadius: 12,
              color: "var(--text-primary)",
              outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
            onBlur={(e) => e.target.style.borderColor = "var(--border-card)"}
          />

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && searchQuery.length >= 2 && (
            <div style={{
              position: "absolute", top: "100%", left: 0, right: 0,
              backgroundColor: "var(--bg-card)", border: "1px solid var(--border-card)",
              borderRadius: 12, marginTop: 4, padding: 8, maxHeight: 400, overflowY: "auto",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}>
              {searchResults.map((result, i) => (
                <a
                  key={i}
                  href={result.type === "direct" ? result.href :
                    result.type === "job" ? `#job-${result.slug}` :
                    `#city-${result.slug}`}
                  onClick={() => {
                    if (result.type === "job") {
                      setSelectedJob(result.slug);
                      setActiveTab("jobs");
                      setSearchQuery("");
                    } else if (result.type === "city") {
                      setSearchQuery("");
                    }
                  }}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 12px", borderRadius: 8, textDecoration: "none",
                    color: "inherit", fontSize: 14,
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "var(--bg-main)"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <span style={{
                    fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em",
                    fontWeight: 600, color: result.type === "direct" ? "var(--accent)" : "var(--text-muted)",
                    background: "var(--bg-main)", padding: "2px 8px", borderRadius: 4,
                    minWidth: 50, textAlign: "center",
                  }}>
                    {result.type === "direct" ? "Salary" : result.type === "job" ? "Job" : "City"}
                  </span>
                  <span style={{ color: "var(--text-primary)" }}>{result.label}</span>
                  {result.type === "direct" && <span style={{ marginLeft: "auto", color: "var(--accent)" }}>→</span>}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border-card)", marginBottom: 24 }}>
          <button style={tabStyle(activeTab === "search")} onClick={() => setActiveTab("search")}>Quick Links</button>
          <button style={tabStyle(activeTab === "jobs")} onClick={() => setActiveTab("jobs")}>Browse by Job</button>
          <button style={tabStyle(activeTab === "cities")} onClick={() => setActiveTab("cities")}>Browse by City</button>
        </div>

        {/* Tab: Quick Links */}
        {activeTab === "search" && (
          <div>
            <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 20px" }}>
              Popular Salary Searches
            </h2>

            {/* Popular job + city combos */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginBottom: 40 }}>
              {[
                { job: "software-engineer", city: "san-francisco-ca", label: "Software Engineer in San Francisco" },
                { job: "registered-nurse", city: "new-york-ny", label: "Registered Nurse in New York" },
                { job: "data-scientist", city: "seattle-wa", label: "Data Scientist in Seattle" },
                { job: "mechanical-engineer", city: "detroit-mi", label: "Mechanical Engineer in Detroit" },
                { job: "marketing-manager", city: "chicago-il", label: "Marketing Manager in Chicago" },
                { job: "financial-analyst", city: "boston-ma", label: "Financial Analyst in Boston" },
                { job: "physical-therapist", city: "denver-co", label: "Physical Therapist in Denver" },
                { job: "graphic-designer", city: "los-angeles-ca", label: "Graphic Designer in Los Angeles" },
                { job: "pharmacist", city: "houston-tx", label: "Pharmacist in Houston" },
                { job: "teacher", city: "austin-tx", label: "Teacher in Austin" },
                { job: "accountant", city: "atlanta-ga", label: "Accountant in Atlanta" },
                { job: "web-developer", city: "portland-or", label: "Web Developer in Portland" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={`/city-job-salary/${item.job}-salary-in-${item.city}`}
                  style={{
                    ...cardStyle,
                    display: "block", textDecoration: "none", color: "inherit",
                    transition: "border-color 0.2s",
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--border-card)"}
                >
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--accent)" }}>View salary data →</div>
                </a>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 40 }}>
              <div style={{ ...cardStyle, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: "var(--accent)" }}>
                  {Object.keys(jobSalaryData).length}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Job Titles</div>
              </div>
              <div style={{ ...cardStyle, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: "var(--accent)" }}>
                  {topCities.length.toLocaleString()}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Cities</div>
              </div>
              <div style={{ ...cardStyle, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: "var(--accent)" }}>
                  {citiesByState.length}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>States + DC</div>
              </div>
              <div style={{ ...cardStyle, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: "var(--accent)" }}>
                  {totalPages.toLocaleString()}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Salary Pages</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Browse by Job */}
        {activeTab === "jobs" && (
          <div>
            {!selectedJob ? (
              <>
                <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 20px" }}>
                  All Job Categories
                </h2>
                {jobsByCategory.map(([category, jobs]) => (
                  <div key={category} style={{ marginBottom: 28 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--accent)", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {category}
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {jobs.map((job) => (
                        <button
                          key={job.slug}
                          onClick={() => setSelectedJob(job.slug)}
                          style={{
                            padding: "8px 14px", fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                            backgroundColor: "var(--bg-card)", border: "1px solid var(--border-card)",
                            borderRadius: 20, color: "var(--text-primary)", cursor: "pointer",
                            transition: "border-color 0.2s",
                          }}
                          onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
                          onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--border-card)"}
                        >
                          {job.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <button
                  onClick={() => setSelectedJob("")}
                  style={{
                    padding: "8px 16px", fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                    backgroundColor: "transparent", border: "1px solid var(--border-card)",
                    borderRadius: 8, color: "var(--text-muted)", cursor: "pointer", marginBottom: 20,
                  }}
                >
                  ← Back to all jobs
                </button>
                <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 8px" }}>
                  {jobSalaryData[selectedJob]?.title} Salary by City
                </h2>
                <p style={{ fontSize: 14, color: "var(--text-muted)", margin: "0 0 20px" }}>
                  Showing top 50 cities. Select a city to see the full salary breakdown.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
                  {jobCityLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      style={{
                        padding: "12px 16px", fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                        backgroundColor: "var(--bg-card)", border: "1px solid var(--border-card)",
                        borderRadius: 8, color: "var(--text-primary)", textDecoration: "none",
                        transition: "border-color 0.2s",
                      }}
                      onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
                      onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--border-card)"}
                    >
                      {link.label} <span style={{ color: "var(--accent)" }}>→</span>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Tab: Browse by City */}
        {activeTab === "cities" && (
          <div>
            {!selectedState ? (
              <>
                <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 20px" }}>
                  All States
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
                  {citiesByState.map(([state, cities]) => (
                    <button
                      key={state}
                      onClick={() => setSelectedState(state)}
                      style={{
                        ...cardStyle, cursor: "pointer", textAlign: "left",
                        transition: "border-color 0.2s",
                      }}
                      onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
                      onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--border-card)"}
                    >
                      <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{state}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{cities.length} {cities.length === 1 ? "city" : "cities"}</div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setSelectedState("")}
                  style={{
                    padding: "8px 16px", fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                    backgroundColor: "transparent", border: "1px solid var(--border-card)",
                    borderRadius: 8, color: "var(--text-muted)", cursor: "pointer", marginBottom: 20,
                  }}
                >
                  ← Back to all states
                </button>
                <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 8px" }}>
                  Cities in {selectedState}
                </h2>
                <p style={{ fontSize: 14, color: "var(--text-muted)", margin: "0 0 20px" }}>
                  Select a city, then choose a job to see salary data.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                  {stateCityData.map((city) => (
                    <div key={city.slug} style={{ ...cardStyle }}>
                      <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
                        {city.city}, {city.state}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>
                        Population: {city.population?.toLocaleString()} · COL Index: {city.index}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {allJobs.slice(0, 8).map((job) => (
                          <a
                            key={job.slug}
                            href={`/city-job-salary/${job.slug}-salary-in-${city.slug}`}
                            style={{
                              fontSize: 11, padding: "4px 10px", borderRadius: 12,
                              backgroundColor: "var(--bg-main)", border: "1px solid var(--border-card)",
                              color: "var(--text-secondary)", textDecoration: "none",
                            }}
                          >
                            {job.title}
                          </a>
                        ))}
                        <span style={{ fontSize: 11, padding: "4px 10px", color: "var(--text-muted)" }}>
                          +{allJobs.length - 8} more
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Disclaimer */}
        <div style={{
          marginTop: 48, padding: "16px 20px",
          backgroundColor: "var(--bg-card)", border: "1px solid var(--border-card)",
          borderRadius: 8, fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7,
        }}>
          <strong style={{ color: "var(--text-secondary)" }}>Disclaimer:</strong> Salary estimates are based on national occupational wage data from the{" "}
          <a href="https://www.bls.gov/oes/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "underline" }}>
            Bureau of Labor Statistics (BLS)
          </a>{" "}
          adjusted for regional cost of living. Figures are approximate and for informational purposes only.
        </div>
      </main>

      <Footer />
    </div>
  );
}
