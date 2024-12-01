# Wave SVG Generator - Product Requirements Document

## Overview
Wave SVG Generator adalah aplikasi web berbasis Next.js yang memungkinkan pengguna untuk membuat dan mengkustomisasi bentuk gelombang (wave) SVG dengan mudah. Pengguna dapat mengatur berbagai parameter untuk menciptakan gelombang yang sesuai dengan kebutuhan mereka.

## Objectives
1. Menyediakan interface yang user-friendly untuk membuat wave SVG
2. Memberikan berbagai opsi kustomisasi untuk bentuk wave
3. Menghasilkan kode SVG yang optimal dan dapat diunduh
4. Mempercepat workflow developer dalam membuat wave SVG

## User Stories
### Sebagai pengguna, saya ingin:
- Melihat preview wave SVG secara real-time saat melakukan konfigurasi
- Mengatur bentuk wave (smooth, kotak, abstract) dengan mudah
- Mengubah warna wave sesuai keinginan
- Mengunduh kode SVG yang telah dibuat
- Menyalin kode SVG ke clipboard
- Melihat panduan penggunaan kode SVG di Next.js

## Technical Requirements

### Frontend Architecture
- Framework: Next.js 14+ dengan App Router
- Styling: Tailwind CSS
- State Management: React Hooks (useState, useContext)
- Components: Shadcn/ui untuk UI components

### Core Features

#### 1. Wave Configuration Panel
**Bentuk Wave:**
- Smooth Wave
  - Kontrol untuk amplitude
  - Kontrol untuk frekuensi
  - Kontrol untuk fase
- Runcing Wave
  - Kontrol untuk ketajaman sudut
  - Kontrol untuk jarak antar puncak
- Abstract Wave
  - Kontrol untuk kompleksitas
  - Kontrol untuk randomness
  - Seed untuk regenerasi bentuk yang sama

**Warna & Tampilan:**
- Color picker dengan format HEX/RGB/HSL
- Opacity control (0-100%)
- Gradient option (2 warna)
- Background color option

#### 2. Preview Section
- Real-time preview dengan ukuran yang dapat disesuaikan

#### 3. Code Export
- Format output SVG yang teroptimasi
- Copy to clipboard button
- Download as SVG file
- Code snippet untuk implementasi di Next.js
- Opsi untuk menghasilkan responsive SVG

#### Layout
```
+------------------+----------------------+
|                  |                      |
|  Configuration   |                      |
|     Panel        |      Preview         |
|                  |                      |
|  - Wave Type     |                      |
|  - Parameters    |                      |
|  - Colors        |                      |
|                  |                      |
+------------------+                      |
|   Code Output    |                      |
|                  |                      |
+------------------+----------------------+
```

#### Navigation
- Tabs untuk switching antara different wave types
- Collapsible configuration panels
- Responsive layout untuk mobile devices

## Performance Requirements
- First Contentful Paint < 1.5s
- Time to Interactive < 2s
- Smooth real-time preview updates (60fps)
- Optimized SVG output (removed unnecessary attributes)

## Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Future Enhancements
1. Template gallery dengan preset waves
2. User accounts untuk menyimpan konfigurasi
3. Share configuration via URL
4. Export ke format lain (PNG, CSS)
5. Advanced animation controls

