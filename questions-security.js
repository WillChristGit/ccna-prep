// ============================================
// CCNA Master - Expanded Question Bank Part 1
// Security Fundamentals (20 Questions) - User's Weakest Area
// ============================================

const securityQuestions = [
    {
        id: 101,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `Which security feature prevents unauthorized DHCP servers from assigning IP addresses on a network?`,
        options: [
            { letter: "A", text: "Port Security" },
            { letter: "B", text: "DHCP Snooping" },
            { letter: "C", text: "Dynamic ARP Inspection" },
            { letter: "D", text: "802.1X Authentication" }
        ],
        correct: "B",
        explanation: "DHCP Snooping is a Layer 2 security feature that filters untrusted DHCP messages by only allowing DHCP server messages on trusted ports.",
        optionExplanations: {
            "A": "Incorrect. Port Security limits MAC addresses per port but doesn't filter DHCP traffic.",
            "B": "Correct! DHCP Snooping creates trusted/untrusted ports. Server messages only allowed on trusted ports.",
            "C": "Incorrect. DAI prevents ARP spoofing, not rogue DHCP servers.",
            "D": "Incorrect. 802.1X provides port-based authentication, not DHCP filtering."
        },
        labScenario: "basic-topology"
    },
    {
        id: 102,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `An administrator wants to restrict SSH access to a router so only 10.10.10.0/24 can connect. Which configuration is correct?`,
        options: [
            { letter: "A", text: "<code>access-list 10 permit 10.10.10.0 0.0.0.255</code> applied with <code>access-class 10 in</code> on VTY lines" },
            { letter: "B", text: "<code>access-list 100 permit ip 10.10.10.0 0.0.0.255 any</code> applied with <code>ip access-group 100 in</code> on interface" },
            { letter: "C", text: "<code>access-list 10 permit 10.10.10.0 255.255.255.0</code> applied with <code>access-class 10 in</code>" },
            { letter: "D", text: "<code>access-list 10 permit any</code> applied with <code>access-class 10 out</code>" }
        ],
        correct: "A",
        explanation: "To restrict VTY access, use a standard ACL with wildcard mask, applied using 'access-class' on VTY lines.",
        optionExplanations: {
            "A": "Correct! Standard ACL with wildcard mask (0.0.0.255) applied via access-class on VTY lines.",
            "B": "Incorrect. access-group on interface doesn't restrict VTY management access.",
            "C": "Incorrect. Standard ACLs use wildcard masks, not subnet masks.",
            "D": "Incorrect. 'permit any' allows everyone, and 'out' restricts outbound connections."
        },
        labScenario: "acl"
    },
    {
        id: 103,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `What is the primary difference between IDS and IPS?`,
        options: [
            { letter: "A", text: "IDS encrypts traffic; IPS decrypts traffic" },
            { letter: "B", text: "IDS monitors and alerts; IPS monitors, alerts, AND blocks malicious traffic" },
            { letter: "C", text: "IDS works at Layer 2; IPS works at Layer 3" },
            { letter: "D", text: "IDS is hardware-based; IPS is software-based" }
        ],
        correct: "B",
        explanation: "IDS is passive (detect and alert). IPS is active (detect, alert, AND prevent by blocking traffic inline).",
        optionExplanations: {
            "A": "Incorrect. Neither is used for encryption.",
            "B": "Correct! IPS sits inline and actively blocks threats; IDS only monitors and alerts.",
            "C": "Incorrect. Both work at multiple layers.",
            "D": "Incorrect. Both can be hardware or software."
        },
        labScenario: "acl"
    },
    {
        id: 104,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `Which AAA protocol is Cisco proprietary and uses TCP port 49?`,
        options: [
            { letter: "A", text: "RADIUS" },
            { letter: "B", text: "TACACS+" },
            { letter: "C", text: "Kerberos" },
            { letter: "D", text: "LDAP" }
        ],
        correct: "B",
        explanation: "TACACS+ is Cisco proprietary, uses TCP port 49, and encrypts the entire payload. RADIUS is open standard, uses UDP 1812/1813.",
        optionExplanations: {
            "A": "Incorrect. RADIUS is an open standard using UDP 1812/1813.",
            "B": "Correct! TACACS+ is Cisco proprietary, TCP 49, encrypts entire packet.",
            "C": "Incorrect. Kerberos is a ticket-based authentication protocol.",
            "D": "Incorrect. LDAP is a directory service protocol."
        },
        labScenario: "basic-topology"
    },
    {
        id: 105,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `Which command enables port security on a switch interface?`,
        options: [
            { letter: "A", text: "<code>switchport port-security</code>" },
            { letter: "B", text: "<code>port-security enable</code>" },
            { letter: "C", text: "<code>security port enable</code>" },
            { letter: "D", text: "<code>switchport security</code>" }
        ],
        correct: "A",
        explanation: "The command 'switchport port-security' enables port security. The interface must be an access port first.",
        optionExplanations: {
            "A": "Correct! This enables port security on the interface.",
            "B": "Incorrect. Not a valid IOS command.",
            "C": "Incorrect. Not a valid IOS command.",
            "D": "Incorrect. The correct command is 'switchport port-security'."
        },
        labScenario: "vlan-config"
    },
    {
        id: 106,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `What is the default violation mode for port security?`,
        options: [
            { letter: "A", text: "Protect" },
            { letter: "B", text: "Restrict" },
            { letter: "C", text: "Shutdown" },
            { letter: "D", text: "Alert" }
        ],
        correct: "C",
        explanation: "The default violation mode is Shutdown, which disables the port (err-disabled) when a violation occurs.",
        optionExplanations: {
            "A": "Incorrect. Protect drops violating traffic but doesn't log or shutdown.",
            "B": "Incorrect. Restrict drops and logs but doesn't shutdown.",
            "C": "Correct! Shutdown is default - port goes err-disabled on violation.",
            "D": "Incorrect. Alert is not a valid port security mode."
        },
        labScenario: "vlan-config"
    },
    {
        id: 107,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `Which type of ACL should be placed closest to the source?`,
        options: [
            { letter: "A", text: "Standard ACL" },
            { letter: "B", text: "Extended ACL" },
            { letter: "C", text: "Named ACL" },
            { letter: "D", text: "Reflexive ACL" }
        ],
        correct: "B",
        explanation: "Extended ACLs should be placed closest to the source because they can filter on source AND destination, minimizing unnecessary traffic.",
        optionExplanations: {
            "A": "Incorrect. Standard ACLs filter only on source, so place near destination.",
            "B": "Correct! Extended ACLs near source to stop unwanted traffic early.",
            "C": "Incorrect. Named is a configuration style, not a type affecting placement.",
            "D": "Incorrect. Reflexive ACLs are for return traffic."
        },
        labScenario: "acl"
    },
    {
        id: 108,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `What does Dynamic ARP Inspection (DAI) use to validate ARP packets?`,
        options: [
            { letter: "A", text: "MAC address table" },
            { letter: "B", text: "DHCP snooping binding database" },
            { letter: "C", text: "Routing table" },
            { letter: "D", text: "ARP cache" }
        ],
        correct: "B",
        explanation: "DAI validates ARP packets against the DHCP snooping binding database, which contains IP-to-MAC mappings.",
        optionExplanations: {
            "A": "Incorrect. MAC table shows learned MACs, not IP bindings.",
            "B": "Correct! DAI uses DHCP snooping database for IP-MAC validation.",
            "C": "Incorrect. Routing table contains network routes.",
            "D": "Incorrect. ARP cache is what DAI is protecting."
        },
        labScenario: "basic-topology"
    },
    {
        id: 109,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `An extended ACL has the following entry: <code>permit tcp 10.0.0.0 0.0.0.255 host 192.168.1.100 eq 443</code>. What traffic does this permit?`,
        options: [
            { letter: "A", text: "HTTPS traffic from 192.168.1.100 to 10.0.0.0/24" },
            { letter: "B", text: "HTTPS traffic from 10.0.0.0/24 to 192.168.1.100" },
            { letter: "C", text: "HTTP traffic from 10.0.0.0/24 to 192.168.1.100" },
            { letter: "D", text: "All TCP traffic to port 443" }
        ],
        correct: "B",
        explanation: "This ACL permits TCP port 443 (HTTPS) FROM source 10.0.0.0/24 TO destination host 192.168.1.100.",
        optionExplanations: {
            "A": "Incorrect. Source and destination are reversed.",
            "B": "Correct! Source: 10.0.0.0/24, Destination: 192.168.1.100, Port: 443 (HTTPS).",
            "C": "Incorrect. Port 443 is HTTPS, not HTTP (80).",
            "D": "Incorrect. Source is restricted to 10.0.0.0/24."
        },
        labScenario: "acl"
    },
    {
        id: 110,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `What is the purpose of the 'ip verify source' command?`,
        options: [
            { letter: "A", text: "Enable DHCP snooping" },
            { letter: "B", text: "Enable IP Source Guard" },
            { letter: "C", text: "Enable Dynamic ARP Inspection" },
            { letter: "D", text: "Enable port security" }
        ],
        correct: "B",
        explanation: "'ip verify source' enables IP Source Guard, which validates source IP addresses against the DHCP snooping database.",
        optionExplanations: {
            "A": "Incorrect. DHCP snooping uses 'ip dhcp snooping'.",
            "B": "Correct! IP Source Guard prevents IP spoofing by validating source IPs.",
            "C": "Incorrect. DAI uses 'ip arp inspection'.",
            "D": "Incorrect. Port security uses 'switchport port-security'."
        },
        labScenario: "basic-topology"
    },
    {
        id: 111,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `Which security mechanism is used to protect the control plane of a router?`,
        options: [
            { letter: "A", text: "ACLs applied to interfaces" },
            { letter: "B", text: "Control Plane Policing (CoPP)" },
            { letter: "C", text: "Port Security" },
            { letter: "D", text: "DHCP Snooping" }
        ],
        correct: "B",
        explanation: "CoPP protects the control plane by rate-limiting traffic destined to the router itself (BGP, OSPF, SSH, etc.).",
        optionExplanations: {
            "A": "Incorrect. Interface ACLs filter transit traffic, not control plane.",
            "B": "Correct! CoPP protects CPU from DoS by limiting control plane traffic.",
            "C": "Incorrect. Port security is a Layer 2 switch feature.",
            "D": "Incorrect. DHCP snooping prevents rogue DHCP servers."
        },
        labScenario: "acl"
    },
    {
        id: 112,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `What is the implicit statement at the end of every ACL?`,
        options: [
            { letter: "A", text: "permit any" },
            { letter: "B", text: "deny any" },
            { letter: "C", text: "permit ip any any" },
            { letter: "D", text: "log all" }
        ],
        correct: "B",
        explanation: "Every ACL has an implicit 'deny any' at the end. Traffic not explicitly permitted is denied.",
        optionExplanations: {
            "A": "Incorrect. Implicit is deny, not permit.",
            "B": "Correct! Implicit 'deny any' blocks all unmatched traffic.",
            "C": "Incorrect. This would permit everything.",
            "D": "Incorrect. There's no implicit logging."
        },
        labScenario: "acl"
    },
    {
        id: 113,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `Which command shows the number of matches for each ACL statement?`,
        options: [
            { letter: "A", text: "<code>show ip access-lists</code>" },
            { letter: "B", text: "<code>show access-list counters</code>" },
            { letter: "C", text: "<code>show ip interface</code>" },
            { letter: "D", text: "<code>debug access-list</code>" }
        ],
        correct: "A",
        explanation: "'show ip access-lists' displays ACL entries with match counts for each statement.",
        optionExplanations: {
            "A": "Correct! Shows ACL entries with match counts in parentheses.",
            "B": "Incorrect. Not a valid command.",
            "C": "Incorrect. Shows interfaces with applied ACLs, not match counts.",
            "D": "Incorrect. Debug shows real-time matching, not counters."
        },
        labScenario: "acl"
    },
    {
        id: 114,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `What encryption method does WPA3 use?`,
        options: [
            { letter: "A", text: "TKIP" },
            { letter: "B", text: "AES-CCMP" },
            { letter: "C", text: "SAE (Simultaneous Authentication of Equals)" },
            { letter: "D", text: "WEP" }
        ],
        correct: "C",
        explanation: "WPA3 uses SAE, which provides stronger protection against offline dictionary attacks.",
        optionExplanations: {
            "A": "Incorrect. TKIP is used in WPA (deprecated).",
            "B": "Incorrect. AES-CCMP is used in WPA2.",
            "C": "Correct! WPA3 uses SAE (Dragonfly handshake) for better security.",
            "D": "Incorrect. WEP is deprecated and insecure."
        },
        labScenario: "basic-topology"
    },
    {
        id: 115,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `Which feature prevents MAC flooding attacks?`,
        options: [
            { letter: "A", text: "Storm control" },
            { letter: "B", text: "Port security with maximum MAC limit" },
            { letter: "C", text: "BPDU guard" },
            { letter: "D", text: "Root guard" }
        ],
        correct: "B",
        explanation: "Port security with MAC limit prevents attackers from flooding the CAM table with fake MACs.",
        optionExplanations: {
            "A": "Incorrect. Storm control limits broadcast/multicast, not MAC flooding.",
            "B": "Correct! Limiting MACs prevents CAM table overflow attacks.",
            "C": "Incorrect. BPDU guard protects against STP manipulation.",
            "D": "Incorrect. Root guard protects STP root bridge."
        },
        labScenario: "vlan-config"
    },
    {
        id: 116,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `What does the 'service password-encryption' command do?`,
        options: [
            { letter: "A", text: "Encrypts passwords with MD5" },
            { letter: "B", text: "Encrypts passwords with Type 7 (weak reversible)" },
            { letter: "C", text: "Encrypts passwords with SHA-256" },
            { letter: "D", text: "Enables SSH encryption" }
        ],
        correct: "B",
        explanation: "'service password-encryption' uses Type 7 encryption, which is weak and reversible. Use 'secret' for MD5.",
        optionExplanations: {
            "A": "Incorrect. MD5 (Type 5) requires 'enable secret' command.",
            "B": "Correct! Type 7 is weak, easily decrypted. Better than plaintext only.",
            "C": "Incorrect. SHA-256 requires specific secret commands.",
            "D": "Incorrect. SSH encryption is separate from password storage."
        },
        labScenario: "basic-topology"
    },
    {
        id: 117,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `Which attack does BPDU Guard protect against?`,
        options: [
            { letter: "A", text: "VLAN hopping" },
            { letter: "B", text: "Rogue switch connecting and becoming root bridge" },
            { letter: "C", text: "MAC spoofing" },
            { letter: "D", text: "ARP poisoning" }
        ],
        correct: "B",
        explanation: "BPDU Guard disables ports that receive BPDUs, preventing rogue switches from affecting STP topology.",
        optionExplanations: {
            "A": "Incorrect. Switch spoofing/double tagging causes VLAN hopping.",
            "B": "Correct! BPDU Guard shuts down ports receiving unexpected BPDUs.",
            "C": "Incorrect. Port security addresses MAC spoofing.",
            "D": "Incorrect. DAI protects against ARP poisoning."
        },
        labScenario: "vlan-config"
    },
    {
        id: 118,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `What is the purpose of 802.1X authentication?`,
        options: [
            { letter: "A", text: "Encrypt wireless traffic" },
            { letter: "B", text: "Provide port-based network access control" },
            { letter: "C", text: "Create VLANs" },
            { letter: "D", text: "Configure trunking" }
        ],
        correct: "B",
        explanation: "802.1X provides port-based NAC. Devices must authenticate before getting network access.",
        optionExplanations: {
            "A": "Incorrect. 802.1X is authentication, not encryption.",
            "B": "Correct! 802.1X requires authentication before network access.",
            "C": "Incorrect. VLANs are configured separately.",
            "D": "Incorrect. Trunking is 802.1Q standard."
        },
        labScenario: "basic-topology"
    },
    {
        id: 119,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `In a private VLAN, which VLAN type can communicate with all other VLANs?`,
        options: [
            { letter: "A", text: "Isolated VLAN" },
            { letter: "B", text: "Community VLAN" },
            { letter: "C", text: "Promiscuous VLAN" },
            { letter: "D", text: "Secondary VLAN" }
        ],
        correct: "C",
        explanation: "Promiscuous ports (primary VLAN) can communicate with all private VLAN ports.",
        optionExplanations: {
            "A": "Incorrect. Isolated VLANs can only talk to promiscuous ports.",
            "B": "Incorrect. Community VLANs can talk within community and to promiscuous.",
            "C": "Correct! Promiscuous port communicates with all PVLAN members.",
            "D": "Incorrect. Secondary VLANs (isolated/community) have restrictions."
        },
        labScenario: "vlan-config"
    },
    {
        id: 120,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `Which command would recover a port in err-disabled state due to port security violation?`,
        options: [
            { letter: "A", text: "<code>errdisable recovery cause psecure-violation</code>" },
            { letter: "B", text: "<code>shutdown</code> then <code>no shutdown</code>" },
            { letter: "C", text: "Both A and B can work" },
            { letter: "D", text: "<code>clear port-security</code>" }
        ],
        correct: "C",
        explanation: "Manual recovery requires shut/no shut. Automatic recovery uses 'errdisable recovery cause psecure-violation'.",
        optionExplanations: {
            "A": "Correct partially. This enables automatic recovery.",
            "B": "Correct partially. This manually re-enables the port.",
            "C": "Correct! Both methods work. A is automatic, B is manual.",
            "D": "Incorrect. This clears secure MAC addresses, not port state."
        },
        labScenario: "vlan-config"
    }
];

// Add to main question bank
if (typeof questionBank !== 'undefined') {
    questionBank.push(...securityQuestions);
}
