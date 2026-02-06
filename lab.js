// ============================================
// CCNA Master - Network Lab Simulator
// Interactive Network Topology Visualization
// ============================================

// Lab scenarios with device configurations
const labScenarios = {
    'basic-topology': {
        name: 'Basic Network Topology',
        description: 'A simple network with two routers, two switches, and four PCs demonstrating basic connectivity',
        devices: [
            { id: 'R1', type: 'router', label: 'R1', x: 50, y: 30, ip: '10.0.0.1/30' },
            { id: 'R2', type: 'router', label: 'R2', x: 50, y: 70, ip: '10.0.0.2/30' },
            { id: 'SW1', type: 'switch', label: 'SW1', x: 20, y: 30, ip: 'VLAN1: 192.168.1.2' },
            { id: 'SW2', type: 'switch', label: 'SW2', x: 80, y: 30, ip: 'VLAN1: 192.168.2.2' },
            { id: 'PC1', type: 'pc', label: 'PC1', x: 10, y: 60, ip: '192.168.1.10/24' },
            { id: 'PC2', type: 'pc', label: 'PC2', x: 30, y: 60, ip: '192.168.1.11/24' },
            { id: 'PC3', type: 'pc', label: 'PC3', x: 70, y: 60, ip: '192.168.2.10/24' },
            { id: 'PC4', type: 'pc', label: 'PC4', x: 90, y: 60, ip: '192.168.2.11/24' }
        ],
        connections: [
            { from: 'R1', to: 'R2', label: 'Serial/G0/0' },
            { from: 'R1', to: 'SW1', label: 'G0/1' },
            { from: 'R2', to: 'SW2', label: 'G0/1' },
            { from: 'SW1', to: 'PC1', label: 'Fa0/1' },
            { from: 'SW1', to: 'PC2', label: 'Fa0/2' },
            { from: 'SW2', to: 'PC3', label: 'Fa0/1' },
            { from: 'SW2', to: 'PC4', label: 'Fa0/2' }
        ],
        configs: {
            'R1': `hostname R1
!
interface GigabitEthernet0/0
 description Link to R2
 ip address 10.0.0.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description Link to SW1
 ip address 192.168.1.1 255.255.255.0
 no shutdown
!
ip route 192.168.2.0 255.255.255.0 10.0.0.2
!
line con 0
 logging synchronous
line vty 0 4
 login local
 transport input ssh`,
            'R2': `hostname R2
!
interface GigabitEthernet0/0
 description Link to R1
 ip address 10.0.0.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description Link to SW2
 ip address 192.168.2.1 255.255.255.0
 no shutdown
!
ip route 192.168.1.0 255.255.255.0 10.0.0.1
!
line con 0
 logging synchronous
line vty 0 4
 login local
 transport input ssh`,
            'SW1': `hostname SW1
!
vlan 10
 name USERS
!
interface FastEthernet0/1
 description PC1
 switchport mode access
 switchport access vlan 10
!
interface FastEthernet0/2
 description PC2
 switchport mode access
 switchport access vlan 10
!
interface GigabitEthernet0/1
 description Uplink to R1
 switchport mode access
!
interface Vlan1
 ip address 192.168.1.2 255.255.255.0
 no shutdown`,
            'SW2': `hostname SW2
!
vlan 20
 name SERVERS
!
interface FastEthernet0/1
 description PC3
 switchport mode access
 switchport access vlan 20
!
interface FastEthernet0/2
 description PC4
 switchport mode access
 switchport access vlan 20
!
interface GigabitEthernet0/1
 description Uplink to R2
 switchport mode access
!
interface Vlan1
 ip address 192.168.2.2 255.255.255.0
 no shutdown`,
            'PC1': `# PC1 Network Configuration
# IP Address: 192.168.1.10/24
# Default Gateway: 192.168.1.1
# DNS Server: 8.8.8.8

$ ip addr show eth0
    inet 192.168.1.10/24
$ ip route show
    default via 192.168.1.1`,
            'PC2': `# PC2 Network Configuration
# IP Address: 192.168.1.11/24
# Default Gateway: 192.168.1.1
# DNS Server: 8.8.8.8

$ ip addr show eth0
    inet 192.168.1.11/24
$ ip route show
    default via 192.168.1.1`,
            'PC3': `# PC3 Network Configuration
# IP Address: 192.168.2.10/24
# Default Gateway: 192.168.2.1
# DNS Server: 8.8.8.8

$ ip addr show eth0
    inet 192.168.2.10/24
$ ip route show
    default via 192.168.2.1`,
            'PC4': `# PC4 Network Configuration
# IP Address: 192.168.2.11/24
# Default Gateway: 192.168.2.1
# DNS Server: 8.8.8.8

$ ip addr show eth0
    inet 192.168.2.11/24
$ ip route show
    default via 192.168.2.1`
        }
    },
    'vlan-config': {
        name: 'VLAN Configuration',
        description: 'Inter-VLAN routing with trunk links and multiple VLANs',
        devices: [
            { id: 'R1', type: 'router', label: 'Router-on-Stick', x: 50, y: 15, ip: 'Multiple Subinterfaces' },
            { id: 'SW1', type: 'switch', label: 'SW1 (Core)', x: 50, y: 45, ip: 'Management: 10.0.0.2' },
            { id: 'SW2', type: 'switch', label: 'SW2 (Access)', x: 25, y: 70, ip: 'Management: 10.0.0.3' },
            { id: 'SW3', type: 'switch', label: 'SW3 (Access)', x: 75, y: 70, ip: 'Management: 10.0.0.4' },
            { id: 'PC1', type: 'pc', label: 'Sales-PC', x: 15, y: 90, ip: 'VLAN 10: 10.10.10.10' },
            { id: 'PC2', type: 'pc', label: 'HR-PC', x: 35, y: 90, ip: 'VLAN 20: 10.20.20.20' },
            { id: 'PC3', type: 'pc', label: 'IT-PC', x: 65, y: 90, ip: 'VLAN 30: 10.30.30.30' },
            { id: 'SRV1', type: 'server', label: 'Server', x: 85, y: 90, ip: 'VLAN 100: 10.100.100.10' }
        ],
        connections: [
            { from: 'R1', to: 'SW1', label: 'Trunk (Dot1Q)' },
            { from: 'SW1', to: 'SW2', label: 'Trunk' },
            { from: 'SW1', to: 'SW3', label: 'Trunk' },
            { from: 'SW2', to: 'PC1', label: 'Access VLAN 10' },
            { from: 'SW2', to: 'PC2', label: 'Access VLAN 20' },
            { from: 'SW3', to: 'PC3', label: 'Access VLAN 30' },
            { from: 'SW3', to: 'SRV1', label: 'Access VLAN 100' }
        ],
        configs: {
            'R1': `hostname R1-ROAS
! Router-on-a-Stick Configuration
!
interface GigabitEthernet0/0
 no ip address
 no shutdown
!
interface GigabitEthernet0/0.10
 description VLAN 10 - Sales
 encapsulation dot1Q 10
 ip address 10.10.10.1 255.255.255.0
!
interface GigabitEthernet0/0.20
 description VLAN 20 - HR
 encapsulation dot1Q 20
 ip address 10.20.20.1 255.255.255.0
!
interface GigabitEthernet0/0.30
 description VLAN 30 - IT
 encapsulation dot1Q 30
 ip address 10.30.30.1 255.255.255.0
!
interface GigabitEthernet0/0.100
 description VLAN 100 - Servers
 encapsulation dot1Q 100
 ip address 10.100.100.1 255.255.255.0
!
! DHCP Pools for each VLAN
ip dhcp pool VLAN10
 network 10.10.10.0 255.255.255.0
 default-router 10.10.10.1
 dns-server 8.8.8.8`,
            'SW1': `hostname SW1-Core
!
vtp mode server
vtp domain CCNA_LAB
!
vlan 10
 name SALES
vlan 20
 name HR
vlan 30
 name IT
vlan 100
 name SERVERS
!
interface GigabitEthernet0/1
 description Trunk to Router
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,100
!
interface GigabitEthernet0/2
 description Trunk to SW2
 switchport trunk encapsulation dot1q
 switchport mode trunk
!
interface GigabitEthernet0/3
 description Trunk to SW3
 switchport trunk encapsulation dot1q
 switchport mode trunk
!
spanning-tree mode rapid-pvst
spanning-tree vlan 1-100 root primary`,
            'SW2': `hostname SW2-Access
!
vtp mode client
vtp domain CCNA_LAB
!
interface FastEthernet0/1
 description Sales-PC
 switchport mode access
 switchport access vlan 10
 spanning-tree portfast
 spanning-tree bpduguard enable
!
interface FastEthernet0/2
 description HR-PC
 switchport mode access
 switchport access vlan 20
 spanning-tree portfast
 spanning-tree bpduguard enable
!
interface GigabitEthernet0/1
 description Trunk to SW1
 switchport trunk encapsulation dot1q
 switchport mode trunk`,
            'SW3': `hostname SW3-Access
!
vtp mode client
vtp domain CCNA_LAB
!
interface FastEthernet0/1
 description IT-PC
 switchport mode access
 switchport access vlan 30
 spanning-tree portfast
!
interface FastEthernet0/2
 description Server
 switchport mode access
 switchport access vlan 100
!
interface GigabitEthernet0/1
 description Trunk to SW1
 switchport trunk encapsulation dot1q
 switchport mode trunk`,
            'PC1': `# Sales PC Configuration
# VLAN 10 - Sales Department
# IP: 10.10.10.10/24 (DHCP)
# Gateway: 10.10.10.1

$ ping 10.10.10.1
PING 10.10.10.1: 64 bytes icmp_seq=1 ttl=255 time=1ms
! Can ping default gateway`,
            'PC2': `# HR PC Configuration
# VLAN 20 - HR Department
# IP: 10.20.20.20/24 (DHCP)
# Gateway: 10.20.20.1

$ ping 10.10.10.10
PING 10.10.10.10: 64 bytes icmp_seq=1 ttl=254 time=3ms
! Inter-VLAN routing works!`,
            'PC3': `# IT PC Configuration
# VLAN 30 - IT Department
# IP: 10.30.30.30/24 (Static)
# Gateway: 10.30.30.1

$ traceroute 10.100.100.10
1  10.30.30.1  1ms
2  10.100.100.10  2ms
! Traffic routed through R1`,
            'SRV1': `# Server Configuration
# VLAN 100 - Server Farm
# IP: 10.100.100.10/24
# Gateway: 10.100.100.1
# Services: HTTP, HTTPS, DNS

$ netstat -tlnp
tcp  0.0.0.0:80   LISTEN  httpd
tcp  0.0.0.0:443  LISTEN  httpd
tcp  0.0.0.0:53   LISTEN  named`
        }
    },
    'static-routing': {
        name: 'Static Routing',
        description: 'Multi-router topology with static routes and floating static backup',
        devices: [
            { id: 'R1', type: 'router', label: 'R1 (HQ)', x: 20, y: 50, ip: '10.0.0.1' },
            { id: 'R2', type: 'router', label: 'R2 (Core)', x: 50, y: 30, ip: '10.0.0.2' },
            { id: 'R3', type: 'router', label: 'R3 (Branch)', x: 80, y: 50, ip: '10.0.0.5' },
            { id: 'R4', type: 'router', label: 'R4 (Backup)', x: 50, y: 70, ip: '10.0.0.9' },
            { id: 'PC1', type: 'pc', label: 'HQ-PC', x: 10, y: 75, ip: '192.168.1.10/24' },
            { id: 'PC2', type: 'pc', label: 'Branch-PC', x: 90, y: 75, ip: '192.168.2.10/24' }
        ],
        connections: [
            { from: 'R1', to: 'R2', label: '10.0.0.0/30' },
            { from: 'R2', to: 'R3', label: '10.0.0.4/30' },
            { from: 'R1', to: 'R4', label: '10.0.0.8/30 (Backup)' },
            { from: 'R4', to: 'R3', label: '10.0.0.12/30 (Backup)' },
            { from: 'R1', to: 'PC1', label: 'LAN' },
            { from: 'R3', to: 'PC2', label: 'LAN' }
        ],
        configs: {
            'R1': `hostname R1-HQ
!
interface GigabitEthernet0/0
 description LAN - HQ Network
 ip address 192.168.1.1 255.255.255.0
 no shutdown
!
interface GigabitEthernet0/1
 description WAN to R2 (Primary)
 ip address 10.0.0.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2
 description WAN to R4 (Backup)
 ip address 10.0.0.9 255.255.255.252
 no shutdown
!
! Static route to Branch via Primary path
ip route 192.168.2.0 255.255.255.0 10.0.0.2
!
! Floating static route via Backup path (AD 210)
ip route 192.168.2.0 255.255.255.0 10.0.0.10 210
!
! Show routing table command:
! show ip route
!   S    192.168.2.0/24 [1/0] via 10.0.0.2`,
            'R2': `hostname R2-Core
!
interface GigabitEthernet0/0
 description WAN to R1-HQ
 ip address 10.0.0.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description WAN to R3-Branch
 ip address 10.0.0.5 255.255.255.252
 no shutdown
!
! Static routes
ip route 192.168.1.0 255.255.255.0 10.0.0.1
ip route 192.168.2.0 255.255.255.0 10.0.0.6`,
            'R3': `hostname R3-Branch
!
interface GigabitEthernet0/0
 description LAN - Branch Network
 ip address 192.168.2.1 255.255.255.0
 no shutdown
!
interface GigabitEthernet0/1
 description WAN to R2 (Primary)
 ip address 10.0.0.6 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2
 description WAN to R4 (Backup)
 ip address 10.0.0.13 255.255.255.252
 no shutdown
!
! Static route to HQ via Primary
ip route 192.168.1.0 255.255.255.0 10.0.0.5
!
! Floating static via Backup (AD 210)  
ip route 192.168.1.0 255.255.255.0 10.0.0.14 210`,
            'R4': `hostname R4-Backup
!
interface GigabitEthernet0/0
 description WAN to R1
 ip address 10.0.0.10 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 description WAN to R3
 ip address 10.0.0.14 255.255.255.252
 no shutdown
!
! Transit routes for backup path
ip route 192.168.1.0 255.255.255.0 10.0.0.9
ip route 192.168.2.0 255.255.255.0 10.0.0.13`,
            'PC1': `# HQ PC Configuration
# Network: 192.168.1.0/24
# Gateway: 192.168.1.1

$ traceroute 192.168.2.10
1  192.168.1.1   1ms (R1)
2  10.0.0.2      2ms (R2)
3  10.0.0.6      3ms (R3)
4  192.168.2.10  4ms (PC2)

! Primary path: R1 -> R2 -> R3`,
            'PC2': `# Branch PC Configuration  
# Network: 192.168.2.0/24
# Gateway: 192.168.2.1

$ ping 192.168.1.10
PING 192.168.1.10: 64 bytes icmp_seq=1 ttl=253 time=4ms

! Connectivity to HQ confirmed`
        }
    },
    'ospf': {
        name: 'OSPF Configuration',
        description: 'Multi-area OSPF with Area 0 backbone and stub areas',
        devices: [
            { id: 'R1', type: 'router', label: 'R1 (ABR)', x: 50, y: 25, ip: 'Area 0/1 Border' },
            { id: 'R2', type: 'router', label: 'R2 (Backbone)', x: 30, y: 50, ip: 'Area 0' },
            { id: 'R3', type: 'router', label: 'R3 (Backbone)', x: 70, y: 50, ip: 'Area 0' },
            { id: 'R4', type: 'router', label: 'R4 (Area 1)', x: 50, y: 75, ip: 'Area 1' },
            { id: 'SW1', type: 'switch', label: 'SW1', x: 15, y: 75, ip: '10.1.1.0/24' },
            { id: 'SW2', type: 'switch', label: 'SW2', x: 85, y: 75, ip: '10.2.2.0/24' }
        ],
        connections: [
            { from: 'R1', to: 'R2', label: 'Area 0' },
            { from: 'R1', to: 'R3', label: 'Area 0' },
            { from: 'R2', to: 'R3', label: 'Area 0' },
            { from: 'R1', to: 'R4', label: 'Area 1' },
            { from: 'R2', to: 'SW1', label: 'LAN' },
            { from: 'R3', to: 'SW2', label: 'LAN' }
        ],
        configs: {
            'R1': `hostname R1-ABR
! Area Border Router - Connects Area 0 and Area 1
!
interface Loopback0
 ip address 1.1.1.1 255.255.255.255
 ip ospf 1 area 0
!
interface GigabitEthernet0/0
 description Link to R2 (Area 0)
 ip address 10.0.12.1 255.255.255.252
 ip ospf 1 area 0
 ip ospf network point-to-point
 no shutdown
!
interface GigabitEthernet0/1
 description Link to R3 (Area 0)
 ip address 10.0.13.1 255.255.255.252
 ip ospf 1 area 0
 ip ospf network point-to-point
 no shutdown
!
interface GigabitEthernet0/2
 description Link to R4 (Area 1)
 ip address 10.0.14.1 255.255.255.252
 ip ospf 1 area 1
 no shutdown
!
router ospf 1
 router-id 1.1.1.1
 auto-cost reference-bandwidth 10000
 area 1 stub
!
! show ip ospf neighbor
! show ip ospf database`,
            'R2': `hostname R2-Backbone
!
interface Loopback0
 ip address 2.2.2.2 255.255.255.255
!
interface GigabitEthernet0/0
 description Link to R1
 ip address 10.0.12.2 255.255.255.252
 ip ospf 1 area 0
 ip ospf network point-to-point
 no shutdown
!
interface GigabitEthernet0/1
 description Link to R3
 ip address 10.0.23.2 255.255.255.252
 ip ospf 1 area 0
 no shutdown
!
interface GigabitEthernet0/2
 description LAN
 ip address 10.1.1.1 255.255.255.0
 ip ospf 1 area 0
 no shutdown
!
router ospf 1
 router-id 2.2.2.2
 auto-cost reference-bandwidth 10000
 passive-interface GigabitEthernet0/2`,
            'R3': `hostname R3-Backbone
!
interface Loopback0
 ip address 3.3.3.3 255.255.255.255
!
interface GigabitEthernet0/0
 description Link to R1
 ip address 10.0.13.2 255.255.255.252
 ip ospf 1 area 0
 ip ospf network point-to-point
 no shutdown
!
interface GigabitEthernet0/1
 description Link to R2
 ip address 10.0.23.3 255.255.255.252
 ip ospf 1 area 0
 no shutdown
!
interface GigabitEthernet0/2
 description LAN
 ip address 10.2.2.1 255.255.255.0
 ip ospf 1 area 0
 no shutdown
!
router ospf 1
 router-id 3.3.3.3
 auto-cost reference-bandwidth 10000
 passive-interface GigabitEthernet0/2`,
            'R4': `hostname R4-Area1
! Stub Area Router
!
interface Loopback0
 ip address 4.4.4.4 255.255.255.255
!
interface GigabitEthernet0/0
 description Link to R1 (ABR)
 ip address 10.0.14.2 255.255.255.252
 ip ospf 1 area 1
 no shutdown
!
interface GigabitEthernet0/1
 description LAN
 ip address 10.4.4.1 255.255.255.0
 ip ospf 1 area 1
 no shutdown
!
router ospf 1
 router-id 4.4.4.4
 area 1 stub
!
! In stub area, receives default route from ABR
! show ip route ospf
!   O*IA 0.0.0.0/0 [110/11] via 10.0.14.1`,
            'SW1': `! SW1 - Connected to R2
! Network: 10.1.1.0/24
! Gateway: 10.1.1.1

interface Vlan1
 ip address 10.1.1.2 255.255.255.0
 no shutdown
!
ip default-gateway 10.1.1.1`,
            'SW2': `! SW2 - Connected to R3
! Network: 10.2.2.0/24
! Gateway: 10.2.2.1

interface Vlan1
 ip address 10.2.2.2 255.255.255.0
 no shutdown
!
ip default-gateway 10.2.2.1`
        }
    },
    'acl': {
        name: 'Access Control Lists',
        description: 'Standard and Extended ACLs for traffic filtering',
        devices: [
            { id: 'R1', type: 'router', label: 'R1 (Edge)', x: 50, y: 20, ip: '203.0.113.1 (Public)' },
            { id: 'FW', type: 'firewall', label: 'Firewall', x: 50, y: 45, ip: 'ACL Applied' },
            { id: 'SW1', type: 'switch', label: 'SW1', x: 50, y: 70, ip: '10.0.0.0/24' },
            { id: 'PC1', type: 'pc', label: 'Admin-PC', x: 25, y: 90, ip: '10.0.0.10 (Permitted)' },
            { id: 'PC2', type: 'pc', label: 'Guest-PC', x: 50, y: 90, ip: '10.0.0.50 (Restricted)' },
            { id: 'SRV1', type: 'server', label: 'Web Server', x: 75, y: 90, ip: '10.0.0.100 (Protected)' }
        ],
        connections: [
            { from: 'R1', to: 'FW', label: 'WAN' },
            { from: 'FW', to: 'SW1', label: 'LAN' },
            { from: 'SW1', to: 'PC1', label: 'Admin VLAN' },
            { from: 'SW1', to: 'PC2', label: 'Guest VLAN' },
            { from: 'SW1', to: 'SRV1', label: 'Server VLAN' }
        ],
        configs: {
            'R1': `hostname R1-Edge
!
interface GigabitEthernet0/0
 description WAN - Internet
 ip address 203.0.113.1 255.255.255.0
 no shutdown
!
interface GigabitEthernet0/1
 description To Firewall
 ip address 10.0.0.1 255.255.255.0
 no shutdown
!
! Extended ACL - Block specific traffic
ip access-list extended INTERNET-INBOUND
 deny   tcp any any eq 23 log
 deny   tcp any any eq 22 log
 permit tcp any host 10.0.0.100 eq 80
 permit tcp any host 10.0.0.100 eq 443
 deny   ip any 10.0.0.0 0.0.0.255
 permit ip any any
!
interface GigabitEthernet0/0
 ip access-group INTERNET-INBOUND in`,
            'FW': `hostname Firewall
! ACL Configuration Example
!
interface GigabitEthernet0/0
 description To R1
 ip address 10.0.0.2 255.255.255.0
 no shutdown
!
interface GigabitEthernet0/1
 description To Internal Network
 ip address 10.0.1.1 255.255.255.0
 no shutdown
!
! Standard ACL - Restrict VTY access
access-list 10 permit 10.0.0.10
access-list 10 deny any log
!
line vty 0 4
 access-class 10 in
 login local
 transport input ssh
!
! Extended ACL - Permit only HTTP/HTTPS to server
ip access-list extended TO-SERVER
 permit tcp 10.0.0.0 0.0.0.255 host 10.0.0.100 eq 80
 permit tcp 10.0.0.0 0.0.0.255 host 10.0.0.100 eq 443
 deny   ip any host 10.0.0.100 log
 permit ip any any
!
! Show ACL hits
! show access-lists`,
            'SW1': `hostname SW1
!
vlan 10
 name ADMIN
vlan 20
 name GUEST
vlan 100
 name SERVERS
!
interface FastEthernet0/1
 switchport access vlan 10
 switchport mode access
!
interface FastEthernet0/2
 switchport access vlan 20
 switchport mode access
!
interface FastEthernet0/3
 switchport access vlan 100
 switchport mode access`,
            'PC1': `# Admin PC - Full Access
# IP: 10.0.0.10/24
# This PC can SSH to network devices

$ ssh admin@10.0.0.2
Password: ********
Firewall> ! Access granted

# Admin is in ACL 10 permit list`,
            'PC2': `# Guest PC - Restricted
# IP: 10.0.0.50/24

$ ssh admin@10.0.0.2
Connection refused

$ curl http://10.0.0.100
<html>Welcome to Web Server</html>
# HTTP access works (permitted by ACL)`,
            'SRV1': `# Web Server
# IP: 10.0.0.100/24
# Services: HTTP (80), HTTPS (443)

# Protected by ACL - only web traffic allowed
# SSH/Telnet blocked from outside

Active Services:
- Apache HTTP Server (Port 80)
- Apache HTTPS Server (Port 443)

$ netstat -tlnp
tcp  0.0.0.0:80   LISTEN
tcp  0.0.0.0:443  LISTEN`
        }
    },
    'nat': {
        name: 'NAT Configuration',
        description: 'Static NAT, Dynamic NAT, and PAT (NAT Overload)',
        devices: [
            { id: 'ISP', type: 'router', label: 'ISP Router', x: 80, y: 25, ip: '203.0.113.1' },
            { id: 'R1', type: 'router', label: 'R1 (NAT)', x: 50, y: 50, ip: 'Inside: 10.0.0.1' },
            { id: 'SW1', type: 'switch', label: 'SW1', x: 25, y: 75, ip: '10.0.0.0/24' },
            { id: 'PC1', type: 'pc', label: 'PC1', x: 10, y: 90, ip: '10.0.0.10' },
            { id: 'PC2', type: 'pc', label: 'PC2', x: 25, y: 90, ip: '10.0.0.11' },
            { id: 'SRV1', type: 'server', label: 'Web Server', x: 40, y: 90, ip: '10.0.0.100 → 203.0.113.100' }
        ],
        connections: [
            { from: 'R1', to: 'ISP', label: 'Outside (NAT)' },
            { from: 'R1', to: 'SW1', label: 'Inside' },
            { from: 'SW1', to: 'PC1', label: 'LAN' },
            { from: 'SW1', to: 'PC2', label: 'LAN' },
            { from: 'SW1', to: 'SRV1', label: 'LAN' }
        ],
        configs: {
            'ISP': `hostname ISP-Router
!
interface GigabitEthernet0/0
 description To Customer R1
 ip address 203.0.113.1 255.255.255.0
 no shutdown
!
! ISP sees translated addresses only
! 203.0.113.10 (R1 outside interface)
! 203.0.113.100 (Static NAT for web server)`,
            'R1': `hostname R1-NAT
!
interface GigabitEthernet0/0
 description WAN - Outside
 ip address 203.0.113.10 255.255.255.0
 ip nat outside
 no shutdown
!
interface GigabitEthernet0/1
 description LAN - Inside
 ip address 10.0.0.1 255.255.255.0
 ip nat inside
 no shutdown
!
! ========== STATIC NAT ==========
! One-to-one mapping for web server
ip nat inside source static 10.0.0.100 203.0.113.100
!
! ========== PAT (NAT Overload) ==========
! Many-to-one for all other hosts
access-list 1 permit 10.0.0.0 0.0.0.255
ip nat inside source list 1 interface GigabitEthernet0/0 overload
!
! ========== Verification ==========
! show ip nat translations
! Pro  Inside global    Inside local    Outside local   Outside global
! tcp  203.0.113.10:1024 10.0.0.10:1024 8.8.8.8:80     8.8.8.8:80
! ---  203.0.113.100    10.0.0.100      ---            ---
!
! show ip nat statistics
! Total active translations: 15`,
            'SW1': `hostname SW1
!
interface Vlan1
 ip address 10.0.0.2 255.255.255.0
 no shutdown
!
ip default-gateway 10.0.0.1`,
            'PC1': `# PC1 - Uses PAT
# Private IP: 10.0.0.10
# Translated to: 203.0.113.10:random_port

$ curl http://example.com
! Source translated to 203.0.113.10:50001
! Multiple PCs share same public IP

$ ip addr
    inet 10.0.0.10/24`,
            'PC2': `# PC2 - Uses PAT
# Private IP: 10.0.0.11
# Translated to: 203.0.113.10:random_port

$ wget http://google.com
! Source translated to 203.0.113.10:50002
! Different port than PC1

$ ip route
    default via 10.0.0.1`,
            'SRV1': `# Web Server - Static NAT
# Private IP: 10.0.0.100
# Public IP: 203.0.113.100

# Accessible from Internet at 203.0.113.100
# Static NAT provides consistent public address

$ netstat -tlnp
tcp 0.0.0.0:80  LISTEN httpd
tcp 0.0.0.0:443 LISTEN httpd

# Internet users access:
# http://203.0.113.100 → 10.0.0.100:80`
        }
    }
};

