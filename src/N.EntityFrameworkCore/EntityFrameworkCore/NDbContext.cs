using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using N.Authorization.Roles;
using N.Authorization.Users;
using N.Products;
using N.MultiTenancy;
using N.Persons;
using Abp.Localization;
using System;

namespace N.EntityFrameworkCore
{
    public class NDbContext : AbpZeroDbContext<Tenant, Role, User, NDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public virtual DbSet<ProductCategory> ProductCategories { get; set; }
        public virtual DbSet<Person> Persons { get; set; }
        public NDbContext(DbContextOptions<NDbContext> options)
            : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationLanguageText>()
                .Property(p => p.Value)
                .HasMaxLength(100); // any integer that is smaller than 10485760
        }
    }
}
