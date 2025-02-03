using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace N.EntityFrameworkCore
{
    public static class NDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<NDbContext> builder, string connectionString)
        {
            builder.UseNpgsql(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<NDbContext> builder, DbConnection connection)
        {
            builder.UseNpgsql(connection);
        }
    }
}
