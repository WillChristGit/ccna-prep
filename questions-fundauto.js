// ============================================
// CCNA Master - Network Fundamentals (20) + Automation (20)
// ============================================

const networkFundamentalsQuestions = [
    {
        id: 501, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `Which OSI layer is responsible for end-to-end data delivery?`,
        options: [{ letter: "A", text: "Network Layer" }, { letter: "B", text: "Transport Layer" }, { letter: "C", text: "Data Link Layer" }, { letter: "D", text: "Session Layer" }],
        correct: "B",
        explanation: "Transport Layer (4) provides end-to-end delivery using TCP/UDP.",
        optionExplanations: { "A": "Network routes packets.", "B": "Correct! TCP/UDP live here.", "C": "Data Link handles frames.", "D": "Session manages connections." },
        labScenario: "basic-topology"
    },
    {
        id: 502, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `Which device operates at Layer 3?`,
        options: [{ letter: "A", text: "Hub" }, { letter: "B", text: "Switch" }, { letter: "C", text: "Router" }, { letter: "D", text: "Repeater" }],
        correct: "C",
        explanation: "Routers operate at Layer 3, making forwarding decisions based on IP addresses.",
        optionExplanations: { "A": "Hub is Layer 1.", "B": "Switch is Layer 2.", "C": "Correct! Router=Layer 3.", "D": "Repeater is Layer 1." },
        labScenario: "basic-topology"
    },
    {
        id: 503, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `What is the purpose of ARP?`,
        options: [{ letter: "A", text: "Resolve IP to MAC" }, { letter: "B", text: "Resolve MAC to IP" }, { letter: "C", text: "Assign IP addresses" }, { letter: "D", text: "Route packets" }],
        correct: "A",
        explanation: "ARP (Address Resolution Protocol) maps IP addresses to MAC addresses.",
        optionExplanations: { "A": "Correct! IP→MAC.", "B": "RARP does MAC→IP.", "C": "DHCP assigns IPs.", "D": "Routing protocols route." },
        labScenario: "basic-topology"
    },
    {
        id: 504, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `Which cable connects unlike devices (PC to switch)?`,
        options: [{ letter: "A", text: "Crossover" }, { letter: "B", text: "Straight-through" }, { letter: "C", text: "Rollover" }, { letter: "D", text: "Coaxial" }],
        correct: "B",
        explanation: "Straight-through connects unlike devices. Crossover connects like devices.",
        optionExplanations: { "A": "Like devices (switch-switch).", "B": "Correct! Unlike devices.", "C": "Console access.", "D": "Older networks." },
        labScenario: "basic-topology"
    },
    {
        id: 505, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `What is a Class C private IP range?`,
        options: [{ letter: "A", text: "10.0.0.0 - 10.255.255.255" }, { letter: "B", text: "172.16.0.0 - 172.31.255.255" }, { letter: "C", text: "192.168.0.0 - 192.168.255.255" }, { letter: "D", text: "169.254.0.0 - 169.254.255.255" }],
        correct: "C",
        explanation: "Private ranges: 10.x.x.x (A), 172.16-31.x.x (B), 192.168.x.x (C).",
        optionExplanations: { "A": "Class A private.", "B": "Class B private.", "C": "Correct! Class C.", "D": "APIPA range." },
        labScenario: "basic-topology"
    },
    {
        id: 506, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `Which protocol provides reliable delivery?`,
        options: [{ letter: "A", text: "UDP" }, { letter: "B", text: "TCP" }, { letter: "C", text: "ICMP" }, { letter: "D", text: "IP" }],
        correct: "B",
        explanation: "TCP provides reliable, ordered, error-checked delivery with acknowledgments.",
        optionExplanations: { "A": "UDP is unreliable/fast.", "B": "Correct! TCP=reliable.", "C": "ICMP is messaging.", "D": "IP is connectionless." },
        labScenario: "basic-topology"
    },
    {
        id: 507, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `What is the TCP three-way handshake sequence?`,
        options: [{ letter: "A", text: "SYN, SYN-ACK, ACK" }, { letter: "B", text: "ACK, SYN, SYN-ACK" }, { letter: "C", text: "SYN, ACK, FIN" }, { letter: "D", text: "FIN, FIN-ACK, ACK" }],
        correct: "A",
        explanation: "TCP establishes connection: SYN → SYN-ACK → ACK.",
        optionExplanations: { "A": "Correct! Standard handshake.", "B": "Wrong order.", "C": "FIN is for closing.", "D": "Connection termination." },
        labScenario: "basic-topology"
    },
    {
        id: 508, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `Which port does HTTP use?`,
        options: [{ letter: "A", text: "21" }, { letter: "B", text: "22" }, { letter: "C", text: "80" }, { letter: "D", text: "443" }],
        correct: "C",
        explanation: "HTTP=80, HTTPS=443, FTP=21, SSH=22.",
        optionExplanations: { "A": "FTP.", "B": "SSH.", "C": "Correct! HTTP.", "D": "HTTPS." },
        labScenario: "basic-topology"
    },
    {
        id: 509, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `What is the broadcast address for 192.168.1.0/24?`,
        options: [{ letter: "A", text: "192.168.1.0" }, { letter: "B", text: "192.168.1.1" }, { letter: "C", text: "192.168.1.254" }, { letter: "D", text: "192.168.1.255" }],
        correct: "D",
        explanation: "/24 broadcast = all host bits set to 1 = .255",
        optionExplanations: { "A": "Network address.", "B": "First usable.", "C": "Last usable.", "D": "Correct! Broadcast." },
        labScenario: "basic-topology"
    },
    {
        id: 510, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `What PDU is used at Layer 2?`,
        options: [{ letter: "A", text: "Bits" }, { letter: "B", text: "Frames" }, { letter: "C", text: "Packets" }, { letter: "D", text: "Segments" }],
        correct: "B",
        explanation: "L1=Bits, L2=Frames, L3=Packets, L4=Segments.",
        optionExplanations: { "A": "Layer 1.", "B": "Correct! Layer 2.", "C": "Layer 3.", "D": "Layer 4." },
        labScenario: "basic-topology"
    },
    {
        id: 511, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `What is the purpose of a default gateway?`,
        options: [{ letter: "A", text: "Assign IP addresses" }, { letter: "B", text: "Forward traffic to other networks" }, { letter: "C", text: "Resolve DNS names" }, { letter: "D", text: "Filter traffic" }],
        correct: "B",
        explanation: "Default gateway is the router that forwards traffic to destinations outside the local subnet.",
        optionExplanations: { "A": "DHCP assigns IPs.", "B": "Correct! Routes to other networks.", "C": "DNS resolves names.", "D": "Firewalls/ACLs filter." },
        labScenario: "basic-topology"
    },
    {
        id: 512, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `What is the subnet mask for a /20?`,
        options: [{ letter: "A", text: "255.255.240.0" }, { letter: "B", text: "255.255.248.0" }, { letter: "C", text: "255.255.252.0" }, { letter: "D", text: "255.255.255.0" }],
        correct: "A",
        explanation: "/20 = 20 network bits = 255.255.240.0 (4094 hosts).",
        optionExplanations: { "A": "Correct! /20.", "B": "/21.", "C": "/22.", "D": "/24." },
        labScenario: "basic-topology"
    },
    {
        id: 513, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `Which command shows interface status on a router?`,
        options: [{ letter: "A", text: "<code>show interfaces</code>" }, { letter: "B", text: "<code>show ip interface brief</code>" }, { letter: "C", text: "<code>show status</code>" }, { letter: "D", text: "<code>interface status</code>" }],
        correct: "B",
        explanation: "'show ip interface brief' shows concise interface status with IP and up/down state.",
        optionExplanations: { "A": "Detailed, not brief.", "B": "Correct! Concise summary.", "C": "Invalid.", "D": "Invalid." },
        labScenario: "basic-topology"
    },
    {
        id: 514, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `What does ICMP stand for?`,
        options: [{ letter: "A", text: "Internet Control Message Protocol" }, { letter: "B", text: "Internet Computer Management Protocol" }, { letter: "C", text: "Internal Control Message Protocol" }, { letter: "D", text: "Internetwork Communication Message Protocol" }],
        correct: "A",
        explanation: "ICMP is used for error messages and ping/traceroute.",
        optionExplanations: { "A": "Correct!", "B": "Incorrect.", "C": "Incorrect.", "D": "Incorrect." },
        labScenario: "basic-topology"
    },
    {
        id: 515, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `Which topology has a single point of failure at the center?`,
        options: [{ letter: "A", text: "Mesh" }, { letter: "B", text: "Star" }, { letter: "C", text: "Ring" }, { letter: "D", text: "Bus" }],
        correct: "B",
        explanation: "Star topology: if central device fails, all connections fail.",
        optionExplanations: { "A": "Mesh has redundancy.", "B": "Correct! Central device failure.", "C": "Ring has token passing.", "D": "Bus has backbone failure." },
        labScenario: "basic-topology"
    },
    {
        id: 516, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `What is the loopback address?`,
        options: [{ letter: "A", text: "0.0.0.0" }, { letter: "B", text: "127.0.0.1" }, { letter: "C", text: "255.255.255.255" }, { letter: "D", text: "192.168.0.1" }],
        correct: "B",
        explanation: "127.0.0.1 (localhost) is the loopback address for testing local TCP/IP stack.",
        optionExplanations: { "A": "Any/unspecified.", "B": "Correct! Localhost.", "C": "Broadcast.", "D": "Private IP." },
        labScenario: "basic-topology"
    },
    {
        id: 517, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `How many bits in an IPv4 address?`,
        options: [{ letter: "A", text: "16 bits" }, { letter: "B", text: "32 bits" }, { letter: "C", text: "64 bits" }, { letter: "D", text: "128 bits" }],
        correct: "B",
        explanation: "IPv4 = 32 bits (4 octets). IPv6 = 128 bits.",
        optionExplanations: { "A": "Too few.", "B": "Correct! 32 bits.", "C": "Half of IPv6.", "D": "IPv6 size." },
        labScenario: "basic-topology"
    },
    {
        id: 518, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `Which device creates collision domains per port?`,
        options: [{ letter: "A", text: "Hub" }, { letter: "B", text: "Switch" }, { letter: "C", text: "Repeater" }, { letter: "D", text: "Bridge" }],
        correct: "B",
        explanation: "Switches create separate collision domains per port (microsegmentation).",
        optionExplanations: { "A": "Hub = one collision domain.", "B": "Correct! Per-port collision domain.", "C": "Same as hub.", "D": "Bridge segments too, but switch is better." },
        labScenario: "basic-topology"
    },
    {
        id: 519, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `What is full-duplex communication?`,
        options: [{ letter: "A", text: "One direction at a time" }, { letter: "B", text: "Both directions simultaneously" }, { letter: "C", text: "Broadcast only" }, { letter: "D", text: "No collision detection" }],
        correct: "B",
        explanation: "Full-duplex allows simultaneous send/receive (no collisions).",
        optionExplanations: { "A": "Half-duplex.", "B": "Correct! Both ways at once.", "C": "Not related to duplex.", "D": "Full-duplex doesn't need CSMA/CD." },
        labScenario: "basic-topology"
    },
    {
        id: 520, domain: "network-fundamentals", domainName: "Network Fundamentals",
        question: `What well-known port does Telnet use?`,
        options: [{ letter: "A", text: "21" }, { letter: "B", text: "22" }, { letter: "C", text: "23" }, { letter: "D", text: "25" }],
        correct: "C",
        explanation: "Telnet=23 (unencrypted), SSH=22 (encrypted).",
        optionExplanations: { "A": "FTP.", "B": "SSH.", "C": "Correct! Telnet.", "D": "SMTP." },
        labScenario: "basic-topology"
    }
];

