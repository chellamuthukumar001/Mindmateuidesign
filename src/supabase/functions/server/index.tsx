import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-a16cdc7c/health", (c) => {
  return c.json({ status: "ok" });
});

// Chat endpoint - Send message to Claude AI
app.post("/make-server-a16cdc7c/chat", async (c) => {
  try {
    const { message, conversationHistory } = await c.req.json();
    
    if (!message) {
      return c.json({ error: "Message is required" }, 400);
    }

    const claudeApiKey = Deno.env.get("CLAUDE_API_KEY");
    
    if (!claudeApiKey) {
      console.log("Error: CLAUDE_API_KEY environment variable not set");
      return c.json({ error: "Claude API key not configured" }, 500);
    }

    // Build messages array for Claude API
    const messages = [
      ...(conversationHistory || []),
      { role: "user", content: message }
    ];

    // Call Claude AI API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": claudeApiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        system: `You are MindMate, an AI-powered mental health companion designed exclusively for students.

Your core responsibility is to:
1. Automatically analyze the student's message.
2. Detect the emotional state (stress, anxiety, sadness, loneliness, burnout, fear, demotivation, exam pressure, etc.).
3. Identify the root problem (academic pressure, time management, self-doubt, social issues, family pressure, fear of failure, etc.).
4. Provide empathetic, supportive, and practical guidance tailored to the student's situation.
5. Suggest healthy coping strategies, small actionable steps, and positive reframing.
6. Ask gentle follow-up questions when necessary to better understand the student.
7. Encourage professional help or trusted people if the user shows signs of severe distress, depression, or self-harm.

Behavior Rules:
- Always be kind, calm, and non-judgmental.
- Never shame, blame, or criticize the student.
- Never give medical diagnosis or prescribe medication.
- Never give harmful, risky, or dangerous advice.
- Always prioritize emotional safety.
- Use simple, student-friendly language.
- Respond as a caring friend + mentor.

Response Structure (Automatically apply this):
1. Acknowledge the student's feeling (empathy)
2. Validate their emotion (make them feel understood)
3. Identify the problem in simple words
4. Provide 2–4 practical coping suggestions
5. End with gentle encouragement or a supportive question

If the student expresses:
- Extreme hopelessness
- Self-harm thoughts
- Feeling like giving up on life

Then:
- Respond with extra care and calm tone
- Strongly encourage reaching out to a counselor, trusted person, or helpline
- Reassure them that help is available and they are not alone

Language:
- Default: English
- If user writes in Tamil, respond in Tamil
- Keep tone warm, friendly, and student-like

Your goal is not just to reply, but to emotionally support, guide, and strengthen the student.`,
        messages: messages
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Claude API error: ${response.status} - ${errorText}`);
      return c.json({ error: "Failed to get response from Claude AI" }, 500);
    }

    const data = await response.json();
    const assistantMessage = data.content[0].text;

    return c.json({ 
      message: assistantMessage,
      conversationId: data.id
    });

  } catch (error) {
    console.log(`Error in chat endpoint: ${error}`);
    return c.json({ error: "Internal server error during chat processing" }, 500);
  }
});

// Save mood endpoint
app.post("/make-server-a16cdc7c/mood", async (c) => {
  try {
    const { mood, note, userId = "guest" } = await c.req.json();
    
    if (!mood) {
      return c.json({ error: "Mood is required" }, 400);
    }

    const timestamp = new Date().toISOString();
    const moodKey = `mood:${userId}:${timestamp}`;
    
    await kv.set(moodKey, {
      mood,
      note: note || "",
      timestamp
    });

    return c.json({ 
      success: true,
      message: "Mood saved successfully" 
    });

  } catch (error) {
    console.log(`Error saving mood: ${error}`);
    return c.json({ error: "Failed to save mood" }, 500);
  }
});

// Get mood history endpoint
app.get("/make-server-a16cdc7c/mood/history/:userId", async (c) => {
  try {
    const userId = c.req.param("userId") || "guest";
    const prefix = `mood:${userId}:`;
    
    const moodEntries = await kv.getByPrefix(prefix);
    
    // Sort by timestamp (newest first)
    const sortedMoods = moodEntries.sort((a, b) => {
      return new Date(b.value.timestamp).getTime() - new Date(a.value.timestamp).getTime();
    });

    return c.json({ 
      moods: sortedMoods.map(entry => entry.value)
    });

  } catch (error) {
    console.log(`Error fetching mood history: ${error}`);
    return c.json({ error: "Failed to fetch mood history" }, 500);
  }
});

Deno.serve(app.fetch);