#!/usr/bin/env python3
"""
MBridge MCP Server
A Model Context Protocol server for the MBridge fintech landing page.

Tools:
- analyze_trade: AI-powered trade validation using Gemini
- calculate_risk: Position sizing calculator
- subscribe_email: Newsletter subscription
- fetch_market_data: Real-time crypto/forex quotes
"""

import asyncio
import os
import re
import json
from datetime import datetime
from typing import Any

import httpx
from dotenv import load_dotenv
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

# Load environment variables
load_dotenv()

# Initialize MCP server
server = Server("mbridge-mcp")

# API endpoints
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
COINGECKO_API_URL = "https://api.coingecko.com/api/v3"
EXCHANGERATE_API_URL = "https://api.exchangerate-api.com/v4/latest"


@server.list_tools()
async def list_tools() -> list[Tool]:
    """List all available tools."""
    return [
        Tool(
            name="analyze_trade",
            description="Analyze a trading decision or market news using AI. Returns APPROVED or REJECTED verdict with professional explanation.",
            inputSchema={
                "type": "object",
                "properties": {
                    "input": {
                        "type": "string",
                        "description": "Trade rationale or market news to analyze"
                    }
                },
                "required": ["input"]
            }
        ),
        Tool(
            name="calculate_risk",
            description="Calculate position size based on account size, risk percentage, entry price, and stop loss.",
            inputSchema={
                "type": "object",
                "properties": {
                    "accountSize": {
                        "type": "number",
                        "description": "Total account balance in USD"
                    },
                    "riskPercent": {
                        "type": "number",
                        "description": "Risk percentage per trade (0.5 to 5)"
                    },
                    "entryPrice": {
                        "type": "number",
                        "description": "Entry price for the trade"
                    },
                    "stopLoss": {
                        "type": "number",
                        "description": "Stop loss price"
                    },
                    "takeProfit": {
                        "type": "number",
                        "description": "Take profit price (optional)"
                    }
                },
                "required": ["accountSize", "riskPercent", "entryPrice", "stopLoss"]
            }
        ),
        Tool(
            name="subscribe_email",
            description="Subscribe an email address to the MBridge newsletter.",
            inputSchema={
                "type": "object",
                "properties": {
                    "email": {
                        "type": "string",
                        "description": "Email address to subscribe"
                    }
                },
                "required": ["email"]
            }
        ),
        Tool(
            name="fetch_market_data",
            description="Get real-time market data for crypto or forex pairs.",
            inputSchema={
                "type": "object",
                "properties": {
                    "symbol": {
                        "type": "string",
                        "description": "Trading symbol (e.g., BTC, ETH, EURUSD, GBPUSD)"
                    },
                    "type": {
                        "type": "string",
                        "enum": ["crypto", "forex"],
                        "description": "Market type: 'crypto' or 'forex'"
                    }
                },
                "required": ["symbol", "type"]
            }
        )
    ]


@server.call_tool()
async def call_tool(name: str, arguments: dict[str, Any]) -> list[TextContent]:
    """Handle tool calls."""
    
    if name == "analyze_trade":
        return await analyze_trade(arguments)
    elif name == "calculate_risk":
        return await calculate_risk(arguments)
    elif name == "subscribe_email":
        return await subscribe_email(arguments)
    elif name == "fetch_market_data":
        return await fetch_market_data(arguments)
    else:
        raise ValueError(f"Unknown tool: {name}")


