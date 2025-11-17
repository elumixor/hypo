"""Project tools for Unreal Engine MCP server."""
import logging

logger = logging.getLogger("UnrealMCP.project")

def register_project_tools(mcp):
    """Register project-related tools with the MCP server."""

    @mcp.tool()
    def create_input_mapping(action_name: str, key: str, input_type: str = "Action") -> str:
        """Create an input mapping in the project settings."""
        from unreal_mcp_server import get_unreal_connection
        conn = get_unreal_connection()
        if not conn:
            return "Error: Not connected to Unreal Engine"

        params = {
            "action_name": action_name,
            "key": key,
            "input_type": input_type
        }
        result = conn.send_command("create_input_mapping", params)

        if result and result.get("status") != "error":
            return f"Successfully created input mapping: {action_name}"
        return f"Error: {result.get('error', 'Unknown error')}" if result else "Error: No response"
