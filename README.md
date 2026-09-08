[English](README.md) | [العربية](README.ar.md)

# Open source WIFI module replacement for Gree protocol based AC's for Home Assistant.
This repository adds support for ESP-based WiFi modules to interface with Gree/Sinclair AC units.
It's forked from https://github.com/piotrva/esphome_gree_ac, big thanks to @piotrva for his work!

My fork currently differs from the original code in the following ways. What I did:

1) Fixed the fan mode, tested on Gree/Daizuki/TGM AC's.
2) Fixed the dropping of commands
3) Fixed the rejection of commands
4) Fixed reporting of current temp
5) Fixed the Fahrenheit mode
6) Implemented an optional silent mode (no beeping), only works for module sent commands (not for
   remote control sent commands)
   
It's now compatible with GRJWB04-J / Cs532ae wifi modules

# Current state:
No known problems! if you run into an issue though, please let me know.

## Interactive command builder

Use the browser-based builder to select only the AC properties you want to change and generate a ready-to-copy
Home Assistant Native API, cURL, PowerShell, raw HTTP, or JSON command. Nothing is sent to the AC by the page.

- [Open the command builder in English](https://zain1144.github.io/esphome_gree_ac/en/)
- [افتح منشئ الأوامر بالعربية](https://zain1144.github.io/esphome_gree_ac/)

# HOW TO 
You can flash this to an ESP module. I used an ESP01-M module, like this one:
https://nl.aliexpress.com/item/1005008528226032.html
So that’s both an ESP01 and the ‘adapter board’ for 3.3V ↔ 5V conversion (since the ESP01 uses 3.3V and the AC uses 5V).


Create a new project in the ESPbuilder from Home assistant and use my YAML (from the examples directory), copy or modify the info from the generated YAML to mine, where it says '[insert yours]'.
Then you should be able to compile it. I think you can flash directly from Home Assistant,
but I downloaded the compiled binary and flashed with: https://github.com/esphome/esphome-flasher/releases

See FlashingLayout.jpg for wiring for flashing. Alternatively, if you plan to flash several, it might be worthwile to make an adapted version of the USB-TO-TTL adapter and solder 2 jumpers, which willl put the chip into programming mode immediately, so no more wiring, you can just clip on the chip and flash it right away. See modifiedTTL.jpg

See the 4 module cable photos for wiring (for flashing and the wiring for connecting it to your AC). The connector is a 4 pins “JST XARP-04V”, you can for example order them here: https://es.aliexpress.com/item/1005009830663057.html. Alternatively it's possible to just use dupont cables and then put tape around the 4 ends to simulate the form of a connector (so that it makes it thicker), so that it will sit still in the connector socket, but make sure all 4 cables make connection, I tried that first and you might need to make adjustments because of 1 cable not making solid connection (this might result in errors in the log). So best to use the real connector. 


After you've connected the module to your AC, it should pop under settings/integrations/esphome as a 'new device' and then you can add it to HA. If not, check if it started a WIFI access point, which it will do if it can't connect to your home wifi. You can then connect to that and configure it from there (via 192.168.4.1)

**USE AT YOUR OWN RISK!**

## Cooling-only models

Heating remains enabled by default for backward compatibility. If an AC supports cooling and fan modes but not
heating, disable the unsupported mode in the climate configuration:

```yaml
climate:
  - platform: sinclair_ac
    name: ${devicename}
    supports_heat: false
```

This also lets Home Assistant's generic `climate.turn_on` action select `Cool` instead of first trying the advertised
`Heat` mode. It fixes power-on commands from assistants such as Alexa while preserving heating support for other AC
models.

## State API reference

The component accepts `SetFullState` through either ESPHome Native API or HTTP. The operation name is retained for
backward compatibility, but the JSON object can contain either a complete state or only the writable fields that need
to change. Both transports use the same JSON schema, parser, validation, and single-update path. Missing writable fields
keep their latest values known to the component; normal AC reports continually refresh the reportable settings. Invalid
commands change nothing and send no update to the air conditioner.

The JSON command is limited to 2048 bytes. It is carried as a normal Native API string or HTTP request body and does
not use an ESPHome template text entity, so the template text 255-character limit does not apply.

### Available operations

| Transport | Operation | Input | Result |
| --- | --- | --- | --- |
| Native API | `esphome.<node_name>_set_full_state` | One string argument named `command`, containing a complete or partial JSON object | Validates and schedules one AC state update |
| HTTP | `POST /ac/control` | A complete or partial JSON object as the request body | Validates and schedules one AC state update |
| HTTP | `GET /ac/state` | None | Returns the current known state as JSON |
| HTTP | `OPTIONS /ac/control` or `OPTIONS /ac/state` | None | Returns `204` for HTTP preflight |

`SchemaVersion`, `Command`, and at least one writable state field are required. Every other writable field is optional.
The component starts with its latest known state, replaces only the supplied fields, validates the complete result, and
applies it as one logical update. This also works while the AC power is off as long as serial communication is ready.
Normal ESPHome climate and select entities remain available separately in Home Assistant.

### Required ESPHome configuration

Enable custom Native API actions and the HTTP web server:

```yaml
api:
  custom_services: true

web_server:
  port: 80
```

If `web_server` authentication is configured, it also protects `/ac/control` and `/ac/state`.

### `SetFullState` JSON object

`SchemaVersion` and `Command` are always required. Include one or more of the remaining writable properties. Property
names and string values are case-sensitive. Additional properties are rejected.

| Property | JSON type | Accepted value | Meaning |
| --- | --- | --- | --- |
| `SchemaVersion` | integer | `1` | Version of this JSON schema. It is validated by the ESP and is not sent to the AC. |
| `Command` | string | `SetFullState` | Selects the state control command. The legacy name is kept for compatibility. |
| `Power` | boolean | `true` or `false` | Turns the AC on or off. It is optional like the other writable properties. |
| `Mode` | string | See [Mode values](#mode-values) | Operating mode used when `Power` is `true`. |
| `TargetTemperature` | integer | `16` through `30` | Target temperature in degrees Celsius. It remains Celsius when the display unit is Fahrenheit. |
| `FanSpeed` | string | See [Fan speed values](#fan-speed-values) | Requested indoor fan speed. |
| `HorizontalSwing` | string | See [Horizontal direction values](#horizontal-direction-values) | Horizontal louver movement or fixed position. |
| `VerticalSwing` | string | See [Vertical direction values](#vertical-direction-values) | Vertical louver movement or fixed position. |
| `DisplayMode` | string | See [Display mode values](#display-mode-values) | What the indoor unit display should show. |
| `DisplayTemperatureUnit` | string | `Celsius` or `Fahrenheit` | Unit used by the indoor unit display. |
| `Plasma` | boolean | `true` or `false` | Enables or disables the plasma/ionizer function. |
| `Beeper` | boolean | `true` or `false` | `true` permits one command beep; `false` requests silent component-sent commands. |
| `Sleep` | boolean | `true` or `false` | Enables or disables sleep mode. |
| `XFan` | boolean | `true` or `false` | Enables or disables the post-cooling indoor fan drying function. |
| `SaveMode` | boolean | `true` or `false` | Enables or disables Save/8 °C Heat mode. |

Some optional functions depend on the AC model. The command is still encoded when the value is valid, but an AC that
does not implement that function may ignore it.

#### Mode values

| Value | Meaning |
| --- | --- |
| `Auto` | Automatic operating mode |
| `Cool` | Cooling |
| `Heat` | Heating |
| `Dry` | Dehumidification |
| `FanOnly` | Fan without cooling or heating |

`Off` is not a valid `Mode` value. Use `"Power": false` to turn the AC off. When `Mode` is omitted, the latest reported
operating mode is preserved. This means a partial `{"Power":true}` command turns an off AC back on in its last known
mode.

#### Fan speed values

| Value | Meaning |
| --- | --- |
| `Auto` | Automatic fan speed |
| `Low` | Low speed |
| `Medium` | Medium speed |
| `High` | High speed |
| `Turbo` | Maximum/turbo speed |

#### Horizontal direction values

| Value | Movement or position |
| --- | --- |
| `Off` | Horizontal swing off |
| `SwingFull` | Move across the full horizontal range |
| `ConstantLeft` | Fixed left |
| `ConstantMidLeft` | Fixed between left and middle |
| `ConstantMiddle` | Fixed middle |
| `ConstantMidRight` | Fixed between middle and right |
| `ConstantRight` | Fixed right |

#### Vertical direction values

| Value | Movement or position |
| --- | --- |
| `Off` | Vertical swing off |
| `SwingFull` | Move across the full vertical range |
| `SwingDown` | Moving swing in the lower range |
| `SwingMidDown` | Moving swing between middle and down |
| `SwingMiddle` | Moving swing around the middle |
| `SwingMidUp` | Moving swing between middle and up |
| `SwingUp` | Moving swing in the upper range |
| `ConstantDown` | Fixed down |
| `ConstantMidDown` | Fixed between down and middle |
| `ConstantMiddle` | Fixed middle |
| `ConstantMidUp` | Fixed between middle and up |
| `ConstantUp` | Fixed up |

#### Display mode values

| Value | Indoor unit display |
| --- | --- |
| `Off` | Display off |
| `Auto` | AC-controlled automatic display mode |
| `SetTemperature` | Target temperature |
| `ActualTemperature` | Current indoor temperature |
| `OutsideTemperature` | Outside temperature, when supported by the AC |

### Partial command examples

Change only the indoor display:

```json
{
  "SchemaVersion": 1,
  "Command": "SetFullState",
  "DisplayMode": "Off"
}
```

Change the fan, both louvers, and the display together while preserving every other setting:

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

### Complete command example

```json
{
  "SchemaVersion": 1,
  "Command": "SetFullState",
  "Power": true,
  "Mode": "Cool",
  "TargetTemperature": 22,
  "FanSpeed": "Low",
  "HorizontalSwing": "ConstantMiddle",
  "VerticalSwing": "ConstantUp",
  "DisplayMode": "ActualTemperature",
  "DisplayTemperatureUnit": "Celsius",
  "Plasma": false,
  "Beeper": true,
  "Sleep": false,
  "XFan": false,
  "SaveMode": false
}
```

### Home Assistant Native API

Home Assistant exposes the registered action as `esphome.<node_name>_set_full_state`. For an ESPHome node named
`gree`, use:

```yaml
action: esphome.gree_set_full_state
data:
  command: >-
    {"SchemaVersion":1,"Command":"SetFullState","FanSpeed":"Low","HorizontalSwing":"ConstantMiddle","DisplayMode":"Off"}
```

The Native API action has one parameter:

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `command` | string | Yes | Complete or partial `SetFullState` JSON object, up to 2048 bytes |

Native API custom actions do not return a response body. Acceptance is logged as `Accepted state command; one AC state
update is pending`. Validation and readiness failures are written to the ESPHome log and do not send an AC update.

### HTTP control API

Send a complete or partial JSON object to:

```text
POST http://DEVICE_IP/ac/control
Content-Type: application/json
```

For example, change only the display:

```bash
curl -X POST http://DEVICE_IP/ac/control \
  -H "Content-Type: application/json" \
  --data '{"SchemaVersion":1,"Command":"SetFullState","DisplayMode":"Off"}'
```

A successful request returns HTTP `200`:

```json
{
  "Success": true,
  "Status": "Accepted",
  "Message": "The requested state changes will be applied as one air-conditioner update"
}
```

HTTP errors use this shape:

```json
{
  "Success": false,
  "Error": "InvalidCommand",
  "Detail": "Missing required field: Command"
}
```

| HTTP status | Error | Meaning |
| --- | --- | --- |
| `400` | `PayloadTooLarge` | Request body exceeds 2048 bytes |
| `400` | `InvalidRequestBody` | Request body chunks are incomplete or out of order |
| `409` | `AirConditionerNotReady` | The ESP has no active serial connection to the AC |
| `422` | `InvalidCommand` | Empty or invalid JSON, a missing required field, no writable field, an unknown property, wrong type, or unsupported value |

### HTTP state API

Read the current state with:

```text
GET http://DEVICE_IP/ac/state
```

Example response:

```json
{
  "Ready": true,
  "Power": true,
  "Mode": "Cool",
  "TargetTemperature": 22,
  "CurrentTemperature": 26,
  "FanSpeed": "Low",
  "HorizontalSwing": "ConstantMiddle",
  "VerticalSwing": "ConstantUp",
  "DisplayMode": "ActualTemperature",
  "DisplayTemperatureUnit": "Celsius",
  "Plasma": false,
  "Beeper": true,
  "Sleep": false,
  "XFan": false,
  "SaveMode": false
}
```

| Response property | Type | Meaning |
| --- | --- | --- |
| `Ready` | boolean | Whether valid serial communication with the AC is active |
| `Power` | boolean | Current reported power state |
| `Mode` | string | `Off`, `Auto`, `Cool`, `Heat`, `Dry`, or `FanOnly` |
| `TargetTemperature` | number or `null` | Current target temperature; `null` until known |
| `CurrentTemperature` | number or `null` | Current indoor temperature; `null` until known |
| `FanSpeed` | string | Current normalized fan speed |
| `HorizontalSwing` | string | Current normalized horizontal movement or position |
| `VerticalSwing` | string | Current normalized vertical movement or position |
| `DisplayMode` | string | Current normalized indoor display mode |
| `DisplayTemperatureUnit` | string | `Celsius` or `Fahrenheit` |
| `Plasma` | boolean | Current plasma/ionizer state |
| `Beeper` | boolean | Current command-beeper state |
| `Sleep` | boolean | Current sleep-mode state |
| `XFan` | boolean | Current X-Fan state |
| `SaveMode` | boolean | Current Save/8 °C Heat state |

`CurrentTemperature` is read-only. Including it in `SetFullState` is treated as an unknown property and rejects the
entire command. State returned by this endpoint is the latest state known to the component; a successful control
response means the command was accepted, while the following AC report confirms the resulting state.
