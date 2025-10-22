using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class FixCarrera : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarreraTag_carreras_CarrerasId",
                table: "CarreraTag");

            migrationBuilder.DropForeignKey(
                name: "FK_CarreraTag_tags_TagsId",
                table: "CarreraTag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CarreraTag",
                table: "CarreraTag");

            migrationBuilder.RenameTable(
                name: "CarreraTag",
                newName: "CarreraTags");

            migrationBuilder.RenameIndex(
                name: "IX_CarreraTag_TagsId",
                table: "CarreraTags",
                newName: "IX_CarreraTags_TagsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CarreraTags",
                table: "CarreraTags",
                columns: new[] { "CarrerasId", "TagsId" });

            migrationBuilder.AddForeignKey(
                name: "FK_CarreraTags_carreras_CarrerasId",
                table: "CarreraTags",
                column: "CarrerasId",
                principalTable: "carreras",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CarreraTags_tags_TagsId",
                table: "CarreraTags",
                column: "TagsId",
                principalTable: "tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarreraTags_carreras_CarrerasId",
                table: "CarreraTags");

            migrationBuilder.DropForeignKey(
                name: "FK_CarreraTags_tags_TagsId",
                table: "CarreraTags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CarreraTags",
                table: "CarreraTags");

            migrationBuilder.RenameTable(
                name: "CarreraTags",
                newName: "CarreraTag");

            migrationBuilder.RenameIndex(
                name: "IX_CarreraTags_TagsId",
                table: "CarreraTag",
                newName: "IX_CarreraTag_TagsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CarreraTag",
                table: "CarreraTag",
                columns: new[] { "CarrerasId", "TagsId" });

            migrationBuilder.AddForeignKey(
                name: "FK_CarreraTag_carreras_CarrerasId",
                table: "CarreraTag",
                column: "CarrerasId",
                principalTable: "carreras",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CarreraTag_tags_TagsId",
                table: "CarreraTag",
                column: "TagsId",
                principalTable: "tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
