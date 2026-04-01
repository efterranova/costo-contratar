import type { LeadFormData } from './types';
import { COUNTRIES, ROLES, SENIORITY_LEVELS } from './constants';

const BREVO_API_URL = 'https://api.brevo.com/v3';

export async function createBrevoContact(lead: LeadFormData): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;

  if (!apiKey || !listId) {
    console.error('Missing BREVO_API_KEY or BREVO_LIST_ID');
    return { success: false, error: 'Server configuration error' };
  }

  const countryLabel = COUNTRIES.find(c => c.value === lead.country)?.label || lead.country;
  const roleLabel = ROLES.find(r => r.value === lead.role)?.label || lead.role;
  const seniorityLabel = SENIORITY_LEVELS.find(s => s.value === lead.seniority)?.label || lead.seniority;

  const body = {
    email: lead.email,
    attributes: {
      FIRSTNAME: lead.name.split(' ')[0],
      LASTNAME: lead.name.split(' ').slice(1).join(' ') || '',
      COMPANY: lead.company,
      PHONE: lead.phone || '',
      IDC_COUNTRY: countryLabel,
      IDC_ROLE: roleLabel,
      IDC_SENIORITY: seniorityLabel,
      IDC_SCORE: lead.idcScore,
      IDC_LEVEL: lead.idcLevel,
      IDC_SOURCE: 'IDC Calculator',
    },
    listIds: [parseInt(listId, 10)],
    updateEnabled: true,
  };

  try {
    const response = await fetch(`${BREVO_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(body),
    });

    if (response.ok || response.status === 204) {
      return { success: true };
    }

    // 409 means contact already exists but was updated (updateEnabled: true)
    if (response.status === 409) {
      return { success: true };
    }

    const errorData = await response.json().catch(() => ({}));
    console.error('Brevo API error:', response.status, errorData);
    return { success: false, error: `Brevo error: ${response.status}` };
  } catch (error) {
    console.error('Brevo network error:', error);
    return { success: false, error: 'Network error connecting to Brevo' };
  }
}
