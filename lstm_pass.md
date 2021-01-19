==========================
saxpy: a, b, out, alpha : 
	a*alpha + b
saxpy( bias_h, bias_i, bias_i, 1) 
 === bias_i = bias_h + bias_i

==========================
gemm: a, x, b, out, T_a, T_b, alpha_ax, beta_b:
	alpha_ax*a*x + beta_b*b

bias_i[w_rows, in_cols]   fast_resize!
bias_h[w_rows, in_cols]   fast_resize!
gemm(w_ih, in, bias_i, input_gates, false, false)
 === input_gates = w_ih*in + bias_i

