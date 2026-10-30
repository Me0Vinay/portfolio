/* Vinay Kr — portfolio. Content lives in the data arrays below; edit them to update the site. */

const ic = (id, cls = "icon") => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;

/* ------------------------------------------------------------------ project types */
const TYPES = [
  { cat: ["eng", "bi"], icon: "i-recon", tone: "", tag: "Finance data", title: "Financial reconciliation models",
    text: "Turned monthly processor reconciliation files into a clean, enriched fact table that compares internal transactions with every processor's records.",
    how: ["Mapped raw spreadsheet layouts into staging with full and incremental loads", "Synced file shares with cloud storage and automated each month's intake", "Per-processor matching, fee and FX rules feeding a processor-economics dashboard", "Completeness monitoring with alerts on late or broken files"],
    tech: ["PostgreSQL", "Python", "AWS S3", "Tableau"] },
  { cat: ["eng"], icon: "i-cloud", tone: "violet", tag: "Data platform", title: "Cloud migration & orchestration",
    text: "Moved legacy databases and workflows onto a cloud Postgres warehouse and a modern orchestrator, without breaking downstream reports.",
    how: ["Raw → staging → warehouse layering standard", "Rebuilt ingestion with merge logic, typed keys and config-driven parameters", "Ported every active workflow and verified each end to end before cut-over", "Repointed Tableau flows, sources and workbooks after schema changes"],
    tech: ["AWS Aurora", "Kestra", "Prefect", "Airbyte", "Git"] },
  { cat: ["eng"], icon: "i-api", tone: "amber", tag: "Ingestion", title: "Third-party API integrations",
    text: "Connected HR and recruiting, crypto custody, banking, market intelligence, project tracking and FX-rate APIs to the warehouse.",
    how: ["API discovery: auth, endpoints, grain and rate limits", "Python loaders with retries, pagination and incremental windows", "Typed dimensional models with access controls", "Security review of secrets and tokens before go-live"],
    tech: ["Python", "REST", "OAuth / JWT", "Kafka"] },
  { cat: ["eng", "bi"], icon: "i-mega", tone: "", tag: "Marketing", title: "Unified marketing data platform",
    text: "Combined Google Analytics 4, Meta Ads, LinkedIn Ads and Google Ads into one join-ready model, replacing four platform logins with one source.",
    how: ["Daily ingestion per platform with freshness and row-count checks", "Cross-source KPI model agreed with the marketing team", "Unified Tableau dashboard across all paid channels", "Lead-generation datasets enriched from public directories"],
    tech: ["GA4 API", "Meta API", "Google Ads API", "dbt", "Tableau"] },
  { cat: ["eng"], icon: "i-shield", tone: "violet", tag: "Reliability", title: "Data quality & alerting frameworks",
    text: "An in-house data-quality engine inside the warehouse, comparable in scope to commercial DQ tools, plus a SQL-driven business alert module.",
    how: ["Catalogue-driven checks: register once, generate automatically", "Freshness, volume, schema-drift and statistical-baseline checks", "Incident lifecycle with de-duplication, snooze and digest", "Delivery to Slack, Telegram and email"],
    tech: ["PL/pgSQL", "Python", "Prefect", "Slack API"] },
  { cat: ["eng"], icon: "i-bot", tone: "amber", tag: "Automation", title: "Report automation & chat bots",
    text: "A scheduled report engine and a Telegram bot that answers volume and conversion questions on demand.",
    how: ["Config tables for reports, schedules, channels and templates", "Retries, crash recovery and execution history", "PDF, CSV and message output with automatic chunking", "Bot commands for daily, month-to-date and per-merchant views"],
    tech: ["Python", "Telegram API", "Prefect", "PostgreSQL"] },
  { cat: ["bi"], icon: "i-dash", tone: "", tag: "Business intelligence", title: "Tableau development & administration",
    text: "Owned the Tableau estate: executive, sales, customer-success and finance dashboards, custom viz extensions and platform health.",
    how: ["Drill-downs, dynamic measures, parameters and exports", "Centralised row-level security with scripted sync", "Custom viz extensions for web-app-grade interactivity", "Usage and performance monitoring; refresh fallbacks via REST API"],
    tech: ["Tableau Cloud", "Tableau Prep", "Extensions API", "JavaScript"] },
  { cat: ["eng", "bi"], icon: "i-coins", tone: "violet", tag: "Treasury", title: "Treasury & banking data",
    text: "Automated liquidity and crypto-wallet reconciliation reporting from banking and custody sources.",
    how: ["Banking API integrations streamed through Kafka", "Wallet reconciliation and ledger classification", "Daily balance snapshots, flows and per-asset views", "Accounting-ready exports for finance"],
    tech: ["Kafka", "Python", "PostgreSQL", "Tableau"] },
  { cat: ["ai"], icon: "i-brain", tone: "amber", tag: "AI / ML", title: "Machine learning & LLM applications",
    text: "Forecasting, recommendation and language-model projects that turn transactional and market data into decisions.",
    how: ["LightGBM volume and approval-rate forecasts with a sparse-data fallback", "Processor-ranking engine exposed through an MCP server", "Self-hosted LLM news sentiment (vLLM + Gemma)", "RAG market analyst pairing price history with news"],
    tech: ["LightGBM", "scikit-learn", "MCP", "vLLM", "RAG"] },
  { cat: ["eng"], icon: "i-tool", tone: "", tag: "Developer tooling", title: "Open-source & internal tooling",
    text: "Small, reusable tools that make each new pipeline faster to build and easier to watch.",
    how: ["easy-cherry on PyPI: one-line Slack and email alerts", "Jira bulk-ticket generator driven by database inputs", "FX algorithm that finds the worst currency-conversion paths", "Config-driven connectors with auth, pagination and back-off"],
    tech: ["Python", "PyPI", "Jira API", "GitLab CI"] },
  { cat: ["ai", "strategy"], icon: "i-chart", tone: "violet", tag: "Forecasting", title: "Long-range forecasting & scenario models",
    text: "Revenue forecasts up to 30 years ahead and sales-pipeline tools with up to USD 30M/year in revenue impact.",
    how: ["Switchable assumptions for base, upside and downside cases", "Sensitivity views showing how each driver moves the forecast", "Model reconciliation and documentation for hand-over", "Automated chart-to-report generation for client packs"],
    tech: ["Excel", "VBA", "Python", "Power BI"] },
  { cat: ["strategy"], icon: "i-oil", tone: "amber", tag: "Strategy", title: "Oil & gas M&A and technology strategy",
    text: "End-to-end M&A strategy pipelines, competitor benchmarking and technology landscapes for major energy corporations.",
    how: ["Acquisition target, partner and vendor screening", "Competitor portfolio benchmarking across global players", "Patent analytics, readiness and similarity studies", "Market sizing and PESTLE from research, SME interviews and surveys"],
    tech: ["Patent analytics", "PESTLE", "Benchmarking", "Simulation"] },
  { cat: ["bi"], icon: "i-support", tone: "", tag: "Stakeholders", title: "Business data support",
    text: "Fast-turnaround backend support for account management, sales, finance and leadership.",
    how: ["Ad-hoc analyses and data extracts", "Dashboard fixes, new measures and new views", "Access and row-level security set-up", "Walkthroughs for new dashboard users"],
    tech: ["SQL", "Tableau", "Excel"] },
];