// Device type icons (emoji or SVG can be used)
const deviceIcons = {
    router: '🔀',
    switch: '🔲',
    pc: '💻',
    server: '🖥️',
    firewall: '🛡️'
};

// Currently selected device
let selectedDevice = null;
let currentScenario = 'basic-topology';

// Initialize the lab
function initLab() {
    loadScenario(currentScenario);
    setupScenarioButtons();
}

// Set up scenario selection buttons
function setupScenarioButtons() {
    const buttons = document.querySelectorAll('.scenario-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const scenario = btn.dataset.scenario;
            if (scenario && labScenarios[scenario]) {
                // Update active button
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Load the scenario
                loadScenario(scenario);
            }
        });
    });
}

// Load a lab scenario
function loadScenario(scenarioId) {
    const scenario = labScenarios[scenarioId];
    if (!scenario) return;

    currentScenario = scenarioId;
    selectedDevice = null;

    // Update header
    document.getElementById('labTitle').textContent = scenario.name;
    document.getElementById('labDescription').textContent = scenario.description;

    // Clear and redraw
    const devicesLayer = document.getElementById('devicesLayer');
    const topologySvg = document.getElementById('topologySvg');

    devicesLayer.innerHTML = '';

    // Clear existing lines (keep defs)
    const existingLines = topologySvg.querySelectorAll('line');
    existingLines.forEach(line => line.remove());

    // Draw devices
    scenario.devices.forEach(device => {
        const deviceEl = createDeviceElement(device);
        devicesLayer.appendChild(deviceEl);
    });

    // Draw connections after devices are placed
    setTimeout(() => {
        drawConnections(scenario);
    }, 50);

    // Reset console
    resetConsole();
    resetDeviceInfo();
}

