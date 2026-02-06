// ============================================
// CCNA Master - IP Services Questions (20)
// User scored 48%
// ============================================

const ipServicesQuestions = [
    {
        id: 401, domain: "ip-services", domainName: "IP Services",
        question: `Which NAT type allows many internal hosts to share one public IP using ports?`,
        options: [
            { letter: "A", text: "Static NAT" }, { letter: "B", text: "Dynamic NAT" },
            { letter: "C", text: "PAT (NAT Overload)" }, { letter: "D", text: "NAT64" }
        ],
        correct: "C",
        explanation: "PAT uses port numbers to distinguish sessions, allowing thousands to share one IP.",
        optionExplanations: { "A": "One-to-one mapping.", "B": "Pool of IPs, still 1:1.", "C": "Correct! Many:1 with ports.", "D": "IPv6 to IPv4." },
        labScenario: "nat"
    },
    {
        id: 402, domain: "ip-services", domainName: "IP Services",
        question: `Which command configures the inside interface for NAT?`,
        options: [
            { letter: "A", text: "<code>ip nat inside</code>" }, { letter: "B", text: "<code>nat inside</code>" },
            { letter: "C", text: "<code>ip nat pool inside</code>" }, { letter: "D", text: "<code>interface nat inside</code>" }
        ],
        correct: "A",
        explanation: "On the interface, 'ip nat inside' marks it as the private-facing interface.",
        optionExplanations: { "A": "Correct! Interface command.", "B": "Missing 'ip'.", "C": "Invalid syntax.", "D": "Invalid." },
        labScenario: "nat"
    },
    {
        id: 403, domain: "ip-services", domainName: "IP Services",
        question: `What DHCP message does a client first send?`,
        options: [
            { letter: "A", text: "DHCP Request" }, { letter: "B", text: "DHCP Discover" },
            { letter: "C", text: "DHCP Offer" }, { letter: "D", text: "DHCP ACK" }
        ],
        correct: "B",
        explanation: "DORA: Discover, Offer, Request, ACK. Client sends Discover broadcast first.",
        optionExplanations: { "A": "Third message.", "B": "Correct! First message.", "C": "Server response #1.", "D": "Server response #2." },
        labScenario: "basic-topology"
    },
    {
        id: 404, domain: "ip-services", domainName: "IP Services",
        question: `Which port does DHCP server use?`,
        options: [
            { letter: "A", text: "UDP 67" }, { letter: "B", text: "UDP 68" },
            { letter: "C", text: "TCP 67" }, { letter: "D", text: "TCP 68" }
        ],
        correct: "A",
        explanation: "DHCP uses UDP. Server=67, Client=68.",
        optionExplanations: { "A": "Correct! Server port.", "B": "Client port.", "C": "DHCP uses UDP.", "D": "DHCP uses UDP." },
        labScenario: "basic-topology"
    },
    {
        id: 405, domain: "ip-services", domainName: "IP Services",
        question: `What is the purpose of the 'ip helper-address' command?`,
        options: [
            { letter: "A", text: "Configure NAT" }, { letter: "B", text: "Forward DHCP broadcasts to server" },
            { letter: "C", text: "Set default gateway" }, { letter: "D", text: "Enable DNS" }
        ],
        correct: "B",
        explanation: "ip helper-address relays DHCP broadcasts across routers to reach DHCP server.",
        optionExplanations: { "A": "NAT uses different commands.", "B": "Correct! DHCP relay.", "C": "Clients set own gateway.", "D": "DNS config is different." },
        labScenario: "basic-topology"
    },
    {
        id: 406, domain: "ip-services", domainName: "IP Services",
        question: `Which command excludes IPs from a DHCP pool?`,
        options: [
            { letter: "A", text: "<code>ip dhcp excluded-address</code>" },
            { letter: "B", text: "<code>ip dhcp pool exclude</code>" },
            { letter: "C", text: "<code>excluded-address</code>" },
            { letter: "D", text: "<code>no ip dhcp</code>" }
        ],
        correct: "A",
        explanation: "Global command 'ip dhcp excluded-address' reserves IPs from being assigned.",
        optionExplanations: { "A": "Correct! Global config.", "B": "Invalid syntax.", "C": "Missing 'ip dhcp'.", "D": "Disables DHCP entirely." },
        labScenario: "basic-topology"
    },
    {
        id: 407, domain: "ip-services", domainName: "IP Services",
        question: `What port does DNS use?`,
        options: [
            { letter: "A", text: "TCP/UDP 23" }, { letter: "B", text: "TCP/UDP 53" },
            { letter: "C", text: "UDP 161" }, { letter: "D", text: "TCP 443" }
        ],
        correct: "B",
        explanation: "DNS uses port 53. UDP for queries, TCP for zone transfers/large responses.",
        optionExplanations: { "A": "Telnet is 23.", "B": "Correct! DNS=53.", "C": "SNMP is 161.", "D": "HTTPS is 443." },
        labScenario: "basic-topology"
    },
    {
        id: 408, domain: "ip-services", domainName: "IP Services",
        question: `Which NTP stratum is the most accurate?`,
        options: [
            { letter: "A", text: "Stratum 0" }, { letter: "B", text: "Stratum 1" },
            { letter: "C", text: "Stratum 15" }, { letter: "D", text: "Stratum 16" }
        ],
        correct: "B",
        explanation: "Stratum 1 devices sync directly to atomic clocks (stratum 0). Lower=better.",
        optionExplanations: { "A": "Atomic clocks, not network devices.", "B": "Correct! Most accurate NTP server.", "C": "Very inaccurate.", "D": "Unsynchronized." },
        labScenario: "basic-topology"
    },
    {
        id: 409, domain: "ip-services", domainName: "IP Services",
        question: `What command configures a router as NTP client?`,
        options: [
            { letter: "A", text: "<code>ntp server 10.0.0.1</code>" },
            { letter: "B", text: "<code>ntp client 10.0.0.1</code>" },
            { letter: "C", text: "<code>clock set ntp 10.0.0.1</code>" },
            { letter: "D", text: "<code>time server 10.0.0.1</code>" }
        ],
        correct: "A",
        explanation: "'ntp server' points to the NTP server for time synchronization.",
        optionExplanations: { "A": "Correct! Client config.", "B": "Invalid syntax.", "C": "Invalid.", "D": "Invalid." },
        labScenario: "basic-topology"
    },
    {
        id: 410, domain: "ip-services", domainName: "IP Services",
        question: `Which protocol sends log messages to a centralized server?`,
        options: [
            { letter: "A", text: "SNMP" }, { letter: "B", text: "Syslog" },
            { letter: "C", text: "NetFlow" }, { letter: "D", text: "TFTP" }
        ],
        correct: "B",
        explanation: "Syslog sends log messages to a syslog server. Uses UDP 514.",
        optionExplanations: { "A": "SNMP monitors/manages devices.", "B": "Correct! Centralized logging.", "C": "NetFlow is traffic analysis.", "D": "TFTP is file transfer." },
        labScenario: "basic-topology"
    },
    {
        id: 411, domain: "ip-services", domainName: "IP Services",
        question: `What syslog severity level is '3'?`,
        options: [
            { letter: "A", text: "Warning" }, { letter: "B", text: "Error" },
            { letter: "C", text: "Critical" }, { letter: "D", text: "Informational" }
        ],
        correct: "B",
        explanation: "0=Emergency, 1=Alert, 2=Critical, 3=Error, 4=Warning, 5=Notice, 6=Info, 7=Debug",
        optionExplanations: { "A": "4=Warning.", "B": "Correct! 3=Error.", "C": "2=Critical.", "D": "6=Informational." },
        labScenario: "basic-topology"
    },
    {
        id: 412, domain: "ip-services", domainName: "IP Services",
        question: `Which command shows NAT translations?`,
        options: [
            { letter: "A", text: "<code>show ip nat translations</code>" },
            { letter: "B", text: "<code>show nat table</code>" },
            { letter: "C", text: "<code>show ip nat statistics</code>" },
            { letter: "D", text: "<code>debug ip nat</code>" }
        ],
        correct: "A",
        explanation: "'show ip nat translations' displays current NAT table entries.",
        optionExplanations: { "A": "Correct! Shows NAT table.", "B": "Invalid.", "C": "Shows stats, not entries.", "D": "Real-time debug, not table." },
        labScenario: "nat"
    },
    {
        id: 413, domain: "ip-services", domainName: "IP Services",
        question: `What is the SNMP port?`,
        options: [
            { letter: "A", text: "UDP 161" }, { letter: "B", text: "TCP 162" },
            { letter: "C", text: "UDP 514" }, { letter: "D", text: "TCP 22" }
        ],
        correct: "A",
        explanation: "SNMP uses UDP 161 for queries, UDP 162 for traps.",
        optionExplanations: { "A": "Correct! SNMP queries.", "B": "162 is for traps, UDP not TCP.", "C": "Syslog port.", "D": "SSH port." },
        labScenario: "basic-topology"
    },
    {
        id: 414, domain: "ip-services", domainName: "IP Services",
        question: `Which QoS mechanism classifies and marks traffic?`,
        options: [
            { letter: "A", text: "Policing" }, { letter: "B", text: "Shaping" },
            { letter: "C", text: "Classification" }, { letter: "D", text: "Queuing" }
        ],
        correct: "C",
        explanation: "Classification identifies traffic types; marking sets DSCP/CoS values.",
        optionExplanations: { "A": "Policing drops excess traffic.", "B": "Shaping delays excess.", "C": "Correct! First QoS step.", "D": "Queuing orders packets." },
        labScenario: "basic-topology"
    },
    {
        id: 415, domain: "ip-services", domainName: "IP Services",
        question: `What is the default DHCP lease time on Cisco routers?`,
        options: [
            { letter: "A", text: "1 hour" }, { letter: "B", text: "1 day" },
            { letter: "C", text: "7 days" }, { letter: "D", text: "30 days" }
        ],
        correct: "B",
        explanation: "Cisco IOS default DHCP lease is 1 day (86400 seconds).",
        optionExplanations: { "A": "Too short.", "B": "Correct! 24 hours.", "C": "Windows default.", "D": "Too long." },
        labScenario: "basic-topology"
    },
    {
        id: 416, domain: "ip-services", domainName: "IP Services",
        question: `Which DHCP option specifies DNS servers?`,
        options: [
            { letter: "A", text: "Option 3" }, { letter: "B", text: "Option 6" },
            { letter: "C", text: "Option 15" }, { letter: "D", text: "Option 150" }
        ],
        correct: "B",
        explanation: "Option 6=DNS, Option 3=Router/Gateway, Option 15=Domain Name, Option 150=TFTP.",
        optionExplanations: { "A": "Router/default gateway.", "B": "Correct! DNS servers.", "C": "Domain name.", "D": "TFTP server (Cisco phones)." },
        labScenario: "basic-topology"
    },
    {
        id: 417, domain: "ip-services", domainName: "IP Services",
        question: `What does SSH use for encryption?`,
        options: [
            { letter: "A", text: "No encryption" }, { letter: "B", text: "RSA keys and symmetric encryption" },
            { letter: "C", text: "MD5 hashing only" }, { letter: "D", text: "Base64 encoding" }
        ],
        correct: "B",
        explanation: "SSH uses RSA/DSA for authentication and AES/3DES for data encryption.",
        optionExplanations: { "A": "Telnet has no encryption.", "B": "Correct! Asymmetric + symmetric.", "C": "MD5 is hashing, not encryption.", "D": "Encoding, not encryption." },
        labScenario: "basic-topology"
    },
    {
        id: 418, domain: "ip-services", domainName: "IP Services",
        question: `What port does TFTP use?`,
        options: [
            { letter: "A", text: "TCP 20" }, { letter: "B", text: "TCP 21" },
            { letter: "C", text: "UDP 69" }, { letter: "D", text: "UDP 514" }
        ],
        correct: "C",
        explanation: "TFTP (Trivial FTP) uses UDP 69. FTP uses TCP 20/21.",
        optionExplanations: { "A": "FTP data.", "B": "FTP control.", "C": "Correct! TFTP.", "D": "Syslog." },
        labScenario: "basic-topology"
    },
    {
        id: 419, domain: "ip-services", domainName: "IP Services",
        question: `Which QoS value has highest priority (EF)?`,
        options: [
            { letter: "A", text: "DSCP 0" }, { letter: "B", text: "DSCP 26" },
            { letter: "C", text: "DSCP 46" }, { letter: "D", text: "DSCP 56" }
        ],
        correct: "C",
        explanation: "EF (Expedited Forwarding) = DSCP 46, used for voice traffic.",
        optionExplanations: { "A": "Best effort (default).", "B": "AF31.", "C": "Correct! EF for voice.", "D": "CS7 (network control)." },
        labScenario: "basic-topology"
    },
    {
        id: 420, domain: "ip-services", domainName: "IP Services",
        question: `What does 'clear ip nat translation *' do?`,
        options: [
            { letter: "A", text: "Deletes NAT configuration" },
            { letter: "B", text: "Clears all NAT table entries" },
            { letter: "C", text: "Resets NAT counters" },
            { letter: "D", text: "Disables NAT" }
        ],
        correct: "B",
        explanation: "This clears all dynamic NAT/PAT translations from the translation table.",
        optionExplanations: { "A": "Config requires 'no' commands.", "B": "Correct! Clears table.", "C": "Use 'clear ip nat statistics'.", "D": "Doesn't disable NAT." },
        labScenario: "nat"
    }
];

if (typeof questionBank !== 'undefined') {
    questionBank.push(...ipServicesQuestions);
}
