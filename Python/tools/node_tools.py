"""Blueprint node tools for Unreal Engine MCP server."""
import logging

logger = logging.getLogger("UnrealMCP.nodes")

def register_blueprint_node_tools(mcp):
    """Register blueprint node-related tools with the MCP server."""

    @mcp.tool()
    def add_blueprint_event_node(blueprint_name: str, event_type: str) -> str:
        """Add an event node to a Blueprint."""
        from unreal_mcp_server import get_unreal_connection
        conn = get_unreal_connection()
        if not conn:
            return "Error: Not connected to Unreal Engine"

        params = {"blueprint_name": blueprint_name, "event_type": event_type}
        result = conn.send_command("add_blueprint_event_node", params)

        if result and result.get("status") != "error":
            return f"Successfully added event node: {event_type}"
        return f"Error: {result.get('error', 'Unknown error')}" if result else "Error: No response"
