#!/usr/bin/env python3
"""
Assemble ThingsBoard widget bundle JSON from separate HTML/CSS/JS files.
Output: ecs200_widget_bundle.json — importable via ThingsBoard Widget Library.
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

settings_schema = {
    "schema": {
        "type": "object",
        "title": "Widget Settings",
        "properties": {
            "showConnectionInfo": {
                "title": "Show connection info grid",
                "type": "boolean",
                "default": True
            },
            "showBlockPlan": {
                "title": "Show contiguous read block plan",
                "type": "boolean",
                "default": True
            },
            "showRegisterGroups": {
                "title": "Show register map tab",
                "type": "boolean",
                "default": True
            },
            "showBestPractices": {
                "title": "Show best practices tab",
                "type": "boolean",
                "default": True
            },
            "defaultView": {
                "title": "Default tab",
                "type": "string",
                "default": "overview"
            },
            "accentColor": {
                "title": "Accent color",
                "type": "string",
                "default": "#FFCD11"
            }
        }
    },
    "form": [
        "showConnectionInfo",
        "showBlockPlan",
        "showRegisterGroups",
        "showBestPractices",
        {
            "key": "defaultView",
            "type": "rc-select",
            "multiple": False,
            "items": [
                {"value": "overview", "label": "Overview"},
                {"value": "blocks", "label": "Read Blocks"},
                {"value": "registers", "label": "Register Map"},
                {"value": "practices", "label": "Best Practices"}
            ]
        },
        {
            "key": "accentColor",
            "type": "color"
        }
    ]
}

default_config = {
    "title": "Cat® ECS 200 — SCADA Modbus Reference",
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
}

bundle = {
    "widgetsBundleTitle": "Cat ECS 200 Widgets",
    "widgetTypes": [
        {
            "alias": "cat_ecs200_spec_navigator",
            "name": "Cat® ECS 200 Spec Navigator & Modbus Reference",
            "descriptor": {
                "type": "static",
                "sizeX": 24,
                "sizeY": 16,
                "resources": [],
                "templateHtml": html,
                "templateCss": css,
                "controllerScript": js,
                "settingsSchema": json.dumps(settings_schema),
                "dataKeySettingsSchema": "{}",
                "defaultConfig": json.dumps(default_config)
            }
        }
    ]
}

out = os.path.join(DIR, 'ecs200_widget_bundle.json')
with open(out, 'w') as f:
    json.dump(bundle, f, indent=2)

print(f"✓ Generated: ecs200_widget_bundle.json")
print(f"  HTML: {len(html)} chars")
print(f"  CSS:  {len(css)} chars")
print(f"  JS:   {len(js)} chars")
print(f"  Bundle size: {os.path.getsize(out) / 1024:.1f} KB")
print()
print("To import into ThingsBoard:")
print("  1. Go to Widget Library → + (Add Widget Bundle) → Import")
print("  2. Select ecs200_widget_bundle.json")
print("  3. Add widget to any dashboard from 'Cat ECS 200 Widgets' bundle")