const automationQuestions = [
    {
        id: 601, domain: "automation", domainName: "Automation & Programmability",
        question: `Which data format is most common for REST API responses?`,
        options: [{ letter: "A", text: "XML" }, { letter: "B", text: "JSON" }, { letter: "C", text: "HTML" }, { letter: "D", text: "CSV" }],
        correct: "B",
        explanation: "JSON is lightweight, human-readable, and easy to parse.",
        optionExplanations: { "A": "Older SOAP uses XML.", "B": "Correct! REST uses JSON.", "C": "For web pages.", "D": "For spreadsheets." },
        labScenario: "basic-topology"
    },
    {
        id: 602, domain: "automation", domainName: "Automation & Programmability",
        question: `Which tool is agentless and uses SSH?`,
        options: [{ letter: "A", text: "Puppet" }, { letter: "B", text: "Chef" }, { letter: "C", text: "Ansible" }, { letter: "D", text: "SaltStack" }],
        correct: "C",
        explanation: "Ansible is agentless, uses SSH/YAML playbooks.",
        optionExplanations: { "A": "Agent-based.", "B": "Agent-based.", "C": "Correct! Agentless.", "D": "Uses minions." },
        labScenario: "basic-topology"
    },
    {
        id: 603, domain: "automation", domainName: "Automation & Programmability",
        question: `What HTTP method retrieves data from an API?`,
        options: [{ letter: "A", text: "POST" }, { letter: "B", text: "GET" }, { letter: "C", text: "PUT" }, { letter: "D", text: "DELETE" }],
        correct: "B",
        explanation: "GET retrieves data, POST creates, PUT updates, DELETE removes.",
        optionExplanations: { "A": "Creates data.", "B": "Correct! Retrieves.", "C": "Updates data.", "D": "Removes data." },
        labScenario: "basic-topology"
    },
    {
        id: 604, domain: "automation", domainName: "Automation & Programmability",
        question: `What does SDN stand for?`,
        options: [{ letter: "A", text: "Software Defined Networking" }, { letter: "B", text: "System Defined Network" }, { letter: "C", text: "Secure Dynamic Network" }, { letter: "D", text: "Service Delivery Network" }],
        correct: "A",
        explanation: "SDN separates control plane from data plane for centralized management.",
        optionExplanations: { "A": "Correct!", "B": "Incorrect.", "C": "Incorrect.", "D": "Incorrect." },
        labScenario: "basic-topology"
    },
    {
        id: 605, domain: "automation", domainName: "Automation & Programmability",
        question: `Which protocol does DNA Center use for device communication?`,
        options: [{ letter: "A", text: "SNMP only" }, { letter: "B", text: "NETCONF/RESTCONF" }, { letter: "C", text: "Telnet" }, { letter: "D", text: "FTP" }],
        correct: "B",
        explanation: "DNA Center uses NETCONF/RESTCONF for programmable interfaces.",
        optionExplanations: { "A": "SNMP is older.", "B": "Correct! Modern protocols.", "C": "Insecure.", "D": "File transfer only." },
        labScenario: "basic-topology"
    },
    {
        id: 606, domain: "automation", domainName: "Automation & Programmability",
        question: `What is the Cisco DNA Center?`,
        options: [{ letter: "A", text: "A firewall" }, { letter: "B", text: "A network controller platform" }, { letter: "C", text: "A routing protocol" }, { letter: "D", text: "A switch" }],
        correct: "B",
        explanation: "DNA Center is Cisco's SDN controller for intent-based networking.",
        optionExplanations: { "A": "Not a firewall.", "B": "Correct! SDN controller.", "C": "Not a protocol.", "D": "Not a switch." },
        labScenario: "basic-topology"
    },
    {
        id: 607, domain: "automation", domainName: "Automation & Programmability",
        question: `What format does Ansible use for playbooks?`,
        options: [{ letter: "A", text: "JSON" }, { letter: "B", text: "XML" }, { letter: "C", text: "YAML" }, { letter: "D", text: "Python" }],
        correct: "C",
        explanation: "Ansible playbooks are written in YAML format.",
        optionExplanations: { "A": "APIs use JSON.", "B": "Legacy format.", "C": "Correct! YAML playbooks.", "D": "Modules in Python." },
        labScenario: "basic-topology"
    },
    {
        id: 608, domain: "automation", domainName: "Automation & Programmability",
        question: `What does REST stand for?`,
        options: [{ letter: "A", text: "Representational State Transfer" }, { letter: "B", text: "Remote Execution State Transfer" }, { letter: "C", text: "Reliable State Transfer" }, { letter: "D", text: "Request State Transfer" }],
        correct: "A",
        explanation: "REST is an architectural style for distributed systems.",
        optionExplanations: { "A": "Correct!", "B": "Incorrect.", "C": "Incorrect.", "D": "Incorrect." },
        labScenario: "basic-topology"
    },
    {
        id: 609, domain: "automation", domainName: "Automation & Programmability",
        question: `Which SDN layer contains switches and routers?`,
        options: [{ letter: "A", text: "Application layer" }, { letter: "B", text: "Control layer" }, { letter: "C", text: "Infrastructure layer" }, { letter: "D", text: "Management layer" }],
        correct: "C",
        explanation: "Infrastructure (data plane) contains physical devices.",
        optionExplanations: { "A": "Business apps.", "B": "SDN controllers.", "C": "Correct! Physical devices.", "D": "Not a standard layer." },
        labScenario: "basic-topology"
    },
    {
        id: 610, domain: "automation", domainName: "Automation & Programmability",
        question: `What HTTP status code means success?`,
        options: [{ letter: "A", text: "200" }, { letter: "B", text: "404" }, { letter: "C", text: "500" }, { letter: "D", text: "301" }],
        correct: "A",
        explanation: "200=OK, 404=Not Found, 500=Server Error, 301=Redirect.",
        optionExplanations: { "A": "Correct! Success.", "B": "Not found.", "C": "Server error.", "D": "Redirect." },
        labScenario: "basic-topology"
    },
    {
        id: 611, domain: "automation", domainName: "Automation & Programmability",
        question: `Which Python library is commonly used for REST APIs?`,
        options: [{ letter: "A", text: "numpy" }, { letter: "B", text: "requests" }, { letter: "C", text: "pandas" }, { letter: "D", text: "flask" }],
        correct: "B",
        explanation: "'requests' library makes HTTP calls in Python.",
        optionExplanations: { "A": "Numeric computing.", "B": "Correct! HTTP library.", "C": "Data analysis.", "D": "Web framework." },
        labScenario: "basic-topology"
    },
    {
        id: 612, domain: "automation", domainName: "Automation & Programmability",
        question: `What is NETCONF transport protocol?`,
        options: [{ letter: "A", text: "HTTP" }, { letter: "B", text: "SSH" }, { letter: "C", text: "Telnet" }, { letter: "D", text: "FTP" }],
        correct: "B",
        explanation: "NETCONF typically uses SSH (port 830) for secure transport.",
        optionExplanations: { "A": "RESTCONF uses HTTP.", "B": "Correct! SSH.", "C": "Insecure.", "D": "File transfer." },
        labScenario: "basic-topology"
    },
    {
        id: 613, domain: "automation", domainName: "Automation & Programmability",
        question: `What does IaC stand for?`,
        options: [{ letter: "A", text: "Internet as Code" }, { letter: "B", text: "Infrastructure as Code" }, { letter: "C", text: "Integration as Code" }, { letter: "D", text: "Interface as Code" }],
        correct: "B",
        explanation: "IaC manages infrastructure using code/configuration files.",
        optionExplanations: { "A": "Incorrect.", "B": "Correct!", "C": "Incorrect.", "D": "Incorrect." },
        labScenario: "basic-topology"
    },
    {
        id: 614, domain: "automation", domainName: "Automation & Programmability",
        question: `Which model does YANG describe?`,
        options: [{ letter: "A", text: "Physical topology" }, { letter: "B", text: "Data models for network configuration" }, { letter: "C", text: "Routing tables" }, { letter: "D", text: "MAC addresses" }],
        correct: "B",
        explanation: "YANG is a data modeling language for NETCONF/RESTCONF.",
        optionExplanations: { "A": "Not topology.", "B": "Correct! Data models.", "C": "Not routing tables.", "D": "Not MACs." },
        labScenario: "basic-topology"
    },
    {
        id: 615, domain: "automation", domainName: "Automation & Programmability",
        question: `What is intent-based networking?`,
        options: [{ letter: "A", text: "Manual CLI configuration" }, { letter: "B", text: "Automated network based on business intent" }, { letter: "C", text: "Static routing" }, { letter: "D", text: "VLAN segmentation" }],
        correct: "B",
        explanation: "IBN translates business intent into network configuration automatically.",
        optionExplanations: { "A": "Traditional method.", "B": "Correct! Automated intent.", "C": "Manual routing.", "D": "Part of config, not IBN." },
        labScenario: "basic-topology"
    },
    {
        id: 616, domain: "automation", domainName: "Automation & Programmability",
        question: `Which API type uses CRUD operations?`,
        options: [{ letter: "A", text: "SOAP" }, { letter: "B", text: "REST" }, { letter: "C", text: "GraphQL" }, { letter: "D", text: "All APIs" }],
        correct: "B",
        explanation: "REST maps to CRUD: Create=POST, Read=GET, Update=PUT, Delete=DELETE.",
        optionExplanations: { "A": "SOAP uses actions.", "B": "Correct! RESTful CRUD.", "C": "Query-based.", "D": "Not all." },
        labScenario: "basic-topology"
    },
    {
        id: 617, domain: "automation", domainName: "Automation & Programmability",
        question: `What is a characteristic of a stateless API?`,
        options: [{ letter: "A", text: "Server remembers session" }, { letter: "B", text: "Each request contains all needed information" }, { letter: "C", text: "Requires cookies" }, { letter: "D", text: "Uses websockets" }],
        correct: "B",
        explanation: "Stateless: each request is independent with all required data.",
        optionExplanations: { "A": "That's stateful.", "B": "Correct! Independent requests.", "C": "Not required.", "D": "Different technology." },
        labScenario: "basic-topology"
    },
    {
        id: 618, domain: "automation", domainName: "Automation & Programmability",
        question: `Which Cisco platform provides API access to network devices?`,
        options: [{ letter: "A", text: "Cisco Webex" }, { letter: "B", text: "Cisco DevNet" }, { letter: "C", text: "Cisco Packet Tracer" }, { letter: "D", text: "Cisco AnyConnect" }],
        correct: "B",
        explanation: "DevNet provides learning resources and sandbox environments for APIs.",
        optionExplanations: { "A": "Collaboration.", "B": "Correct! Developer network.", "C": "Simulation tool.", "D": "VPN client." },
        labScenario: "basic-topology"
    },
    {
        id: 619, domain: "automation", domainName: "Automation & Programmability",
        question: `What encoding does RESTCONF use?`,
        options: [{ letter: "A", text: "Binary" }, { letter: "B", text: "JSON or XML" }, { letter: "C", text: "YAML" }, { letter: "D", text: "Plain text" }],
        correct: "B",
        explanation: "RESTCONF uses JSON or XML encoding over HTTP.",
        optionExplanations: { "A": "Not binary.", "B": "Correct! JSON/XML.", "C": "Ansible uses YAML.", "D": "Not plain text." },
        labScenario: "basic-topology"
    },
    {
        id: 620, domain: "automation", domainName: "Automation & Programmability",
        question: `What is a benefit of network automation?`,
        options: [{ letter: "A", text: "Slower deployments" }, { letter: "B", text: "More human errors" }, { letter: "C", text: "Consistent, repeatable configurations" }, { letter: "D", text: "Higher costs" }],
        correct: "C",
        explanation: "Automation ensures consistency and reduces manual errors.",
        optionExplanations: { "A": "Faster.", "B": "Fewer errors.", "C": "Correct! Consistency.", "D": "Lower costs." },
        labScenario: "basic-topology"
    }
];

if (typeof questionBank !== 'undefined') {
    questionBank.push(...networkFundamentalsQuestions);
    questionBank.push(...automationQuestions);
}
