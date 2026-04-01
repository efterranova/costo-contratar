import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { ReportDocument } from '@/components/pdf/report-document';
import type { IDCResult } from './types';

interface GeneratePDFParams {
  result: IDCResult;
  countryLabel: string;
  roleLabel: string;
  seniorityLabel: string;
  userName: string;
  userEmail: string;
  generatedAt: string;
}

export async function generatePDFBuffer(params: GeneratePDFParams): Promise<Buffer> {
  const element = <ReportDocument {...params} />;
  const buffer = await renderToBuffer(element);
  return Buffer.from(buffer);
}