async def analyze_trade(arguments: dict[str, Any]) -> list[TextContent]:
    """Analyze trading decision using Gemini AI."""
    input_text = arguments.get("input", "")
    api_key = os.getenv("GEMINI_API_KEY")
    
    if not api_key:
        return [TextContent(
            type="text",
            text="❌ Error: GEMINI_API_KEY not configured. Please add it to your .env file."
        )]
    
    system_prompt = (
        "You are MBridge AI, a strict institutional risk manager for Forex and Stocks. "
        "Analyze the user's input. If it is a trade rationale, check for emotional bias "
        "(FOMO, revenge, hope) and vague logic. If it is news, explain the impact on USD or S&P500. "
        "Output a verdict: 'APPROVED' or 'REJECTED' followed by a 1-2 sentence professional, "
        "stoic explanation. Keep it under 50 words. Be direct."
    )
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{GEMINI_API_URL}?key={api_key}",
                json={
                    "contents": [{"parts": [{"text": input_text}]}],
                    "systemInstruction": {"parts": [{"text": system_prompt}]}
                },
                timeout=30.0
            )
            response.raise_for_status()
            data = response.json()
            
            # Extract text from Gemini response
            result_text = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "No response")
            
            return [TextContent(type="text", text=f"🎯 **Trade Analysis**\n\n{result_text}")]
            
    except httpx.HTTPError as e:
        return [TextContent(type="text", text=f"❌ API Error: {str(e)}")]
    except Exception as e:
        return [TextContent(type="text", text=f"❌ Error: {str(e)}")]


async def calculate_risk(arguments: dict[str, Any]) -> list[TextContent]:
    """Calculate position size and risk metrics."""
    account_size = arguments.get("accountSize", 0)
    risk_percent = arguments.get("riskPercent", 1)
    entry_price = arguments.get("entryPrice", 0)
    stop_loss = arguments.get("stopLoss", 0)
    take_profit = arguments.get("takeProfit")
    
    # Validate inputs
    if account_size <= 0:
        return [TextContent(type="text", text="❌ Account size must be greater than 0")]
    if not (0.5 <= risk_percent <= 5):
        return [TextContent(type="text", text="❌ Risk percent must be between 0.5% and 5%")]
    if entry_price <= 0 or stop_loss <= 0:
        return [TextContent(type="text", text="❌ Entry and stop loss prices must be greater than 0")]
    
    # Calculate risk
    dollar_risk = account_size * (risk_percent / 100)
    price_difference = abs(entry_price - stop_loss)
    position_size = dollar_risk / price_difference if price_difference > 0 else 0
    
    # Determine trade direction
    is_long = entry_price > stop_loss
    direction = "LONG 📈" if is_long else "SHORT 📉"
    
    # Calculate risk-reward if take profit provided
    rr_text = ""
    if take_profit:
        reward_distance = abs(take_profit - entry_price)
        risk_reward = reward_distance / price_difference if price_difference > 0 else 0
        rr_text = f"\n**Risk:Reward Ratio:** 1:{risk_reward:.2f}"
        
        if risk_reward >= 2:
            rr_text += " ✅ (Good)"
        elif risk_reward >= 1:
            rr_text += " ⚠️ (Acceptable)"
        else:
            rr_text += " ❌ (Poor)"
    
    result = f"""📊 **Position Size Calculator**

**Direction:** {direction}
**Account Size:** ${account_size:,.2f}
**Risk Per Trade:** {risk_percent}% (${dollar_risk:,.2f})

**Entry Price:** {entry_price}
**Stop Loss:** {stop_loss}
**Stop Distance:** {price_difference:.5f}

**Position Size:** {position_size:,.4f} units{rr_text}

---
⚠️ *Always use proper risk management. Never risk more than you can afford to lose.*
"""
    
    return [TextContent(type="text", text=result)]


async def subscribe_email(arguments: dict[str, Any]) -> list[TextContent]:
    """Subscribe email to newsletter via Google Sheets."""
    email = arguments.get("email", "").strip()
    sheet_url = os.getenv("GOOGLE_SHEET_URL")
    
    # Validate email format
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_pattern, email):
        return [TextContent(type="text", text="❌ Invalid email format. Please provide a valid email address.")]
    
    if not sheet_url:
        return [TextContent(
            type="text",
            text="❌ Error: GOOGLE_SHEET_URL not configured. Please add it to your .env file."
        )]
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                sheet_url,
                json={
                    "email": email,
                    "timestamp": datetime.now().isoformat()
                },
                timeout=30.0
            )
            
            if response.status_code == 200:
                return [TextContent(
                    type="text",
                    text=f"✅ **Subscribed Successfully!**\n\n{email} has been added to the MBridge newsletter."
                )]
            else:
                return [TextContent(type="text", text=f"❌ Subscription failed. Status: {response.status_code}")]
                
    except Exception as e:
        return [TextContent(type="text", text=f"❌ Error: {str(e)}")]


