"""UMG (Widget Blueprint) tools for Unreal Engine MCP server."""
import logging

logger = logging.getLogger("UnrealMCP.umg")

def register_umg_tools(mcp):
    """Register UMG-related tools with the MCP server."""

    @mcp.tool()
    def create_umg_widget_blueprint(widget_name: str, parent_class: str = "UserWidget", path: str = "/Game/UI") -> str:
        """Create a new UMG Widget Blueprint."""
        from unreal_mcp_server import get_unreal_connection
        conn = get_unreal_connection()
        if not conn:
            return "Error: Not connected to Unreal Engine"

        params = {
            "widget_name": widget_name,
            "parent_class": parent_class,
            "path": path
        }
        result = conn.send_command("create_umg_widget_blueprint", params)

        if result and result.get("status") != "error":
            return f"Successfully created UMG widget: {widget_name}"
        return f"Error: {result.get('error', 'Unknown error')}" if result else "Error: No response"

    @mcp.tool()
    def add_widget_to_viewport(widget_name: str, z_order: int = 0) -> str:
        """Add a widget instance to the game viewport."""
        from unreal_mcp_server import get_unreal_connection
        conn = get_unreal_connection()
        if not conn:
            return "Error: Not connected to Unreal Engine"

        params = {"widget_name": widget_name, "z_order": z_order}
        result = conn.send_command("add_widget_to_viewport", params)

        if result and result.get("status") != "error":
            return f"Successfully added widget to viewport: {widget_name}"
        return f"Error: {result.get('error', 'Unknown error')}" if result else "Error: No response"
