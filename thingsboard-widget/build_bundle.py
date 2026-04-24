#!/usr/bin/env python3
"""
Assemble ThingsBoard widget files into importable JSON formats.

Generates TWO files:
  1. ecs200_widget_type.json     - Import via: Widget Library > Widgets > + > Import widget
  2. ecs200_widget_bundle.json   - Import via: Widget Library > Bundles > + > Import widgets bundle
"""
import json
import os

DIR = os.path.dirname(os.path.abspath(__file__))

def read(name):
    with open(os.path.join(DIR, name), 'r') as f:
        return f.read()

html = read('widget.html')
css = read('widget.css')
js = read('widget.js')

BUNDLE_ALIAS = "cat_ecs200_widgets"
WIDGET_ALIAS = "spec_navigator"
FQN = f"{BUNDLE_ALIAS}.{WIDGET_ALIAS}"

default_config = json.dumps({
    "title": "Cat ECS 200 - SCADA Modbus Reference",
    "showTitle": True,
    "titleStyle": {"fontSize": "16px", "fontWeight": 700},
    "settings": {
        "showConnectionInfo": True,
        "showBlockPlan": True,
        "showRegisterGroups": True,
        "showBestPractices": True,
        "defaultView": "overview",
        "accentColor": "#FFCD11"
    }
})

# The descriptor object used in both formats
descriptor = {
    "type": "static",
    "sizeX": 24,
    "sizeY": 16,
    "resources": [],
    "templateHtml": html,
    "templateCss": css,
    "controllerScript": js,
    "settingsForm": [],
    "dataKeySettingsForm": [],
    "latestDataKeySettingsForm": [],
    "defaultConfig": default_config
}

# -- Format 1: Single Widget Type (WidgetTypeDetails) --
# Import via: Widget Library > open a bundle > + > Import widget
widget_type = {
    "fqn": FQN,
    "name": "Cat ECS 200 Spec Navigator and Modbus Reference",
    "deprecated": False,
    "scada": False,
    "descriptor": descriptor,
    "description": "Interactive reference widget for Cat ECS 200 Modbus SCADA registers.",
    "tags": ["Cat", "ECS200", "Modbus", "SCADA", "Genset", "Paralleling"]
}

widget_type_path = os.path.join(DIR, 'ecs200_widget_type.json')
with open(widget_type_path, 'w') as f:
    json.dump(widget_type, f, indent=2)

# -- Format 2: Widgets Bundle (WidgetsBundleItem) --
# Import via: Widget Library > Bundles tab > + > Import widgets bundle
widgets_bundle_item = {
    "widgetsBundle": {
        "alias": BUNDLE_ALIAS,
        "title": "Cat ECS 200 Widgets",
        "description": "Custom widgets for Cat ECS 200 paralleling genset controller SCADA integration"
    },
    "widgetTypes": [widget_type]
}

bundle_path = os.path.join(DIR, 'ecs200_widget_bundle.json')
with open(bundle_path, 'w') as f:
    json.dump(widgets_bundle_item, f, indent=2)

print("Generated ThingsBoard widget files:\n")
print(f"  ecs200_widget_bundle.json ({os.path.getsize(bundle_path) / 1024:.1f} KB)")
print(f"     Import via: Widget Library > Bundles > + > Import widgets bundle")
print(f"  ecs200_widget_type.json   ({os.path.getsize(widget_type_path) / 1024:.1f} KB)")
print(f"     Import via: Open a widget bundle > + > Import widget")
print(f"\n  HTML: {len(html):,} chars | CSS: {len(css):,} chars | JS: {len(js):,} chars")
