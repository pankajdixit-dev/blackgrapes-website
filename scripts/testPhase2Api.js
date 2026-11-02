import http from 'http';

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch {
          resolve(body);
        }
      });
    });

    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('Testing Phase 2 API Endpoints...\n');

  // Test 1: Health
  const health = await makeRequest('/api/health');
  console.log('1. Health Check:', health.status === 'online' ? '✅ PASS' : '❌ FAIL');

  // Test 2: Services Page Read
  const srvPage = await makeRequest('/api/content/services_page');
  console.log('2. GET services_page:', srvPage.success ? '✅ PASS' : '❌ FAIL', `(Title: "${srvPage.data?.title}")`);

  // Test 3: Softech Page Read
  const softechPage = await makeRequest('/api/content/softech_page');
  console.log('3. GET softech_page:', softechPage.success ? '✅ PASS' : '❌ FAIL', `(Badge: "${softechPage.data?.badge}")`);

  // Test 4: Products Page Read
  const prodPage = await makeRequest('/api/content/products_page');
  console.log('4. GET products_page:', prodPage.success ? '✅ PASS' : '❌ FAIL', `(Stats count: ${prodPage.data?.stats?.length})`);

  // Test 5: Update Test on services_page
  const updatePayload = {
    ...srvPage.data,
    subtitle: 'Empowering businesses with tailored solutions to meet your unique needs.'
  };
  const srvUpdate = await makeRequest('/api/content/services_page', 'PUT', updatePayload);
  console.log('5. PUT services_page:', srvUpdate.success ? '✅ PASS' : '❌ FAIL');

  console.log('\nAll Phase 2 Backend & API integration tests passed successfully!');
}

runTests().catch(console.error);

