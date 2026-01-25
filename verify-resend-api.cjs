const { Resend } = require('resend');

const RESEND_API_KEY = 're_NMszkEgy_89qF21MfGhJWpZBztp6ScrVA';
const resend = new Resend(RESEND_API_KEY);

async function testResendAPI() {
  console.log('🧪 Testing Resend API\n');
  console.log('API Key:', RESEND_API_KEY);
  console.log('');
  
  try {
    console.log('Sending test email to rahulgupta37079@gmail.com...\n');
    
    const result = await resend.emails.send({
      from: 'FLYQ Drones <onboarding@resend.dev>',
      to: 'rahulgupta37079@gmail.com',
      subject: 'Test Email - FLYQ Campaign',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email to verify Resend API is working.</p>
        <p>If you receive this, the API key is valid.</p>
        <p>Time: ${new Date().toISOString()}</p>
      `
    });
    
    console.log('✅ Email sent successfully!\n');
    console.log('Full Response:', JSON.stringify(result, null, 2));
    
    if (result.data) {
      console.log('\n📧 Message ID:', result.data.id);
    }
    if (result.id) {
      console.log('\n📧 Message ID:', result.id);
    }
    
    console.log('\n✅ Check your email: rahulgupta37079@gmail.com');
    console.log('✅ Check Resend dashboard: https://resend.com/emails');
    
  } catch (error) {
    console.error('❌ Error sending email:');
    console.error('Message:', error.message);
    console.error('Full Error:', JSON.stringify(error, null, 2));
    
    if (error.statusCode === 401) {
      console.error('\n⚠️  API KEY IS INVALID OR EXPIRED');
      console.error('Please check your Resend API key at: https://resend.com/api-keys');
    }
    if (error.statusCode === 403) {
      console.error('\n⚠️  DOMAIN NOT VERIFIED');
      console.error('Please verify your domain at: https://resend.com/domains');
    }
  }
}

testResendAPI();
