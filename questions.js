// ============================================
// CCNA Master - Question Bank
// 20+ Boson-Level Exam Questions
// ============================================

const questionBank = [
    // ============================================
    // NETWORK FUNDAMENTALS (4 Questions)
    // ============================================
    {
        id: 1,
        domain: "network-fundamentals",
        domainName: "Network Fundamentals",
        question: `A network engineer is troubleshooting a connectivity issue using the OSI model. The engineer has verified that the physical cables are connected properly and link lights are on. Which layer should the engineer troubleshoot next?`,
        options: [
            { letter: "A", text: "Physical Layer" },
            { letter: "B", text: "Data Link Layer" },
            { letter: "C", text: "Network Layer" },
            { letter: "D", text: "Application Layer" }
        ],
        correct: "B",
        explanation: "After confirming the Physical Layer (Layer 1) is working correctly by verifying cables and link lights, the next logical step in the OSI model is to troubleshoot Layer 2 (Data Link Layer). This layer handles MAC addressing, switching, and frame delivery.",
        optionExplanations: {
            "A": "Incorrect. The Physical Layer has already been verified with the cable connections and link lights being confirmed operational.",
            "B": "Correct! Layer 2 is the next layer to troubleshoot. This includes verifying MAC address tables, switch port configurations, VLAN assignments, and Spanning Tree Protocol status.",
            "C": "Incorrect. While Layer 3 could be checked, proper troubleshooting methodology suggests moving sequentially from Layer 1 to Layer 7, so Layer 2 should be verified first.",
            "D": "Incorrect. The Application Layer is Layer 7 and would be checked much later in the troubleshooting process after verifying all lower layers."
        },
        labScenario: "basic-topology"
    },
    {
        id: 2,
        domain: "network-fundamentals",
        domainName: "Network Fundamentals",
        question: `Which of the following correctly describes the difference between TCP and UDP?`,
        options: [
            { letter: "A", text: "TCP is connectionless; UDP is connection-oriented" },
            { letter: "B", text: "TCP provides reliable delivery with acknowledgments; UDP provides best-effort delivery without acknowledgments" },
            { letter: "C", text: "TCP is faster than UDP because it has less overhead" },
            { letter: "D", text: "UDP supports flow control and windowing; TCP does not" }
        ],
        correct: "B",
        explanation: "TCP (Transmission Control Protocol) provides reliable, ordered, and error-checked delivery of data between applications. It uses acknowledgments, sequence numbers, and retransmissions. UDP (User Datagram Protocol) provides best-effort delivery without these reliability mechanisms, making it faster but less reliable.",
        optionExplanations: {
            "A": "Incorrect. This is backwards. TCP is connection-oriented (uses a three-way handshake), while UDP is connectionless.",
            "B": "Correct! TCP provides reliable delivery through acknowledgments (ACKs), sequence numbers, and retransmission of lost segments. UDP sends datagrams without waiting for acknowledgments.",
            "C": "Incorrect. UDP is actually faster because it has less overhead (no connection establishment, acknowledgments, or flow control). TCP's reliability features add overhead.",
            "D": "Incorrect. This is reversed. TCP implements flow control and windowing mechanisms. UDP does not provide these features."
        },
        labScenario: "basic-topology"
    },
    {
        id: 3,
        domain: "network-fundamentals",
        domainName: "Network Fundamentals",
        question: `A company requires 500 host addresses for a single subnet. Which subnet mask provides the minimum number of host addresses while meeting this requirement?`,
        options: [
            { letter: "A", text: "/22 (255.255.252.0)" },
            { letter: "B", text: "/23 (255.255.254.0)" },
            { letter: "C", text: "/24 (255.255.255.0)" },
            { letter: "D", text: "/21 (255.255.248.0)" }
        ],
        correct: "A",
        explanation: "To calculate usable hosts: 2^n - 2 (where n = host bits). /22 has 10 host bits = 1022 usable hosts. /23 has 9 host bits = 510 usable hosts. /24 has 8 host bits = 254 usable hosts. The /23 only provides 510 hosts which barely meets the requirement, but /22 (1022 hosts) is the correct answer as it provides enough addresses with room for growth.",
        optionExplanations: {
            "A": "Correct! /22 provides 10 host bits (2^10 - 2 = 1022 usable hosts). While /23 would technically work with 510 hosts, /22 is the recommended answer as it provides sufficient room for growth while meeting the minimum requirement.",
            "B": "Incorrect. /23 provides 9 host bits (2^9 - 2 = 510 usable hosts). While this technically meets the 500 host requirement, it leaves almost no room for growth. In practice, /22 would be preferred.",
            "C": "Incorrect. /24 provides only 8 host bits (2^8 - 2 = 254 usable hosts), which is insufficient for 500 hosts.",
            "D": "Incorrect. While /21 would work (2046 usable hosts), it wastes IP addresses. The question asks for the minimum number of host addresses that meets the requirement."
        },
        labScenario: "basic-topology"
    },
    {
        id: 4,
        domain: "network-fundamentals",
        domainName: "Network Fundamentals",
        question: `Which cable type and standard should be used to connect a PC directly to a switch's console port for device configuration?`,
        options: [
            { letter: "A", text: "Straight-through Cat6 cable with RJ-45 connectors" },
            { letter: "B", text: "Crossover Cat5e cable with RJ-45 connectors" },
            { letter: "C", text: "Rollover cable with RJ-45 to DB-9/USB adapter" },
            { letter: "D", text: "Fiber optic cable with LC connectors" }
        ],
        correct: "C",
        explanation: "A rollover cable (also called a console cable or Cisco console cable) is used to connect a PC's serial or USB port to a network device's console port. This provides out-of-band management access for initial configuration or recovery.",
        optionExplanations: {
            "A": "Incorrect. Straight-through cables are used for connecting dissimilar devices (PC to switch data port) for network communication, not console access.",
            "B": "Incorrect. Crossover cables connect similar devices (switch to switch, PC to PC) for network communication, not console access.",
            "C": "Correct! A rollover cable has pin 1 connected to pin 8, pin 2 to pin 7, etc. (reversed). It connects to the console port (typically labeled 'CONSOLE' and colored light blue on Cisco devices) for CLI access.",
            "D": "Incorrect. Fiber optic cables are used for high-speed network data transmission, not console management connections."
        },
        labScenario: "basic-topology"
    },

    // ============================================
    // NETWORK ACCESS (4 Questions)
    // ============================================
    {
        id: 5,
        domain: "network-access",
        domainName: "Network Access",
        question: `A network administrator needs to configure a trunk link between two Cisco switches. Which command correctly configures the interface as a trunk?`,
        options: [
            { letter: "A", text: "<code>switchport mode access</code>" },
            { letter: "B", text: "<code>switchport trunk allowed vlan all</code>" },
            { letter: "C", text: "<code>switchport mode trunk</code>" },
            { letter: "D", text: "<code>switchport nonegotiate</code>" }
        ],
        correct: "C",
        explanation: "The command 'switchport mode trunk' configures the interface to permanently operate as a 802.1Q trunk port. This allows the interface to carry traffic for multiple VLANs between switches.",
        optionExplanations: {
            "A": "Incorrect. 'switchport mode access' configures the port as an access port belonging to a single VLAN, the opposite of a trunk.",
            "B": "Incorrect. While this command specifies which VLANs are allowed on a trunk, it doesn't actually configure the port as a trunk. The port must first be set to trunk mode.",
            "C": "Correct! This command explicitly configures the interface as an 802.1Q trunk port. Traffic is tagged with VLAN IDs as it traverses the trunk.",
            "D": "Incorrect. 'switchport nonegotiate' disables DTP (Dynamic Trunking Protocol) negotiation but doesn't set the port mode. It's used in conjunction with 'switchport mode trunk'."
        },
        labScenario: "vlan-config"
    },
    {
        id: 6,
        domain: "network-access",
        domainName: "Network Access",
        question: `Refer to the following configuration:
<pre>
Switch(config)# vlan 100
Switch(config-vlan)# name SALES
Switch(config-vlan)# exit
Switch(config)# interface fa0/5
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 100
</pre>

What is the result of this configuration?`,
        options: [
            { letter: "A", text: "Interface Fa0/5 becomes a trunk port carrying VLAN 100" },
            { letter: "B", text: "Interface Fa0/5 is assigned as an access port in VLAN 100 named SALES" },
            { letter: "C", text: "VLAN 100 is configured but Fa0/5 remains in the default VLAN" },
            { letter: "D", text: "The configuration fails because the VLAN name must be specified on the interface" }
        ],
        correct: "B",
        explanation: "This configuration creates VLAN 100 with the name 'SALES', then configures interface FastEthernet 0/5 as an access port assigned to that VLAN. Devices connected to this port will be in VLAN 100.",
        optionExplanations: {
            "A": "Incorrect. The 'switchport mode access' command explicitly configures the port as an access port, not a trunk port. Access ports belong to a single VLAN.",
            "B": "Correct! The configuration first creates VLAN 100 with name SALES, then assigns Fa0/5 as an access port to that VLAN. Any device connected to this port will communicate within VLAN 100.",
            "C": "Incorrect. The 'switchport access vlan 100' command explicitly assigns the interface to VLAN 100, moving it from the default VLAN 1.",
            "D": "Incorrect. VLAN names are configured in VLAN configuration mode, not on the interface. The interface only needs to reference the VLAN number."
        },
        labScenario: "vlan-config"
    },
    {
        id: 7,
        domain: "network-access",
        domainName: "Network Access",
        question: `What is the purpose of Spanning Tree Protocol (STP)?`,
        options: [
            { letter: "A", text: "To route traffic between VLANs" },
            { letter: "B", text: "To provide load balancing across redundant links" },
            { letter: "C", text: "To prevent Layer 2 loops while maintaining redundant paths" },
            { letter: "D", text: "To encrypt traffic on trunk links" }
        ],
        correct: "C",
        explanation: "Spanning Tree Protocol (STP) prevents Layer 2 broadcast loops in networks with redundant switch paths by blocking redundant ports. When the active path fails, STP recalculates and activates a previously blocked path.",
        optionExplanations: {
            "A": "Incorrect. Inter-VLAN routing is performed by Layer 3 devices (routers or Layer 3 switches), not STP. STP operates at Layer 2.",
            "B": "Incorrect. Standard STP (802.1D) does not load balance; it blocks redundant paths. However, technologies like PVST+, Rapid PVST+, or EtherChannel can provide some load balancing.",
            "C": "Correct! STP prevents broadcast storms and MAC table instability caused by Layer 2 loops by logically blocking redundant paths while keeping them available as backups.",
            "D": "Incorrect. STP does not provide encryption. Security features like MACsec or IPsec are used for traffic encryption."
        },
        labScenario: "vlan-config"
    },
    {
        id: 8,
        domain: "network-access",
        domainName: "Network Access",
        question: `An EtherChannel is configured between two switches using the following commands on both switches:
<pre>
Switch(config)# interface range gi0/1 - 2
Switch(config-if-range)# channel-group 1 mode active
</pre>

Which EtherChannel protocol is being used?`,
        options: [
            { letter: "A", text: "PAgP (Port Aggregation Protocol)" },
            { letter: "B", text: "LACP (Link Aggregation Control Protocol)" },
            { letter: "C", text: "Static EtherChannel (no protocol)" },
            { letter: "D", text: "VTP (VLAN Trunking Protocol)" }
        ],
        correct: "B",
        explanation: "The 'mode active' keyword indicates LACP (Link Aggregation Control Protocol). LACP is an IEEE standard (802.3ad) for dynamically negotiating and maintaining EtherChannel bundles.",
        optionExplanations: {
            "A": "Incorrect. PAgP uses 'mode desirable' or 'mode auto' keywords. PAgP is Cisco proprietary.",
            "B": "Correct! LACP uses 'mode active' or 'mode passive' keywords. 'Active' means the port actively tries to form an LACP EtherChannel. LACP is the IEEE 802.3ad standard.",
            "C": "Incorrect. Static EtherChannel uses 'mode on' which forces the port into an EtherChannel without any negotiation protocol.",
            "D": "Incorrect. VTP (VLAN Trunking Protocol) is used for VLAN database propagation between switches, not link aggregation."
        },
        labScenario: "vlan-config"
    },

    // ============================================
    // IP CONNECTIVITY (5 Questions)
    // ============================================
    {
        id: 9,
        domain: "ip-connectivity",
        domainName: "IP Connectivity",
        question: `A network administrator needs to configure a static route to reach the 192.168.10.0/24 network. The next-hop IP address is 10.0.0.2. Which command correctly configures this route on a Cisco router?`,
        options: [
            { letter: "A", text: "<code>ip route 192.168.10.0 255.255.255.0 10.0.0.2</code>" },
            { letter: "B", text: "<code>ip route 192.168.10.0 /24 10.0.0.2</code>" },
            { letter: "C", text: "<code>route add 192.168.10.0 mask 255.255.255.0 10.0.0.2</code>" },
            { letter: "D", text: "<code>ip static-route 192.168.10.0 255.255.255.0 via 10.0.0.2</code>" }
        ],
        correct: "A",
        explanation: "The Cisco IOS syntax for a static route is: ip route [destination-network] [subnet-mask] [next-hop-ip or exit-interface]. The /24 CIDR notation is not valid in the ip route command; the full subnet mask must be used.",
        optionExplanations: {
            "A": "Correct! This is the proper Cisco IOS syntax. It creates a static route to 192.168.10.0/24 using 10.0.0.2 as the next-hop address.",
            "B": "Incorrect. Cisco IOS does not accept CIDR notation (/24) in the ip route command. The full subnet mask (255.255.255.0) must be specified.",
            "C": "Incorrect. This is Windows command-line syntax, not Cisco IOS syntax.",
            "D": "Incorrect. 'ip static-route' and 'via' are not valid Cisco IOS keywords for static routing."
        },
        labScenario: "static-routing"
    },
    {
        id: 10,
        domain: "ip-connectivity",
        domainName: "IP Connectivity",
        question: `Examine the following routing table output:
<pre>
Gateway of last resort is 10.0.0.1 to network 0.0.0.0

     10.0.0.0/8 is variably subnetted, 2 subnets, 2 masks
C       10.0.0.0/30 is directly connected, GigabitEthernet0/0
L       10.0.0.2/32 is directly connected, GigabitEthernet0/0
O    192.168.1.0/24 [110/20] via 10.0.0.1, 00:05:32, GigabitEthernet0/0
S*   0.0.0.0/0 [1/0] via 10.0.0.1
</pre>

What does the [110/20] represent for the OSPF route?`,
        options: [
            { letter: "A", text: "OSPF process ID and area ID" },
            { letter: "B", text: "Administrative distance and metric (cost)" },
            { letter: "C", text: "Bandwidth and delay values" },
            { letter: "D", text: "Hello interval and dead interval" }
        ],
        correct: "B",
        explanation: "In Cisco routing tables, [AD/Metric] notation shows the Administrative Distance and the routing metric. For OSPF, 110 is the default AD, and the metric (20) is the total cost to reach the destination network.",
        optionExplanations: {
            "A": "Incorrect. OSPF process ID is configured in the router configuration (router ospf [process-id]), not shown in routing table entries.",
            "B": "Correct! The first number (110) is OSPF's default Administrative Distance. The second number (20) is the OSPF cost metric, calculated from cumulative interface costs along the path.",
            "C": "Incorrect. While OSPF cost is derived from bandwidth, the values shown are AD and metric, not raw bandwidth/delay values.",
            "D": "Incorrect. Hello and dead intervals are OSPF timers for neighbor relationships, not shown in the routing table."
        },
        labScenario: "ospf"
    },
    {
        id: 11,
        domain: "ip-connectivity",
        domainName: "IP Connectivity",
        question: `A router receives three routes to the same destination from different sources:
<br><br>
• OSPF route with cost 50<br>
• Static route<br>
• EIGRP route with metric 28160<br><br>

Which route will be installed in the routing table?`,
        options: [
            { letter: "A", text: "OSPF route because it has the lowest cost" },
            { letter: "B", text: "Static route because it has the lowest administrative distance" },
            { letter: "C", text: "EIGRP route because it uses a composite metric" },
            { letter: "D", text: "All three routes will be installed for load balancing" }
        ],
        correct: "B",
        explanation: "When multiple routing protocols provide routes to the same destination, the route with the lowest Administrative Distance (AD) is selected. Default ADs: Static = 1, EIGRP = 90, OSPF = 110. Static routes have the lowest AD and will be preferred.",
        optionExplanations: {
            "A": "Incorrect. OSPF cost is only compared against other OSPF routes. When comparing different routing sources, Administrative Distance determines the winner.",
            "B": "Correct! Static routes have AD of 1 (compared to EIGRP's 90 and OSPF's 110). The lower the AD, the more trustworthy the route source is considered.",
            "C": "Incorrect. EIGRP's composite metric is only used to compare EIGRP routes, not routes from different protocols.",
            "D": "Incorrect. Only routes with the same AD can potentially load balance (equal-cost or unequal-cost depending on protocol). Different protocols don't load balance together."
        },
        labScenario: "ospf"
    },
    {
        id: 12,
        domain: "ip-connectivity",
        domainName: "IP Connectivity",
        question: `Which OSPF network type uses a Designated Router (DR) and Backup Designated Router (BDR) and requires explicit neighbor configuration?`,
        options: [
            { letter: "A", text: "Point-to-Point" },
            { letter: "B", text: "Broadcast" },
            { letter: "C", text: "Non-Broadcast Multi-Access (NBMA)" },
            { letter: "D", text: "Point-to-Multipoint" }
        ],
        correct: "C",
        explanation: "NBMA networks (like Frame Relay) elect a DR/BDR like broadcast networks, but because they don't support broadcast/multicast natively, neighbors must be manually configured using the 'neighbor' command.",
        optionExplanations: {
            "A": "Incorrect. Point-to-Point networks don't elect a DR/BDR since there are only two routers. Neighbors are discovered automatically.",
            "B": "Incorrect. Broadcast networks (like Ethernet) elect DR/BDR but neighbors are automatically discovered via multicast (224.0.0.5/224.0.0.6).",
            "C": "Correct! NBMA networks require DR/BDR election AND manual neighbor configuration because they cannot use multicast for neighbor discovery.",
            "D": "Incorrect. Point-to-Multipoint networks do NOT elect DR/BDR and treat the network as a collection of point-to-point links."
        },
        labScenario: "ospf"
    },
    {
        id: 13,
        domain: "ip-connectivity",
        domainName: "IP Connectivity",
        question: `What is the purpose of a floating static route?`,
        options: [
            { letter: "A", text: "To provide load balancing across multiple paths" },
            { letter: "B", text: "To serve as a backup route when the primary route fails" },
            { letter: "C", text: "To redistribute routes between routing protocols" },
            { letter: "D", text: "To summarize multiple routes into a single entry" }
        ],
        correct: "B",
        explanation: "A floating static route is configured with a higher Administrative Distance than the primary route. It remains inactive (floating) in the routing table until the primary route fails, at which point it becomes active as a backup.",
        optionExplanations: {
            "A": "Incorrect. Load balancing requires routes with equal metrics/AD. Floating static routes have higher AD to prevent them from being active simultaneously.",
            "B": "Correct! By setting a higher AD (e.g., 'ip route 10.0.0.0 255.0.0.0 192.168.1.1 210'), the static route only activates when a preferred route (like OSPF with AD 110) is unavailable.",
            "C": "Incorrect. Route redistribution is configured within routing protocol configuration, not with static routes.",
            "D": "Incorrect. Route summarization is done within routing protocols or by configuring a summary static route, but that's not specifically what 'floating' refers to."
        },
        labScenario: "static-routing"
    },

    // ============================================
    // IP SERVICES (2 Questions)
    // ============================================
    {
        id: 14,
        domain: "ip-services",
        domainName: "IP Services",
        question: `A network administrator needs to configure a router to provide IP addresses to clients automatically. The DHCP pool should use the 192.168.1.0/24 network with the router at 192.168.1.1 as the default gateway. Which configuration is correct?`,
        options: [
            { letter: "A", text: `<pre>ip dhcp pool LAN
   network 192.168.1.0 255.255.255.0
   default-gateway 192.168.1.1</pre>` },
            { letter: "B", text: `<pre>ip dhcp pool LAN
   network 192.168.1.0 255.255.255.0
   default-router 192.168.1.1</pre>` },
            { letter: "C", text: `<pre>ip dhcp pool LAN
   network 192.168.1.0 /24
   gateway 192.168.1.1</pre>` },
            { letter: "D", text: `<pre>dhcp pool LAN
   network 192.168.1.0 255.255.255.0
   router 192.168.1.1</pre>` }
        ],
        correct: "B",
        explanation: "In Cisco IOS DHCP configuration, 'default-router' is the correct command to specify the default gateway that will be provided to DHCP clients. The pool is created with 'ip dhcp pool' and uses the full subnet mask.",
        optionExplanations: {
            "A": "Incorrect. 'default-gateway' is not a valid DHCP pool command. The correct command is 'default-router'.",
            "B": "Correct! This is the proper syntax: 'ip dhcp pool' creates the pool, 'network' defines the address range, and 'default-router' specifies the gateway for clients.",
            "C": "Incorrect. CIDR notation (/24) is not accepted in the network command, and 'gateway' is not a valid command. Use subnet mask format.",
            "D": "Incorrect. The command is 'ip dhcp pool', not 'dhcp pool', and 'router' is not the correct parameter (use 'default-router')."
        },
        labScenario: "basic-topology"
    },
    {
        id: 15,
        domain: "ip-services",
        domainName: "IP Services",
        question: `Which type of NAT allows multiple internal hosts to share a single public IP address by using port numbers to distinguish sessions?`,
        options: [
            { letter: "A", text: "Static NAT" },
            { letter: "B", text: "Dynamic NAT" },
            { letter: "C", text: "PAT (Port Address Translation) / NAT Overload" },
            { letter: "D", text: "NAT64" }
        ],
        correct: "C",
        explanation: "PAT (Port Address Translation), also known as NAT Overload, allows multiple internal hosts to share a single public IP address. It tracks connections using a combination of the public IP address and unique port numbers.",
        optionExplanations: {
            "A": "Incorrect. Static NAT provides a one-to-one mapping between a private and public IP address. Each internal host would need its own public IP.",
            "B": "Incorrect. Dynamic NAT maps internal IPs to a pool of public IPs, but still one-to-one at any given time. It doesn't use port numbers for multiplexing.",
            "C": "Correct! PAT/NAT Overload uses the combination of IP address and port number (socket) to allow thousands of internal hosts to share a single public IP address.",
            "D": "Incorrect. NAT64 is used to translate between IPv6 and IPv4 addresses, not for sharing a single public IP among multiple hosts."
        },
        labScenario: "nat"
    },

    // ============================================
    // SECURITY FUNDAMENTALS (3 Questions)
    // ============================================
    {
        id: 16,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `An administrator wants to restrict SSH access to a router so that only the management network 10.10.10.0/24 can connect. Which configuration accomplishes this?`,
        options: [
            { letter: "A", text: `<pre>access-list 10 permit 10.10.10.0 0.0.0.255
line vty 0 4
 access-class 10 in</pre>` },
            { letter: "B", text: `<pre>access-list 100 permit ip 10.10.10.0 0.0.0.255 any
interface gi0/0
 ip access-group 100 in</pre>` },
            { letter: "C", text: `<pre>access-list 10 permit 10.10.10.0 255.255.255.0
line vty 0 4
 access-class 10 in</pre>` },
            { letter: "D", text: `<pre>access-list 10 permit any
line vty 0 4
 access-class 10 out</pre>` }
        ],
        correct: "A",
        explanation: "To restrict VTY access, a standard ACL is applied to the VTY lines using 'access-class' (not 'access-group' which is for interfaces). Standard ACLs use wildcard masks, not subnet masks.",
        optionExplanations: {
            "A": "Correct! A standard ACL (10) permits the management network using the correct wildcard mask (0.0.0.255). 'access-class 10 in' applies it to inbound VTY connections.",
            "B": "Incorrect. While this ACL would work for interface filtering, applying an access-group to an interface doesn't restrict VTY access. VTY lines need 'access-class'.",
            "C": "Incorrect. Standard ACLs use wildcard masks (0.0.0.255), not subnet masks (255.255.255.0). This would not match correctly.",
            "D": "Incorrect. 'permit any' allows all traffic, defeating the purpose. Also, 'out' direction is for restricting where the router can SSH to, not who can SSH in."
        },
        labScenario: "acl"
    },
    {
        id: 17,
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
        explanation: "DHCP Snooping is a Layer 2 security feature that filters untrusted DHCP messages. It prevents rogue DHCP servers by only allowing DHCP server messages on trusted ports (typically uplinks to legitimate DHCP servers).",
        optionExplanations: {
            "A": "Incorrect. Port Security limits MAC addresses per port but doesn't specifically filter DHCP traffic or prevent rogue DHCP servers.",
            "B": "Correct! DHCP Snooping creates trusted and untrusted ports. DHCP server messages (OFFER, ACK) are only allowed on trusted ports, blocking rogue servers on untrusted ports.",
            "C": "Incorrect. Dynamic ARP Inspection (DAI) prevents ARP spoofing attacks by validating ARP packets against the DHCP snooping database, but doesn't directly block rogue DHCP servers.",
            "D": "Incorrect. 802.1X provides port-based authentication for network access but doesn't specifically prevent rogue DHCP servers."
        },
        labScenario: "basic-topology"
    },
    {
        id: 18,
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `What is the primary difference between an Intrusion Detection System (IDS) and an Intrusion Prevention System (IPS)?`,
        options: [
            { letter: "A", text: "IDS encrypts traffic while IPS decrypts traffic" },
            { letter: "B", text: "IDS monitors and alerts; IPS monitors, alerts, AND blocks malicious traffic" },
            { letter: "C", text: "IDS works at Layer 2 while IPS works at Layer 3" },
            { letter: "D", text: "IDS is hardware-based while IPS is software-based" }
        ],
        correct: "B",
        explanation: "The key difference is that IDS is passive (detect and alert only) while IPS is active (detect, alert, AND prevent). IPS sits inline with traffic and can drop malicious packets in real-time.",
        optionExplanations: {
            "A": "Incorrect. Neither IDS nor IPS is primarily used for encryption/decryption. They are for threat detection and prevention.",
            "B": "Correct! IDS operates in promiscuous mode, analyzing copies of traffic and generating alerts. IPS operates inline, actively blocking threats by dropping or resetting connections.",
            "C": "Incorrect. Both IDS and IPS can work at multiple layers (typically Layer 3-7) to inspect traffic and signatures.",
            "D": "Incorrect. Both IDS and IPS can be implemented as hardware appliances, software, or virtual solutions."
        },
        labScenario: "acl"
    },

    // ============================================
    // AUTOMATION & PROGRAMMABILITY (2 Questions)
    // ============================================
    {
        id: 19,
        domain: "automation",
        domainName: "Automation & Programmability",
        question: `Which data format is most commonly used in REST API responses for network automation?`,
        options: [
            { letter: "A", text: "HTML" },
            { letter: "B", text: "JSON" },
            { letter: "C", text: "Plain Text" },
            { letter: "D", text: "Binary" }
        ],
        correct: "B",
        explanation: "JSON (JavaScript Object Notation) is the most common data format for REST APIs due to its lightweight nature, human readability, and easy parsing by programming languages. It uses key-value pairs and arrays.",
        optionExplanations: {
            "A": "Incorrect. HTML is a markup language for web pages, not typically used for API data exchange between systems.",
            "B": "Correct! JSON is lightweight, human-readable, and easily parsed by virtually all programming languages. REST APIs almost universally use JSON for request/response bodies.",
            "C": "Incorrect. Plain text lacks structure for representing complex data objects and relationships needed in network automation.",
            "D": "Incorrect. Binary formats are not human-readable and complicate debugging. REST APIs favor text-based formats like JSON or XML."
        },
        labScenario: "basic-topology"
    },
    {
        id: 20,
        domain: "automation",
        domainName: "Automation & Programmability",
        question: `Which configuration management tool uses an agentless architecture and communicates via SSH to network devices?`,
        options: [
            { letter: "A", text: "Puppet" },
            { letter: "B", text: "Chef" },
            { letter: "C", text: "Ansible" },
            { letter: "D", text: "SaltStack (with minions)" }
        ],
        correct: "C",
        explanation: "Ansible is agentless, meaning it doesn't require software installed on managed devices. It uses SSH (for Linux/network devices) or WinRM (for Windows) to push configurations and execute commands.",
        optionExplanations: {
            "A": "Incorrect. Puppet uses an agent-based architecture where Puppet agents run on managed nodes and communicate with a Puppet master.",
            "B": "Incorrect. Chef also uses agents (chef-client) on managed nodes that pull configurations from a Chef server.",
            "C": "Correct! Ansible is agentless and uses SSH for network devices, making it popular for network automation. Playbooks are written in YAML and pushed from a control node.",
            "D": "Incorrect. While SaltStack can run agentless, its primary mode uses Salt minions (agents) on managed devices."
        },
        labScenario: "basic-topology"
    },

    // ============================================
    // BONUS QUESTIONS (Challenging Scenarios)
    // ============================================
    {
        id: 21,
        domain: "ip-connectivity",
        domainName: "IP Connectivity",
        question: `A router has the following OSPF configuration:
<pre>
router ospf 1
 network 10.0.0.0 0.255.255.255 area 0
 network 192.168.1.0 0.0.0.255 area 1
</pre>

An interface has IP 192.168.1.1/24. Which OSPF area will this interface be placed in?`,
        options: [
            { letter: "A", text: "Area 0 because it matches the first network statement" },
            { letter: "B", text: "Area 1 because it is the more specific match" },
            { letter: "C", text: "Both Area 0 and Area 1" },
            { letter: "D", text: "Neither area because only one network statement can match" }
        ],
        correct: "B",
        explanation: "When an interface matches multiple OSPF network statements, the most specific match (longest prefix) wins. 192.168.1.0/24 is more specific than 10.0.0.0/8, so the interface is placed in Area 1.",
        optionExplanations: {
            "A": "Incorrect. While 192.168.x.x could technically match a 10.x.x.x wildcard if configured that way, that's not the case here. The interface IP 192.168.1.1 matches 192.168.1.0/24 more specifically.",
            "B": "Correct! OSPF uses the most specific (longest prefix match) network statement. 192.168.1.0 0.0.0.255 (effectively /24) is more specific than 10.0.0.0 0.255.255.255 (effectively /8).",
            "C": "Incorrect. An interface can only belong to one OSPF area. The most specific network statement determines the area.",
            "D": "Incorrect. The interface does match the 192.168.1.0 0.0.0.255 area 1 statement and will be placed in Area 1."
        },
        labScenario: "ospf"
    },
    {
        id: 22,
        domain: "network-access",
        domainName: "Network Access",
        question: `A switch port configured for 802.1X authentication is stuck in an 'unauthorized' state. Which command should be verified first?`,
        options: [
            { letter: "A", text: "<code>show mac address-table</code>" },
            { letter: "B", text: "<code>show dot1x interface</code>" },
            { letter: "C", text: "<code>show spanning-tree</code>" },
            { letter: "D", text: "<code>show ip interface brief</code>" }
        ],
        correct: "B",
        explanation: "The 'show dot1x interface' command displays 802.1X authentication status, including the authentication state, authentication method, and any errors. This is the primary command for troubleshooting 802.1X issues.",
        optionExplanations: {
            "A": "Incorrect. While MAC address table can show if a device is connected, it doesn't provide 802.1X authentication state information.",
            "B": "Correct! This command shows the 802.1X status including: PortStatus (Authorized/Unauthorized), HostMode, AuthMethod, and the identity of authenticated users.",
            "C": "Incorrect. Spanning Tree shows port states related to loop prevention, not 802.1X authentication status.",
            "D": "Incorrect. This shows Layer 3 interface status but doesn't provide 802.1X authentication information."
        },
        labScenario: "basic-topology"
    }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questionBank };
}
