#ifndef EXTRAPOLATION
#define EXTRAPOLATION

typedef struct {
    double *coeffs;
    int coeff_len;
} Polynomial;

/*
    Extrapolates the needed polynomial of num_extrap trimesters
    The coeffs in polynomial needs to be freed.
*/
Polynomial compute_polynomial(int num_extrap);

/*
    Evaluates a polynomial of type Polynomial at point x
*/
double evaluate_polynomial(Polynomial poly , double x);



#endif