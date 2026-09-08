(() => {
  "use strict";

  const lang = document.documentElement.lang === "en" ? "en" : "ar";
  const isArabic = lang === "ar";

  const text = {
    ar: {
      title: "منشئ أوامر Gree AC",
      eyebrow: "Gree AC · منشئ الأوامر الجزئية",
      heading: "أنشئ أمر المكيف بدون كتابة JSON يدويًا",
      intro: "فعّل فقط الخصائص التي تريد تغييرها. تُضاف SchemaVersion وCommand تلقائيًا، وتبقى بقية حالة المكيف كما هي.",
      language: "English",
      languageHref: "en/",
      selected: "الخصائص المختارة",
      of: "من",
      displayPreset: "الشاشة فقط",
      comfortPreset: "المروحة والشفرات والشاشة",
      selectAll: "تحديد الكل",
      clearAll: "مسح الاختيارات",
      properties: "خصائص الأمر",
      propertiesHint: "الحقول غير المحددة لن تتغير",
      ready: "الأمر الجاهز",
      partial: "أمر جزئي",
      complete: "حالة كاملة",
      nodeName: "اسم جهاز ESPHome",
      deviceUrl: "عنوان جهاز ESP",
      valid: "الأمر صالح وجاهز للنسخ",
      chooseOne: "اختر خاصية واحدة على الأقل.",
      invalidTemperature: "درجة الحرارة المطلوبة يجب أن تكون عددًا صحيحًا من 16 إلى 30.",
      invalidNode: "اسم جهاز ESPHome غير صالح.",
      invalidUrl: "أدخل عنوان جهاز صحيحًا، مثل http://192.168.1.100",
      copy: "نسخ الأمر",
      download: "تنزيل TXT",
      copied: "تم نسخ الأمر.",
      copyFailed: "تعذر النسخ تلقائيًا؛ حدّد النص وانسخه يدويًا.",
      offTitle: "عند إطفاء المكيف",
      offBody: "يُقبل الأمر إذا كان اتصال UART في حالة Ready، حتى لو كانت الطاقة Off.",
      modeTitle: "تشغيل بدون Mode",
      modeBody: "إرسال Power: true فقط يعيد التشغيل بآخر وضع تشغيل معروف للمكيف.",
      privacyTitle: "الخصوصية",
      privacyBody: "هذه الصفحة تولّد النص وتنسخه فقط؛ لا ترسل أي طلب إلى جهازك.",
      labels: {
        Power: ["الطاقة", "تشغيل أو إطفاء المكيف"],
        Mode: ["وضع التشغيل", "تبريد، تدفئة، تلقائي، تجفيف أو مروحة"],
        TargetTemperature: ["درجة الحرارة المطلوبة", "عدد صحيح من 16 إلى 30 درجة مئوية"],
        FanSpeed: ["سرعة المروحة", "سرعة المروحة الداخلية"],
        HorizontalSwing: ["الشفرات الأفقية", "حركة أو موضع الشفرات يمينًا ويسارًا"],
        VerticalSwing: ["الشفرات العمودية", "حركة أو موضع الشفرات أعلى وأسفل"],
        DisplayMode: ["وضع الشاشة", "إطفاء الشاشة أو تحديد ما تعرضه"],
        DisplayTemperatureUnit: ["وحدة عرض الحرارة", "الوحدة الظاهرة على شاشة المكيف"],
        Plasma: ["Plasma", "ميزة تنقية الهواء إن كانت مدعومة"],
        Beeper: ["صوت الأوامر", "تشغيل أو تعطيل صوت التنبيه"],
        Sleep: ["وضع النوم", "تشغيل أو تعطيل وضع النوم"],
        XFan: ["X-Fan", "تجفيف الوحدة الداخلية بعد الإيقاف"],
        SaveMode: ["وضع التوفير", "Save / 8 °C Heat حسب دعم المكيف"]
      },
      options: {
        true: "تشغيل", false: "إيقاف", Auto: "تلقائي", Cool: "تبريد", Heat: "تدفئة",
        Dry: "تجفيف", FanOnly: "مروحة فقط", Low: "منخفض", Medium: "متوسط", High: "مرتفع",
        Turbo: "توربو", Off: "إيقاف", SwingFull: "حركة كاملة", ConstantLeft: "ثابت يسار",
        ConstantMidLeft: "ثابت بين اليسار والوسط", ConstantMiddle: "ثابت في الوسط",
        ConstantMidRight: "ثابت بين الوسط واليمين", ConstantRight: "ثابت يمين",
        SwingDown: "حركة في النطاق السفلي", SwingMidDown: "حركة بين الوسط والأسفل",
        SwingMiddle: "حركة حول الوسط", SwingMidUp: "حركة بين الوسط والأعلى",
        SwingUp: "حركة في النطاق العلوي", ConstantDown: "ثابت أسفل",
        ConstantMidDown: "ثابت بين الأسفل والوسط", ConstantMidUp: "ثابت بين الوسط والأعلى",
        ConstantUp: "ثابت أعلى", SetTemperature: "الحرارة المطلوبة",
        ActualTemperature: "الحرارة الحالية", OutsideTemperature: "الحرارة الخارجية",
        Celsius: "مئوية", Fahrenheit: "فهرنهايت"
      }
    },
    en: {
      title: "Gree AC Command Builder",
      eyebrow: "Gree AC · Partial Command Builder",
      heading: "Build an AC command without writing JSON",
      intro: "Enable only the properties you want to change. SchemaVersion and Command are added automatically, while every omitted setting stays unchanged.",
      language: "العربية",
      languageHref: "../",
      selected: "Selected properties",
      of: "of",
      displayPreset: "Display only",
      comfortPreset: "Fan, louvers & display",
      selectAll: "Select all",
      clearAll: "Clear selection",
      properties: "Command properties",
      propertiesHint: "Unchecked fields will not change",
      ready: "Generated command",
      partial: "Partial command",
      complete: "Full state",
      nodeName: "ESPHome node name",
      deviceUrl: "ESP device address",
      valid: "Command is valid and ready to copy",
      chooseOne: "Select at least one property.",
      invalidTemperature: "Target temperature must be an integer from 16 to 30.",
      invalidNode: "The ESPHome node name is invalid.",
      invalidUrl: "Enter a valid device address, such as http://192.168.1.100",
      copy: "Copy command",
      download: "Download TXT",
      copied: "Command copied.",
      copyFailed: "Automatic copy failed; select and copy the text manually.",
      offTitle: "When the AC is off",
      offBody: "The command is accepted while power is Off as long as the UART connection is Ready.",
      modeTitle: "Power on without Mode",
      modeBody: "Sending only Power: true resumes the last known operating mode.",
      privacyTitle: "Privacy",
      privacyBody: "This page only generates and copies text; it sends no request to your device.",
      labels: {
        Power: ["Power", "Turn the air conditioner on or off"],
        Mode: ["Operating mode", "Auto, cooling, heating, drying, or fan only"],
        TargetTemperature: ["Target temperature", "An integer from 16 to 30 degrees Celsius"],
        FanSpeed: ["Fan speed", "Requested indoor fan speed"],
        HorizontalSwing: ["Horizontal louvers", "Horizontal movement or fixed position"],
        VerticalSwing: ["Vertical louvers", "Vertical movement or fixed position"],
        DisplayMode: ["Display mode", "Turn the display off or choose what it shows"],
        DisplayTemperatureUnit: ["Display temperature unit", "Unit shown on the indoor display"],
        Plasma: ["Plasma", "Air-purification feature when supported"],
        Beeper: ["Command beeper", "Enable or disable the command beep"],
        Sleep: ["Sleep mode", "Enable or disable sleep mode"],
        XFan: ["X-Fan", "Dry the indoor unit after cooling stops"],
        SaveMode: ["Save mode", "Save / 8 °C Heat when supported"]
      },
      options: {
        true: "On", false: "Off", Auto: "Automatic", Cool: "Cooling", Heat: "Heating",
        Dry: "Dry", FanOnly: "Fan only", Low: "Low", Medium: "Medium", High: "High",
        Turbo: "Turbo", Off: "Off", SwingFull: "Full swing", ConstantLeft: "Fixed left",
        ConstantMidLeft: "Fixed mid-left", ConstantMiddle: "Fixed middle",
        ConstantMidRight: "Fixed mid-right", ConstantRight: "Fixed right",
        SwingDown: "Lower-range swing", SwingMidDown: "Mid-to-lower swing",
        SwingMiddle: "Middle-range swing", SwingMidUp: "Mid-to-upper swing",
        SwingUp: "Upper-range swing", ConstantDown: "Fixed down",
        ConstantMidDown: "Fixed mid-down", ConstantMidUp: "Fixed mid-up",
        ConstantUp: "Fixed up", SetTemperature: "Target temperature",
        ActualTemperature: "Current temperature", OutsideTemperature: "Outside temperature",
        Celsius: "Celsius", Fahrenheit: "Fahrenheit"
      }
    }
  }[lang];

  const booleanOptions = ["true", "false"];
  const fields = [
    { key: "Power", type: "boolean", defaultValue: "true", options: booleanOptions },
    { key: "Mode", type: "select", defaultValue: "Cool", options: ["Auto", "Cool", "Heat", "Dry", "FanOnly"] },
    { key: "TargetTemperature", type: "number", defaultValue: "22" },
    { key: "FanSpeed", type: "select", defaultValue: "Low", options: ["Auto", "Low", "Medium", "High", "Turbo"] },
    { key: "HorizontalSwing", type: "select", defaultValue: "ConstantMiddle", options: ["Off", "SwingFull", "ConstantLeft", "ConstantMidLeft", "ConstantMiddle", "ConstantMidRight", "ConstantRight"] },
    { key: "VerticalSwing", type: "select", defaultValue: "ConstantUp", options: ["Off", "SwingFull", "SwingDown", "SwingMidDown", "SwingMiddle", "SwingMidUp", "SwingUp", "ConstantDown", "ConstantMidDown", "ConstantMiddle", "ConstantMidUp", "ConstantUp"] },
    { key: "DisplayMode", type: "select", defaultValue: "Off", options: ["Off", "Auto", "SetTemperature", "ActualTemperature", "OutsideTemperature"] },
    { key: "DisplayTemperatureUnit", type: "select", defaultValue: "Celsius", options: ["Celsius", "Fahrenheit"] },
    { key: "Plasma", type: "boolean", defaultValue: "false", options: booleanOptions },
    { key: "Beeper", type: "boolean", defaultValue: "true", options: booleanOptions },
    { key: "Sleep", type: "boolean", defaultValue: "false", options: booleanOptions },
    { key: "XFan", type: "boolean", defaultValue: "false", options: booleanOptions },
    { key: "SaveMode", type: "boolean", defaultValue: "false", options: booleanOptions }
  ];

  const optionMarkup = (field) => field.options.map((value) =>
    `<option value="${value}"${value === field.defaultValue ? " selected" : ""}>${text.options[value]} · ${value}</option>`
  ).join("");

  const fieldMarkup = (field) => {
    const [label, description] = text.labels[field.key];
    const control = field.type === "number"
      ? `<input class="field-control" id="value-${field.key}" type="number" min="16" max="30" step="1" value="${field.defaultValue}" disabled>`
      : `<select class="field-control" id="value-${field.key}" disabled>${optionMarkup(field)}</select>`;
    return `<div class="field-row" data-field-row="${field.key}">
      <label class="include-label" for="include-${field.key}">
        <input type="checkbox" id="include-${field.key}" data-include="${field.key}">
        <span><span class="field-name">${label} <span class="field-key">${field.key}</span></span><span class="field-description">${description}</span></span>
      </label>
      ${control}
    </div>`;
  };

  const app = document.getElementById("app");
  document.title = text.title;
  app.className = "shell";
  app.innerHTML = `
    <header class="hero">
      <div>
        <p class="eyebrow">${text.eyebrow}</p>
        <h1>${text.heading}</h1>
        <p class="intro">${text.intro}</p>
      </div>
      <a class="language-link" href="${text.languageHref}" lang="${isArabic ? "en" : "ar"}">${text.language}</a>
    </header>
    <div class="toolbar" aria-label="Presets">
      <button class="button" type="button" id="displayPreset">${text.displayPreset}</button>
      <button class="button" type="button" id="comfortPreset">${text.comfortPreset}</button>
      <button class="button" type="button" id="selectAll">${text.selectAll}</button>
      <button class="button" type="button" id="clearAll">${text.clearAll}</button>
    </div>
    <div class="workspace">
      <section class="panel">
        <div class="panel-heading"><h2>${text.properties}</h2><p class="panel-kicker">${text.propertiesHint}</p></div>
        <div class="fields" id="fieldList">${fields.map(fieldMarkup).join("")}</div>
      </section>
      <aside class="panel output-panel">
        <div class="panel-heading">
          <h2>${text.ready}</h2>
          <div><span class="panel-kicker" id="commandKind">${text.partial}</span> · <strong id="selectedCount">0 ${text.of} ${fields.length}</strong></div>
        </div>
        <div class="output-body">
          <div class="format-tabs" role="group" aria-label="Output format">
            <button class="format-tab" type="button" data-format="ha" aria-pressed="true">HA API</button>
            <button class="format-tab" type="button" data-format="curl" aria-pressed="false">cURL</button>
            <button class="format-tab" type="button" data-format="powershell" aria-pressed="false">PowerShell</button>
            <button class="format-tab" type="button" data-format="http" aria-pressed="false">HTTP</button>
            <button class="format-tab" type="button" data-format="json" aria-pressed="false">JSON</button>
          </div>
          <div class="connection-settings">
            <div class="setting" id="nodeSetting"><label for="nodeName">${text.nodeName}</label><input id="nodeName" value="gree" autocomplete="off" spellcheck="false"></div>
            <div class="setting hidden" id="urlSetting"><label for="deviceUrl">${text.deviceUrl}</label><input id="deviceUrl" value="http://192.168.1.100" inputmode="url" autocomplete="off" spellcheck="false"></div>
          </div>
          <div class="output-status error" id="outputStatus" role="status"><span id="statusText">${text.chooseOne}</span></div>
          <pre id="output" tabindex="0">—</pre>
          <div class="output-actions"><button class="button primary" type="button" id="copyButton" disabled>${text.copy}</button><button class="button" type="button" id="downloadButton" disabled>${text.download}</button></div>
          <p class="copy-feedback" id="copyFeedback" aria-live="polite"></p>
        </div>
      </aside>
    </div>
    <section class="notes">
      <article class="note"><strong>${text.offTitle}</strong><p>${text.offBody}</p></article>
      <article class="note"><strong>${text.modeTitle}</strong><p>${text.modeBody}</p></article>
      <article class="note"><strong>${text.privacyTitle}</strong><p>${text.privacyBody}</p></article>
    </section>`;

  const byId = (id) => document.getElementById(id);
  const fieldList = byId("fieldList");
  const output = byId("output");
  const statusText = byId("statusText");
  const outputStatus = byId("outputStatus");
  const selectedCount = byId("selectedCount");
  const commandKind = byId("commandKind");
  const nodeName = byId("nodeName");
  const deviceUrl = byId("deviceUrl");
  const nodeSetting = byId("nodeSetting");
  const urlSetting = byId("urlSetting");
  const copyButton = byId("copyButton");
  const downloadButton = byId("downloadButton");
  const copyFeedback = byId("copyFeedback");
  let activeFormat = "ha";
  let currentText = "";

  function syncField(key) {
    const checkbox = byId(`include-${key}`);
    byId(`value-${key}`).disabled = !checkbox.checked;
    document.querySelector(`[data-field-row="${key}"]`).classList.toggle("active", checkbox.checked);
  }

  function selectedFields() {
    return fields.filter((field) => byId(`include-${field.key}`).checked);
  }

  function setSelections(keys) {
    const selected = new Set(keys);
    fields.forEach((field) => {
      byId(`include-${field.key}`).checked = selected.has(field.key);
      syncField(field.key);
    });
    render();
  }

  function buildCommand() {
    const command = { SchemaVersion: 1, Command: "SetFullState" };
    const chosen = selectedFields();
    if (chosen.length === 0) return { command, chosen, error: text.chooseOne };
    let error = "";
    chosen.forEach((field) => {
      const raw = byId(`value-${field.key}`).value;
      if (field.type === "boolean") command[field.key] = raw === "true";
      else if (field.type === "number") {
        const value = Number(raw);
        if (!Number.isInteger(value) || value < 16 || value > 30) error = text.invalidTemperature;
        else command[field.key] = value;
      } else command[field.key] = raw;
    });
    return { command, chosen, error };
  }

  function normalizedUrl(raw) {
    const url = new URL(raw.trim());
    if (!/^https?:$/.test(url.protocol)) throw new Error("invalid-url");
    url.pathname = "/ac/control";
    url.search = "";
    url.hash = "";
    return url.toString();
  }

  function yamlOutput(json) {
    const serviceNode = nodeName.value.trim().toLowerCase().replaceAll("-", "_");
    if (!/^[a-z0-9_]+$/.test(serviceNode)) throw new Error("invalid-node");
    return `action: esphome.${serviceNode}_set_full_state\ndata:\n  command: >-\n    ${json}`;
  }

  function curlOutput(json) {
    return `curl -X POST '${normalizedUrl(deviceUrl.value)}' \\\n  -H 'Content-Type: application/json' \\\n  --data '${json}'`;
  }

  function powershellOutput(json) {
    const url = normalizedUrl(deviceUrl.value).replaceAll("'", "''");
    return ["Invoke-RestMethod `", "  -Method Post `", `  -Uri '${url}' \``, "  -ContentType 'application/json' `", `  -Body '${json.replaceAll("'", "''")}'`].join("\n");
  }

  function rawHttpOutput(json) {
    const url = new URL(normalizedUrl(deviceUrl.value));
    const bodyLength = new TextEncoder().encode(json).length;
    return `POST ${url.pathname} HTTP/1.1\nHost: ${url.host}\nContent-Type: application/json\nContent-Length: ${bodyLength}\n\n${json}`;
  }

  function render() {
    copyFeedback.textContent = "";
    const result = buildCommand();
    selectedCount.textContent = `${result.chosen.length} ${text.of} ${fields.length}`;
    commandKind.textContent = result.chosen.length === fields.length ? text.complete : text.partial;
    nodeSetting.classList.toggle("hidden", activeFormat !== "ha");
    urlSetting.classList.toggle("hidden", !["curl", "powershell", "http"].includes(activeFormat));
    let error = result.error;
    let generated = "";
    const json = JSON.stringify(result.command);
    if (!error) {
      try {
        if (activeFormat === "ha") generated = yamlOutput(json);
        if (activeFormat === "curl") generated = curlOutput(json);
        if (activeFormat === "powershell") generated = powershellOutput(json);
        if (activeFormat === "http") generated = rawHttpOutput(json);
        if (activeFormat === "json") generated = JSON.stringify(result.command, null, 2);
      } catch (exception) {
        error = exception.message === "invalid-node" ? text.invalidNode : text.invalidUrl;
      }
    }
    currentText = error ? "" : generated;
    output.textContent = error ? "—" : generated;
    outputStatus.classList.toggle("error", Boolean(error));
    statusText.textContent = error || text.valid;
    copyButton.disabled = Boolean(error);
    downloadButton.disabled = Boolean(error);
  }

  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(value);
    const helper = document.createElement("textarea");
    helper.value = value;
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    const copied = document.execCommand("copy");
    helper.remove();
    if (!copied) throw new Error("copy-failed");
  }

  fieldList.addEventListener("change", (event) => {
    const key = event.target.dataset.include;
    if (key) syncField(key);
    render();
  });
  fieldList.addEventListener("input", render);
  nodeName.addEventListener("input", render);
  deviceUrl.addEventListener("input", render);

  document.querySelectorAll("[data-format]").forEach((tab) => tab.addEventListener("click", () => {
    activeFormat = tab.dataset.format;
    document.querySelectorAll("[data-format]").forEach((other) => other.setAttribute("aria-pressed", String(other === tab)));
    render();
  }));

  byId("displayPreset").addEventListener("click", () => setSelections(["DisplayMode"]));
  byId("comfortPreset").addEventListener("click", () => setSelections(["FanSpeed", "HorizontalSwing", "VerticalSwing", "DisplayMode"]));
  byId("selectAll").addEventListener("click", () => setSelections(fields.map((field) => field.key)));
  byId("clearAll").addEventListener("click", () => setSelections([]));

  copyButton.addEventListener("click", async () => {
    try { await copyText(currentText); copyFeedback.textContent = text.copied; }
    catch { copyFeedback.textContent = text.copyFailed; }
  });

  downloadButton.addEventListener("click", () => {
    const objectUrl = URL.createObjectURL(new Blob([currentText], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = `gree-ac-${activeFormat}-command.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
  });

  render();
})();
