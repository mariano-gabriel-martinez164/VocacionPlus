using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class nuevoNombre : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_facultades",
                table: "facultades");

            migrationBuilder.RenameTable(
                name: "facultades",
                newName: "Facultad");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Facultad",
                table: "Facultad",
                column: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Facultad",
                table: "Facultad");

            migrationBuilder.RenameTable(
                name: "Facultad",
                newName: "facultades");

            migrationBuilder.AddPrimaryKey(
                name: "PK_facultades",
                table: "facultades",
                column: "id");
        }
    }
}
