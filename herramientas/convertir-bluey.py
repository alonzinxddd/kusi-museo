import cv2
import numpy as np
import base64

img = cv2.imread('src/activos/imagenes/colorear/bluey.jpg', cv2.IMREAD_GRAYSCALE)
h, w = img.shape

with open('src/activos/imagenes/colorear/bluey.jpg', 'rb') as f:
    b64_img = base64.b64encode(f.read()).decode('utf-8')

_, lines = cv2.threshold(img, 180, 255, cv2.THRESH_BINARY_INV)
white_regions = (lines == 0).astype(np.uint8) * 255
num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(white_regions)

regions_svg = []
region_idx = 1

for i in range(1, num_labels):
    area = stats[i, cv2.CC_STAT_AREA]
    if area < 35:
        continue
    
    mask = (labels == i).astype(np.uint8) * 255
    contours, hierarchy = cv2.findContours(mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_TC89_KCOS)
    
    path_d = []
    for c in contours:
        pts = c.squeeze()
        if len(pts.shape) != 2 or len(pts) < 3:
            continue
        epsilon = 0.8
        approx = cv2.approxPolyDP(c, epsilon, True).squeeze()
        if len(approx.shape) != 2 or len(approx) < 3:
            continue
        d = 'M ' + ' L '.join(f'{p[0]},{p[1]}' for p in approx) + ' Z'
        path_d.append(d)
        
    if path_d:
        full_d = ' '.join(path_d)
        regions_svg.append(f'    <path data-region="parte-{region_idx}" fill="#FFFFFF" fill-rule="evenodd" stroke="none" d="{full_d}" />')
        region_idx += 1

with open('src/activos/imagenes/colorear/bluey.svg', 'w', encoding='utf-8') as out:
    out.write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="Lámina para colorear: Bluey con un helado">\n')
    out.write('  <!-- Regiones coloreables interactivas -->\n')
    out.write('  <g id="regiones-coloreables">\n')
    out.write('\n'.join(regions_svg))
    out.write('\n  </g>\n')
    out.write(f'  <!-- Capa con el dibujo original en data-uri -->\n')
    out.write(f'  <image href="data:image/jpeg;base64,{b64_img}" x="0" y="0" width="{w}" height="{h}" style="pointer-events: none; mix-blend-mode: multiply;" />\n')
    out.write('</svg>\n')

print(f'Successfully generated bluey.svg with {len(regions_svg)} clickable regions and embedded lineart!')
