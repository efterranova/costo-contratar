import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import type { IDCResult } from '@/lib/types';

const blue = '#2856A3';

const s = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10, color: '#1a1a1a' },
  // Cover
  cover: { padding: 50, fontFamily: 'Helvetica', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  coverTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 8, color: '#111827' },
  coverSub: { fontSize: 13, textAlign: 'center', color: '#6b7280', marginBottom: 30 },
  coverMeta: { fontSize: 9, color: '#9ca3af', textAlign: 'center', marginTop: 4 },
  // Header
  hdr: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 8, borderBottom: `1 solid #e5e7eb` },
  hdrDate: { fontSize: 8, color: '#9ca3af' },
  // Section
  title: { fontSize: 14, fontWeight: 'bold', marginBottom: 10, color: '#111827' },
  subtitle: { fontSize: 11, fontWeight: 'bold', marginBottom: 8, color: '#111827' },
  // Score
  scoreBox: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 6, marginBottom: 16 },
  scoreNum: { fontSize: 40, fontWeight: 'bold', marginRight: 16 },
  scoreLabel: { fontSize: 12, fontWeight: 'bold', marginBottom: 3 },
  scoreDesc: { fontSize: 9, color: '#4b5563', maxWidth: 340, lineHeight: 1.4 },
  // Variable
  varRow: { flexDirection: 'row', paddingVertical: 6, paddingHorizontal: 4, borderBottom: '1 solid #f3f4f6', alignItems: 'flex-start' },
  varName: { fontSize: 9, fontWeight: 'bold', marginBottom: 2 },
  varDetail: { fontSize: 8, color: '#6b7280', lineHeight: 1.3 },
  varScore: { width: 35, fontSize: 13, fontWeight: 'bold', textAlign: 'right' },
  varWeight: { width: 55, fontSize: 7, color: '#9ca3af', textAlign: 'right', paddingTop: 2 },
  // AI
  aiBox: { padding: 14, borderRadius: 6, backgroundColor: '#f0f4ff', marginBottom: 16 },
  aiText: { fontSize: 9, color: '#374151', lineHeight: 1.5, marginBottom: 6 },
  // CTA
  ctaBox: { padding: 14, borderRadius: 6, border: `1 solid ${blue}`, marginBottom: 16, alignItems: 'center' },
  ctaText: { fontSize: 10, color: '#374151', textAlign: 'center', marginBottom: 4 },
  ctaLink: { fontSize: 11, color: blue, fontWeight: 'bold', textAlign: 'center' },
  // Footer
  ftr: { position: 'absolute', bottom: 25, left: 40, right: 40, flexDirection: 'row', justifyContent: 'space-between', borderTop: '1 solid #e5e7eb', paddingTop: 6 },
  ftrText: { fontSize: 7, color: '#9ca3af' },
  // Source
  srcName: { fontSize: 8, fontWeight: 'bold', marginBottom: 1 },
  srcDesc: { fontSize: 7, color: '#6b7280', marginBottom: 5 },
  disclaimer: { fontSize: 7, color: '#9ca3af', marginTop: 14, padding: 10, borderRadius: 4, backgroundColor: '#f9fafb' },
});

function levelColor(level: string) {
  return level === 'baja' ? '#0D9373' : level === 'media' ? '#D97706' : '#DC2626';
}
function levelBg(level: string) {
  return level === 'baja' ? '#ECFDF5' : level === 'media' ? '#FFFBEB' : '#FEF2F2';
}
function levelLabel(level: string) {
  return level === 'baja' ? 'DIFICULTAD BAJA' : level === 'media' ? 'DIFICULTAD MEDIA' : 'DIFICULTAD ALTA';
}
function scoreColor(n: number) {
  return n <= 3 ? '#0D9373' : n <= 6 ? '#D97706' : '#DC2626';
}

function stripMarkdown(text: string): string {
  return text.replace(/\*\*/g, '').replace(/^[-*]\s/gm, '- ');
}

interface Props {
  result: IDCResult;
  countryLabel: string;
  roleLabel: string;
  seniorityLabel: string;
  userName: string;
  userEmail: string;
  generatedAt: string;
  jobTitle?: string;
  aiAnalysis?: string;
}

