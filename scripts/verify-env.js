// Environment Variable Verification Script
console.log('Checking Tina environment variables...');

const envVars = {
  NEXT_PUBLIC_TINA_CLIENT_ID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  TINA_TOKEN: process.env.TINA_TOKEN,
  HEAD: process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main'
};

Object.entries(envVars).forEach(([key, value]) => {
  console.log(`${key}: ${value ? '✓ Present' : '✗ Missing'}`);
  if (value && key !== 'HEAD') {
    // Only show first few characters of sensitive values
    console.log(`  Length: ${value.length} characters`);
    console.log(`  Preview: ${value.substring(0, 4)}...${value.substring(value.length - 4)}`);
  }
});
