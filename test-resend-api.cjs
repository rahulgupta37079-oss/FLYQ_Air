const { Resend } = require('resend');

const RESEND_API_KEY = 're_NMszkEgy_89qF21MfGhJWpZBztp6ScrVA';
const resend = new Resend(RESEND_API_KEY);

(async () => {
  try {
    console.log('🔍 Testing Resend API...\n');
    console.log('API Key:', RESEND_API_KEY.substring(0, 15) + '...');
    console.log('From:', 'orders@flyqdrones.com');
    console.log('To:', 'rahulgupta37079@gmail.com');
    console.log('\n📧 Sending test email...\n');
    
    const result = await resend.emails.send({
      from: 'FLYQ Drones <onboarding@resend.dev>',
      to: 'rahulgupta37079@gmail.com',
      subject: '🧪 TEST: FLYQ Email Delivery Test',
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px;">
            <h1 style="color: #667eea;">🧪 Resend API Test</h1>
            <p style="font-size: 16px; color: #333;">This is a test email from FLYQ Drones system.</p>
            <p style="font-size: 14px; color: #666;">If you receive this, the Resend API is working correctly!</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #999;">Sent at: ${new Date().toLocaleString()}</p>
          </div>
        </body>
        </html>
      `
    });
    
    console.log('✅ Email sent successfully!\n');
    console.log('📋 Response:', JSON.stringify(result, null, 2));
    console.log('\n📬 Check your inbox: rahulgupta37079@gmail.com');
    console.log('📬 Also check SPAM/JUNK folder');
    console.log('\n⚠️  Note: Emails from unverified domains often go to SPAM');
    
  } catch (error) {
    console.error('❌ ERROR sending email!\n');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    console.error('Error Code:', error.statusCode);
    console.error('\nFull Error:', error);
  }
})();
