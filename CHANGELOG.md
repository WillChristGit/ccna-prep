# Changelog

All notable changes to CCNA Master will be documented in this file.

## [2.0.0] - 2025-02-06

### 🎉 Major Release - Boson-Style Upgrade

#### ✨ New Features

##### Inline Answer Feedback
- Moved answer explanations inside the question card
- No more scrolling down to see feedback
- Added `inline-feedback` section with:
  - Correct/Incorrect indicator with visual styling
  - Detailed explanation for selected answer
  - Option-by-option breakdown (✅/❌ indicators)

##### Cisco Command Shortcuts (200+)
- Added Packet Tracer-compatible command abbreviations to `cli.js`
- **User Mode**: `en` (enable), `ex` (exit), `sh` (show)
- **Privileged**: `cf` (configure), `sh r` (show running-config), `sh ip int b`
- **Config Mode**: `int` (interface), `router o` (router ospf), `line v` (line vty)
- **Interface**: `ip a` (ip address), `no sh` (no shutdown), `sw m a` (switchport mode access)
- And 180+ more shortcuts across all command modes

##### Boson-Style Questions (`questions-boson.js`)
- 12 advanced scenario-based questions
- Network topology diagrams
- Configuration exhibits (show command output)
- Packet capture analysis scenarios
- Troubleshooting simulations

##### Hardcore Questions with Memory Aids (`questions-hardcore.js`)
- 30+ extreme difficulty questions (H-001 through H-030)
- Multi-select answer formats ("Choose TWO correct answers")
- Memory aids for every question:
  - Full `memoryAid` explanation with mnemonics/rhymes
  - Quick `memoryAidShort` mnemonic for fast recall

#### 🔧 Improvements

##### Enhanced CLI
- Better tab completion with longest common prefix detection
- Levenshtein distance for typo suggestions
- Improved error messages with "Did you mean...?"
- Smoother command parsing and execution

##### Lab Experience
- More fluid interaction between devices
- Faster command response
- Better visual feedback for configuration changes

#### 📚 New Question Topics

**Network Fundamentals**
- H-001: Serial interface clocking issues
- H-002: Wildcard mask calculation
- H-003: TCP window size and flow control
- H-013: TCP acknowledgment numbers
- H-014: VLSM subnetting
- H-026: IPv6 addressing and shortening

**Network Access**
- H-004: STP PortFast misconfiguration
- H-005: VLAN trunking database issues
- H-015: LACP EtherChannel troubleshooting
- H-020: RSTP rapid convergence

**IP Connectivity**
- H-006: OSPF stub area LSA filtering
- H-007: EIGRP metric calculation
- H-016: BGP neighbor troubleshooting
- H-022: OSPF network type mismatches

**IP Services**
- H-008: NAT PAT with HTTP/HTTPS filtering
- H-017: DHCP snooping and ARP inspection
- H-023: NTP authentication and synchronization
- H-029: DHCP relay configuration

**Security Fundamentals**
- H-009: ACL order of operations
- H-012: VPN protocol security (GRE/ESP/ISAKMP)
- H-018: AAA RADIUS fallback behavior
- H-021: Zone-Based Firewall configuration
- H-024: Port security violation modes

**Automation**
- H-010: Ansible ios_config block replacement
- H-019: REST API JSON payload handling
- H-025: Ansible loops and conditionals
- H-027: SNMPv3 configuration
- H-028: IPSec VPN troubleshooting
- H-030: NETCONF edit-config operations

#### 🧠 Memory Aids Added

All 30+ hardcore questions include memory tricks:

| Topic | Memory Aid |
|-------|------------|
| Serial clocking | "UP/DOWN = CLOCK NOT AROUND 🕐" |
| Wildcard masks | "255 - mask = wildcard! 240→15, Sausage Pizza! 🍕" |
| TCP Window | "Window = Credit Limit! 💳 Win = Send limit" |
| PortFast | "PortFast = Access Only! Trunks need STP! 🚫" |
| Subnetting | "/25=126, /26=62, /27=30! Remember: 2^n-2! 🧮" |
| ACL Order | "ACL Order: Permit 1st, Deny 2nd! 📋" |
| OSPF Stub | "Stub = Strict bouncer! 🚫 Only VIPs + Default allowed!" |
| EIGRP Metric | "10^7/BW (in K) + delay (in 10s), ×256! 🧮" |
| DHCP Snooping | "Helper needs LIVE interface! 🔄 VLAN up + IP assigned!" |
| AAA Fallback | "Timeout → Local Fallback! Reject → Game Over! 🚫" |
| IPv6 Shortening | "Drop leading zeros, ONE :: sequence! EUI-64 = FFFE + bit flip!" |
| EtherChannel | "Bundle Buddies Match! 🤝 Speed, VLAN, Mode!" |
| BGP States | "Idle = No route! Ping neighbor first! 🐧" |
| NTP Auth | "NTP Auth = Both sides! 🔐 Peer/Serve ACLs matter!" |
| SNMPv3 | "EngineID 1st! Auth≠Priv passwords! 🔐 authPriv = Best!" |
| VPN Security | "VPN = Known friends only! 🔒 Peer-specific ACLs!" |
| Port Security | "Protect/Restrict = Drop only! Shutdown = Err-Disable! 🔌" |
| NETCONF | "NETCONF ops: merge/replace/create/delete/remove! 📝" |

#### 🐛 Bug Fixes
- Fixed template literal closure issues in question files
- Corrected `labScenario` field formatting
- Improved button visibility logic for submit/next flow

#### 📝 Documentation
- Added comprehensive README.md
- Created this CHANGELOG.md
- Documented all 200+ command shortcuts

---

## [1.0.0] - Initial Release

### Features
- Basic quiz mode with timer
- Network lab simulator
- Progress tracking across 6 CCNA domains
- Domain-specific question banks
- Interactive CLI with basic commands
- Multiple lab scenarios

### Question Files
- `questions.js` - Base question bank
- `questions-security.js` - Security domain
- `questions-network-access.js` - Network Access domain
- `questions-ip-connectivity.js` - IP Connectivity domain
- `questions-ip-services.js` - IP Services domain
- `questions-fundauto.js` - Fundamentals & Automation domains

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | 2025-02-06 | Boson-style upgrade, 200+ shortcuts, memory aids |
| 1.0.0 | TBD | Initial release |

## Future Plans

- [ ] Add more scenario-based questions
- [ ] Expand lab scenarios (BGP, MPLS, DMVPN)
- [ ] Add performance analytics dashboard
- [ ] Export quiz results to PDF
- [ ] Collaborative study mode

---

**For detailed usage instructions, see [README.md](README.md)**
