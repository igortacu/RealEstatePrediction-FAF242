all: main


main: ExtrapolationOfIndex.o HouseProfitCalculator.o models.c main.c
	gcc main.c \
	Extrapolation/ExtrapolationOfIndex.o \
	Extrapolation/HouseProfitCalculator.o \
	Dependencies/CWebStudioOne.o -o main_server -Wall -Wextra -pedantic -Werror -lm # -fsanitize=address 

ExtrapolationOfIndex.o: Extrapolation/ExtrapolationOfIndex.c
	gcc -c Extrapolation/ExtrapolationOfIndex.c -o Extrapolation/ExtrapolationOfIndex.o -Wall -Wextra -pedantic -Werror -lm # -fsanitize=address 

HouseProfitCalculator.o: Extrapolation/HouseProfitCalculator.c
	gcc -c Extrapolation/HouseProfitCalculator.c -o Extrapolation/HouseProfitCalculator.o -Wall -Wextra -pedantic -Werror # -fsanitize=address 
