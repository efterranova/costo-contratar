import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { IDCResult } from '@/lib/types';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1a1a1a',
  },
  coverPage: {
    padding: 40,
    fontFamily: 'Helvetica',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 8,
  },
  coverTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#111827',
  },
  coverSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 40,
  },
  coverMeta: {
    fontSize: 10,
    color: '#9ca3af',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 10,
    borderBottom: '1 solid #e5e7eb',
  },
  headerLogo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  headerDate: {
    fontSize: 8,
    color: '#9ca3af',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111827',
  },
  scoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    marginRight: 20,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  scoreDescription: {
    fontSize: 10,
    color: '#4b5563',
    maxWidth: 350,
  },
  variableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottom: '1 solid #f3f4f6',
    alignItems: 'center',
  },
  variableId: {
    width: 30,
    fontSize: 8,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  variableName: {
    flex: 1,
    fontSize: 9,
    fontWeight: 'bold',
  },
  variableDetails: {
    flex: 1,
    fontSize: 8,
    color: '#6b7280',
  },
  variableScore: {
    width: 40,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  variableWeight: {
    width: 60,
    fontSize: 8,
    color: '#9ca3af',
    textAlign: 'right',
  },
  recommendationBox: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f0f9ff',
    marginBottom: 20,
  },
  serviceBox: {
    padding: 16,
    borderRadius: 8,
    border: '1 solid #e5e7eb',
    marginBottom: 20,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  serviceDesc: {
    fontSize: 10,
    color: '#4b5563',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '1 solid #e5e7eb',
    paddingTop: 8,
  },
  footerText: {
    fontSize: 7,
    color: '#9ca3af',
  },
  sourcesTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111827',
  },
  sourceItem: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 4,
  },
  disclaimer: {
    fontSize: 7,
    color: '#9ca3af',
    marginTop: 20,
    padding: 12,
    borderRadius: 4,
    backgroundColor: '#f9fafb',
  },
});

function getLevelColor(level: string) {
  switch (level) {
    case 'baja': return '#22c55e';
    case 'media': return '#f59e0b';
    case 'alta': return '#ef4444';
    default: return '#6b7280';
  }
}

function getLevelBg(level: string) {
  switch (level) {
    case 'baja': return '#f0fdf4';
    case 'media': return '#fffbeb';
    case 'alta': return '#fef2f2';
    default: return '#f9fafb';
  }
}

function getLevelLabel(level: string) {
  switch (level) {
    case 'baja': return 'DIFICULTAD BAJA';
    case 'media': return 'DIFICULTAD MEDIA';
    case 'alta': return 'DIFICULTAD ALTA';
    default: return '';
  }
}

function getScoreColor(score: number) {
  if (score <= 3) return '#22c55e';
  if (score <= 6) return '#f59e0b';
  return '#ef4444';
}

interface ReportDocumentProps {
  result: IDCResult;
  countryLabel: string;
  roleLabel: string;
  seniorityLabel: string;
  userName: string;
  userEmail: string;
  generatedAt: string;
}

