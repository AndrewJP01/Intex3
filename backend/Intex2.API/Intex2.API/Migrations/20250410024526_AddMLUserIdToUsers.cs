using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Intex2.API.Migrations
{
    /// <inheritdoc />
    public partial class AddMLUserIdToUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MLUserId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MLUserId",
                table: "AspNetUsers");
        }
    }
}
