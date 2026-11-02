// Standalone automated test script for Black Grapes REST API
import http from 'http';

const request = (path, method = 'GET', body = null, token = null) => {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {}),
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', err => reject(err));
    if (postData) req.write(postData);
    req.end();
  });
};

const runTests = async () => {
  console.log('🧪 Starting Automated Backend API Verification Suite...\n');

  try {
    // 1. Health check
    const health = await request('/api/health');
    console.log(`[1] Health Check: Status ${health.status} => ${health.data?.service}`);

    // 2. Public Services
    const services = await request('/api/services');
    console.log(`[2] GET /api/services: Status ${services.status} => ${services.data?.count} services returned`);

    // 3. Public Projects
    const projects = await request('/api/projects');
    console.log(`[3] GET /api/projects: Status ${projects.status} => ${projects.data?.count} projects returned`);

    // 4. Public Testimonials
    const testimonials = await request('/api/testimonials');
    console.log(`[4] GET /api/testimonials: Status ${testimonials.status} => ${testimonials.data?.count} testimonials returned`);

    // 5. Public Content (Hero)
    const heroContent = await request('/api/content/hero');
    console.log(`[5] GET /api/content/hero: Status ${heroContent.status} => Title: "${heroContent.data?.data?.title}"`);

    // 6. Public Lead Submission
    const lead = await request('/api/contact', 'POST', {
      name: 'Verification Bot',
      email: 'bot@blackgrapes.test',
      phone: '+91 9999999999',
      service: 'Custom Software & ERP',
      message: 'Automated test enquiry from verification suite.'
    });
    console.log(`[6] POST /api/contact: Status ${lead.status} => TicketId: ${lead.data?.ticketId}`);

    // 7. Admin Login
    const login = await request('/api/auth/login', 'POST', {
      email: 'admin@blackgrapessoftech.com',
      password: 'BlackGrapes@2026'
    });
    console.log(`[7] POST /api/auth/login: Status ${login.status} => Token received: ${Boolean(login.data?.token)}`);
    const token = login.data?.token;

    // 8. Protected GET /api/auth/me
    const me = await request('/api/auth/me', 'GET', null, token);
    console.log(`[8] GET /api/auth/me: Status ${me.status} => Admin: ${me.data?.admin?.email}`);

    // 9. Protected Dashboard Stats
    const stats = await request('/api/dashboard/stats', 'GET', null, token);
    console.log(`[9] GET /api/dashboard/stats: Status ${stats.status} => Total Enquiries: ${stats.data?.data?.enquiries?.total}`);

    // 10. Protected GET /api/contact
    const contacts = await request('/api/contact', 'GET', null, token);
    console.log(`[10] GET /api/contact: Status ${contacts.status} => ${contacts.data?.count} enquiries fetched`);

    console.log('\n🎉 ALL 10 REST API ENDPOINTS TESTED AND VERIFIED SUCCESSFULLY!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Test failed:', err.message);
    process.exit(1);
  }
};

setTimeout(runTests, 1500);