// Create a device element
function createDeviceElement(device) {
    const el = document.createElement('div');
    el.className = `lab-device ${device.type}`;
    el.id = `device-${device.id}`;
    el.style.left = `${device.x}%`;
    el.style.top = `${device.y}%`;
    el.style.transform = 'translate(-50%, -50%)';

    el.innerHTML = `
        <div class="lab-device-icon">${deviceIcons[device.type] || '📦'}</div>
        <div class="lab-device-label">${device.label}</div>
        <div class="lab-device-ip">${device.ip}</div>
    `;

    el.addEventListener('click', () => selectDevice(device));

    return el;
}

// Draw connections between devices
function drawConnections(scenario) {
    const svg = document.getElementById('topologySvg');
    const canvas = document.getElementById('networkCanvas');
    const canvasRect = canvas.getBoundingClientRect();

    scenario.connections.forEach(conn => {
        const fromEl = document.getElementById(`device-${conn.from}`);
        const toEl = document.getElementById(`device-${conn.to}`);

        if (fromEl && toEl) {
            const fromRect = fromEl.getBoundingClientRect();
            const toRect = toEl.getBoundingClientRect();

            // Calculate center points relative to canvas
            const x1 = ((fromRect.left + fromRect.width / 2) - canvasRect.left) / canvasRect.width * 100;
            const y1 = ((fromRect.top + fromRect.height / 2) - canvasRect.top) / canvasRect.height * 100;
            const x2 = ((toRect.left + toRect.width / 2) - canvasRect.left) / canvasRect.width * 100;
            const y2 = ((toRect.top + toRect.height / 2) - canvasRect.top) / canvasRect.height * 100;

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', `${x1}%`);
            line.setAttribute('y1', `${y1}%`);
            line.setAttribute('x2', `${x2}%`);
            line.setAttribute('y2', `${y2}%`);
            line.classList.add('connection-line');

            svg.appendChild(line);
        }
    });
}

