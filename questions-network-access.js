// ============================================
// CCNA Master - Network Access Questions (20)
// User's 2nd Weakest Area at 40%
// ============================================

const networkAccessQuestions = [
    {
        id: 201,
        domain: "network-access",
        domainName: "Network Access",
        question: `Which command configures an interface as a trunk?`,
        options: [
            { letter: "A", text: "<code>switchport mode access</code>" },
            { letter: "B", text: "<code>switchport mode trunk</code>" },
            { letter: "C", text: "<code>switchport trunk allowed vlan all</code>" },
            { letter: "D", text: "<code>switchport nonegotiate</code>" }
        ],
        correct: "B",
        explanation: "'switchport mode trunk' explicitly configures the port as an 802.1Q trunk.",
        optionExplanations: {
            "A": "Incorrect. Access mode is for single VLAN, not trunk.",
            "B": "Correct! This command sets the port to trunk mode.",
            "C": "Incorrect. This specifies allowed VLANs but doesn't enable trunk.",
            "D": "Incorrect. nonegotiate disables DTP but doesn't set mode."
        },
        labScenario: "vlan-config"
    },
    {
        id: 202,
        domain: "network-access",
        domainName: "Network Access",
        question: `What is the purpose of the native VLAN on a trunk?`,
        options: [
            { letter: "A", text: "To encrypt traffic" },
            { letter: "B", text: "To carry untagged traffic" },
            { letter: "C", text: "To carry management traffic only" },
            { letter: "D", text: "To block unwanted VLANs" }
        ],
        correct: "B",
        explanation: "Native VLAN traffic is untagged on the trunk. Both sides must match to avoid VLAN mismatches.",
        optionExplanations: {
            "A": "Incorrect. Native VLAN doesn't provide encryption.",
            "B": "Correct! Untagged frames are placed in the native VLAN.",
            "C": "Incorrect. Any VLAN can use native VLAN.",
            "D": "Incorrect. Allowed VLAN list controls that."
        },
        labScenario: "vlan-config"
    },
    {
        id: 203,
        domain: "network-access",
        domainName: "Network Access",
        question: `Which STP port state learns MAC addresses but doesn't forward frames?`,
        options: [
            { letter: "A", text: "Blocking" },
            { letter: "B", text: "Listening" },
            { letter: "C", text: "Learning" },
            { letter: "D", text: "Forwarding" }
        ],
        correct: "C",
        explanation: "Learning state: builds MAC table but doesn't forward user frames. Prepares for forwarding.",
        optionExplanations: {
            "A": "Incorrect. Blocking doesn't learn or forward.",
            "B": "Incorrect. Listening processes BPDUs but doesn't learn MACs.",
            "C": "Correct! Learning populates MAC table without forwarding.",
            "D": "Incorrect. Forwarding both learns and forwards."
        },
        labScenario: "vlan-config"
    },
    {
        id: 204,
        domain: "network-access",
        domainName: "Network Access",
        question: `What is the default STP hello timer?`,
        options: [
            { letter: "A", text: "1 second" },
            { letter: "B", text: "2 seconds" },
            { letter: "C", text: "10 seconds" },
            { letter: "D", text: "15 seconds" }
        ],
        correct: "B",
        explanation: "STP hello timer is 2 seconds by default. Root bridge sends BPDUs every 2 seconds.",
        optionExplanations: {
            "A": "Incorrect. Not the default.",
            "B": "Correct! Hello: 2s, Forward Delay: 15s, Max Age: 20s.",
            "C": "Incorrect. This is not a default timer.",
            "D": "Incorrect. 15 seconds is the forward delay."
        },
        labScenario: "vlan-config"
    },
    {
        id: 205,
        domain: "network-access",
        domainName: "Network Access",
        question: `Which EtherChannel mode uses LACP with active negotiation?`,
        options: [
            { letter: "A", text: "<code>mode on</code>" },
            { letter: "B", text: "<code>mode auto</code>" },
            { letter: "C", text: "<code>mode desirable</code>" },
            { letter: "D", text: "<code>mode active</code>" }
        ],
        correct: "D",
        explanation: "LACP uses 'active' and 'passive' modes. PAgP uses 'desirable' and 'auto'.",
        optionExplanations: {
            "A": "Incorrect. 'on' forces EtherChannel without negotiation.",
            "B": "Incorrect. 'auto' is PAgP passive mode.",
            "C": "Incorrect. 'desirable' is PAgP active mode.",
            "D": "Correct! 'active' initiates LACP negotiation."
        },
        labScenario: "vlan-config"
    },
    {
        id: 206,
        domain: "network-access",
        domainName: "Network Access",
        question: `Which VLAN is used by CDP, VTP, and PAgP traffic?`,
        options: [
            { letter: "A", text: "VLAN 1" },
            { letter: "B", text: "Native VLAN" },
            { letter: "C", text: "Management VLAN" },
            { letter: "D", text: "Voice VLAN" }
        ],
        correct: "A",
        explanation: "VLAN 1 carries control plane protocols like CDP, VTP, and PAgP by default.",
        optionExplanations: {
            "A": "Correct! Control protocols use VLAN 1 regardless of native VLAN.",
            "B": "Incorrect. Native VLAN carries untagged user data.",
            "C": "Incorrect. Management VLAN is for switch management.",
            "D": "Incorrect. Voice VLAN is for VoIP traffic."
        },
        labScenario: "vlan-config"
    },
    {
        id: 207,
        domain: "network-access",
        domainName: "Network Access",
        question: `What is the default STP bridge priority?`,
        options: [
            { letter: "A", text: "4096" },
            { letter: "B", text: "8192" },
            { letter: "C", text: "32768" },
            { letter: "D", text: "65535" }
        ],
        correct: "C",
        explanation: "Default bridge priority is 32768. Lower priority = more likely to be root bridge.",
        optionExplanations: {
            "A": "Incorrect. This is a configurable increment.",
            "B": "Incorrect. Not the default.",
            "C": "Correct! 32768 is the default. Configure lower for root bridge.",
            "D": "Incorrect. Maximum is 65535, but that's not default."
        },
        labScenario: "vlan-config"
    },
    {
        id: 208,
        domain: "network-access",
        domainName: "Network Access",
        question: `Which command shows the trunk native VLAN?`,
        options: [
            { letter: "A", text: "<code>show vlan brief</code>" },
            { letter: "B", text: "<code>show interfaces trunk</code>" },
            { letter: "C", text: "<code>show spanning-tree</code>" },
            { letter: "D", text: "<code>show mac address-table</code>" }
        ],
        correct: "B",
        explanation: "'show interfaces trunk' displays trunk mode, native VLAN, and allowed VLANs.",
        optionExplanations: {
            "A": "Incorrect. Shows VLANs but not trunk details.",
            "B": "Correct! Shows trunk status including native VLAN.",
            "C": "Incorrect. Shows STP info, not trunk specifics.",
            "D": "Incorrect. Shows MAC addresses, not trunking."
        },
        labScenario: "vlan-config"
    },
    {
        id: 209,
        domain: "network-access",
        domainName: "Network Access",
        question: `What causes a VLAN mismatch on a trunk link?`,
        options: [
            { letter: "A", text: "Different encapsulation types" },
            { letter: "B", text: "Different native VLANs configured on each end" },
            { letter: "C", text: "Different allowed VLAN lists" },
            { letter: "D", text: "Different DTP modes" }
        ],
        correct: "B",
        explanation: "Native VLAN mismatch occurs when trunk ends have different native VLANs, causing traffic issues.",
        optionExplanations: {
            "A": "Incorrect. Encapsulation mismatch prevents trunk altogether.",
            "B": "Correct! Mismatched native VLANs cause traffic to hop VLANs.",
            "C": "Incorrect. Different allowed VLANs limit what crosses, not mismatch.",
            "D": "Incorrect. DTP issues affect trunk formation, not VLAN mismatch."
        },
        labScenario: "vlan-config"
    },
    {
        id: 210,
        domain: "network-access",
        domainName: "Network Access",
        question: `Which Rapid PVST+ port role provides an alternate path to the root?`,
        options: [
            { letter: "A", text: "Root port" },
            { letter: "B", text: "Designated port" },
            { letter: "C", text: "Alternate port" },
            { letter: "D", text: "Backup port" }
        ],
        correct: "C",
        explanation: "Alternate port is a backup to the root port - provides alternate path to root bridge.",
        optionExplanations: {
            "A": "Incorrect. Root port is the best path to root.",
            "B": "Incorrect. Designated port forwards on a segment.",
            "C": "Correct! Alternate port backs up the root port.",
            "D": "Incorrect. Backup port backs up the designated port."
        },
        labScenario: "vlan-config"
    },
    {
        id: 211,
        domain: "network-access",
        domainName: "Network Access",
        question: `What is the benefit of PortFast?`,
        options: [
            { letter: "A", text: "Prevents BPDU attacks" },
            { letter: "B", text: "Immediately transitions port to forwarding state" },
            { letter: "C", text: "Increases port speed" },
            { letter: "D", text: "Enables trunk auto-negotiation" }
        ],
        correct: "B",
        explanation: "PortFast skips STP listening/learning states, going directly to forwarding for end devices.",
        optionExplanations: {
            "A": "Incorrect. BPDU Guard does that.",
            "B": "Correct! PortFast bypasses 30-second STP convergence.",
            "C": "Incorrect. PortFast doesn't affect speed.",
            "D": "Incorrect. DTP handles trunk negotiation."
        },
        labScenario: "vlan-config"
    },
    {
        id: 212,
        domain: "network-access",
        domainName: "Network Access",
        question: `Which command enables VLAN on an interface for an IP phone?`,
        options: [
            { letter: "A", text: "<code>switchport voice vlan 100</code>" },
            { letter: "B", text: "<code>switchport access vlan voice</code>" },
            { letter: "C", text: "<code>voice vlan 100</code>" },
            { letter: "D", text: "<code>switchport trunk voice vlan 100</code>" }
        ],
        correct: "A",
        explanation: "'switchport voice vlan' configures the voice VLAN for IP phones on an access port.",
        optionExplanations: {
            "A": "Correct! Voice VLAN allows tagged traffic from IP phone.",
            "B": "Incorrect. Invalid syntax.",
            "C": "Incorrect. Missing 'switchport' prefix.",
            "D": "Incorrect. Invalid command; voice VLAN is for access ports."
        },
        labScenario: "vlan-config"
    },
    {
        id: 213,
        domain: "network-access",
        domainName: "Network Access",
        question: `How many bits are in the extended system ID used with PVST+?`,
        options: [
            { letter: "A", text: "4 bits" },
            { letter: "B", text: "8 bits" },
            { letter: "C", text: "12 bits" },
            { letter: "D", text: "16 bits" }
        ],
        correct: "C",
        explanation: "Extended system ID uses the 12-bit VLAN ID added to the bridge priority for unique BID per VLAN.",
        optionExplanations: {
            "A": "Incorrect. Priority increments are 4096 (4 bits of priority).",
            "B": "Incorrect. Not the extended system ID size.",
            "C": "Correct! 12 bits for VLAN ID (0-4095) in bridge ID.",
            "D": "Incorrect. Total priority field is 16 bits (4 priority + 12 VLAN)."
        },
        labScenario: "vlan-config"
    },
    {
        id: 214,
        domain: "network-access",
        domainName: "Network Access",
        question: `What happens when you delete a VLAN that has ports assigned to it?`,
        options: [
            { letter: "A", text: "Ports automatically move to VLAN 1" },
            { letter: "B", text: "Ports become inactive (unable to communicate)" },
            { letter: "C", text: "Switch prevents VLAN deletion" },
            { letter: "D", text: "Ports become trunk ports" }
        ],
        correct: "B",
        explanation: "Ports assigned to a deleted VLAN become inactive - they exist but have no valid VLAN.",
        optionExplanations: {
            "A": "Incorrect. Ports don't auto-move to VLAN 1.",
            "B": "Correct! Ports stay assigned to non-existent VLAN, stopping traffic.",
            "C": "Incorrect. Switch allows VLAN deletion.",
            "D": "Incorrect. Mode doesn't change."
        },
        labScenario: "vlan-config"
    },
    {
        id: 215,
        domain: "network-access",
        domainName: "Network Access",
        question: `Which command configures EtherChannel load balancing based on source and destination IP?`,
        options: [
            { letter: "A", text: "<code>port-channel load-balance src-dst-ip</code>" },
            { letter: "B", text: "<code>port-channel load-balance src-mac</code>" },
            { letter: "C", text: "<code>channel-group 1 load-balance ip</code>" },
            { letter: "D", text: "<code>etherchannel load-balance src-dst-ip</code>" }
        ],
        correct: "A",
        explanation: "'port-channel load-balance src-dst-ip' configures load balancing method globally.",
        optionExplanations: {
            "A": "Correct! Global command sets EtherChannel load-balance algorithm.",
            "B": "Incorrect. This would use source MAC only.",
            "C": "Incorrect. Invalid syntax.",
            "D": "Incorrect. Invalid command syntax."
        },
        labScenario: "vlan-config"
    },
    {
        id: 216,
        domain: "network-access",
        domainName: "Network Access",
        question: `Which DTP mode prevents trunk formation?`,
        options: [
            { letter: "A", text: "Dynamic auto" },
            { letter: "B", text: "Dynamic desirable" },
            { letter: "C", text: "Trunk with nonegotiate" },
            { letter: "D", text: "Access" }
        ],
        correct: "D",
        explanation: "Access mode prevents trunk formation - the port stays as an access port only.",
        optionExplanations: {
            "A": "Incorrect. Auto can form trunk with desirable or trunk.",
            "B": "Incorrect. Desirable actively tries to trunk.",
            "C": "Incorrect. Trunk mode still forms trunk.",
            "D": "Correct! Access mode port won't become a trunk."
        },
        labScenario: "vlan-config"
    },
    {
        id: 217,
        domain: "network-access",
        domainName: "Network Access",
        question: `What is the maximum number of standard VLANs?`,
        options: [
            { letter: "A", text: "256" },
            { letter: "B", text: "1005" },
            { letter: "C", text: "4094" },
            { letter: "D", text: "4096" }
        ],
        correct: "B",
        explanation: "Standard range VLANs are 1-1005. Extended range is 1006-4094.",
        optionExplanations: {
            "A": "Incorrect. Much larger than 256.",
            "B": "Correct! VLANs 1-1005 are standard range.",
            "C": "Incorrect. 4094 is total usable including extended.",
            "D": "Incorrect. 0 and 4095 are reserved."
        },
        labScenario: "vlan-config"
    },
    {
        id: 218,
        domain: "network-access",
        domainName: "Network Access",
        question: `Which wireless authentication method uses a RADIUS server?`,
        options: [
            { letter: "A", text: "WPA2-Personal" },
            { letter: "B", text: "WPA2-Enterprise" },
            { letter: "C", text: "Open Authentication" },
            { letter: "D", text: "WEP" }
        ],
        correct: "B",
        explanation: "WPA2-Enterprise uses 802.1X authentication with RADIUS server for user credentials.",
        optionExplanations: {
            "A": "Incorrect. Personal uses pre-shared key (PSK).",
            "B": "Correct! Enterprise = 802.1X + RADIUS for each user.",
            "C": "Incorrect. Open has no authentication.",
            "D": "Incorrect. WEP doesn't use RADIUS."
        },
        labScenario: "basic-topology"
    },
    {
        id: 219,
        domain: "network-access",
        domainName: "Network Access",
        question: `What command shows EtherChannel summary?`,
        options: [
            { letter: "A", text: "<code>show etherchannel port</code>" },
            { letter: "B", text: "<code>show etherchannel summary</code>" },
            { letter: "C", text: "<code>show interface port-channel</code>" },
            { letter: "D", text: "<code>show channel-group</code>" }
        ],
        correct: "B",
        explanation: "'show etherchannel summary' displays all port-channels and their member ports.",
        optionExplanations: {
            "A": "Incorrect. Not the correct command.",
            "B": "Correct! Shows port-channel status, protocol, and members.",
            "C": "Incorrect. Shows interface details, not summary.",
            "D": "Incorrect. Invalid command."
        },
        labScenario: "vlan-config"
    },
    {
        id: 220,
        domain: "network-access",
        domainName: "Network Access",
        question: `Which is the IEEE standard for VLAN tagging?`,
        options: [
            { letter: "A", text: "802.1D" },
            { letter: "B", text: "802.1Q" },
            { letter: "C", text: "802.1X" },
            { letter: "D", text: "802.3ad" }
        ],
        correct: "B",
        explanation: "802.1Q is the IEEE standard for VLAN tagging on Ethernet trunks.",
        optionExplanations: {
            "A": "Incorrect. 802.1D is Spanning Tree Protocol.",
            "B": "Correct! 802.1Q defines VLAN tagging.",
            "C": "Incorrect. 802.1X is port-based authentication.",
            "D": "Incorrect. 802.3ad is Link Aggregation (LACP)."
        },
        labScenario: "vlan-config"
    }
];

if (typeof questionBank !== 'undefined') {
    questionBank.push(...networkAccessQuestions);
}
