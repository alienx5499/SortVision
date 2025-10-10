/**
 * SortVision DevTools Test Script
 * 
 * This script helps debug devTools loading issues
 */

console.log('🧪 DevTools Test Script Loaded');

// Test if devTools are available
function testDevTools() {
  console.log('🔍 Testing DevTools availability...');
  
  // Check if toggleDevTools exists
  if (typeof window.toggleDevTools === 'function') {
    console.log('✅ toggleDevTools function found');
    return true;
  } else {
    console.log('❌ toggleDevTools function not found');
    return false;
  }
}

// Test if devTools modules are loaded
function testDevToolsModules() {
  console.log('🔍 Testing DevTools modules...');
  
  const modules = [
    'core.js',
    'ui.js', 
    'device-info.js',
    'performance.js',
    'monitoring.js'
  ];
  
  modules.forEach(module => {
    const script = document.querySelector(`script[src*="${module}"]`);
    if (script) {
      console.log(`✅ ${module} script tag found`);
    } else {
      console.log(`❌ ${module} script tag not found`);
    }
  });
}

// Test localhost detection
function testLocalhostDetection() {
  console.log('🔍 Testing localhost detection...');
  
  const hostname = window.location.hostname;
  const isLocalhost = 
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.startsWith('192.168.') ||
    hostname.startsWith('10.') ||
    hostname.startsWith('172.');
  
  console.log(`📍 Hostname: ${hostname}`);
  console.log(`🏠 Is localhost: ${isLocalhost}`);
  
  return isLocalhost;
}

// Test URL parameters
function testUrlParameters() {
  console.log('🔍 Testing URL parameters...');
  
  const urlParams = new URLSearchParams(window.location.search);
  const cr7Param = urlParams.get('cr7');
  
  console.log(`🔑 cr7 parameter: ${cr7Param}`);
  console.log(`✅ Debug requested: ${cr7Param === 'goat'}`);
  
  return cr7Param === 'goat';
}

// Run all tests
function runAllTests() {
  console.log('🚀 Running DevTools Tests...');
  console.log('================================');
  
  const localhostTest = testLocalhostDetection();
  const urlTest = testUrlParameters();
  const modulesTest = testDevToolsModules();
  const devToolsTest = testDevTools();
  
  console.log('================================');
  console.log('📊 Test Results:');
  console.log(`🏠 Localhost: ${localhostTest ? '✅' : '❌'}`);
  console.log(`🔑 URL Param: ${urlTest ? '✅' : '❌'}`);
  console.log(`📦 Modules: ${modulesTest ? '✅' : '❌'}`);
  console.log(`🔧 DevTools: ${devToolsTest ? '✅' : '❌'}`);
  
  if (devToolsTest) {
    console.log('🎉 DevTools are working! Try: window.toggleDevTools()');
  } else {
    console.log('❌ DevTools are not working. Check the issues above.');
  }
}

// Auto-run tests after a short delay
setTimeout(runAllTests, 2000);

// Expose test functions globally
window.testDevTools = testDevTools;
window.testDevToolsModules = testDevToolsModules;
window.testLocalhostDetection = testLocalhostDetection;
window.testUrlParameters = testUrlParameters;
window.runAllTests = runAllTests;

console.log('🧪 Test functions exposed globally. Run window.runAllTests() to test again.');
