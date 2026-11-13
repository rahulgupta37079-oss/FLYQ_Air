var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../STOREFRONT_DEPLOY/worker.js
var BILLING_PLANS = {
  "light-show": { name: "Light Show Academy", amount: 19900, env: "RAZORPAY_PLAN_LIGHT_SHOW", modules: ["light-show"] },
  swarm: { name: "Swarm Academy", amount: 19900, env: "RAZORPAY_PLAN_SWARM", modules: ["swarm"] },
  bundle: { name: "Light Show + Swarm Bundle", amount: 29900, env: "RAZORPAY_PLAN_BUNDLE", modules: ["light-show", "swarm"] }
};
var action = /* @__PURE__ */ __name((label, url, secondary = false) => `<a class="button${secondary ? " secondary" : ""}" href="${url}">${label}</a>`, "action");
var intro = /* @__PURE__ */ __name((tag, title, text) => `<section class="page-top"><div class="wrap"><p class="eyebrow">${tag}</p><h1>${title}</h1><p class="lead">${text}</p></div></section>`, "intro");
var script = '<script type="module" src="/static/brand/platform.js"><\/script>';
var status = '<p id="status" class="status" role="status" aria-live="polite"></p>';
var modules = [["01", "Flight Simulator", "50 projects. One open world.", "Manual flight, waypoint missions and Blockly programs in a 3D training environment.", "/projects", "Explore 50 projects", "Drone buyers only"], ["02", "Light Show Academy", "Write a show in the sky.", "Program drone formations, colour cues and timed transitions in a dedicated 3D world.", "/light-show", "Explore Light Show", "\u20B9199 / month"], ["03", "Swarm Academy", "Many aircraft. One mission.", "Learn formation control, leader\u2013follower motion and coordinated missions in 3D.", "/swarm", "Explore Swarm", "\u20B9199 / month"]];
function studio() {
  return layout("Three worlds. One Flight Studio.", "/flight-studio", `${intro("FLYQ FLIGHT STUDIO", "Choose your world.", "The main simulator is exclusively for verified FLYQ drone buyers. Light Show and Swarm are available to subscribers, with or without a drone purchase.")}<section class="section"><div class="wrap cards-3">${modules.map(([n, t, h, d, u, l, p]) => `<article class="world-card world-${n}"><span class="number">WORLD ${n}</span><h2>${t}</h2><h3>${h}</h3><p>${d}</p><strong>${p}</strong>${action(l, u)}</article>`).join("")}</div><div class="wrap actions">${action("Launch flight simulator", "/simulator")}${action("Open Blockly window", "/blockly", true)}${action("Open code editor", "/code-editor", true)}${action("Monthly plans & bundle", "/plans", true)}</div></section>`);
}
__name(studio, "studio");
function course(kind) {
  const light = kind === "light-show", title = light ? "Light Show" : "Swarm";
  return layout(title + " Academy", "/flight-studio", `${intro("FLYQ SPECIALIST ACADEMY", light ? "Code light.<br>Compose wonder." : "Think together.<br>Fly together.", light ? "Learn to choreograph a virtual drone light show, from your first formation to a complete animated sequence." : "Learn to program coordinated virtual drones, from formation spacing to multi-stage missions.")}<section class="section"><div class="wrap course-pitch"><div><div class="course-visual" data-world-preview="${kind}"><canvas aria-label="Animated ${title.toLowerCase()} formation preview"></canvas><span>${light ? "LIGHT SHOW / 3D PREVIEW" : "SWARM / 3D PREVIEW"}</span><button class="motion-toggle" type="button" aria-pressed="false">Pause motion</button></div><div class="cards-3 course-topics">${(light ? ["Coordinate geometry", "Colour & timing", "Show choreography"] : ["Formation geometry", "Leader & followers", "Mission sequencing"]).map((x, i) => `<div><span class="number">0${i + 1}</span><h3>${x}</h3></div>`).join("")}</div></div><aside class="purchase-panel"><p class="eyebrow">${title} Academy</p><h2>Build it in 3D.</h2><p>10 guided programming lessons, an editable mission workspace, animated playback, JSON export and saved course progress.</p><div class="price">\u20B9199<small>Per month \xB7 Renews monthly</small></div><button class="button" data-subscribe="${kind}">Subscribe to ${title} \u2014 \u20B9199/month</button><a class="text-link" href="/${kind}/studio">Already enrolled? Open studio</a><p class="price-note">Cancel renewal from My account; access continues until the paid month ends. Choose the <a href="/plans">\u20B9299/month bundle</a> for both academies and save \u20B999/month. The main simulator requires a separate verified drone purchase.</p><p class="price-note">Browser simulation and educational code only. Real drones, hardware integration and deployment to physical aircraft are not included.</p>${status}</aside></div></section><section class="section grey"><div class="wrap split"><div><p class="eyebrow">Your learning workflow</p><h2>Read. Edit. Run.<br>Understand the result.</h2></div><ol class="numbered-list"><li><span>01</span>Learn a concept with a guided mission.</li><li><span>02</span>Edit formation, duration, spacing and positions.</li><li><span>03</span>Run the animation, inspect separation and refine your program.</li><li><span>04</span>Save your work and track completed lessons.</li></ol></div></section>${script}<script type="module" src="/static/academy/world-preview.js"><\/script>`);
}
__name(course, "course");
function store() {
  return layout("Drone spare parts", "/store", `${intro("FLYQ PARTS STORE", "Keep your next<br>flight moving.", "Find replacement components for your drone. Confirm your model and hardware revision before ordering.")}<section class="section"><div class="wrap"><div class="store-assurance"><span><strong>FLYQ components</strong> \xB7 model-specific fit</span><span><strong>Secure checkout</strong> \xB7 verified payment confirmation</span><span><strong>Order history</strong> \xB7 in your account</span></div><div class="filter-row"><label>Find a part<input id="parts-search" type="search" placeholder="Motor, propeller, frame\u2026"></label><label>Category<select id="parts-category"><option value="all">All categories</option><option>Propulsion</option><option>Airframe</option><option>Electronics</option><option>Power</option></select></label></div>${status}<div id="parts-grid" class="cards-3"><p>Loading spare parts\u2026</p></div><aside id="cart" class="cart-panel" hidden><h2>Your parts order</h2><div id="cart-items"></div><p id="cart-total"></p><form id="shipping-form"><label>Delivery name<input name="name" required maxlength="120" autocomplete="name"></label><label>Phone<input name="phone" required maxlength="25" autocomplete="tel"></label><label>Delivery address<textarea name="address" required minlength="10" maxlength="500" autocomplete="street-address"></textarea></label><div class="form-row"><label>City<input name="city" required maxlength="80" autocomplete="address-level2"></label><label>PIN code<input name="pincode" required pattern="[1-9][0-9]{5}" autocomplete="postal-code"></label></div><p>Delivery within India. Review the total before paying.</p><button class="button" type="submit">Continue to payment</button></form></aside></div></section>${script}`);
}
__name(store, "store");
function projectPage() {
  return layout("50 flight projects", "/projects", `${intro("FLIGHT PROJECT LIBRARY", "50 ways to<br>learn by flying.", "Included with your verified FLYQ drone purchase. Explore guided missions, starter commands and practical challenges, then send a project to the flight simulator.")}<section class="section"><div class="wrap"><div class="filter-row"><label>Search projects<input id="project-search" type="search" placeholder="Survey, orbit, waypoint\u2026"></label><label>Level<select id="project-level"><option value="all">All levels</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label><span id="project-count"></span></div><div id="project-grid" class="cards-3"></div></div></section><dialog id="project-dialog"><button type="button" class="dialog-close" aria-label="Close project">Close</button><div id="project-detail"></div></dialog>${script}`);
}
__name(projectPage, "projectPage");
function auth(mode) {
  const register = mode === "register", reset = mode === "reset-password";
  return layout(register ? "Create your account" : reset ? "Reset password" : "Sign in", "", `<section class="section"><div class="wrap auth-layout"><div><p class="eyebrow">YOUR FLYQ ACCOUNT</p><h1>${register ? "A place for<br>your next idea." : reset ? "Back to<br>your workspace." : "Welcome<br>back."}</h1><p class="lead">Your courses, saved programs and parts orders, together.</p></div><form class="contact-form" id="account-form" data-mode="${mode}"><h2>${register ? "Create an account" : reset ? "Reset your password" : "Sign in to FLYQ"}</h2>${register ? '<label>Full name<input name="full_name" autocomplete="name" required maxlength="120"></label>' : ""}<label>Email<input name="email" type="email" autocomplete="email" required maxlength="254"></label>${!reset ? `<label>Password<input name="password" type="password" autocomplete="${register ? "new-password" : "current-password"}" required ${register ? 'minlength="12"' : ""} maxlength="128"></label>` : ""}${register ? '<p class="price-note">Use at least 12 characters for your password.</p>' : ""}${reset ? '<label id="new-password-label" hidden>New password<input name="password" type="password" minlength="12" maxlength="128" autocomplete="new-password"></label>' : ""}<button class="button" type="submit">${register ? "Create account" : reset ? "Send reset email" : "Sign in"}</button>${status}<div class="auth-links">${action(register ? "Already registered? Sign in" : "Create an account", register ? "/login" : "/register", true)}${!reset ? '<a href="/reset-password">Forgot password?</a>' : ""}</div></form></div></section>${script}`);
}
__name(auth, "auth");
function account() {
  return layout("Your account", "", `${intro("YOUR FLYQ WORKSPACE", "Make your next move.", "Your courses, learning progress and order history.")}<section class="section"><div class="wrap">${status}<div id="account-content"><p>Loading your account\u2026</p></div></div></section>${script}`);
}
__name(account, "account");
function crm() {
  return layout("Owner CRM", "", `<section class="section"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">FLYQ OWNER PORTAL</p><h1>Business, in view.</h1></div><div class="actions"><a href="/crm/deliveries" class="button">Delivery desk</a><a href="/account" class="text-link">My account</a></div></div>${status}<div id="crm-content"><p>Checking owner access\u2026</p></div></div></section>${script}`);
}
__name(crm, "crm");
function plans() {
  return layout("Monthly simulator plans", "/flight-studio", `${intro("FLYQ ACADEMY MEMBERSHIPS", "Choose your<br>next dimension.", "Light Show and Swarm are monthly subscriptions. No drone purchase is required for these two academies.")}<section class="section"><div class="wrap cards-3">${Object.entries(BILLING_PLANS).map(([key, p]) => `<article class="world-card ${key === "bundle" ? "world-02" : ""}"><p class="eyebrow">${key === "bundle" ? "BUNDLE OFFER" : "MONTHLY MEMBERSHIP"}</p><h2>${p.name}</h2><p>${key === "bundle" ? "Both 3D studios, all 20 guided lessons, saved programs and learning progress." : "One dedicated 3D studio, 10 guided lessons, saved programs and learning progress."}</p><div class="price">\u20B9${p.amount / 100}<small>per month \xB7 Renews monthly</small></div>${key === "bundle" ? "<strong>Save \u20B999/month compared with \u20B9398 for both separately.</strong>" : ""}<button class="button" data-subscribe="${key}">Subscribe \u2014 \u20B9${p.amount / 100}/month</button></article>`).join("")}</div><div class="wrap"><div class="notice">Cancel renewal in My account. Access continues until the paid billing period ends. No one-time or lifetime academy access. <a href="/account">Manage your subscription</a>.</div><div class="content-card" style="margin-top:30px"><h2>Own a FLYQ drone?</h2><p>The main Flight Simulator, its 50 projects and coding workspaces are included only for verified drone buyers. An academy subscription or spare-part purchase does not unlock them.</p>${action("Verify drone purchase", "/drone-access")}${action("Explore FLYQ drones", "/products", true)}</div></div></section>${script}`);
}
__name(plans, "plans");
function droneAccess() {
  return layout("Verify your drone purchase", "/flight-studio", `${intro("FLYQ DRONE OWNER ACCESS", "Your drone.<br>Your flight workspace.", "The main Flight Simulator, 50 projects and coding workspaces are included with a verified FLYQ drone purchase.")}<section class="section"><div class="wrap auth-layout"><div><h2>Already bought a drone?</h2><p>Sign in, submit your order or invoice reference and the email used for the purchase. The FLYQ team will check the sale and enable your account.</p><p>Spare parts and academy subscriptions do not qualify as a drone purchase.</p><div class="actions">${action("Explore drones", "/products")}${action("Light Show + Swarm plans", "/plans", true)}</div></div><div id="drone-access-content"><p>Checking your account\u2026</p></div></div><div class="wrap">${status}</div></section>${script}`);
}
__name(droneAccess, "droneAccess");
function platformPage(route) {
  if (route === "/crm/deliveries") return deliveries();
  if (route === "/plans") return plans();
  if (route === "/drone-access") return droneAccess();
  if (route === "/flight-studio") return studio();
  if (route === "/store") return store();
  if (route === "/projects") return projectPage();
  if (route === "/light-show" || route === "/swarm") return course(route.slice(1));
  if (["/login", "/register", "/reset-password"].includes(route)) return auth(route.slice(1));
  if (route === "/account") return account();
  if (route === "/crm") return crm();
  throw Error("Unknown platform route");
}
__name(platformPage, "platformPage");
function deliveries() {
  return layout("Customer delivery desk", "", `<section class="section"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">FLYQ OWNER PORTAL</p><h1>Customer deliveries.</h1></div><a class="text-link" href="/crm">Back to CRM</a></div>${status}<p id="delivery-counts"></p><p id="delivery-email-state" class="notice"></p><details class="content-card"><summary>Import customer records</summary><p>Choose your prepared private JSON file. Imports do not change existing accounts or send messages.</p><label>Customer file<input id="delivery-file" type="file" accept=".json,application/json"></label><p id="delivery-import-preview"></p><button id="delivery-import" class="button" disabled>Import reviewed file</button></details><form id="delivery-search" class="filter-row"><label>Find a customer<input name="q" type="search" placeholder="Name, email or purchase reference"></label><label>Status<select name="filter"><option value="">All customers</option><option value="unreviewed">Needs review</option><option value="delivered">Delivered</option><option value="delayed">Not received / delayed</option><option value="hold">On hold</option></select></label><button class="button">Search</button></form><div id="delivery-desk"><p>Checking owner access\u2026</p></div><div class="actions"><button id="delivery-prev" class="button secondary" disabled>Previous</button><button id="delivery-next" class="button secondary" disabled>Next 50</button></div></div></section><dialog id="delivery-dialog" aria-label="Customer delivery review"></dialog><script type="module" src="/static/brand/deliveries.js"><\/script>`);
}
__name(deliveries, "deliveries");
var models = [
  {
    id: "air",
    name: "FLYQ Air",
    edition: "Remote version",
    duration: "4 min 38 sec",
    description: "Build your FLYQ Air, then follow the remote controller setup.",
    chapters: [[0, "Introduction"], [5.5, "Kit contents"], [26.867, "Frame & electronics"], [70.933, "Motors & battery"], [127.2, "Propellers"], [160.433, "Charging & power"], [214.533, "Remote setup"], [265.667, "Assembly complete"]],
    youtube: ""
  },
  {
    id: "vision",
    name: "FLYQ Vision",
    edition: "Camera version",
    duration: "5 min 13 sec",
    description: "Build your FLYQ Vision, then follow the camera module installation.",
    chapters: [[0, "Introduction"], [5.5, "Kit contents"], [28.067, "Frame & electronics"], [72.133, "Motors & battery"], [128.4, "Propellers"], [161.633, "Charging & power"], [215.733, "Camera installation"], [309.233, "Assembly complete"]],
    youtube: ""
  }
];
var stamp = /* @__PURE__ */ __name((time) => `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, "0")}`, "stamp");
function modelGuide(model) {
  return `<section class="assembly-model-guide" id="${model.id}" data-assembly-guide aria-labelledby="${model.id}-heading">
    <div class="assembly-model-heading"><div><p class="eyebrow">${model.edition}</p><h2 id="${model.id}-heading">${model.name} assembly</h2></div><p class="assembly-meta"><span>${model.duration}</span><span>16:9 video</span></p></div>
    <p class="assembly-model-description">${model.description}</p>
    <figure class="assembly-guide-player">
      <video id="assembly-video-${model.id}" controls playsinline preload="none" width="1280" height="720" poster="/static/demos/flyq-${model.id}-assembly-poster.jpg" aria-label="${model.name} assembly tutorial \u2014 ${model.edition.toLowerCase()}" aria-describedby="${model.id}-video-caption">
        <source src="/static/demos/flyq-${model.id}-assembly.mp4" type="video/mp4">
        Your browser cannot play this video. <a href="/static/demos/flyq-${model.id}-assembly.mp4">Open the ${model.name} tutorial</a>.
      </video>
      <figcaption id="${model.id}-video-caption">English narration and on-screen captions. Use full screen for a closer look.${model.youtube ? ` <a href="${model.youtube}" target="_blank" rel="noopener">Watch on YouTube \u2197</a>` : ""}</figcaption>
    </figure>
    <div class="assembly-guide-chapter-panel">
      <h3>Jump to a step</h3>
      <ol class="assembly-chapters" aria-label="${model.name} video chapters">
        ${model.chapters.map(([time, title]) => `<li><button type="button" data-assembly-time="${time}" data-chapter-title="${title}" aria-controls="assembly-video-${model.id}"><span>${stamp(time)}</span>${title}<span aria-hidden="true">\u2197</span></button></li>`).join("")}
      </ol>
      <p class="assembly-video-status" role="status" aria-live="polite">Press play to watch, or choose a step above.</p>
    </div>
  </section>`;
}
__name(modelGuide, "modelGuide");
function assemblyDocumentation() {
  return `<div class="assembly-docs">
    <div class="wrap assembly-docs-shell">
      <aside class="assembly-docs-sidebar">
        <a class="assembly-docs-label" href="/docs">FLYQ DOCS</a>
        <nav aria-label="Documentation guides">
          <p>BUILD YOUR DRONE</p>
          <a href="/docs/assembly" aria-current="page">Assembly guide</a>
          <a href="/docs#hardware">Hardware overview</a>
          <a href="/docs#firmware">Firmware setup</a>
          <a href="/docs#flight-manual">First flight</a>
          <p>KEEP EXPLORING</p>
          <a href="/docs#programming">Programming</a>
          <a href="/docs#troubleshooting">Troubleshooting</a>
          <a href="/docs">All documentation</a>
        </nav>
      </aside>
      <article class="assembly-docs-article">
        <nav class="assembly-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/docs">Docs</a><span aria-hidden="true">/</span><span aria-current="page">Assembly guide</span></nav>
        <header class="assembly-guide-copy" id="how-to-assemble">
          <p class="eyebrow">ASSEMBLY GUIDE</p>
          <h1>How to assemble your drone.</h1>
          <p class="lead">Choose your model and follow the step-by-step video. Pause whenever you need, or jump straight to a chapter.</p>
        </header>
        <nav class="assembly-model-picker" aria-label="Choose your drone model">
          ${models.map((model) => `<a href="#${model.id}" data-assembly-model="${model.id}" aria-controls="${model.id}"><strong>${model.name}</strong><span>${model.edition}</span><span class="assembly-model-arrow" aria-hidden="true">\u2197</span></a>`).join("")}
        </nav>
        ${models.map(modelGuide).join("")}
        <div class="assembly-support"><p>Keep the battery disconnected while assembling your drone.</p><a class="text-link" href="/contact?topic=Technical%20support">Need help with your kit? <span aria-hidden="true">\u2197</span></a></div>
        <div class="assembly-docs-next"><div><span>CONTINUE LEARNING</span><h2>Ready for the next step?</h2></div><a class="text-link" href="/docs#flight-manual">Read the flight manual <span aria-hidden="true">\u2197</span></a></div>
      </article>
    </div>
  </div>`;
}
__name(assemblyDocumentation, "assemblyDocumentation");
var androidRelease = { "url": "/static/brand/downloads/FLYQ-Android-3.0.0-preview.2.apk", "sha256": "c60d765299992c52e03b9d4c4793d159c848626d1f62143c34aded1c91590fad", "version": "3.0.0-preview.2", "size": "86 KB" };
function androidAppContent() {
  return `
<link rel="stylesheet" href="/static/brand/android-app.css">
<section class="android-hero"><div class="wrap">
  <div class="android-intro"><div><p class="eyebrow">FLYQ / ANDROID PREVIEW</p><h1>Your drone.<br>A new point of view.</h1></div>
  <div class="android-lead"><p>A dedicated FLYQ camera app, with a landscape cockpit, local photo capture and video recording.</p><span class="android-version">Android 10 or later \xB7 ${androidRelease.version} \xB7 Free</span></div></div>
  <figure class="android-device"><img src="/static/brand/android/flight.png" alt="FLYQ Android flight view showing an offline camera, two control sticks and locked motor output" width="2400" height="1080"><figcaption>Actual Android app screen \xB7 Camera offline until a compatible drone connects</figcaption></figure>
  <div class="android-download"><div><strong>Camera and interface preview</strong><p>This build does not fly the DM002 yet. Motor commands are disabled. Camera compatibility with your particular DM002 is still being verified.</p></div><div><a class="button" href="${androidRelease.url}" download>Download Android APK <span aria-hidden="true">\u2193</span></a><span class="android-size">${androidRelease.size} \xB7 Signed preview build</span></div></div>
</div></section>
<section class="section"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">MADE FOR YOUR PHONE</p><h2>A focused camera workspace.</h2></div><p>Local connection. Local media.<br>No account or subscription needed.</p></div>
<div class="cards-3"><article class="content-card"><span class="number">01 / CAMERA</span><h3>A view from the drone.</h3><p>Connect through the drone\u2019s Wi-Fi. The camera view opens only when a supported module supplies valid video frames.</p></article><article class="content-card"><span class="number">02 / CAPTURE</span><h3>Keep the moments.</h3><p>Save photos and silent MP4 recordings to your Android phone. Open your saved captures from Media.</p></article><article class="content-card"><span class="number">03 / CONTROL LAYOUT</span><h3>Get familiar with FLYQ.</h3><p>Explore the two-stick layout. Takeoff and motor output stay locked while physical hardware testing is pending.</p></article></div>
</div></section>
<section class="section android-setup"><div class="wrap android-two-col"><div><p class="eyebrow">GET STARTED</p><h2>From download<br>to camera view.</h2><p>Keep propellers removed for connection checks. Use your existing controller for flight; this preview is for camera compatibility testing.</p><a class="text-link" href="/docs/assembly#vision">Watch the assembly guide \u2197</a></div><ol class="android-steps"><li><strong>Install the Android preview.</strong><p>Download the APK on your phone and follow Android\u2019s installation prompts. It installs separately from the existing FLYQ Play Store app.</p></li><li><strong>Join the drone\u2019s Wi-Fi.</strong><p>Power on the camera drone, open Android Wi-Fi settings and connect to its network. This network may have no Internet access.</p></li><li><strong>Open FLYQ \u2192 Open flight view.</strong><p>Tap Connect camera. A supported, responding camera shows live video. An unsupported module stays disconnected.</p></li></ol></div></section>
<section class="section"><div class="wrap android-two-col"><div><p class="eyebrow">RELEASE STATUS</p><h2>What works today.</h2><p>The app passes 29 automated tests, including local UDP connection tests. Android emulator checks also verify JPEG decoding, playable MP4 recording, video colours, timestamps and the motor lock. A physical DM002 has not been tested with this build.</p><p>Google Play release is pending the existing upload key, hardware validation and the required closed testing. iOS is planned for a later stage.</p><a class="text-link" href="/app/privacy">Android app privacy policy \u2197</a></div><div class="android-details"><details open><summary>DM002 camera compatibility</summary><p>DM002 kits can include different camera modules. A model name alone does not identify their control protocol.</p><p>This preview implements the documented WiFi UAV UDP camera family on a 192.168.169.x network (port 8800). XA UFO modules and classic FLD 192.168.100.x modules are not supported by this build.</p></details><details><summary>Download details and integrity</summary><p>Version: ${androidRelease.version}<br>Package: com.flyq.dronecontroller.preview<br>Minimum: Android 10 / API 29</p><p>SHA-256</p><code>${androidRelease.sha256}</code></details><details><summary>Help with connection</summary><p>If no camera appears, check that Android remains connected to the drone\u2019s Wi-Fi. Modules using another protocol will not connect. Open Settings \u2192 Connection diagnostics \u2192 Copy to keep a local report. Contact <a href="mailto:info@flyqdrone.in">info@flyqdrone.in</a> with your module information.</p></details></div></div></section>`;
}
__name(androidAppContent, "androidAppContent");
function androidPrivacyContent() {
  return `
<section class="page-top"><div class="wrap"><p class="eyebrow">FLYQ / ANDROID APP</p><h1>Your media stays with you.</h1><p class="lead">Privacy policy for FLYQ Android 3.0.0 preview \xB7 Updated 11 October 2026</p></div></section>
<section class="section"><div class="wrap resource-layout"><nav class="resource-nav"><a href="/app">\u2190 Android app</a><a href="#local-data">Local data</a><a href="#permissions">Permissions</a><a href="#contact">Contact</a></nav><div class="resource-content">
<section id="local-data"><h2>What the app processes</h2><p>FLYQ, by Passion 3D World, connects directly to a compatible drone\u2019s local Wi-Fi camera. Camera frames and connection state are processed on your Android device. This build contains no account login, advertising, analytics, cloud camera upload or cloud flight service.</p><p>Photos and silent videos are saved to your phone only when you choose to capture them. They are stored in Pictures/FLYQ and Movies/FLYQ. A local list of saved media is kept in app storage so you can open it later. Connection diagnostics are displayed locally and are not automatically sent to FLYQ. The Copy button puts the displayed report on your Android clipboard only when you choose.</p></section>
<section id="permissions"><h2>Device access</h2><p>The app uses network and Wi-Fi connection information to find and bind to the local drone network. Android\u2019s Internet permission also permits this local socket connection. It does not request your location, microphone, contacts or phone camera, and does not read your general photo library.</p><p>Photos and recordings are written through Android MediaStore. A file you choose to open is shared with your selected media viewer through Android\u2019s temporary URI permission.</p></section>
<section><h2>Storage, sharing and deletion</h2><p>The app does not send your media to FLYQ servers. You control any sharing through other apps. Delete saved media through your phone\u2019s gallery or file manager. Clearing app data removes the app\u2019s saved-media index; uninstalling the app may leave photos and videos in your shared media folders. This build disables automatic backup of its private app data.</p><p>Camera and network processing stops when you leave the app or disconnect. Motor commands are disabled in this preview.</p></section>
<section><h2>Links and support</h2><p>Assembly guides and website links open in your browser. Those pages and any email you send to support are handled by their respective services. The website\u2019s separate privacy policy applies to website visits. This policy describes the Android preview, not earlier FLYQ app releases.</p><p>If you contact us, we use the information you choose to send to answer your request. Avoid including passwords or other credentials in diagnostics or support emails.</p></section>
<section id="contact"><h2>Contact</h2><p>FLYQ Drones \xB7 Passion 3D World<br>Mumbai, India<br><a href="mailto:info@flyqdrone.in">info@flyqdrone.in</a></p><p>We will update this page if the app\u2019s data handling changes.</p></section>
</div></div></section>`;
}
__name(androidPrivacyContent, "androidPrivacyContent");
var image = "/static/brand/";
var arrow = '<span class="arrow" aria-hidden="true">\u2197</span>';
var products = {
  "flyq-air": { name: "FLYQ Air", tag: "The programmable starter", price: "9,999", image: "flyq-air-2.jpg", description: "A compact, ESP32-S3 powered platform for learning how drones work. Connect over Wi-Fi, explore the hardware, and build your first flight programs.", features: ["ESP32-S3 flight controller", "Wi-Fi control", "Open-source development platform", "Designed for learners, makers and classrooms"], focus: "Flight fundamentals, embedded programming and classroom experiments." },
  "flyq-vision": { name: "FLYQ Vision", tag: "Explore computer vision", price: "19,999", image: "flyq-vision.jpg", description: "Take your projects into camera-based experimentation. FLYQ Vision brings imaging, gesture-control projects and computer-vision learning to the FLYQ platform.", features: ["Camera-enabled FLYQ platform", "Computer-vision experiments", "Gesture-control learning projects", "Programmable flight workflows"], focus: "Camera-based projects and computer-vision learning." }
};
var button = /* @__PURE__ */ __name((label, href, secondary = false, external = false) => `<a class="button${secondary ? " secondary" : ""}" href="${href}"${external ? ' target="_blank" rel="noopener"' : ""}>${label}${arrow}</a>`, "button");
var link = /* @__PURE__ */ __name((label, href, external = false) => `<a class="text-link" href="${href}"${external ? ' target="_blank" rel="noopener"' : ""}>${label}${arrow}</a>`, "link");
function layout(title, active, content, description = "Programmable FLYQ drones, hands-on learning and a connected flight simulator for makers, students and educators.") {
  const nav = [["App", "/app"], ["Products", "/products"], ["Workshops", "/summer-camp"], ["Spare parts", "/store"], ["Learn", "/projects"], ["Docs", "/docs"], ["About", "/about"], ["Contact", "/contact"]];
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${description}"><meta name="theme-color" content="#101724"><title>${title} | FLYQ Drones</title><link rel="stylesheet" href="/static/brand/site.css"><link rel="stylesheet" href="/static/brand/platform.css"><link rel="stylesheet" href="/static/brand/product-tour.css"><script type="module" src="/static/brand/premium.js"><\/script><script src="/static/brand/site.js" defer><\/script>${active === "/docs/assembly" ? '<link rel="stylesheet" href="/static/brand/assembly-guide.css"><script src="/static/brand/assembly-guide.js" defer><\/script>' : ""}</head><body><a class="skip-link" href="#main">Skip to content</a><div class="utility"><div class="wrap"><span>PROGRAMMABLE DRONES. PRACTICAL POSSIBILITIES.</span><span>By Passion 3D World \xB7 Mumbai, India</span></div></div><header class="site-header"><div class="wrap nav-wrap"><a class="brand-lockup" href="/" aria-label="FLYQ Drones home"><span class="wordmark">FLY<span>Q</span></span><small>BUILT TO<br>BE EXPLORED</small></a><nav class="main-nav" id="main-nav" aria-label="Main navigation">${nav.map(([label, url]) => `<a href="${url}"${active === url || url === "/docs" && active.startsWith("/docs/") ? ' class="active" aria-current="page"' : ""}>${label}</a>`).join("")}</nav><div class="header-actions"><a href="/account">My account</a><a class="button small" href="/flight-studio">Flight Studio ${arrow}</a><button class="nav-toggle" aria-controls="main-nav" aria-expanded="false">Menu</button></div></div></header><main id="main">${content}</main><footer class="site-footer"><div class="wrap"><div class="footer-grid"><div class="footer-brand"><a class="wordmark" href="/">FLY<span>Q</span></a><p>Small aircraft. Open possibilities.<br>Programmable drones for the people who learn by making.</p><a href="mailto:info@passion3dworld.com">info@passion3dworld.com</a><a href="tel:+919137361474">+91 9137361474</a></div><div><h3>EXPLORE</h3><a href="/products/flyq-air">FLYQ Air</a><a href="/products/flyq-vision">FLYQ Vision</a><a href="/summer-camp">Workshops & camps</a><a href="https://flyqdrone.in/cart" target="_blank" rel="noopener">Official store cart \u2197</a></div><div><h3>BUILD & FLY</h3><a href="/app">Download Android app</a><a href="/docs/assembly">How to assemble your drone</a><a href="/flight-studio">Flight Studio</a><a href="/light-show">Light Show Academy</a><a href="/swarm">Swarm Academy</a><a href="/projects">50 flight projects</a><a href="/plans">Monthly plans & bundle</a><a href="/drone-access">Verify drone purchase</a><a href="/simulator" target="flyq-simulator">3D simulator</a><a href="/blockly" target="flyq-blockly" rel="noopener">Blockly workspace \u2197</a><a href="/code-editor" target="flyq-code" rel="noopener">Code editor \u2197</a><a href="/docs">Documentation</a><a href="/blog">Journal & guides</a></div><div><h3>FLYQ</h3><a href="/about">Our story</a><a href="/store">Drone spare parts</a><a href="/crm">Owner portal</a><a href="/contact">Contact us</a><a href="/contact?topic=Institutional%20enquiry">For institutions</a><a href="/curriculum">Learning pathway</a><a href="https://flyqdrone.in/account" target="_blank" rel="noopener">Store account \u2197</a></div></div><div class="footer-bottom"><span>\xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} FLYQ Drones \xB7 Passion 3D World</span><div><a href="https://flyqdrone.in/privacy" target="_blank" rel="noopener">Privacy policy \u2197</a><a href="https://flyqdrone.in/terms" target="_blank" rel="noopener">Terms of service \u2197</a></div><span>Designed for curious minds.</span></div></div></footer></body></html>`;
}
__name(layout, "layout");
var top = /* @__PURE__ */ __name((eyebrow, title, lead) => `<section class="page-top"><div class="wrap"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ""}</div></section>`, "top");
function productCard(slug) {
  const p = products[slug];
  return `<article class="product-card"><a class="product-media" href="/products/${slug}" aria-label="Explore ${p.name}"><span class="tag">${p.tag}</span><img src="${image + p.image}" alt="FLYQ platform studio photograph" width="800" height="600" loading="lazy"></a><div class="product-info"><h3>${p.name}</h3><p>${p.description}</p><div class="product-meta"><div class="price">\u20B9${p.price}<small>Listed on the official FLYQ store</small></div>${link("Explore " + p.name, "/products/" + slug)}</div></div></article>`;
}
__name(productCard, "productCard");
var cta = /* @__PURE__ */ __name(() => `<div class="wrap"><section class="cta-band"><div><h2>Bring drone learning to your classroom.</h2><p>Talk to us about kits, workshops and institutional requirements.</p></div>${button("Talk to FLYQ", "/contact?topic=Institutional%20enquiry")}</section></div>`, "cta");
var faqs = [["Which FLYQ drone should I choose?", "Start with FLYQ Air for programmable flight and hardware learning. Choose FLYQ Vision if your projects centre on cameras and computer vision. Our team can help you confirm the right configuration."], ["Can I practise before flying a physical drone?", "The main Flight Simulator is available to verified FLYQ drone buyers. You can practise with manual controls, build routes, or send a program from the separate Blockly workspace."], ["Does the simulator control my real drone?", "No. Flight Studio is a simulation. Hardware operation requires the appropriate device, firmware and connection workflow."], ["Can you help with a school or college workshop?", "Yes. Contact FLYQ with your location, student group, preferred dates and learning goals to discuss a suitable workshop and kit arrangement."]];
function courseCollaborator() {
  return `<section class="course-collaboration" aria-labelledby="course-collaboration-title"><div class="wrap"><div class="collaboration-card"><div><p class="eyebrow">Drone course collaborator</p><h2 id="course-collaboration-title">FLYQ <span aria-label="in collaboration with">\xD7</span> Corizo</h2><p>Drone course in collaboration with Corizo.</p></div><div class="actions">${button("Enquire about the course", "/contact?topic=Drone%20course%20with%20Corizo")}${button("Visit Corizo", "https://corizo.in/", true, true)}</div></div></div></section>`;
}
__name(courseCollaborator, "courseCollaborator");
var componentItems = [
  ["Propellers", "Turn rotation into lift.", "The blades move air to lift the aircraft. Changing their speeds lets the drone climb, turn and move.", 30, 57],
  ["Motors", "Four corners. Coordinated movement.", "Each propeller has its own motor. The flight controller adjusts their speeds together to control the aircraft.", 75, 64],
  ["Propeller guards", "A frame around the blades.", "The curved guards surround the propellers. They help limit incidental contact during supervised practice.", 17, 77],
  ["Central body", "Where the platform comes together.", "The FLYQ-branded body sits at the centre of the aircraft, between the four motor arms. Internal electronics are not visible in this photograph.", 47, 47]
];
function componentTour() {
  return `<section class="component-tour" id="components" aria-labelledby="component-heading"><div class="wrap"><div class="component-heading"><div><p class="eyebrow">The anatomy of FLYQ</p><h2 id="component-heading">Every part.<br>A purpose.</h2></div><p>Explore the hardware behind your first flight.<br>Select a component to take a closer look.</p></div><div class="component-layout"><div class="component-visual"><div class="component-image-plane"><img src="${image}flyq-air-2.jpg" alt="FLYQ drone with numbered component markers" width="800" height="600" loading="lazy">${componentItems.map(([name, , , x, y], i) => `<button type="button" class="component-pin" data-component-pin="${i}" style="left:${x}%;top:${y}%" aria-label="Explore ${name}" aria-controls="component-${i}" aria-pressed="${i === 0}">${String(i + 1).padStart(2, "0")}</button>`).join("")}</div><div class="component-visual-footer"><span>FLYQ / HARDWARE EXPLORER</span><button type="button" data-tour-reset hidden>View whole drone</button></div></div><div class="component-list">${componentItems.map(([name, title, description], i) => `<article class="component-item${i === 0 ? " is-active" : ""}" id="component-${i}" data-component="${i}"><button type="button" class="component-select" data-component-select="${i}" aria-pressed="${i === 0}"><span>${String(i + 1).padStart(2, "0")}</span>${name}<span aria-hidden="true">\u2197</span></button><h3>${title}</h3><p>${description}</p></article>`).join("")}<a class="text-link" href="/store">Explore drone spare parts \u2197</a></div></div></div></section>`;
}
__name(componentTour, "componentTour");
function home() {
  return layout("Programmable drones. Open possibilities.", "/", `<section class="hero"><div class="wrap"><div class="hero-grid"><div class="hero-copy"><p class="eyebrow">Meet the FLYQ platform</p><h1>Your ideas.<br><em>In full flight.</em></h1><p class="lead">Real hardware. Immersive worlds.<br>Build your first flight, choreograph a light show, or program a coordinated swarm.</p><div class="actions">${button("Watch real flight", "#flight-demo")}${button("Enter Flight Studio", "/flight-studio", true)}${link("Assembly guide", "/docs/assembly")}</div><p class="hero-note">For makers, developers and the next generation of pilots.</p></div><figure class="hero-product flyq-photo-hero static-product-photo"><img src="${image}flyq-air-2.jpg" alt="FLYQ programmable quadcopter with protected propellers" width="800" height="600" fetchpriority="high"><span class="figure-tag">FLYQ / THE REAL AIRCRAFT</span><figcaption class="product-caption"><strong>Built for your next idea.</strong><span>Explore. Experiment. Repeat.</span></figcaption></figure></div><div class="spec-strip"><div><strong>ESP32-S3</strong><span>A programmable foundation</span></div><div><strong>Wi-Fi connected</strong><span>Control without complexity</span></div><div><strong>Open development</strong><span>Make the platform your own</span></div><div><strong>Learning first</strong><span>From classrooms to workbenches</span></div></div></div></section><section class="section flight-demo-section" id="flight-demo"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">REAL AIRCRAFT. REAL FLIGHT.</p><h2>Watch FLYQ take flight.</h2></div><p>Live demonstrations with the FLYQ team. Press play to watch.</p></div><div class="flight-demo-grid"><figure><video controls playsinline preload="none" poster="/static/demos/flight-demo.jpg" aria-label="FLYQ drone flight demonstration"><source src="/static/demos/flight-demo.mp4" type="video/mp4">Your browser cannot play this video. <a href="/static/demos/flight-demo.mp4">Download the flight demo</a>.</video><figcaption>FLYQ in flight \xB7 30 seconds</figcaption></figure><figure><video controls playsinline preload="none" poster="/static/demos/guided-flight.jpg" aria-label="FLYQ guided flight demonstration"><source src="/static/demos/guided-flight.mp4" type="video/mp4">Your browser cannot play this video. <a href="/static/demos/guided-flight.mp4">Download the guided flight demo</a>.</video><figcaption>Guided flying demonstration \xB7 23 seconds</figcaption></figure></div></div></section>${componentTour()}<section class="section"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Find your starting point</p><h2>Two ways to take your<br>ideas further.</h2></div>${link("Compare the range", "/products")}</div><div class="products-grid">${productCard("flyq-air")}${productCard("flyq-vision")}</div><p class="price-note">Product pricing follows the official store listing. Confirm current configuration, availability and order terms before purchasing.</p></div></section><section class="section grey"><div class="wrap"><div class="studio-band"><div><p class="eyebrow">Introducing Flight Studio</p><h2>Your next flight<br>starts on screen.</h2><p>Practise in a 3D world. Build a mission with blocks. Keep your flight view open while you work in a dedicated coding window.</p>${button("Open Flight Studio", "/flight-studio")}</div><div class="studio-stack"><a href="/simulator" target="flyq-simulator"><small>01</small><div><strong>Fly in the simulator</strong><span>Alpine field, indoor arena and more</span></div>${arrow}</a><a href="/blockly" target="flyq-blockly" rel="noopener"><small>02</small><div><strong>Program with Blockly</strong><span>A separate, full-size coding workspace</span></div>${arrow}</a><a href="/code-editor" target="flyq-code" rel="noopener"><small>03</small><div><strong>Work with code</strong><span>Build and test supported flight commands</span></div>${arrow}</a></div></div></div></section><section class="section"><div class="wrap split"><img class="editorial-image" src="${image}workshop-students-demo.jpg" alt="Students watching a FLYQ drone demonstration at NRSC" width="1024" height="768" loading="lazy"><div><p class="eyebrow">Learning beyond the textbook</p><h2>A classroom with<br>room to take flight.</h2><p class="lead">Put real hardware into curious hands. FLYQ workshops bring drone components, programming and supervised flying into one practical learning experience.</p><ol class="numbered-list"><li><span>01</span>Understand what makes a drone fly.</li><li><span>02</span>Build confidence through guided practice.</li><li><span>03</span>Turn a team idea into a working project.</li></ol>${link("Explore workshops & camps", "/summer-camp")}</div></div></section>${courseCollaborator()}<section class="section"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Three ways to explore</p><h2>Your next world<br>is waiting.</h2></div>${link("Explore Flight Studio", "/flight-studio")}</div><div class="cards-3"><article class="world-card world-01"><span class="number">01 / FLIGHT</span><h3>Master your first flight.</h3><p>50 guided projects for flight fundamentals, geometry and mission design. Included exclusively with a verified FLYQ drone purchase.</p>${button("Explore 50 projects", "/projects")}</article><article class="world-card world-02"><span class="number">02 / LIGHT SHOW</span><h3>Program a sky of light.</h3><p>Learn formations, colour cues and choreography in a dedicated 3D workspace.</p><strong>\u20B9199/month \xB7 Renews monthly</strong>${button("Light Show Academy", "/light-show")}</article><article class="world-card world-03"><span class="number">03 / SWARM</span><h3>Coordinate the whole fleet.</h3><p>Explore formation control, leader\u2013follower offsets and coordinated missions.</p><strong>\u20B9199/month \xB7 Renews monthly</strong>${button("Swarm Academy", "/swarm")}</article></div><div class="notice"><strong>Light Show + Swarm: \u20B9299/month.</strong> Save \u20B999/month with the bundle. ${link("Compare monthly plans", "/plans")}</div></div></section><section class="section grey"><div class="wrap faq"><p class="eyebrow">A few things worth knowing</p><h2>Before your first flight.</h2>${faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></section>${cta()}`);
}
__name(home, "home");
function catalog() {
  return layout("Our drones", "/products", `${top("The FLYQ range", "Choose your next possibility.", "Two programmable platforms. A shared commitment to hands-on exploration.")}<section class="section"><div class="wrap"><div class="products-grid">${productCard("flyq-air")}${productCard("flyq-vision")}</div><p class="price-note">The original store uses a shared FLYQ platform photograph for these models. Confirm the camera configuration and kit contents with sales.</p><div class="section-heading" style="margin-top:65px"><h2>At a glance.</h2></div><table class="spec-table"><thead><tr><th>Choose for</th><td><strong>FLYQ Air</strong></td><td><strong>FLYQ Vision</strong></td></tr></thead><tbody><tr><th>Project focus</th><td>Programmable flight and hardware learning</td><td>Camera and computer-vision projects</td></tr><tr><th>Platform</th><td>ESP32-S3 with Wi-Fi control</td><td>Camera-enabled FLYQ platform</td></tr><tr><th>Ideal starting point</th><td>New makers and classroom learning</td><td>Learners exploring visual sensing</td></tr><tr><th>Official listed price</th><td>\u20B99,999</td><td>\u20B919,999</td></tr></tbody></table><div class="notice">Looking for multiple kits or an institutional setup? ${link("Discuss your requirements", "/contact?topic=Institutional%20enquiry")}</div></div></section>${cta()}`);
}
__name(catalog, "catalog");
function product(slug) {
  const p = products[slug];
  return layout(p.name, "/products", `<section class="section"><div class="wrap"><div class="breadcrumbs"><a href="/">Home</a> / <a href="/products">Products</a> / ${p.name}</div><div class="detail-grid"><div><div class="detail-photo"><img src="${image + p.image}" width="800" height="600" alt="${p.name} official store platform photograph"></div><p class="price-note">Official FLYQ platform photograph. Confirm your selected model\u2019s configuration when ordering.</p></div><div class="detail-copy"><p class="eyebrow">${p.tag}</p><h1>${p.name}</h1><p class="lead">${p.description}</p><div class="price">\u20B9${p.price}<small>Official store listed price</small></div><ul class="feature-list">${p.features.map((f) => `<li>${f}</li>`).join("")}</ul><div class="actions">${button("Buy on official store", "https://flyqdrone.in/products/" + slug, false, true)}${button("Ask about this drone", "/contact?topic=" + encodeURIComponent(p.name), true)}</div><p class="price-note">Purchases continue on flyqdrone.in, where you can review current stock, shipping, warranty and checkout terms.</p></div></div></div></section><section class="section grey"><div class="wrap split"><div><p class="eyebrow">Made for experimentation</p><h2>More than a first flight.</h2><p class="lead">${p.focus} Begin with the basics, then use each new skill as a starting point for your next project.</p>${link("Browse documentation", "/docs")}</div><div class="content-card"><h3>Your drone-owner workspace.</h3><p>After your drone purchase is verified, Flight Studio gives you a browser-based place to practise controls and test supported programs. It uses a generic training aircraft and does not model every characteristic of your physical FLYQ drone.</p>${button("Launch the simulator", "/simulator", false)}</div></div></section>${cta()}`);
}
__name(product, "product");
function workshops() {
  return layout("Workshops & summer camps", "/summer-camp", `${top("FLYQ learning experiences", "Less watching.<br>More doing.", "Hands-on drone workshops for curious students, schools and colleges.")}<section class="section"><div class="wrap split"><div><p class="eyebrow">Drone summer camp</p><h2>Three days of<br>discovery and flight.</h2><p class="lead">The FLYQ camp introduces students aged 8 and above to drone components, supervised flying and practical projects. Equipment is provided for the workshop; no laptop is required for the published camp format.</p><div class="actions">${button("Ask about the next batch", "/contact?topic=Workshop%20enquiry")}${button("View camp registration", "https://flyqdrone.in/summer-camp", true, true)}</div><p class="price-note">Ask the team for current dates, cities, fees and availability. The original programme page describes the Summer 2026 format.</p></div><img class="editorial-image" src="${image}workshop-students-demo.jpg" alt="FLYQ drone demonstration with students" width="1024" height="768"></div></section>${courseCollaborator()}<section class="section grey"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">The camp pathway</p><h2>Discover. Practise. Apply.</h2></div></div><div class="cards-3">${[["Day 01", "Discover the aircraft", "Meet the components, learn basic flight principles and build safe operating habits. Begin with simulator practice."], ["Day 02", "Take the controls", "Practise supervised flying, explore obstacle courses and collaborate on team flight activities."], ["Day 03", "Make it your own", "Apply the learning to a mini project, complete guided flight activities and reflect on the next steps."]].map(([n, t, d]) => `<article class="content-card"><span class="number">${n}</span><h3>${t}</h3><p>${d}</p></article>`).join("")}</div></div></section><section class="section"><div class="wrap split"><div><p class="eyebrow">For schools & colleges</p><h2>A programme that<br>fits your learners.</h2></div><div><p class="lead">Planning a workshop, setting up a drone lab or introducing a longer learning programme? Share the age group, number of learners, location and goals. We\u2019ll discuss a suitable format with you.</p>${button("Plan an institutional programme", "/contact?topic=Institutional%20enquiry")}</div></div></section>`);
}
__name(workshops, "workshops");
var docsNav = [["quick-start", "Start here"], ["simulator", "Simulator guide"], ["blockly", "Blockly workflow"], ["hardware", "Hardware resources"], ["troubleshooting", "Troubleshooting"]];
function docs() {
  return layout("Documentation & resources", "/docs", `${top("The FLYQ resource centre", "An idea is just the beginning.", "Find your next step, from your first simulated flight to working with a physical drone.")}<section class="section"><div class="wrap resource-layout"><nav class="resource-nav" aria-label="Documentation sections">${docsNav.map(([id, t]) => `<a href="#${id}">${t}</a>`).join("")}</nav><div class="resource-content"><section id="quick-start"><p class="eyebrow">01 / Start here</p><h2>Choose your workspace.</h2><p>Use the simulator to practise controls, Blockly to assemble flight instructions, or the code editor to work with supported commands. They have separate workspaces so you can keep the flight view visible while programming.</p><div class="actions">${button("Open Flight Studio", "/flight-studio")}${button("Learning pathway", "/curriculum", true)}</div></section><section id="simulator"><p class="eyebrow">02 / Simulator</p><h2>Your first simulated flight.</h2><ol><li>Open the simulator and select an environment while the aircraft is disarmed.</li><li>Choose Chase or FPV camera. Use Explore to inspect the environment before a flight.</li><li>Select Arm motors, then Take off. Allow the aircraft to reach its target height.</li><li>Use W/A/S/D to translate, Q/E to turn, Space to climb and Shift to descend.</li><li>Select Land to finish, or Emergency land / Esc when you need to stop a mission.</li></ol><p>The simulation includes simplified physics and a training aircraft. It is not a certified flight trainer or a connection to a real drone.</p>${link("Launch simulator", "/simulator")}</section><section id="blockly"><p class="eyebrow">03 / Visual programming</p><h2>Keep your code in its own window.</h2><ol><li>Open the full-size Blockly workspace. Start with the example or drag blocks into a single connected stack.</li><li>Use Validate to check your program. Movement inputs are in centimetres and are converted to metres by the simulator.</li><li>Choose Send to simulator. The flight window opens with a pending program.</li><li>Review the program and surroundings in the simulator, then select Run received program.</li></ol><p>Sending does not automatically arm or fly the aircraft. Closing the coding window does not stop an active flight; stop it from the simulator.</p>${button("Open Blockly workspace", "/blockly", false, true)}</section><section id="hardware"><p class="eyebrow">04 / Physical drone</p><h2>Work with your hardware revision.</h2><p>Use the official FLYQ documentation for the kit contents, firmware, wiring, calibration and hardware-specific procedures. Check your board revision before following pin assignments or flashing firmware.</p><p>Keep the simulator and physical aircraft workflows separate. A successful simulated program is not proof that it is safe or compatible with your real drone.</p><div class="actions">${button("Official hardware documentation", "https://flyqdrone.in/docs", true, true)}${button("Ask technical support", "/contact?topic=Technical%20support", true)}</div></section><section id="troubleshooting"><p class="eyebrow">05 / When something needs attention</p><h2>Common questions.</h2><h3>The simulator shows a 2D view.</h3><p>The labelled fallback means the browser could not create the 3D graphics view. Use a WebGL-capable browser, check browser graphics acceleration and try Reset graphics in Settings.</p><h3>The program did not arrive.</h3><p>Keep both windows on the same site address and browser profile. If a popup was blocked, open the simulator using the fallback link in Blockly. Resend the program if necessary.</p><h3>My flight program has an error.</h3><p>Use one connected stack, supported blocks, valid numbers and finite loops. Validation explains the first issue. Download your workspace before experimenting with changes.</p>${link("Contact support", "/contact?topic=Technical%20support")}</section></div></div></section>`);
}
__name(docs, "docs");
function about() {
  return layout("Our story", "/about", `${top("About FLYQ", "Made for the curious.", "We believe understanding a drone should be as exciting as flying one.")}<section class="section"><div class="wrap split"><div><p class="eyebrow">From Mumbai, with purpose</p><h2>Put possibility<br>in people\u2019s hands.</h2><p class="lead">FLYQ, by Passion 3D World, creates programmable drone platforms for makers, developers and educators. Our work brings together physical hardware, practical learning and the freedom to experiment.</p><p class="lead">From the first component a student recognises to the first program they run, we want every step to feel approachable\u2014and worth exploring further.</p>${link("Find your FLYQ platform", "/products")}</div><img class="editorial-image" src="${image}workshop-lunar.jpg" alt="FLYQ team member at a Chandrayaan exhibition" width="768" height="1024"></div></section><section class="section grey"><div class="wrap cards-3">${[["Open to exploration", "A platform that invites people to look closer, understand the hardware and develop their own ideas."], ["Grounded in practice", "Components, code and flight come together through hands-on learning and experimentation."], ["Built around learners", "Tools for individual makers, shared classrooms and institutions developing practical technical skills."]].map(([t, d], i) => `<article class="content-card"><span class="number">0${i + 1}</span><h3>${t}</h3><p>${d}</p></article>`).join("")}</div></section>${cta()}`);
}
__name(about, "about");
function contact() {
  return layout("Contact FLYQ", "/contact", `${top("Let\u2019s talk", "What would you like to build?", "Product questions, classroom programmes or help with your next project. We\u2019re here to discuss it.")}<section class="section"><div class="wrap contact-grid"><div><p class="eyebrow">Direct to the team</p><h2>A conversation<br>is a good start.</h2><div class="contact-item"><small>EMAIL</small><a href="mailto:info@passion3dworld.com">info@passion3dworld.com</a></div><div class="contact-item"><small>PHONE / WHATSAPP</small><a href="tel:+919137361474">+91 9137361474</a></div><div class="contact-item"><small>BASED IN</small><p>Mumbai, India</p></div><div class="actions" style="margin-top:25px">${button("Chat on WhatsApp", "https://wa.me/919137361474", true, true)}</div></div><form class="contact-form" id="contact-form"><h2>Tell us a little about it.</h2><div class="form-row"><label>Your name<input name="name" autocomplete="name" required maxlength="120"></label><label>Email address<input name="email" type="email" autocomplete="email" required maxlength="254"></label></div><label>Organisation <span style="color:var(--muted)">(optional)</span><input name="organisation" autocomplete="organization" maxlength="160"></label><label>I\u2019m interested in<select name="topic"><option>Product enquiry</option><option>FLYQ Air</option><option>FLYQ Vision</option><option>Institutional enquiry</option><option>Workshop enquiry</option><option>Drone course with Corizo</option><option>Light Show Academy</option><option>Swarm Academy</option><option>Spare parts enquiry</option><option>Technical support</option></select></label><label>Your message<textarea name="message" required maxlength="4000" placeholder="Tell us about your project, group or question\u2026"></textarea></label><button class="button" type="submit">Send enquiry ${arrow}</button><small id="form-status" role="status">Your enquiry goes directly to the FLYQ team. We\u2019ll use your details to respond.</small></form></div></section>`);
}
__name(contact, "contact");
var articles = [
  { slug: "first-simulated-flight", category: "FLIGHT GUIDE", title: "Your first flight starts with a good setup.", description: "A short guide to choosing an environment, checking the controls and making your first simulated takeoff.", content: "<h2>Start with space to practise.</h2><p>Open Flight Studio and launch the simulator. Choose the alpine field for an open setting or the indoor arena to practise within a defined space. Use Explore to look around before arming.</p><h2>Take one step at a time.</h2><p>Choose Chase camera, select Arm motors and then Take off. Let the aircraft settle at its target height before introducing movement. Make small control inputs and observe how the aircraft responds.</p><h2>End with a deliberate landing.</h2><p>Return to a clear area and select Land. Review your telemetry and recording before repeating the exercise. The simulation is a learning tool; use the appropriate hardware-specific instructions for a real aircraft.</p>" },
  { slug: "programming-with-blocks", category: "BUILD WITH BLOCKS", title: "Give your flight program a window of its own.", description: "Use Blockly beside the simulator to build a connected sequence, validate it and review it before running.", content: "<h2>Build one clear sequence.</h2><p>Open Blockly from Flight Studio. Drag the supported blocks into a single connected stack. A simple first program arms the simulated aircraft, takes off, hovers briefly and lands.</p><h2>Check before sending.</h2><p>Select Validate to see the resulting command sequence and any errors. Distance blocks use centimetres; the simulator receives commands in metres. Use finite repeats and keep the mission bounded.</p><h2>Review in the flight window.</h2><p>Send the program to the simulator. The received program waits for you to run it there. Sending a new program does not replace a mission already in progress without an explicit action.</p>" },
  { slug: "choose-your-flyq", category: "PRODUCT GUIDE", title: "FLYQ Air or Vision: start with the project.", description: "Choose a platform around the skills you want to explore, from flight basics to camera-based experiments.", content: "<h2>Begin with the learning goal.</h2><p>FLYQ Air is the starting point for programmable flight, Wi-Fi control and exploring an ESP32-S3 based drone platform. It suits learners who want to understand the relationship between hardware and flight commands.</p><h2>Bring a camera into the project.</h2><p>FLYQ Vision is intended for camera-based and computer-vision learning projects. Discuss your proposed experiment with the team to confirm the camera, firmware and configuration you need.</p><h2>Plan beyond the first day.</h2><p>For an institution, consider the number of learners, how kits will be shared, instructor support and the intended project outcomes. Contact FLYQ to discuss a suitable kit and programme arrangement.</p>" }
];
function blog() {
  return layout("Journal & guides", "/docs", `${top("FLYQ journal", "Ideas worth taking further.", "Practical guides to your drone, your code and your next learning project.")}<section class="section"><div class="wrap article-list">${articles.map((a) => `<article class="article"><span class="tag">${a.category}</span><div><h2><a href="/blog/${a.slug}">${a.title}</a></h2><p>${a.description}</p></div>${link("Read the guide", "/blog/" + a.slug)}</article>`).join("")}<div class="notice">Explore more articles and updates in the existing FLYQ archive. ${link("Visit the original blog", "https://flyqdrone.in/blog", true)}</div></div></section>`);
}
__name(blog, "blog");
function article(slug) {
  const a = articles.find((a2) => a2.slug === slug);
  return layout(a.title, "/docs", `${top(a.category, a.title, a.description)}<section class="section"><div class="wrap resource-layout"><nav class="resource-nav"><a href="/blog">\u2190 All guides</a><a href="/flight-studio">Flight Studio</a><a href="/docs">Documentation</a></nav><div class="resource-content">${a.content}<div class="actions">${button("Explore Flight Studio", "/flight-studio")}${button("Talk to the team", "/contact", true)}</div></div></div></section>`);
}
__name(article, "article");
function curriculum() {
  return layout("Learning pathway", "/docs", `${top("Your learning pathway", "From first principles<br>to your own projects.", "A practical route through the FLYQ tools. Progress at a pace that suits you or your classroom.")}<section class="section"><div class="wrap cards-3">${[["01 / UNDERSTAND", "Meet the platform", "Identify the aircraft components, understand the controls and learn how to prepare for a flight.", "/docs#quick-start", "Start with the guide"], ["02 / PRACTISE", "Build flight confidence", "Use simulator lessons to practise takeoff, hover, movement, heading and controlled landing.", "/simulator", "Open simulator"], ["03 / PROGRAM", "Make a repeatable mission", "Build a sequence with Blockly, validate the commands and review the flight in the simulator.", "/blockly", "Open Blockly"], ["04 / EXPLORE", "Work with commands", "Use the code editor and supported flight commands to express and test a mission.", "/code-editor", "Open code editor"], ["05 / APPLY", "Move to physical hardware", "Follow documentation for your board, firmware and kit. Get help with compatibility before testing.", "/docs#hardware", "Hardware resources"], ["06 / CREATE", "Build a project together", "Plan a classroom challenge or a maker project around a clear learning goal.", "/contact", "Discuss a programme"]].map(([n, t, d, u, l]) => `<article class="content-card"><span class="number">${n}</span><h3>${t}</h3><p>${d}</p>${link(l, u)}</article>`).join("")}</div></section>${courseCollaborator()}`);
}
__name(curriculum, "curriculum");
var brandRoutes = ["/app", "/app/privacy", "/", "/products", "/products/flyq-air", "/products/flyq-vision", "/summer-camp", "/docs", "/docs/assembly", "/about", "/contact", "/flight-studio", "/blog", "/curriculum", ...articles.map((a) => "/blog/" + a.slug)];
function brandPage(route) {
  if (route === "/app") return layout("FLYQ for Android", "/app", androidAppContent(), "Download the free FLYQ Android camera preview. Physical DM002 compatibility testing is pending and flight controls are disabled.");
  if (route === "/app/privacy") return layout("Android app privacy", "/app/privacy", androidPrivacyContent(), "Privacy information for the FLYQ Android preview, including local camera frames, media storage and network access.");
  if (route === "/") return home();
  if (route === "/products") return catalog();
  if (route.startsWith("/products/")) return product(route.split("/").pop());
  if (route === "/summer-camp") return workshops();
  if (route === "/docs") return docs();
  if (route === "/docs/assembly") return layout("How to assemble your drone", "/docs/assembly", assemblyDocumentation(), "Watch the full FLYQ drone assembly video, with English narration, on-screen captions and chapter shortcuts from kit contents to camera installation.");
  if (route === "/flight-studio") return platformPage(route);
  if (route === "/about") return about();
  if (route === "/contact") return contact();
  if (route === "/blog") return blog();
  if (route.startsWith("/blog/")) return article(route.split("/").pop());
  if (route === "/curriculum") return curriculum();
  throw Error("Unknown brand route");
}
__name(brandPage, "brandPage");
async function videoAssetResponse(request, assets, knownLength) {
  const response = await assets.fetch(request);
  if (response.status !== 200) return response;
  const headers = new Headers(response.headers);
  headers.set("Accept-Ranges", "bytes");
  const length = Number(headers.get("Content-Length") || knownLength);
  const range = request.headers.get("Range");
  const ifRange = request.headers.get("If-Range");
  const full = /* @__PURE__ */ __name(() => new Response(request.method === "HEAD" ? null : response.body, { status: 200, headers }), "full");
  if (request.method === "HEAD" || !range || !Number.isSafeInteger(length) || length <= 0) return full();
  if (ifRange && ifRange !== headers.get("ETag") && ifRange !== headers.get("Last-Modified")) return full();
  const match = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  let start, end;
  if (match && (match[1] || match[2])) {
    if (match[1]) {
      start = Number(match[1]);
      end = match[2] ? Number(match[2]) : length - 1;
    } else {
      const suffix = Number(match[2]);
      if (Number.isSafeInteger(suffix) && suffix > 0) {
        start = Math.max(0, length - suffix);
        end = length - 1;
      }
    }
  }
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= length || start < 0 || end < start) {
    await response.body?.cancel();
    headers.set("Content-Range", `bytes */${length}`);
    headers.set("Content-Length", "0");
    return new Response(null, { status: 416, headers });
  }
  end = Math.min(end, length - 1);
  headers.set("Content-Range", `bytes ${start}-${end}/${length}`);
  headers.set("Content-Length", String(end - start + 1));
  const reader = response.body.getReader();
  let position = 0;
  const stream = new ReadableStream({
    async pull(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            controller.close();
            return;
          }
          const from = Math.max(0, start - position);
          const to = Math.min(value.byteLength, end + 1 - position);
          position += value.byteLength;
          if (to > from) controller.enqueue(value.subarray(from, to));
          if (position > end) {
            controller.close();
            await reader.cancel();
            return;
          }
          if (to > from) return;
        }
      } catch (error) {
        controller.error(error);
        await reader.cancel().catch(() => {
        });
      }
    },
    cancel(reason) {
      return reader.cancel(reason);
    }
  });
  return new Response(stream, { status: 206, headers });
}
__name(videoAssetResponse, "videoAssetResponse");
var ASSEMBLY_VIDEO_SIZES = {
  "flyq-assembly-tutorial.mp4": 24192674,
  "flyq-air-assembly.mp4": 23364299,
  "flyq-vision-assembly.mp4": 24000485
};
function addAssemblyDocsLink(html) {
  if (html.includes('id="assembly-video-guide"')) return html;
  const marker = '<a href="#quick-start"';
  if (!html.includes(marker)) return html;
  const card = `<a id="assembly-video-guide" href="/docs/assembly" class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-2 border-sky-500">
    <i class="fas fa-play-circle text-sky-500 text-4xl mb-3" aria-hidden="true"></i>
    <h3 class="text-xl font-bold mb-2">How to assemble your drone</h3>
    <p class="text-gray-600 text-sm">Air &amp; Vision video guides with captions &amp; chapter shortcuts</p>
  </a>`;
  return html.replace(marker, card + marker);
}
__name(addAssemblyDocsLink, "addAssemblyDocsLink");
var PLATFORM_PREFIX = "/learn";
var roots = "api|static|store|plans|account|login|register|reset-password|drone-access|crm|flight-studio|projects|light-show|swarm|simulator(?:\\.html)?|blockly(?:\\.html)?|code-editor(?:\\.html)?|editor";
var rootStrings = new RegExp("([\"'`(])\\/(" + roots + ")(?=[/\\?\\#\"'`)]|$)", "g");
function mountText(text) {
  return text.replace(rootStrings, (match, quote, root, offset) => {
    if (/\bapi\s*\(\s*$/.test(text.slice(0, offset))) return match;
    return quote + PLATFORM_PREFIX + "/" + root;
  }).replaceAll('href="https://flyqdrone.in/products/', 'href="/shop/products/').replaceAll('href="https://flyqdrone.in/cart"', 'href="/cart"').replaceAll('href="https://flyqdrone.in/account"', 'href="/account"');
}
__name(mountText, "mountText");
async function platformResponse(request, platform) {
  const publicUrl = new URL(request.url), path = publicUrl.pathname.slice(PLATFORM_PREFIX.length) || "/";
  if (!["GET", "HEAD", "OPTIONS"].includes(request.method) && path !== "/api/checkout/webhook" && request.headers.get("Origin") !== publicUrl.origin)
    return Response.json({ error: "Request origin is not allowed." }, { status: 403 });
  const upstream = new URL(platform);
  upstream.pathname = path;
  upstream.search = publicUrl.search;
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("cookie");
  const session = (request.headers.get("Cookie") || "").split(";").map((s) => s.trim()).find((s) => s.startsWith("flyq_learning_session="));
  if (session) headers.set("Cookie", "flyq_session=" + session.slice("flyq_learning_session=".length));
  if (headers.has("Origin")) headers.set("Origin", upstream.origin);
  const init = { method: request.method, headers, redirect: "manual", duplex: "half" };
  if (!["GET", "HEAD"].includes(request.method)) init.body = request.body;
  let response;
  try {
    response = await fetch(new Request(upstream, init));
  } catch {
    return new Response("The FLYQ workspace is temporarily unavailable. Please try again shortly.", { status: 503 });
  }
  const output = new Headers(response.headers);
  output.set("Cache-Control", "private, no-store");
  output.delete("Set-Cookie");
  for (const cookie of response.headers.getSetCookie()) {
    if (!cookie.startsWith("flyq_session=")) continue;
    output.append("Set-Cookie", cookie.replace(/^flyq_session=/, "flyq_learning_session=").replace(/;\s*Domain=[^;]*/ig, "").replace(/;\s*Path=[^;]*/ig, "") + "; Path=/learn");
  }
  const location = output.get("Location");
  if (location) {
    const target = new URL(location, upstream);
    if (target.origin === platform) output.set("Location", publicUrl.origin + PLATFORM_PREFIX + target.pathname + target.search + target.hash);
  }
  const type = output.get("Content-Type") || "";
  if (request.method !== "HEAD" && (/text\/html/.test(type) || path.startsWith("/static/") && /(javascript|text\/css)/.test(type))) {
    const text = mountText(await response.text());
    for (const key of ["Content-Length", "Content-Encoding", "ETag", "Content-MD5"]) output.delete(key);
    return new Response(text, { status: response.status, headers: output });
  }
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers: output });
}
__name(platformResponse, "platformResponse");
var pages = /* @__PURE__ */ new Set(["/", "/app", "/app/privacy", "/docs/assembly", "/about", "/contact", "/products", "/products/flyq-air", "/products/flyq-vision", "/blog/first-simulated-flight", "/blog/programming-with-blocks", "/blog/choose-your-flyq"]);
var studioPaths = /* @__PURE__ */ new Set(["/flight-studio", "/projects", "/light-show", "/swarm", "/plans", "/drone-access", "/simulator", "/blockly", "/code-editor", "/store", "/crm"]);
var assetPrefix = "/flyq-design/";
function origin(value, publicOrigin) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash || url.origin === publicOrigin) throw Error("Invalid backend origin");
  return url.origin;
}
__name(origin, "origin");
function mainPage(path, studio2) {
  let html = brandPage(path);
  if(path === "/") html=html.replace('<main id="main">','<main id="main"><section aria-label="FLYQ Android app" style="background:#0b1629;color:#fff;padding:18px 0"><div class="wrap" style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap"><div><strong style="font-size:18px">Meet the new FLYQ Android app</strong><span style="display:block;color:#b8c8dc;font-size:14px">Larger camera views. Floating tools. Free download.</span></div><a class="button" href="/app">Get the Android app ↓</a></div></section>');
  html = html.replace(/href="(\/[^"]*)"/g, (full, href) => {
    const url = new URL(href, "https://flyqdrone.in");
    return studioPaths.has(url.pathname) || url.pathname.startsWith("/crm/") ? `href="${PLATFORM_PREFIX}${href}"` : full;
  });
  html = html.replaceAll('href="https://flyqdrone.in/products/', 'href="/shop/products/').replaceAll('href="https://flyqdrone.in/cart"', 'href="/cart"').replaceAll('href="https://flyqdrone.in/account"', 'href="/account"');
  html = html.replaceAll("/static/brand/", assetPrefix + "brand/").replaceAll("/static/demos/", assetPrefix + "demos/").replaceAll(assetPrefix + "brand/site.js", assetPrefix + "brand/storefront.js");
  html = html.replace('name="name" autocomplete="name" required maxlength="120"', 'name="name" autocomplete="name" required minlength="2" maxlength="100"').replace('name="message" required maxlength="4000"', 'name="message" required minlength="10" maxlength="1800"');
  html = html.replaceAll("Purchases continue on flyqdrone.in, where you can review current stock, shipping, warranty and checkout terms.", "Review current stock, pricing, shipping and checkout terms in the store.");
  html = html.replaceAll("\u20B99,999", '<span data-store-price="flyq-air">See current price in store</span>').replaceAll("\u20B919,999", '<span data-store-price="flyq-vision">See current price in store</span>').replaceAll("Official store listed price", "Current store price").replaceAll("Official listed price", "Current store price");
  return html;
}
__name(mainPage, "mainPage");
var storefront_worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url), path = url.pathname;
    let legacy, studio2;
    try {
      legacy = origin(env.LEGACY_ORIGIN, url.origin);
      studio2 = origin(env.PLATFORM_ORIGIN, url.origin);
    } catch {
      return new Response("Website connection is not configured.", { status: 503 });
    }
    if (path === "/_flyq/status") return Response.json({ service: "FLYQ public website", database_migrations: false }, { headers: { "Cache-Control": "no-store" } });
    if ((request.method === "GET" || request.method === "HEAD") && path === "/docs/assembly/") return Response.redirect(url.origin + "/docs/assembly" + url.search, 308);
    if (path === PLATFORM_PREFIX || path.startsWith(PLATFORM_PREFIX + "/")) return platformResponse(request, studio2);
    const videoFile = path.startsWith(assetPrefix + "demos/") ? path.slice((assetPrefix + "demos/").length) : "";
    const videoBytes = Object.hasOwn(ASSEMBLY_VIDEO_SIZES, videoFile) ? ASSEMBLY_VIDEO_SIZES[videoFile] : null;
    if ((request.method === "GET" || request.method === "HEAD") && videoBytes) return videoAssetResponse(request, env.ASSETS, videoBytes);
    if ((request.method === "GET" || request.method === "HEAD") && path.startsWith(assetPrefix)) return env.ASSETS.fetch(request);
    if ((request.method === "GET" || request.method === "HEAD") && pages.has(path)) return new Response(request.method === "HEAD" ? null : mainPage(path, studio2), { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "strict-origin-when-cross-origin" } });
    if ((request.method === "GET" || request.method === "HEAD") && (studioPaths.has(path) || path.startsWith("/crm/"))) return Response.redirect(url.origin + PLATFORM_PREFIX + path + url.search, 302);
    const upstream = new URL(legacy);
    upstream.pathname = path.startsWith("/shop/products/") ? path.slice(5) : path;
    upstream.search = url.search;
    const headers = new Headers(request.headers);
    headers.delete("host");
    headers.set("X-Forwarded-Host", url.host);
    headers.set("X-Forwarded-Proto", "https");
    if (headers.has("Cookie")) headers.set("Cookie", (headers.get("Cookie") || "").split(";").filter((s) => !s.trim().startsWith("flyq_learning_session=")).join(";"));
    const init = { method: request.method, headers, redirect: "manual", duplex: "half" };
    if (!["GET", "HEAD"].includes(request.method)) init.body = request.body;
    let response;
    try {
      response = await fetch(new Request(upstream, init));
    } catch {
      return new Response("The store is temporarily unavailable. Please try again shortly.", { status: 503, headers: { "Cache-Control": "no-store" } });
    }
    const nextHeaders = new Headers(response.headers);
    const location = nextHeaders.get("Location");
    if (location) {
      try {
        const redirect = new URL(location, upstream);
        if (redirect.origin === legacy) nextHeaders.set("Location", url.origin + redirect.pathname + redirect.search + redirect.hash);
      } catch {
      }
    }
    if (!["GET", "HEAD"].includes(request.method) || headers.has("Cookie") || path.startsWith("/api/") || /^\/(account|login|register|checkout|cart|track|admin|payment)/.test(path)) nextHeaders.set("Cache-Control", "private, no-store");
    if (request.method === "GET" && path === "/docs" && response.status === 200 && response.headers.get("Content-Type")?.includes("text/html")) {
      const html = addAssemblyDocsLink(await response.text());
      nextHeaders.delete("Content-Length");
      nextHeaders.delete("Content-Encoding");
      nextHeaders.delete("ETag");
      if (!headers.has("Cookie")) nextHeaders.set("Cache-Control", "no-cache");
      return new Response(html, { status: response.status, statusText: response.statusText, headers: nextHeaders });
    }
    if (path === "/api/payment/initiate" && response.ok && response.headers.get("Content-Type")?.includes("application/json")) {
      const data = await response.json();
      for (const key of ["surl", "furl"]) {
        const value = data.paymentData?.[key];
        if (typeof value === "string") {
          const callback = new URL(value, legacy);
          if (callback.origin === legacy && ["/payment/success", "/payment/failure"].includes(callback.pathname)) data.paymentData[key] = url.origin + callback.pathname + callback.search;
        }
      }
      nextHeaders.delete("Content-Length");
      nextHeaders.delete("Content-Encoding");
      nextHeaders.delete("ETag");
      return Response.json(data, { status: response.status, headers: nextHeaders });
    }
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers: nextHeaders });
  }
};
export {
  storefront_worker_default as default,
  mainPage
};
//# sourceMappingURL=worker.js.map