export function ReportDocument({ result, countryLabel, roleLabel, seniorityLabel, userName, generatedAt, jobTitle, aiAnalysis }: Props) {
  const lc = levelColor(result.level);
  const lb = levelBg(result.level);
  const logoUrl = 'https://erecruit.ca/wp-content/uploads/2025/07/erecruit.png';

  return (
    <Document>
      {/* Page 1: Cover */}
      <Page size="A4" style={s.cover}>
        <Image src={logoUrl} style={{ width: 140, height: 38, marginBottom: 30 }} />
        <Text style={s.coverTitle}>Indice de Dificultad{'\n'}de Contratacion</Text>
        <Text style={s.coverSub}>
          {jobTitle ? `${jobTitle}\n` : ''}{roleLabel} — {seniorityLabel}{'\n'}{countryLabel}
        </Text>
        <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: lb, justifyContent: 'center', alignItems: 'center', marginBottom: 12 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: lc }}>{result.roundedScore}</Text>
        </View>
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: lc, marginBottom: 30 }}>{levelLabel(result.level)}</Text>
        <Text style={s.coverMeta}>Preparado para: {userName}</Text>
        <Text style={s.coverMeta}>Fecha: {generatedAt}</Text>
        <Text style={{ ...s.coverMeta, marginTop: 50 }}>erecruit.ca — Datos Q2 2026</Text>
      </Page>

      {/* Page 2: Score + Variables */}
      <Page size="A4" style={s.page}>
        <View style={s.hdr}>
          <Image src={logoUrl} style={{ width: 90, height: 24 }} />
          <Text style={s.hdrDate}>{generatedAt}</Text>
        </View>

        <Text style={s.title}>Resultado del Analisis</Text>
        <View style={{ ...s.scoreBox, backgroundColor: lb }}>
          <Text style={{ ...s.scoreNum, color: lc }}>{result.roundedScore}</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ ...s.scoreLabel, color: lc }}>{levelLabel(result.level)}</Text>
            <Text style={s.scoreDesc}>{result.recommendation}</Text>
          </View>
        </View>

        <Text style={s.title}>Desglose por Variable</Text>
        {result.variables.map((v) => (
          <View key={v.id} style={s.varRow} wrap={false}>
            <View style={{ flex: 2 }}>
              <Text style={s.varName}>{v.name}</Text>
              <Text style={s.varDetail}>{v.interpretation}</Text>
              <Text style={{ fontSize: 7, color: '#9ca3af', marginTop: 1 }}>{v.rawValue}</Text>
            </View>
            <Text style={{ ...s.varScore, color: scoreColor(v.score) }}>{v.score}</Text>
            <Text style={s.varWeight}>Peso {(v.weight * 100).toFixed(0)}%</Text>
          </View>
        ))}

        <View style={s.ftr}>
          <Text style={s.ftrText}>erecruit.ca — Indice de Dificultad de Contratacion</Text>
          <Text style={s.ftrText}>Pagina 2</Text>
        </View>
      </Page>

      {/* Page 3: AI Analysis + CTA */}
      <Page size="A4" style={s.page}>
        <View style={s.hdr}>
          <Image src={logoUrl} style={{ width: 90, height: 24 }} />
          <Text style={s.hdrDate}>Analisis y Recomendaciones</Text>
        </View>

        <Text style={s.title}>Analisis Personalizado</Text>
        {aiAnalysis ? (
          <View style={s.aiBox}>
            {stripMarkdown(aiAnalysis).split('\n').filter(Boolean).map((p, i) => (
              <Text key={i} style={s.aiText}>{p}</Text>
            ))}
          </View>
        ) : (
          <View style={s.aiBox}>
            <Text style={s.aiText}>El analisis personalizado no estuvo disponible al momento de generar este reporte.</Text>
          </View>
        )}

        <View style={s.ctaBox}>
          <Text style={s.ctaText}>Si necesitas publicar esta vacante o recibir apoyo en tu proceso de contratacion:</Text>
          <Text style={s.ctaLink}>Visita erecruit.ca</Text>
        </View>

        <Text style={s.subtitle}>Fuentes de Datos</Text>
        {[
          { name: 'ManpowerGroup MEOS Q2 2026', desc: 'Net Employment Outlook por pais. Publicacion trimestral.' },
          { name: 'Computrabajo Market Research 2026', desc: 'Distribucion de demanda por perfil en LATAM.' },
          { name: 'Interfell / Hays Salary Guide 2026', desc: 'Rangos salariales por pais, rol y seniority.' },
          { name: 'ILOSTAT (OIT)', desc: 'Tasas de informalidad laboral por pais.' },
          { name: 'Bloomberg Linea', desc: 'Analisis de tendencias de empleo y contratacion internacional.' },
        ].map((src) => (
          <View key={src.name}>
            <Text style={s.srcName}>{src.name}</Text>
            <Text style={s.srcDesc}>{src.desc}</Text>
          </View>
        ))}

        <View style={s.disclaimer}>
          <Text>
            Este reporte fue generado por el Indice de Dificultad de Contratacion (IDC), una herramienta de erecruit.
            Los datos provienen de fuentes publicas verificables y se actualizan trimestralmente.
            El IDC no constituye una prediccion garantizada ni un benchmark salarial.
          </Text>
        </View>

        <View style={s.ftr}>
          <Text style={s.ftrText}>erecruit.ca — Indice de Dificultad de Contratacion</Text>
          <Text style={s.ftrText}>Pagina 3</Text>
        </View>
      </Page>
    </Document>
  );
}