/* ------------------------------------------------------------------ labs: SVG art */
const ART = {
  routing: `<svg viewBox="0 0 120 120"><rect x="0" y="0" width="120" height="120" class="fb"/>
    <g class="nf sl" stroke-width="1.2"><path d="M60 22 L32 50 M60 22 L88 50 M32 50 L20 76 M32 50 L44 76 M88 50 L76 76 M88 50 L100 76"/></g>
    <circle cx="60" cy="22" r="7" class="fv"/><circle cx="32" cy="50" r="6" class="fc"/><circle cx="88" cy="50" r="6" class="fc"/>
    <circle cx="20" cy="76" r="5" class="fl"/><circle cx="44" cy="76" r="5" class="fa"/><circle cx="76" cy="76" r="5" class="fl"/><circle cx="100" cy="76" r="5" class="fl"/>
    <rect x="16" y="92" width="58" height="6" rx="3" class="fc"/><rect x="16" y="102" width="40" height="6" rx="3" class="fv"/><rect x="78" y="92" width="26" height="6" rx="3" class="fl"/></svg>`,
  news: `<svg viewBox="0 0 120 120"><rect width="120" height="120" class="fb"/>
    <rect x="14" y="18" width="52" height="64" rx="6" class="fs sl"/><rect x="22" y="28" width="36" height="5" rx="2" class="fl"/><rect x="22" y="38" width="30" height="4" rx="2" class="fl"/><rect x="22" y="47" width="34" height="4" rx="2" class="fl"/><rect x="22" y="56" width="24" height="4" rx="2" class="fl"/>
    <path d="M70 92 A24 24 0 0 1 106 72" class="nf sr" stroke-width="7" stroke-linecap="round"/>
    <path d="M73 78 A24 24 0 0 1 98 54" class="nf" stroke-width="0"/>
    <path d="M106 72 A24 24 0 0 1 106 92" class="nf sc" stroke-width="7" stroke-linecap="round"/>
    <path d="M88 92 L100 70" class="st" stroke-width="2.5" stroke-linecap="round"/><circle cx="88" cy="92" r="4" class="ft"/>
    <text x="60" y="112" text-anchor="middle" class="svg-t fm" font-size="10">LLM sentiment</text></svg>`,
  candles: `<svg viewBox="0 0 120 120"><rect width="120" height="120" class="fb"/>
    <g stroke-width="1.5">
      <line x1="20" y1="40" x2="20" y2="80" class="sm"/><rect x="16" y="50" width="8" height="20" class="fr"/>
      <line x1="36" y1="34" x2="36" y2="72" class="sm"/><rect x="32" y="42" width="8" height="20" class="fc"/>
      <line x1="52" y1="28" x2="52" y2="62" class="sm"/><rect x="48" y="34" width="8" height="18" class="fc"/>
      <line x1="68" y1="34" x2="68" y2="70" class="sm"/><rect x="64" y="40" width="8" height="16" class="fr"/>
      <line x1="84" y1="22" x2="84" y2="58" class="sm"/><rect x="80" y="26" width="8" height="22" class="fc"/>
    </g>
    <path d="M84 26 L102 14" class="nf sa" stroke-width="2" stroke-dasharray="3 3"/>
    <rect x="58" y="84" width="50" height="22" rx="8" class="fas"/><text x="83" y="99" text-anchor="middle" class="svg-t fa">news ↗</text>
    <text x="30" y="100" text-anchor="middle" class="svg-t fm">OHLC</text></svg>`,
  crawl: `<svg viewBox="0 0 120 120"><rect width="120" height="120" class="fb"/>
    <circle cx="30" cy="34" r="16" class="nf sc" stroke-width="1.5"/><path d="M14 34h32M30 18c-6 8-6 24 0 32M30 18c6 8 6 24 0 32" class="nf sc" stroke-width="1.2"/>
    <path class="flow nf sv" stroke-width="1.6" d="M48 40 C62 40 62 60 72 60"/>
    <rect x="66" y="48" width="44" height="54" rx="6" class="fs sl"/>
    <g class="fl"><rect x="72" y="56" width="32" height="5" rx="2"/><rect x="72" y="66" width="32" height="5" rx="2"/><rect x="72" y="76" width="32" height="5" rx="2"/><rect x="72" y="86" width="20" height="5" rx="2"/></g>
    <rect x="72" y="56" width="12" height="5" rx="2" class="fa"/>
    <text x="30" y="80" text-anchor="middle" class="svg-t fm">regex</text><text x="30" y="94" text-anchor="middle" class="svg-t fv">+ local LLM</text></svg>`,
  cherry: `<svg viewBox="0 0 120 120"><rect width="120" height="120" class="fb"/>
    <path d="M60 22 C58 40 46 52 40 62 M60 22 C66 40 74 50 80 60" class="nf sc" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M60 22 C70 14 84 16 88 24 C78 28 68 28 60 22z" class="fc"/>
    <circle cx="40" cy="74" r="14" class="fr"/><circle cx="80" cy="72" r="14" class="fr"/>
    <circle cx="35" cy="69" r="3" fill="#fff" opacity=".55"/><circle cx="75" cy="67" r="3" fill="#fff" opacity=".55"/>
    <text x="60" y="108" text-anchor="middle" class="svg-t fm">notify()</text></svg>`,
  fx: `<svg viewBox="0 0 120 120"><rect width="120" height="120" class="fb"/>
    <g class="nf sl" stroke-width="1.5"><path d="M24 30 L96 30 M24 30 L60 90 M96 30 L60 90 M24 30 L96 90 M96 30 L24 90"/></g>
    <path d="M24 30 L60 90 L96 30" class="nf sr" stroke-width="3" stroke-linejoin="round"/>
    <g class="svg-t"><circle cx="24" cy="30" r="12" class="fs sc"/><text x="24" y="34" text-anchor="middle" class="ft">€</text>
    <circle cx="96" cy="30" r="12" class="fs sc"/><text x="96" y="34" text-anchor="middle" class="ft">$</text>
    <circle cx="60" cy="90" r="12" class="fs sr"/><text x="60" y="94" text-anchor="middle" class="ft">£</text>
    <circle cx="24" cy="90" r="9" class="fs sl"/><circle cx="96" cy="90" r="9" class="fs sl"/></g></svg>`,
  jira: `<svg viewBox="0 0 120 120"><rect width="120" height="120" class="fb"/>
    <rect x="16" y="22" width="40" height="18" rx="4" class="fs sl"/><rect x="16" y="46" width="40" height="18" rx="4" class="fs sl"/><rect x="16" y="70" width="40" height="18" rx="4" class="fs sl"/>
    <g class="fl"><rect x="22" y="29" width="22" height="4" rx="2"/><rect x="22" y="53" width="26" height="4" rx="2"/><rect x="22" y="77" width="18" height="4" rx="2"/></g>
    <path class="flow nf sa" stroke-width="1.6" d="M58 55 L72 55"/>
    <g transform="translate(74,30)"><rect width="34" height="12" rx="3" class="fcs sc"/><rect y="16" width="34" height="12" rx="3" class="fcs sc"/><rect y="32" width="34" height="12" rx="3" class="fcs sc"/><rect y="48" width="34" height="12" rx="3" class="fvs sv"/></g>
    <text x="36" y="106" text-anchor="middle" class="svg-t fm">DB rows</text><text x="91" y="106" text-anchor="middle" class="svg-t fm">tickets</text></svg>`,
};
const LABS = [
  { art: "routing", meta: "Python · LightGBM · MCP", title: "Payment intelligence & processor recommendation engine",
    text: "Gradient-boosted models forecast volume and approval rates per merchant, with a median fallback for sparse merchants. The output ranks payment processors for human routing decisions and is exposed to analysts as MCP-server tools (weekly summary, amount, currency, processor ranking)." },
  { art: "news", meta: "PostgreSQL · vLLM · Gemma", title: "Financial news warehouse with LLM sentiment",
    text: "A multi-source news warehouse (FNSPID + Yahoo Finance RSS) with full MRR → STG → DIM → DWH pipelines, plus a self-hosted LLM sentiment layer on a local GPU. Research on how fast news is priced in over three decades using HAR-RV regression." },
  { art: "candles", meta: "MBA final-year project · RAG", title: "Commodity & equity market prediction platform",
    text: "A RAG application over 26 years of daily OHLC data matched to financial news, plus an interactive analyst with a 14/20/30-day lookback that fetches recent headlines and predicts movement for any crude, metals, commodity or equity ticker." },
  { art: "crawl", meta: "Python · LM Studio · Power BI", title: "LLM-assisted company data extraction",
    text: "Crawls company websites and extracts structured contact data with a hybrid regex + local LLM approach, so accuracy is high and there is no API cost. Results feed Power BI and Excel dashboards." },
  { art: "cherry", meta: "Python · open source", title: "easy-cherry — one-line alerting library", link: "https://pypi.org/project/easy-cherry/",
    text: "Published on PyPI. Sends Slack and email notifications in one function call, cutting the observability set-up for a new ETL job from roughly 20 lines to 1." },
  { art: "fx", meta: "Python · graph algorithms", title: "FX worst-path detection",
    text: "Analyses historical exchange rates to find the most expensive currency-conversion paths, so treasury can see where conversion costs leak." },
  { art: "jira", meta: "Python · Jira API", title: "Database-driven Jira automation",
    text: "Generates Jira tickets in bulk from database inputs and anomalies, keeping project tracking in step with what the data shows." },
];

