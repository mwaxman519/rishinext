import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({ 
    error: "Test error from API endpoint" 
  }, { 
    status: 500 
  });
}