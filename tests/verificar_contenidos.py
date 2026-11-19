"""Verificación del contenido semilla sin dependencias externas."""
from pathlib import Path
import ast
source=Path(__file__).resolve().parents[1]/'backend'/'education'/'management'/'commands'/'seed_content.py'
module=ast.parse(source.read_text(encoding='utf-8'))
assignments={node.targets[0].id:ast.literal_eval(node.value) for node in module.body if isinstance(node,ast.Assign) and isinstance(node.targets[0],ast.Name) and node.targets[0].id in ('MODULES','QUIZ')}
mods=assignments['MODULES'];quiz=assignments['QUIZ']
assert len(mods)==3, 'Se esperan 3 módulos.'
assert len({m['slug'] for m in mods})==3, 'Los slugs deben ser únicos.'
assert len(quiz)==5, 'Se esperan 5 preguntas.'
for prompt,choices,correct_index,explanation in quiz:
    assert len(choices)>=2 and 0<=correct_index<len(choices) and explanation.strip() and prompt.strip()
print('OK: módulos únicos, 5 preguntas, opciones e índices correctos y explicaciones.')
