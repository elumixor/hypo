"""Blueprint tools for Unreal Engine MCP server."""
import logging

logger = logging.getLogger("UnrealMCP.blueprint")

def register_blueprint_tools(mcp):
    """Register blueprint-related tools with the MCP server."""

    @mcp.tool()
    def create_blueprint(name: str, parent_class: str = "Actor") -> str:
        """Create a new Blueprint class."""
        from unreal_mcp_server import get_unreal_connection
        conn = get_unreal_connection()
        if not conn:
            return "Error: Not connected to Unreal Engine"

        params = {"name": name, "parent_class": parent_class}
        result = conn.send_command("create_blueprint", params)

        if result and result.get("status") != "error":
            return f"Successfully created blueprint: {name}"
        return f"Error: {result.get('error', 'Unknown error')}" if result else "Error: No response"

    @mcp.tool()
    def compile_blueprint(blueprint_name: str) -> str:
        """Compile a Blueprint."""
        from unreal_mcp_server import get_unreal_connection
        conn = get_unreal_connection()
        if not conn:
            return "Error: Not connected to Unreal Engine"

        result = conn.send_command("compile_blueprint", {"blueprint_name": blueprint_name})

        if result and result.get("status") != "error":
            return f"Successfully compiled blueprint: {blueprint_name}"
        return f"Error: {result.get('error', 'Unknown error')}" if result else "Error: No response"
