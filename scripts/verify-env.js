// Environment Variable Verification Script
console.log('Checking environment variables...');

const envVars = {
  HEAD: process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main',
  GITHUB_TOKEN: process.env.GITHUB_TOKEN
};

Object.entries(envVars).forEach(([key, value]) => {
  console.log(`${key}: ${value ? '✓ Present' : '✗ Missing'}`);
  if (value && key !== 'HEAD' && key !== 'GITHUB_TOKEN') {
    // Only show first few characters of sensitive values
    console.log(`  Length: ${value.length} characters`);
    console.log(`  Preview: ${value.substring(0, 4)}...${value.substring(value.length - 4)}`);
  }
});