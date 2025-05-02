# Detect operating system
ifeq ($(OS),Windows_NT)
	# Windows-specific settings
	CC = gcc
	EXECUTABLE = main_server.exe
	RM = del /Q
	SEP := \\
else
	# Unix-like settings (keep your current setup)
	CC = gcc
	EXECUTABLE = main_server
	RM = rm -f
	SEP = /
endif

CFLAGS = -lws2_32 -lm -Wall -Wextra -pedantic -Werror -Wno-unknown-pragmas 

all: main

main: CWebStudioOne.o ExtrapolationOfIndex.o HouseProfitCalculator.o models.c main.c
	$(CC) main.c \
	Extrapolation$(SEP)ExtrapolationOfIndex.o \
	Extrapolation$(SEP)HouseProfitCalculator.o \
	Dependencies$(SEP)CWebStudioOne.o -o $(EXECUTABLE) $(CFLAGS)

ExtrapolationOfIndex.o: Extrapolation$(SEP)ExtrapolationOfIndex.c
	$(CC) -c Extrapolation$(SEP)ExtrapolationOfIndex.c -o Extrapolation$(SEP)ExtrapolationOfIndex.o $(CFLAGS)

HouseProfitCalculator.o: Extrapolation$(SEP)HouseProfitCalculator.c
	$(CC) -c Extrapolation$(SEP)HouseProfitCalculator.c -o Extrapolation$(SEP)HouseProfitCalculator.o $(CFLAGS)

CWebStudioOne.o: Dependencies$(SEP)CWebStudioOne.c
	$(CC) -c Dependencies$(SEP)CWebStudioOne.c -o Dependencies$(SEP)CWebStudioOne.o -lws2_32 

clean:
	$(RM) $(EXECUTABLE) Extrapolation$(SEP)*.o
