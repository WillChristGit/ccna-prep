// ============================================
// CCNA Master - IP Connectivity Questions (20)
// User scored 48% - Needs improvement
// ============================================

const ipConnectivityQuestions = [
    {
        id: 301, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `What is the administrative distance of OSPF?`,
        options: [
            { letter: "A", text: "90" }, { letter: "B", text: "110" },
            { letter: "C", text: "120" }, { letter: "D", text: "170" }
        ],
        correct: "B",
        explanation: "OSPF AD is 110. EIGRP internal=90, RIP=120, EIGRP external=170.",
        optionExplanations: { "A": "EIGRP internal is 90.", "B": "Correct! OSPF=110.", "C": "RIP is 120.", "D": "EIGRP external is 170." },
        labScenario: "ospf"
    },
    {
        id: 302, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `Which command shows the routing table?`,
        options: [
            { letter: "A", text: "<code>show ip route</code>" }, { letter: "B", text: "<code>show routes</code>" },
            { letter: "C", text: "<code>show routing table</code>" }, { letter: "D", text: "<code>display ip route</code>" }
        ],
        correct: "A",
        explanation: "'show ip route' displays the IPv4 routing table on Cisco devices.",
        optionExplanations: { "A": "Correct! Standard Cisco command.", "B": "Invalid.", "C": "Invalid.", "D": "Huawei syntax, not Cisco." },
        labScenario: "static-routing"
    },
    {
        id: 303, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `What is a floating static route?`,
        options: [
            { letter: "A", text: "A route that load balances" },
            { letter: "B", text: "A backup route with higher AD" },
            { letter: "C", text: "A route that changes dynamically" },
            { letter: "D", text: "A default route" }
        ],
        correct: "B",
        explanation: "Floating static has higher AD than primary route, activates only when primary fails.",
        optionExplanations: { "A": "Equal-cost routes load balance.", "B": "Correct! Higher AD = backup.", "C": "That's dynamic routing.", "D": "Default route is 0.0.0.0/0." },
        labScenario: "static-routing"
    },
    {
        id: 304, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `Which OSPF packet type establishes neighbor adjacencies?`,
        options: [
            { letter: "A", text: "Hello" }, { letter: "B", text: "DBD" },
            { letter: "C", text: "LSR" }, { letter: "D", text: "LSU" }
        ],
        correct: "A",
        explanation: "Hello packets discover neighbors and maintain adjacencies. Sent to 224.0.0.5.",
        optionExplanations: { "A": "Correct! Hello discovers/maintains neighbors.", "B": "DBD summarizes LSDB.", "C": "LSR requests LSAs.", "D": "LSU contains LSAs." },
        labScenario: "ospf"
    },
    {
        id: 305, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `What is the OSPF default hello interval on broadcast networks?`,
        options: [
            { letter: "A", text: "5 seconds" }, { letter: "B", text: "10 seconds" },
            { letter: "C", text: "30 seconds" }, { letter: "D", text: "40 seconds" }
        ],
        correct: "B",
        explanation: "Broadcast/P2P networks: Hello=10s, Dead=40s. NBMA: Hello=30s, Dead=120s.",
        optionExplanations: { "A": "Incorrect.", "B": "Correct! 10s hello, 40s dead.", "C": "NBMA hello timer.", "D": "Broadcast dead timer." },
        labScenario: "ospf"
    },
    {
        id: 306, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `Which command configures a default static route?`,
        options: [
            { letter: "A", text: "<code>ip route 0.0.0.0 0.0.0.0 10.0.0.1</code>" },
            { letter: "B", text: "<code>ip default-route 10.0.0.1</code>" },
            { letter: "C", text: "<code>ip route default 10.0.0.1</code>" },
            { letter: "D", text: "<code>default-gateway 10.0.0.1</code>" }
        ],
        correct: "A",
        explanation: "Default route matches all traffic: 0.0.0.0/0 (any destination).",
        optionExplanations: { "A": "Correct! 0.0.0.0 0.0.0.0 = default.", "B": "Invalid syntax.", "C": "Invalid syntax.", "D": "Layer 2 switch command." },
        labScenario: "static-routing"
    },
    {
        id: 307, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `What does the 'O' prefix mean in the routing table?`,
        options: [
            { letter: "A", text: "Directly connected" }, { letter: "B", text: "Static route" },
            { letter: "C", text: "OSPF route" }, { letter: "D", text: "EIGRP route" }
        ],
        correct: "C",
        explanation: "O=OSPF, C=Connected, S=Static, D=EIGRP, R=RIP.",
        optionExplanations: { "A": "'C' is connected.", "B": "'S' is static.", "C": "Correct! O=OSPF.", "D": "'D' is EIGRP." },
        labScenario: "ospf"
    },
    {
        id: 308, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `Which router becomes the DR in OSPF?`,
        options: [
            { letter: "A", text: "Highest router ID" }, { letter: "B", text: "Lowest router ID" },
            { letter: "C", text: "First router to boot" }, { letter: "D", text: "Lowest IP address" }
        ],
        correct: "A",
        explanation: "Highest priority wins DR election. If tie, highest router ID wins.",
        optionExplanations: { "A": "Correct! Highest priority, then RID.", "B": "Lowest loses.", "C": "Not a factor after election.", "D": "RID, not lowest IP always." },
        labScenario: "ospf"
    },
    {
        id: 309, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `What multicast address does OSPF use to send to DR/BDR?`,
        options: [
            { letter: "A", text: "224.0.0.5" }, { letter: "B", text: "224.0.0.6" },
            { letter: "C", text: "224.0.0.9" }, { letter: "D", text: "224.0.0.10" }
        ],
        correct: "B",
        explanation: "224.0.0.5=All OSPF routers. 224.0.0.6=DR/BDR only.",
        optionExplanations: { "A": "All OSPF routers address.", "B": "Correct! DR/BDR address.", "C": "RIPv2 address.", "D": "EIGRP address." },
        labScenario: "ospf"
    },
    {
        id: 310, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `Which OSPF area must all other areas connect to?`,
        options: [
            { letter: "A", text: "Area 1" }, { letter: "B", text: "Area 0" },
            { letter: "C", text: "Area 51" }, { letter: "D", text: "Any area" }
        ],
        correct: "B",
        explanation: "Area 0 (backbone) must connect all other areas. Use virtual links if needed.",
        optionExplanations: { "A": "Non-backbone area.", "B": "Correct! Backbone area.", "C": "Non-backbone.", "D": "Must be Area 0." },
        labScenario: "ospf"
    },
    {
        id: 311, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `What command shows OSPF neighbors?`,
        options: [
            { letter: "A", text: "<code>show ip ospf neighbor</code>" },
            { letter: "B", text: "<code>show ospf adjacent</code>" },
            { letter: "C", text: "<code>show neighbors</code>" },
            { letter: "D", text: "<code>show ip neighbor</code>" }
        ],
        correct: "A",
        explanation: "'show ip ospf neighbor' displays neighbor state, RID, and interface.",
        optionExplanations: { "A": "Correct! Shows OSPF neighbors.", "B": "Invalid.", "C": "Invalid.", "D": "Invalid." },
        labScenario: "ospf"
    },
    {
        id: 312, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `What is the OSPF metric based on?`,
        options: [
            { letter: "A", text: "Hop count" }, { letter: "B", text: "Bandwidth (cost)" },
            { letter: "C", text: "Delay" }, { letter: "D", text: "Load" }
        ],
        correct: "B",
        explanation: "OSPF cost = Reference BW / Interface BW. Default reference is 100 Mbps.",
        optionExplanations: { "A": "RIP uses hop count.", "B": "Correct! Cost based on bandwidth.", "C": "EIGRP uses delay.", "D": "EIGRP considers load." },
        labScenario: "ospf"
    },
    {
        id: 313, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `Which routing protocol is classless?`,
        options: [
            { letter: "A", text: "RIPv1" }, { letter: "B", text: "RIPv2" },
            { letter: "C", text: "IGRP" }, { letter: "D", text: "All of the above" }
        ],
        correct: "B",
        explanation: "RIPv2, OSPF, EIGRP are classless (include subnet mask). RIPv1, IGRP are classful.",
        optionExplanations: { "A": "RIPv1 is classful.", "B": "Correct! RIPv2 sends masks.", "C": "IGRP is classful/obsolete.", "D": "Only RIPv2." },
        labScenario: "static-routing"
    },
    {
        id: 314, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `What does an ABR do in OSPF?`,
        options: [
            { letter: "A", text: "Connects to external AS" },
            { letter: "B", text: "Connects multiple OSPF areas" },
            { letter: "C", text: "Generates all LSAs" },
            { letter: "D", text: "Acts as root bridge" }
        ],
        correct: "B",
        explanation: "ABR (Area Border Router) connects two or more OSPF areas including Area 0.",
        optionExplanations: { "A": "ASBR connects external AS.", "B": "Correct! ABR between areas.", "C": "LSAs generated by many routers.", "D": "STP term, not OSPF." },
        labScenario: "ospf"
    },
    {
        id: 315, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `Which command sets OSPF router ID?`,
        options: [
            { letter: "A", text: "<code>router-id 1.1.1.1</code>" },
            { letter: "B", text: "<code>ospf router-id 1.1.1.1</code>" },
            { letter: "C", text: "<code>ip ospf router-id 1.1.1.1</code>" },
            { letter: "D", text: "<code>set router-id 1.1.1.1</code>" }
        ],
        correct: "A",
        explanation: "Under 'router ospf' config mode, use 'router-id' command.",
        optionExplanations: { "A": "Correct! In OSPF config mode.", "B": "Invalid syntax.", "C": "Interface command, not global.", "D": "Invalid." },
        labScenario: "ospf"
    },
    {
        id: 316, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `What is the default OSPF priority?`,
        options: [
            { letter: "A", text: "0" }, { letter: "B", text: "1" },
            { letter: "C", text: "100" }, { letter: "D", text: "255" }
        ],
        correct: "B",
        explanation: "Default priority is 1. Set to 0 to prevent becoming DR/BDR.",
        optionExplanations: { "A": "0 prevents DR election.", "B": "Correct! Default=1.", "C": "Not default.", "D": "Maximum value." },
        labScenario: "ospf"
    },
    {
        id: 317, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `What is the subnet mask for a /27?`,
        options: [
            { letter: "A", text: "255.255.255.192" }, { letter: "B", text: "255.255.255.224" },
            { letter: "C", text: "255.255.255.240" }, { letter: "D", text: "255.255.255.248" }
        ],
        correct: "B",
        explanation: "/27 = 27 network bits = 255.255.255.224 (32-27=5 host bits, 2^5-2=30 hosts).",
        optionExplanations: { "A": "/26.", "B": "Correct! /27=224.", "C": "/28.", "D": "/29." },
        labScenario: "static-routing"
    },
    {
        id: 318, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `How many usable hosts in a /30 network?`,
        options: [
            { letter: "A", text: "1" }, { letter: "B", text: "2" },
            { letter: "C", text: "4" }, { letter: "D", text: "6" }
        ],
        correct: "B",
        explanation: "/30 = 2 host bits = 4 addresses. Minus network and broadcast = 2 usable.",
        optionExplanations: { "A": "Too few.", "B": "Correct! Ideal for P2P links.", "C": "4 total, 2 usable.", "D": "Too many." },
        labScenario: "static-routing"
    },
    {
        id: 319, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `Which protocol provides gateway redundancy with active/standby routers?`,
        options: [
            { letter: "A", text: "OSPF" }, { letter: "B", text: "HSRP" },
            { letter: "C", text: "STP" }, { letter: "D", text: "BGP" }
        ],
        correct: "B",
        explanation: "HSRP (Hot Standby Router Protocol) provides first-hop redundancy with virtual IP.",
        optionExplanations: { "A": "OSPF is routing protocol.", "B": "Correct! HSRP=gateway redundancy.", "C": "STP prevents loops.", "D": "BGP is external routing." },
        labScenario: "static-routing"
    },
    {
        id: 320, domain: "ip-connectivity", domainName: "IP Connectivity",
        question: `What does the wildcard mask 0.0.0.255 match?`,
        options: [
            { letter: "A", text: "Only first octet" }, { letter: "B", text: "Last octet varies (any)" },
            { letter: "C", text: "Exact IP match" }, { letter: "D", text: "All IPs" }
        ],
        correct: "B",
        explanation: "0=match, 255=ignore. 0.0.0.255 matches first 3 octets, last can be any value.",
        optionExplanations: { "A": "Would be 0.255.255.255.", "B": "Correct! /24 equivalent.", "C": "Would be 0.0.0.0.", "D": "Would be 255.255.255.255." },
        labScenario: "acl"
    }
];

if (typeof questionBank !== 'undefined') {
    questionBank.push(...ipConnectivityQuestions);
}
