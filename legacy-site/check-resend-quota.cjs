const { Resend } = require('resend');

const RESEND_API_KEY = 're_NMszkEgy_89qF21MfGhJWpZBztp6ScrVA';
const resend = new Resend(RESEND_API_KEY);

async function checkResendQuota() {
  console.log('📊 Checking Resend API Quotas\n');
  
  try {
    // Make a test call to check headers
    const result = await resend.emails.send({
      from: 'FLYQ Drones <onboarding@resend.dev>',
      to: 'rahulgupta37079@gmail.com',
      subject: 'Quota Check',
      html: '<p>Checking quotas...</p>'
    });
    
    const headers = result.headers || {};
    
    console.log('═══════════════════════════════════════════════════');
    console.log('RESEND QUOTA STATUS');
    console.log('═══════════════════════════════════════════════════');
    console.log('Rate Limit:', headers['ratelimit-limit'] || 'Unknown');
    console.log('Rate Remaining:', headers['ratelimit-remaining'] || 'Unknown');
    console.log('Rate Reset:', headers['ratelimit-reset'] || 'Unknown');
    console.log('');
    console.log('Daily Quota Remaining:', headers['x-resend-daily-quota'] || 'Unknown');
    console.log('Monthly Quota Remaining:', headers['x-resend-monthly-quota'] || 'Unknown');
    console.log('═══════════════════════════════════════════════════\n');
    
    const dailyQuota = parseInt(headers['x-resend-daily-quota'] || '0');
    const monthlyQuota = parseInt(headers['x-resend-monthly-quota'] || '0');
    
    if (dailyQuota === 0) {
      console.log('⚠️  WARNING: Daily quota is EXHAUSTED (0 remaining)');
      console.log('   You cannot send more emails today.');
      console.log('   The quota resets at midnight UTC.\n');
    }
    
    if (monthlyQuota < 63) {
      console.log(`⚠️  WARNING: Monthly quota is LOW (${monthlyQuota} remaining)`);
      console.log(`   You need 63 emails but only have ${monthlyQuota} remaining this month.\n`);
    }
    
    console.log('🔍 Resend Free Plan Limits:');
    console.log('   - 100 emails per day');
    console.log('   - 3,000 emails per month');
    console.log('   - Rate limit: 2 requests per second\n');
    
    console.log('💡 SOLUTION OPTIONS:\n');
    console.log('1. Wait until tomorrow (midnight UTC) for daily quota reset');
    console.log('2. Upgrade Resend plan: https://resend.com/pricing');
    console.log('3. Use a different email service (SendGrid, AWS SES, etc.)');
    console.log('4. Split sending across multiple days\n');
    
    console.log('📧 Message ID from this test:', result.data?.id || result.id);
    console.log('✅ Check Resend dashboard: https://resend.com/emails');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkResendQuota();
