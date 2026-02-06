// ============================================
// CCNA Master - Interactive CLI Simulator
// Type real Cisco commands!
// ============================================

// CLI State
const cliState = {
    currentDevice: null,
    mode: 'user',  // user, privileged, config, config-if, config-line, config-router
    hostname: 'Router',
    history: [],
    historyIndex: -1,
    runningConfig: {}
};

// Command definitions with validation
// Includes full commands AND Cisco abbreviations (Packet Tracer compatible)
const commands = {
    user: {
        'enable': { action: 'goPrivileged', help: 'Enter privileged EXEC mode' },
        'en': { action: 'goPrivileged', help: 'Enable (shortcut)' },
        'e': { action: 'goPrivileged', help: 'Enable (shortest shortcut)' },
        'ping': { action: 'ping', help: 'Send ICMP echo', hasArg: true },
        'traceroute': { action: 'traceroute', help: 'Trace route to destination', hasArg: true },
        'tracert': { action: 'traceroute', help: 'Trace route (shortcut)', hasArg: true },
        'trace': { action: 'traceroute', help: 'Trace route (shortcut)', hasArg: true },
        'show version': { action: 'showVersion', help: 'Display system version' },
        'sh ver': { action: 'showVersion', help: 'Show version (shortcut)' },
        'sh v': { action: 'showVersion', help: 'Show version (shortest)' },
        'show ip interface brief': { action: 'showIpIntBrief', help: 'Show interface status summary' },
        'sh ip int br': { action: 'showIpIntBrief', help: 'Show IP interface brief (shortcut)' },
        'sh ip int b': { action: 'showIpIntBrief', help: 'Show IP interface brief (shortest)' },
        'show interfaces': { action: 'showInterfaces', help: 'Show all interfaces' },
        'sh int': { action: 'showInterfaces', help: 'Show interfaces (shortcut)' },
        'sh ip interface': { action: 'showIpIntBrief', help: 'Show IP interfaces' },
        'sh ip int': { action: 'showIpIntBrief', help: 'Show IP interfaces (shortcut)' },
        'exit': { action: 'exit', help: 'Exit the CLI' },
        'e': { action: 'exit', help: 'Exit (shortcut)' },
        'ex': { action: 'exit', help: 'Exit (shortcut)' },
        'logout': { action: 'exit', help: 'Exit the CLI' },
        'log': { action: 'exit', help: 'Logout (shortcut)' },
        '?': { action: 'showHelp', help: 'Show available commands' },
        'help': { action: 'showHelp', help: 'Show available commands' }
    },
    privileged: {
        'configure terminal': { action: 'goConfig', help: 'Enter configuration mode' },
        'conf t': { action: 'goConfig', help: 'Configure terminal (shortcut)' },
        'conf term': { action: 'goConfig', help: 'Configure terminal (shortcut)' },
        'config t': { action: 'goConfig', help: 'Configure terminal (shortcut)' },
        'conf': { action: 'goConfig', help: 'Configure (shortest)' },
        'cf': { action: 'goConfig', help: 'Configure (Packet Tracer shortcut)' },
        'configure': { action: 'goConfig', help: 'Configure (full)' },
        'show running-config': { action: 'showRunConfig', help: 'Show running configuration' },
        'show run': { action: 'showRunConfig', help: 'Show run (shortcut)' },
        'sh run': { action: 'showRunConfig', help: 'Show run (shortcut)' },
        'sh r': { action: 'showRunConfig', help: 'Show run (shortest)' },
        'sh running-config': { action: 'showRunConfig', help: 'Show running-config (shortcut)' },
        'show startup-config': { action: 'showStartConfig', help: 'Show startup configuration' },
        'sh start': { action: 'showStartConfig', help: 'Show startup (shortcut)' },
        'sh s': { action: 'showStartConfig', help: 'Show startup (shortest)' },
        'show ip route': { action: 'showIpRoute', help: 'Show IP routing table' },
        'sh ip ro': { action: 'showIpRoute', help: 'Show IP route (shortcut)' },
        'sh ip r': { action: 'showIpRoute', help: 'Show IP route (shortest)' },
        'sh ip route': { action: 'showIpRoute', help: 'Show IP route (shortcut)' },
        'show vlan brief': { action: 'showVlanBrief', help: 'Show VLAN summary' },
        'sh vlan br': { action: 'showVlanBrief', help: 'Show VLAN brief (shortcut)' },
        'sh vlan b': { action: 'showVlanBrief', help: 'Show VLAN brief (shortest)' },
        'sh vlan': { action: 'showVlanBrief', help: 'Show VLAN (shortcut)' },
        'show vl': { action: 'showVlanBrief', help: 'Show VLAN (shorter)' },
        'show interfaces trunk': { action: 'showIntTrunk', help: 'Show trunk interfaces' },
        'sh int trunk': { action: 'showIntTrunk', help: 'Show interfaces trunk (shortcut)' },
        'sh int t': { action: 'showIntTrunk', help: 'Show interfaces trunk (shortest)' },
        'sh int tr': { action: 'showIntTrunk', help: 'Show interfaces trunk (shortcut)' },
        'show ip ospf neighbor': { action: 'showOspfNeigh', help: 'Show OSPF neighbors' },
        'sh ip ospf n': { action: 'showOspfNeigh', help: 'Show OSPF neighbor (shortcut)' },
        'sh ip o n': { action: 'showOspfNeigh', help: 'Show OSPF neighbor (shortest)' },
        'sh ip ospf nei': { action: 'showOspfNeigh', help: 'Show OSPF neighbor (shortcut)' },
        'sh ip ospf neighbor': { action: 'showOspfNeigh', help: 'Show OSPF neighbor (shortcut)' },
        'show ip ospf interface': { action: 'showOspfInt', help: 'Show OSPF interfaces' },
        'sh ip ospf int': { action: 'showOspfInt', help: 'Show OSPF interfaces (shortcut)' },
        'show ip ospf database': { action: 'showOspfDb', help: 'Show OSPF database' },
        'sh ip ospf db': { action: 'showOspfDb', help: 'Show OSPF DB (shortcut)' },
        'show ip eigrp neighbors': { action: 'showEigrpNeigh', help: 'Show EIGRP neighbors' },
        'sh ip eig n': { action: 'showEigrpNeigh', help: 'Show EIGRP neighbors (shortcut)' },
        'show ip eigrp topology': { action: 'showEigrpTopo', help: 'Show EIGRP topology' },
        'sh ip eig t': { action: 'showEigrpTopo', help: 'Show EIGRP topology (shortcut)' },
        'show mac address-table': { action: 'showMacTable', help: 'Show MAC address table' },
        'sh mac a': { action: 'showMacTable', help: 'Show MAC address-table (shortcut)' },
        'sh mac': { action: 'showMacTable', help: 'Show MAC (shortest)' },
        'show ip nat translations': { action: 'showNatTrans', help: 'Show NAT translations' },
        'sh ip n t': { action: 'showNatTrans', help: 'Show NAT translations (shortcut)' },
        'sh ip nat tr': { action: 'showNatTrans', help: 'Show NAT translations (shortcut)' },
        'show ip nat statistics': { action: 'showNatStats', help: 'Show NAT statistics' },
        'sh ip n s': { action: 'showNatStats', help: 'Show NAT stats (shortcut)' },
        'show access-lists': { action: 'showAcl', help: 'Show access lists' },
        'sh access-lists': { action: 'showAcl', help: 'Show access-lists (shortcut)' },
        'sh access-l': { action: 'showAcl', help: 'Show access-lists (shortcut)' },
        'sh ip access-lists': { action: 'showIpAcl', help: 'Show IP access-lists' },
        'sh ip ac': { action: 'showIpAcl', help: 'Show IP access-lists (shortcut)' },
        'show ip interface brief': { action: 'showIpIntBrief', help: 'Show interface status summary' },
        'sh ip int br': { action: 'showIpIntBrief', help: 'Show IP interface brief (shortcut)' },
        'sh ip int b': { action: 'showIpIntBrief', help: 'Show IP interface brief (shortest)' },
        'sh ip int brief': { action: 'showIpIntBrief', help: 'Show IP interface brief (shortcut)' },
        'show spanning-tree': { action: 'showSpanningTree', help: 'Show spanning tree' },
        'sh sp': { action: 'showSpanningTree', help: 'Show spanning-tree (shortcut)' },
        'sh span': { action: 'showSpanningTree', help: 'Show spanning-tree (shortcut)' },
        'show spanning-tree detail': { action: 'showSpanningTreeDetail', help: 'Show STP details' },
        'sh s d': { action: 'showSpanningTreeDetail', help: 'Show STP detail (shortcut)' },
        'show protocols': { action: 'showProtocols', help: 'Show protocols' },
        'sh pr': { action: 'showProtocols', help: 'Show protocols (shortcut)' },
        'show cdp neighbors': { action: 'showCdpNeighbors', help: 'Show CDP neighbors' },
        'sh cdp n': { action: 'showCdpNeighbors', help: 'Show CDP neighbors (shortcut)' },
        'show cdp neighbors detail': { action: 'showCdpNeighborsDetail', help: 'Show CDP neighbors detail' },
        'sh cdp n d': { action: 'showCdpNeighborsDetail', help: 'Show CDP detail (shortcut)' },
        'show ip interface': { action: 'showIpInterface', help: 'Show IP interface details' },
        'sh ip int': { action: 'showIpInterface', help: 'Show IP interface (shortcut)' },
        'show controllers': { action: 'showControllers', help: 'Show controller info' },
        'sh con': { action: 'showControllers', help: 'Show controllers (shortcut)' },
        'copy running-config startup-config': { action: 'saveConfig', help: 'Save configuration' },
        'copy run start': { action: 'saveConfig', help: 'Copy run start (shortcut)' },
        'wr': { action: 'saveConfig', help: 'Write memory (shortcut)' },
        'wr mem': { action: 'saveConfig', help: 'Write memory (shortcut)' },
        'wri m': { action: 'saveConfig', help: 'Write memory (shorter)' },
        'write': { action: 'saveConfig', help: 'Write memory' },
        'write memory': { action: 'saveConfig', help: 'Save configuration' },
        'write terminal': { action: 'showRunConfig', help: 'Write terminal (show run)' },
        'copy running-config startup-config': { action: 'saveConfig', help: 'Save config (full)' },
        'erase startup-config': { action: 'eraseConfig', help: 'Erase startup config' },
        'erase s': { action: 'eraseConfig', help: 'Erase startup (shortcut)' },
        'reload': { action: 'reload', help: 'Reload the device' },
        'disable': { action: 'goUser', help: 'Return to user mode' },
        'dis': { action: 'goUser', help: 'Disable (shortcut)' },
        'd': { action: 'goUser', help: 'Disable (shortest)' },
        'exit': { action: 'goUser', help: 'Return to user mode' },
        'e': { action: 'goUser', help: 'Exit (shortcut)' },
        'end': { action: 'goPrivileged', help: 'Exit to privileged mode' },
        'clear': { action: 'clearScreen', help: 'Clear terminal screen' },
        'clear line': { action: 'clearLine', help: 'Clear line', hasArg: true },
        'terminal monitor': { action: 'termMonitor', help: 'Enable terminal monitoring' },
        'term mon': { action: 'termMonitor', help: 'Terminal monitor (shortcut)' },
        'terminal length 0': { action: 'termLength', help: 'Disable pagination' },
        'term len 0': { action: 'termLength', help: 'Term length (shortcut)' },
        'debug ip packet': { action: 'debugIp', help: 'Debug IP packets' },
        'undebug all': { action: 'undebugAll', help: 'Disable all debugging' },
        'u all': { action: 'undebugAll', help: 'Undebug all (shortcut)' },
        '?': { action: 'showHelp', help: 'Show available commands' },
        'help': { action: 'showHelp', help: 'Show available commands' }
    },
    config: {
        'hostname': { action: 'setHostname', help: 'Set device hostname', hasArg: true },
        'ho': { action: 'setHostname', help: 'Hostname (shortcut)', hasArg: true },
        'interface': { action: 'goInterface', help: 'Enter interface configuration', hasArg: true },
        'int': { action: 'goInterface', help: 'Interface (shortcut)', hasArg: true },
        'interface range': { action: 'goInterfaceRange', help: 'Interface range', hasArg: true },
        'int r': { action: 'goInterfaceRange', help: 'Interface range (shortcut)', hasArg: true },
        'ip route': { action: 'addStaticRoute', help: 'Add static route', hasArg: true },
        'ip r': { action: 'addStaticRoute', help: 'IP route (shortcut)', hasArg: true },
        'ip routing': { action: 'enableIpRouting', help: 'Enable IP routing' },
        'ip ro': { action: 'addStaticRoute', help: 'IP route (shortcut)', hasArg: true },
        'router ospf': { action: 'goRouterOspf', help: 'Configure OSPF', hasArg: true },
        'router o': { action: 'goRouterOspf', help: 'Router OSPF (shortcut)', hasArg: true },
        'router eigrp': { action: 'goRouterEigrp', help: 'Configure EIGRP', hasArg: true },
        'router e': { action: 'goRouterEigrp', help: 'Router EIGRP (shortcut)', hasArg: true },
        'router rip': { action: 'goRouterRip', help: 'Configure RIP' },
        'router rip': { action: 'goRouterRip', help: 'Configure RIP' },
        'access-list': { action: 'addAcl', help: 'Create access list', hasArg: true },
        'access-l': { action: 'addAcl', help: 'Access-list (shortcut)', hasArg: true },
        'ip access-list': { action: 'goAclConfig', help: 'Enter named ACL config', hasArg: true },
        'ip a-l': { action: 'goAclConfig', help: 'Named ACL (shortcut)', hasArg: true },
        'ip access-list extended': { action: 'goAclExtended', help: 'Extended ACL', hasArg: true },
        'ip a-l e': { action: 'goAclExtended', help: 'Extended ACL (shortcut)', hasArg: true },
        'ip access-list standard': { action: 'goAclStandard', help: 'Standard ACL', hasArg: true },
        'ip a-l s': { action: 'goAclStandard', help: 'Standard ACL (shortcut)', hasArg: true },
        'vlan': { action: 'goVlanConfig', help: 'Configure VLAN', hasArg: true },
        'vl': { action: 'goVlanConfig', help: 'VLAN (shortcut)', hasArg: true },
        'vlan batch': { action: 'vlanBatch', help: 'Create multiple VLANs', hasArg: true },
        'ip dhcp pool': { action: 'goDhcpPool', help: 'Configure DHCP pool', hasArg: true },
        'ip dh p': { action: 'goDhcpPool', help: 'DHCP pool (shortcut)', hasArg: true },
        'ip dhcp excluded-address': { action: 'dhcpExclude', help: 'Exclude DHCP addresses', hasArg: true },
        'ip dh e': { action: 'dhcpExclude', help: 'DHCP exclude (shortcut)', hasArg: true },
        'ip nat inside source': { action: 'configNat', help: 'Configure NAT', hasArg: true },
        'ip n i s': { action: 'configNat', help: 'IP NAT inside (shortcut)', hasArg: true },
        'ip nat inside': { action: 'natInsideGlobal', help: 'NAT inside global' },
        'ip nat outside': { action: 'natOutsideGlobal', help: 'NAT outside global' },
        'ip nat pool': { action: 'natPool', help: 'NAT pool', hasArg: true },
        'ip nat p': { action: 'natPool', help: 'NAT pool (shortcut)', hasArg: true },
        'enable secret': { action: 'setEnableSecret', help: 'Set enable password', hasArg: true },
        'ena s': { action: 'setEnableSecret', help: 'Enable secret (shortcut)', hasArg: true },
        'enable password': { action: 'setEnablePass', help: 'Set enable password', hasArg: true },
        'ena p': { action: 'setEnablePass', help: 'Enable password (shortcut)', hasArg: true },
        'service password-encryption': { action: 'svcPassEnc', help: 'Encrypt passwords' },
        'ser p': { action: 'svcPassEnc', help: 'Service password (shortcut)' },
        'no ip domain-lookup': { action: 'noIpDomainLookup', help: 'Disable DNS lookup' },
        'no ip d': { action: 'noIpDomainLookup', help: 'No IP domain (shortcut)' },
        'no ip domain lookup': { action: 'noIpDomainLookup', help: 'Disable DNS lookup' },
        'ip domain-name': { action: 'setDomainName', help: 'Set domain name', hasArg: true },
        'ip d': { action: 'setDomainName', help: 'IP domain (shortcut)', hasArg: true },
        'ip name-server': { action: 'setNameServer', help: 'Set DNS server', hasArg: true },
        'ip n': { action: 'setNameServer', help: 'IP name server (shortcut)', hasArg: true },
        'banner motd': { action: 'setBanner', help: 'Set banner message', hasArg: true },
        'ban m': { action: 'setBanner', help: 'Banner MOTD (shortcut)', hasArg: true },
        'banner login': { action: 'setLoginBanner', help: 'Set login banner', hasArg: true },
        'banner exec': { action: 'setExecBanner', help: 'Set exec banner', hasArg: true },
        'line vty': { action: 'goLineVty', help: 'Configure VTY lines', hasArg: true },
        'line v': { action: 'goLineVty', help: 'Line VTY (shortcut)', hasArg: true },
        'line con': { action: 'goLineConsole', help: 'Configure console', hasArg: true },
        'line c': { action: 'goLineConsole', help: 'Line console (shortcut)', hasArg: true },
        'line console': { action: 'goLineConsole', help: 'Configure console', hasArg: true },
        'line aux': { action: 'goLineAux', help: 'Configure AUX', hasArg: true },
        'spanning-tree mode': { action: 'stpMode', help: 'STP mode', hasArg: true },
        'sp m': { action: 'stpMode', help: 'STP mode (shortcut)', hasArg: true },
        'spanning-tree vlan': { action: 'stpVlan', help: 'STP VLAN priority', hasArg: true },
        'spanning-tree portfast': { action: 'stpPortfast', help: 'Enable portfast' },
        'spanning-tree bpduguard': { action: 'stpBpduGuard', help: 'BPDU guard' },
        'spanning-tree backbonefast': { action: 'stpBackbonefast', help: 'Backbonefast' },
        'udld enable': { action: 'udldEnable', help: 'Enable UDLD' },
        'cdp run': { action: 'cdpRun', help: 'Enable CDP globally' },
        'no cdp run': { action: 'noCdpRun', help: 'Disable CDP' },
        'lldp run': { action: 'lldpRun', help: 'Enable LLDP' },
        'no lldp run': { action: 'noLldpRun', help: 'Disable LLDP' },
        'logging host': { action: 'setSyslog', help: 'Set syslog server', hasArg: true },
        'loggin': { action: 'setSyslog', help: 'Logging host (shortcut)', hasArg: true },
        'snmp-server community': { action: 'setSnmp', help: 'Set SNMP community', hasArg: true },
        'snmp-s c': { action: 'setSnmp', help: 'SNMP community (shortcut)', hasArg: true },
        'ntp server': { action: 'setNtp', help: 'Set NTP server', hasArg: true },
        'nt s': { action: 'setNtp', help: 'NTP server (shortcut)', hasArg: true },
        'crypto key generate rsa': { action: 'generateRsa', help: 'Generate RSA keys' },
        'cry k g': { action: 'generateRsa', help: 'Crypto key (shortcut)' },
        'ip ssh version 2': { action: 'sshVersion2', help: 'SSH version 2' },
        'ip s v 2': { action: 'sshVersion2', help: 'SSH v2 (shortcut)' },
        'username': { action: 'setUsername', help: 'Create user', hasArg: true },
        'us': { action: 'setUsername', help: 'Username (shortcut)', hasArg: true },
        'aaa new-model': { action: 'aaaNewModel', help: 'Enable AAA' },
        'radius-server host': { action: 'radiusServer', help: 'RADIUS server', hasArg: true },
        'tacacs-server host': { action: 'tacacsServer', help: 'TACACS+ server', hasArg: true },
        'end': { action: 'goPrivileged', help: 'Return to privileged mode' },
        'exit': { action: 'goPrivileged', help: 'Return to privileged mode' },
        'e': { action: 'goPrivileged', help: 'Exit (shortcut)' },
        'do show running-config': { action: 'showRunConfig', help: 'Show running config' },
        'do show run': { action: 'showRunConfig', help: 'Show run (shortcut)' },
        'do sh run': { action: 'showRunConfig', help: 'Show run (shortcut)' },
        'do sh r': { action: 'showRunConfig', help: 'Show run (shortest)' },
        'do show ip interface brief': { action: 'showIpIntBrief', help: 'Show IP interface brief' },
        'do sh ip int br': { action: 'showIpIntBrief', help: 'Show IP int brief (shortcut)' },
        'do sh ip int b': { action: 'showIpIntBrief', help: 'Show IP int b (shortest)' },
        'do show ip route': { action: 'showIpRoute', help: 'Show IP route' },
        'do sh ip ro': { action: 'showIpRoute', help: 'Show IP route (shortcut)' },
        'do sh ip r': { action: 'showIpRoute', help: 'Show IP r (shortest)' },
        'do write': { action: 'saveConfig', help: 'Write memory' },
        'do wr': { action: 'saveConfig', help: 'Write memory (shortcut)' },
        'do copy run start': { action: 'saveConfig', help: 'Copy run start' },
        'do show vlan brief': { action: 'showVlanBrief', help: 'Show VLAN brief' },
        'do sh vlan br': { action: 'showVlanBrief', help: 'Show VLAN (shortcut)' },
        'do sh vlan b': { action: 'showVlanBrief', help: 'Show VLAN (shortest)' },
        '?': { action: 'showHelp', help: 'Show available commands' }
    },
    'config-if': {
        'ip address': { action: 'setIpAddress', help: 'Set IP address', hasArg: true },
        'ip add': { action: 'setIpAddress', help: 'IP address (shortcut)', hasArg: true },
        'ip a': { action: 'setIpAddress', help: 'IP addr (shortest)', hasArg: true },
        'no shutdown': { action: 'noShutdown', help: 'Enable interface' },
        'no shut': { action: 'noShutdown', help: 'No shutdown (shortcut)' },
        'no sh': { action: 'noShutdown', help: 'No sh (shortest)' },
        'undo shutdown': { action: 'noShutdown', help: 'Enable interface (alt)' },
        'undo sh': { action: 'noShutdown', help: 'Undo shutdown (alt)' },
        'shutdown': { action: 'shutdown', help: 'Disable interface' },
        'shut': { action: 'shutdown', help: 'Shutdown (shortcut)' },
        'sh': { action: 'shutdown', help: 'Shut (shortest)' },
        'switchport mode access': { action: 'swModeAccess', help: 'Set port to access mode' },
        'sw mo ac': { action: 'swModeAccess', help: 'Switchport mode access (shortcut)' },
        'sw m a': { action: 'swModeAccess', help: 'Sw mode access (shorter)' },
        'switchport mode trunk': { action: 'swModeTrunk', help: 'Set port to trunk mode' },
        'sw mo tr': { action: 'swModeTrunk', help: 'Switchport mode trunk (shortcut)' },
        'sw m t': { action: 'swModeTrunk', help: 'Sw mode trunk (shorter)' },
        'switchport mode dynamic auto': { action: 'swModeAuto', help: 'Dynamic auto mode' },
        'sw mo d': { action: 'swModeAuto', help: 'Sw mode dynamic (shortcut)' },
        'switchport mode dynamic desirable': { action: 'swModeDesirable', help: 'Dynamic desirable' },
        'switchport nonegotiate': { action: 'swNonegotiate', help: 'Disable DTP' },
        'sw n': { action: 'swNonegotiate', help: 'Sw nonegotiate (shortcut)' },
        'switchport access vlan': { action: 'swAccessVlan', help: 'Assign access VLAN', hasArg: true },
        'sw a': { action: 'swAccessVlan', help: 'Sw access vlan (shortcut)', hasArg: true },
        'sw acc v': { action: 'swAccessVlan', help: 'Sw access vlan (shortcut)', hasArg: true },
        'switchport trunk allowed vlan': { action: 'swTrunkVlan', help: 'Set allowed VLANs', hasArg: true },
        'sw tr al': { action: 'swTrunkVlan', help: 'Trunk allowed (shortcut)', hasArg: true },
        'sw t a': { action: 'swTrunkVlan', help: 'Sw trunk allow (shorter)', hasArg: true },
        'switchport trunk native vlan': { action: 'swNativeVlan', help: 'Set native VLAN', hasArg: true },
        'sw tr na': { action: 'swNativeVlan', help: 'Trunk native (shortcut)', hasArg: true },
        'sw t n': { action: 'swNativeVlan', help: 'Sw trunk native (shorter)', hasArg: true },
        'switchport trunk encapsulation': { action: 'swTrunkEncap', help: 'Trunk encapsulation', hasArg: true },
        'sw tr en': { action: 'swTrunkEncap', help: 'Trunk encap (shortcut)', hasArg: true },
        'switchport port-security': { action: 'swPortSecurity', help: 'Enable port security' },
        'sw p s': { action: 'swPortSecurity', help: 'Port security (shortcut)' },
        'switchport port-security maximum': { action: 'swPortSecMax', help: 'Max MAC addresses', hasArg: true },
        'switchport port-security violation': { action: 'swPortSecViol', help: 'Violation mode', hasArg: true },
        'switchport port-security mac-address': { action: 'swPortSecMac', help: 'Sticky MAC', hasArg: true },
        'switchport voice vlan': { action: 'swVoiceVlan', help: 'Voice VLAN', hasArg: true },
        'sw v v': { action: 'swVoiceVlan', help: 'Voice VLAN (shortcut)', hasArg: true },
        'switchport protected': { action: 'swProtected', help: 'Protected port' },
        'switchport block multicast': { action: 'swBlockMulticast', help: 'Block multicast' },
        'switchport host': { action: 'swHost', help: 'Port host (access+portfast)' },
        'switchport portfast': { action: 'swPortfast', help: 'Enable portfast' },
        'spanning-tree portfast': { action: 'stpPortfast', help: 'Enable portfast (STP)' },
        'sp po': { action: 'stpPortfast', help: 'STP portfast (shortcut)' },
        'spanning-tree bpduguard enable': { action: 'stpBpduGuard', help: 'BPDU guard' },
        'sp bp': { action: 'stpBpduGuard', help: 'BPDU guard (shortcut)' },
        'spanning-tree link-type': { action: 'stpLinkType', help: 'Link type', hasArg: true },
        'spanning-tree cost': { action: 'stpCost', help: 'Port cost', hasArg: true },
        'spanning-tree priority': { action: 'stpPriority', help: 'Port priority', hasArg: true },
        'channel-group': { action: 'channelGroup', help: 'EtherChannel', hasArg: true },
        'ch g': { action: 'channelGroup', help: 'Channel-group (shortcut)', hasArg: true },
        'lacp system-priority': { action: 'lacpPriority', help: 'LACP priority', hasArg: true },
        'ip ospf': { action: 'ipOspf', help: 'Configure OSPF', hasArg: true },
        'ip o': { action: 'ipOspf', help: 'IP OSPF (shortcut)', hasArg: true },
        'ip ospf cost': { action: 'ipOspfCost', help: 'OSPF cost', hasArg: true },
        'ip ospf hello-interval': { action: 'ipOspfHello', help: 'OSPF hello', hasArg: true },
        'ip ospf dead-interval': { action: 'ipOspfDead', help: 'OSPF dead', hasArg: true },
        'ip ospf priority': { action: 'ipOspfPriority', help: 'OSPF priority', hasArg: true },
        'ip ospf network': { action: 'ipOspfNetwork', help: 'OSPF network type', hasArg: true },
        'ip ospf authentication': { action: 'ipOspfAuth', help: 'OSPF auth' },
        'ip ospf message-digest-key': { action: 'ipOspfMd5', help: 'OSPF MD5 key', hasArg: true },
        'bandwidth': { action: 'setBandwidth', help: 'Set bandwidth', hasArg: true },
        'b': { action: 'setBandwidth', help: 'Bandwidth (shortcut)', hasArg: true },
        'delay': { action: 'setDelay', help: 'Set delay', hasArg: true },
        'ip helper-address': { action: 'setHelper', help: 'DHCP relay', hasArg: true },
        'ip h': { action: 'setHelper', help: 'IP helper (shortcut)', hasArg: true },
        'ip directed-broadcast': { action: 'ipDirectedBroadcast', help: 'Directed broadcast' },
        'ip proxy-arp': { action: 'ipProxyArp', help: 'Proxy ARP' },
        'no ip proxy-arp': { action: 'noIpProxyArp', help: 'No proxy ARP' },
        'ip nat inside': { action: 'natInside', help: 'Mark as NAT inside' },
        'ip n i': { action: 'natInside', help: 'NAT inside (shortcut)' },
        'ip nat outside': { action: 'natOutside', help: 'Mark as NAT outside' },
        'ip n o': { action: 'natOutside', help: 'NAT outside (shortcut)' },
        'description': { action: 'setDescription', help: 'Set description', hasArg: true },
        'desc': { action: 'setDescription', help: 'Description (shortcut)', hasArg: true },
        'd': { action: 'setDescription', help: 'Desc (shortest)', hasArg: true },
        'duplex': { action: 'setDuplex', help: 'Set duplex', hasArg: true },
        'dup': { action: 'setDuplex', help: 'Duplex (shortcut)', hasArg: true },
        'speed': { action: 'setSpeed', help: 'Set speed', hasArg: true },
        'spe': { action: 'setSpeed', help: 'Speed (shortcut)', hasArg: true },
        'cdp enable': { action: 'cdpEnable', help: 'Enable CDP' },
        'no cdp enable': { action: 'noCdpEnable', help: 'Disable CDP' },
        'lldp transmit': { action: 'lldpTransmit', help: 'LLDP transmit' },
        'lldp receive': { action: 'lldpReceive', help: 'LLDP receive' },
        'mac-address': { action: 'setMac', help: 'Set MAC address', hasArg: true },
        'mac-address-table notification': { action: 'macNotify', help: 'MAC notification' },
        'storm-control broadcast': { action: 'stormBroadcast', help: 'Storm control' },
        'exit': { action: 'goConfig', help: 'Return to config mode' },
        'e': { action: 'goConfig', help: 'Exit (shortcut)' },
        'end': { action: 'goPrivileged', help: 'Return to privileged mode' },
        'do show run': { action: 'showRunConfig', help: 'Show running config' },
        'do sh run': { action: 'showRunConfig', help: 'Show run (shortcut)' },
        'do sh int': { action: 'showInterfaces', help: 'Show interfaces (shortcut)' },
        '?': { action: 'showHelp', help: 'Show available commands' }
    },
    'config-router': {
        'network': { action: 'ospfNetwork', help: 'Add OSPF network', hasArg: true },
        'net': { action: 'ospfNetwork', help: 'Network (shortcut)', hasArg: true },
        'ne': { action: 'ospfNetwork', help: 'Network (shortest)', hasArg: true },
        'router-id': { action: 'setRouterId', help: 'Set router ID', hasArg: true },
        'router-i': { action: 'setRouterId', help: 'Router-id (shortcut)', hasArg: true },
        'passive-interface': { action: 'passiveInt', help: 'Set passive interface', hasArg: true },
        'passive-i': { action: 'passiveInt', help: 'Passive-int (shortcut)', hasArg: true },
        'pass': { action: 'passiveInt', help: 'Passive (shorter)', hasArg: true },
        'pas': { action: 'passiveInt', help: 'Passive (shortest)', hasArg: true },
        'auto-cost reference-bandwidth': { action: 'autoCost', help: 'Set reference bandwidth', hasArg: true },
        'auto-c': { action: 'autoCost', help: 'Auto-cost (shortcut)', hasArg: true },
        'default-information originate': { action: 'defaultOriginate', help: 'Inject default route' },
        'def': { action: 'defaultOriginate', help: 'Default (shortcut)' },
        'area stub': { action: 'areaStub', help: 'Configure stub area', hasArg: true },
        'area nssa': { action: 'areaNssa', help: 'Configure NSSA area', hasArg: true },
        'area virtual-link': { action: 'virtualLink', help: 'Virtual link', hasArg: true },
        'maximum-paths': { action: 'maxPaths', help: 'Max equal-cost paths', hasArg: true },
        'timers spf': { action: 'timersSpf', help: 'SPF timers', hasArg: true },
        'distance': { action: 'setDistance', help: 'Administrative distance', hasArg: true },
        'distribute-list': { action: 'distributeList', help: 'Filter routes', hasArg: true },
        'redistribute connected': { action: 'redistributeConnected', help: 'Redistribute connected' },
        'redistribute static': { action: 'redistributeStatic', help: 'Redistribute static' },
        'redistribute subnets': { action: 'redistributeSubnets', help: 'Include subnets' },
        'exit': { action: 'goConfig', help: 'Return to config mode' },
        'e': { action: 'goConfig', help: 'Exit (shortcut)' },
        'end': { action: 'goPrivileged', help: 'Return to privileged mode' },
        '?': { action: 'showHelp', help: 'Show available commands' }
    },
    'config-line': {
        'password': { action: 'setLinePass', help: 'Set line password', hasArg: true },
        'pass': { action: 'setLinePass', help: 'Password (shortcut)', hasArg: true },
        'pas': { action: 'setLinePass', help: 'Pass (shortest)', hasArg: true },
        'login': { action: 'enableLogin', help: 'Enable login' },
        'log': { action: 'enableLogin', help: 'Login (shortcut)' },
        'login local': { action: 'loginLocal', help: 'Use local authentication' },
        'login authentication': { action: 'loginAuth', help: 'Login auth', hasArg: true },
        'transport input ssh': { action: 'transportSsh', help: 'Enable SSH only' },
        'trans in ssh': { action: 'transportSsh', help: 'Transport SSH (shortcut)' },
        'tr i s': { action: 'transportSsh', help: 'Tr SSH (shorter)', hasArg: true },
        'transport input telnet': { action: 'transportTelnet', help: 'Enable Telnet' },
        'transport input all': { action: 'transportAll', help: 'Enable all protocols' },
        'trans in all': { action: 'transportAll', help: 'Transport all (shortcut)' },
        'tr i a': { action: 'transportAll', help: 'Tr all (shorter)' },
        'transport output ssh': { action: 'transportOutputSsh', help: 'Output SSH' },
        'transport preferred ssh': { action: 'transportPreferredSsh', help: 'Prefer SSH' },
        'logging synchronous': { action: 'logSync', help: 'Sync logging' },
        'logg sync': { action: 'logSync', help: 'Logging sync (shortcut)' },
        'log s': { action: 'logSync', help: 'Log sync (shorter)' },
        'exec-timeout': { action: 'execTimeout', help: 'Set exec timeout', hasArg: true },
        'ex': { action: 'execTimeout', help: 'Exec-timeout (shortcut)', hasArg: true },
        'session-timeout': { action: 'sessionTimeout', help: 'Session timeout', hasArg: true },
        'timeout login response': { action: 'loginResponse', help: 'Login response', hasArg: true },
        'privilege level': { action: 'privilegeLevel', help: 'Set privilege level', hasArg: true },
        'pr': { action: 'privilegeLevel', help: 'Privilege (shortcut)', hasArg: true },
        'escape-character': { action: 'escapeChar', help: 'Escape character', hasArg: true },
        'no exec': { action: 'noExec', help: 'Disable exec' },
        'activation-character': { action: 'activationChar', help: 'Activation char', hasArg: true },
        'autocommand': { action: 'autoCommand', help: 'Auto command', hasArg: true },
        'autocommand-options': { action: 'autoCommandOptions', help: 'Auto cmd options' },
        'history size': { action: 'historySize', help: 'History size', hasArg: true },
        'length': { action: 'screenLength', help: 'Screen length', hasArg: true },
        'width': { action: 'screenWidth', help: 'Screen width', hasArg: true },
        'dumb-terminal': { action: 'dumbTerminal', help: 'Dumb terminal' },
        'flushable': { action: 'flushable', help: 'Flushable' },
        'modem': { action: 'modem', help: 'Modem settings' },
        'no activation-character': { action: 'noActivationChar', help: 'No activation char' },
        'no hangup': { action: 'noHangup', help: 'No hangup' },
        'stopbits': { action: 'stopbits', help: 'Stop bits', hasArg: true },
        'exit': { action: 'goConfig', help: 'Return to config mode' },
        'e': { action: 'goConfig', help: 'Exit (shortcut)' },
        'end': { action: 'goPrivileged', help: 'Return to privileged mode' },
        '?': { action: 'showHelp', help: 'Show available commands' }
    },
    'config-vlan': {
        'name': { action: 'setVlanName', help: 'Set VLAN name', hasArg: true },
        'state': { action: 'setVlanState', help: 'Set VLAN state', hasArg: true },
        'exit': { action: 'goConfig', help: 'Return to config mode' },
        'e': { action: 'goConfig', help: 'Exit (shortcut)' },
        'end': { action: 'goPrivileged', help: 'Return to privileged mode' },
        '?': { action: 'showHelp', help: 'Show available commands' }
    },
    'config-router-eigrp': {
        'network': { action: 'eigrpNetwork', help: 'Add EIGRP network', hasArg: true },
        'net': { action: 'eigrpNetwork', help: 'Network (shortcut)', hasArg: true },
        'passive-interface': { action: 'passiveInt', help: 'Passive interface', hasArg: true },
        'pass': { action: 'passiveInt', help: 'Passive (shortcut)', hasArg: true },
        'auto-summary': { action: 'autoSummary', help: 'Auto summary' },
        'no auto-summary': { action: 'noAutoSummary', help: 'No auto summary' },
        'eigrp log-neighbor-changes': { action: 'eigrpLogChanges', help: 'Log neighbor changes' },
        'eigrp stub': { action: 'eigrpStub', help: 'EIGRP stub' },
        'metric maximum-hops': { action: 'maxHops', help: 'Max hops', hasArg: true },
        'metric weights': { action: 'metricWeights', help: 'Metric weights', hasArg: true },
        'variance': { action: 'variance', help: 'Variance for unequal cost', hasArg: true },
        'exit': { action: 'goConfig', help: 'Return to config mode' },
        'e': { action: 'goConfig', help: 'Exit (shortcut)' },
        'end': { action: 'goPrivileged', help: 'Return to privileged mode' },
        '?': { action: 'showHelp', help: 'Show available commands' }
    },
    'config-router-rip': {
        'version': { action: 'setRipVersion', help: 'Set RIP version', hasArg: true },
        'network': { action: 'ripNetwork', help: 'Add network', hasArg: true },
        'no auto-summary': { action: 'noAutoSummary', help: 'No auto summary' },
        'default-information originate': { action: 'defaultOriginate', help: 'Default route' },
        'exit': { action: 'goConfig', help: 'Return to config mode' },
        'e': { action: 'goConfig', help: 'Exit (shortcut)' },
        'end': { action: 'goPrivileged', help: 'Return to privileged mode' },
        '?': { action: 'showHelp', help: 'Show available commands' }
    }
};

