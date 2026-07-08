.DEFAULT_GOAL := build

SLN=./Finora.slnx
PROJECT=./src/Finora.PWA/Finora.PWA.csproj
CONFIG=Release



.PHONY: build run clean restore format publish

build:
	dotnet build $(SLN) -c $(CONFIG) --no-restore

run:
	dotnet run --project $(PROJECT) --no-restores

clean:
	dotnet clean

restore:
	dotnet restore

format:
	dotnet format $(SLN)

publish:
	dotnet publish $(PROJECTs) -c Release -o ./dist
