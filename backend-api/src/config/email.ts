import * as Brevo from '@getbrevo/brevo';

export const emailApi = new Brevo.TransactionalEmailsApi();
emailApi.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY!
);

export const MAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || 'Pravasa Transworld';
export const MAIL_FROM_EMAIL = process.env.EMAIL_FROM_ADDRESS || process.env.SMTP_USER || '';

export async function verifyMailConnection(): Promise<void> {
  console.log('[EMAIL] Verifying Brevo API connection...');
  console.log(`[EMAIL] From: ${MAIL_FROM_NAME} <${MAIL_FROM_EMAIL}>`);
  try {
    const accountApi = new Brevo.AccountApi();
    accountApi.setApiKey(Brevo.AccountApiApiKeys.apiKey, process.env.BREVO_API_KEY!);
    const { body } = await accountApi.getAccount();
    console.log(`[EMAIL] Brevo connected — account: ${body.email} | plan: ${body.plan?.[0]?.type}`);
  } catch (err: any) {
    console.error('[EMAIL] Brevo API verification FAILED:', err?.message ?? err);
    console.error('[EMAIL] Check BREVO_API_KEY in your env.');
  }
}
