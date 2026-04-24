
self.onInit = function() {
    var $container = self.ctx.$container[0];
    
    // Scope all document queries to widget container
    var widget = $container.querySelector('.ecs200-full-widget');
    if (!widget) return;
    
    // Override getElementById to search within widget
    function byId(id) { return widget.querySelector('#' + id); }
    
    // ---- Inline the full app JS ----
    var currentView = 'overview';
    
    // Document data
const docs = {
  hw: {
    title: "Controller Hardware Manual",
    file: "LEBE20713-01 ECS Hardware Manual.pdf",
    id: "LEBE20713-01",
    pages: 29,
    sections: [
      { num: "1", title: "Introduction and Scope", page: 4, desc: "Purpose and scope of the hardware manual. Lists related documentation including application-specific software manuals, touch screens, expansion modules, CDVR, MODBUS, SCADA, and wiring diagrams.", subs: [] },
      { num: "2", title: "Safety", page: 5, desc: "Electrical safety warnings for generator set operation and Electrostatic Discharge (ESD) awareness. Covers handling precautions, ESD-protective workstations, and anti-static procedures.", subs: [
        { title: "Electrical Safety", page: 5 },
        { title: "Electrostatic Discharge Awareness", page: 5 }
      ]},
      { num: "3", title: "Basics", page: 6, desc: "Core hardware specifications including module overview, physical dimensions (286×200×51mm), environmental ratings (–40°C to 70°C, IP20), interface connectors, mounting/installation, grounding, wiring requirements, and power requirements.", subs: [
        { title: "Module Overview", page: 6 },
        { title: "Physical Specifications", page: 6 },
        { title: "Environmental", page: 6 },
        { title: "Dimensions", page: 6 },
        { title: "Interface / Connectors", page: 7 },
        { title: "Mounting / Installation", page: 8 },
        { title: "Grounding", page: 10 },
        { title: "Wiring Requirements", page: 10 },
        { title: "Power Requirements / Specifications", page: 12 }
      ]},
      { num: "4", title: "Communications", page: 14, desc: "Communication interfaces: CAN bus (Primary and Accessory), RS-485, 4-wire Ethernet (4 ports), and 2-wire Ethernet (2 ports) specifications.", subs: [
        { title: "CAN", page: 14 },
        { title: "RS-485", page: 14 },
        { title: "4-Wire Ethernet", page: 14 },
        { title: "2-Wire Ethernet", page: 15 }
      ]},
      { num: "5", title: "Inputs", page: 16, desc: "Input signal specifications: 12 discrete inputs, 1 isolated digital input, 3 analog inputs (resistive/voltage modes with 5V supply), and MPU sensing inputs.", subs: [
        { title: "Discrete Inputs", page: 16 },
        { title: "Isolated Digital Input", page: 16 },
        { title: "Analog Inputs", page: 16 },
        { title: "MPU Sensing Inputs", page: 19 }
      ]},
      { num: "6", title: "Outputs", page: 20, desc: "Output signal specifications: 12 sinking digital outputs, 2 analog outputs (voltage/current modes), and 3 PWM outputs.", subs: [
        { title: "Discrete Outputs", page: 20 },
        { title: "Analog Outputs", page: 20 },
        { title: "PWM Outputs", page: 21 }
      ]},
      { num: "7", title: "AC Sensing", page: 22, desc: "AC metering accuracy specifications, voltage sensing inputs (two 3-phase connections), and current sensing input (one 3-phase via CTs).", subs: [
        { title: "AC Metering Accuracy", page: 22 },
        { title: "Voltage Sensing", page: 22 },
        { title: "Current Sensing", page: 23 }
      ]},
      { num: "8", title: "Programming", page: 24, desc: "Controller programming interface and firmware update procedures.", subs: [] }
    ]
  },
  hmi: {
    title: "HMI Manual – Paralleling Genset Control",
    file: "LEBE20715-02 ECS200 HMI Manual.pdf",
    id: "LEBE20715-02",
    pages: 280,
    sections: [
      { num: "1", title: "General Information", page: 8, desc: "Introduction, application scope, and reference documents for the ECS 200 HMI system.", subs: [
        { title: "Introduction", page: 8 },
        { title: "Application", page: 8 },
        { title: "References", page: 8 }
      ]},
      { num: "2", title: "Safety", page: 9, desc: "Electrical safety and electrostatic discharge awareness for HMI installation and handling.", subs: [] },
      { num: "3", title: "Installation", page: 10, desc: "Physical installation requirements including mounting location, panel cutout dimensions, power requirements, mechanical specifications, operating temperature range, electrical connections, communication wiring, cleaning guidelines, and HMI software flashing.", subs: [
        { title: "Mounting Location", page: 10 },
        { title: "Dimensions", page: 10 },
        { title: "Power Requirements", page: 12 },
        { title: "Mechanical Specification", page: 12 },
        { title: "Operating Temperature Range", page: 13 },
        { title: "Electrical Connections", page: 13 },
        { title: "Communication Wiring", page: 15 },
        { title: "Flashing of HMI Software", page: 16 }
      ]},
      { num: "4", title: "Initial Operation & User Orientation", page: 17, desc: "Complete touchscreen navigation guide: Menu button (main menu, submenus), Home button, Events button, Alarm acknowledgement, Lock/Unlock button, Engine Control Switch (ECS) button, wayfinding text, annunciator strip, and context buttons.", subs: [
        { title: "Menu Button & Submenus", page: 18 },
        { title: "Home Button", page: 20 },
        { title: "Events Button", page: 21 },
        { title: "Alarm Acknowledgement", page: 22 },
        { title: "Lock / Unlock Button", page: 22 },
        { title: "ECS (Engine Control Switch) Button", page: 24 },
        { title: "Wayfinding & Annunciator Strip", page: 27 }
      ]},
      { num: "5", title: "Viewing System Parameters", page: 28, desc: "All system parameter display screens: System Overview, Utility Overview, Unit Overview, Paralleling (Dead Bus Arbitration, Sync, Load Share, Load Sense Load Demand), Genset Overview, Engine Overview, AC Overview, I/O Overviews (Digital/Analog/PWM/Remote), Voltage Regulator, Network Status, and kW Load Histogram.", subs: [
        { title: "System Overview", page: 28 },
        { title: "Paralleling (Sync, Load Share, LSLD)", page: 35 },
        { title: "Genset Overview", page: 48 },
        { title: "Engine Overview", page: 50 },
        { title: "AC Overview", page: 53 },
        { title: "I/O Overview (DI/DO/AI/AO/PWM/Remote)", page: 55 },
        { title: "Voltage Regulator Overview", page: 93 },
        { title: "Network Status Overview", page: 97 },
        { title: "kW Load Histogram", page: 99 }
      ]},
      { num: "6", title: "HMI Events", page: 101, desc: "Event navigation, event log types (genset control events, status events, ESO log), and event acknowledgement procedures.", subs: [
        { title: "Navigation", page: 101 },
        { title: "Types of Event Log", page: 102 },
        { title: "Acknowledgement", page: 109 }
      ]},
      { num: "7", title: "Control Feature Parameters", page: 111, desc: "HMI interfaces for configuring paralleling (load share, LSLD, power system unit control), idle/rated control, load shed reset, fuel transfer, inducement override, automatic mains failure, programmable cycle timer, engine fuel priming, and dynamic gas blending.", subs: [
        { title: "Paralleling", page: 112 },
        { title: "Idle / Rated Control", page: 118 },
        { title: "Load Shed Reset", page: 119 },
        { title: "Fuel Transfer", page: 121 },
        { title: "Automatic Mains Failure", page: 125 },
        { title: "Programmable Cycle Timer", page: 127 },
        { title: "Dynamic Gas Blending", page: 133 }
      ]},
      { num: "8", title: "On Screen Digital Annunciator", page: 135, desc: "Global LED bar indicators, alarm output driver behaviour, high side driver outputs, annunciator icon bar, annunciator menu selection, and lamp test feature.", subs: [] },
      { num: "9", title: "Creating Custom Screens", page: 146, desc: "Procedures for designing and deploying custom HMI display screens.", subs: [] },
      { num: "10", title: "Configurable Parameters", page: 155, desc: "Comprehensive parameter configuration: paralleling (DBA, load share, LSLD, PSU), generator ratings, load control, voltage regulator, counters, hours, real-time clock, AMF, fuel transfer, annunciator events, kW relay, transient load relief, PLC logic, Ethernet, remote display, SCADA settings, display pairing, and engine management.", subs: [
        { title: "Paralleling (DBA, Load Share, LSLD)", page: 157 },
        { title: "Generator Ratings", page: 170 },
        { title: "Load Control", page: 171 },
        { title: "Voltage Regulator", page: 174 },
        { title: "Automatic Mains Failure", page: 182 },
        { title: "Annunciator Custom Events", page: 185 },
        { title: "Ethernet & Remote Display", page: 194 },
        { title: "SCADA Settings", page: 201 },
        { title: "Engine Management", page: 208 }
      ]},
      { num: "11", title: "Preferences & Initial Setup", page: 210, desc: "Display preferences: language selection, display settings, screen saver, backlight saver, application settings, display information, security level, and password management (user level, enter password, change/edit password).", subs: [
        { title: "Language", page: 210 },
        { title: "Display Settings", page: 211 },
        { title: "Screen Saver & Backlight Settings", page: 213 },
        { title: "Security Level & Password Management", page: 222 }
      ]},
      { num: "12", title: "Device Information", page: 237, desc: "Controller and HMI device identification and version information display.", subs: [] },
      { num: "13", title: "HMI File Manager", page: 239, desc: "Managing HMI configuration files and PDF manuals stored on the display.", subs: [] },
      { num: "14", title: "Remote HMI Capability", page: 251, desc: "Remote HMI access functionality, flash file management, and remote password management.", subs: [] },
      { num: "15", title: "Loss of Communication", page: 253, desc: "Behavior and recovery procedures when communication between HMI and controller is lost.", subs: [] },
      { num: "16", title: "Remote Sensing", page: 257, desc: "Remote sensing feature for utility monitoring including utility overview screens and genset paralleling control events when remote sensing is enabled.", subs: [] },
      { num: "17", title: "Hardware Block Diagram", page: 262, desc: "System-level hardware interconnection diagrams for the HMI and controller.", subs: [] },
      { num: "18", title: "Marketing", page: 265, desc: "Customer experience, performance highlights, and feature summaries for the ECS 200 HMI.", subs: [] }
    ]
  },
  sw: {
    title: "Software Operations Manual – Paralleling Genset Control",
    file: "LEBE20716-02 ECS200 Software Manual.pdf",
    id: "LEBE20716-02",
    pages: 420,
    sections: [
      { num: "1", title: "General Information", page: 9, desc: "Introduction, application scope, and references for the ECS 200 paralleling genset software.", subs: [] },
      { num: "2", title: "Safety", page: 10, desc: "Electrical safety and ESD awareness.", subs: [] },
      { num: "3", title: "Initial Operation & User Orientation", page: 11, desc: "Electrical connections/diagrams, LED indicators, configuring setpoints, adjusting preferences, and basic generator set parameters: engine sensors, oil pressure, coolant temperature, generator ratings/groups, output voltage, engine speed, idle/rated speed, and generator protection (overcurrent, voltage/current imbalance, over/under frequency and voltage, reverse power, reactive power, open phase, pole slip, RoCoF).", subs: [
        { title: "Electrical Connections / Diagrams", page: 11 },
        { title: "LED Indicators", page: 12 },
        { title: "Engine Oil Pressure", page: 14 },
        { title: "Engine Coolant Temperature", page: 17 },
        { title: "Generator Ratings and Ratings Groups", page: 21 },
        { title: "Generator Output Voltage", page: 25 },
        { title: "Engine Speed", page: 27 },
        { title: "Generator Protection (OC, Imbalance, Freq, Voltage, Reverse Power)", page: 35 }
      ]},
      { num: "4", title: "Saving & Restoring Setpoints", page: 67, desc: "Procedures for saving and restoring controller setpoint configurations.", subs: [] },
      { num: "5", title: "AC Sensing", page: 68, desc: "AC voltage and current sensing configuration, measurement modes, and accuracy details.", subs: [] },
      { num: "6", title: "Starting & Stopping the Generator Set", page: 72, desc: "Automatic control modes, controller-controlled cranking, start/stop sequences, fuel priming, inverted start signal, starter motor protection, emergency stop, cooldown timer, and instant auto feature.", subs: [
        { title: "Automatic Control", page: 74 },
        { title: "Controller Controlled Cranking", page: 77 },
        { title: "Starting the Generator Set", page: 78 },
        { title: "Stopping the Generator Set", page: 83 },
        { title: "Emergency Stop", page: 85 },
        { title: "Cooldown", page: 86 },
        { title: "Instant Auto", page: 87 }
      ]},
      { num: "7", title: "Engine Setpoint Verification", page: 89, desc: "Procedures for verifying overspeed, low oil pressure, and high coolant temperature setpoints.", subs: [] },
      { num: "8", title: "Handling Events", page: 92, desc: "Event Response Configurations (ERCs) for analog and digital inputs, resetting events (via digital input, for ECMs without CAN 1), status events, and SCADA alarm bit packing.", subs: [
        { title: "Event Response Configurations", page: 93 },
        { title: "Changing an ERC (Analog & Digital)", page: 95 },
        { title: "Resetting Events", page: 97 },
        { title: "SCADA Alarm Bit Packing", page: 98 }
      ]},
      { num: "9", title: "Security", page: 102, desc: "Security settings and access control for the controller.", subs: [] },
      { num: "10", title: "Engine Hours, Maintenance & Meters", page: 104, desc: "Engine operating hours, service maintenance interval configuration, kWh and kVARh meters (lifetime and trip totals).", subs: [] },
      { num: "11", title: "Digital Inputs", page: 108, desc: "Programming digital inputs via Cat Service Tool for command/status parameters and system events. Includes digital input ERCs.", subs: [] },
      { num: "12", title: "Analog Inputs", page: 122, desc: "Analog input programming (resistive/voltage modes), ERCs, built-in and custom sensor maps, warnings/shutdowns, and handling unsupported sensor ranges.", subs: [] },
      { num: "13", title: "Digital Outputs", page: 143, desc: "Programming digital outputs for status parameters and system events via Cat Service Tool.", subs: [] },
      { num: "14", title: "Analog Outputs", page: 158, desc: "Configuring analog outputs for voltage and current modes.", subs: [] },
      { num: "15", title: "PWM Outputs", page: 162, desc: "PWM output programming and disabling via Cat Service Tool.", subs: [] },
      { num: "16", title: "Overcurrent Protection", page: 164, desc: "Protection curve types: definite time, inverse time (IEC/IEEE), thermal damage curve, arc flash limit (maintenance mode), generator stator current limiter, and overcurrent setpoints.", subs: [
        { title: "Definite Time Curve", page: 164 },
        { title: "Inverse Time Curves", page: 165 },
        { title: "Thermal Damage Curve", page: 166 },
        { title: "Arc Flash Limit (Maintenance Mode)", page: 167 },
        { title: "Overcurrent Protection Setpoints", page: 168 }
      ]},
      { num: "17", title: "Breaker Control", page: 174, desc: "Generator breaker control configuration and operation.", subs: [] },
      { num: "18", title: "kW Load Histogram", page: 178, desc: "Viewing and clearing the generator kW load histogram data.", subs: [] },
      { num: "19", title: "Programmable kW Relay Function", page: 182, desc: "Configuring programmable kW relays for overload and load shed functions.", subs: [] },
      { num: "20", title: "Programmable Cycle Timer (PCT)", page: 185, desc: "Weekly timer configuration and programmable cycle timer setup via Cat Service Tool.", subs: [] },
      { num: "21", title: "Auto Mains Failure (AMF) Control", page: 188, desc: "AMF control in automatic and manual modes, utility-to-genset and genset-to-utility transfer processes, display interface, and setpoints (general, utility frequency, utility voltage, utility AC monitor).", subs: [
        { title: "AMF Automatic Mode", page: 191 },
        { title: "AMF Manual Mode", page: 192 },
        { title: "Utility/Mains Transfer Process", page: 193 },
        { title: "AMF Setpoints", page: 195 }
      ]},
      { num: "22", title: "Load Shed", page: 208, desc: "Basic load shed operation and parameter configuration.", subs: [] },
      { num: "23", title: "Battery Monitoring", page: 209, desc: "Battery voltage monitoring and alarm configuration.", subs: [] },
      { num: "24", title: "Engine Cooling Fan Control", page: 212, desc: "Cooling fan control configuration and functionality examples.", subs: [] },
      { num: "25", title: "Gearbox Fan Control", page: 220, desc: "Gearbox-driven fan control configuration.", subs: [] },
      { num: "26", title: "Enhanced Temperature Monitoring", page: 221, desc: "Generator temperature monitoring and engine cylinder temperature differential monitoring.", subs: [] },
      { num: "27", title: "Dynamic Gas Blending", page: 225, desc: "Dynamic gas blending feature for dual-fuel operation.", subs: [] },
      { num: "28", title: "Driven Equipment Control", page: 226, desc: "Control features for driven equipment applications.", subs: [] },
      { num: "29", title: "Gas Train", page: 229, desc: "Gas train monitoring and valve proving system configuration.", subs: [] },
      { num: "30", title: "Fuel Transfer", page: 236, desc: "Fuel load/unload operations and fuel transfer failure mode handling.", subs: [] },
      { num: "31", title: "Emergency Shutdown Override (ESO)", page: 239, desc: "Emergency shutdown override feature and configuration.", subs: [] },
      { num: "32", title: "Ethernet Ports", page: 241, desc: "Ethernet port configuration and network topology.", subs: [] },
      { num: "33", title: "SCADA (Modbus TCP/IP) Data Link", page: 246, desc: "SCADA data link setup and Modbus TCP/IP configuration.", subs: [] },
      { num: "34", title: "CAN Data Links", page: 248, desc: "CAN 1 and CAN 2 data link configuration, wiring, and network topology.", subs: [] },
      { num: "35", title: "Supported Optional Modules", page: 251, desc: "CAN modules, RS-485 annunciator, Ethernet-based remote modules (remote DI/DO/AI/AO/RTD).", subs: [
        { title: "CAN Modules", page: 251 },
        { title: "RS-485 Annunciator", page: 251 },
        { title: "Ethernet Remote Modules (DI/DO/AI/AO/RTD)", page: 254 }
      ]},
      { num: "36", title: "Integrated Voltage Regulator (IVR)", page: 267, desc: "IVR features, hardware installation (PWM, excitation module, fusing), software configuration (control source, starting profile, PID gains, under-frequency roll-off, line loss compensation, reactive droop, lockout, loss of sensing, over excitation), and voltage adjustment via digital/analog inputs.", subs: [
        { title: "IVR Features", page: 267 },
        { title: "IVR Hardware Installation", page: 268 },
        { title: "IVR Software Configuration", page: 274 },
        { title: "IVR Voltage Adjustment", page: 287 }
      ]},
      { num: "37", title: "Transient Load Relief (TLR)", page: 289, desc: "TLR operation, setpoint configuration, and tuning process.", subs: [] },
      { num: "38", title: "Integrated PLC Feature Set", page: 304, desc: "PLC programming: logical operation blocks, function blocks, special function blocks, debug window blocks, PLC config creation program (PVC files, TCP/IP, editing, downloading, troubleshooting).", subs: [
        { title: "Logical Operation Blocks", page: 305 },
        { title: "Function Blocks", page: 309 },
        { title: "Special Function Blocks", page: 310 },
        { title: "PLC Config Creation Program", page: 317 }
      ]},
      { num: "39", title: "Web Server", page: 324, desc: "Built-in web server configuration and access.", subs: [] },
      { num: "40", title: "Island Paralleling Functions", page: 327, desc: "Failsafe operation mode, Dead Bus Arbitration (DBA), synchronization (setpoints, gain tuning), load sharing (real/reactive, tuning guide, failsafe), Automatic Load Sense Load Demand (LSLD) with participation conditions, add/drop logic, sequence strategy, proactive add, redundancy (N+X), spinning reserve, and bus/intertie protections.", subs: [
        { title: "Failsafe Operation Mode", page: 328 },
        { title: "Dead Bus Arbitration (DBA)", page: 330 },
        { title: "Synchronization", page: 336 },
        { title: "Load Sharing (Real & Reactive)", page: 346 },
        { title: "Load Sense Load Demand (LSLD)", page: 366 },
        { title: "Bus / Intertie Protections", page: 386 }
      ]},
      { num: "41", title: "Utility Paralleling Functions", page: 390, desc: "Base load (kW) control, reactive load (VAR) and power factor (PF) control, utility paralleling protections (over/under frequency, over/under voltage).", subs: [
        { title: "Base Load (kW) Control", page: 391 },
        { title: "Reactive Load (VAR) & Power Factor", page: 393 },
        { title: "Utility Paralleling Protections", page: 396 }
      ]},
      { num: "42", title: "Functional Safety", page: 407, desc: "Safety-critical functions: overvoltage, overcurrent, overspeed, emergency stop, parity inputs, engine shutdown functions (ECM/governor power removal, fuel gas shut-off), synchronization breaker control, and setpoint calibration.", subs: [
        { title: "Overvoltage", page: 408 },
        { title: "Overcurrent", page: 408 },
        { title: "Overspeed", page: 409 },
        { title: "Emergency Stop", page: 409 },
        { title: "Parity Inputs", page: 410 },
        { title: "Engine Shutdown Functions", page: 411 },
        { title: "Synchronization Breaker Control", page: 414 }
      ]}
    ]
  },
  bop: {
    title: "Balance of Plant Software Operations Manual",
    file: "LEBE20720-00 ECS 200 BOP Software manual.pdf",
    id: "LEBE20720-00",
    pages: 159,
    sections: [
      { num: "1", title: "General Information", page: 9, desc: "Introduction, applications (JW/SCAC cooling, ventilation/CHP, or both), definitions, and references.", subs: [] },
      { num: "2", title: "Safety", page: 11, desc: "Electrical safety and ESD awareness for BOP systems.", subs: [] },
      { num: "3", title: "Glossary of Terms", page: 12, desc: "Definitions of Balance of Plant terminology.", subs: [] },
      { num: "4", title: "Overview", page: 14, desc: "High-level overview of Balance of Plant features and system architecture.", subs: [] },
      { num: "5", title: "Separate Circuit Aftercooler (3-Way Valve & Pump)", page: 15, desc: "SCAC system with 3-way valve PID control, end position sensors, pump control with follow-up delay and immediate stop, control setpoints, diagnostics/feedback, I/O mapping, and HMI display screens.", subs: [
        { title: "Functional Description & Flow Diagram", page: 15 },
        { title: "3-Way Valve Control (PID)", page: 16 },
        { title: "Pump Control", page: 18 },
        { title: "Control Setpoints", page: 18 },
        { title: "Diagnostics & Feedback", page: 20 },
        { title: "HMI Display (Overview & Configure)", page: 22 }
      ]},
      { num: "6", title: "Separate Circuit Aftercooler (Radiator Control)", page: 31, desc: "SCAC radiator control with VFD (variable frequency drive) and staged single-speed fan options, temperature setpoint calculation, PID control, control setpoints, diagnostics, and HMI displays.", subs: [
        { title: "VFD Radiator Control", page: 32 },
        { title: "Staged Radiator Control (Single Speed)", page: 34 },
        { title: "Control Setpoints", page: 36 },
        { title: "Diagnostics & Feedback", page: 38 },
        { title: "HMI Display", page: 40 }
      ]},
      { num: "7", title: "Engine Cooling Circuit (3-Way Valve & Pump)", page: 51, desc: "Engine jacket water cooling with 3-way valve control and pump management.", subs: [] },
      { num: "8", title: "Engine Cooling Circuit (Radiator Control)", page: 60, desc: "Engine cooling radiator control with VFD and staged switching options, temperature setpoint calculation, control setpoints, diagnostics, and HMI displays.", subs: [
        { title: "VFD/Staged Radiator Control", page: 60 },
        { title: "Control Setpoints", page: 64 },
        { title: "Diagnostics & Feedback", page: 67 },
        { title: "HMI Display", page: 70 }
      ]},
      { num: "9", title: "Dual Core Radiator", page: 74, desc: "Dual core radiator control for power-only mode with VFD or stage switching, control deviation calculation, setpoints, diagnostics, and HMI displays.", subs: [] },
      { num: "10", title: "Customer Site Heating Circuit (3-Way Valve & Pump)", page: 80, desc: "Customer heating circuit with heat exchanger, 3-way valve control (installed in heating or engine cooling circuit), pump control, setpoints, diagnostics, and HMI displays.", subs: [
        { title: "Functional Description & Flow Diagram", page: 80 },
        { title: "3-Way Valve & Pump Control", page: 81 },
        { title: "Control Setpoints", page: 82 },
        { title: "Diagnostics & Feedback", page: 84 },
        { title: "HMI Display", page: 87 }
      ]},
      { num: "11", title: "Exhaust Heat Exchanger Bypass with Customer Heating", page: 92, desc: "Exhaust heat exchanger bypass control for customer site heating circuit, exhaust gas valve control, setpoints, diagnostics, and HMI displays.", subs: [
        { title: "Operational Logic & Flow Diagrams", page: 92 },
        { title: "Exhaust Gas Valves Control", page: 94 },
        { title: "Control Setpoints", page: 94 },
        { title: "Diagnostics & Feedback", page: 96 }
      ]},
      { num: "12", title: "Genset Enclosure Ventilation Control", page: 103, desc: "Ventilation control with and without circulating air, control sequence (ventilation fan, inlet/outlet louvers, standby ventilation), setpoints, diagnostics, and HMI displays.", subs: [
        { title: "Without Circulating Air", page: 103 },
        { title: "With Circulating Air", page: 104 },
        { title: "Control Sequence (Fan, Louvers)", page: 105 },
        { title: "Control Setpoints", page: 108 },
        { title: "Diagnostics & Feedback", page: 112 },
        { title: "HMI Display", page: 116 }
      ]},
      { num: "13", title: "Smoke/Fire Alarm & Ventilation Override", page: 121, desc: "Fire alarm reaction, full ventilation reaction for gas alarm, prioritization logic between fire and gas alarms, setpoints, and diagnostics.", subs: [] },
      { num: "14", title: "Exhaust Gas & Auxiliary Temperature Sensors CHP", page: 124, desc: "Additional exhaust gas temperature I/O, trip setpoint calculation, auxiliary temperature sensors, control setpoints, diagnostics, and HMI displays.", subs: [] },
      { num: "15", title: "Balance of Plant Ethernet I/O Module", page: 135, desc: "BOP Ethernet I/O module configuration codes for CHP & Container, JW & SCAC, and combined configurations. Includes HMI display requirements for DI/DO/AI/AO.", subs: [
        { title: "Config Code: CHP & Container", page: 136 },
        { title: "Config Code: JW & SCAC", page: 138 },
        { title: "Config Code: JW, SCAC, CHP, Container", page: 140 },
        { title: "HMI Display (DI/DO/AI/AO)", page: 143 }
      ]}
    ]
  },
  scada: {
    title: "Cat ECS SCADA Modbus Software Manual",
    file: "LEBE23522-00 ECS 100-200 SCADA Manual.pdf",
    id: "LEBE23522-00",
    pages: 91,
    sections: [
      { num: "1", title: "General Information", page: 7, desc: "Introduction, applications, and references for the ECS SCADA Modbus interface.", subs: [] },
      { num: "2", title: "Safety", page: 9, desc: "Electrical safety for SCADA system installation.", subs: [] },
      { num: "3", title: "Glossary of Terms", page: 10, desc: "Definitions of SCADA and Modbus terminology.", subs: [] },
      { num: "4", title: "Cat ECS SCADA Modbus Overview", page: 13, desc: "High-level overview of the Modbus TCP/IP SCADA interface and supported features.", subs: [] },
      { num: "5", title: "SCADA Data Link Setup & Configuration", page: 14, desc: "IP configuration via Cat ET, data link enabling with password setup via Cat ET and HMI display, and SCADA access password specifics.", subs: [
        { title: "SCADA IP Configuration via Cat ET", page: 14 },
        { title: "Data Link Enabling & Password Setup", page: 15 },
        { title: "SCADA Configuration via HMI", page: 15 },
        { title: "Access Password Specifics", page: 17 }
      ]},
      { num: "6", title: "Data Interpretation & Scaling", page: 18, desc: "Numerical data handling: 1-word and 2-word unsigned integer read/write, byte extracting/packing, state/status/command/information data types, and complex data structures.", subs: [
        { title: "Numerical Data (1-Word & 2-Word)", page: 18 },
        { title: "Byte Extracting & Packing", page: 21 },
        { title: "State / Status / Command Data", page: 23 },
        { title: "Complex Data", page: 23 }
      ]},
      { num: "7", title: "Cat ECS Modbus Data", page: 24, desc: "Complete Modbus register maps: Genset data (ratings, AC, power, energy, state/mode, start/stop, battery, base load, PF, LSLD, load share, utility transfer, temperatures, paralleling data), Engine data (service meter, speed, fuel, oil, coolant, exhaust, intake, turbocharger, filters, aftertreatment, gas, DGB), programmable cycle timer, real-time clock, and I/O read/write registers.", subs: [
        { title: "Genset Registers (Ratings, AC, Power, Energy)", page: 25 },
        { title: "Genset State, Mode & Status", page: 30 },
        { title: "Genset Start/Stop & Control Commands", page: 31 },
        { title: "Load Share, LSLD & Paralleling Data", page: 32 },
        { title: "Engine Data (Speed, Fuel, Oil, Coolant, Exhaust)", page: 38 },
        { title: "Engine Aftertreatment & Gas", page: 41 },
        { title: "Programmable Cycle Timer", page: 46 },
        { title: "Real-Time Clock", page: 47 },
        { title: "I/O Read/Write Registers", page: 48 }
      ]},
      { num: "8", title: "Cat ECS Events", page: 52, desc: "SCADA event handling: acknowledge/reset, acknowledge status, shutdown/lamp/horn/display events, user alarm groups (alarm bit packing), annunciator, and event logs (active events, system events, status events).", subs: [
        { title: "Acknowledge & Reset", page: 52 },
        { title: "Shutdown, Lamp, Horn & Display Events", page: 52 },
        { title: "User Alarm Groups (Bit Packing)", page: 53 },
        { title: "Annunciator", page: 54 },
        { title: "Event Logs", page: 55 }
      ]},
      { num: "9", title: "Network & Module", page: 57, desc: "Network status registers, module online status, and module information data.", subs: [] },
      { num: "10", title: "Grid Code", page: 60, desc: "Grid code compliance data registers and configuration.", subs: [] },
      { num: "11", title: "Balance of Plant", page: 66, desc: "BOP-specific Modbus registers for CHP and thermal management systems.", subs: [] },
      { num: "12", title: "Examples", page: 68, desc: "Practical examples of SCADA Modbus data reading and writing operations.", subs: [] }
    ]
  }
};

// Current view (declared above)

// Base URL for PDF files (GitHub raw or configure via widget settings)
var PDF_BASE_URL = 'https://github.com/jamesritter03-kirby/ECS-200-Specs/raw/main/';

// Build PDF URL with page number
function pdfUrl(file, page) {
  return PDF_BASE_URL + encodeURIComponent(file) + '#page=' + page;
}

// Open PDF at a specific page
function openPdfAt(docKey, page) {
  const doc = docs[docKey];
  window.open(pdfUrl(doc.file, page), '_blank');
}

// Render sections for a document
function renderSections(docKey) {
  const doc = docs[docKey];
  const container = byId(`sections-${docKey}`);
  if (!container) return;

  container.innerHTML = doc.sections.map(section => `
    <div class="section-card" onclick="openPdfAt('${docKey}', ${section.page})">
      <div class="section-header">
        <span class="section-num">${section.num}</span>
        <span class="section-title">${section.title}</span>
      </div>
      <div class="section-desc">${section.desc}</div>
      <div class="section-page-link">
        <span class="section-page">📄 Page ${section.page}</span>
        <span class="open-at-page">Open PDF → p.${section.page}</span>
      </div>
      ${section.subs.length > 0 ? `
        <div class="subsections">
          ${section.subs.map(sub => `
            <div class="subsection" onclick="event.stopPropagation(); openPdfAt('${docKey}', ${sub.page})">
              <span>${sub.title}</span>
              <span class="open-at-page">p.${sub.page} →</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `).join('');
}

// Show a specific view
function showView(viewKey) {
  currentView = viewKey;

  // Update sidebar
  widget.querySelectorAll('.doc-item').forEach(item => {
    item.classList.toggle('active', item.dataset.doc === viewKey);
  });

  // Update views
  widget.querySelectorAll('.doc-detail').forEach(view => {
    view.classList.remove('active');
  });
  byId(`view-${viewKey}`).classList.add('active');

  // Update topbar
  const titles = {
    overview: 'Overview Dashboard',
    hw: 'Controller Hardware Manual',
    hmi: 'HMI Manual – Paralleling Genset Control',
    sw: 'Software Operations Manual',
    bop: 'Balance of Plant Software Manual',
    scada: 'SCADA Modbus Manual',
    modbus: 'Suggested SCADA Registers — 1-Second Polling List'
  };
  byId('topbarTitle').textContent = titles[viewKey] || '';

  // Update topbar actions
  const actions = byId('topbarActions');
  if (viewKey === 'modbus') {
    actions.innerHTML = `
      <a class="btn btn-secondary" href="${pdfUrl(docs.scada.file, 24)}" target="_blank">📡 Open SCADA Manual → Register Maps</a>
    `;
  } else if (viewKey !== 'overview' && docs[viewKey]) {
    const doc = docs[viewKey];
    actions.innerHTML = `
      <a class="btn btn-primary" href="${pdfUrl(doc.file, 1)}" target="_blank">📄 Open Full PDF</a>
    `;
  } else {
    actions.innerHTML = '';
  }

  // Close mobile sidebar
  byId('sidebar').classList.remove('open');

  // Clear search
  byId('globalSearch').value = '';
  byId('searchResults').classList.remove('visible');
}

// Search functionality - returns granular matches with direct PDF page links
function handleSearch(query) {
  const resultsEl = byId('searchResults');
  const listEl = byId('resultsList');
  const countEl = byId('resultCount');

  if (!query || query.length < 2) {
    resultsEl.classList.remove('visible');
    return;
  }

  const q = query.toLowerCase();
  const allMatches = []; // flat list of every individual hit

  Object.entries(docs).forEach(([key, doc]) => {
    doc.sections.forEach(section => {
      const titleMatch = section.title.toLowerCase().includes(q);
      const descMatch = section.desc.toLowerCase().includes(q);

      // Check section-level match
      if (titleMatch || descMatch) {
        allMatches.push({
          docKey: key,
          docTitle: doc.title,
          docId: doc.id,
          file: doc.file,
          sectionNum: section.num,
          sectionTitle: section.title,
          matchTitle: section.title,
          matchDesc: descMatch ? getSnippet(section.desc, q) : '',
          page: section.page,
          type: 'section'
        });
      }

      // Check every subsection independently
      section.subs.forEach(sub => {
        const subTitleMatch = sub.title.toLowerCase().includes(q);
        // Also match if the parent desc mentions it
        if (subTitleMatch) {
          allMatches.push({
            docKey: key,
            docTitle: doc.title,
            docId: doc.id,
            file: doc.file,
            sectionNum: section.num,
            sectionTitle: section.title,
            matchTitle: sub.title,
            matchDesc: '',
            page: sub.page,
            type: 'subsection'
          });
        }
      });
    });
  });

  const totalMatches = allMatches.length;
  countEl.textContent = `(${totalMatches} location${totalMatches !== 1 ? 's' : ''} found)`;

  if (totalMatches > 0) {
    resultsEl.classList.add('visible');
    listEl.innerHTML = allMatches.map(m => `
      <div class="search-result-item">
        <div class="result-header">
          <div style="flex:1">
            <div class="result-section">
              <span class="result-doc-badge">${m.docId}</span>
              ${m.type === 'subsection' ? `§${m.sectionNum} ${m.sectionTitle} ▸ ` : `§${m.sectionNum} `}${highlightText(m.matchTitle, query)}
            </div>
            <div class="result-doc">${m.docTitle} · Page ${m.page}</div>
            ${m.matchDesc ? `<div class="result-desc">${m.matchDesc}</div>` : ''}
          </div>
          <a class="open-at-page" href="${pdfUrl(m.file, m.page)}" target="_blank" onclick="event.stopPropagation()" style="flex-shrink:0">Open PDF → p.${m.page}</a>
        </div>
      </div>
    `).join('');
  } else {
    resultsEl.classList.add('visible');
    listEl.innerHTML = '<div style="padding:16px;color:#999;text-align:center;">No results found. Try a different term like "ethernet", "load share", or "temperature".</div>';
  }
}

// Get a short text snippet around the matched query in a description
function getSnippet(desc, query) {
  const idx = desc.toLowerCase().indexOf(query);
  if (idx === -1) return '';
  const start = Math.max(0, idx - 60);
  const end = Math.min(desc.length, idx + query.length + 60);
  let snippet = '';
  if (start > 0) snippet += '…';
  snippet += desc.substring(start, end);
  if (end < desc.length) snippet += '…';
  return highlightText(snippet, query);
}

function highlightText(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

// Toggle poll group expand/collapse
function togglePollGroup(id) {
  byId(id).classList.toggle('collapsed');
}

// Mobile sidebar toggle
function toggleSidebar() {
  byId('sidebar').classList.toggle('open');
}

// Initialize (inside TB onInit)
    Object.keys(docs).forEach(renderSections);

    // Expose functions to global scope for inline onclick handlers
    window.showView = showView;
    window.toggleSidebar = toggleSidebar;
    window.togglePollGroup = togglePollGroup;
    window.openPdfAt = openPdfAt;
    window.handleSearch = handleSearch;
};

self.onDestroy = function() {};

self.typeParameters = function() {
    return {
        maxDatasources: 0,
        dataKeysOptional: true
    };
};