// Select a device
function selectDevice(device) {
    // Remove previous selection
    document.querySelectorAll('.lab-device.selected').forEach(el => {
        el.classList.remove('selected');
    });

    // Select new device
    const deviceEl = document.getElementById(`device-${device.id}`);
    if (deviceEl) {
        deviceEl.classList.add('selected');
    }

    selectedDevice = device;

    // Update device info panel
    updateDeviceInfo(device);

    // Update console
    updateConsole(device);
}

// Update device info panel
function updateDeviceInfo(device) {
    const infoPanel = document.getElementById('deviceInfo');
    const scenario = labScenarios[currentScenario];

    infoPanel.innerHTML = `
        <h3>${deviceIcons[device.type]} ${device.label}</h3>
        <div class="device-details">
            <div class="detail-item">
                <span class="detail-label">Type</span>
                <span class="detail-value">${device.type.charAt(0).toUpperCase() + device.type.slice(1)}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">IP Address</span>
                <span class="detail-value">${device.ip}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Scenario</span>
                <span class="detail-value">${scenario.name}</span>
            </div>
        </div>
        <p style="margin-top: 1rem; font-size: 0.8rem; color: var(--text-muted);">
            View the configuration in the console below
        </p>
    `;
}

// Update console with device config
function updateConsole(device) {
    const scenario = labScenarios[currentScenario];
    const config = scenario.configs[device.id] || '! No configuration available';

    document.getElementById('consoleDevice').textContent = device.label;
    document.getElementById('configOutput').innerHTML = '';

    // If CLI module is loaded, enable interactive CLI
    if (typeof enableCLI === 'function') {
        enableCLI(device);
    } else {
        // Fallback to static config display
        document.getElementById('configOutput').textContent = config;
    }
}

// Reset console to default state
function resetConsole() {
    document.getElementById('consoleDevice').textContent = 'No device selected';
    document.getElementById('configOutput').textContent = `! Click on a device to view its configuration
! 
! Available scenarios:
! - Basic Network Topology
! - VLAN Configuration
! - Static Routing
! - OSPF Configuration
! - Access Control Lists
! - NAT Configuration
!`;
}

// Reset device info panel
function resetDeviceInfo() {
    document.getElementById('deviceInfo').innerHTML = `
        <h3>Select a Device</h3>
        <p class="info-placeholder">Click on any device in the topology to view its configuration</p>
    `;
}

// Load scenario from quiz question
function loadLabFromQuiz(scenarioId) {
    if (labScenarios[scenarioId]) {
        // Switch to lab view
        switchView('lab');

        // Update active scenario button
        document.querySelectorAll('.scenario-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.scenario === scenarioId);
        });

        // Load the scenario
        loadScenario(scenarioId);

        // Show toast
        showToast(`Loaded lab: ${labScenarios[scenarioId].name}`, 'info');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initLab);
