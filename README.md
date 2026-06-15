# Telycam PTZ IP Camera Module for Bitfocus Companion

This module allows you to control Telycam PTZ IP Cameras using Bitfocus Companion. It supports dual-protocol communication:

- **VISCA over IP (UDP)**: For ultra-low latency real-time motion control (Pan, Tilt, Zoom, presets, etc.).
- **HTTP (GET REST API)**: For stateless configurations and double-feedback status polling (White Balance, Exposure, WDR, Backlight, etc.).

## Connection Configuration

To configure this module, you need to provide:

- **Camera IP Address (Target IP)**: The IP address of your Telycam camera.
- **VISCA UDP Port**: The port used for VISCA over IP control (default is `52381`).
- **HTTP Port**: The port used for HTTP REST API control (default is `80`).
- **Polling Interval (ms)**: Set the HTTP polling interval in milliseconds (default is `5000`ms, use `0` to disable).