export function ReportDocument({
  result,
  countryLabel,
  roleLabel,
  seniorityLabel,
  userName,
  generatedAt,
}: ReportDocumentProps) {
  const levelColor = getLevelColor(result.level);
  const levelBg = getLevelBg(result.level);

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.logo}>erecruit</Text>
        <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 40 }}>
          Plataforma de contratación para LATAM
        </Text>
        <Text style={styles.coverTitle}>
          Índice de Dificultad{'\n'}de Contratación
        </Text>
        <Text style={styles.coverSubtitle}>
          {roleLabel} — {seniorityLabel}{'\n'}{countryLabel}
        </Text>
        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: levelBg, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: levelColor }}>
            {result.roundedScore}
          </Text>
        </View>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: levelColor, marginBottom: 40 }}>
          {getLevelLabel(result.level)}
        </Text>
        <Text style={styles.coverMeta}>
          Preparado para: {userName}
        </Text>
        <Text style={styles.coverMeta}>
          Fecha: {generatedAt}
        </Text>
        <Text style={{ ...styles.coverMeta, marginTop: 60 }}>
          Powered by erecruit — Datos Q2 2026
        </Text>
      </Page>

      {/* Score Detail Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerLogo}>erecruit — IDC</Text>
          <Text style={styles.headerDate}>{generatedAt}</Text>
        </View>

        <Text style={styles.sectionTitle}>Resultado del Análisis</Text>

        <View style={{ ...styles.scoreBox, backgroundColor: levelBg }}>
          <Text style={{ ...styles.scoreNumber, color: levelColor }}>
            {result.roundedScore}
          </Text>
          <View>
            <Text style={{ ...styles.scoreLabel, color: levelColor }}>
              {getLevelLabel(result.level)}
            </Text>
            <Text style={styles.scoreDescription}>
              {result.recommendation}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Desglose por Variable</Text>
        <Text style={{ fontSize: 8, color: '#6b7280', marginBottom: 12 }}>
          IDC = (V1 x 0.25) + (V2 x 0.25) + (V3 x 0.20) + (V4 x 0.15) + (V5 x 0.15)
        </Text>

        {result.variables.map((v) => (
          <View key={v.id} style={styles.variableRow}>
            <Text style={styles.variableId}>{v.id.toUpperCase()}</Text>
            <View style={{ flex: 2 }}>
              <Text style={styles.variableName}>{v.name}</Text>
              <Text style={styles.variableDetails}>{v.interpretation}</Text>
              <Text style={{ fontSize: 7, color: '#9ca3af', marginTop: 2 }}>{v.rawValue} — {v.source}</Text>
            </View>
            <Text style={{ ...styles.variableScore, color: getScoreColor(v.score) }}>
              {v.score}
            </Text>
            <Text style={styles.variableWeight}>
              x{(v.weight * 100).toFixed(0)}% = {v.weightedScore.toFixed(2)}
            </Text>
          </View>
        ))}

        <View style={{ ...styles.serviceBox, marginTop: 20 }}>
          <Text style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>Servicio recomendado</Text>
          <Text style={styles.serviceName}>{result.serviceRoute.name}</Text>
          <Text style={styles.servicePrice}>{result.serviceRoute.priceRange}</Text>
          <Text style={styles.serviceDesc}>{result.serviceRoute.description}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Powered by erecruit — erecruit.com</Text>
          <Text style={styles.footerText}>Página 2 de 3</Text>
        </View>
      </Page>

      {/* Sources & Methodology Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerLogo}>erecruit — IDC</Text>
          <Text style={styles.headerDate}>Metodología y Fuentes</Text>
        </View>

        <Text style={styles.sourcesTitle}>Fuentes de Datos</Text>

        {[
          { name: 'ManpowerGroup MEOS Q2 2026', desc: 'Net Employment Outlook por país. Publicación trimestral, 42 países.', url: 'go.manpowergroup.com/meos' },
          { name: 'Computrabajo Market Research 2026', desc: 'Distribución de demanda por tipo de perfil en LATAM. 1,200+ profesionales de RRHH.', url: 'blog-empresas.computrabajo.com' },
          { name: 'Interfell Smart Hiring 2026', desc: 'Rangos salariales tech por país, rol y seniority.', url: 'interfell.com/guia-salarial' },
          { name: 'Hays Salary Guide 2026', desc: 'Salarios por rol y país para LATAM.', url: 'salaryguide-americas.hays.com' },
          { name: 'ILOSTAT (OIT)', desc: 'Tasas de informalidad y participación laboral por país.', url: 'ilostat.ilo.org/data' },
          { name: 'Banco Mundial — Datos abiertos', desc: 'Indicadores laborales, PIB, informalidad por país.', url: 'datos.bancomundial.org' },
          { name: 'Bloomberg Línea', desc: 'Análisis de tendencias de empleo y nearshoring en LATAM.', url: 'bloomberglinea.com' },
        ].map((source) => (
          <View key={source.name} style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{source.name}</Text>
            <Text style={styles.sourceItem}>{source.desc}</Text>
            <Text style={{ fontSize: 7, color: '#3b82f6' }}>{source.url}</Text>
          </View>
        ))}

        <View style={{ marginTop: 16 }}>
          <Text style={styles.sourcesTitle}>Limitaciones</Text>
          <Text style={styles.sourceItem}>
            - El score es un indicador relativo de dificultad, no una predicción absoluta.
          </Text>
          <Text style={styles.sourceItem}>
            - Los datos se actualizan trimestralmente. El mercado puede cambiar más rápido.
          </Text>
          <Text style={styles.sourceItem}>
            - El modelo usa proxies, no datos directos de tiempo de cobertura.
          </Text>
          <Text style={styles.sourceItem}>
            - La categoría de rol es genérica. Especialidades específicas pueden variar.
          </Text>
          <Text style={styles.sourceItem}>
            - Los datos de nearshoring son cualitativos, basados en análisis de tendencias.
          </Text>
        </View>

        <View style={styles.disclaimer}>
          <Text>
            Este reporte fue generado automáticamente por el Índice de Dificultad de Contratación (IDC),
            una herramienta de erecruit. Los datos provienen de fuentes públicas verificables y se actualizan
            trimestralmente. El IDC no constituye una predicción garantizada ni un benchmark salarial.
            Para más información sobre la metodología, visite la sección de Metodología en nuestro sitio web.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Powered by erecruit — erecruit.com</Text>
          <Text style={styles.footerText}>Página 3 de 3</Text>
        </View>
      </Page>
    </Document>
  );
}
