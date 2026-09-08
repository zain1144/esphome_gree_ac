[العربية](README.ar.md) | [English](README.md)

# بديل مفتوح المصدر لوحدة Wi-Fi لمكيفات Gree وربطها مع Home Assistant

تضيف هذه المكتبة دعم وحدات ESP التي تتواصل مع مكيفات Gree وSinclair والأجهزة المتوافقة مع بروتوكولها.
المشروع مبني على عمل [piotrva](https://github.com/piotrva/esphome_gree_ac)، مع إصلاحات وإضافات تشمل:

1. إصلاح أوضاع المروحة واختبارها على أجهزة Gree وDaizuki وTGM.
2. معالجة فقدان الأوامر ورفضها.
3. تصحيح الإبلاغ عن درجة الحرارة الحالية ووضع فهرنهايت.
4. إضافة وضع صامت اختياري للأوامر المرسلة من الوحدة.
5. دعم أوامر JSON الجزئية عبر ESPHome Native API وHTTP.

المكتبة متوافقة مع وحدات `GRJWB04-J` و`Cs532ae`.

## منشئ الأوامر التفاعلي

يسمح لك المنشئ باختيار الخصائص المطلوب تغييرها فقط، ثم يولّد أمرًا جاهزًا بإحدى الصيغ التالية:

- Home Assistant Native API
- cURL
- PowerShell
- HTTP الخام
- JSON

الصفحة تعمل داخل المتصفح ولا ترسل أي طلب إلى المكيف بنفسها.

- [فتح منشئ الأوامر بالعربية](https://zain1144.github.io/esphome_gree_ac/)
- [Open the command builder in English](https://zain1144.github.io/esphome_gree_ac/en/)

## التثبيت والتوصيل

يمكن تثبيت المشروع على وحدة ESP، مثل ESP01-M مع دائرة تحويل مستوى الإشارة بين 3.3V و5V. استخدم ملف YAML
الموجود داخل مجلد [`examples`](examples)، واستبدل القيم المكتوب مكانها `[insert yours]` ببيانات جهازك وشبكتك.

بعد البناء يمكنك التفليش من ESPHome أو تنزيل الملف الثنائي واستخدام
[ESPHome Flasher](https://github.com/esphome/esphome-flasher/releases).

راجع صور التوصيل الموجودة في المستودع:

- [`FlashingLayout.jpg`](FlashingLayout.jpg) لتوصيل التفليش.
- [`modifiedTTL.jpg`](modifiedTTL.jpg) لتعديل محول USB-to-TTL.
- الصور `ModuleCable*` لتوصيل الوحدة بالمكيف.

موصل المكيف المستخدم هو `JST XARP-04V` بأربعة أطراف. تأكد من ثبات كل الأسلاك وصحة الجهد قبل تشغيل الوحدة.

بعد توصيل الوحدة بالمكيف، يفترض أن تظهر في Home Assistant ضمن `Settings → Integrations → ESPHome`. إذا تعذر اتصالها
بالشبكة، ستنشئ نقطة وصول يمكن إعدادها عادةً من خلال `192.168.4.1`.

> الاستخدام والتوصيل والتفليش على مسؤوليتك الخاصة.

## المكيفات التي لا تدعم التدفئة

التدفئة مفعّلة افتراضيًا للمحافظة على التوافق السابق. عطّلها للأجهزة التي تدعم التبريد والمروحة فقط:

```yaml
climate:
  - platform: sinclair_ac
    name: ${devicename}
    supports_heat: false
```

يساعد ذلك أيضًا أوامر `climate.turn_on` والمساعدات الصوتية على اختيار وضع `Cool` بدل تجربة `Heat`.

## واجهة أوامر الحالة

يستقبل المكوّن أمر `SetFullState` من Home Assistant Native API أو من HTTP. الاسم محفوظ للتوافق، لكن JSON يمكن أن
يحتوي حالة كاملة أو أي مجموعة من الخصائص التي تريد تغييرها. الخصائص غير المرسلة تبقى على أحدث قيم معروفة للمكوّن،
ويتم التحقق من الأمر كاملًا قبل إرسال تحديث واحد إلى المكيف.

### العمليات المتاحة

| الوسيلة | العملية | النتيجة |
| --- | --- | --- |
| Native API | `esphome.<node_name>_set_full_state` | التحقق من JSON وجدولة تحديث واحد للمكيف |
| HTTP | `POST /ac/control` | إرسال أمر حالة كامل أو جزئي |
| HTTP | `GET /ac/state` | قراءة أحدث حالة معروفة بصيغة JSON |

حجم الأمر الأقصى هو 2048 بايت. يجب أن يحتوي كل أمر على `SchemaVersion` و`Command` وخاصية حالة واحدة على الأقل.

### إعداد ESPHome المطلوب

```yaml
api:
  custom_services: true

web_server:
  port: 80
```

إذا أضفت مصادقة إلى `web_server` فإنها ستحمي أيضًا المسارين `/ac/control` و`/ac/state`.

### الخصائص القابلة للكتابة

| الخاصية | النوع أو القيم |
| --- | --- |
| `Power` | `true` أو `false` |
| `Mode` | `Auto`, `Cool`, `Heat`, `Dry`, `FanOnly` |
| `TargetTemperature` | عدد صحيح من 16 إلى 30 مئوية |
| `FanSpeed` | `Auto`, `Low`, `Medium`, `High`, `Turbo` |
| `HorizontalSwing` | حركة أو موضع ثابت للشفرات الأفقية |
| `VerticalSwing` | حركة أو موضع ثابت للشفرات العمودية |
| `DisplayMode` | `Off`, `Auto`, `SetTemperature`, `ActualTemperature`, `OutsideTemperature` |
| `DisplayTemperatureUnit` | `Celsius` أو `Fahrenheit` |
| `Plasma`, `Beeper`, `Sleep`, `XFan`, `SaveMode` | `true` أو `false` |

بعض الخصائص الاختيارية تعتمد على طراز المكيف وقد يتجاهلها الجهاز إذا لم يكن يدعمها. راجع
[المرجع الإنجليزي الكامل](README.md#setfullstate-json-object) لجميع قيم الشفرات وتفاصيل الاستجابات والأخطاء.

### مثال: تغيير الشاشة فقط

```json
{
  "SchemaVersion": 1,
  "Command": "SetFullState",
  "DisplayMode": "Off"
}
```

### مثال: تغيير المروحة والشفرات والشاشة معًا

```json
{
  "SchemaVersion": 1,
  "Command": "SetFullState",
  "FanSpeed": "Low",
  "HorizontalSwing": "ConstantMiddle",
  "VerticalSwing": "ConstantUp",
  "DisplayMode": "ActualTemperature"
}
```

### Home Assistant Native API

إذا كان اسم جهاز ESPHome هو `gree`:

```yaml
action: esphome.gree_set_full_state
data:
  command: >-
    {"SchemaVersion":1,"Command":"SetFullState","FanSpeed":"Low","DisplayMode":"Off"}
```

### HTTP باستخدام cURL

```bash
curl -X POST http://DEVICE_IP/ac/control \
  -H "Content-Type: application/json" \
  --data '{"SchemaVersion":1,"Command":"SetFullState","DisplayMode":"Off"}'
```

عند نجاح الطلب يعيد المسار HTTP `200`، وهذا يعني أن الأمر قُبل وجدولت المكتبة تحديثًا واحدًا. يؤكد تقرير المكيف
التالي الحالة الناتجة. إذا لم يكن اتصال UART جاهزًا فسيعود HTTP `409`، وإذا كانت بنية الأمر أو قيمه غير صالحة فسيعود
HTTP `422` دون تغيير حالة المكيف.

يمكن إرسال الأوامر والمكيف مطفأ ما دام اتصال UART في حالة `Ready`. وإرسال `"Power": true` دون `Mode` يعيد تشغيله
باستخدام آخر وضع تشغيل معروف.

### قراءة الحالة الحالية

```text
GET http://DEVICE_IP/ac/state
```

تعرض الاستجابة أحدث القيم المعروفة، ومنها الطاقة ووضع التشغيل والحرارة والمروحة والشفرات والشاشة والخصائص الإضافية.
`CurrentTemperature` خاصية للقراءة فقط ولا يجوز إرسالها داخل `SetFullState`.

## الترخيص

راجع ملف [`LICENSE`](LICENSE).