/* ------------------------------------------------------------------ independent BI projects (thumb SVGs) */
const DRIVE = "https://drive.google.com/drive/folders/1OeIGMOWMcBud5BNxnPmTUhbOQih-53Tg";
const THUMB = {
  sales: `<svg viewBox="0 0 200 130" preserveAspectRatio="none"><polyline points="10,100 40,86 70,90 100,66 130,60" class="nf sc" stroke-width="3"/><polyline points="130,60 160,46 190,34" class="nf sa" stroke-width="3" stroke-dasharray="6 5"/><path d="M130 60 L190 22 L190 50z" class="fas"/><circle cx="130" cy="60" r="4" class="fc"/></svg>`,
  crypto: `<svg viewBox="0 0 200 130"><g stroke-width="2"><line x1="30" y1="40" x2="30" y2="100" class="sm"/><rect x="24" y="56" width="12" height="30" class="fc"/><line x1="60" y1="30" x2="60" y2="90" class="sm"/><rect x="54" y="40" width="12" height="34" class="fr"/><line x1="90" y1="44" x2="90" y2="104" class="sm"/><rect x="84" y="54" width="12" height="28" class="fc"/><line x1="120" y1="24" x2="120" y2="80" class="sm"/><rect x="114" y="30" width="12" height="36" class="fc"/></g><circle cx="165" cy="58" r="22" class="fas sa" stroke-width="2"/><text x="165" y="65" text-anchor="middle" class="fa" font-size="22" font-weight="700">₿</text></svg>`,
  health: `<svg viewBox="0 0 200 130"><polyline points="10,70 50,70 62,40 76,98 90,56 100,70 190,70" class="nf sr" stroke-width="3" stroke-linejoin="round"/><g class="fvs"><rect x="120" y="86" width="14" height="30" rx="3"/><rect x="140" y="76" width="14" height="40" rx="3"/><rect x="160" y="92" width="14" height="24" rx="3"/></g></svg>`,
  ecom: `<svg viewBox="0 0 200 130"><circle cx="60" cy="65" r="34" class="nf sl" stroke-width="16"/><circle cx="60" cy="65" r="34" class="nf sa" stroke-width="16" stroke-dasharray="120 214" transform="rotate(-90 60 65)"/><circle cx="60" cy="65" r="34" class="nf sc" stroke-width="16" stroke-dasharray="60 214" stroke-dashoffset="-120" transform="rotate(-90 60 65)"/><g class="fc"><rect x="118" y="78" width="12" height="32" rx="2"/><rect x="136" y="60" width="12" height="50" rx="2"/><rect x="154" y="44" width="12" height="66" rx="2"/><rect x="172" y="30" width="12" height="80" rx="2"/></g></svg>`,
  food: `<svg viewBox="0 0 200 130"><g class="fa"><path d="M30 30l5 10 11 1-8 7 3 11-11-6-10 6 3-11-8-7 11-1z"/><path d="M62 30l5 10 11 1-8 7 3 11-11-6-10 6 3-11-8-7 11-1z"/><path d="M94 30l5 10 11 1-8 7 3 11-11-6-10 6 3-11-8-7 11-1z"/><path d="M126 30l5 10 11 1-8 7 3 11-11-6-10 6 3-11-8-7 11-1z" opacity=".35"/></g><g class="fc"><circle cx="40" cy="96" r="5"/><circle cx="70" cy="88" r="8"/><circle cx="104" cy="100" r="6"/><circle cx="140" cy="90" r="10"/><circle cx="172" cy="100" r="4"/></g></svg>`,
  model: `<svg viewBox="0 0 200 130" preserveAspectRatio="none"><path d="M10 110 L60 90 L110 74 L160 54 L190 40 L190 70 L160 80 L110 90 L60 100 L10 112z" class="fvs"/><path d="M10 110 L60 86 L110 64 L160 36 L190 18" class="nf sa" stroke-width="2" stroke-dasharray="5 4"/><path d="M10 110 L60 90 L110 76 L160 60 L190 50" class="nf sv" stroke-width="3"/><text x="16" y="24" class="svg-t fm">base · upside · downside</text></svg>`,
  startup: `<svg viewBox="0 0 200 130"><line x1="100" y1="12" x2="100" y2="118" class="sl" stroke-width="1.5"/><line x1="20" y1="65" x2="180" y2="65" class="sl" stroke-width="1.5"/><circle cx="140" cy="36" r="14" class="fas sa" stroke-width="2"/><circle cx="62" cy="40" r="9" class="fcs sc" stroke-width="2"/><circle cx="150" cy="94" r="7" class="fvs sv" stroke-width="2"/><circle cx="60" cy="92" r="6" class="fl"/><path d="M140 26 s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z" class="fa"/></svg>`,
  auto: `<svg viewBox="0 0 200 130"><path d="M30 92 h110 a6 6 0 0 0 6-6 v-12 l-18-6 -14-16 h-46 l-18 18 h-14 a6 6 0 0 0-6 6 v10 a6 6 0 0 0 6 6z" class="fcs sc" stroke-width="2"/><circle cx="58" cy="94" r="10" class="fs st" stroke-width="2"/><circle cx="120" cy="94" r="10" class="fs st" stroke-width="2"/><path d="M150 58 C162 52 172 40 184 22" class="nf sa" stroke-width="3"/><path d="M176 22 h8 v8" class="nf sa" stroke-width="3"/></svg>`,
};
const BI = [
  { t: "sales", badge: "Power BI", title: "Sales analysis with forecasting", text: "Trend analysis, forecasting models and interactive drill-downs for sales decisions." },
  { t: "crypto", badge: "Power BI", title: "Crypto market trends", text: "Price movement, volume trends and sentiment indicators across major coins." },
  { t: "health", badge: "Power BI", title: "Healthcare operations", text: "Patient metrics, treatment outcomes and operational efficiency KPIs." },
  { t: "ecom", badge: "Power BI", title: "E-commerce performance", text: "Product performance, customer reviews and sales metrics for an online marketplace." },
  { t: "food", badge: "Power BI", title: "Restaurant market analysis", text: "Ratings, cuisine trends, price bands and location insights." },
  { t: "model", badge: "Excel", title: "30-year financial forecast model", text: "Revenue projected up to 30 years ahead with switchable scenarios." },
  { t: "startup", badge: "Case study", title: "Oil & gas startup opportunities", text: "Opportunity mapping and market-entry recommendations for the oil and gas sector." },
  { t: "auto", badge: "Research", title: "Automotive sector 5-year outlook", text: "Industry trends, EV adoption and growth projections." },
];

