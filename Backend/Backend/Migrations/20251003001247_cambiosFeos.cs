using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class cambiosFeos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_carreras_facultades_FacultadId",
                table: "carreras");

            migrationBuilder.DropForeignKey(
                name: "FK_tags_testVocacionales_TestVocacionalId",
                table: "tags");

            migrationBuilder.DropIndex(
                name: "IX_tags_TestVocacionalId",
                table: "tags");

            migrationBuilder.DropIndex(
                name: "IX_carreras_FacultadId",
                table: "carreras");

            migrationBuilder.DropColumn(
                name: "TestVocacionalId",
                table: "usuarios");

            migrationBuilder.DropColumn(
                name: "TestVocacionalId",
                table: "tags");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TestVocacionalId",
                table: "usuarios",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TestVocacionalId",
                table: "tags",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tags_TestVocacionalId",
                table: "tags",
                column: "TestVocacionalId");

            migrationBuilder.CreateIndex(
                name: "IX_carreras_FacultadId",
                table: "carreras",
                column: "FacultadId");

            migrationBuilder.AddForeignKey(
                name: "FK_carreras_facultades_FacultadId",
                table: "carreras",
                column: "FacultadId",
                principalTable: "facultades",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tags_testVocacionales_TestVocacionalId",
                table: "tags",
                column: "TestVocacionalId",
                principalTable: "testVocacionales",
                principalColumn: "Id");
        }
    }
}