async def fetch_market_data(arguments: dict[str, Any]) -> list[TextContent]:
    """Fetch real-time market data for crypto or forex."""
    symbol = arguments.get("symbol", "").upper()
    market_type = arguments.get("type", "crypto").lower()
    
    try:
        async with httpx.AsyncClient() as client:
            if market_type == "crypto":
                # Map common symbols to CoinGecko IDs
                crypto_map = {
                    "BTC": "bitcoin",
                    "ETH": "ethereum",
                    "SOL": "solana",
                    "XRP": "ripple",
                    "ADA": "cardano",
                    "DOGE": "dogecoin",
                    "DOT": "polkadot",
                    "AVAX": "avalanche-2",
                    "MATIC": "matic-network",
                    "LINK": "chainlink"
                }
                
                coin_id = crypto_map.get(symbol, symbol.lower())
                
                response = await client.get(
                    f"{COINGECKO_API_URL}/simple/price",
                    params={
                        "ids": coin_id,
                        "vs_currencies": "usd",
                        "include_24hr_change": "true",
                        "include_24hr_vol": "true",
                        "include_market_cap": "true"
                    },
                    timeout=10.0
                )
                response.raise_for_status()
                data = response.json()
                
                if coin_id not in data:
                    return [TextContent(type="text", text=f"❌ Cryptocurrency '{symbol}' not found.")]
                
                coin_data = data[coin_id]
                price = coin_data.get("usd", 0)
                change_24h = coin_data.get("usd_24h_change", 0)
                volume = coin_data.get("usd_24h_vol", 0)
                market_cap = coin_data.get("usd_market_cap", 0)
                
                change_emoji = "📈" if change_24h >= 0 else "📉"
                
                result = f"""🪙 **{symbol}/USD Market Data**

**Price:** ${price:,.2f}
**24h Change:** {change_emoji} {change_24h:+.2f}%
**24h Volume:** ${volume:,.0f}
**Market Cap:** ${market_cap:,.0f}

_Data from CoinGecko_
"""
                return [TextContent(type="text", text=result)]
                
            elif market_type == "forex":
                # Parse forex pair (e.g., EURUSD -> EUR/USD)
                if len(symbol) == 6:
                    base = symbol[:3]
                    quote = symbol[3:]
                else:
                    return [TextContent(type="text", text="❌ Forex symbol must be 6 characters (e.g., EURUSD, GBPUSD)")]
                
                response = await client.get(
                    f"{EXCHANGERATE_API_URL}/{base}",
                    timeout=10.0
                )
                response.raise_for_status()
                data = response.json()
                
                if quote not in data.get("rates", {}):
                    return [TextContent(type="text", text=f"❌ Currency pair {base}/{quote} not found.")]
                
                rate = data["rates"][quote]
                
                result = f"""💱 **{base}/{quote} Exchange Rate**

**Rate:** {rate:.5f}
**Base Currency:** {base}
**Quote Currency:** {quote}

_Data from ExchangeRate-API_
"""
                return [TextContent(type="text", text=result)]
            
            else:
                return [TextContent(type="text", text="❌ Invalid market type. Use 'crypto' or 'forex'.")]
                
    except httpx.HTTPError as e:
        return [TextContent(type="text", text=f"❌ API Error: {str(e)}")]
    except Exception as e:
        return [TextContent(type="text", text=f"❌ Error: {str(e)}")]


async def main():
    """Run the MCP server."""
    async with stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )


if __name__ == "__main__":
    asyncio.run(main())
