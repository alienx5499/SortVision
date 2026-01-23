// Next.js 16: Removed 'edge' runtime for compatibility with cacheComponents
// API routes work fine with Node.js runtime
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      'Access-Control-Allow-Headers':
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    },
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📥 Request body:', JSON.stringify(body, null, 2));
    }

    const messages = body.messages;

    // ✅ Check if messages is a valid array
    if (!Array.isArray(messages)) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Invalid messages format');
      }
      return new Response(JSON.stringify({ error: 'Invalid request format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Log API key presence (not the actual key)
    const hasApiKey = !!process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (process.env.NODE_ENV === 'development') {
      console.log('🔑 API Key present:', hasApiKey);
    }

    if (!hasApiKey) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Missing API key');
      }
      return new Response(
        JSON.stringify({ error: 'Internal server configuration error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Optional: Debug log to verify request body (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log(
        '🟢 Gemini Request Body:',
        JSON.stringify({ contents: messages }, null, 2)
      );
    }

    const result = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: messages,
        }),
      }
    );

    // Check if Gemini API returned a valid response
    if (!result.ok) {
      const errorText = await result.text();
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Gemini API error:', errorText);
      }
      return new Response(
        JSON.stringify({
          error: 'Failed to process request',
        }),
        {
          status: result.status,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await result.json();

    // Log successful response (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Gemini API response:', JSON.stringify(data, null, 2));
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    // Log the full error internally for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Server Error:', error);
    }

    // Return a sanitized error response
    return new Response(
      JSON.stringify({
        error: 'An unexpected error occurred',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
