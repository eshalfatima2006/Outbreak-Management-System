import re

html_file = '/home/pc/Outbreak-Management-System/templates/contacts.html'
with open(html_file, 'r') as f:
    content = f.read()

style_block = '''{% block content %}
<style>
  #tracingTabs .nav-link {
    color: var(--text-muted) !important;
    background: transparent !important;
    border-left: none !important;
    border-bottom: 2px solid transparent !important;
    border-radius: 0 !important;
    font-weight: 600;
  }
  #tracingTabs .nav-link:hover {
    color: var(--navy) !important;
    border-bottom: 2px solid var(--border) !important;
  }
  #tracingTabs .nav-link.active {
    color: var(--teal-dark) !important;
    border-bottom: 2px solid var(--teal) !important;
    background: transparent !important;
  }
</style>'''

content = content.replace('{% block content %}', style_block)
with open(html_file, 'w') as f:
    f.write(content)

