import re
import sys

def kebab_to_camel(match):
    return match.group(1) + match.group(2).upper()

def convert_style(match):
    style_content = match.group(1)
    rules = [r.strip() for r in style_content.split(';') if r.strip()]
    props = []
    for r in rules:
        if ':' not in r:
            continue
        k, v = r.split(':', 1)
        k = k.strip()
        v = v.strip().replace('"', '\\"')
        camel_k = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
        props.append(f"{camel_k}: \"{v}\"")
    return "style={{" + ", ".join(props) + "}}"

def html_to_jsx(html):
    # 1. Remove <script> tags
    jsx = re.sub(r'<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>', '', html, flags=re.DOTALL)
    
    # 2. Remove <style> tags inside body
    jsx = re.sub(r'<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>', '', jsx, flags=re.DOTALL)

    # 3. Remove HTML comments
    jsx = re.sub(r'<!--.*?-->', '', jsx, flags=re.DOTALL)

    # 4. Class and for
    jsx = re.sub(r'\bclass="', 'className="', jsx)
    jsx = re.sub(r'\bfor="', 'htmlFor="', jsx)

    # 5. Fix SVG tags that were improperly closed or need proper casing
    # Fix self-closing tag conversion:
    # Only self-close if NOT already closed by a closing tag. In HTML5 void elements:
    void_tags = ['input', 'img', 'br', 'hr', 'area', 'base', 'col', 'embed', 'link', 'meta', 'param', 'source', 'track', 'wbr']
    for tag in void_tags:
        jsx = re.sub(f'<{tag}([^>]*?)(?<!/)>', f'<{tag}\\1 />', jsx, flags=re.IGNORECASE)

    # SVG tags like path, circle, rect, stop, polygon, line, etc. often have </stop> or </path> in HTML,
    # OR they might be unclosed. Let's make sure </stop> doesn't follow a self-closed <stop ... />
    # Better approach: change <tag ...></tag> or unclosed to self-closed cleanly.
    svg_elements = ['stop', 'path', 'circle', 'rect', 'line', 'polygon', 'polyline', 'ellipse']
    for tag in svg_elements:
        # If <tag ...></tag>, turn into <tag ... />
        jsx = re.sub(f'<{tag}([^>]*?)>\\s*</{tag}>', f'<{tag}\\1 />', jsx, flags=re.IGNORECASE)

    # SVG tag name casing: radialgradient -> radialGradient, lineargradient -> linearGradient, clippath -> clipPath
    svg_tag_casing = {
        'radialgradient': 'radialGradient',
        'lineargradient': 'linearGradient',
        'clippath': 'clipPath'
    }
    for lower_name, proper_name in svg_tag_casing.items():
        jsx = re.sub(f'<{lower_name}\\b', f'<{proper_name}', jsx, flags=re.IGNORECASE)
        jsx = re.sub(f'</{lower_name}>', f'</{proper_name}>', jsx, flags=re.IGNORECASE)

    # SVG attribute casing
    svg_attrs = [
        "stroke-width", "stroke-linecap", "stroke-linejoin", "stroke-opacity",
        "stroke-dasharray", "stroke-dashoffset", "fill-rule", "fill-opacity",
        "clip-rule", "clip-path", "stop-color", "stop-opacity", "preserveAspectRatio",
        "viewBox"
    ]
    for attr in svg_attrs:
        lower_attr = attr.lower()
        if lower_attr == "preserveaspectratio":
            jsx = re.sub(r'preserveaspectratio=', 'preserveAspectRatio=', jsx, flags=re.IGNORECASE)
        elif lower_attr == "viewbox":
            jsx = re.sub(r'viewbox=', 'viewBox=', jsx, flags=re.IGNORECASE)
        else:
            camel = re.sub(r'([a-z])-([a-z])', kebab_to_camel, attr)
            jsx = re.sub(f'{attr}=', f'{camel}=', jsx, flags=re.IGNORECASE)

    # 6. Style tags
    jsx = re.sub(r'style="([^"]*)"', convert_style, jsx)

    return jsx

if __name__ == "__main__":
    for filename in sys.argv[1:]:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()

        body_match = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL)
        if not body_match:
            continue
        body_content = body_match.group(1)

        jsx_content = html_to_jsx(body_content)

        out_filename = filename.replace('.html', '.jsx')
        base = filename.replace('\\', '/').split('/')[-1].replace('.html', '')
        component_name = ''.join([part.capitalize() for part in base.split('_')])

        template = f"""import React from 'react';

const {component_name} = () => {{
  return (
    <div className="w-full min-h-screen relative pt-20">
      {jsx_content}
    </div>
  );
}};

export default {component_name};
"""
        with open(out_filename, 'w', encoding='utf-8') as f:
            f.write(template)
        print(f"Cleanly converted {filename} to {out_filename}")
