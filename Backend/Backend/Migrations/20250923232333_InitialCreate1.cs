using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_valoraciones_carreras_CarreraId",
                table: "valoraciones");

            migrationBuilder.AlterColumn<string>(
                name: "Comentario",
                table: "valoraciones",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<int>(
                name: "CarreraId",
                table: "valoraciones",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_valoraciones_carreras_CarreraId",
                table: "valoraciones",
                column: "CarreraId",
                principalTable: "carreras",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_valoraciones_carreras_CarreraId",
                table: "valoraciones");

            migrationBuilder.AlterColumn<string>(
                name: "Comentario",
                table: "valoraciones",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CarreraId",
                table: "valoraciones",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_valoraciones_carreras_CarreraId",
                table: "valoraciones",
                column: "CarreraId",
                principalTable: "carreras",
                principalColumn: "Id");
        }
    }
}