/* ------------------------------------------------------------------ skills */
const SKILLS = [
  { icon: "i-db", tone: "", title: "Warehousing & cloud", items: ["PostgreSQL", "AWS Aurora", "AWS S3", "AWS Lambda", "Stored procedures", "Dimensional modelling", "Docker"] },
  { icon: "i-pipe", tone: "violet", title: "Pipelines & orchestration", items: ["dbt", "Airbyte", "Prefect", "Kestra", "Apache Airflow", "Kafka", "REST APIs", "Incremental loads"] },
  { icon: "i-dash", tone: "amber", title: "BI & visualisation", items: ["Tableau", "Tableau viz extensions", "Power BI", "Looker", "Metabase", "Excel / VBA", "Row-level security"] },
  { icon: "i-code", tone: "", title: "Languages", items: ["SQL", "Python", "pandas", "NumPy", "R", "VBA", "JavaScript"] },
  { icon: "i-brain", tone: "violet", title: "ML, AI & LLMs", items: ["scikit-learn", "LightGBM", "Forecasting", "Anomaly detection", "vLLM", "Gemma", "LM Studio", "MCP servers", "RAG"] },
  { icon: "i-rocket", tone: "amber", title: "Delivery & automation", items: ["Git", "GitLab CI/CD", "GitHub Actions", "Slack API", "Telegram API", "Jira API", "Email automation"] },
  { icon: "i-search", tone: "", title: "Strategy & analytics", items: ["M&A strategy", "Competitor benchmarking", "Patent analytics", "PESTLE", "P&L analysis", "Sales simulation"] },
];

/* ------------------------------------------------------------------ render */
const $ = (s) => document.querySelector(s);

$("#types").innerHTML = TYPES.map((t, i) => `
  <article class="card type tilt reveal" data-cat="${t.cat.join(" ")}" data-i="${i}" tabindex="0" role="button" aria-label="Open case: ${t.title}">
    <span class="tag">${String(i + 1).padStart(2, "0")} · ${t.tag}</span>
    <div class="ico ${t.tone}">${ic(t.icon)}</div>
    <h3>${t.title}</h3>
    <p>${t.text}</p>
    <div class="chips">${t.tech.map((c) => `<span class="chip">${c}</span>`).join("")}</div>
    <span class="open">Open case ${ic("i-chev")}</span>
  </article>`).join("");

$("#labsGrid").innerHTML = LABS.map((l) => `
  <article class="card lab tilt reveal">
    <div class="art" aria-hidden="true">${ART[l.art]}</div>
    <div>
      <div class="meta">${l.meta}</div>
      <h3>${l.title}</h3>
      <p>${l.text}</p>
      ${l.link ? `<a class="link" href="${l.link}" target="_blank" rel="noopener">View on PyPI ${ic("i-ext")}</a>` : ""}
    </div>
  </article>`).join("");

$("#biGrid").innerHTML = BI.map((b) => `
  <article class="card bi tilt reveal">
    <div class="thumb" aria-hidden="true">${THUMB[b.t]}</div>
    <div class="body">
      <span class="badge">${b.badge}</span>
      <h3>${b.title}</h3>
      <p>${b.text}</p>
      <a class="link" href="${DRIVE}" target="_blank" rel="noopener">View project ${ic("i-ext")}</a>
    </div>
  </article>`).join("");

