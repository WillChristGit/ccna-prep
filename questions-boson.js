// ============================================
// CCNA Master - Boson-Style Scenario Questions
// Advanced scenario-based questions with exhibits
// ============================================

const bosonQuestions = [
    // ============================================
    // NETWORK FUNDAMENTALS - Advanced Scenarios
    // ============================================
    {
        id: 'B-001',
        domain: "network-fundamentals",
        domainName: "Network Fundamentals",
        question: `<strong>Scenario:</strong> A network administrator is troubleshooting connectivity between PC1 (192.168.1.10/24) and a server (192.168.2.10/24). The network diagram shows:

<div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); margin: 1rem 0; font-family: var(--font-mono); font-size: 0.85rem;">
PC1 (192.168.1.10) --- SW1 --- R1 --- R2 --- SW2 --- Server (192.168.2.10)
                        |       |
                    (192.168.1.1) (10.0.0.1) (10.0.0.2) (192.168.2.1)
                          LAN1      WAN       WAN       LAN2
</div>

The administrator executes the following commands on R1:

<pre>Router# show ip route
Gateway of last resort is not set

     10.0.0.0/8 is variably subnetted, 2 subnets, 2 masks
C       10.0.0.0/30 is directly connected, GigabitEthernet0/1
S       192.168.2.0/24 [1/0] via 10.0.0.2

Router# ping 192.168.2.10
Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 192.168.2.10, timeout is 2 seconds:
.....
Success rate is 0 percent (0/5)</pre>

However, when pinging from PC1, the result is:
<pre>C:\\>ping 192.168.2.10
Pinging 192.168.2.10 with 32 bytes of data:
Request timed out.
Request timed out.</pre>

What is the most likely cause of this issue?`,
        options: [
            { letter: "A", text: "The static route on R1 is using the wrong next-hop IP address" },
            { letter: "B", text: "PC1 does not have a default gateway configured" },
            { letter: "C", text: "R2 is missing a return route to the 192.168.1.0/24 network" },
            { letter: "D", text: "ICMP is being blocked by a firewall on SW1" }
        ],
        correct: "C",
        explanation: "This is a classic asymmetric routing issue. PC1 can send packets to 192.168.2.10 (they reach the server via R1→R2), but the return traffic fails because R2 doesn't know how to reach 192.168.1.0/24. R2 needs either a static route back to 192.168.1.0/24 via 10.0.0.1 or a dynamic routing protocol to learn about LAN1.",
        optionExplanations: {
            "A": "Incorrect. The static route '192.168.2.0/24 via 10.0.0.2' correctly points to R2's WAN interface. This is the proper next-hop for reaching the server network.",
            "B": "Incorrect. While PC1 does need a default gateway to reach remote networks, the fact that the ping from R1 times out suggests the issue is with return routing, not PC1's configuration. If R2 had a return route, the ping from R1 would succeed even if PC1's gateway was misconfigured.",
            "C": "Correct! R2 lacks a route to 192.168.1.0/24. When packets from PC1 reach the server, the server replies to 192.168.1.10, but R2 doesn't know where to forward these return packets. Adding 'ip route 192.168.1.0 255.255.255.0 10.0.0.1' on R2 would resolve this.",
            "D": "Incorrect. Switches operate at Layer 2 and forward traffic based on MAC addresses. They don't typically block ICMP unless specifically configured with ACLs or port security, which would affect all traffic, not just this specific connection."
        },
        labScenario: "static-routing"
    },

    {
        id: 'B-002',
        domain: "network-fundamentals",
        domainName: "Network Fundamentals",
        question: `<strong>Scenario:</strong> You are analyzing a packet capture file that shows the following TCP three-way handshake:

<div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); margin: 1rem 0; font-family: var(--font-mono); font-size: 0.85rem;">
No.  Time        Source          Destination     Protocol    Info
1    0.000000    192.168.1.10    10.0.0.100      TCP        [SYN] Seq=0 Len=0
2    0.000250    10.0.0.100      192.168.1.10    TCP        [SYN, ACK] Seq=0 Ack=1 Len=0
3    0.000500    192.168.1.10    10.0.0.100      TCP        [ACK] Seq=1 Ack=1 Len=0
4    0.001000    192.168.1.10    10.0.0.100      TCP        [PSH, ACK] Seq=1 Ack=1 Len=100
5    0.001500    10.0.0.100      192.168.1.10    TCP        [ACK] Seq=1 Ack=101 Len=0
6    10.000000   192.168.1.10    10.0.0.100      TCP        [FIN, ACK] Seq=101 Ack=1 Len=0
7    10.000250   10.0.0.100      192.168.1.10    TCP        [FIN, ACK] Seq=1 Ack=102 Len=0
8    10.000500   192.168.1.10    10.0.0.100      TCP        [ACK] Seq=102 Ack=2 Len=0
</div>

Which statement correctly describes what is happening in this capture?`,
        options: [
            { letter: "A", text: "The connection was terminated due to a network error after 10 seconds" },
            { letter: "B", text: "The client sent 100 bytes of data and immediately closed the connection" },
            { letter: "C", text: "Packet 7 shows the server's FIN with the wrong acknowledgment number" },
            { letter: "D", text: "This capture shows a half-open connection that never completed the handshake" }
        ],
        correct: "B",
        explanation: "The capture shows a normal TCP three-way handshake (SYN, SYN-ACK, ACK) followed by the client sending 100 bytes of data (PSH, ACK with Len=100) and then gracefully closing the connection with a FIN, ACK. The 10-second delay before the FIN suggests this was a brief transaction where the client sent a request and received a response before closing.",
        optionExplanations: {
            "A": "Incorrect. The FIN, ACK packets at the end show a graceful connection termination, not a network error. A network error would show retransmissions or RST (reset) packets.",
            "B": "Correct! Packet 4 shows [PSH, ACK] with Seq=1 and Len=100, indicating the client pushed 100 bytes of data to the server. The server acknowledged this in packet 5 (Ack=101). The connection was then normally closed by the client.",
            "C": "Incorrect. Packet 7 shows [FIN, ACK] Seq=1 Ack=102. The acknowledgment number 102 is correct because it acknowledges the client's FIN at sequence 101 (FIN consumes one sequence number). This is proper TCP behavior.",
            "D": "Incorrect. Packets 1-3 show a complete TCP three-way handshake (SYN → SYN-ACK → ACK). The connection was fully established before data transfer occurred. A half-open connection would only show the initial SYN without a SYN-ACK response."
        },
        labScenario: "basic-topology"
    },

    {
        id: 'B-003',
        domain: "network-fundamentals",
        domainName: "Network Fundamentals",
        question: `<strong>Scenario:</strong> A junior network administrator is calculating subnet requirements. The network design team has provided the following requirements:

<strong>Requirements:</strong>
• Branch A: Needs 8 usable host addresses, minimum
• Branch B: Needs 15 usable host addresses, minimum
• Branch C: Needs 30 usable host addresses, minimum
• Branch D: Needs 60 usable host addresses, minimum
• Branch E: Needs 120 usable host addresses, minimum
• All branches will use subnets of the 172.16.0.0/16 network
• Use VLSM to maximize address conservation
• Reserve addresses for future growth (minimum 20% buffer)

Which subnet mask configuration BEST meets these requirements while conserving the most addresses?`,
        options: [
            { letter: "A", text: "/29 for all branches (8 hosts max per subnet)" },
            { letter: "B", text: "/29, /28, /27, /26, /25 (matching exact requirements)" },
            { letter: "C", text: "/28, /27, /26, /25, /24 (provides 20% growth buffer)" },
            { letter: "D", text: "/24 for all branches (256 hosts per subnet)" }
        ],
        correct: "C",
        explanation: "Using VLSM with a growth buffer, we should allocate: Branch E (120 hosts + 24 buffer = 144 minimum) → /24 provides 254 hosts. Branch D (60 + 12 = 72) → /25 provides 126 hosts. Branch C (30 + 6 = 36) → /26 provides 62 hosts. Branch B (15 + 3 = 18) → /27 provides 30 hosts. Branch A (8 + 2 = 10) → /28 provides 14 hosts. This approach provides the required 20% growth buffer while conserving address space.",
        optionExplanations: {
            "A": "Incorrect. /29 only provides 6 usable hosts (2^3 - 2), which is insufficient for all requirements. Branch B needs 15 hosts, and Branch E needs 120 hosts - neither would fit in a /29.",
            "B": "Incorrect. While these masks match the minimum requirements, they don't provide the requested 20% growth buffer. This would require re-addressing as soon as any branch grows slightly. For example, /29 only gives 6 usable hosts, and Branch A needs 8 minimum plus growth room.",
            "C": "Correct! This VLSM design provides a 20% buffer for growth: /24 (254 hosts) for Branch E (120 needed), /25 (126 hosts) for Branch D (60 needed), /26 (62 hosts) for Branch C (30 needed), /27 (30 hosts) for Branch B (15 needed), /28 (14 hosts) for Branch A (8 needed). Each subnet has adequate headroom.",
            "D": "Incorrect. While /24 subnets would work, they waste significant address space. Five /24 subnets would consume 1,270 addresses (5 × 254) when we only need about 490 addresses total. This inefficient use of address space violates the VLSM principle of conserving addresses."
        },
        labScenario: "basic-topology"
    },

    // ============================================
    // NETWORK ACCESS - Complex Scenarios
    // ============================================
    {
        id: 'B-004',
        domain: "network-access",
        domainName: "Network Access",
        question: `<strong>Scenario:</strong> A network engineer is deploying a new switched network with the following requirements:

<div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); margin: 1rem 0; font-family: var(--font-mono); font-size: 0.85rem;">
VLAN Requirements:
- VLAN 10 (Sales): 50 users on SW1, ports Gi0/1-24
- VLAN 20 (HR): 30 users on SW1, ports Gi0/25-40
- VLAN 30 (IT): 20 users on SW2, ports Gi0/1-20
- VLAN 99 (Native): Management traffic

Trunk Requirements:
- SW1 and SW2 connect via Gi0/48
- Must carry all VLANs except VLAN 99
- Use 802.1Q encapsulation

STP Requirements:
- SW1 should be the root bridge for VLANs 10-30
- Use Rapid PVST+
- Enable PortFast on all access ports
</div>

The engineer applies the following configuration to SW1:

<pre>SW1(config)# spanning-tree mode rapid-pvst
SW1(config)# spanning-tree vlan 10,20,30 priority 24576
SW1(config)# spanning-tree vlan 10,20,30 root primary
SW1(config)# interface range gi0/1-40
SW1(config-if-range)# spanning-tree portfast
SW1(config-if-range)# spanning-tree bpduguard enable
SW1(config-if-range)# exit
SW1(config)# interface gi0/48
SW1(config-if)# switchport trunk encapsulation dot1q
SW1(config-if)# switchport mode trunk
SW1(config-if)# switchport trunk allowed vlan 10,20,30
SW1(config-if)# switchport trunk native vlan 99
SW1(config-if)# no shutdown</pre>

After configuration, users in VLAN 20 report intermittent connectivity. What is the cause?`,
        options: [
            { letter: "A", text: "The 'spanning-tree portfast' command should not be used on trunk ports" },
            { letter: "B", text: "BPDU guard on access ports is causing legitimate BPDUs to be filtered" },
            { letter: "C", text: "VLAN 99 is configured as native but not allowed on the trunk" },
            { letter: "D", text: "The priority value 24576 conflicts with the 'root primary' command" }
        ],
        correct: "C",
        explanation: "The native VLAN (VLAN 99) must be allowed on the trunk because untagged traffic (including STP BPDUs for the native VLAN) uses this VLAN. When VLAN 99 is configured as native but not in the allowed list, it creates a mismatch that causes STP inconsistencies and connectivity problems. The allowed VLAN list should either include VLAN 99 or the native VLAN should be changed to VLAN 1 (the default) or VLAN 10.",
        optionExplanations: {
            "A": "Incorrect. The configuration shows 'spanning-tree portfast' is only applied to ports Gi0/1-40 (access ports), not to Gi0/48 (the trunk). PortFast is correctly configured only on access ports where it should be used.",
            "B": "Incorrect. BPDU guard on access ports is a security best practice that protects against rogue switches. It does not filter legitimate BPDUs from the root bridge - those BPDUs arrive on the trunk port (Gi0/48), not on access ports. BPDU guard only acts if BPDUs are received on PortFast-enabled ports.",
            "C": "Correct! When a VLAN is configured as the native VLAN, it must be allowed on the trunk. Native VLAN traffic (untagged) flows across the trunk but isn't explicitly listed in the allowed VLAN list. By excluding VLAN 99 from 'switchport trunk allowed vlan 10,20,30', native VLAN traffic cannot pass, causing connectivity issues and STP problems.",
            "D": "Incorrect. The 'root primary' command automatically sets the priority to 24576 (or lower if needed). Manually setting it to 24576 before using 'root primary' doesn't cause conflicts - the 'root primary' command ensures the switch becomes the root bridge. The priority value is consistent, not contradictory."
        },
        labScenario: "vlan-config"
    },

    {
        id: 'B-005',
        domain: "network-access",
        domainName: "Network Access",
        question: `<strong>Scenario:</strong> You are configuring an EtherChannel bundle between two switches using LACP. The configuration on SW1 is:

<pre>SW1(config)# interface range gi0/1-2
SW1(config-if-range)# channel-group 1 mode active
SW1(config-if-range)# exit
SW1(config)# interface port-channel 1
SW1(config-if)# switchport mode trunk
SW1(config-if)# switchport trunk allowed vlan 10,20,30
SW1(config-if)# no shutdown</pre>

The configuration on SW2 is:

<pre>SW2(config)# interface range gi0/1-2
SW2(config-if-range)# channel-group 1 mode passive
SW2(config-if-range)# switchport mode trunk
SW2(config-if-range)# switchport trunk allowed vlan 10,20
SW2(config-if-range)# no shutdown</pre>

After configuration, you run 'show etherchannel summary' on SW1:

<pre>Group  Port-channel  Protocol    Ports
------+-------------+-----------+-----------------------------------------------
1      Po1(SD)      LACP        Gi0/1(s)  Gi0/2(s)</pre>

Why is the EtherChannel not working, and what command would fix it?`,
        options: [
            { letter: "A", text: "SW2 needs 'mode active' instead of 'mode passive'; change to 'channel-group 1 mode active'", },
            { letter: "B", text: "The trunk allowed VLANs don't match; on SW2 add VLAN 30 to the allowed list", },
            { letter: "C", text: "LACP is not compatible with trunk mode; use 'switchport mode access' instead", },
            { letter: "D", text: "The PortChannel interface needs configuration before the physical interfaces; remove and reconfigure in order", }
        ],
        correct: "B",
        explanation: "For an EtherChannel to form, all member interfaces must have identical configurations. A key requirement is that the allowed VLAN list must match exactly on both ends. SW1 allows VLANs 10,20,30 while SW2 only allows 10,20. This mismatch prevents the EtherChannel from forming. The 'SD' status indicates the port is down and suspended due to configuration mismatch.",
        optionExplanations: {
            "A": "Incorrect. LACP with one side as 'active' and the other as 'passive' is a valid configuration. 'Active' means the port will actively try to form an LACP bundle, while 'passive' means it will respond to LACP packets but won't initiate. This asymmetric configuration works fine.",
            "B": "Correct! EtherChannel member ports must have identical configurations, including allowed VLANs, native VLAN, trunk encapsulation, speed, and duplex. SW1 allows VLANs 10,20,30 while SW2 only allows 10,20. This mismatch causes the ports to be suspended. Adding VLAN 30 to SW2's allowed list would fix this.",
            "C": "Incorrect. EtherChannels work perfectly with trunk mode. In fact, trunking is the most common use case for EtherChannels between switches. The issue is not related to using trunk mode, but rather the configuration mismatch between the two ends.",
            "D": "Incorrect. The order of configuration (physical interfaces vs PortChannel) doesn't matter for EtherChannel formation. The configuration is applied to the PortChannel interface and is automatically propagated to the member ports. The issue is the configuration mismatch, not the configuration order."
        },
        labScenario: "vlan-config"
    },

    // ============================================
    // IP CONNECTIVITY - Complex Routing Scenarios
    // ============================================
    {
        id: 'B-006',
        domain: "ip-connectivity",
        domainName: "IP Connectivity",
        question: `<strong>Scenario:</strong> You are troubleshooting an OSPF network with the following topology:

<div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); margin: 1rem 0; font-family: var(--font-mono); font-size: 0.85rem;">
     R1 (1.1.1.1)              R2 (2.2.2.2)              R3 (3.3.3.3)
         |                         |                         |
     Area 0                   Area 0                   Area 1
         |                         |                         |
     10.1.12.0/24             10.1.23.0/24             10.1.34.0/24
</div>

The configurations show:
<pre>R1# show running-config | section router ospf
router ospf 1
 router-id 1.1.1.1
 network 10.1.12.0 0.0.0.255 area 0
 network 10.1.13.0 0.0.0.255 area 0

R2# show running-config | section router ospf
router ospf 1
 router-id 2.2.2.2
 network 10.1.12.0 0.0.0.255 area 0
 network 10.1.23.0 0.0.0.255 area 0

R3# show running-config | section router ospf
router ospf 1
 router-id 3.3.3.3
 network 10.1.23.0 0.0.0.255 area 1
 network 10.1.34.0 0.0.0.255 area 1</pre>

When you check adjacency on R2:
<pre>R2# show ip ospf neighbor
Neighbor ID     Pri   State           Dead Time   Address         Interface
3.3.3.3           1   2WAY/DROTHER    00:00:38    10.1.23.3      Gi0/1</pre>

Why is R2 not forming a FULL adjacency with R3, and what command would fix this?`,
        options: [
            { letter: "A", text: "R3 is configured for Area 1 but R2 has no Area 1 configuration; add 'network 10.1.23.0 0.0.0.255 area 1' to R2", },
            { letter: "B", text: "The interface on R2 connecting to R3 needs 'ip ospf 1 area 1' configured", },
            { letter: "C", text: "R3 needs to be configured as an ABR with 'area 1 stub' command", },
            { letter: "D", text: "There is a router ID conflict; change R3's router-id to 3.3.3.4", }
        ],
        correct: "A",
        explanation: "The OSPF adjacency issue is caused by Area mismatch. R2 has the 10.1.23.0/24 network in Area 0, while R3 has it in Area 1. For OSPF neighbors to form an adjacency, they must agree on the Area ID for the shared network. The '2WAY/DROTHER' state indicates they can see each other's hellos but won't progress to FULL due to the Area mismatch. Adding the network to Area 1 on R2 (or changing R3 to Area 0) would fix this.",
        optionExplanations: {
            "A": "Correct! The shared network 10.1.23.0/24 is in different OSPF areas on each router: Area 0 on R2 and Area 1 on R3. OSPF requires both ends of a link to be in the same area (except for virtual links). Adding 'network 10.1.23.0 0.0.0.255 area 1' to R2 would make R2 an ABR with interfaces in both Area 0 and Area 1.",
            "B": "Incorrect. Configuring OSPF directly on the interface using 'ip ospf 1 area 1' would place the interface in Area 1, but this doesn't resolve the fundamental issue that R2's OSPF process has the network in Area 0. An interface can only be in one OSPF area, and the network statement takes precedence for determining area membership.",
            "C": "Incorrect. Configuring Area 1 as a stub area on R3 doesn't address the Area mismatch. A stub area is a type of area that doesn't receive external LSAs, but it has nothing to do with the neighbor adjacency issue. The problem is that R2 and R3 don't agree on which Area the 10.1.23.0/24 network belongs to.",
            "D": "Incorrect. The router IDs are unique (1.1.1.1, 2.2.2.2, 3.3.3.3), so there is no conflict. Router ID conflicts would show a different error message. The '2WAY/DROTHER' state specifically indicates that the routers can see each other but won't progress further due to a configuration mismatch - in this case, the Area mismatch."
        },
        labScenario: "ospf"
    },

    {
        id: 'B-007',
        domain: "ip-connectivity",
        domainName: "IP Connectivity",
        question: `<strong>Scenario:</strong> You are configuring EIGRP for the network shown below:

<div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); margin: 1rem 0; font-family: var(--font-mono); font-size: 0.85rem;">
R1 (AS 100) ---- R2 (AS 100) ---- R3 (AS 100)
   |                 |                  |
LAN A           LAN B              LAN C
172.16.1.0/24   172.16.2.0/24     172.16.3.0/24
</div>

All interfaces are configured correctly, and EIGRP is configured on all routers using 'network 172.16.0.0' wildcard masks.

However, R3's routing table shows:
<pre>R3# show ip route eigrp
     172.16.0.0/16 is variably subnetted, 4 subnets, 2 masks
D       172.16.2.0/24 [90/30720] via 10.1.23.2, 00:00:15, GigabitEthernet0/1
D    172.16.1.0/24 [90/33280] via 10.1.23.2, 00:00:15, GigabitEthernet0/1
                  [90/33280] via 10.1.34.4, 00:00:15, GigabitEthernet0/2
</div>

The engineer wants R3 to prefer the path through R2 (GigabitEthernet0/1) for LAN A (172.16.1.0/24) to load balance traffic. Which configuration accomplishes this?`,
        options: [
            { letter: "A", text: "On R1, increase the delay on the interface to R3: 'interface gi0/2, delay 2000'", },
            { letter: "B", text: "On R3, configure offset-list: 'offset-list 0 in 1000 gi0/2'", },
            { letter: "C", text: "On R2, decrease bandwidth to make the path more attractive: 'bandwidth 10000'", },
            { letter: "D", text: "Use variance on R3: 'router eigrp 100, variance 2'", }
        ],
        correct: "A",
        explanation: "Currently R3 sees two equal-cost paths (33280) to 172.16.1.0/24 via R2 and R3. To prefer the path through R2, we need to increase the metric of the path through the alternate router. EIGRP composite metric = [K1*Bandwidth + (K2*Bandwidth)/(256-Load) + K3*Delay] * [K5/(Reliability + K4)]. By default, K1=K3=1, K2=K4=K5=0, so metric = Bandwidth + Delay. Increasing delay on R1's interface to R3 will increase the total metric, making the path through R2 preferred.",
        optionExplanations: {
            "A": "Correct! By increasing delay on R1's interface to R3, the total metric for the path R3→R1→LAN A will increase above the metric for the path R3→R2→LAN A. This makes R3 prefer the path through R2. The delay command affects the calculated metric and is a standard way to influence EIGRP path selection.",
            "B": "Incorrect. An offset-list would increase ALL routes learned through that interface, not just the route to LAN A. This would unnecessarily penalize all routes from R2. Additionally, offset-list is applied inbound or outbound on routes being filtered, not to influence specific path selection among equal-cost routes.",
            "C": "Incorrect. Decreasing bandwidth on R2 would actually make the path through R2 LESS attractive (higher metric), which is the opposite of what we want. EIGRP's metric formula uses the inverse of bandwidth (lowest bandwidth along the path), so decreasing bandwidth increases the metric, making the path less preferred.",
            "D": "Incorrect. Variance is used for unequal-cost load balancing when you have multiple paths with DIFFERENT metrics. Here we have equal-cost paths (both show 33280). Variance would enable load balancing across both paths, not prefer one over the other. To prefer one path, we need to create a metric difference, not enable unequal-cost load balancing."
        },
        labScenario: "ospf"
    },

    // ============================================
    // IP SERVICES - DHCP/NAT Scenarios
    // ============================================
    {
        id: 'B-008',
        domain: "ip-services",
        domainName: "IP Services",
        question: `<strong>Scenario:</strong> A network administrator has configured DHCP on a Cisco router with the following configuration:

<pre>ip dhcp excluded-address 192.168.1.1 192.168.1.10
ip dhcp excluded-address 192.168.1.100
!
ip dhcp pool LAN
 network 192.168.1.0 255.255.255.0
 default-router 192.168.1.1
 dns-server 8.8.8.8 8.8.4.4
 lease 7</pre>

PCs are getting IP addresses, but the administrator notices that:

1. PC users complain that the server at 192.168.1.100 is periodically unreachable
2. Some devices are getting IPs from .11 to .99 range
3. The DHCP lease time seems shorter than expected

Which configuration issue is causing these symptoms?`,
        options: [
            { letter: "A", text: "The excluded address range overlaps with the server's static IP (192.168.1.100)", },
            { letter: "B", text: "The 'lease 7' command sets lease time to 7 seconds instead of 7 days", },
            { letter: "C", text: "Multiple DHCP pools are conflicting; there must be only one pool per subnet", },
            { letter: "D", text: "The DNS server addresses are causing conflicts with the local DNS cache", }
        ],
        correct: "B",
        explanation: "The 'lease 7' command sets the DHCP lease to 7 seconds, not 7 days. In Cisco IOS, lease time syntax is 'lease {DAYS}', so 'lease 7' means 7 seconds. This causes clients to renew their leases constantly, leading to connectivity issues and the appearance of shorter lease times. To set a 7-day lease, use 'lease 7 0 0' or 'lease 0 0 10080' (7 days = 7 days, 0 hours, 0 minutes OR 10080 minutes).",
        optionExplanations: {
            "A": "Incorrect. The excluded address range is 192.168.1.1-192.168.1.10, which does NOT include 192.168.1.100. The server at .100 is outside the excluded range. However, with frequent lease renewals due to the 7-second lease, there could be ARP conflicts or timing issues that make the server appear unreachable.",
            "B": "Correct! The 'lease 7' command specifies lease time in DAYS when using a single number, so 'lease 7' means 7 seconds, not 7 days. This extremely short lease causes clients to constantly renew their leases, leading to network instability and connectivity issues. The administrator intended 'lease 7 0 0' (7 days) but only specified the days parameter as 7.",
            "C": "Incorrect. Having one DHCP pool per subnet is the correct configuration. Multiple pools for the same subnet would cause an error during configuration. The issue here is not related to pool conflicts but to the lease time interpretation.",
            "D": "Incorrect. DNS server addresses (8.8.8.8 and 8.8.4.4) are public Google DNS servers and wouldn't cause conflicts with local DNS caching. The connectivity issues are related to the extremely short DHCP lease causing constant IP renewal, not DNS configuration."
        },
        labScenario: "basic-topology"
    },

    {
        id: 'B-009',
        domain: "ip-services",
        domainName: "IP Services",
        question: `<strong>Scenario:</strong> You are configuring NAT for a small office with the following requirements:

<div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); margin: 1rem 0; font-family: var(--font-mono); font-size: 0.85rem;">
Internal Network: 192.168.1.0/24
Public IP Block: 203.0.113.16/28 (203.0.113.17 - 203.0.113.30)
ISP Gateway: 203.0.113.1
Requirements:
- Web server at 192.168.1.100 must be accessible from internet
- All other internal hosts should share public IPs using PAT
- Use public IPs .17-.30 for PAT pool
- Use public IP .16 for static NAT to web server
</div>

The configuration applied is:

<pre>interface GigabitEthernet0/1
 description WAN to ISP
 ip address 203.0.113.16 255.255.255.240
 ip nat outside
 no shutdown
!
interface GigabitEthernet0/0
 description LAN
 ip address 192.168.1.1 255.255.255.0
 ip nat inside
 no shutdown
!
ip nat inside source static 192.168.1.100 203.0.113.16
ip nat inside source list 1 interface GigabitEthernet0/1 overload
ip nat pool PUBLIC 203.0.113.17 203.0.113.30 prefix-length 28
!
access-list 1 permit 192.168.1.0 0.0.0.255</pre>

After configuration, the web server is accessible from the internet, but internal users cannot access the internet. Why?`,
        options: [
            { letter: "A", text: "The static NAT for the web server is preventing PAT for other hosts", },
            { letter: "B", text: "The PAT pool should be used instead of interface overload", },
            { letter: "C", text: "The access-list needs to exclude the web server's IP address", },
            { letter: "D", text: "The web server's IP (.16) is being used by both static NAT and the WAN interface", }
        ],
        correct: "D",
        explanation: "The critical issue is that IP address 203.0.113.16 is being used for BOTH the WAN interface IP and the static NAT mapping for the web server. This creates a conflict because the router cannot respond to ARP for 203.0.113.16 (as its own interface IP) while also performing NAT translations to that same address. The web server should be mapped to a different public IP (e.g., 203.0.113.17) that's not used as the router's interface IP.",
        optionExplanations: {
            "A": "Incorrect. Static NAT and PAT can coexist without issue. The static NAT entry specifically maps 192.168.1.100 to 203.0.113.16, while PAT handles other hosts. The problem is not with having both static and dynamic NAT, but with the address overlap.",
            "B": "Incorrect. Using a PAT pool instead of interface overload wouldn't resolve the fundamental issue. Interface overload is a valid configuration that uses the interface IP for PAT. The problem is that the interface IP (203.0.113.16) is also being used for static NAT.",
            "C": "Incorrect. The access-list includes all internal hosts (192.168.1.0/24), which is correct for PAT. Excluding the web server from ACL 1 wouldn't help because the static NAT entry already handles the web server's traffic separately. The issue is the address conflict, not the ACL configuration.",
            "D": "Correct! The WAN interface has IP 203.0.113.16, and the static NAT also uses 203.0.113.16 for the web server. This creates a conflict - the router cannot use 203.0.113.16 both as its interface IP AND as a NATted address. The solution is to either change the WAN interface IP to a different address in the block (e.g., 203.0.113.17) or map the web server to a different public IP."
        },
        labScenario: "nat"
    },

    // ============================================
    // SECURITY FUNDAMENTALS - Advanced ACL Scenarios
    // ============================================
    {
        id: 'B-010',
        domain: "security-fundamentals",
        domainName: "Security Fundamentals",
        question: `<strong>Scenario:</strong> A network administrator needs to configure security for a DMZ network with the following requirements:

<div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); margin: 1rem 0; font-family: var(--font-mono); font-size: 0.85rem;">
Networks:
- Internal: 10.0.0.0/24 (contains users, file servers, management systems)
- DMZ: 10.0.1.0/24 (contains web server 10.0.1.100, mail server 10.0.1.101)
- Internet: All other networks (via ISP at 203.0.113.1)

Security Requirements:
1. Internal users can access internet (HTTP, HTTPS, DNS, ICMP)
2. Internal users can access web server in DMZ (HTTP only, not HTTPS)
3. Internet users can access web server (HTTP and HTTPS only)
4. Internet users can access mail server (SMTP only, port 25)
5. Internet users CANNOT access any internal systems
6. Internal users CANNOT access mail server directly (only via webmail)
7. Web server can initiate connections to internal database server (10.0.0.50, TCP 3306)
</div>

The administrator applies this ACL on the router's outside interface (toward internet):

<pre>ip access-list extended OUTSIDE-IN
 permit tcp any host 10.0.1.100 eq 80
 permit tcp any host 10.0.1.100 eq 443
 permit tcp any host 10.0.1.101 eq 25
 deny   ip any 10.0.0.0 0.0.0.255
 permit icmp any any echo-reply
 permit udp any any eq domain
 permit tcp any any established
 permit udp any any eq 53
 deny   ip any any log
!
interface GigabitEthernet0/1 (WAN)
 ip access-group OUTSIDE-IN in</pre>

Internal users report they cannot access internet resources. Why?`,
        options: [
            { letter: "A", text: "ACL is applied in the wrong direction; should be 'out' not 'in'", },
            { letter: "B", text: "The 'deny ip any 10.0.0.0 0.0.0.255' blocks return traffic from internal users", },
            { letter: "C", text: "HTTP/HTTPS from internet are not permitted for return traffic", },
            { letter: "D", text: "The ACL needs stateful inspection; add 'permit tcp any any' at the beginning", }
        ],
        correct: "B",
        explanation: "The issue is with the 'deny ip any 10.0.0.0 0.0.255' statement. This blocks ANY traffic from the internet to the internal network (10.0.0.0/24), including return traffic for connections initiated by internal users. When internal users access internet resources, the return packets (which have the internet server as the source and the internal user's IP as the destination) get blocked by this deny statement. The ACL needs to be reordered to allow established connections before the deny, or use 'permit tcp any any established' before the deny statement.",
        optionExplanations: {
            "A": "Incorrect. The ACL is correctly applied inbound on the outside interface. This is the proper direction for filtering traffic entering the network from the internet. Applying it outbound would filter traffic leaving the network, which wouldn't accomplish the security goals.",
            "B": "Correct! The 'deny ip any 10.0.0.0 0.0.0.255' statement blocks all traffic destined to the internal network, including return traffic for connections initiated by internal users. While this protects against inbound connections, it also breaks outbound traffic because the return packets are blocked. This statement should either be removed (since the implicit deny at the end blocks unsolicited traffic) or moved after the 'permit tcp any any established' line.",
            "C": "Incorrect. Internet users don't need HTTP/HTTPS permitted for 'return traffic' because they're not initiating those connections - internal users are. The problem is not about missing permits for specific protocols, but about blocking return traffic for established connections.",
            "D": "Incorrect. Adding 'permit tcp any any' would allow ANY TCP traffic from the internet into the network, completely bypassing security. The issue is not that we're missing a permit, but that we need to ensure return traffic for established connections is allowed BEFORE the deny statement that blocks traffic to the internal network."
        },
        labScenario: "acl"
    },

    // ============================================
    // AUTOMATION - API Scenarios
    // ============================================
    {
        id: 'B-011',
        domain: "automation",
        domainName: "Automation & Programmability",
        question: `<strong>Scenario:</strong> A network engineer is developing a Python script to automate interface configuration using the REST API on a Cisco DNA Center controller. The script needs to:

1. Get all interfaces from the controller
2. Filter for interfaces in admin-down state
3. Enable interfaces that match a certain pattern (e.g., GigabitEthernet1/1-10)

The engineer writes the following code:

<pre>import requests
import json

BASE_URL = 'https://dnac.example.com/api/v1'
AUTH = ('admin', 'password')
HEADERS = {'Content-Type': 'application/json'}

def get_interfaces():
    response = requests.get(
        f'{BASE_URL}/network/interface',
        auth=AUTH,
        headers=HEADERS,
        verify=False
    )
    return response.json()

def enable_down_interfaces(pattern):
    interfaces = get_interfaces()['response']
    for intf in interfaces:
        if intf['status'] == 'down' and pattern in intf['portName']:
            # Enable interface
            payload = {'portName': intf['portName'], 'adminStatus': 'UP'}
            response = requests.put(
                f'{BASE_URL}/network/interface/{intf['id']}',
                auth=AUTH,
                headers=HEADERS,
                json=payload,
                verify=False
            )
            print(f\"Enabled {intf['portName']}: {response.status_code}\")</pre>

The script runs but returns HTTP 400 Bad Request for the PUT requests. What is the issue?`,
        options: [
            { letter: "A", text: "The PUT endpoint requires the full interface object, not just the fields being changed", },
            { letter: "B", text: "The 'adminStatus' value should be 'true' boolean, not 'UP' string", },
            { letter: "C", text: "The API requires PATCH method instead of PUT for partial updates", },
            { letter: "D", text: "The API endpoint URL is incorrect; should be '/network-device/interface' not '/network/interface'", }
        ],
        correct: "A",
        explanation: "The Cisco DNA Center API typically requires the complete object representation when using PUT, even for partial updates. The PUT method replaces the entire resource. The script is only sending 'portName' and 'adminStatus', but the API expects all required fields for an interface object. The correct approach is either to: (1) GET the full interface object first, modify the adminStatus field, and PUT it back, or (2) use PATCH if the API supports it for partial updates.",
        optionExplanations: {
            "A": "Correct! REST APIs typically require the complete resource representation when using PUT. The script is only sending two fields ('portName' and 'adminStatus'), but the API expects all required fields. The fix is to GET the full interface object first, modify the adminStatus field to 'UP', and then PUT the complete object back. Alternatively, use PATCH if the API supports it.",
            "B": "Incorrect. While some APIs use boolean values (true/false), the error message (HTTP 400 Bad Request) indicates a malformed request rather than an invalid value. A 4xx error for an invalid value would still be a 4xx, but the specific error suggests the request body structure is wrong, not the value format.",
            "C": "Incorrect. While PATCH is commonly used for partial updates, using PUT would be acceptable if the full object were sent. The issue is not the HTTP method but the incomplete request body. Additionally, not all APIs support PATCH - it depends on the specific API implementation.",
            "D": "Incorrect. The API endpoint '/network/interface' is valid for Cisco DNA Center's Intent API. An incorrect endpoint would result in HTTP 404 Not Found, not HTTP 400 Bad Request. The 400 status code indicates the endpoint exists but the request body is malformed or incomplete."
        },
        labScenario: "basic-topology"
    },

    {
        id: 'B-012',
        domain: "automation",
        domainName: "Automation & Programmability",
        question: `<strong>Scenario:</strong> A network automation engineer is using Ansible to configure VLANs on multiple Cisco switches. The playbook includes:

<pre>---
- name: Configure VLANs on switches
  hosts: switches
  gather_facts: no
  tasks:
    - name: Ensure VLANs exist
      ios_vlan:
        vlan_id: \"{{ item.vlan_id }}\"
        name: \"{{ item.vlan_name }}\"
        state: present
      loop:
        - { vlan_id: 10, vlan_name: 'SALES' }
        - { vlan_id: 20, vlan_name: 'HR' }
        - { vlan_id: 30, vlan_name: 'IT' }
      register: vlan_result

    - name: Configure access ports
      ios_config:
        lines:
          - switchport mode access
          - \"switchport access vlan {{ item.vlan_id }}\"
        parents: \"interface {{ item.interface }}\"
      loop:
        - { interface: 'GigabitEthernet0/1', vlan_id: 10 }
        - { interface: 'GigabitEthernet0/2', vlan_id: 20 }
        - { interface: 'GigabitEthernet0/3', vlan_id: 30 }</pre>

The playbook runs successfully, but the engineer notices that subsequent runs keep reporting 'changed' even though the VLANs already exist. What modification is needed?`,
        options: [
            { letter: "A", text: "Add 'when: vlan_result.changed' condition to the second task", },
            { letter: "B", text: "The 'ios_vlan' module should use 'state: merged' instead of 'present'", },
            { letter: "C", text: "Save the running config after VLAN creation with 'ios_command: copy run start'", },
            { letter: "D", text: "Add 'gather_facts: yes' to get current VLAN configuration from devices", }
        ],
        correct: "A",
        explanation: "The issue is that the second task (configure access ports) runs every time regardless of whether VLANs were actually changed. By adding 'when: vlan_result.changed' to the second task, it will only run when VLANs were actually created or modified in the first task. This is a common Ansible pattern for conditional task execution - only run dependent tasks when the parent task actually made changes.",
        optionExplanations: {
            "A": "Correct! Adding a conditional statement 'when: vlan_result.changed' ensures that the access port configuration only runs when VLANs were actually created or modified. The 'register' directive captures the task result, and 'changed' is a boolean that indicates whether the task made changes. Without this, the second task runs every time even when nothing changed.",
            "B": "Incorrect. The 'ios_vlan' module doesn't have a 'merged' state - the valid states are 'present' and 'absent'. The module already checks if the VLAN exists before creating it. The issue is not with the VLAN task but with always running the port configuration task regardless of whether VLANs changed.",
            "C": "Incorrect. Saving the running config doesn't affect whether Ansible reports 'changed'. The 'changed' status is based on whether the module made any modifications to the device configuration. The issue is that the port configuration task runs even when VLANs don't change, not about config persistence.",
            "D": "Incorrect. Gathering facts is enabled by default ('gather_facts: yes') unless explicitly disabled. The 'gather_facts: no' in the playbook speeds up execution by skipping fact collection for hosts. The issue is not related to facts but to conditional task execution based on whether the VLAN task made changes."
        },
        labScenario: "vlan-config"
    },
];

// Merge boson questions with main question bank
if (typeof questionBank !== 'undefined') {
    questionBank.push(...bosonQuestions);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { bosonQuestions };
}
