import { PageHero, Section } from '@/components/ui/section'
import {
  Cpu, Code2, Terminal, BookOpen, Box, Rocket, ShieldCheck,
  Wrench, Lightbulb, PlugZap, Camera, CircleCheck, CircleX,
} from 'lucide-react'
import { waLink } from '@/lib/utils'

export const metadata = {
  title: 'Documentation',
  description: 'Complete documentation for FLYQ Air & FLYQ Vision — hardware, Arduino / Python / ESP-IDF programming, firmware flashing, flight manual, troubleshooting and API reference.',
}

const NAV = [
  { id: 'quick-start', label: 'Quick Start', icon: Rocket },
  { id: 'hardware', label: 'Hardware', icon: Cpu },
  { id: 'philosophy', label: 'Design', icon: Lightbulb },
  { id: 'programming', label: 'Programming', icon: Code2 },
  { id: 'firmware', label: 'Firmware Flashing', icon: PlugZap },
  { id: 'flight', label: 'Flight Manual', icon: ShieldCheck },
  { id: 'troubleshooting', label: 'Troubleshooting', icon: Wrench },
  { id: 'api', label: 'API Reference', icon: Terminal },
  { id: 'projects', label: 'Project Ideas', icon: Box },
]

function Code({ children }: { children: string }) {
  return (
    <pre className="glass rounded-xl p-4 overflow-x-auto text-xs md:text-sm font-mono text-premium/80 leading-relaxed my-3 border border-border">
      <code>{children}</code>
    </pre>
  )
}

