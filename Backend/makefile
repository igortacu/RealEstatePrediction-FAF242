# Detect operating system
ifeq ($(OS),Windows_NT)
	# Windows-specific settings
	CC = gcc
	EXECUTABLE = main_server.exe
	RM = del /Q
	SEP = \\
else
	# Unix-like settings (keep your current setup)
	CC = gcc
	EXECUTABLE = main_server
	RM = rm -f
	SEP = /
endif

all: main

main: CWebStudioOne.o ExtrapolationOfIndex.o HouseProfitCalculator.o models.c main.c
	$(CC) main.c \
	Extrapolation$(SEP)ExtrapolationOfIndex.o \
	Extrapolation$(SEP)HouseProfitCalculator.o \
	Dependencies$(SEP)CWebStudioOne.o -o $(EXECUTABLE) -Wall -Wextra -pedantic -Werror -lm # -fsanitize=address 

ExtrapolationOfIndex.o: Extrapolation$(SEP)ExtrapolationOfIndex.c
	$(CC) -c Extrapolation$(SEP)ExtrapolationOfIndex.c -o Extrapolation$(SEP)ExtrapolationOfIndex.o -Wall -Wextra -pedantic -Werror -lm # -fsanitize=address 

HouseProfitCalculator.o: Extrapolation$(SEP)HouseProfitCalculator.c
	$(CC) -c Extrapolation$(SEP)HouseProfitCalculator.c -o Extrapolation$(SEP)HouseProfitCalculator.o -Wall -Wextra -pedantic -Werror # -fsanitize=address

CWebStudioOne.o: Dependencies$(SEP)CWebStudioOne.c
	$(CC) -c Dependencies$(SEP)CWebStudioOne.c -o Dependencies$(SEP)CWebStudioOne.o 

clean:
	$(RM) $(EXECUTABLE) Extrapolation$(SEP)*.o
