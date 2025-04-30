#include <stdio.h>
#include <stdlib.h>
#include <math.h>
/*To find the coefficients a_0, a_1 ... a_d that minimize this error,
 *we need to understand how changes in these coefficients affect the
 *total error E. The key idea is that at the minimum point of the
 *error function, the slope of the error function with respect
 *to each coefficient must be zero. This is a fundamental concept in calculus.*/
typedef struct {
    double a;
    double b;
    double c;
    double d;
} SplineCoeff;

typedef struct {
    double x;
    double y;
} DPoint;

typedef struct {
    double *coeffs;
    int coeff_len;
} Polynomial;

double x[] = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16};
    
double y[] = {118.9, 123.3, 124.9, 126.9, 135.3, 139.5, 137.9, 136.3, 142.9, 140.4, 140.6, 142.3, 156.3, 166.0, 166.6, 178.8};


void compute_spline_coeffs(int n, double x[], double y[], SplineCoeff spline[]) {
    double h[n], alpha[n], l[n], mu[n], z[n];

    for (int i = 0; i < n-1; i++) 
        h[i] = x[i+1] - x[i];

    for (int i = 1; i < n-1; i++)
        alpha[i] = (3.0/h[i]) * (y[i+1] - y[i]) - (3.0/h[i-1]) * (y[i] - y[i-1]);

    l[0] = 1.0; mu[0] = 0.0; z[0] = 0.0;
    for (int i = 1; i < n-1; i++) {
        l[i] = 2.0 * (x[i+1] - x[i-1]) - h[i-1] * mu[i-1];
        mu[i] = h[i] / l[i];
        z[i] = (alpha[i] - h[i-1] * z[i-1]) / l[i];
    }
    l[n-1] = 1.0; z[n-1] = 0.0;

    for (int i = n-2; i >= 0; i--) {
        spline[i].c = z[i] - mu[i] * z[i+1];
        spline[i].b = (y[i+1] - y[i]) / h[i] - h[i] * (z[i+1] + 2.0 * z[i]) / 3.0;
        spline[i].d = (z[i+1] - z[i]) / (3.0 * h[i]);
        spline[i].a = y[i];
    }
}

double eval_spline(int n, double x[], double y[], SplineCoeff spline[], double x_eval) {
    if (x_eval > x[n-1]) {
        double slope = (y[n-1] - y[n-2]) / (x[n-1] - x[n-2]);
        return y[n-1] + slope * (x_eval - x[n-1]);
    }
    else {
        int i = 0;
        while (x_eval > x[i+1] && i < n-2) i++;
        double dx = x_eval - x[i];
        return spline[i].a + spline[i].b * dx + spline[i].c * dx * dx + spline[i].d * dx * dx * dx;
    }
}

// Solve system by Gaussian elimination
void gaussian_elimination(int n, double **A, double x[]) {
    for (int i = 0; i < n; i++) {
        int max_row = i;
        for (int k = i+1; k < n; k++) {
            if (fabs(A[k][i]) > fabs(A[max_row][i]))
                max_row = k;
        }
        for (int k = i; k < n+1; k++) {
            double tmp = A[max_row][k];
            A[max_row][k] = A[i][k];
            A[i][k] = tmp;
        }
        for (int k = i+1; k < n; k++) {
            double factor = A[k][i] / A[i][i];
            for (int j = i; j < n+1; j++) {
                A[k][j] -= factor * A[i][j];
            }
        }
    }
    for (int i = n-1; i >= 0; i--) {
        x[i] = A[i][n];
        for (int j = i+1; j < n; j++)
            x[i] -= A[i][j] * x[j];
        x[i] /= A[i][i];
    }
}

void fit_polynomial(int n_points, double x[], double y[], int degree, double coeffs[]) {
    //solving the system of minimal error o polynomial of reduced degree
    int m = degree + 1;
    double *X = calloc(2 * degree + 1, sizeof(double));
    for (int i = 0; i <= 2 * degree; i++) {
        for (int j = 0; j < n_points; j++)
            X[i] += pow(x[j], i);
    }

    double **B = malloc(m * sizeof(double*));
    for (int i = 0; i < m; i++)
        B[i] = malloc((m+1) * sizeof(double));

    for (int i = 0; i < m; i++)
        for (int j = 0; j < m; j++)
            B[i][j] = X[i+j];

    for (int i = 0; i < m; i++) {
        B[i][m] = 0;
        for (int j = 0; j < n_points; j++)
            B[i][m] += pow(x[j], i) * y[j];
    }

    gaussian_elimination(m, B, coeffs);

    for (int i = 0; i < m; i++) 
        free(B[i]);
    free(B);
    free(X);
}

Polynomial compute_polynomial(int num_extrap) {
    
    // Initial data
    
    int n = sizeof(x) / sizeof(x[0]);

    // int num_extrap = 6; //number of years you want to predict
    double step = 1.0;

    int total_points = n + num_extrap;

    double x_ext[total_points];
    double y_ext[total_points];

    for (int i = 0; i < n; i++) {
        x_ext[i] = x[i];
        y_ext[i] = y[i];        
    }

    for (int i = 0; i < num_extrap; i++) {
        double x_new = x_ext[n + i - 1] + step;
        SplineCoeff spline[(n + i) - 1];
        compute_spline_coeffs(n + i, x_ext, y_ext, spline);
        y_ext[n + i] = eval_spline(n + i, x_ext, y_ext, spline, x_new);
        x_ext[n + i] = x_new;
    }

    // printf("Extended points:\n");
    // for (int i = 0; i < n + num_extrap; i++) {
    //     printf("(%lf,%lf)\n", x_ext[i], y_ext[i]);
    // }

    // Polynomial fitting after extrapolation
    
    int degree = (int)(round(log2(total_points))) + 1;

    // printf("\nFitting polynomial of degree %d\n", degree);

    double *coeffs = malloc((degree + 1) *sizeof(double));
    int coeff_len = degree + 1;

    fit_polynomial(total_points, x_ext, y_ext, degree, coeffs);

    Polynomial poly = {.coeffs = coeffs, .coeff_len = coeff_len};
    return poly;


    // printf("\nPolynomial coefficients:\n");
    // for (int i = 0; i <= degree; i++) {
    //     printf("%lf ", coeffs[i]);
    // }
    //Coeffs are the coefficients for your polynomial of degree log2(nr_temesters) + 1
    // free(x_ext);
    // free(y_ext);
    // free(coeffs);
}

double evaluate_polynomial(Polynomial poly , double x) {

    double res = 0;

    for (int i = 0; i < poly.coeff_len; i++) {
        res += poly.coeffs[i] * pow(x, i);
    }   

    return res;

}