function SpecTable({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="glass rounded-2xl p-5">
      <h4 className="font-semibold text-sm mb-3 text-cyber">{title}</h4>
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k} className="border-b border-border/60 last:border-0">
              <td className="py-1.5 pr-3 text-premium/50 whitespace-nowrap">{k}</td>
              <td className="py-1.5 font-medium">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Docs() {
  return (
    <>
      <PageHero
        eyebrow="Complete Documentation"
        title={<>Everything about <span className="grad-cyber">FLYQ Air &amp; Vision</span></>}
        sub="From unboxing to autonomous flight programming — hardware guides, programming tutorials, and flight training. 100% open-source (software MIT, hardware CERN-OHL)."
      />

      {/* Quick navigation */}
      <Section className="py-8">
        <nav aria-label="Documentation sections" className="flex flex-wrap gap-2">
          {NAV.map(n => (
            <a key={n.id} href={`#${n.id}`} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full glass text-sm hover:text-cyber transition">
              <n.icon size={15} /> {n.label}
            </a>
          ))}
        </nav>
      </Section>

      {/* QUICK START */}
      <Section id="quick-start" className="py-10 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-11 h-11 rounded-xl bg-cyber/10 grid place-items-center text-cyber"><Rocket size={20} /></span>
          <div>
            <h2 className="text-2xl font-bold">Quick Start Guide</h2>
            <p className="text-premium/55 text-sm">From unboxing to your first flight in 30 minutes</p>
          </div>
        </div>

        <div className="space-y-5">
          <article className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-3"><span className="text-cyber">1.</span> Unbox your FLYQ drone</h3>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-premium/70">
              <ul className="space-y-1 list-disc list-inside">
                <li><b>1×</b> Assembled drone frame with PCB</li>
                <li><b>4×</b> Coreless DC motors (720 type)</li>
                <li><b>4×</b> Propellers (2 CW + 2 CCW)</li>
                <li><b>2×</b> Spare propellers</li>
                <li><b>1×</b> 3.7V LiPo battery (600mAh)</li>
              </ul>
              <ul className="space-y-1 list-disc list-inside">
                <li><b>1×</b> USB-C charging cable</li>
                <li><b>4×</b> Propeller guards (optional)</li>
                <li><b>1×</b> Screwdriver tool</li>
                <li><b>1×</b> Quick start guide</li>
                <li><b>1×</b> Safety card</li>
              </ul>
            </div>
            <p className="mt-3 text-xs text-amber-400/90"><b>Important:</b> Keep propellers away from motors until you're ready to fly. Store battery at room temperature.</p>
          </article>

          <article className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-3"><span className="text-cyber">2.</span> Charge the battery</h3>
            <ol className="space-y-1 text-sm text-premium/70 list-decimal list-inside">
              <li>Connect the USB-C cable to the battery charging port</li>
              <li>Plug into a 5V USB power source (computer, phone charger, power bank)</li>
              <li>LED indicator turns <span className="text-red-400">RED</span> while charging</li>
              <li>LED turns <span className="text-green-400">GREEN</span> when fully charged (~45 minutes)</li>
              <li>Disconnect once complete to preserve battery life</li>
            </ol>
            <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm">
              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                <p className="font-semibold text-green-400 mb-1 flex items-center gap-1"><CircleCheck size={15} /> DO</p>
                <ul className="text-premium/70 space-y-0.5 list-disc list-inside">
                  <li>Use a 5V 1A USB charger</li><li>Charge on a fireproof surface</li>
                  <li>Monitor during charging</li><li>Store at 50% if not flying</li>
                </ul>
              </div>
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <p className="font-semibold text-red-400 mb-1 flex items-center gap-1"><CircleX size={15} /> DON'T</p>
                <ul className="text-premium/70 space-y-0.5 list-disc list-inside">
                  <li>Use fast chargers (&gt;5V)</li><li>Leave unattended while charging</li>
                  <li>Charge a damaged battery</li><li>Overcharge beyond 4.2V</li>
                </ul>
              </div>
            </div>
          </article>

          <article className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-3"><span className="text-cyber">3.</span> Install development tools</h3>
            <p className="text-sm text-premium/60 mb-2"><b>Option 1 — Arduino IDE</b> (recommended for beginners). Install ESP32 board support, select <span className="font-mono">ESP32S3 Dev Module</span>, then add the FLYQ library.</p>
            <p className="text-sm text-premium/60 mb-2"><b>Option 2 — Python SDK</b> (autonomous flight, Crazyflie-compatible):</p>
            <Code>{`$ pip install cflib
$ pip install flyq-python
$ python -c "import cflib; print('Success!')"`}</Code>
            <p className="text-sm text-premium/60 mb-2"><b>Option 3 — ESP-IDF</b> (advanced firmware):</p>
            <Code>{`git clone https://github.com/passion3d/flyq-firmware
idf.py menuconfig
idf.py build flash`}</Code>
          </article>

          <article className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-3"><span className="text-cyber">4.</span> Connect &amp; calibrate</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-premium/70">
              <div>
                <p className="font-semibold mb-1">Wi-Fi connection</p>
                <ol className="space-y-0.5 list-decimal list-inside">
                  <li>Power on the drone (connect battery)</li>
                  <li>Wait for LED to blink blue (AP mode)</li>
                  <li>Connect to Wi-Fi: <span className="font-mono">FLYQ-XXXX</span></li>
                  <li>Password: <span className="font-mono">flyq1234</span></li>
                  <li>Open <span className="font-mono">http://192.168.4.1</span></li>
                </ol>
              </div>
              <div>
                <p className="font-semibold mb-1">IMU calibration (critical!)</p>
                <ol className="space-y-0.5 list-decimal list-inside">
                  <li>Place drone on a flat, level surface</li>
                  <li>Click "Calibrate IMU" in the web UI</li>
                  <li>Keep perfectly still for 10 seconds</li>
                  <li>LED turns solid green when complete</li>
                  <li>Recalibrate if LED blinks red</li>
                </ol>
              </div>
            </div>
          </article>

          <article className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-3"><span className="text-cyber">5.</span> Your first flight!</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-premium/70">
              <div>
                <p className="font-semibold mb-1">Pre-flight checklist</p>
                <ul className="space-y-0.5 list-disc list-inside">
                  <li>Battery fully charged &amp; IMU calibrated</li>
                  <li>Propellers secured correctly</li>
                  <li>Clear 3m radius, indoors, no wind</li>
                  <li>Propeller guards installed</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-1">Flight controls (keyboard)</p>
                <ul className="space-y-0.5 font-mono text-xs">
                  <li>Throttle up/down — <b>W / S</b></li>
                  <li>Yaw (rotate) — <b>A / D</b></li>
                  <li>Pitch fwd/back — <b>↑ / ↓</b></li>
                  <li>Roll left/right — <b>← / →</b></li>
                  <li>Emergency stop — <b>SPACE</b></li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </Section>

      {/* HARDWARE */}
      <Section id="hardware" className="py-10 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-11 h-11 rounded-xl bg-cyber/10 grid place-items-center text-cyber"><Cpu size={20} /></span>
          <div>
            <h2 className="text-2xl font-bold">Hardware Architecture</h2>
            <p className="text-premium/55 text-sm">Complete technical reference for FLYQ Air &amp; FLYQ Vision</p>
          </div>
        </div>

        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">FLYQ Air <span className="text-xs font-normal text-premium/50">— Programmable Drone</span></h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <SpecTable title="Processor & Memory" rows={[['CPU', 'ESP32-S3 Dual-Core Xtensa LX7 @ 240MHz'], ['SRAM', '512KB on-chip'], ['Flash', '4MB external'], ['Architecture', '32-bit with FPU']]} />
          <SpecTable title="Connectivity" rows={[['Wi-Fi', '802.11 b/g/n 2.4GHz'], ['Bluetooth', 'BLE 5.0 Long Range'], ['Range', '50m (open space)'], ['USB', 'Type-C (data + charging)']]} />
          <SpecTable title="Sensors & IMU" rows={[['IMU', 'MPU6050 6-axis'], ['Gyroscope', '±250/500/1000/2000 °/s'], ['Accelerometer', '±2/4/8/16 g'], ['Sample Rate', '1kHz max']]} />
          <SpecTable title="Motor System" rows={[['Motors', '4× 720 coreless DC'], ['Max RPM', '38,000 RPM'], ['Voltage', '3.7V nominal'], ['Control', 'PWM via MOSFET H-bridge']]} />
          <SpecTable title="Power System" rows={[['Battery', '1S LiPo 3.7V 600mAh'], ['Flight Time', '8–10 minutes'], ['Charge Time', '~45 min (5V 1A)'], ['Protection', 'Over-charge / over-discharge']]} />
          <SpecTable title="Physical & I/O" rows={[['Size', '92 × 92 × 20mm'], ['Weight', '~45g (w/o battery)'], ['Expansion', '24-pin 2.54mm header'], ['GPIO', '18 pins · I2C · SPI · 2× UART · ADC']]} />
        </div>

        <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><Camera size={18} className="text-cyber" /> FLYQ Vision <span className="text-xs font-normal text-premium/50">— Camera &amp; Vision AI Drone</span></h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SpecTable title="Camera Module" rows={[['Sensor', 'OV2640 2MP CMOS'], ['Resolution', '1280 × 720 (HD 720p)'], ['Frame Rate', '30 FPS'], ['FOV', '120° wide angle'], ['Streaming', 'Real-time Wi-Fi MJPEG']]} />
          <SpecTable title="Vision Processing" rows={[['PSRAM', '8MB frame buffers'], ['AI Accelerator', 'Vector instructions'], ['Gesture', 'Hand tracking / poses'], ['Latency', '< 200ms streaming']]} />
          <SpecTable title="Enhanced Processor" rows={[['CPU', 'ESP32-S3 Dual-Core @ 240MHz'], ['SRAM', '512KB on-chip'], ['PSRAM', '8MB external'], ['Flash', '4MB SPI']]} />
          <SpecTable title="Connectivity" rows={[['Wi-Fi', '802.11 b/g/n dual antenna'], ['Video', 'HD 720p @ 30fps'], ['Range', '50m with video'], ['Protocols', 'UDP · WebSocket · RTSP']]} />
          <SpecTable title="SDK & Programming" rows={[['Arduino IDE', 'Full support + camera libs'], ['Python SDK', 'OpenCV integration'], ['ESP-IDF', 'Advanced firmware'], ['Mobile App', 'iOS & Android (WebRTC)']]} />
          <SpecTable title="Power & Performance" rows={[['Battery', '1S LiPo 3.7V 600mAh'], ['Flight Time', '7–9 min (with camera)'], ['Weight', '~52g (with camera)'], ['Power Draw', 'Higher due to camera']]} />
        </div>
      </Section>

      {/* DESIGN PHILOSOPHY */}
      <Section id="philosophy" className="py-10 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-11 h-11 rounded-xl bg-cyber/10 grid place-items-center text-cyber"><Lightbulb size={20} /></span>
          <div>
            <h2 className="text-2xl font-bold">Design Philosophy</h2>
            <p className="text-premium/55 text-sm">Professional drone engineering made accessible for education &amp; development</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ['Modular Design', 'Snap-together components with clear markings — no soldering required for basic assembly. Assembly takes ~30 minutes.'],
            ['Budget-Friendly', 'Professional-grade hardware at student-friendly prices — a fraction of commercial alternatives.'],
            ['WiFi-Based Smart Control', 'No expensive radio transmitter needed. Control from any phone, tablet or laptop via web UI or Python — 20–30ms latency, 50m range.'],
            ['Complete Documentation', 'Video tutorials, illustrated guides and community support at every step.'],
            ['24-Pin Expansion', 'I2C, SPI, UART, GPIO and regulated 5V/3.3V power for barometers, ToF, optical flow, GPS, displays and more.'],
            ['Crazyflie API Compatible', 'Run existing Crazyflie Python scripts unchanged — waypoint navigation, formations and advanced maneuvers.'],
          ].map(([h, s]) => (
            <div key={h} className="glass rounded-2xl p-5">
              <h4 className="font-semibold text-sm mb-1">{h}</h4>
              <p className="text-premium/55 text-sm">{s}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PROGRAMMING */}
      <Section id="programming" className="py-10 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-11 h-11 rounded-xl bg-cyber/10 grid place-items-center text-cyber"><Code2 size={20} /></span>
          <div>
            <h2 className="text-2xl font-bold">Programming Tutorials</h2>
            <p className="text-premium/55 text-sm">Complete guides for Arduino, Python and ESP-IDF development</p>
          </div>
        </div>

        <h3 className="font-bold mb-2">Arduino IDE — Blink LED</h3>
        <Code>{`// FLYQ Air - Blink LED Example
#define LED_PIN 2  // Onboard LED on GPIO2

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(115200);
  Serial.println("FLYQ Air - LED Blink Test");
}

void loop() {
  digitalWrite(LED_PIN, HIGH);   // Turn LED on
  delay(1000);
  digitalWrite(LED_PIN, LOW);    // Turn LED off
  delay(1000);
}`}</Code>

        <h3 className="font-bold mb-2 mt-6">Arduino — Basic Motor Control</h3>
        <p className="text-xs text-amber-400/90 mb-2"><b>Safety:</b> Remove propellers before testing motors!</p>
        <Code>{`#define MOTOR1_PIN 25
#define MOTOR2_PIN 26
#define MOTOR3_PIN 27
#define MOTOR4_PIN 33
const int freq = 20000;     // 20 kHz
const int resolution = 8;   // 8-bit (0-255)

void setup() {
  for (int c = 0; c < 4; c++) ledcSetup(c, freq, resolution);
  ledcAttachPin(MOTOR1_PIN, 0); ledcAttachPin(MOTOR2_PIN, 1);
  ledcAttachPin(MOTOR3_PIN, 2); ledcAttachPin(MOTOR4_PIN, 3);
}
void setMotorSpeed(int motor, int speed) { ledcWrite(motor, speed); }`}</Code>

        <h3 className="font-bold mb-2 mt-6">Python SDK — Autonomous Flight</h3>
        <Code>{`# autonomous_flight.py
import cflib.crtp
from cflib.crazyflie import Crazyflie
from cflib.crazyflie.syncCrazyflie import SyncCrazyflie
from cflib.positioning.motion_commander import MotionCommander

cflib.crtp.init_drivers()
URI = 'radio://0/80/2M'

def simple_flight():
    with SyncCrazyflie(URI, cf=Crazyflie(rw_cache='./cache')) as scf:
        with MotionCommander(scf) as mc:
            mc.forward(0.5)
            mc.left(0.5)
            mc.back(0.5)
            mc.right(0.5)
            mc.turn_right(360)
            # MotionCommander auto-lands on exit

if __name__ == '__main__':
    simple_flight()`}</Code>

        <h3 className="font-bold mb-2 mt-6">ESP-IDF — FreeRTOS Task</h3>
        <Code>{`#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"
#define LED_PIN GPIO_NUM_2

void blink_task(void *pvParameter) {
    gpio_set_direction(LED_PIN, GPIO_MODE_OUTPUT);
    while (1) {
        gpio_set_level(LED_PIN, 1);
        vTaskDelay(1000 / portTICK_PERIOD_MS);
        gpio_set_level(LED_PIN, 0);
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}
void app_main(void) {
    xTaskCreate(&blink_task, "blink_task", 2048, NULL, 5, NULL);
}`}</Code>
      </Section>

      {/* FIRMWARE FLASHING */}
      <Section id="firmware" className="py-10 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-11 h-11 rounded-xl bg-cyber/10 grid place-items-center text-cyber"><PlugZap size={20} /></span>
          <div>
            <h2 className="text-2xl font-bold">Firmware Flashing Guide</h2>
            <p className="text-premium/55 text-sm">Flash firmware on your FLYQ drone</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <article className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-2">Method 1 — Arduino IDE (easiest)</h3>
            <ol className="text-sm text-premium/70 space-y-1 list-decimal list-inside">
              <li>Connect drone via USB-C (LED turns on)</li>
              <li>Tools → Board → <span className="font-mono">ESP32S3 Dev Module</span></li>
              <li>Tools → Port → <span className="font-mono">COM3</span> (or <span className="font-mono">/dev/ttyUSB0</span>)</li>
              <li>File → Examples → FLYQ → BasicFlight</li>
              <li>Click Upload, wait for "Done uploading"</li>
            </ol>
          </article>
          <article className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-2">Method 2 — esptool (advanced)</h3>
            <Code>{`pip install esptool
wget https://github.com/passion3d/flyq-firmware/releases/latest/download/firmware.bin
esptool.py --chip esp32s3 --port /dev/ttyUSB0 write_flash 0x0 firmware.bin`}</Code>
            <p className="text-xs text-premium/50 mt-2"><b>Common issues:</b> install CH340/CP210x drivers · hold BOOT while connecting · try another USB cable · <span className="font-mono">sudo usermod -a -G dialout $USER</span> (Linux).</p>
          </article>
        </div>
      </Section>

      {/* FLIGHT MANUAL */}
      <Section id="flight" className="py-10 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-11 h-11 rounded-xl bg-cyber/10 grid place-items-center text-cyber"><ShieldCheck size={20} /></span>
          <div>
            <h2 className="text-2xl font-bold">Flight Manual</h2>
            <p className="text-premium/55 text-sm">Safety procedures and flight operations</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-sm">
            <p className="font-semibold text-red-400 mb-2 flex items-center gap-1"><CircleX size={16} /> Never</p>
            <ul className="text-premium/70 space-y-0.5 list-disc list-inside">
              <li>Fly near people, animals or buildings</li>
              <li>Fly outdoors in wind or rain</li>
              <li>Touch spinning propellers</li>
              <li>Fly with damaged propellers</li>
              <li>Leave a battery charging unattended</li>
              <li>Fly with a low-battery warning</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5 text-sm">
            <p className="font-semibold text-green-400 mb-2 flex items-center gap-1"><CircleCheck size={16} /> Always</p>
            <ul className="text-premium/70 space-y-0.5 list-disc list-inside">
              <li>Inspect the drone before flight</li>
              <li>Use propeller guards indoors</li>
              <li>Keep a clear 3m safety zone</li>
              <li>Calibrate the IMU before flying</li>
              <li>Have emergency stop ready</li>
              <li>Land with 20% battery remaining</li>
            </ul>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm">
          {[
            ['Takeoff', ['Place on a flat surface', 'Power on, wait for solid LED', 'Connect controller / app', 'Arm motors (throttle down + yaw right)', 'Increase throttle to hover']],
            ['In-Flight', ['Maintain visual line of sight', 'Stay within 50m range', 'Monitor battery level', 'Use smooth control inputs', 'Stay below 3m indoors']],
            ['Landing', ['Position over landing zone', 'Gradually reduce throttle', 'Keep level during descent', 'Cut throttle on touchdown', 'Disarm motors immediately']],
          ].map(([h, steps]) => (
            <article key={h as string} className="glass rounded-2xl p-5">
              <h4 className="font-semibold mb-2">{h as string}</h4>
              <ol className="text-premium/70 space-y-0.5 list-decimal list-inside">
                {(steps as string[]).map(s => <li key={s}>{s}</li>)}
              </ol>
            </article>
          ))}
        </div>
      </Section>

      {/* TROUBLESHOOTING */}
      <Section id="troubleshooting" className="py-10 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-11 h-11 rounded-xl bg-cyber/10 grid place-items-center text-cyber"><Wrench size={20} /></span>
          <div>
            <h2 className="text-2xl font-bold">Troubleshooting</h2>
            <p className="text-premium/55 text-sm">Solutions to common issues</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          {[
            ['Drone won\'t power on', ['Check battery charge', 'Verify battery connection', 'Try a different battery', 'Check power switch']],
            ['Motors not spinning', ['Check propeller installation', 'Verify motor connections', 'Test with motor code', 'Check MOSFET drivers']],
            ['Unstable / drifting', ['Recalibrate IMU on flat surface', 'Check propeller balance', 'Verify equal motor speeds', 'Tune PID parameters']],
            ['Battery not charging', ['Try a different USB cable', 'Use a 5V 1A charger', 'Check charging LED', 'Battery may be dead (< 3.0V)']],
            ['Can\'t connect to Wi-Fi', ['Wait 30s after power on', 'SSID: FLYQ-XXXX', 'Password: flyq1234', 'Reset Wi-Fi in firmware']],
            ['Upload failed (Arduino)', ['Hold BOOT during upload', 'Select correct COM port', 'Install CH340 drivers', 'Reduce speed to 115200']],
            ['IMU calibration fails', ['Use a perfectly flat surface', 'Keep absolutely still', 'No vibration or movement', 'Retry up to 3 times']],
            ['Python script errors', ['pip install --upgrade cflib', 'Verify URI: radio://0/80/2M', 'Check Crazyradio dongle', 'Run as administrator (Windows)']],
          ].map(([h, fixes]) => (
            <article key={h as string} className="glass rounded-2xl p-5">
              <h4 className="font-semibold mb-2">{h as string}</h4>
              <ul className="text-premium/60 space-y-0.5 list-disc list-inside">
                {(fixes as string[]).map(f => <li key={f}>{f}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* API REFERENCE */}
      <Section id="api" className="py-10 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-11 h-11 rounded-xl bg-cyber/10 grid place-items-center text-cyber"><Terminal size={20} /></span>
          <div>
            <h2 className="text-2xl font-bold">API Reference</h2>
            <p className="text-premium/55 text-sm">Function library documentation</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <article className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-3">Arduino API</h3>
            <ul className="text-sm text-premium/70 space-y-2">
              <li><span className="font-mono text-cyber">FLYQ.init()</span> — initialize sensors &amp; motors. Returns <span className="font-mono">bool</span>.</li>
              <li><span className="font-mono text-cyber">FLYQ.calibrateIMU()</span> — calibrate IMU on flat surface.</li>
              <li><span className="font-mono text-cyber">FLYQ.setMotorSpeed(motor, speed)</span> — motor (0–3), speed (0–255).</li>
              <li><span className="font-mono text-cyber">FLYQ.setThrottle(value)</span> — all motors, value (0–255).</li>
              <li><span className="font-mono text-cyber">FLYQ.getIMU()</span> — returns IMUData (gyro + accel).</li>
            </ul>
          </article>
          <article className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-3">Python API (cflib)</h3>
            <ul className="text-sm text-premium/70 space-y-2">
              <li><span className="font-mono text-cyber">mc.take_off(height)</span> — take off to height (m, default 0.3).</li>
              <li><span className="font-mono text-cyber">mc.forward(distance)</span> — fly forward (m).</li>
              <li><span className="font-mono text-cyber">mc.turn_right(angle)</span> — turn right (0–360°).</li>
              <li><span className="font-mono text-cyber">mc.land()</span> — land at current position.</li>
            </ul>
          </article>
        </div>
      </Section>

      {/* PROJECT IDEAS */}
      <Section id="projects" className="py-10 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-11 h-11 rounded-xl bg-cyber/10 grid place-items-center text-cyber"><Box size={20} /></span>
          <div>
            <h2 className="text-2xl font-bold">Project Ideas</h2>
            <p className="text-premium/55 text-sm">Inspiration for your drone projects</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ['Beginner', [['LED Patterns', 'Arduino · 1 hour'], ['Basic Obstacle Avoidance', 'Arduino · 2 hours'], ['Altitude Hold', 'Arduino · 3 hours']]],
            ['Intermediate', [['Waypoint Navigation', 'Python · 1 day'], ['Follow-Me Mode', 'Python · 2 days'], ['Swarm Control', 'Python · 3 days']]],
            ['Advanced', [['SLAM Mapping', 'ESP-IDF · 1 week'], ['Computer-Vision Landing', 'Python + OpenCV · 1 week'], ['AI Object Detection', 'TensorFlow Lite · 2 weeks']]],
          ].map(([level, items]) => (
            <article key={level as string} className="glass rounded-2xl p-5">
              <span className="inline-block text-xs font-mono px-2 py-1 rounded bg-cyber/10 text-cyber mb-3">{(level as string).toUpperCase()}</span>
              <ul className="space-y-3">
                {(items as [string, string][]).map(([name, meta]) => (
                  <li key={name}>
                    <div className="font-semibold text-sm">{name}</div>
                    <div className="text-xs text-premium/50 font-mono">{meta}</div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-12">
        <div className="glass rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to start building?</h2>
          <p className="text-premium/55 mb-5">Get your FLYQ drone and start learning today. Join our community for support.</p>
          <a href={waLink('Hi FLYQ, I have a question about the docs.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl btn-cyber font-bold hover:scale-105 transition">
            <BookOpen size={18} /> Talk to our team
          </a>
        </div>
      </Section>
    </>
  )
}
