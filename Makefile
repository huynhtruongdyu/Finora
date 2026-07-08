.DEFAULT_GOAL := build

SLN=./Finora.slnx
PROJECT=./src/Finora.PWA/Finora.PWA.csproj
CONFIG=Release

.PHONY: build run clean restore format

build:
	dotnet build $(SLN) -c $(CONFIG) --no-restore

run:
	dotnet run --project $(PROJECT) --no-restore

clean:
	dotnet clean

restore:
	dotnet restore

format:
	dotnet format $(SLN)
