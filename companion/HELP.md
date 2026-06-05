## Telycam PTZ IP Camera

Control plugin for Telycam PTZ IP Cameras via VISCA over UDP and HTTP CGI API.

### Connection Settings

- **Host**: Camera IP address (e.g., 192.168.31.56)
- **VISCA Port**: UDP port for VISCA commands (default: 52381)
- **HTTP Port**: HTTP port for CGI API (default: 80)

### Features

#### Pan/Tilt Control

- Directional movement (8 directions)
- Stop and Home commands
- Adjustable speed

#### Lens Control

- Zoom In/Out (variable speed)
- Focus Near/Far (auto and manual)
- One-push autofocus

#### Presets

- 50 preset positions (Recall/Save)
- Adjustable recall speed

#### Image Settings

- Brightness, Sharpness, Saturation, Contrast, Gamma (UP/DOWN with current value tracking)
- WDR Level adjustment
- BLC (Backlight Compensation) ON/OFF
- D-WDR ON/OFF
- 2DNR/3DNR modes

#### Exposure

- Auto / Manual / Shutter Priority / Iris Priority / Bright Priority modes
- Shutter, Iris, Gain adjustment

#### White Balance

- Auto / Indoor / Outdoor / OnePush / ATW / Manual modes
- R/G/B Gain adjustment

#### System

- Power ON/OFF
- Day/Night (IR Cut) mode
- Tally light control

### Protocol Notes

- **VISCA over UDP**: Used for PTZ, zoom, focus, presets, and image parameter direct commands
- **HTTP CGI API**: Used for reading current status and some image settings
- Image parameters (brightness, sharpness, etc.) support UP/DOWN by reading current value via HTTP and sending VISCA direct command

### Variables

- `wb_mode`: Current white balance mode
- `exposure_mode`: Current exposure mode
- `focus_mode`: Current focus mode
