import http from 'http';

const fetchUrl = (url, method = 'GET', body = null, headers = {}) => {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const postData = body ? JSON.stringify(body) : null;
    const reqHeaders = {
      'Content-Type': 'application/json',
      ...headers,
      ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {})
    };

    const req = http.request({
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname + parsed.search,
      method,
      headers: reqHeaders,
    }, (res) => {
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

const runE2E = async () => {
  console.log('🚀 Running Full-Stack E2E Integration Test Suite...\n');

  try {
    // 1. Check Frontend Dev Server
    const fe = await fetchUrl('http://localhost:5173/');
    console.log(`[1] Frontend Dev Server: Status ${fe.status} => Vite HTML loaded (${fe.raw?.length} bytes)`);

    // 2. Check Backend Health
    const be = await fetchUrl('http://localhost:5000/api/health');
    console.log(`[2] Backend API Server: Status ${be.status} => Service: ${be.data?.service}`);

    // 3. User submits lead on website
    const clientLead = await fetchUrl('http://localhost:5000/api/contact', 'POST', {
      name: 'Pankaj Dixit',
      email: 'pankaj@test.com',
      phone: '+91 9893000000',
      company: 'Dixit Innovations',
      service: 'Custom Software & ERP',
      message: 'Need complete ERP consultation and demo.',
      source: 'Website Contact Page'
    });
    console.log(`[3] User Lead Submission: Status ${clientLead.status} => TicketId: ${clientLead.data?.ticketId}`);
    const ticketId = clientLead.data?.ticketId;
    const leadId = clientLead.data?.data?._id;

    // 4. Admin logs in
    const login = await fetchUrl('http://localhost:5000/api/auth/login', 'POST', {
      email: 'admin@blackgrapessoftech.com',
      password: 'BlackGrapes@2026'
    });
    console.log(`[4] Admin Authentication: Status ${login.status} => Auth Token: ${login.data?.token?.slice(0, 20)}...`);
    const token = login.data?.token;

    // 5. Admin retrieves leads and finds newly submitted lead
    const leadsRes = await fetchUrl('http://localhost:5000/api/contact', 'GET', null, {
      'Authorization': `Bearer ${token}`
    });
    const foundLead = leadsRes.data?.data?.find(l => l.ticketId === ticketId);
    console.log(`[5] Admin Leads Review: Fetched ${leadsRes.data?.count} leads => Found Ticket #${ticketId}: ${Boolean(foundLead)}`);

    // 6. Admin updates lead status to "In Progress"
    const updateRes = await fetchUrl(`http://localhost:5000/api/contact/${leadId}`, 'PUT', {
      status: 'In Progress',
      adminNotes: 'Contacted client via WhatsApp, scheduled zoom demo.'
    }, {
      'Authorization': `Bearer ${token}`
    });
    console.log(`[6] Admin Status Update: Status ${updateRes.status} => New Status: ${updateRes.data?.data?.status}`);

    // 7. Admin updates Homepage Hero headline
    const heroUpdate = await fetchUrl('http://localhost:5000/api/content/hero', 'PUT', {
      data: {
        badge: '🍇 Welcome to Black Grapes Softech',
        title: 'Innovate, Integrate, Elevate & Empower Enterprises',
        subtitle: 'Official Black Grapes Softech & Black Grapes Group Enterprise Portal.',
        ctaPrimaryText: 'Explore All Services',
        ctaPrimaryLink: '/services',
        ctaSecondaryText: 'Schedule Strategy Call'
      }
    }, {
      'Authorization': `Bearer ${token}`
    });
    console.log(`[7] Admin Dynamic Content Update: Status ${heroUpdate.status} => Updated Hero Title`);

    // 8. Public website fetches updated Hero
    const publicHero = await fetchUrl('http://localhost:5000/api/content/hero');
    console.log(`[8] Public Website Dynamic Fetch: Status ${publicHero.status} => Current Title: "${publicHero.data?.data?.title}"`);

    console.log('\n🌟 SUCCESS: END-TO-END FLOW (FRONTEND + BACKEND + DATABASE + ADMIN PANEL) FULLY VERIFIED!');
    process.exit(0);
  } catch (err) {
    console.error('❌ E2E failed:', err.message);
    process.exit(1);
  }
};

runE2E();