$("#skillsGrid").innerHTML = SKILLS.map((s) => `
  <article class="card skill reveal">
    <h3><span class="ico ${s.tone}">${ic(s.icon)}</span>${s.title}</h3>
    <div class="chips">${s.items.map((c) => `<span class="chip">${c}</span>`).join("")}</div>
  </article>`).join("");

/* hero stat: project-type count stays in sync with the data */
const typeStat = document.querySelector('.stat b[data-suffix=""]');
if (typeStat) { typeStat.dataset.count = TYPES.length; typeStat.textContent = TYPES.length; }

/* ------------------------------------------------------------------ behaviour */
document.getElementById("year").textContent = new Date().getFullYear();

// filters
document.querySelectorAll(".filter").forEach((b) => b.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach((x) => x.classList.toggle("active", x === b));
  const f = b.dataset.filter;
  document.querySelectorAll(".type").forEach((c, k) => {
    c.classList.toggle("hide", f !== "all" && !c.dataset.cat.split(" ").includes(f));
    c.style.animation = "none"; void c.offsetWidth; c.style.animation = ""; c.style.animationDelay = (k % 6) * 0.04 + "s";
  });
}));

// theme
const themeBtn = $("#themeBtn");
const setThemeIcon = () => {
  const light = document.documentElement.dataset.theme === "light";
  themeBtn.innerHTML = ic(light ? "i-moon" : "i-sun");
};
setThemeIcon();
themeBtn.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
  setThemeIcon();
});

// mobile menu
const menuBtn = $("#menuBtn"), links = $("#navLinks");
menuBtn.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.innerHTML = ic(open ? "i-close" : "i-menu");
});
links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { links.classList.remove("open"); menuBtn.innerHTML = ic("i-menu"); }));

// nav border + active link
const nav = $("#nav");
const sections = [...document.querySelectorAll("main section[id]")];
const onScroll = () => {
  nav.classList.toggle("scrolled", window.scrollY > 10);
  let cur = "";
  sections.forEach((s) => { if (s.getBoundingClientRect().top < 140) cur = s.id; });
  links.querySelectorAll("a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
};
window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

// typing role
const roles = ["Data Engineer", "BI Developer", "Analytics Engineer", "Tableau Specialist", "Forecasting & ML Builder"];
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduce) {
  let r = 0, i = roles[0].length, del = true;
  const el = $("#role");
  const tick = () => {
    const w = roles[r];
    i += del ? -1 : 1;
    el.textContent = w.slice(0, i);
    let d = del ? 45 : 85;
    if (!del && i === w.length) { del = true; d = 1800; }
    else if (del && i === 0) { del = false; r = (r + 1) % roles.length; d = 300; }
    setTimeout(tick, d);
  };
  setTimeout(tick, 2200);
}

// reveal + counters
const io = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in");
  io.unobserve(e.target);
}), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

if (!reduce) {
  document.querySelectorAll(".stat b[data-count]").forEach((b) => {
    const end = +b.dataset.count, pre = b.dataset.prefix || "", suf = b.dataset.suffix || "";
    let n = 0; const step = Math.max(1, Math.ceil(end / 30));
    const run = () => { n = Math.min(end, n + step); b.textContent = pre + n + suf; if (n < end) requestAnimationFrame(run); };
    b.textContent = pre + "0" + suf; setTimeout(run, 400);
  });
}


/* ==================================================================
   v3 interaction layer
   ================================================================== */
const toast = (msg) => { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove("show"), 2200); };
const sleep = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));

/* tech marquee */
const TECH = [["PostgreSQL", "#38e1c6"], ["AWS Aurora", "#ffb547"], ["dbt", "#ff6b8b"], ["Airbyte", "#8b7cff"], ["Prefect", "#38e1c6"], ["Kestra", "#8b7cff"], ["Airflow", "#ffb547"], ["Kafka", "#a9b3c9"], ["Python", "#ffb547"], ["SQL", "#38e1c6"], ["Tableau", "#8b7cff"], ["Power BI", "#ffb547"], ["Looker", "#38e1c6"], ["LightGBM", "#ff6b8b"], ["vLLM", "#8b7cff"], ["MCP", "#38e1c6"], ["Docker", "#38e1c6"], ["GitLab CI", "#ff6b8b"], ["Slack API", "#8b7cff"], ["Telegram API", "#38e1c6"]];
const chipsHtml = TECH.map(([t, c]) => `<span style="--c:${c}">${t}</span>`).join("");
$("#marquee").innerHTML = chipsHtml + chipsHtml;

/* ---------------- scroll: progress bar, back-to-top, timeline line ---------------- */
const tl = document.querySelector(".timeline");
const onScroll2 = () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  $("#progress").style.width = (scrollY / h) * 100 + "%";
  $("#toTop").classList.toggle("show", scrollY > 700);
  if (tl) { const r = tl.getBoundingClientRect(); const p = Math.min(1, Math.max(0, (innerHeight * 0.75 - r.top) / r.height)); tl.style.setProperty("--tl", p); }
};
addEventListener("scroll", onScroll2, { passive: true }); onScroll2();
$("#toTop").addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

