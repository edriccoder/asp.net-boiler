FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/N.Web.Host/N.Web.Host.csproj", "src/N.Web.Host/"]
COPY ["src/N.Web.Core/N.Web.Core.csproj", "src/N.Web.Core/"]
COPY ["src/N.Application/N.Application.csproj", "src/N.Application/"]
COPY ["src/N.Core/N.Core.csproj", "src/N.Core/"]
COPY ["src/N.EntityFrameworkCore/N.EntityFrameworkCore.csproj", "src/N.EntityFrameworkCore/"]
WORKDIR "/src/src/N.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/N.Web.Host", "src/N.Web.Host"]
COPY ["src/N.Web.Core", "src/N.Web.Core"]
COPY ["src/N.Application", "src/N.Application"]
COPY ["src/N.Core", "src/N.Core"]
COPY ["src/N.EntityFrameworkCore", "src/N.EntityFrameworkCore"]
WORKDIR "/src/src/N.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "N.Web.Host.dll"]
