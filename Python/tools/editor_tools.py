"""Editor tools for Unreal Engine MCP server."""
import logging
from typing import Optional, Dict, Any

logger = logging.getLogger("UnrealMCP.editor")

def register_editor_tools(mcp):
    """Register editor-related tools with the MCP server."""

    @mcp.tool()
    def get_actors_in_level() -> str:
        """List all actors in the current level."""
        from unreal_mcp_server import get_unreal_connection
        conn = get_unreal_connection()
        if not conn:
            return "Error: Not connected to Unreal Engine"

        result = conn.send_command("get_actors_in_level")
        if result and result.get("status") != "error":
            return str(result)
        return f"Error: {result.get('error', 'Unknown error')}" if result else "Error: No response"

    @mcp.tool()
    def spawn_actor(name: str, actor_type: str = "Actor", location: list = None, rotation: list = None, scale: list = None) -> str:
        """Spawn a new actor in the level."""
        from unreal_mcp_server import get_unreal_connection
        conn = get_unreal_connection()
        if not conn:
            return "Error: Not connected to Unreal Engine"

        params = {
            "name": name,
            "type": actor_type,
            "location": location or [0, 0, 0],
            "rotation": rotation or [0, 0, 0],
            "scale": scale or [1, 1, 1]
        }

        result = conn.send_command("spawn_actor", params)
        if result and result.get("status") != "error":
            return f"Successfully spawned actor: {name}"
        return f"Error: {result.get('error', 'Unknown error')}" if result else "Error: No response"

    @mcp.tool()
    def delete_actor(name: str) -> str:
        """Delete an actor from the level."""
        from unreal_mcp_server import get_unreal_connection
        conn = get_unreal_connection()
        if not conn:
            return "Error: Not connected to Unreal Engine"

        result = conn.send_command("delete_actor", {"name": name})
        if result and result.get("status") != "error":
            return f"Successfully deleted actor: {name}"
        return f"Error: {result.get('error', 'Unknown error')}" if result else "Error: No response"