/* ---------------- cursor glow + card tilt + ripple ---------------- */
const glow = $("#glow");
addEventListener("pointermove", (e) => { if (e.pointerType !== "mouse") return; glow.style.opacity = 1; glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; }, { passive: true });
if (!reduce) document.querySelectorAll(".tilt").forEach((c) => {
  c.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 6}deg) translateY(-4px)`;
  });
  c.addEventListener("pointerleave", () => { c.style.transform = ""; });
});
document.addEventListener("click", (e) => {
  const b = e.target.closest(".btn, .run-btn, .tab, .range, .filter");
  if (!b || reduce) return;
  const r = b.getBoundingClientRect(), d = Math.max(r.width, r.height), s = document.createElement("span");
  s.className = "ripple"; s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
  if (getComputedStyle(b).position === "static") b.style.position = "relative";
  b.style.overflow = "hidden"; b.appendChild(s); setTimeout(() => s.remove(), 650);
});

/* ---------------- copy email ---------------- */
$("#copyEmail").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText("vinaykr.me@gmail.com"); toast("Email copied: vinaykr.me@gmail.com"); }
  catch (e) { toast("vinaykr.me@gmail.com"); }
});

/* ---------------- project modal ---------------- */
const modal = $("#modal"); let mIdx = 0, lastFocus = null;
const openModal = (i) => {
  mIdx = (i + TYPES.length) % TYPES.length; const t = TYPES[mIdx];
  $("#mIco").className = "ico " + t.tone; $("#mIco").innerHTML = ic(t.icon);
  $("#mTag").textContent = `${String(mIdx + 1).padStart(2, "0")} / ${TYPES.length} · ${t.tag}`;
  $("#mTitle").textContent = t.title; $("#mText").textContent = t.text;
  $("#mSteps").innerHTML = t.how.map((h, k) => `<div class="step" style="animation-delay:${k * 0.07}s"><b>${String(k + 1).padStart(2, "0")}</b><span>${h}</span></div>`).join("");
  $("#mTech").innerHTML = t.tech.map((c) => `<span class="chip">${c}</span>`).join("");
  if (modal.hidden) { lastFocus = document.activeElement; modal.hidden = false; document.body.style.overflow = "hidden"; }
  $("#mClose").focus();
};
const closeModal = () => { modal.hidden = true; document.body.style.overflow = ""; lastFocus && lastFocus.focus(); };
document.querySelectorAll(".type").forEach((c) => {
  c.addEventListener("click", () => openModal(+c.dataset.i));
  c.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(+c.dataset.i); } });
});
$("#mClose").addEventListener("click", closeModal);
$("#mPrev").addEventListener("click", () => openModal(mIdx - 1));
$("#mNext").addEventListener("click", () => openModal(mIdx + 1));
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => {
  if (modal.hidden) return;
  if (e.key === "Escape") closeModal(); if (e.key === "ArrowRight") openModal(mIdx + 1); if (e.key === "ArrowLeft") openModal(mIdx - 1);
});

/* ---------------- runnable hero pipeline ---------------- */
const logEl = $("#log"), runBtn = $("#runBtn"), runStatus = $("#runStatus");
const stamp = () => new Date().toTimeString().slice(0, 8);
const log = (html) => { logEl.insertAdjacentHTML("beforeend", `\n<span class="c">${stamp()}</span> ${html}`); logEl.scrollTop = logEl.scrollHeight; };
const lit = (id, on = true) => { const el = document.getElementById(id); if (el) el.classList.toggle("lit", on); };
const packets = $("#packets");
const sendPacket = (path, cls = "fc", dur = 900) => new Promise((res) => {
  if (reduce) return res();
  const len = path.getTotalLength(), c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  c.setAttribute("r", 4.5); c.setAttribute("class", cls); packets.appendChild(c);
  const t0 = performance.now();
  const step = (now) => {
    const k = Math.min(1, (now - t0) / dur), p = path.getPointAtLength(len * k);
    c.setAttribute("cx", p.x); c.setAttribute("cy", p.y);
    if (k < 1) requestAnimationFrame(step); else { c.remove(); res(); }
  };
  requestAnimationFrame(step);
});
const NODE_INFO = {
  src: '<span class="v">sources</span> REST APIs (ads, HRIS, banking, custody), Postgres replicas, S3 files and exchange rates',
  orch: '<span class="v">orchestrator</span> Prefect / Kestra flows with schedules, retries, run tracking and a test/prod switch',
  wh: '<span class="v">warehouse</span> Aurora PostgreSQL · MRR → STG → DIM → FACT with stored procedures and incremental loads',
  dash: '<span class="v">BI</span> Tableau dashboards and viz extensions with row-level security for leadership, sales and finance',
  alert: '<span class="v">alerts</span> catalogue-driven DQ checks + anomaly detection → Slack, email and Telegram',
  ml: '<span class="v">ML</span> LightGBM forecasts and a processor-ranking MCP server; LLM news sentiment in the lab',
};
document.querySelectorAll(".pnode").forEach((n) => n.addEventListener("click", () => {
  const id = n.id; lit(id); setTimeout(() => lit(id, false), 900); log(NODE_INFO[n.dataset.node]);
}));
let running = false;
runBtn.addEventListener("click", async () => {
  if (running) return; running = true; runBtn.disabled = true;
  runStatus.className = "status running"; runStatus.innerHTML = "<i></i> running";
  const t0 = performance.now();
  log('<span class="w">▶</span> flow <span class="v">daily-warehouse</span> started · retries=3');
  lit("p-src");
  await Promise.all([...document.querySelectorAll("#p-in path")].map((p, i) => sleep(i * 90).then(() => sendPacket(p, "fc", 800))));
  log('<span class="ok">✓</span> extract · 5 sources pulled incrementally'); lit("p-src", false);
  lit("p-orch"); await sendPacket($("#p-mid"), "fv", 450); lit("p-orch", false);
  const layers = [["l-mrr", "MRR · raw rows landed"], ["l-stg", "STG · typed, de-duplicated"], ["l-dim", "DIM · conformed and keyed"], ["l-fact", "FACT · published for BI"]];
  for (const [id, msg] of layers) { lit(id); await sleep(380); log(`<span class="ok">✓</span> ${msg}`); lit(id, false); }
  const outs = [...document.querySelectorAll("#p-out path")];
  await Promise.all([sendPacket(outs[0], "fa", 700), sendPacket(outs[1], "fc", 700), sendPacket(outs[2], "fv", 700)]);
  ["p-dash", "p-alert", "p-ml"].forEach((id) => lit(id));
  log('<span class="ok">✓</span> dashboards refreshed · forecast updated');
  log('<span class="w">!</span> DQ: 1 anomaly found · sent to <span class="v">#data-alerts</span>');
  await sleep(700); ["p-dash", "p-alert", "p-ml"].forEach((id) => lit(id, false));
  const secs = ((performance.now() - t0) / 1000).toFixed(1);
  log(`<span class="ok">■ success</span> in ${secs}s`);
  runStatus.className = "status ok"; runStatus.innerHTML = "<i></i> success";
  running = false; runBtn.disabled = false;
});

/* ---------------- live demo dashboard (synthetic data) ---------------- */
const NS = "http://www.w3.org/2000/svg";
let seed = 7;
const rand = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
const fmt = (v, kind) => kind === "eur" ? "€" + (v >= 1e6 ? (v / 1e6).toFixed(2) + "M" : (v / 1e3).toFixed(1) + "K")
  : kind === "pct" ? v.toFixed(kind === "pct" && v < 1 ? 2 : 1) + "%" : kind === "min" ? Math.round(v) + " min"
  : v >= 1e3 ? (v / 1e3).toFixed(1) + "K" : String(Math.round(v));
const VIEWS = {
  payments: {
    kpis: [["Volume", 2.4e6, "eur", 1], ["Transactions", 48e3, "n", 1], ["Approval rate", 71.4, "pct", 1], ["Chargeback rate", 0.31, "pct", -1]],
    line: ["Daily volume vs 7-day average", 80e3, "eur"], bar: ["Approval rate by method", ["Cards", "Apple Pay", "Google Pay", "Open banking", "Local APMs"], [68, 82, 79, 88, 61], "pct"],
    donut: ["Volume by region", ["EU", "UK", "MENA", "LATAM", "APAC"], [38, 21, 17, 14, 10]] },
  marketing: {
    kpis: [["Ad spend", 64e3, "eur", -1], ["Leads", 1840, "n", 1], ["Cost per lead", 34.8, "n", -1], ["ROAS", 3.6, "n", 1]],
    line: ["Leads per day vs 7-day average", 60, "n"], bar: ["Leads by channel", ["LinkedIn", "Meta", "Google Ads", "Organic", "Referral"], [520, 410, 380, 310, 220], "n"],
    donut: ["Spend mix", ["LinkedIn", "Meta", "Google Ads", "GA4 tests"], [41, 27, 26, 6]] },
  quality: {
    kpis: [["Checks run", 9600, "n", 1], ["Pass rate", 98.7, "pct", 1], ["Open incidents", 3, "n", -1], ["Median freshness", 42, "min", -1]],
    line: ["Checks passing per day", 320, "n"], bar: ["Failures by check type", ["Freshness", "Volume", "Schema drift", "Nulls", "Duplicates"], [14, 9, 4, 11, 6], "n"],
    donut: ["Tables by status", ["Healthy", "Warning", "Failing"], [86, 10, 4]] },
};
const COLORS = ["var(--cyan)", "var(--violet)", "var(--amber)", "var(--rose)", "var(--muted)"];
let view = "payments", days = 30;

const el = (tag, attrs = {}, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent && parent.appendChild(e); return e; };
const series = (n, base) => {
  const trend = (rand() - 0.35) * 0.4, out = [];
  for (let i = 0; i < n; i++) out.push(base * (1 + trend * i / n) * (1 + 0.12 * Math.sin(i / 7 * Math.PI * 2 + rand())) * (0.88 + rand() * 0.24));
  return out;
};
const spark = (vals) => { const mx = Math.max(...vals), mn = Math.min(...vals); return vals.map((v, i) => `${(i / (vals.length - 1)) * 70},${26 - ((v - mn) / (mx - mn || 1)) * 24}`).join(" "); };

function renderKpis(v) {
  $("#kpis").innerHTML = v.kpis.map(([name, base, kind, good]) => {
    const flat = kind === "pct" || kind === "min" || name.includes("per") || name === "ROAS" || name.includes("incidents");
    let val = base * (flat ? 1 : days / 30) * (kind === "pct" ? 0.97 + rand() * 0.05 : 0.9 + rand() * 0.2);
    if (kind === "pct") val = Math.min(val, 99.9);
    const delta = (rand() - 0.4) * 12, better = delta * good > 0;
    const sp = spark(series(14, 10));
    return `<div class="kpi"><small>${name}</small><b data-to="${val}" data-kind="${kind}">${fmt(0, kind)}</b>
      <em class="${better ? "up" : "down"}">${delta > 0 ? "▲" : "▼"} ${Math.abs(delta).toFixed(1)}% vs prior</em>
      <svg viewBox="0 0 70 28"><polyline points="${sp}" fill="none" stroke="${better ? "var(--cyan)" : "var(--rose)"}" stroke-width="2"/></svg></div>`;
  }).join("");
  document.querySelectorAll(".kpi b").forEach((b) => {
    const to = +b.dataset.to, kind = b.dataset.kind, t0 = performance.now();
    const step = (now) => { const k = reduce ? 1 : Math.min(1, (now - t0) / 900), e = 1 - (1 - k) ** 3; b.textContent = fmt(to * e, kind); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
}

function renderLine(v) {
  const [title, base, kind] = v.line; $("#lineTitle").textContent = title; $("#lineSub").textContent = `last ${days} days`;
  const box = $("#lineChart"); box.innerHTML = "";
  const W = 600, H = 230, P = { l: 44, r: 12, t: 12, b: 26 };
  const vals = series(days, base), ma = vals.map((_, i) => { const s = vals.slice(Math.max(0, i - 6), i + 1); return s.reduce((a, b) => a + b, 0) / s.length; });
  const mx = Math.max(...vals) * 1.08, x = (i) => P.l + (i / (days - 1)) * (W - P.l - P.r), y = (vv) => H - P.b - (vv / mx) * (H - P.t - P.b);
  const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": title }, box);
  const defs = el("defs", {}, svg), g = el("linearGradient", { id: "areaG", x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
  el("stop", { offset: 0, style: "stop-color:var(--cyan);stop-opacity:.35" }, g); el("stop", { offset: 1, style: "stop-color:var(--cyan);stop-opacity:0" }, g);
  for (let k = 0; k <= 4; k++) { const yy = P.t + k * (H - P.t - P.b) / 4; el("line", { x1: P.l, x2: W - P.r, y1: yy, y2: yy, class: "sl", "stroke-dasharray": "3 4" }, svg); const t = el("text", { x: P.l - 8, y: yy + 4, "text-anchor": "end", class: "svg-t fm" }, svg); t.textContent = fmt(mx * (1 - k / 4), kind); }
  const ticks = days <= 7 ? 7 : 5;
  for (let k = 0; k < ticks; k++) { const i = Math.round(k * (days - 1) / (ticks - 1)); const t = el("text", { x: x(i), y: H - 6, "text-anchor": "middle", class: "svg-t fm" }, svg); t.textContent = "D-" + (days - 1 - i); }
  const pts = vals.map((vv, i) => `${x(i)},${y(vv)}`).join(" ");
  el("path", { d: `M${x(0)},${H - P.b} L${vals.map((vv, k) => `${x(k)},${y(vv)}`).join(" L")} L${x(days - 1)},${H - P.b} Z`, fill: "url(#areaG)", class: "area-in" }, svg);
  const line = el("polyline", { points: pts, fill: "none", stroke: "var(--cyan)", "stroke-width": 2.5, "stroke-linejoin": "round", class: "draw" }, svg);
  const maL = el("polyline", { points: ma.map((vv, i) => `${x(i)},${y(vv)}`).join(" "), fill: "none", stroke: "var(--amber)", "stroke-width": 2, "stroke-dasharray": "6 5", class: "area-in" }, svg);
  const L = line.getTotalLength ? line.getTotalLength() : 2000; line.style.setProperty("--len", L);
  const cross = el("line", { y1: P.t, y2: H - P.b, class: "sm", "stroke-dasharray": "2 3", opacity: 0 }, svg), dot = el("circle", { r: 5, fill: "var(--cyan)", stroke: "var(--surface)", "stroke-width": 2, opacity: 0 }, svg);
  const tip = document.createElement("div"); tip.className = "tip"; box.appendChild(tip);
  const hit = el("rect", { x: P.l, y: P.t, width: W - P.l - P.r, height: H - P.t - P.b, fill: "transparent" }, svg);
  const move = (e) => {
    const r = svg.getBoundingClientRect(), px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.max(0, Math.min(days - 1, Math.round(((px - P.l) / (W - P.l - P.r)) * (days - 1))));
    cross.setAttribute("x1", x(i)); cross.setAttribute("x2", x(i)); cross.setAttribute("opacity", 1);
    dot.setAttribute("cx", x(i)); dot.setAttribute("cy", y(vals[i])); dot.setAttribute("opacity", 1);
    tip.innerHTML = `D-${days - 1 - i} · <b>${fmt(vals[i], kind)}</b> · avg ${fmt(ma[i], kind)}`;
    tip.style.left = (x(i) / W) * r.width + "px"; tip.style.top = (y(vals[i]) / H) * r.height + "px"; tip.classList.add("on");
  };
  hit.addEventListener("pointermove", move);
  hit.addEventListener("pointerleave", () => { tip.classList.remove("on"); cross.setAttribute("opacity", 0); dot.setAttribute("opacity", 0); });
}

function renderBars(v) {
  const [title, cats, base, kind] = v.bar; $("#barTitle").textContent = title;
  const box = $("#barChart"); box.innerHTML = "";
  const W = 300, H = 230, P = { l: 8, r: 8, t: 22, b: 40 }, vals = base.map((b) => b * (0.85 + rand() * 0.3) * (kind === "pct" ? 1 : days / 30));
  const mx = Math.max(...vals) * 1.1, bw = (W - P.l - P.r) / cats.length;
  const svg = el("svg", { viewBox: `0 0 ${W} ${H}` }, box);
  const tip = document.createElement("div"); tip.className = "tip"; box.appendChild(tip);
  vals.forEach((vv, i) => {
    const h = (vv / mx) * (H - P.t - P.b), xx = P.l + i * bw + bw * 0.18, yy = H - P.b - h;
    const r = el("rect", { x: xx, y: yy, width: bw * 0.64, height: h, rx: 5, fill: COLORS[i % COLORS.length], class: "barr", style: `animation-delay:${i * 0.07}s` }, svg);
    const lab = el("text", { x: xx + bw * 0.32, y: H - P.b + 15, "text-anchor": "middle", class: "svg-t fm", "font-size": 9.5 }, svg); lab.textContent = cats[i].split(" ")[0].slice(0, 8);
    const val = el("text", { x: xx + bw * 0.32, y: yy - 6, "text-anchor": "middle", class: "svg-t ft2", "font-size": 10 }, svg); val.textContent = fmt(vv, kind);
    r.addEventListener("click", () => {
      const on = !r.classList.contains("sel");
      svg.querySelectorAll(".barr").forEach((b) => { b.classList.remove("sel"); b.classList.toggle("dim", on); });
      if (on) { r.classList.add("sel"); r.classList.remove("dim"); tip.innerHTML = `${cats[i]} · <b>${fmt(vv, kind)}</b> · ${((vv / vals.reduce((a, b) => a + b, 0)) * 100).toFixed(0)}% of total`; tip.style.left = ((xx + bw * 0.32) / W) * svg.getBoundingClientRect().width + "px"; tip.style.top = (yy / H) * svg.getBoundingClientRect().height + "px"; tip.classList.add("on"); }
      else tip.classList.remove("on");
    });
  });
}

function renderDonut(v) {
  const [title, cats, base] = v.donut; $("#donutTitle").textContent = title;
  const box = $("#donutChart"); box.innerHTML = "";
  const vals = base.map((b) => b * (0.85 + rand() * 0.3)), tot = vals.reduce((a, b) => a + b, 0);
  const svg = el("svg", { viewBox: "0 0 200 200", style: "max-width:190px" }, box), R = 70, C = 2 * Math.PI * R;
  el("circle", { cx: 100, cy: 100, r: R, fill: "none", class: "sl", "stroke-width": 16 }, svg);
  const center = el("text", { x: 100, y: 96, "text-anchor": "middle", class: "svg-h ft", "font-size": 22 }, svg); center.textContent = (vals[0] / tot * 100).toFixed(0) + "%";
  const sub = el("text", { x: 100, y: 116, "text-anchor": "middle", class: "svg-t fm" }, svg); sub.textContent = cats[0];
  let off = 0;
  vals.forEach((vv, i) => {
    const len = (vv / tot) * C;
    const seg = el("circle", { cx: 100, cy: 100, r: R, fill: "none", stroke: COLORS[i % COLORS.length], "stroke-width": 16, "stroke-dasharray": `0 ${C}`, "stroke-dashoffset": -off, transform: "rotate(-90 100 100)", class: "seg" }, svg);
    setTimeout(() => { seg.style.transition = "stroke-dasharray .9s cubic-bezier(.3,1,.4,1)"; seg.setAttribute("stroke-dasharray", `${Math.max(0, len - 2)} ${C}`); }, 60 + i * 90);
    const show = () => { center.textContent = (vv / tot * 100).toFixed(0) + "%"; sub.textContent = cats[i]; };
    seg.addEventListener("pointerenter", show); seg.addEventListener("click", show);
    off += len;
  });
  const lg = document.createElement("div"); lg.className = "legend";
  lg.innerHTML = cats.map((c, i) => `<div><i style="background:${COLORS[i % COLORS.length]}"></i>${c}<b>${(vals[i] / tot * 100).toFixed(0)}%</b></div>`).join("");
  box.appendChild(lg);
}

function renderDemo() {
  const v = VIEWS[view]; renderKpis(v); renderLine(v); renderBars(v); renderDonut(v);
  $("#demoStamp").textContent = "rendered " + stamp();
}
document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => {
  view = t.dataset.view;
  document.querySelectorAll(".tab").forEach((x) => { x.classList.toggle("active", x === t); x.setAttribute("aria-selected", x === t); });
  renderDemo();
}));
document.querySelectorAll(".range[data-days]").forEach((b) => b.addEventListener("click", () => {
  days = +b.dataset.days; document.querySelectorAll(".range[data-days]").forEach((x) => x.classList.toggle("active", x === b)); renderDemo();
}));
$("#shuffle").addEventListener("click", () => { seed = Math.floor(Math.random() * 1e9); renderDemo(); toast("New synthetic data generated"); });

// render the demo when it first scrolls into view so the draw-in animation is seen
const demoIO = new IntersectionObserver((es) => { if (es[0].isIntersecting) { renderDemo(); demoIO.disconnect(); } }, { threshold: 0.2 });
demoIO.observe($("#demoBox"));
