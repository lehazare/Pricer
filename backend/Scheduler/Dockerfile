ARG DOTNET_SDK=8.0
ARG DOTNET_RUNTIME=8.0

FROM mcr.microsoft.com/dotnet/sdk:${DOTNET_SDK} AS build
WORKDIR /src

COPY ["SchedulingAPI/SchedulingAPI.csproj", "SchedulingAPI/"]
RUN dotnet restore "SchedulingAPI/SchedulingAPI.csproj"

COPY . .
WORKDIR "/src/SchedulingAPI"

RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:${DOTNET_RUNTIME} AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80
ENTRYPOINT ["dotnet", "SchedulingAPI.dll"]