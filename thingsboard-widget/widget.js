// Cat® ECS 200 Spec Navigator — ThingsBoard Widget Controller
// Widget Type: Static (can also bind to datasources for live data overlay)

self.onInit = function() {
    var $container = self.ctx.$container;
    var settings = self.ctx.settings || {};

    // --- Register Data ---
    var registerGroups = [
        {
            title: "⚡ Generator AC — Averages & Power",
            block: "P4 / P6",
            port: 502,
            device: "200P",
            regs: [
                {reg:150, name:"Avg Line-Line Voltage", words:1, scale:"1 V/bit", offset:"0", desc:"Average LL RMS voltage"},
                {reg:152, name:"Avg Current", words:1, scale:"1 A/bit", offset:"0", desc:"Average RMS current"},
                {reg:154, name:"Engine Speed", words:1, scale:"0.125 rpm/bit", offset:"0", desc:"Engine RPM via CAN"},
                {reg:155, name:"Total Real Power", words:2, scale:"1 W/bit", offset:"-2B", desc:"32-bit total kW"},
                {reg:157, name:"Frequency", words:1, scale:"1/128 Hz/bit", offset:"0", desc:"Average AC frequency"},
                {reg:159, name:"Avg Power Factor", words:1, scale:"1/16384 /bit", offset:"-2", desc:"Average PF"},
                {reg:202, name:"Total Apparent Power", words:2, scale:"1 VA/bit", offset:"0", desc:"32-bit kVA"},
                {reg:205, name:"Total Reactive Power", words:2, scale:"1 VAr/bit", offset:"-2B", desc:"32-bit kVAR"},
            ]
        },
        {
            title: "📊 Per-Phase Voltage / Current / PF",
            block: "P5",
            port: 502,
            device: "200P",
            regs: [
                {reg:180, name:"V L1-L2", words:1, scale:"1 V/bit", offset:"0", desc:"Phase A-B voltage"},
                {reg:181, name:"V L2-L3", words:1, scale:"1 V/bit", offset:"0", desc:"Phase B-C voltage"},
                {reg:182, name:"V L3-L1", words:1, scale:"1 V/bit", offset:"0", desc:"Phase C-A voltage"},
                {reg:183, name:"V L1-N", words:1, scale:"1 V/bit", offset:"0", desc:"Phase A L-N voltage"},
                {reg:184, name:"V L2-N", words:1, scale:"1 V/bit", offset:"0", desc:"Phase B L-N voltage"},
                {reg:185, name:"V L3-N", words:1, scale:"1 V/bit", offset:"0", desc:"Phase C L-N voltage"},
                {reg:186, name:"I L1", words:1, scale:"1 A/bit", offset:"0", desc:"Phase A current"},
                {reg:187, name:"I L2", words:1, scale:"1 A/bit", offset:"0", desc:"Phase B current"},
                {reg:188, name:"I L3", words:1, scale:"1 A/bit", offset:"0", desc:"Phase C current"},
                {reg:189, name:"PF L1", words:1, scale:"1/16384 /bit", offset:"-2", desc:"Phase A power factor"},
                {reg:190, name:"PF L2", words:1, scale:"1/16384 /bit", offset:"-2", desc:"Phase B power factor"},
                {reg:191, name:"PF L3", words:1, scale:"1/16384 /bit", offset:"-2", desc:"Phase C power factor"},
            ]
        },
        {
            title: "🚨 Event & Alarm Status",
            block: "P1 / P3",
            port: 502,
            device: "200P",
            regs: [
                {reg:2, name:"Event Lamp Status", words:1, scale:"Bit-packed", offset:"", desc:"Red/Amber lamp bits"},
                {reg:3, name:"Horn Active", words:1, scale:"0=F 1=T 2=Err 3=N/A", offset:"", desc:"Audible alert horn"},
                {reg:4, name:"Hard Shutdown", words:1, scale:"0=F 1=T 2=Err 3=N/A", offset:"", desc:"Hard shutdown active"},
                {reg:5, name:"Soft Shutdown", words:1, scale:"0=F 1=T 2=Err 3=N/A", offset:"", desc:"Soft shutdown active"},
                {reg:101, name:"User Alarm Group A", words:1, scale:"Bit 0-15 = Events", offset:"", desc:"16 configurable alarms"},
                {reg:102, name:"User Alarm Group B", words:1, scale:"Bit 0-15 = Events", offset:"", desc:"16 configurable alarms"},
                {reg:103, name:"User Alarm Group C", words:1, scale:"Bit 0-15 = Events", offset:"", desc:"16 configurable alarms"},
                {reg:104, name:"User Alarm Group D", words:1, scale:"Bit 0-15 = Events", offset:"", desc:"16 configurable alarms"},
                {reg:105, name:"User Alarm Group E", words:1, scale:"Bit 0-15 = Events", offset:"", desc:"16 configurable alarms"},
                {reg:106, name:"User Alarm Group F", words:1, scale:"Bit 0-15 = Events", offset:"", desc:"16 configurable alarms"},
                {reg:107, name:"User Alarm Group G", words:1, scale:"Bit 0-15 = Events", offset:"", desc:"16 configurable alarms"},
                {reg:108, name:"User Alarm Group H", words:1, scale:"Bit 0-15 = Events", offset:"", desc:"16 configurable alarms"},
                {reg:109, name:"User Alarm Group I", words:1, scale:"Bit 0-15 = Events", offset:"", desc:"16 configurable alarms"},
                {reg:110, name:"User Alarm Group J", words:1, scale:"Bit 0-15 = Events", offset:"", desc:"16 configurable alarms"},
            ]
        },
        {
            title: "🔀 Operating State & Breaker",
            block: "P7 / P8",
            port: 502,
            device: "200P",
            regs: [
                {reg:228, name:"Genset Available", words:1, scale:"0=No 1=Yes 2=Err 3=N/A", offset:"", desc:"Availability status"},
                {reg:229, name:"Breaker Status", words:1, scale:"0=Open 1=Closed 2=Err", offset:"", desc:"GCB position"},
                {reg:230, name:"Operating Mode", words:1, scale:"0=Off 1=Man 2=Auto 3=Test", offset:"", desc:"Current mode"},
                {reg:231, name:"Auto Start State", words:1, scale:"0-8 enumerated", offset:"", desc:"Start/stop sequence state"},
                {reg:232, name:"Engine Run Status", words:1, scale:"0=Off 1=Running 2=Err", offset:"", desc:"Engine running"},
                {reg:730, name:"DBA State", words:1, scale:"Enumerated", offset:"", desc:"Dead bus arbitration state"},
                {reg:731, name:"DBA Last Fail Reason", words:1, scale:"Enumerated", offset:"", desc:"DBA failure code"},
                {reg:738, name:"Sync Mode / State", words:1, scale:"Enumerated", offset:"", desc:"Synchronizer state"},
            ]
        },
        {
            title: "🔋 Battery & Engine Sensors (200G)",
            block: "P2 / G1 / G2 / G3",
            port: 502,
            device: "200P+200G",
            regs: [
                {reg:40, name:"Battery Voltage", words:1, scale:"1/20 V/bit", offset:"0", desc:"DC battery voltage (200P)"},
                {reg:41, name:"Oil Pressure", words:1, scale:"1/128 psi/bit", offset:"0", desc:"Engine oil pressure (200G)"},
                {reg:42, name:"Coolant Temperature", words:1, scale:"1/32 °F/bit", offset:"-273", desc:"Engine coolant temp (200G)"},
                {reg:43, name:"Fuel Level", words:1, scale:"1/2.56 %/bit", offset:"0", desc:"Fuel tank level (200G)"},
                {reg:44, name:"Coolant Level", words:1, scale:"0.5 %/bit", offset:"0", desc:"Coolant level (200G)"},
                {reg:49, name:"Turbo Boost Pressure", words:1, scale:"1/128 psi/bit", offset:"0", desc:"Turbocharger boost (200G)"},
                {reg:57, name:"Exhaust Temp Left", words:1, scale:"1/32 °F/bit", offset:"-273", desc:"Left bank exhaust (200G)"},
                {reg:58, name:"Exhaust Temp Right", words:1, scale:"1/32 °F/bit", offset:"-273", desc:"Right bank exhaust (200G)"},
                {reg:59, name:"Oil Temperature", words:1, scale:"1/32 °F/bit", offset:"-273", desc:"Engine oil temp (200G)"},
                {reg:62, name:"Fuel Consumption Rate", words:1, scale:"0.05 L/hr/bit", offset:"0", desc:"Instantaneous fuel rate (200G)"},
                {reg:65, name:"Engine Hours", words:2, scale:"0.05 hr/bit", offset:"0", desc:"32-bit total hours (200G)"},
                {reg:154, name:"Engine Speed RPM", words:1, scale:"0.125 rpm/bit", offset:"0", desc:"Crankshaft speed (200G)"},
            ]
        },
        {
            title: "🔗 System Totals & Per-Unit Data",
            block: "P9",
            port: 502,
            device: "200P",
            regs: [
                {reg:750, name:"Units Online", words:1, scale:"1/bit", offset:"0", desc:"Total gensets online"},
                {reg:751, name:"Units Available", words:1, scale:"1/bit", offset:"0", desc:"Total gensets available"},
                {reg:752, name:"EPS Units Online", words:1, scale:"1/bit", offset:"0", desc:"Emergency units online"},
                {reg:756, name:"System Total kW", words:2, scale:"1 W/bit", offset:"-2B", desc:"32-bit combined power"},
                {reg:758, name:"System % Load", words:1, scale:"0.4 %/bit", offset:"0", desc:"Percent of rated load"},
                {reg:767, name:"Gen#1 Breaker", words:1, scale:"0=Open 1=Closed", offset:"", desc:"Unit 1 breaker position"},
                {reg:768, name:"Gen#1 Mode", words:1, scale:"0=Off 1=Man 2=Auto", offset:"", desc:"Unit 1 operating mode"},
                {reg:780, name:"Gen#1 % kW Load", words:1, scale:"0.4 %/bit", offset:"0", desc:"Unit 1 percent load"},
            ]
        },
        {
            title: "📈 Energy Meters & Ratings",
            block: "P10",
            port: 502,
            device: "200P",
            regs: [
                {reg:208, name:"Positive kWh", words:2, scale:"1 Wh/bit", offset:"0", desc:"Accumulated real energy"},
                {reg:210, name:"Positive kVARh", words:2, scale:"1 VARh/bit", offset:"0", desc:"Accumulated reactive energy"},
                {reg:212, name:"Negative kWh", words:2, scale:"1 Wh/bit", offset:"0", desc:"Reverse power energy"},
                {reg:214, name:"Rated Voltage", words:1, scale:"1 V/bit", offset:"0", desc:"Nameplate voltage"},
                {reg:216, name:"Rated Current", words:1, scale:"1 A/bit", offset:"0", desc:"Nameplate current"},
                {reg:218, name:"Rated Power", words:2, scale:"1 W/bit", offset:"-2B", desc:"Nameplate kW"},
            ]
        },
        {
            title: "🔔 Annunciator (Port 50201)",
            block: "S1 / S2 / S3",
            port: 50201,
            device: "200P",
            regs: [
                {reg:1, name:"Controller Online", words:1, scale:"0=Off 1=On", offset:"", desc:"Paralleling controller online"},
                {reg:2, name:"ECM Online", words:1, scale:"0=Off 1=On", offset:"", desc:"Engine ECM communicating"},
                {reg:16, name:"Active Event Count", words:1, scale:"1/bit", offset:"0", desc:"Number of active events"},
                {reg:611, name:"E-Stop Active", words:1, scale:"0=F 1=T", offset:"", desc:"Emergency stop status"},
                {reg:613, name:"Overcrank", words:1, scale:"0=F 1=T", offset:"", desc:"Failure to start"},
                {reg:614, name:"Overspeed", words:1, scale:"0=F 1=T", offset:"", desc:"Engine overspeed"},
                {reg:617, name:"Hi Coolant Temp Warn", words:1, scale:"0=F 1=T", offset:"", desc:"Coolant temp warning"},
                {reg:618, name:"Hi Coolant Temp SD", words:1, scale:"0=F 1=T", offset:"", desc:"Coolant temp shutdown"},
                {reg:625, name:"Lo Oil Pressure Warn", words:1, scale:"0=F 1=T", offset:"", desc:"Oil pressure warning"},
                {reg:626, name:"Lo Oil Pressure SD", words:1, scale:"0=F 1=T", offset:"", desc:"Oil pressure shutdown"},
                {reg:629, name:"Lo Fuel Level Warn", words:1, scale:"0=F 1=T", offset:"", desc:"Fuel level warning"},
                {reg:630, name:"Lo Fuel Level SD", words:1, scale:"0=F 1=T", offset:"", desc:"Fuel level shutdown"},
            ]
        },
    ];

    // --- Build Register Map Tab ---
    function buildRegisterMap(filter) {
        var container = $container[0].querySelector('#ecs-reg-container');
        if (!container) return;
        var html = '';
        var q = (filter || '').toLowerCase();

        registerGroups.forEach(function(group, gi) {
            var filteredRegs = group.regs.filter(function(r) {
                if (!q) return true;
                return r.name.toLowerCase().indexOf(q) >= 0 ||
                       r.desc.toLowerCase().indexOf(q) >= 0 ||
                       String(r.reg).indexOf(q) >= 0 ||
                       r.scale.toLowerCase().indexOf(q) >= 0;
            });
            if (filteredRegs.length === 0) return;

            html += '<div class="ecs-reg-group">';
            html += '<div class="ecs-rg-header" data-group="' + gi + '">';
            html += '<h5>' + group.title + '</h5>';
            html += '<span class="ecs-rg-badge">Port ' + group.port + ' · ' + group.device + ' · ' + filteredRegs.length + ' regs</span>';
            html += '</div>';
            html += '<div class="ecs-rg-body' + (q ? ' open' : '') + '" id="ecs-rg-' + gi + '">';
            html += '<table class="ecs-rg-table"><thead><tr>';
            html += '<th>Reg#</th><th>Name</th><th>Words</th><th>Scaling</th><th>Offset</th><th>Description</th>';
            html += '</tr></thead><tbody>';

            filteredRegs.forEach(function(r) {
                html += '<tr>';
                html += '<td class="rn">' + r.reg + '</td>';
                html += '<td><b>' + r.name + '</b></td>';
                html += '<td>' + r.words + '</td>';
                html += '<td class="sc">' + r.scale + '</td>';
                html += '<td>' + r.offset + '</td>';
                html += '<td>' + r.desc + '</td>';
                html += '</tr>';
            });

            html += '</tbody></table></div></div>';
        });

        if (!html) {
            html = '<div style="padding:20px;text-align:center;color:#999;">No registers match "' + (filter||'') + '"</div>';
        }
        container.innerHTML = html;

        // Attach toggle handlers
        container.querySelectorAll('.ecs-rg-header').forEach(function(hdr) {
            hdr.addEventListener('click', function() {
                var gIdx = this.getAttribute('data-group');
                var body = container.querySelector('#ecs-rg-' + gIdx);
                if (body) body.classList.toggle('open');
            });
        });
    }

    // --- Tab Switching ---
    var tabs = $container[0].querySelectorAll('.ecs-tab');
    var panels = $container[0].querySelectorAll('.ecs-panel');
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            var target = this.getAttribute('data-tab');
            tabs.forEach(function(t) { t.classList.remove('active'); });
            panels.forEach(function(p) { p.classList.remove('active'); });
            this.classList.add('active');
            var panel = $container[0].querySelector('#tab-' + target);
            if (panel) panel.classList.add('active');
            if (target === 'registers') buildRegisterMap();
        });
    });

    // --- Search ---
    var searchInput = $container[0].querySelector('.ecs-search');
    if (searchInput) {
        var searchTimeout;
        searchInput.addEventListener('input', function() {
            var val = this.value;
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(function() {
                buildRegisterMap(val);
            }, 200);
        });
    }

    // Build initial register map
    buildRegisterMap();
};

self.onDataUpdated = function() {
    // Future: overlay live telemetry data from ThingsBoard datasources
    // Access data via self.ctx.data and match to register keys
};

self.onDestroy = function() {
    // Cleanup if needed
};

self.typeParameters = function() {
    return {
        maxDatasources: 1,
        maxDataKeys: 50,
        dataKeysOptional: true
    };
};
