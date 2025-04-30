all: main

main: ExtrapolationOfIndex.o models.c main.c
	gcc main.c Extrapolation/ExtrapolationOfIndex.o Dependencies/CWebStudioOne.o -o main_server -lm

ExtrapolationOfIndex.o: Extrapolation/ExtrapolationOfIndex.c
	gcc -c Extrapolation/ExtrapolationOfIndex.c -o Extrapolation/ExtrapolationOfIndex.o -lm