// Prompt formats
const prompts = {
    user: () => `${cliState.hostname}>`,
    privileged: () => `${cliState.hostname}#`,
    config: () => `${cliState.hostname}(config)#`,
    'config-if': () => `${cliState.hostname}(config-if)#`,
    'config-router': () => `${cliState.hostname}(config-router)#`,
    'config-router-eigrp': () => `${cliState.hostname}(config-router)#`,
    'config-router-rip': () => `${cliState.hostname}(config-router)#`,
    'config-line': () => `${cliState.hostname}(config-line)#`,
    'config-vlan': () => `${cliState.hostname}(config-vlan)#`,
    'config-acl': () => `${cliState.hostname}(config-ext-nacl)#`
};

// Initialize CLI
function initCLI() {
    const input = document.getElementById('cliInput');
    if (!input) return;

    input.addEventListener('keydown', handleCLIKeydown);
}

function handleCLIKeydown(e) {
    const input = document.getElementById('cliInput');

    if (e.key === 'Enter') {
        e.preventDefault();
        processCommand(input.value.trim());
        input.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (cliState.historyIndex < cliState.history.length - 1) {
            cliState.historyIndex++;
            input.value = cliState.history[cliState.history.length - 1 - cliState.historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (cliState.historyIndex > 0) {
            cliState.historyIndex--;
            input.value = cliState.history[cliState.history.length - 1 - cliState.historyIndex];
        } else {
            cliState.historyIndex = -1;
            input.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        autoComplete(input);
    }
}

function processCommand(cmdLine) {
    if (!cmdLine) return;

    // Add to history
    cliState.history.push(cmdLine);
    cliState.historyIndex = -1;

    // Display command in output
    appendOutput(`${prompts[cliState.mode]()} ${cmdLine}`);

    // Parse and execute
    const cmd = cmdLine.toLowerCase().trim();
    const modeCommands = commands[cliState.mode] || {};

    // Find matching command
    let matched = false;
    for (const [cmdKey, cmdDef] of Object.entries(modeCommands)) {
        if (cmd === cmdKey || (cmdDef.hasArg && cmd.startsWith(cmdKey + ' '))) {
            executeAction(cmdDef.action, cmdLine);
            matched = true;
            break;
        }
    }

    if (!matched) {
        // Check for partial matches (tab completion hint)
        const partialMatches = Object.keys(modeCommands).filter(k => k.startsWith(cmd.split(' ')[0]));
        if (partialMatches.length > 0) {
            appendOutput(`% Ambiguous command: "${cmdLine}"`, 'error');
            appendOutput(`Did you mean one of these?`);
            partialMatches.slice(0, 5).forEach(m => {
                appendOutput(`  ${m} - ${modeCommands[m].help}`);
            });
            if (partialMatches.length > 5) {
                appendOutput(`  ... and ${partialMatches.length - 5} more`);
            }
        } else {
            // Check for typos/similar commands
            const similarCommands = findSimilarCommands(cmd, modeCommands);
            if (similarCommands.length > 0) {
                appendOutput(`% Invalid input detected at '^' marker.`, 'error');
                appendOutput(`% Did you mean: ${similarCommands.slice(0, 3).join(', ')}?`);
            } else {
                appendOutput(`% Invalid input detected at '^' marker.`, 'error');
                appendOutput(`% Type '?' for available commands.`);
            }
        }
    }

    updatePrompt();
    scrollConsole();
}

// Find similar commands for better error messages
function findSimilarCommands(input, modeCommands) {
    const inputLower = input.toLowerCase().split(' ')[0];
    const suggestions = [];

    for (const [cmd, def] of Object.entries(modeCommands)) {
        const cmdFirstWord = cmd.split(' ')[0];
        // Calculate Levenshtein distance for typo detection
        const distance = levenshteinDistance(inputLower, cmdFirstWord);
        // If command is somewhat similar (within 3 edits), suggest it
        if (distance <= 3 && cmdFirstWord.length > 2) {
            suggestions.push({ cmd: cmdFirstWord, dist: distance, help: def.help });
        }
    }

    // Sort by distance and return top matches
    suggestions.sort((a, b) => a.dist - b.dist);
    return suggestions.slice(0, 3).map(s => s.cmd);
}

// Simple Levenshtein distance implementation
function levenshteinDistance(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

function executeAction(action, fullCmd) {
    const args = fullCmd.split(' ').slice(1).join(' ');

    switch (action) {
        // Mode changes
        case 'goPrivileged':
            cliState.mode = 'privileged';
            break;
        case 'goUser':
            cliState.mode = 'user';
            break;
        case 'goConfig':
            cliState.mode = 'config';
            break;
        case 'goInterface':
            cliState.mode = 'config-if';
            cliState.currentInterface = args;
            appendOutput(`Entering interface configuration for ${args}`);
            break;
        case 'goRouterOspf':
            cliState.mode = 'config-router';
            appendOutput(`Configuring OSPF process ${args}`);
            break;
        case 'goRouterEigrp':
            cliState.mode = 'config-router-eigrp';
            appendOutput(`Configuring EIGRP AS ${args}`);
            break;
        case 'goRouterRip':
            cliState.mode = 'config-router-rip';
            appendOutput(`Configuring RIP`);
            break;
        case 'goLineVty':
        case 'goLineConsole':
        case 'goLineAux':
            cliState.mode = 'config-line';
            break;
        case 'goInterfaceRange':
            cliState.mode = 'config-if';
            cliState.currentInterface = args + ' (range)';
            appendOutput(`Entering interface range configuration for ${args}`);
            break;
        case 'goAclConfig':
        case 'goAclExtended':
        case 'goAclStandard':
            cliState.mode = 'config-acl';
            appendOutput(` configuring ACL: ${args}`);
            break;
        case 'goVlanConfig':
            cliState.mode = 'config-vlan';
            appendOutput(`Entering VLAN configuration for ${args}`);
            break;
        case 'goDhcpPool':
            cliState.mode = 'config-dhcp';
            appendOutput(`Entering DHCP pool configuration: ${args}`);
            break;

        // Show commands
        case 'showHelp':
            showHelp();
            break;
        case 'showVersion':
            showVersion();
            break;
        case 'showIpIntBrief':
            showIpInterfaceBrief();
            break;
        case 'showRunConfig':
            showRunningConfig();
            break;
        case 'showIpRoute':
            showIpRoute();
            break;
        case 'showVlanBrief':
            showVlanBrief();
            break;
        case 'showOspfNeigh':
            showOspfNeighbor();
            break;
        case 'showNatTrans':
            showNatTranslations();
            break;
        case 'showAcl':
            showAccessLists();
            break;
        case 'showMacTable':
            showMacAddressTable();
            break;
        case 'showIntTrunk':
            showInterfacesTrunk();
            break;
        case 'showSpanningTree':
            showSpanningTree();
            break;
        case 'showSpanningTreeDetail':
            showSpanningTreeDetail();
            break;
        case 'showStartConfig':
            showStartupConfig();
            break;
        case 'showInterfaces':
            showInterfaces();
            break;
        case 'showOspfInt':
            showOspfInterface();
            break;
        case 'showOspfDb':
            showOspfDatabase();
            break;
        case 'showEigrpNeigh':
            showEigrpNeighbors();
            break;
        case 'showEigrpTopo':
            showEigrpTopology();
            break;
        case 'showNatStats':
            showNatStatistics();
            break;
        case 'showIpAcl':
            showIpAccessLists();
            break;
        case 'showCdpNeighbors':
            showCdpNeighbors();
            break;
        case 'showCdpNeighborsDetail':
            showCdpNeighborsDetail();
            break;
        case 'showProtocols':
            showProtocols();
            break;
        case 'showIpInterface':
            showIpInterfaceDetail();
            break;
        case 'showControllers':
            showControllers();
            break;
        case 'clearScreen':
            clearOutput();
            break;
        case 'clearLine':
            appendOutput(`Clear line ${args} - [OK]`, 'success');
            break;
        case 'termMonitor':
            appendOutput(`Terminal monitoring enabled`, 'success');
            break;
        case 'termLength':
            appendOutput(`Terminal length disabled (0)`, 'success');
            break;
        case 'eraseConfig':
            appendOutput(`Erasing NVFS... [OK]`, 'success');
            break;
        case 'reload':
            appendOutput(`System configuration has been modified. Save? [yes/no]:`, 'warning');
            appendOutput(`Proceed with reload? [confirm]`, 'warning');
            break;
        case 'debugIp':
            appendOutput(`IP packet debugging enabled`, 'success');
            break;
        case 'undebugAll':
            appendOutput(`All possible debugging has been turned off`, 'success');
            break;
        case 'saveConfig':
            appendOutput(`Building configuration...`);
            setTimeout(() => appendOutput(`[OK]`, 'success'), 500);
            break;
        case 'ping':
            simulatePing(args);
            break;
        case 'traceroute':
            simulateTraceroute(args);
            break;

        // Configuration commands
        case 'setHostname':
            const newHostname = args.split(' ')[0];
            if (newHostname) {
                cliState.hostname = newHostname;
                appendOutput(`Hostname set to ${newHostname}`, 'success');
            }
            break;
        case 'setIpAddress':
            appendOutput(`IP address configured: ${args}`, 'success');
            break;
        case 'noShutdown':
            appendOutput(`Interface enabled`, 'success');
            break;
        case 'shutdown':
            appendOutput(`Interface disabled`, 'success');
            break;
        case 'swModeAccess':
            appendOutput(`Switchport mode set to ACCESS`, 'success');
            break;
        case 'swModeTrunk':
            appendOutput(`Switchport mode set to TRUNK`, 'success');
            break;
        case 'swAccessVlan':
            appendOutput(`Access VLAN set to ${args}`, 'success');
            break;
        case 'addStaticRoute':
            appendOutput(`Static route added: ${args}`, 'success');
            break;
        case 'ospfNetwork':
            appendOutput(`OSPF network added: ${args}`, 'success');
            break;
        case 'eigrpNetwork':
            appendOutput(`EIGRP network added: ${args}`, 'success');
            break;
        case 'ripNetwork':
            appendOutput(`RIP network added: ${args}`, 'success');
            break;
        case 'setRouterId':
            appendOutput(`Router ID set to ${args}`, 'success');
            break;
        case 'passiveInt':
            appendOutput(`Passive interface set: ${args}`, 'success');
            break;
        case 'autoCost':
            appendOutput(`Auto-cost reference bandwidth set: ${args}`, 'success');
            break;
        case 'defaultOriginate':
            appendOutput(`Default information originate enabled`, 'success');
            break;
        case 'areaStub':
            appendOutput(`Area ${args.split(' ')[0]} configured as stub`, 'success');
            break;
        case 'areaNssa':
            appendOutput(`Area ${args.split(' ')[0]} configured as NSSA`, 'success');
            break;
        case 'setEnableSecret':
            appendOutput(`Enable secret set: *****`, 'success');
            break;
        case 'setEnablePass':
            appendOutput(`Enable password set: *****`, 'success');
            break;
        case 'svcPassEnc':
            appendOutput(`Service password-encryption enabled`, 'success');
            break;
        case 'noIpDomainLookup':
            appendOutput(`IP domain lookup disabled`, 'success');
            break;
        case 'setDomainName':
            appendOutput(`Domain name set: ${args}`, 'success');
            break;
        case 'setNameServer':
            appendOutput(`Name server set: ${args}`, 'success');
            break;
        case 'setBanner':
            appendOutput(`Banner MOTD configured`, 'success');
            break;
        case 'setLoginBanner':
            appendOutput(`Banner login configured`, 'success');
            break;
        case 'setExecBanner':
            appendOutput(`Banner exec configured`, 'success');
            break;
        case 'setLinePass':
            appendOutput(`Line password set: *****`, 'success');
            break;
        case 'enableLogin':
            appendOutput(`Login enabled`, 'success');
            break;
        case 'loginLocal':
            appendOutput(`Local login authentication enabled`, 'success');
            break;
        case 'transportSsh':
            appendOutput(`Transport input SSH enabled`, 'success');
            break;
        case 'transportTelnet':
            appendOutput(`Transport input Telnet enabled`, 'success');
            break;
        case 'transportAll':
            appendOutput(`Transport input all protocols enabled`, 'success');
            break;
        case 'logSync':
            appendOutput(`Logging synchronous enabled`, 'success');
            break;
        case 'enableIpRouting':
            appendOutput(`IP routing enabled`, 'success');
            break;
        case 'configNat':
            appendOutput(`NAT configured: ${args}`, 'success');
            break;
        case 'natInside':
            appendOutput(`NAT inside marked`, 'success');
            break;
        case 'natOutside':
            appendOutput(`NAT outside marked`, 'success');
            break;
        case 'natPool':
            appendOutput(`NAT pool created: ${args}`, 'success');
            break;
        case 'setDescription':
            appendOutput(`Description set: ${args}`, 'success');
            break;
        case 'setDuplex':
            appendOutput(`Duplex set: ${args}`, 'success');
            break;
        case 'setSpeed':
            appendOutput(`Speed set: ${args}`, 'success');
            break;
        case 'setBandwidth':
            appendOutput(`Bandwidth set: ${args}`, 'success');
            break;
        case 'setDelay':
            appendOutput(`Delay set: ${args}`, 'success');
            break;
        case 'setHelper':
            appendOutput(`Helper address set: ${args}`, 'success');
            break;
        case 'swModeAuto':
            appendOutput(`Switchport mode set to DYNAMIC AUTO`, 'success');
            break;
        case 'swModeDesirable':
            appendOutput(`Switchport mode set to DYNAMIC DESIRABLE`, 'success');
            break;
        case 'swNonegotiate':
            appendOutput(`Switchport nonegotiate enabled`, 'success');
            break;
        case 'swTrunkVlan':
            appendOutput(`Trunk allowed VLAN set: ${args}`, 'success');
            break;
        case 'swNativeVlan':
            appendOutput(`Native VLAN set: ${args}`, 'success');
            break;
        case 'swTrunkEncap':
            appendOutput(`Trunk encapsulation: ${args}`, 'success');
            break;
        case 'swPortSecurity':
            appendOutput(`Port security enabled`, 'success');
            break;
        case 'swPortSecMax':
            appendOutput(`Port security max MAC: ${args}`, 'success');
            break;
        case 'swPortSecViol':
            appendOutput(`Port security violation: ${args}`, 'success');
            break;
        case 'swPortSecMac':
            appendOutput(`Port security MAC: ${args}`, 'success');
            break;
        case 'swVoiceVlan':
            appendOutput(`Voice VLAN: ${args}`, 'success');
            break;
        case 'swProtected':
            appendOutput(`Switchport protected enabled`, 'success');
            break;
        case 'swBlockMulticast':
            appendOutput(`Switchport block multicast enabled`, 'success');
            break;
        case 'swHost':
            appendOutput(`Switchport host enabled (access + portfast)`, 'success');
            break;
        case 'swPortfast':
            appendOutput(`Portfast enabled`, 'success');
            break;
        case 'stpPortfast':
            appendOutput(`Spanning-tree portfast enabled`, 'success');
            break;
        case 'stpBpduGuard':
            appendOutput(`Spanning-tree bpduguard enabled`, 'success');
            break;
        case 'stpLinkType':
            appendOutput(`Link type: ${args}`, 'success');
            break;
        case 'stpCost':
            appendOutput(`Path cost: ${args}`, 'success');
            break;
        case 'stpPriority':
            appendOutput(`Port priority: ${args}`, 'success');
            break;
        case 'channelGroup':
            appendOutput(`Channel-group ${args}`, 'success');
            break;
        case 'ipOspf':
            appendOutput(`IP OSPF configured: ${args}`, 'success');
            break;
        case 'ipOspfCost':
            appendOutput(`OSPF cost: ${args}`, 'success');
            break;
        case 'ipOspfHello':
            appendOutput(`OSPF hello-interval: ${args}`, 'success');
            break;
        case 'ipOspfDead':
            appendOutput(`OSPF dead-interval: ${args}`, 'success');
            break;
        case 'ipOspfPriority':
            appendOutput(`OSPF priority: ${args}`, 'success');
            break;
        case 'ipOspfNetwork':
            appendOutput(`OSPF network type: ${args}`, 'success');
            break;
        case 'ipOspfAuth':
            appendOutput(`OSPF authentication enabled`, 'success');
            break;
        case 'ipOspfMd5':
            appendOutput(`OSPF MD5 key configured`, 'success');
            break;
        case 'cdpEnable':
            appendOutput(`CDP enabled`, 'success');
            break;
        case 'noCdpEnable':
            appendOutput(`CDP disabled`, 'success');
            break;
        case 'lldpTransmit':
            appendOutput(`LLDP transmit enabled`, 'success');
            break;
        case 'lldpReceive':
            appendOutput(`LLDP receive enabled`, 'success');
            break;
        case 'setMac':
            appendOutput(`MAC address set: ${args}`, 'success');
            break;
        case 'vlanBatch':
            appendOutput(`VLANs created: ${args}`, 'success');
            break;
        case 'setVlanName':
            appendOutput(`VLAN name set: ${args}`, 'success');
            break;
        case 'setVlanState':
            appendOutput(`VLAN state: ${args}`, 'success');
            break;
        case 'dhcpExclude':
            appendOutput(`DHCP excluded addresses: ${args}`, 'success');
            break;
        case 'autoSummary':
            appendOutput(`Auto-summary enabled`, 'success');
            break;
        case 'noAutoSummary':
            appendOutput(`Auto-summary disabled`, 'success');
            break;
        case 'eigrpLogChanges':
            appendOutput(`EIGRP log neighbor changes enabled`, 'success');
            break;
        case 'eigrpStub':
            appendOutput(`EIGRP stub configured`, 'success');
            break;
        case 'setRipVersion':
            appendOutput(`RIP version: ${args}`, 'success');
            break;
        case 'aaaNewModel':
            appendOutput(`AAA new model enabled`, 'success');
            break;
        case 'setUsername':
            appendOutput(`Username ${args.split(' ')[0]} configured`, 'success');
            break;
        case 'setSyslog':
            appendOutput(`Syslog server: ${args}`, 'success');
            break;
        case 'setSnmp':
            appendOutput(`SNMP community set`, 'success');
            break;
        case 'setNtp':
            appendOutput(`NTP server: ${args}`, 'success');
            break;
        case 'generateRsa':
            appendOutput(`Generating RSA keys... [OK]`, 'success');
            break;
        case 'sshVersion2':
            appendOutput(`SSH version 2 enabled`, 'success');
            break;
        case 'cdpRun':
            appendOutput(`CDP enabled globally`, 'success');
            break;
        case 'noCdpRun':
            appendOutput(`CDP disabled globally`, 'success');
            break;
        case 'lldpRun':
            appendOutput(`LLDP enabled globally`, 'success');
            break;
        case 'noLldpRun':
            appendOutput(`LLDP disabled globally`, 'success');
            break;
        case 'stpMode':
            appendOutput(`Spanning-tree mode: ${args}`, 'success');
            break;
        case 'stpVlan':
            appendOutput(`STP VLAN configured: ${args}`, 'success');
            break;
        case 'stpPortfast':
            appendOutput(`STP portfast enabled globally`, 'success');
            break;
        case 'stpBackbonefast':
            appendOutput(`STP backbonefast enabled`, 'success');
            break;
        case 'udldEnable':
            appendOutput(`UDLD enabled`, 'success');
            break;
        case 'ipProxyArp':
            appendOutput(`Proxy ARP enabled`, 'success');
            break;
        case 'noIpProxyArp':
            appendOutput(`Proxy ARP disabled`, 'success');
            break;
        case 'ipDirectedBroadcast':
            appendOutput(`Directed broadcast enabled`, 'success');
            break;
        case 'natInsideGlobal':
            appendOutput(`NAT inside global configured`, 'success');
            break;
        case 'natOutsideGlobal':
            appendOutput(`NAT outside global configured`, 'success');
            break;
        case 'execTimeout':
            appendOutput(`Exec-timeout: ${args}`, 'success');
            break;
        case 'sessionTimeout':
            appendOutput(`Session-timeout: ${args}`, 'success');
            break;
        case 'loginResponse':
            appendOutput(`Login response timeout: ${args}`, 'success');
            break;
        case 'privilegeLevel':
            appendOutput(`Privilege level: ${args}`, 'success');
            break;
        case 'escapeChar':
            appendOutput(`Escape character: ${args}`, 'success');
            break;
        case 'noExec':
            appendOutput(`EXEC disabled on line`, 'success');
            break;
        case 'historySize':
            appendOutput(`History size: ${args}`, 'success');
            break;
        case 'screenLength':
            appendOutput(`Screen length: ${args}`, 'success');
            break;
        case 'screenWidth':
            appendOutput(`Screen width: ${args}`, 'success');
            break;
        case 'stopbits':
            appendOutput(`Stop bits: ${args}`, 'success');
            break;
        case 'transportOutputSsh':
            appendOutput(`Transport output SSH`, 'success');
            break;
        case 'transportPreferredSsh':
            appendOutput(`Transport preferred SSH`, 'success');
            break;
        case 'maxHops':
            appendOutput(`Maximum hops: ${args}`, 'success');
            break;
        case 'metricWeights':
            appendOutput(`Metric weights: ${args}`, 'success');
            break;
        case 'variance':
            appendOutput(`Variance: ${args}`, 'success');
            break;
        case 'timersSpf':
            appendOutput(`SPF timers: ${args}`, 'success');
            break;
        case 'setDistance':
            appendOutput(`Administrative distance: ${args}`, 'success');
            break;
        case 'distributeList':
            appendOutput(`Distribute list: ${args}`, 'success');
            break;
        case 'redistributeConnected':
            appendOutput(`Redistributing connected`, 'success');
            break;
        case 'redistributeStatic':
            appendOutput(`Redistributing static`, 'success');
            break;
        case 'redistributeSubnets':
            appendOutput(`Including subnets in redistribution`, 'success');
            break;
        case 'virtualLink':
            appendOutput(`Virtual link: ${args}`, 'success');
            break;
        case 'maxPaths':
            appendOutput(`Maximum paths: ${args}`, 'success');
            break;
        case 'loginAuth':
            appendOutput(`Login authentication: ${args}`, 'success');
            break;
        case 'autoCommand':
            appendOutput(`Autocommand: ${args}`, 'success');
            break;
        case 'autoCommandOptions':
            appendOutput(`Autocommand options set`, 'success');
            break;
        case 'activationChar':
            appendOutput(`Activation character: ${args}`, 'success');
            break;
        case 'noActivationChar':
            appendOutput(`No activation character`, 'success');
            break;
        case 'noHangup':
            appendOutput(`No hangup enabled`, 'success');
            break;
        case 'modem':
            appendOutput(`Modem configured: ${args}`, 'success');
            break;
        case 'dumbTerminal':
            appendOutput(`Dumb terminal enabled`, 'success');
            break;
        case 'flushable':
            appendOutput(`Flushable enabled`, 'success');
            break;
        case 'macNotify':
            appendOutput(`MAC notification enabled`, 'success');
            break;
        case 'stormBroadcast':
            appendOutput(`Storm-control broadcast configured`, 'success');
            break;
        case 'lacpPriority':
            appendOutput(`LACP system-priority: ${args}`, 'success');
            break;
        case 'setRipVersion':
            appendOutput(`RIP version: ${args}`, 'success');
            break;
        case 'saveConfig':
            appendOutput(`Building configuration...`);
            setTimeout(() => appendOutput(`[OK]`, 'success'), 500);
            break;
        case 'ping':
            simulatePing(args);
            break;
        case 'traceroute':
            simulateTraceroute(args);
            break;

        default:
            appendOutput(`Command executed: ${fullCmd}`, 'success');
    }
}

// Output helpers
function appendOutput(text, type = '') {
    const output = document.getElementById('configOutput');
    const line = document.createElement('div');
    line.textContent = text;
    if (type === 'error') line.style.color = '#ff4757';
    if (type === 'success') line.style.color = '#00ff88';
    output.appendChild(line);
}

function scrollConsole() {
    const content = document.getElementById('consoleContent');
    content.scrollTop = content.scrollHeight;
}

function updatePrompt() {
    const prompt = document.getElementById('cliPrompt');
    if (prompt) {
        prompt.textContent = prompts[cliState.mode]();
    }
}

function clearOutput() {
    document.getElementById('configOutput').innerHTML = '';
}

// Show command implementations
function showHelp() {
    const modeCommands = commands[cliState.mode] || {};
    appendOutput('Available commands:');
    for (const [cmd, def] of Object.entries(modeCommands)) {
        if (cmd !== '?') {
            appendOutput(`  ${cmd.padEnd(35)} ${def.help}`);
        }
    }
}

function showVersion() {
    appendOutput(`Cisco IOS Software, CCNA Lab Simulator`);
    appendOutput(`System uptime is 2 hours, 15 minutes`);
    appendOutput(`System image file is "flash:c2960-lanbasek9-mz.150-2.SE.bin"`);
    appendOutput(`Processor board ID: CCNAMASTER123`);
}

function showIpInterfaceBrief() {
    appendOutput(`Interface              IP-Address      OK? Method Status                Protocol`);
    appendOutput(`GigabitEthernet0/0     10.0.0.1        YES NVRAM  up                    up`);
    appendOutput(`GigabitEthernet0/1     192.168.1.1     YES NVRAM  up                    up`);
    appendOutput(`Loopback0              1.1.1.1         YES NVRAM  up                    up`);
}

function showRunningConfig() {
    const scenario = labScenarios[currentScenario];
    if (scenario && cliState.currentDevice) {
        const config = scenario.configs[cliState.currentDevice.id];
        if (config) {
            config.split('\n').forEach(line => appendOutput(line));
            return;
        }
    }
    appendOutput(`Building configuration...`);
    appendOutput(`!`);
    appendOutput(`hostname ${cliState.hostname}`);
    appendOutput(`!`);
    appendOutput(`interface GigabitEthernet0/0`);
    appendOutput(` ip address 10.0.0.1 255.255.255.252`);
    appendOutput(` no shutdown`);
    appendOutput(`!`);
    appendOutput(`end`);
}

function showIpRoute() {
    appendOutput(`Codes: C - connected, S - static, O - OSPF`);
    appendOutput(``);
    appendOutput(`Gateway of last resort is 10.0.0.2 to network 0.0.0.0`);
    appendOutput(``);
    appendOutput(`      10.0.0.0/8 is variably subnetted, 2 subnets, 2 masks`);
    appendOutput(`C        10.0.0.0/30 is directly connected, GigabitEthernet0/0`);
    appendOutput(`O     192.168.1.0/24 [110/20] via 10.0.0.2, 00:15:32, Gi0/0`);
    appendOutput(`S*    0.0.0.0/0 [1/0] via 10.0.0.2`);
}

function showVlanBrief() {
    appendOutput(`VLAN Name                             Status    Ports`);
    appendOutput(`---- -------------------------------- --------- -------------------------------`);
    appendOutput(`1    default                          active    Fa0/1, Fa0/2`);
    appendOutput(`10   SALES                            active    Fa0/5, Fa0/6`);
    appendOutput(`20   HR                               active    Fa0/10`);
    appendOutput(`100  SERVERS                          active    Fa0/24`);
}

function showOspfNeighbor() {
    appendOutput(`Neighbor ID     Pri   State           Dead Time   Address         Interface`);
    appendOutput(`2.2.2.2           1   FULL/DR         00:00:38    10.0.0.2        Gi0/0`);
    appendOutput(`3.3.3.3           1   FULL/BDR        00:00:35    10.0.0.3        Gi0/1`);
}

function showNatTranslations() {
    appendOutput(`Pro Inside global      Inside local       Outside local      Outside global`);
    appendOutput(`tcp 203.0.113.10:1024  10.0.0.10:1024    8.8.8.8:80         8.8.8.8:80`);
    appendOutput(`tcp 203.0.113.10:1025  10.0.0.11:1025    8.8.4.4:443        8.8.4.4:443`);
    appendOutput(`--- 203.0.113.100      10.0.0.100         ---                ---`);
}

function showAccessLists() {
    appendOutput(`Standard IP access list 10`);
    appendOutput(`    10 permit 10.10.10.0, wildcard bits 0.0.0.255 (10 matches)`);
    appendOutput(`    20 deny any (5 matches)`);
    appendOutput(``);
    appendOutput(`Extended IP access list INTERNET-INBOUND`);
    appendOutput(`    10 deny tcp any any eq telnet (3 matches)`);
    appendOutput(`    20 permit tcp any host 10.0.0.100 eq www (150 matches)`);
    appendOutput(`    30 permit ip any any (1024 matches)`);
}

function showMacAddressTable() {
    appendOutput(`          Mac Address Table`);
    appendOutput(`-------------------------------------------`);
    appendOutput(`Vlan    Mac Address       Type        Ports`);
    appendOutput(`----    -----------       --------    -----`);
    appendOutput(`  10    0011.2233.4455    DYNAMIC     Fa0/5`);
    appendOutput(`  10    0011.2233.4466    DYNAMIC     Fa0/6`);
    appendOutput(`  20    aabb.ccdd.eeff    DYNAMIC     Fa0/10`);
}

function showInterfacesTrunk() {
    appendOutput(`Port        Mode         Encapsulation  Status        Native vlan`);
    appendOutput(`Gi0/1       on           802.1q         trunking      1`);
    appendOutput(`Gi0/2       on           802.1q         trunking      1`);
    appendOutput(``);
    appendOutput(`Port        Vlans allowed on trunk`);
    appendOutput(`Gi0/1       1-4094`);
    appendOutput(`Gi0/2       10,20,100`);
}

function simulatePing(target) {
    if (!target) {
        appendOutput(`% Incomplete command.`, 'error');
        return;
    }
    appendOutput(`Type escape sequence to abort.`);
    appendOutput(`Sending 5, 100-byte ICMP Echos to ${target}, timeout is 2 seconds:`);
    appendOutput(`!!!!!`);
    appendOutput(`Success rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms`);
}

function simulateTraceroute(target) {
    if (!target) {
        appendOutput(`% Incomplete command.`, 'error');
        return;
    }
    appendOutput(`Type escape sequence to abort.`);
    appendOutput(`Tracing the route to ${target}`);
    appendOutput(`  1 10.0.0.1 4 msec 4 msec 4 msec`);
    appendOutput(`  2 10.0.0.2 8 msec 8 msec 8 msec`);
    appendOutput(`  3 ${target} 12 msec 12 msec 12 msec`);
}

function autoComplete(input) {
    const cmd = input.value.toLowerCase().trim();
    const modeCommands = commands[cliState.mode] || {};
    const matches = Object.keys(modeCommands).filter(k => {
        // Match if command starts with what's typed OR if it's a partial match
        return k.startsWith(cmd.split(' ')[0]);
    });

    if (matches.length === 1) {
        const fullCmd = matches[0];
        const currentCmd = input.value.toLowerCase();
        // Find where the partial match ends
        input.value = fullCmd + ' ';
        // If the command takes arguments, add a space
        if (modeCommands[fullCmd]?.hasArg) {
            input.value = fullCmd + ' ';
        }
    } else if (matches.length > 1) {
        // Find the longest common prefix
        const prefix = matches.reduce((acc, str) => {
            let i = 0;
            while (i < acc.length && i < str.length && acc[i] === str[i]) {
                i++;
            }
            return acc.substring(0, i);
        });

        if (prefix.length > cmd.length) {
            // Partial completion available
            input.value = prefix;
        } else {
            // Show all options
            appendOutput(`${prompts[cliState.mode]()} ${cmd}`);
            appendOutput('');
            matches.forEach(m => {
                appendOutput(`  ${m.padEnd(35)} ${modeCommands[m].help}`);
            });
            appendOutput('');
        }
    }
}

// Enable CLI for selected device
function enableCLI(device) {
    cliState.currentDevice = device;
    cliState.hostname = device.label || 'Device';
    cliState.mode = 'user';

    const input = document.getElementById('cliInput');
    if (input) {
        input.disabled = false;
        input.focus();
    }

    clearOutput();
    appendOutput(`Connected to ${device.label}`);
    appendOutput(`Type 'en' or 'enable' to enter privileged mode`);
    appendOutput(``);
    appendOutput(`Available shortcuts (like Packet Tracer):`);
    appendOutput(`  en, cf, conf t, sh run, sh ip int br, sh ip ro`);
    appendOutput(`  int g0/0, ip add, no sh, shut, sw mo tr, sw a vlan 10`);
    appendOutput(`  do sh run, do wr, e (exit), end, router o, vlan 10`);
    appendOutput(`Type '?' for all commands`);
    appendOutput(``);
    updatePrompt();
}

// Show Spanning Tree
function showSpanningTree() {
    appendOutput(`VLAN0001`);
    appendOutput(`  Spanning tree enabled protocol rstp`);
    appendOutput(`  Root ID    Priority    24577`);
    appendOutput(`             Address     0011.2233.4400`);
    appendOutput(`             This bridge is the root`);
    appendOutput(``);
    appendOutput(`  Bridge ID  Priority    24577  (priority 24576 sys-id-ext 1)`);
    appendOutput(`             Address     0011.2233.4400`);
    appendOutput(`             Aging Time  300 sec`);
    appendOutput(``);
    appendOutput(`Interface        Role Sts Cost      Prio.Nbr Type`);
    appendOutput(`---------------- ---- --- --------- -------- ----------------`);
    appendOutput(`Gi0/1            Desg FWD 4         128.1    P2p`);
    appendOutput(`Gi0/2            Desg FWD 4         128.2    P2p`);
}

// Show Spanning Tree Detail
function showSpanningTreeDetail() {
    appendOutput(`VLAN0001`);
    appendOutput(`  Spanning tree enabled protocol rstp`);
    appendOutput(`  Root ID    Priority    24577`);
    appendOutput(`             Address     0011.2233.4400`);
    appendOutput(`             This bridge is the root`);
    appendOutput(`             Hello Time   2 sec  Max Age 20 sec  Forward Delay 15 sec`);
    appendOutput(``);
    appendOutput(`  Bridge ID  Priority    24577  (priority 24576 sys-id-ext 1)`);
    appendOutput(`             Address     0011.2233.4400`);
    appendOutput(`             Hello Time   2 sec  Max Age 20 sec  Forward Delay 15 sec`);
    appendOutput(`             Aging Time  300 sec`);
    appendOutput(``);
    appendOutput(`Interface        Role Sts Cost      Prio.Nbr Type`);
    appendOutput(`---------------- ---- --- --------- -------- ----------------`);
    appendOutput(`Gi0/1            Desg FWD 4         128.1    P2p`);
    appendOutput(`                   Desg FWD            128.1    P2p`);
    appendOutput(`Gi0/2            Desg FWD 4         128.2    P2p`);
    appendOutput(`                   Desg FWD            128.2    P2p`);
}

// Show Startup Config
function showStartupConfig() {
    appendOutput(`!`);
    appendOutput(`! Last configuration change at 00:00:00 UTC Mon Jan 1 2000`);
    appendOutput(`!`);
    appendOutput(`hostname ${cliState.hostname}`);
    appendOutput(`!`);
    appendOutput(`interface GigabitEthernet0/0`);
    appendOutput(` ip address 10.0.0.1 255.255.255.0`);
    appendOutput(` no shutdown`);
    appendOutput(`!`);
    appendOutput(`end`);
}

// Show Interfaces
function showInterfaces() {
    appendOutput(`GigabitEthernet0/0 is up, line protocol is up`);
    appendOutput(`  Hardware is Gigabit Ethernet, address is 0011.2233.4400`);
    appendOutput(`  Internet address is 10.0.0.1/24`);
    appendOutput(`  MTU 1500 bytes, BW 1000000 Kbit/sec, DLY 10 usec`);
    appendOutput(`  reliability 255/255, txload 1/255, rxload 1/255`);
    appendOutput(`  Encapsulation ARPA, loopback not set`);
    appendOutput(`  Keepalive set (10 sec)`);
    appendOutput(`  Full Duplex, 1000Mbps, media type is RJ45`);
    appendOutput(`  input flow-control is off, output flow-control is off`);
    appendOutput(`  ARP type: ARPA`);
    appendOutput(``);
    appendOutput(`GigabitEthernet0/1 is administratively down, line protocol is down`);
}

// Show OSPF Interface
function showOspfInterface() {
    appendOutput(`GigabitEthernet0/0 is up, line protocol is up`);
    appendOutput(`  Internet Address 10.0.12.1/24, Area 0`);
    appendOutput(`  MTU 1500, Cost 1`);
    appendOutput(`  Transmit Delay is 1 sec, State POINT_TO_POINT`);
    appendOutput(`  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5`);
    appendOutput(`    Hello due in 00:00:02`);
    appendOutput(`  Index 1/1, flood queue length 0`);
    appendOutput(`  Next 0x0(0)/0x0(0) Last flood scan length is 1, maximum is 1`);
    appendOutput(`  Last flood scan time is 0 msec, maximum is 0 msec`);
    appendOutput(`  Neighbor Count is 1, Adjacent neighbor count is 1`);
}

// Show OSPF Database
function showOspfDb() {
    appendOutput(`            OSPF Router with ID (1.1.1.1) (Process ID 1)`);
    appendOutput(`                Router Link States (Area 0)`);
    appendOutput(`Link ID         ADV Router      Age  Seq#       CkSum  Link count`);
    appendOutput(`1.1.1.1         1.1.1.1          10  0x80000002 0x000000 2`);
    appendOutput(`2.2.2.2         2.2.2.2           5  0x80000002 0x000000 2`);
    appendOutput(`                Net Link States (Area 0)`);
    appendOutput(`Link ID         ADV Router      Age  Seq#       CkSum`);
    appendOutput(`10.0.12.0       1.1.1.1          10  0x80000001 0x000000`);
}

// Show EIGRP Neighbors
function showEigrpNeighbors() {
    appendOutput(`EIGRP-IPv4 Neighbors for AS(100)`);
    appendOutput(`H   Address                 Interface       Hold Uptime   SRTT   RTO  Q  Seq`);
    appendOutput(`                                          (sec)         (ms)       (ms) Cnt Num`);
    appendOutput(`0   10.0.12.2               Gi0/0             12 00:15:32   10   200  0  5`);
    appendOutput(`1   10.0.23.2               Gi0/1             13 00:10:25   12   200  0  3`);
}

// Show EIGRP Topology
function showEigrpTopology() {
    appendOutput(`EIGRP-IPv4 Topology Table for AS(100)/ID(1.1.1.1)`);
    appendOutput(`Codes: P - Passive, A - Active, U - Update, Q - Query, R - Reply,`);
    appendOutput(`       r - reply Status, s - suppressed Status`);
    appendOutput(`P 192.168.1.0/24, successors FD is 128256`);
    appendOutput(`        via 10.0.12.2, GigabitEthernet0/0`);
    appendOutput(`P 192.168.2.0/24, successors FD is 256000`);
    appendOutput(`        via 10.0.23.2, GigabitEthernet0/1`);
    appendOutput(`        via 10.0.12.2, GigabitEthernet0/0 (256256)`);
}

// Show NAT Statistics
function showNatStatistics() {
    appendOutput(`NAT statistics:`);
    appendOutput(`  Static mappings: 1`);
    appendOutput(`  Dynamic mappings: 0`);
    appendOutput(`  Pat mappings: 5`);
    appendOutput(`  Total translations: 15`);
    appendOutput(`  Hits: 2345  Misses: 12`);
    appendOutput(`  expired translations: 45`);
    appendOutput(`  In effect: [ 10.0.0.0/8 -> any ]`);
}

// Show IP Access Lists
function showIpAccessLists() {
    appendOutput(`Extended IP access list STANDARD_ACL`);
    appendOutput(`    10 permit ip 10.10.10.0 0.0.0.255 any (150 matches)`);
    appendOutput(`    20 deny ip any any (25 matches)`);
    appendOutput(`Extended IP access list EXTENDED_ACL`);
    appendOutput(`    10 permit tcp 10.0.0.0 0.0.0.255 host 10.0.0.100 eq 80`);
    appendOutput(`    20 permit tcp 10.0.0.0 0.0.0.255 host 10.0.0.100 eq 443`);
    appendOutput(`    30 deny ip any host 10.0.0.100 (3 matches)`);
    appendOutput(`    40 permit ip any any`);
}

// Show CDP Neighbors
function showCdpNeighbors() {
    appendOutput(`Capability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge`);
    appendOutput(`                  S - Switch, H - Host, I - IGMP, r - Repeater`);
    appendOutput(`Device ID        Local Intrfce     Holdtme    Capability  Platform  Port ID`);
    appendOutput(`R2-Core           Gi 0/0            135        R S I       WS-C2960  Gi 0/1`);
    appendOutput(`SW2-Access        Gi 0/1            124        S I         WS-C2960  Gi 0/2`);
}

// Show CDP Neighbors Detail
function showCdpNeighborsDetail() {
    appendOutput(`-------------------------`);
    appendOutput(`Device ID: R2-Core`);
    appendOutput(`System Name: R2-Core`);
    appendOutput(`Interface address: 10.0.12.2`);
    appendOutput(`Platform: cisco WS-C2960-X,  Capabilities: Router Switch IGMP`);
    appendOutput(`Interface: GigabitEthernet0/0,  Port ID (outgoing port): GigabitEthernet0/1`);
    appendOutput(`Holdtime : 135 sec`);
    appendOutput(`Version :`);
    appendOutput(`  Cisco IOS Software, C2960 Software (C2960-LANBASEK9-M), Version 15.2`);
    appendOutput(``);
    appendOutput(`advertisement version: 2`);
    appendOutput(`Duplex: full`);
}

// Show Protocols
function showProtocols() {
    appendOutput(`Global values:`);
    appendOutput(`  Internet Protocol routing is enabled`);
    appendOutput(``);
    appendOutput(`GigabitEthernet0/0 is up, line protocol is up`);
    appendOutput(`  Internet address is 10.0.0.1/24`);
    appendOutput(`  Broadcast address is 255.255.255.255`);
    appendOutput(``);
    appendOutput(`GigabitEthernet0/1 is administratively down, line protocol is down`);
}

// Show IP Interface Detail
function showIpInterfaceDetail() {
    appendOutput(`GigabitEthernet0/0 is up, line protocol is up`);
    appendOutput(`  Internet address is 10.0.0.1/24`);
    appendOutput(`  Broadcast address is 255.255.255.255`);
    appendOutput(`  Neighbor adjacency(s):`);
    appendOutput(`    10.0.0.2`);
    appendOutput(`  Helper address is not set`);
    appendOutput(`  Directed broadcast forwarding is disabled`);
    appendOutput(`  Proxy ARP is enabled`);
    appendOutput(`  Local Proxy ARP is disabled`);
    appendOutput(`  Security level is default`);
    appendOutput(`  Split horizon is enabled`);
}

// Show Controllers
function showControllers() {
    appendOutput(`GigabitEthernet0/0`);
    appendOutput(`  Hardware is Gigabit Ethernet, address is 0011.2233.4400`);
    appendOutput(`  GigabitEthernet PHY Statistics:`);
    appendOutput(`    Transmit: 12345 packets, 987654 bytes`);
    appendOutput(`    Receive:    54321 packets, 1234567 bytes`);
    appendOutput(`    Errors:     0 CRC, 0 frame, 0 overrun, 0 ignored`);
    appendOutput(`  Media type is RJ45`);
    appendOutput(`  Speed: 1000 Mbps, Duplex: Full`);
}

// ============================================
// Resizable Console (Drag to resize)
// ============================================
function initConsoleResize() {
    const console = document.getElementById('labConsole');
    const handle = document.getElementById('consoleResizeHandle');
    if (!console || !handle) return;

    let startY, startHeight;

    handle.addEventListener('mousedown', (e) => {
        startY = e.clientY;
        startHeight = console.offsetHeight;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        e.preventDefault();
    });

    function onMouseMove(e) {
        const delta = startY - e.clientY;
        const newHeight = Math.min(Math.max(startHeight + delta, 150), 600);
        console.style.height = newHeight + 'px';
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initCLI();
    initConsoleResize();
});
