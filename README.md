# CCNA Master - Exam Prep & Lab Simulator

A comprehensive CCNA 200-301 exam preparation application with Boson-level difficulty questions and an interactive network lab simulator.

![Version](https://img.shields.io/badge/version-2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

### 📚 Quiz Mode
- **Exam Mode**: 120-minute timer, 100 questions, simulates real exam conditions
- **Practice Mode**: No timer, instant feedback, learn at your own pace
- **Domain Filtering**: Focus on specific CCNA domains
- **Inline Feedback**: Explanations appear within the question card (no scrolling!)

### 🌐 Network Lab Simulator
- Interactive CLI with **200+ Cisco command shortcuts** (Packet Tracer compatible)
- Real-time command feedback
- Multiple lab scenarios (VLANs, OSPF, ACLs, NAT, etc.)

### 📊 Progress Tracking
- Track scores across all 6 CCNA domains
- Visual progress indicators
- Domain-specific performance metrics

## Quick Start

1. Open `index.html` in any modern web browser
2. Choose **Quiz Mode** to practice or **Network Lab** to experiment
3. Track your progress and improve weak areas

## CCNA Exam Domains Covered

| Domain | Weight | Questions |
|--------|--------|-----------|
| Network Fundamentals | 20% | OSI, TCP/IP, cabling, topologies |
| Network Access | 20% | VLANs, trunking, STP, EtherChannel |
| IP Connectivity | 25% | OSPF, EIGRP, static routing, FHRP |
| IP Services | 10% | DHCP, NAT, NTP, DNS, SNMP |
| Security Fundamentals | 15% | AAA, ACLs, port security, VPNs |
| Automation & Programmability | 10% | REST APIs, Ansible, JSON, Python |

## Command Shortcuts (Packet Tracer Compatible)

The CLI supports extensive shortcuts for rapid configuration:

### User Mode
- `en` → `enable`
- `ex` → `exit`
- `sh` → `show`

### Privileged Mode
- `cf` → `configure`
- `sh r` → `show running-config`
- `sh v` → `show version`
- `sh ip int b` → `show ip interface brief`

### Config Mode
- `int` → `interface`
- `router o` → `router ospf`
- `line v` → `line vty`
- `vlan` → `vlan`

### Interface Mode
- `ip a` → `ip address`
- `no sh` → `no shutdown`
- `sw m a` → `switchport mode access`

*And 180+ more shortcuts across all modes!*

## Memory Aids & Mnemonics

New hardcore questions include memory tricks to help concepts stick:

| Concept | Memory Aid |
|---------|------------|
| Serial clocking | "UP/DOWN = CLOCK NOT AROUND 🕐" |
| Wildcard masks | "255 - mask = wildcard! 240→15" |
| TCP Window | "Window = Credit Limit 💳" |
| PortFast | "PortFast = Access Only! 🚫" |
| Subnetting | "/25=126, /26=62, /27=30 🧮" |
| ACL Order | "Permit 1st, Deny 2nd! 📋" |

## File Structure

```
CCNA prep/
├── index.html                    # Main application page
├── styles.css                    # All styling
├── app.js                        # Main application logic
├── lab.js                        # Lab simulator logic
├── cli.js                        # CLI command processor (200+ shortcuts)
├── questions.js                  # Base question bank
├── questions-boson.js           # 12 Boson-style scenario questions
├── questions-hardcore.js        # 30+ extreme difficulty questions
├── questions-*.js               # Domain-specific questions
└── README.md                     # This file
```

## Recent Updates (v2.0)

### ✨ New Features
- **Inline Answer Feedback** - No more scrolling to see explanations
- **200+ Command Shortcuts** - Packet Tracer compatible abbreviations
- **18 New Hardcore Questions** - Advanced scenarios with memory aids
- **12 Boson-Style Questions** - Network topology exhibits, config analysis

### 🔧 Improvements
- Enhanced CLI tab completion
- Better error messages with typo detection
- Levenshtein distance for command suggestions
- Improved lab fluidity and responsiveness

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT License - Feel free to use, modify, and distribute.

## Credits

Built for CCNA 200-301 exam preparation with realistic scenarios and memory-enhancing techniques.

---

**Good luck with your CCNA journey! 🎓**
