import { NextRequest, NextResponse } from 'next/server';

// In-memory storage (for demo - use database in production)
const playerCounts: { [key: string]: { count: number; lastUpdate: number } } = {};

// API key validation (store these securely in environment variables in production)
const validApiKeys: { [key: string]: string } = {
  'evershade': process.env.EVERSHADE_API_KEY || 'demo-key-evershade',
  'tsrealms': process.env.TSREALMS_API_KEY || 'demo-key-tsrealms',
  'fp': process.env.FP_API_KEY || 'demo-key-fp',
  'valor': process.env.VALOR_API_KEY || 'demo-key-valor',
  'dom': process.env.DOM_API_KEY || 'demo-key-dom',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { serverId, playerCount, apiKey } = body;

    // Validation
    if (!serverId || playerCount === undefined || !apiKey) {
      return NextResponse.json(
        { error: 'Missing required fields: serverId, playerCount, apiKey' },
        { status: 400 }
      );
    }

    // Verify API key
    if (validApiKeys[serverId] !== apiKey) {
      return NextResponse.json(
        { error: 'Invalid API key for this server' },
        { status: 401 }
      );
    }

    // Validate player count is a number
    if (typeof playerCount !== 'number' || playerCount < 0) {
      return NextResponse.json(
        { error: 'playerCount must be a positive number' },
        { status: 400 }
      );
    }

    // Store the player count with timestamp
    playerCounts[serverId] = {
      count: playerCount,
      lastUpdate: Date.now(),
    };

    return NextResponse.json({
      success: true,
      serverId,
      playerCount,
      message: 'Player count updated successfully',
    });
  } catch (error) {
    console.error('Error processing player count update:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const serverId = searchParams.get('serverId');

  // If serverId provided, return specific server's count
  if (serverId) {
    const data = playerCounts[serverId];
    
    if (!data) {
      return NextResponse.json(
        { error: 'Server not found or no data available' },
        { status: 404 }
      );
    }

    // Check if data is stale (older than 5 minutes)
    const isStale = Date.now() - data.lastUpdate > 5 * 60 * 1000;

    return NextResponse.json({
      serverId,
      playerCount: data.count,
      lastUpdate: new Date(data.lastUpdate).toISOString(),
      isStale,
    });
  }

  // Return all server counts
  const allCounts = Object.entries(playerCounts).map(([id, data]) => ({
    serverId: id,
    playerCount: data.count,
    lastUpdate: new Date(data.lastUpdate).toISOString(),
    isStale: Date.now() - data.lastUpdate > 5 * 60 * 1000,
  }));

  return NextResponse.json({ servers: allCounts });
}
