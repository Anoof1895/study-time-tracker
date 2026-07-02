import React, { useState, useEffect, useCallback, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// SYLLABUS DATA — three-level hierarchy: Unit → Topic Group → Objectives
// Groups map exactly to the sub-headings in the IAL specification documents.
// ─────────────────────────────────────────────────────────────────────────────
const SYLLABUS = [

  // ═══════════════════════════════════════════════════════════════════════════
  // MATHEMATICS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'maths', name: 'Mathematics', emoji: '∑',
    color: { digital: 'from-cyan-500 to-blue-600', pill: 'from-cyan-500/20 to-blue-600/20 text-cyan-300 border-cyan-500/30' },
    levels: {
      AS: [
        {
          unit: 'P1 — Pure Mathematics 1',
          groups: [
            {
              name: '1. Algebra and Functions',
              objectives: [
                '1.1 Laws of indices for all rational exponents: aᵐ × aⁿ = aᵐ⁺ⁿ, aᵐ ÷ aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ',
                '1.2 Use and manipulation of surds, including rationalising denominators',
                '1.3 Quadratic functions and their graphs',
                '1.4 The discriminant of a quadratic function; know and use b² − 4ac > 0, = 0, < 0',
                '1.5 Completing the square: ax² + bx + c = a(x + b/2a)² + (c − b²/4a); solution of quadratic equations',
                '1.6 Solve simultaneous equations; analytical solution by substitution',
                '1.7 Interpret linear and quadratic inequalities graphically (e.g. ax+b > cx+d, px²+qx+r ≤ 0)',
                '1.8 Represent linear and quadratic inequalities graphically with shading and dotted/solid line convention',
                '1.9 Find solutions of linear and quadratic inequalities analytically',
                '1.10 Algebraic manipulation of polynomials: expanding brackets, collecting like terms, factorisation (degree ≤ 3)',
                '1.11 Sketch curves defined by simple equations; use intersection points of graphs to solve equations; asymptotes',
                '1.12 Effect of simple transformations on y = f(x): y = af(x), y = f(x)+a, y = f(x+a), y = f(ax)',
              ],
            },
            {
              name: '2. Coordinate Geometry in the (x, y) Plane',
              objectives: [
                '2.1 Equation of a straight line: y − y₁ = m(x − x₁) and ax+by+c = 0; line through two points; parallel and perpendicular lines',
                '2.2 Conditions for two straight lines to be parallel (equal gradient) or perpendicular (product of gradients = −1)',
              ],
            },
            {
              name: '3. Trigonometry',
              objectives: [
                '3.1 Sine rule and cosine rule; area of a triangle = ½ab sin C, including the ambiguous case',
                '3.2 Radian measure: arc length s = rθ, area of sector A = ½r²θ',
                '3.3 Sine, cosine and tangent functions; their graphs, symmetries and periodicity',
              ],
            },
            {
              name: '4. Differentiation',
              objectives: [
                '4.1 The derivative f′(x) as the gradient of the tangent to y = f(x); gradient as a limit; second order derivatives; interpretation as a rate of change',
                '4.2 Differentiation of xⁿ and related sums, differences and constant multiples',
                '4.3 Applications of differentiation to gradients, tangents and normals at specific points on a curve',
              ],
            },
            {
              name: '5. Integration',
              objectives: [
                '5.1 Indefinite integration as the reverse of differentiation; constant of integration C required',
                '5.2 Integration of xⁿ (excluding n = −1); find y = f(x) given f′(x) and a point on the curve',
              ],
            },
          ],
        },
        {
          unit: 'P2 — Pure Mathematics 2',
          groups: [
            {
              name: '1. Proof',
              objectives: [
                '1.1 Understand and use the structure of mathematical proof: given assumptions → logical steps → conclusion',
                '1.2 Proof by exhaustion (trying all cases)',
                '1.3 Disproof by counter-example',
              ],
            },
            {
              name: '2. Algebra and Functions',
              objectives: [
                '2.1 Algebraic long division; Factor Theorem: if f(b/a) = 0 then (ax−b) is a factor; Remainder Theorem; factorising cubics',
              ],
            },
            {
              name: '3. Coordinate Geometry in the (x, y) Plane',
              objectives: [
                '3.1 Circle equation (x−a)²+(y−b)² = r²; properties: angle in semicircle = 90°; perpendicular from centre bisects chord; radius ⊥ tangent',
              ],
            },
            {
              name: '4. Sequences and Series',
              objectives: [
                '4.1 Sequences given by a formula for the nth term and by a recurrence relation xₙ₊₁ = f(xₙ)',
                '4.2 Arithmetic sequences: nth term = a+(n−1)d; Sₙ = n/2[2a+(n−1)d]; sum of first n natural numbers = n(n+1)/2',
                '4.3 Increasing sequences, decreasing sequences and periodic sequences',
                '4.4 Geometric sequences: nth term = arⁿ⁻¹; Sₙ = a(1−rⁿ)/(1−r); S∞ = a/(1−r) when |r| < 1',
                '4.5 Binomial expansion of (a+bx)ⁿ for positive integer n; use of n!, ⁿCᵣ notation',
              ],
            },
            {
              name: '5. Exponentials and Logarithms',
              objectives: [
                '5.1 y = aˣ and its graph (a > 0, a ≠ 1)',
                '5.2 Laws of logarithms: logₐ(xy) = logₐx + logₐy; logₐ(x/y) = logₐx − logₐy; logₐ(xᵏ) = k logₐx; logₐa = 1',
                '5.3 Solution of equations of the form aˣ = b; students may use the change of base formula',
              ],
            },
            {
              name: '6. Trigonometry',
              objectives: [
                '6.1 Know and use: sin θ / cos θ = tan θ and sin²θ + cos²θ = 1',
                '6.2 Solution of simple trigonometric equations in a given interval',
              ],
            },
            {
              name: '7. Differentiation',
              objectives: [
                '7.1 Applications of differentiation: maxima and minima, stationary points, increasing and decreasing functions; curve sketching in context',
              ],
            },
            {
              name: '8. Integration',
              objectives: [
                '8.1 Evaluation of definite integrals: ∫ₐᵇ f(x) dx',
                '8.2 Definite integral as area under a curve; area bounded by a curve and straight lines; area between two curves',
                '8.3 Trapezium rule: approximate ∫ₐᵇ f(x) dx using n strips of equal width h = (b−a)/n',
              ],
            },
          ],
        },
        {
          unit: 'S1 — Statistics 1',
          groups: [
            {
              name: '1. Mathematical Modelling',
              objectives: [
                '1.1 The basic ideas of mathematical modelling as applied in probability and statistics',
              ],
            },
            {
              name: '2. Data Presentation and Interpretation',
              objectives: [
                '2.1 Histograms, stem-and-leaf diagrams, box plots; back-to-back stem-and-leaf for comparing distributions',
                '2.2 Measures of location — mean, median, mode; drawing inferences; coding (e.g. y = (x−a)/b)',
                '2.3 Measures of dispersion — variance σ², standard deviation σ, range, interpercentile ranges; simple interpolation',
                '2.4 Skewness; concept of outliers; illustrating outliers on a box plot',
              ],
            },
            {
              name: '3. Probability',
              objectives: [
                '3.1 Elementary probability: P(A) = (favourable outcomes) / (total outcomes)',
                '3.2 P(A′) = 1−P(A); P(A∪B) = P(A)+P(B)−P(A∩B); P(A∩B) = P(A)·P(B|A); conditional probability',
                '3.3 Independence: P(B|A) = P(B); P(A∩B) = P(A)·P(B)',
                '3.4 Sum and product laws; tree diagrams and Venn diagrams; sampling with and without replacement',
              ],
            },
            {
              name: '4. Correlation and Regression',
              objectives: [
                '4.1 Scatter diagrams; linear regression using least squares; equation ŷ = a + bx',
                '4.2 Explanatory (independent) and response (dependent) variables; interpolation vs extrapolation',
                '4.3 Product moment correlation coefficient r; use, interpretation and limitations',
              ],
            },
            {
              name: '5. Discrete Random Variables',
              objectives: [
                '5.1 Concept of a discrete random variable X',
                '5.2 Probability function p(x) = P(X = x); cumulative distribution function F(x₀) = P(X ≤ x₀)',
                '5.3 E(X), E(X²); Var(X) = E(X²) − [E(X)]²; E(aX+b) = aE(X)+b; Var(aX+b) = a²Var(X)',
                '5.4 Discrete uniform distribution; mean = (n+1)/2; variance = (n²−1)/12',
              ],
            },
            {
              name: '6. Normal Distribution',
              objectives: [
                '6.1 Normal distribution N(μ, σ²): shape, symmetry, use of tables of the cumulative distribution function Φ(z); solving simultaneous equations in μ and σ',
              ],
            },
          ],
        },
      ],
      A2: [
        {
          unit: 'P3 — Pure Mathematics 3',
          groups: [
            {
              name: '1. Algebra and Functions',
              objectives: [
                '1.1 Simplification of rational expressions: factorising, cancelling and algebraic division',
                '1.2 Definition of a function; domain and range; composition fg; inverse functions f⁻¹ and their graphs',
                '1.3 The modulus function |x|; graphs involving modulus; solving equations and inequalities with |f(x)|',
                '1.4 Combinations of transformations on y = f(x)',
              ],
            },
            {
              name: '2. Trigonometry',
              objectives: [
                '2.1 Secant, cosecant and cotangent; 1+tan²θ = sec²θ; 1+cot²θ = cosec²θ',
                '2.2 Inverse trig functions arcsin, arccos, arctan; their domains, ranges and graphs',
                '2.3 Addition formulae: sin(A±B) = sinA cosB ± cosA sinB; cos(A±B) = cosA cosB ∓ sinA sinB; tan(A±B)',
                '2.4 Double angle formulae; express a cosθ + b sinθ in the form R cos(θ±α) or R sin(θ±α)',
              ],
            },
            {
              name: '3. Exponentials and Logarithms',
              objectives: [
                '3.1 y = eˣ and y = ln x; ln x as the inverse of eˣ; their graphs and properties',
                '3.2 Logarithmic graphs: plot log y vs log x to model y = axⁿ (intercept = log a, gradient = n)',
                '3.3 Plot log y vs x to model y = kbˣ (intercept = log k, gradient = log b)',
              ],
            },
            {
              name: '4. Differentiation',
              objectives: [
                '4.1 Differentiation of eᵏˣ, ln(kx), sin(kx), cos(kx), tan(kx) and their sums and differences',
                '4.2 Product rule: d/dx[uv] = u′v + uv′; quotient rule: d/dx[u/v] = (u′v − uv′)/v²; chain rule',
                '4.3 dy/dx = 1/(dx/dy) — e.g. find dy/dx when x = sin³y',
                '4.4 Exponential growth and decay; d/dx(aˣ) = aˣ ln a',
              ],
            },
            {
              name: '5. Integration',
              objectives: [
                '5.1 Integration of eᵏˣ, 1/x, sin(kx), cos(kx) and their sums and differences',
                '5.2 Integration by recognition: ∫f′(x)/f(x) dx = ln|f(x)|+c; use trig identities for sin²x, tan²x, cos²3x',
              ],
            },
            {
              name: '6. Numerical Methods',
              objectives: [
                '6.1 Location of roots of f(x) = 0 by sign change of f(x) in a continuous interval [a, b]',
                '6.2 Iterative methods including recurrence relations xₙ₊₁ = f(xₙ) for approximate solutions',
              ],
            },
          ],
        },
        {
          unit: 'P4 — Pure Mathematics 4',
          groups: [
            {
              name: '1. Proof',
              objectives: [
                '1.1 Proof by contradiction, including irrationality of √2 and infinitude of primes',
              ],
            },
            {
              name: '2. Partial Fractions',
              objectives: [
                '2.1 Partial fractions with denominators up to repeated linear terms; applications to integration, differentiation and series',
              ],
            },
            {
              name: '3. Coordinate Geometry',
              objectives: [
                '3.1 Parametric equations of curves; conversion between Cartesian and parametric forms',
              ],
            },
            {
              name: '4. Binomial Series',
              objectives: [
                '4.1 Binomial series for any rational n: (1+x)ⁿ = 1 + nx + n(n−1)/2! x² + …; valid for |x| < 1',
              ],
            },
            {
              name: '5. Differentiation',
              objectives: [
                '5.1 Implicit differentiation; parametric differentiation; equations of tangents and normals',
                '5.2 Formation of differential equations; connected rates of change (e.g. dV/dt = dV/dr · dr/dt)',
              ],
            },
            {
              name: '6. Integration',
              objectives: [
                '6.1 Volume of revolution: V = π∫y² dx; find V given parametric equations',
                '6.2 Integration by substitution (reverse chain rule); integration by parts: ∫u dv = uv − ∫v du; ∫ln x dx',
                '6.3 Integration using partial fractions (rational expressions from section 2)',
                '6.4 Analytical solution of first-order separable differential equations; general and particular solutions',
                '6.5 Area under a parametric curve: A = ∫y (dx/dt) dt',
              ],
            },
            {
              name: '7. Vectors',
              objectives: [
                '7.1 Vectors in two and three dimensions',
                '7.2 Magnitude |a| of a vector; unit vector â = a/|a|',
                '7.3 Vector addition and multiplication by scalars; geometrical interpretations',
                '7.4 Position vectors: OB⃗ − OA⃗ = AB⃗ = b − a',
                '7.5 Distance between two points: d² = (x₁−x₂)² + (y₁−y₂)² + (z₁−z₂)²',
                '7.6 Vector equations of lines: r = a + tb; conditions for parallel, intersecting or skew lines',
                '7.7 Scalar product a·b = a₁b₁+a₂b₂+a₃b₃ = |a||b|cosθ; if a·b = 0 and a, b ≠ 0 then a ⊥ b',
              ],
            },
          ],
        },
        {
          unit: 'M1 — Mechanics 1',
          groups: [
            {
              name: '1. Mathematical Modelling in Mechanics',
              objectives: [
                '1.1 Mathematical modelling in mechanics; terms: particle, lamina, rigid body, rod, inextensible string, smooth/rough surface, pulley, bead, wire, peg',
              ],
            },
            {
              name: '2. Vectors in Mechanics',
              objectives: [
                '2.1 Magnitude and direction of a vector; resultant; resolving into components; unit vectors i and j',
                '2.2 Vectors applied to displacements, velocities, accelerations and forces in a plane',
              ],
            },
            {
              name: '3. Kinematics of a Particle Moving in a Straight Line',
              objectives: [
                '3.1 Motion with constant acceleration; SUVAT graphs; equations: v = u+at, s = ut+½at², v² = u²+2as, s = ½(u+v)t',
              ],
            },
            {
              name: '4. Newton\'s Laws of Motion',
              objectives: [
                '4.1 Newton\'s laws of motion; constant acceleration problems in scalar or vector form (ai + bj)',
                '4.2 Two connected particles; smooth pulleys/pegs; motion under changing force; motion on smooth or rough inclined plane',
                '4.3 Momentum p = mv; impulse J = FΔt = Δp; conservation of momentum for two directly colliding particles',
                '4.4 Coefficient of friction μ; kinetic friction force F = μR when a particle is moving',
              ],
            },
            {
              name: '5. Statics of a Particle',
              objectives: [
                '5.1 Forces treated as vectors; resolution of forces',
                '5.2 Equilibrium of a particle under coplanar forces; weight, normal reaction, tension, thrust, friction',
                '5.3 Coefficient of friction μ; F ≤ μR in equilibrium (limiting friction)',
              ],
            },
            {
              name: '6. Moments',
              objectives: [
                '6.1 Moment of a force about a point; simple problems with coplanar parallel forces; conditions for equilibrium: ΣF = 0 and Σmoments = 0',
              ],
            },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHYSICS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'physics', name: 'Physics', emoji: 'φ',
    color: { digital: 'from-violet-500 to-purple-700', pill: 'from-violet-500/20 to-purple-700/20 text-violet-300 border-violet-500/30' },
    levels: {
      AS: [
        {
          unit: 'Unit 1 — Mechanics & Materials',
          groups: [
            {
              name: '1.3 Mechanics',
              objectives: [
                '1. Use the equations for uniformly accelerated motion: s = ut + ½at², v = u + at, v² = u² + 2as, s = ½(u+v)t',
                '2. Draw and interpret displacement-time, velocity-time and acceleration-time graphs',
                '3. Know physical quantities derived from slopes and areas of s-t, v-t and a-t graphs, including non-uniform acceleration',
                '4. Understand scalar and vector quantities; give examples of each; recognise vector notation',
                '5. Resolve a vector into two perpendicular components by drawing and by calculation',
                '6. Find the resultant of two coplanar vectors at any angle by drawing, and at right angles by calculation',
                '7. Understand the independence of vertical and horizontal motion of a projectile under gravity',
                '8. Draw and interpret free-body force diagrams; use the concept of centre of gravity of an extended body',
                '9. Use F = ma (Newton\'s 2nd law, m constant); state Newton\'s 1st law (a = 0); use the term \'terminal velocity\'',
                '10. Use gravitational field strength g = F/m and weight W = mg',
                '11. CORE PRACTICAL 1: Determine the acceleration of a freely-falling object',
                '12. Know Newton\'s 3rd law; know the properties of force pairs in an interaction between two bodies',
                '13. Understand momentum: p = mv',
                '14. Know the principle of conservation of linear momentum; relate to Newton\'s laws; apply in one dimension',
                '15. Use moment of a force = Fx where x is the perpendicular distance from the line of action to the axis',
                '16. Use the concept of centre of gravity; apply the principle of moments to an extended body in equilibrium',
                '17. Use work done: W = Fs cos θ, including when the force is not along the line of motion',
                '18. Use kinetic energy: Eₖ = ½mv²',
                '19. Use change in gravitational PE: ΔEgrav = mgΔh (near Earth\'s surface)',
                '20. Know and apply the principle of conservation of energy using Eₖ, Egrav and W',
                '21. Use power: P = E/t and P = W/t',
                '22. Use efficiency = useful energy output / total energy input; and = useful power output / total power input',
              ],
            },
            {
              name: '1.4 Materials',
              objectives: [
                '23. Use ρ = m/V',
                '24. Understand and use the relationship: upthrust = weight of fluid displaced',
                '25. Use Stokes\' Law for viscous drag: F = 6πηrv; applies to small spheres at low speeds with laminar flow; η is temperature-dependent',
                '26. CORE PRACTICAL 2: Use a falling-ball method to determine the viscosity of a liquid',
                '27. Use Hooke\'s Law: F = kx, where k is the stiffness constant',
                '28. Understand stress = F/A, strain = ΔL/L₀, and Young modulus E = stress/strain',
                '29. (a) Draw and interpret force-extension and force-compression graphs; (b) understand limit of proportionality, elastic limit, yield point, elastic and plastic deformation',
                '30. Draw and interpret stress-strain graphs; understand breaking stress',
                '31. CORE PRACTICAL 3: Determine the Young modulus of a material',
                '32. Calculate elastic strain energy: Eel = ½FΔx = area under force-extension graph (linear and non-linear)',
              ],
            },
          ],
        },
        {
          unit: 'Unit 2 — Waves & Electricity',
          groups: [
            {
              name: '2.3 Waves and Particle Nature of Light',
              objectives: [
                '33. Understand the terms amplitude, frequency f, period T = 1/f, wave speed v and wavelength λ',
                '34. Use the wave equation: v = fλ',
                '35. Describe longitudinal waves in terms of pressure variation and displacement of molecules',
                '36. Describe transverse waves',
                '37. Draw and interpret graphs representing transverse and longitudinal waves, including standing waves',
                '38. CORE PRACTICAL 4: Determine the speed of sound in air using a 2-beam oscilloscope, signal generator, speaker and microphone',
                '39. Know and understand: wavefront, coherence, path difference, superposition, interference and phase',
                '40. Use the relationship: phase difference = (2π/λ) × path difference',
                '41. Know what is meant by a standing wave; understand how it is formed; identify nodes and antinodes',
                '42. Use the speed of a transverse wave on a string: v = √(T/μ) where T = tension, μ = mass per unit length',
                '43. CORE PRACTICAL 5: Investigate effects of length, tension and mass per unit length on frequency of a vibrating string or wire',
                '44. Use the equation for intensity of radiation: I = P/A (W m⁻²)',
                '45. Know Snell\'s law at an interface: n₁ sin θ₁ = n₂ sin θ₂ where refractive index n = c/v',
                '46. Calculate critical angle: sin C = 1/n (when n₂ = 1)',
                '47. Predict whether total internal reflection will occur at an interface',
                '48. Understand how to measure the refractive index of a solid material',
                '49. Understand plane polarisation of transverse waves',
                '50. Understand diffraction; use Huygens\' construction to explain what happens to a wave meeting a slit or obstacle',
                '51. Use the diffraction grating equation: nλ = d sin θ',
                '52. CORE PRACTICAL 6: Determine the wavelength of light using a diffraction grating',
                '53. Understand how diffraction experiments provide evidence for the wave nature of electrons',
                '54. Use the de Broglie equation: λ = h/p = h/(mv)',
                '55. Understand that waves can be transmitted and reflected at an interface between media',
                '56. Understand how a pulse-echo technique provides information about position; how wavelength or pulse duration limits the information',
                '57. Understand EM radiation in terms of both a wave model and a photon model; how these models developed',
                '58. Use E = hf relating photon energy to wave frequency',
                '59. Understand that absorption of a photon can result in emission of a photoelectron',
                '60. Understand threshold frequency f₀ and work function φ; use hf = φ + ½mv²max',
                '61. Use the electronvolt (eV): 1 eV = 1.6 × 10⁻¹⁹ J',
                '62. Understand how the photoelectric effect provides evidence for the particle nature of EM radiation',
                '63. Understand atomic line spectra as transitions between discrete energy levels; calculate f = ΔE/h for emitted or absorbed radiation',
              ],
            },
            {
              name: '2.4 Electric Circuits',
              objectives: [
                '64. Understand that electric current is the rate of flow of charge; use I = ΔQ/Δt',
                '65. Understand and use V = W/Q (potential difference = work done per unit charge)',
                '66. Understand resistance defined by R = V/I; Ohm\'s law is a special case when I ∝ V at constant temperature',
                '67. Use resistivity: ρ = RA/L',
                '68. Derive and use equations for resistances in series (Rₜ = R₁+R₂+…) and parallel (1/Rₜ = 1/R₁+1/R₂+…)',
                '69. Use P = VI, W = VIt; derive and use P = I²R and P = V²/R',
                '70. Sketch, recognise and interpret I–V graphs for: ohmic conductors, filament bulbs, thermistors and diodes',
                '71. Use resistivity ρ = RA/L; know resistivity is a material property independent of dimensions',
                '72. CORE PRACTICAL 7: Determine the electrical resistivity of a material',
                '73. Use I = nqvA to explain the large range of resistivities (n = number density of charge carriers)',
                '74. Understand how potential varies along a uniform current-carrying wire with distance',
                '75. Understand the principles of a potential divider; calculate potential differences and resistances in such a circuit',
                '76. Analyse potential divider circuits where one resistance is variable, including thermistors and LDRs',
                '77. Know the definition of e.m.f. ε; understand internal resistance r; distinguish e.m.f. from terminal p.d.: V = ε − Ir',
                '78. CORE PRACTICAL 8: Determine the e.m.f. and internal resistance of an electrical cell',
                '79. Understand changes of resistance with temperature in metallic conductors and NTC thermistors (lattice vibrations + number of conduction electrons)',
                '80. Understand changes of resistance with illumination in LDRs (number of conduction electrons)',
              ],
            },
          ],
        },
        {
          unit: 'Unit 3 — Practical Skills in Physics I',
          groups: [
            {
              name: 'Assessment Objectives',
              objectives: [
                'Planning: Identify most appropriate apparatus (range, resolution, dimensions); discuss calibration; describe measurement of relevant variables; identify and control all other variables; discuss whether repeat readings are appropriate; identify health and safety issues; discuss how data will be used',
                'Implementation & Measurements: Tabulate results with correct headings and units; record to appropriate significant figures; identify inconsistent readings; comment on the number and range of measurements taken',
                'Processing Results: Calculate quantities from experimental data; plot appropriate graphs with correct scales and units; draw best-fit lines; determine gradients using a large triangle; comment on trends or patterns; determine relationships or constants from graph features',
              ],
            },
          ],
        },
      ],
      A2: [
        {
          unit: 'Unit 4 — Further Mechanics, Fields & Particles',
          groups: [
            {
              name: '4.3 Further Mechanics',
              objectives: [
                '81. Use impulse = FΔt = Δp (Newton\'s 2nd law in impulse-momentum form)',
                '82. CORE PRACTICAL 9: Investigate the relationship between force on an object and its change of momentum',
                '83. Apply conservation of linear momentum to problems in two dimensions',
                '84. CORE PRACTICAL 10: Use ICT to analyse collisions between small spheres',
                '85. Determine whether a collision is elastic (Eₖ conserved) or inelastic (Eₖ not conserved)',
                '86. Derive and use Eₖ = p²/(2m)',
                '87. Express angular displacement in radians and degrees; convert between units',
                '88. Understand angular velocity ω; use v = ωr and T = 2π/ω',
                '89. Derive centripetal acceleration: a = v²/r = rω²',
                '90. Understand that a resultant centripetal force is required to maintain circular motion',
                '91. Use centripetal force: F = mv²/r = mrω²',
              ],
            },
            {
              name: '4.4 Electric and Magnetic Fields',
              objectives: [
                '92. Understand that an electric field is a region where a charged particle experiences a force',
                '93. Understand electric field strength E = F/Q; use this equation',
                '94. Use Coulomb\'s law: F = Q₁Q₂/(4πε₀r²)',
                '95. Use E = Q/(4πε₀r²) for the electric field due to a point charge',
                '96. Know the relation between electric field and electric potential: E = −dV/dr',
                '97. Use E = V/d for a uniform electric field between parallel plates',
                '98. Use V = Q/(4πε₀r) for a radial electric field',
                '99. Draw and interpret field line and equipotential diagrams for radial and uniform electric fields',
                '100. Understand capacitance C = Q/V; use this equation',
                '101. Use W = ½QV for energy stored; derive from area under Q–V graph; use W = ½CV² and W = Q²/(2C)',
                '102. Draw and interpret charge and discharge curves for RC circuits; understand time constant τ = RC',
                '103. CORE PRACTICAL 11: Use an oscilloscope or data logger to display and analyse p.d. across a capacitor charging and discharging',
                '104. Use Q = Q₀e^(−t/RC); I = I₀e^(−t/RC); V = V₀e^(−t/RC); and their logarithmic forms',
                '105. Understand and use magnetic flux density B, flux Φ = BA cos θ and flux linkage NΦ',
                '106. Use F = Bqv sin θ; apply Fleming\'s left-hand rule to charged particles in a magnetic field',
                '107. Use F = BIl sin θ; apply Fleming\'s left-hand rule to current-carrying conductors in a magnetic field',
                '108. Understand factors affecting the e.m.f. induced in a coil when there is relative motion between coil and magnet',
                '109. Understand factors affecting e.m.f. induced when current in another linked coil changes',
                '110. Use Faraday\'s law combined with Lenz\'s law: ε = −d(NΦ)/dt',
              ],
            },
            {
              name: '4.5 Nuclear and Particle Physics',
              objectives: [
                '111. Understand nucleon number A (mass number) and proton number Z (atomic number)',
                '112. Understand how large-angle α scattering gives evidence for a nuclear model; how understanding of atomic structure changed over time',
                '113. Understand thermionic emission; how electrons can be accelerated by electric and magnetic fields',
                '114. Understand the role of electric and magnetic fields in particle accelerators (linac, cyclotron) and detectors (ionisation, deflection)',
                '115. Derive and use r = p/(BQ) = mv/(BQ) for a charged particle in a magnetic field',
                '116. Apply conservation of charge, energy and momentum to particle interactions; interpret particle tracks',
                '117. Understand why high energies are required to investigate the structure of nucleons',
                '118. Use ΔE = c²Δm in creation and annihilation of matter and antimatter',
                '119. Use MeV and GeV (energy) and MeV/c², GeV/c² (mass); convert between these and SI units',
                '120. Understand situations in which relativistic increase in particle lifetime is significant',
                '121. Know the standard quark-lepton model: baryons (3 quarks), mesons (quark+antiquark), leptons (fundamental), photons; symmetry predicted the top quark',
                '122. Know that every particle has a corresponding antiparticle; deduce antiparticle properties from particle properties',
                '123. Use conservation of charge, baryon number and lepton number to determine whether a particle interaction is possible',
                '124. Write and interpret particle equations given relevant particle symbols',
              ],
            },
          ],
        },
        {
          unit: 'Unit 5 — Thermodynamics, Oscillations & Cosmology',
          groups: [
            {
              name: '5.3 Thermodynamics',
              objectives: [
                '125. Use ΔE = mcΔθ (specific heat capacity) and ΔE = LΔm (specific latent heat)',
                '126. CORE PRACTICAL 12: Calibrate a thermistor in a potential divider circuit as a thermostat',
                '127. CORE PRACTICAL 13: Determine the specific latent heat of a phase change',
                '128. Understand internal energy as the random distribution of potential and kinetic energy amongst molecules',
                '129. Understand absolute zero; average Eₖ of molecules is proportional to absolute temperature T',
                '130. Use ideal gas equation: pV = NkT (N = number of molecules, k = Boltzmann constant)',
                '131. CORE PRACTICAL 14: Investigate the relationship between pressure and volume of a gas at fixed temperature',
                '132. Use pV = nRT (n = moles, R = molar gas constant); relate to kinetic theory: p = ⅓ρ⟨c²⟩',
              ],
            },
            {
              name: '5.4 Nuclear Decay',
              objectives: [
                '133. Understand nuclear binding energy; use ΔE = c²Δm to calculate nuclear masses and binding energy (including mass deficit)',
                '134. Use the atomic mass unit u; convert between u and kg: 1 u = 1.66 × 10⁻²⁷ kg',
                '135. Understand nuclear fusion and fission with reference to the binding energy per nucleon curve',
                '136. Understand the mechanism of nuclear fusion; need for very high densities and temperatures',
                '137. Understand background radiation; take appropriate account of it in calculations',
                '138. Understand the nature, penetration, ionising ability and range in materials of α, β and γ radiations',
                '139. Write and interpret nuclear equations given relevant particle symbols (e.g. ⁴₂He, ⁰₋₁e)',
                '140. CORE PRACTICAL 15: Investigate the absorption of gamma radiation by lead',
                '141. Understand the spontaneous and random nature of nuclear decay',
                '142. Determine half-lives graphically; use A = λN, dN/dt = −λN, λ = ln 2/t½, N = N₀e^(−λt), A = A₀e^(−λt); derive log forms',
              ],
            },
            {
              name: '5.5 Oscillations',
              objectives: [
                '143. Understand that the condition for SHM is F = −kx; identify situations in which SHM will occur',
                '144. Use a = −ω²x, x = A cos(ωt), v = −Aω sin(ωt), a = −Aω² cos(ωt), T = 2π/ω = 1/f, ω = 2πf',
                '145. Use T = 2π√(m/k) for a mass-spring oscillator and T = 2π√(l/g) for a simple pendulum',
                '146. Draw and interpret a displacement-time graph for an oscillating object; gradient gives velocity',
                '147. Draw and interpret a velocity-time graph for an oscillating object; gradient gives acceleration',
                '148. Understand what is meant by resonance (amplitude maximum when driving frequency = natural frequency)',
                '149. CORE PRACTICAL 16: Determine the value of an unknown mass using resonant frequencies of the oscillation of known masses',
                '150. Apply conservation of energy to damped and undamped oscillating systems: Etotal = ½kA²',
                '151. Understand the distinction between free and forced oscillations',
                '152. Understand how amplitude of a forced oscillation changes at and around the natural frequency; how damping affects resonance',
                '153. Understand how damping and plastic deformation of ductile materials reduce the amplitude of oscillation',
              ],
            },
            {
              name: '5.6 Astrophysics and Cosmology',
              objectives: [
                '154. Understand that a gravitational field is a region where a mass experiences a force',
                '155. Understand gravitational field strength g = F/m; use this equation',
                '156. Use Newton\'s law of universal gravitation: F = Gm₁m₂/r²',
                '157. Derive and use g = GM/r² for the gravitational field due to a point mass or sphere',
                '158. Use Vgrav = −GM/r for a radial gravitational field',
                '159. Compare electric fields with gravitational fields (similarities and differences)',
                '160. Apply Newton\'s laws of motion and universal gravitation to orbital motion; derive T² ∝ r³',
                '161. Understand what is meant by a black body radiator; interpret radiation curves and the peak wavelength',
                '162. Use the Stefan-Boltzmann law: L = σAT⁴ (σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴)',
                '163. Use Wien\'s law: λmax·T = 2.898 × 10⁻³ m K',
                '164. Use intensity: I = L/(4πd²) where L is luminosity and d is distance',
                '165. Understand how astronomical distances are determined using trigonometric parallax',
                '166. Understand how astronomical distances are determined using standard candles',
                '167. Sketch and interpret a Hertzsprung-Russell (H-R) diagram relating stellar luminosity to surface temperature',
                '168. Relate the H-R diagram to the life cycle of stars (main sequence → red giant → white dwarf / supernova → neutron star / black hole)',
                '169. Understand the Doppler effect: movement of a wave source relative to an observer gives rise to a shift in frequency',
                '170. Use redshift z = Δf/f ≈ Δλ/λ ≈ v/c; and Hubble\'s law: v = H₀d',
                '171. Understand the controversy over the age and ultimate fate of the universe, the Hubble constant H₀, and the possible existence of dark matter',
              ],
            },
          ],
        },
        {
          unit: 'Unit 6 — Practical Skills in Physics II',
          groups: [
            {
              name: 'Assessment Objectives',
              objectives: [
                'Planning: Identify most appropriate apparatus with details (range, resolution, dimensions); discuss calibration; describe measurement of relevant variables; identify and state how to control all other variables; discuss repeat readings; identify health and safety issues; discuss how data will be used',
                'Implementation & Measurements: Comment on how the experiment could be improved; comment on number and range of measurements and significant figures; identify and amend incorrect units; identify and check inconsistent readings',
                'Analysis: Perform calculations with correct significant figures; plot results with appropriate scale and units (may be logarithmic); comment on trend/pattern; determine relationship or constant using graph gradient (large triangle); use precision, accuracy and sensitivity appropriately; suggest realistic modifications to reduce errors; discuss uncertainties qualitatively and quantitatively; compound percentage uncertainties; determine % uncertainty from single readings (half resolution) and from multiple readings (half range)',
              ],
            },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHEMISTRY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'chem', name: 'Chemistry', emoji: 'λ',
    color: { digital: 'from-emerald-500 to-teal-600', pill: 'from-emerald-500/20 to-teal-600/20 text-emerald-300 border-emerald-500/30' },
    levels: {
      AS: [
        {
          unit: 'Unit 1 — Structure, Bonding & Introductory Organic Chemistry',
          groups: [
            {
              name: 'Topic 1: Formulae, Equations & Amount of Substance',
              objectives: [
                '1.1 Know the terms: atom, element, ion, molecule, compound, empirical formula and molecular formula',
                '1.2 Know that the mole (mol) is the unit for amount of substance; perform calculations using L = 6.02 × 10²³ mol⁻¹',
                '1.3 Write balanced full and ionic equations, including state symbols, for chemical reactions',
                '1.4 Understand: relative atomic mass (¹²C scale), relative molecular/formula mass (calculate from Ar values), molar mass (g mol⁻¹), parts per million (ppm)',
                '1.5 Calculate the concentration of a solution in mol dm⁻³ and g dm⁻³',
                '1.6 Use experimental data to calculate empirical and molecular formulae',
                '1.7 Use chemical equations to calculate reacting masses using amount of substance n = m/M',
                '1.8 Use chemical equations to calculate volumes of gases using molar volume and pV = nRT',
                '1.9 Calculate percentage yield = (actual yield / theoretical yield) × 100%; atom economy = (M of desired product / ΣM of all products) × 100%',
                '1.10 Determine a formula or confirm an equation by experiment, including evaluation of data',
                '1.11 CORE PRACTICAL 1: Measurement of the molar volume of a gas',
                '1.12 Relate ionic and full equations (with state symbols) to observations from test-tube experiments: displacement, acids, precipitation',
              ],
            },
            {
              name: 'Topic 2: Atomic Structure',
              objectives: [
                '2.1 Know the structure of an atom in terms of electrons, protons and neutrons',
                '2.2 Know the relative mass and charge of protons (1, +1), neutrons (1, 0) and electrons (1/1836, −1)',
                '2.3 Know the terms atomic (proton) number Z and mass number A',
                '2.4 Use Z and A to determine the number of protons, neutrons and electrons in an atom or ion',
                '2.5 Understand the term isotope (same Z, different A)',
                '2.6 Understand basic principles of a mass spectrometer; analyse mass spectra: isotopic composition, Ar, Mr, 2+ ions',
                '2.7 Predict mass spectra including relative peak heights for diatomic molecules (e.g. Cl₂) given isotopic abundances',
                '2.8 Define first, second and third ionisation energies; understand all ionisation energies are endothermic',
                '2.9 Know that an orbital is a region within an atom that can hold up to two electrons with opposite spins',
                '2.10 Understand how ionisation energies are influenced by: nuclear charge, electron shielding, and sub-shell of the electron removed',
                '2.11 Know that successive IE data provides evidence for quantum shells and group membership; first IE data across periods provides evidence for sub-shells',
                '2.12 Describe the shapes of s and p orbitals',
                '2.13 Know Hund\'s rule: orbitals in sub-shells (i) each take a single electron before pairing; (ii) pair with two electrons of opposite spin',
                '2.14 Predict electronic configurations of atoms H to Kr and their ions in s, p, d notation and electrons-in-boxes',
                '2.15 Understand that electronic configuration determines the chemical properties of an element',
                '2.16 Know the Periodic Table is divided into s, p, d blocks; know the number of electrons occupying s (2), p (6), d (10) sub-shells',
                '2.17 Represent data graphically for elements 1–36 (including log of first IE); explain the term periodic property',
                '2.18 Explain: (i) trends in melting/boiling points of Periods 2 and 3; (ii) trends in ionisation energy across Periods 2 and 3; (iii) decrease in first IE down a group',
              ],
            },
            {
              name: 'Topic 3: Bonding',
              objectives: [
                '3.1 Know and interpret evidence for the existence of ions: physical properties of ionic compounds, electron density maps, migration of ions',
                '3.2 Describe the formation of ions in terms of loss or gain of electrons',
                '3.3 Draw dot-and-cross diagrams to show electrons in cations and anions',
                '3.4 Describe ionic crystals as giant lattices of ions',
                '3.5 Know that ionic bonding results from strong net electrostatic attraction between oppositely charged ions',
                '3.6 Understand the effects of ionic radius and ionic charge on the strength of ionic bonding (lattice enthalpy)',
                '3.7 Understand reasons for trends in ionic radii down a group and for isoelectronic ions (e.g. N³⁻ to Al³⁺)',
                '3.8 Understand polarisation as applied to ions: a small, highly-charged cation distorts the electron cloud of a large anion',
                '3.9 Understand that polarising power of a cation depends on its charge density; polarisability of an anion depends on its radius and charge',
                '3.10 Understand covalent bonding as strong electrostatic attraction between two nuclei and a shared pair of electrons; evidence from electron density maps',
                '3.11 Know that covalent bonds can be non-polar or polar; understand electronegativity and its effect on bond polarity (δ+ and δ−)',
                '3.12 Distinguish intramolecular forces (covalent bonds) from intermolecular forces',
                '3.13 Draw dot-and-cross diagrams for: H₂, HCl, H₂O, NH₃, CH₄, CO₂, Cl₂, F₂, N₂, C₂H₄, C₂H₂, PCl₅, SF₆',
                '3.14 Understand that multiple bonds comprise σ bonds and π bonds; describe the bonding in C₂H₄ (C=C: 1σ + 1π)',
                '3.15 Use VSEPR theory to predict shapes and bond angles: linear CO₂ (180°), trigonal planar BF₃ (120°), tetrahedral CH₄ (109.5°), pyramidal NH₃ (107°), bent H₂O (104.5°), trigonal bipyramidal PCl₅, octahedral SF₆',
                '3.16 Know the differences between σ and π bonds in terms of symmetry and orbital overlap',
                '3.17 Know that a coordinate (dative covalent) bond forms when both electrons come from one atom; examples: NH₄⁺, CO',
                '3.18 Know metallic bonding: strong electrostatic attraction between positive ions and delocalised electrons',
                '3.19 Understand how the structure of metals (close packing) explains: high melting point, electrical conductivity, malleability, ductility',
                '3.20 Understand giant covalent structures: diamond (tetrahedral, very hard, non-conducting), graphite (layers of hexagonal rings, conducting due to delocalised π electrons), graphene',
              ],
            },
            {
              name: 'Topic 4: Introductory Organic Chemistry — Alkanes',
              objectives: [
                '4.1 Know the general formula of alkanes CₙH₂ₙ₊₂ and cycloalkanes CₙH₂ₙ; they are saturated hydrocarbons (single bonds only)',
                '4.2 Draw and name alkanes and cycloalkanes using IUPAC nomenclature',
                '4.3 Know the homologous series concept: same general formula, same functional group, gradual change in physical properties',
                '4.4 Know the meaning of: functional group, homolytic and heterolytic fission, free radical (•), carbocation, carbanion, nucleophile, electrophile, addition, substitution, elimination, hydrolysis',
                '4.5 Write mechanisms using curly arrows; curly arrows start from a bond or lone pair of electrons',
                '4.6 Understand structural isomerism; draw all structural isomers of alkanes and cycloalkanes up to C₆',
                '4.7 Know that alkanes are fuels from fractional distillation, cracking and reforming of crude oil; write equations for these processes',
                '4.8 Know that combustion of alkane fuels produces pollutants: CO (toxic), NOₓ (acidic), SOₓ (acidic), particulates, unburned hydrocarbons',
                '4.9 Discuss reasons for developing alternative fuels: sustainability, reducing CO₂ emissions and climate change',
                '4.10 Apply the concept of carbon neutrality to petrol, bioethanol and hydrogen',
                '4.11 Understand reactions of alkanes with: (i) O₂ (combustion); (ii) halogens (free radical substitution)',
                '4.12 Understand the mechanism of free radical substitution: initiation (homolytic fission, X₂ → 2X• by UV); propagation (chain steps); termination (two radicals combine); limited use due to further substitution',
              ],
            },
            {
              name: 'Topic 5: Alkenes',
              objectives: [
                '5.1 Know the general formula of alkenes CₙH₂ₙ; understand that C=C (1σ + 1π) makes alkenes unsaturated and reactive',
                '5.2 Explain geometric (cis-trans) isomerism: restricted rotation around C=C; different substituents on each carbon',
                '5.3 Understand the E/Z naming system (Cahn-Ingold-Prelog priority rules); know when cis/trans is insufficient',
                '5.4 Describe reactions of alkenes: (i) H₂/Ni → alkane; (ii) X₂ → dihalogenoalkane; (iii) HX → halogenoalkane; (iv) H₂O/H⁺ → alcohol; (v) KMnO₄(aq)/H⁺ → diol',
                '5.5 Know the qualitative test for C=C: decolourises bromine water (Br₂(aq))',
                '5.6 Describe the mechanism of electrophilic addition: (i) Br₂ and HBr to ethene; (ii) HBr to propene (Markovnikov\'s rule via more stable carbocation); curly arrow notation',
                '5.7 Describe addition polymerisation of alkenes; draw the repeat unit given the monomer, and vice versa',
                '5.8 Understand how polymer disposal problems are limited: (i) biodegradable polymers; (ii) removing toxic gases from incineration',
              ],
            },
          ],
        },
        {
          unit: 'Unit 2 — Energetics, Group Chemistry, Halogenoalkanes & Alcohols',
          groups: [
            {
              name: 'Topic 6: Energetics',
              objectives: [
                '6.1 Know that ΔH is the heat energy change at constant pressure; standard conditions: 100 kPa and 298 K',
                '6.2 Know that exothermic reactions have ΔH < 0 and endothermic reactions have ΔH > 0',
                '6.3 Construct and interpret enthalpy level diagrams showing exothermic and endothermic changes',
                '6.4 Know the definitions of standard enthalpy change of: (i) reaction Δ_rH°; (ii) formation Δ_fH°; (iii) combustion Δ_cH°; (iv) neutralisation Δ_neutH°; (v) atomisation Δ_atH°',
                '6.5 Use experimental data to calculate: (i) energy transferred using q = mcΔT; (ii) molar enthalpy change in kJ mol⁻¹',
                '6.6 Know Hess\'s Law: ΔH for a reaction is independent of the pathway; use it to construct enthalpy cycles and calculate ΔH',
                '6.7 CORE PRACTICAL 2: Determination of the enthalpy change of a reaction using Hess\'s Law',
                '6.8 Evaluate experimental results; comment on sources of error, uncertainty and assumptions; draw graphs with cooling curve corrections',
                '6.9 Understand bond enthalpy and mean bond enthalpy; use bond enthalpies to calculate ΔH = Σ(bonds broken) − Σ(bonds formed)',
                '6.10 Calculate mean bond enthalpies from enthalpy changes of reaction',
                '6.11 Understand that bond enthalpy data indicates which bond breaks first and gives an idea of how rapidly a reaction occurs at room temperature',
              ],
            },
            {
              name: 'Topic 7: Intermolecular Forces',
              objectives: [
                '7.1 Understand the nature of: (i) London forces (instantaneous dipole–induced dipole, increase with Mr); (ii) permanent dipole–permanent dipole interactions; (iii) hydrogen bonds (N-H···N, O-H···O, F-H···F)',
                '7.2 Understand the intermolecular interactions in H₂O, liquid NH₃ and liquid HF that give rise to hydrogen bonding',
                '7.3 Understand anomalous properties of water from hydrogen bonding: (i) high melting/boiling point compared to H₂S, H₂Se; (ii) density of ice (less dense than liquid water)',
                '7.4 Predict the presence of hydrogen bonding in molecules analogous to those in 7.2',
                '7.5 Understand, in terms of intermolecular forces: trends in b.p. of alkanes with chain length (↑ London forces); effect of branching (↓ surface area → ↓ b.p.); higher b.p. of alcohols vs alkanes; trends in b.p. of HF to HI',
                '7.6 Understand factors influencing choice of solvents: (i) water dissolves ionic compounds (ion hydration); (ii) water dissolves simple alcohols (H-bonding); (iii) water is a poor solvent for halogenoalkanes (cannot form H-bonds); (iv) non-aqueous solvents for compounds with similar intermolecular forces',
              ],
            },
            {
              name: 'Topic 8: Redox, Group 1, 2 and 7',
              objectives: [
                '8.1 Know what is meant by oxidation number; understand the rules for assigning oxidation numbers',
                '8.2 Calculate oxidation numbers of elements in compounds and ions, including peroxides (O = −1) and metal hydrides (H = +1)',
                '8.3 Indicate the oxidation number of an element in a compound or ion using a Roman numeral',
                '8.4 Write formulae given oxidation numbers',
                '8.5 Understand oxidation (increase in ox. no., loss of e⁻) and reduction (decrease in ox. no., gain of e⁻); apply to reactions of s- and p-block elements',
                '8.6 Know how to balance equations for redox reactions by combining ionic half-equations',
                '8.7 Know the reactions of Group 1 elements (Li, Na, K) with water; write equations and observations',
                '8.8 Know the reactions of Group 2 elements with water and dilute acids; understand trends in reactivity down Group 2',
                '8.9 Know the uses of Group 2 compounds: Ca(OH)₂ (neutralise soil acidity), CaO (water treatment, mortar), Mg(OH)₂ (indigestion remedy)',
                '8.10 Know the properties and reactions of Group 7 elements Cl₂, Br₂, I₂: physical state at room temp; displacement reactions; disproportionation of Cl₂ with H₂O and NaOH',
                '8.11 Know the tests for halide ions using acidified AgNO₃ solution followed by ammonia: AgCl (white, soluble in dilute NH₃), AgBr (cream, soluble in conc. NH₃), AgI (yellow, insoluble in NH₃)',
                '8.12 Know the reactions of HCl, HBr and HI with conc. H₂SO₄: HCl → Cl₂ only; HBr → Br₂ + SO₂; HI → I₂ + H₂S + SO₂ (reducing power increases HCl < HBr < HI)',
              ],
            },
            {
              name: 'Topic 9: Kinetics and Equilibria',
              objectives: [
                '9.1 Understand reaction rate in terms of collision theory: effect of concentration, temperature, surface area and catalysts',
                '9.2 Understand Maxwell-Boltzmann distribution; understand how temperature affects the number of molecules with E ≥ Ea',
                '9.3 Understand reversible reactions, equilibrium and dynamic equilibrium; understand the equilibrium constant Kc',
                '9.4 Write expressions for Kc for given homogeneous equilibria; perform calculations using Kc',
                '9.5 Apply Le Chatelier\'s Principle to predict and explain effects of changing concentration, temperature and pressure on equilibrium position',
                '9.6 Understand the effect of a catalyst on equilibrium position (no effect) and on the value of Kc (no effect, but speeds up attainment of equilibrium)',
              ],
            },
            {
              name: 'Topic 10: Halogenoalkanes and Alcohols',
              objectives: [
                '10.1 Understand the general formula and IUPAC naming of halogenoalkanes',
                '10.2 Know that C–X bond polarity leads to nucleophilic substitution; relative reactivities: C–F (least reactive) < C–Cl < C–Br < C–I',
                '10.3 Understand the mechanism of SN2 nucleophilic substitution of primary halogenoalkanes by OH⁻(aq); curly arrow notation',
                '10.4 Know reactions of halogenoalkanes with: (i) NaOH(aq) → alcohol; (ii) KOH/ethanol → alkene (elimination); (iii) NH₃(ethanol) → amine; (iv) NaCN(ethanol) → nitrile (chain extension)',
                '10.5 Know reactions of alcohols with: (i) Na → H₂ + sodium alkoxide; (ii) PCl₅ → halogenoalkane; (iii) HBr → bromoalkane; (iv) conc. H₂SO₄/heat → alkene; (v) [O] (K₂Cr₂O₇/H₂SO₄) → aldehyde, ketone or carboxylic acid',
                '10.6 Distinguish primary, secondary and tertiary alcohols; oxidation products: primary → aldehyde/carboxylic acid; secondary → ketone; tertiary → no oxidation',
                '10.7 Understand the use of IR spectroscopy and mass spectrometry to identify organic compounds',
                '10.8 Interpret IR spectra to identify functional groups using characteristic wavenumbers (e.g. broad O–H ≈ 2500–3300 cm⁻¹, sharp C=O ≈ 1680–1750 cm⁻¹)',
                '10.9 Interpret mass spectra: identify M⁺ (molecular ion), base peak, and common fragments to deduce structure',
              ],
            },
          ],
        },
        {
          unit: 'Unit 3 — Practical Skills in Chemistry I',
          groups: [
            {
              name: 'Core Practicals and Practical Competencies',
              objectives: [
                'CORE PRACTICAL 3: Carry out an acid-base titration to find the concentration of a solution; demonstrate accurate use of pipette, burette and volumetric flask',
                'CORE PRACTICAL 4: Carry out a titration using a redox reaction (e.g. KMnO₄ with Fe²⁺ or H₂C₂O₄)',
                'CORE PRACTICAL 5: Preparation of a halogenoalkane from an alcohol by nucleophilic substitution; use of separating funnel, drying agent and distillation',
                'CORE PRACTICAL 6: Tests for cations (Na⁺, K⁺, Ca²⁺, Cu²⁺, Fe²⁺/³⁺, Al³⁺, NH₄⁺) and anions (CO₃²⁻, SO₄²⁻, Cl⁻, Br⁻, I⁻)',
                'Demonstrate competency in core techniques: Bunsen burner, water bath, reflux condenser, separating funnel, distillation, filtration, recrystallisation, melting point determination',
              ],
            },
          ],
        },
      ],
      A2: [
        {
          unit: 'Unit 4 — Rates, Equilibria & Further Organic Chemistry',
          groups: [
            {
              name: 'Topic 11: Kinetics',
              objectives: [
                '11.1 Understand reaction rate = change in concentration per unit time; express in mol dm⁻³ s⁻¹',
                '11.2 Deduce a rate equation of the form rate = k[A]ᵐ[B]ⁿ from experimental data; understand order of reaction and rate constant k',
                '11.3 Calculate orders and rate constant k from data tables; understand overall order = m + n',
                '11.4 Know the units of k for different overall orders: 0th (mol dm⁻³ s⁻¹), 1st (s⁻¹), 2nd (mol⁻¹ dm³ s⁻¹)',
                '11.5 Understand effect of temperature on k; use Arrhenius equation: k = Ae^(−Ea/RT); plot ln k vs 1/T to find Ea from gradient = −Ea/R',
                '11.6 Understand rate-determining step; deduce a possible mechanism consistent with a given rate equation',
                '11.7 CORE PRACTICAL 7: Determine the rate equation for the iodine/propanone reaction by a colorimetric method',
              ],
            },
            {
              name: 'Topic 12: Entropy and Energetics',
              objectives: [
                '12.1 Know that entropy S is related to disorder/randomness; entropy increases when: solids dissolve, liquids vaporise, number of moles of gas increases',
                '12.2 Calculate entropy change: ΔS = ΣS(products) − ΣS(reactants) in J mol⁻¹ K⁻¹',
                '12.3 Know that feasibility is determined by Gibbs free energy: ΔG = ΔH − TΔS; reaction is feasible when ΔG ≤ 0',
                '12.4 Construct Born-Haber cycles for ionic solids; calculate lattice enthalpies, electron affinities and hydration enthalpies',
                '12.5 Understand factors affecting lattice enthalpy: increasing ionic charge and decreasing ionic radius → more exothermic lattice enthalpy',
                '12.6 Understand the difference between theoretical and experimental lattice enthalpies; large difference implies significant covalent character (Fajans\' rules)',
                '12.7 Calculate enthalpy of solution from lattice enthalpy and hydration enthalpies: ΔHsol = ΔHlatt(endothermic) + ΔHhyd(cation) + ΔHhyd(anion)',
              ],
            },
            {
              name: 'Topic 13: Equilibria',
              objectives: [
                '13.1 Write Kp expressions for gaseous equilibria in terms of partial pressures; know Kp = Kc(RT)^Δn',
                '13.2 Understand the relationship between Kc and Kp; convert between them',
                '13.3 Perform calculations involving Kp; understand that changing conditions affects equilibrium position but not Kp (only temperature changes Kp)',
                '13.4 N₂(g) + 3H₂(g) ⇌ 2NH₃(g): understand compromise conditions in the Haber process (≈ 450°C, 200 atm, Fe catalyst)',
                '13.5 2SO₂(g) + O₂(g) ⇌ 2SO₃(g): understand the Contact process conditions (≈ 450°C, 1–2 atm, V₂O₅ catalyst)',
              ],
            },
            {
              name: 'Topic 14: Acid-Base Equilibria',
              objectives: [
                '14.1 Know Brønsted-Lowry acids (proton donors) and bases (proton acceptors); identify conjugate acid-base pairs',
                '14.2 Understand Ka for a weak acid HA: Ka = [H⁺][A⁻]/[HA]; perform calculations using the approximation [H⁺] ≈ [A⁻]',
                '14.3 Understand ionic product of water: Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ mol² dm⁻⁶ at 298 K',
                '14.4 Calculate pH = −log₁₀[H⁺]; calculate [H⁺] from pH; use Kw to find pOH and vice versa',
                '14.5 Calculate pH of strong acids (fully dissociated) and weak acids (using Ka approximation)',
                '14.6 Understand buffer solutions; explain how a buffer resists pH changes; calculate pH using Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA])',
                '14.7 Understand acid-base titration curves for: strong/strong (equivalence point at pH 7), strong acid/weak base (pH < 7), weak acid/strong base (pH > 7); choose suitable indicators (pKin ≈ pH at equivalence point)',
                '14.8 CORE PRACTICAL 8: Measure the pH of a range of solutions; perform a titration to determine Ka for a weak acid',
              ],
            },
            {
              name: 'Topic 15: Further Organic Chemistry',
              objectives: [
                '15.1 Understand the nomenclature of aldehydes, ketones, carboxylic acids and their derivatives; draw structural, displayed and skeletal formulae',
                '15.2 Know reactions of aldehydes and ketones with: (i) NaBH₄ → alcohol; (ii) HCN → hydroxynitrile; (iii) 2,4-DNPH → orange/yellow precipitate; (iv) Tollens\' reagent (silver mirror for aldehydes only); (v) K₂Cr₂O₇/H⁺ → oxidises aldehydes to carboxylic acids',
                '15.3 Understand nucleophilic addition mechanism for HCN with aldehydes and ketones; explain why a racemic mixture is formed',
                '15.4 Understand carboxylic acids as weak acids; reactions with: (i) carbonates and metals → salts + CO₂/H₂; (ii) alcohols with acid catalyst → esters + H₂O (esterification)',
                '15.5 CORE PRACTICAL 9: Preparation of a pure organic solid; determination of its melting point',
                '15.6 Understand hydrolysis of esters under acidic conditions (reversible) and alkaline conditions (saponification, irreversible)',
                '15.7 Know the uses of esters: flavourings, solvents, plasticisers, biodiesel',
                '15.8 Understand optical isomerism: chiral centre = carbon bonded to 4 different groups; enantiomers are non-superimposable mirror images',
                '15.9 Understand the terms enantiomer and racemic mixture; know that a racemic mixture has no net optical activity',
              ],
            },
          ],
        },
        {
          unit: 'Unit 5 — Transition Metals & Organic Nitrogen Chemistry',
          groups: [
            {
              name: 'Topic 16: Electrode Potentials and Electrochemical Cells',
              objectives: [
                '16.1 Know that an electrochemical cell produces e.m.f. when two different electrodes are connected; understand the standard hydrogen electrode (SHE) as the reference: E° = 0.00 V',
                '16.2 Write half-equations for electrode reactions; calculate E°cell = E°cathode − E°anode',
                '16.3 Relate E°cell to ΔG°: ΔG° = −nFE°cell where F = 96,500 C mol⁻¹',
                '16.4 Understand that E° predicts feasibility, but kinetics may prevent a thermodynamically feasible reaction occurring in practice',
                '16.5 Understand the principles and uses of electrochemical cells: hydrogen fuel cells, rechargeable batteries',
                '16.6 CORE PRACTICAL 10: Measure the e.m.f. of an electrochemical cell; predict the direction of electron flow',
                '16.7 Know the reactions of halogens as oxidising agents; understand Fe²⁺ reactions with Cl₂, Br₂ and I₂ in terms of electrode potentials',
              ],
            },
            {
              name: 'Topic 17: Transition Metals',
              objectives: [
                '17.1 Define a transition metal as a d-block element that can form ≥1 stable ion with an incomplete d sub-shell',
                '17.2 Give the electron configuration of transition metal atoms and ions from Sc to Zn (note Cu and Cr exceptions)',
                '17.3 Know that transition metals show variable oxidation states; examples for V (+2 to +5), Cr (+2 to +6), Mn (+2 to +7), Fe (+2, +3), Co (+2, +3), Cu (+1, +2)',
                '17.4 Understand that colour in transition metal compounds arises from d-orbital splitting in a ligand field (d–d transitions)',
                '17.5 Understand the terms ligand, complex ion, coordination number; ligands: monodentate (H₂O, NH₃, Cl⁻, CN⁻), bidentate (en = ethane-1,2-diamine), hexadentate (EDTA⁴⁻)',
                '17.6 Know the shapes of complex ions: octahedral (coordination number 6), tetrahedral (coordination number 4), square planar (coordination number 4)',
                '17.7 CORE PRACTICAL 11: Preparation of a transition metal complex',
                '17.8 Know that geometric (cis/trans) isomerism occurs in square planar and octahedral complexes',
                '17.9 Understand that optical isomerism occurs in octahedral complexes containing three bidentate ligands',
                '17.10 Understand the stability constant Kstab; larger Kstab → more stable complex ion',
                '17.11 Know that haemoglobin contains an Fe²⁺ complex; O₂ can be displaced by CO (stronger field ligand) — a reason for CO toxicity',
                '17.12 Know colours of oxidation states of vanadium: V⁵⁺ yellow (VO₂⁺), V⁴⁺ blue (VO²⁺), V³⁺ green, V²⁺ violet',
                '17.13 Know that cis-platin is a square planar Pt²⁺ complex used in cancer treatment as a single isomer',
                '17.14 Understand bidentate and hexadentate ligands; examples: en = H₂NCH₂CH₂NH₂; EDTA⁴⁻',
                '17.15 Know that haemoglobin is an Fe²⁺ complex with a polydentate ligand; ligand exchange occurs when O₂ is replaced by CO',
                '17.16 Understand in terms of E° values that Cr₂O₇²⁻: (i) is reduced to Cr³⁺/Cr²⁺ by Zn in acid; (ii) is produced by oxidation of Cr³⁺ by H₂O₂ in alkali then acidification',
                '17.17 Know: Cr₂O₇²⁻ + H₂O ⇌ 2CrO₄²⁻ + 2H⁺ (orange ⇌ yellow, controlled by pH)',
                '17.18 Record observations and write equations for reactions of Cr³⁺, Mn²⁺, Fe²⁺, Fe³⁺, Co²⁺, Ni²⁺, Cu²⁺, Zn²⁺ with NaOH(aq) and NH₃(aq), including in excess',
                '17.19 Write ionic equations to show amphoteric behaviour, deprotonation and ligand exchange in the reactions in 17.18',
                '17.20 Understand ligand exchange and colour change: [Cu(H₂O)₆]²⁺ → [Cu(NH₃)₄(H₂O)₂]²⁺ (pale blue → deep blue); → [CuCl₄]²⁻ (yellow-green); [Co(H₂O)₆]²⁺ → [CoCl₄]²⁻ (pink → blue)',
                '17.21 Understand the chelate effect: substitution of monodentate by bidentate/hexadentate ligand → more stable complex (ΔSsystem > 0)',
                '17.22 Know heterogeneous catalysis: catalyst in a different phase from reactants; reaction occurs at the catalyst surface',
                '17.23 Understand how V₂O₅ acts as a catalyst in the Contact process via oxidation number changes: V⁵⁺ → V⁴⁺ → V⁵⁺',
                '17.24 Understand how a catalytic converter decreases CO and NO emissions: CO and NO adsorb onto Pt/Rh/Pd surface → react → desorb as CO₂ and N₂',
                '17.25 Know homogeneous catalysis: catalyst in the same phase as reactants; reaction proceeds via an intermediate species',
                '17.26 Understand the role of Fe²⁺ in catalysing the reaction between I⁻ and S₂O₈²⁻',
                '17.27 Know the role of Mn²⁺ in autocatalysing the reaction between MnO₄⁻ and C₂O₄²⁻',
                '17.28 CORE PRACTICAL 14: The preparation of a transition metal complex',
              ],
            },
            {
              name: 'Topic 18: Benzene and Aromatic Chemistry',
              objectives: [
                '18.1 Use thermochemical, X-ray diffraction and IR data as evidence for the structure and stability of the benzene ring (delocalisation model preferred over Kekulé)',
                '18.2 Understand that the delocalised model for benzene involves overlap of p-orbitals above and below the ring to form a π electron cloud',
                '18.3 Understand why benzene is resistant to bromination compared to alkenes: the delocalised π system is more stable than a localised C=C',
                '18.4 Know reactions of benzene: (i) combustion (sooty flame); (ii) halogenation (Br₂/FeBr₃); (iii) nitration (conc. HNO₃/H₂SO₄, 50°C → nitrobenzene); (iv) sulfonation (fuming H₂SO₄); (v) Friedel-Crafts alkylation/acylation (RX or RCOCl/AlCl₃)',
                '18.5 Understand the mechanism of electrophilic substitution: generation of the electrophile (e.g. NO₂⁺, Br⁺ from Br₂/FeBr₃); attack on ring; loss of H⁺ to restore aromaticity',
                '18.6 Understand the reaction of phenol with bromine water (no catalyst needed; OH group activates the ring)',
              ],
            },
            {
              name: 'Topic 19: Amines, Amides and Amino Acids',
              objectives: [
                '19.1 Understand the nomenclature of amides, amines and amino acids; draw structural, displayed and skeletal formulae',
                '19.2 Understand reactions of primary aliphatic amines (butylamine) and aromatic amines (phenylamine) with: (i) H₂O → alkaline solution; (ii) acids → salts; (iii) halogenoalkanes; (iv) ethanoyl chloride → amide; (v) Cu²⁺ → complex',
                '19.3 Understand that amines are miscible with water due to H-bonding; explain differences in basicity: aliphatic amines (most basic) > NH₃ > aromatic amines (lone pair delocalised into ring, least basic)',
                '19.4 Understand preparation of primary aliphatic amines: (i) RX + NH₃(ethanol) → RNH₂; (ii) RCN + 2[H] → RCH₂NH₂ (reduction by LiAlH₄ or H₂/Ni)',
                '19.5 Know the preparation of aromatic amines by reduction of aromatic nitro compounds using Sn and conc. HCl (then NaOH to liberate amine)',
                '19.6 Describe the reaction of aromatic amines with HNO₂ (from NaNO₂/HCl at 0–5°C) to form benzenediazonium ions; coupling with phenol in alkaline solution to form an azo dye (yellow-orange)',
                '19.7 Understand that amides are prepared from acyl chlorides: RCOCI + H₂NR′ → RCONHR′ + HCl',
                '19.8 Describe: (i) condensation polymerisation for polyamides (nylon from diamine + dicarboxylic acid; protein from amino acids); (ii) addition polymerisation including poly(propenamide) and poly(ethenol)',
                '19.9 Draw the structural formulae of the repeat units of polyamides and the polymers in 19.8',
                '19.10 Comment on physical properties of polyamides (high tensile strength, H-bonding between chains) and solubility of poly(ethenol) in water (H-bonding — used in soluble laundry bags)',
                '19.11 Describe experiments to investigate characteristic behaviour of amino acids: (i) acidity/basicity and zwitterion formation at isoelectric point; (ii) optical rotation of plane-polarised monochromatic light; (iii) formation of peptide bonds by condensation polymerisation',
                '19.12 CORE PRACTICAL 15: Analysis of some inorganic and organic unknowns',
              ],
            },
            {
              name: 'Topic 20: Synthesis and Organic Analysis',
              objectives: [
                '20.1 Deduce empirical formulae, molecular formulae and structural formulae from: combustion analysis, element %, characteristic reactions of functional groups, IR spectra, mass spectra and ¹H/¹³C NMR spectra',
                '20.2 Understand methods of increasing carbon chain length using Mg to form Grignard reagents (RMgX); reactions with CO₂ → carboxylic acid; with carbonyl compounds → alcohol (in dry ether)',
                '20.3 Use knowledge of organic chemistry to: (i) predict properties of unfamiliar compounds; (ii) plan reaction schemes of up to four steps; (iii) select suitable practical procedures; (iv) identify appropriate control measures to reduce risk',
                '20.4 CORE PRACTICAL 16: The preparation of aspirin',
                '20.5 Understand techniques for preparation and purification: (i) refluxing; (ii) purification by washing with H₂O and Na₂CO₃(aq); (iii) solvent extraction; (iv) recrystallisation; (v) drying with anhydrous CaCl₂/MgSO₄; (vi) distillation; (vii) steam distillation; (viii) melting point determination; (ix) boiling point determination',
              ],
            },
          ],
        },
        {
          unit: 'Unit 6 — Practical Skills in Chemistry II',
          groups: [
            {
              name: 'Assessment Objectives',
              objectives: [
                'Planning: Identify apparatus with details (range and resolution); describe measurement of variables; discuss control of variables; discuss repeat readings; discuss calibration; consider health and safety implications',
                'Implementation: Demonstrate safe and competent use of apparatus; record results in a correctly formatted table with headings, units and significant figures; recognise and discard anomalous results',
                'Analysis: Process data using appropriate mathematical techniques; plot graphs with appropriate scales, labelled axes, correct units and a smooth line of best fit; determine the gradient using a large triangle; use graphs to determine relationships or constants; determine percentage uncertainties; evaluate experimental procedures and suggest realistic improvements; comment on accuracy and precision',
              ],
            },
          ],
        },
      ],
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// localStorage helpers — v3 because group-level index is now part of the ID
// ─────────────────────────────────────────────────────────────────────────────
const LS_KEY = 'syllabusChecklist_v3';

function loadChecked() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

function saveChecked(set) {
  try { localStorage.setItem(LS_KEY, JSON.stringify([...set])); }
  catch { /* ignore quota errors */ }
}

// ID format: subjectId_level_unitIdx_groupIdx_objIdx
function topicId(subjectId, level, unitIdx, groupIdx, objIdx) {
  return `${subjectId}_${level}_${unitIdx}_${groupIdx}_${objIdx}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Collapsible Topic Group accordion row
// ─────────────────────────────────────────────────────────────────────────────
function TopicGroup({
  group, groupIdx, subjectId, level, unitIdx, checked, onToggle, onMarkAll, color, academicMode,
}) {
  const [open, setOpen] = useState(groupIdx === 0);
  const contentRef = useRef(null);

  const objIds  = group.objectives.map((_, oi) => topicId(subjectId, level, unitIdx, groupIdx, oi));
  const done    = objIds.filter((id) => checked.has(id)).length;
  const total   = objIds.length;
  const pct     = total > 0 ? Math.round((done / total) * 100) : 0;
  const allDone = done === total;

  const headerBg = academicMode
    ? open ? 'bg-stone-50' : 'bg-white hover:bg-stone-50'
    : open ? 'bg-white/8' : 'bg-transparent hover:bg-white/5';

  const borderColor = academicMode ? 'border-stone-200' : 'border-white/10';

  return (
    <div className={`rounded-xl overflow-hidden border ${borderColor} transition-all duration-200`}>
      {/* Group header row */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center gap-3 px-4 py-3 transition-colors duration-150 ${headerBg}`}
      >
        {/* Chevron */}
        <svg
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''} ${
            academicMode ? 'text-stone-400' : 'text-white/30'
          }`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>

        {/* Group name */}
        <span className={`text-sm font-semibold flex-1 text-left ${academicMode ? 'text-stone-700' : 'text-white/90'}`}>
          {group.name}
        </span>

        {/* Progress pill */}
        <div className="flex items-center gap-2 shrink-0">
          {allDone ? (
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              academicMode ? 'bg-green-100 text-green-700' : 'bg-emerald-500/20 text-emerald-300'
            }`}>
              ✓ Complete
            </span>
          ) : (
            <span className={`text-xs tabular-nums font-medium ${
              academicMode ? 'text-stone-400' : 'text-white/40'
            }`}>
              {done}/{total}
            </span>
          )}

          {/* Mark all toggle — stop click from toggling accordion */}
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); onMarkAll(objIds, allDone); }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); onMarkAll(objIds, allDone); } }}
            className={`text-xs font-medium px-2 py-0.5 rounded-lg transition-colors cursor-pointer focus:outline-none ${
              academicMode
                ? 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                : 'bg-white/8 text-white/40 hover:bg-white/15 hover:text-white/80'
            }`}
          >
            {allDone ? 'Unmark' : 'Mark all'}
          </span>
        </div>
      </button>

      {/* Mini progress bar */}
      <div className={`h-0.5 ${academicMode ? 'bg-stone-100' : 'bg-white/5'}`}>
        <div
          className={`h-full transition-all duration-500 ${
            allDone
              ? 'bg-emerald-500'
              : academicMode ? 'bg-stone-400' : `bg-gradient-to-r ${color.digital}`
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Objectives list (animated expand) */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? (contentRef.current ? contentRef.current.scrollHeight + 'px' : '9999px') : '0px' }}
      >
        <ul className={`px-2 pt-1 pb-2 space-y-0.5 ${academicMode ? 'bg-stone-50/50' : ''}`}>
          {group.objectives.map((objective, objIdx) => {
            const id        = topicId(subjectId, level, unitIdx, groupIdx, objIdx);
            const isChecked = checked.has(id);

            return (
              <li key={id}>
                <label
                  htmlFor={`chk-${id}`}
                  className={`flex items-start gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-100 ${
                    isChecked
                      ? academicMode ? 'bg-green-50' : 'bg-emerald-500/10'
                      : academicMode ? 'hover:bg-stone-100' : 'hover:bg-white/5'
                  }`}
                >
                  {/* Custom checkbox */}
                  <div
                    className={`w-[18px] h-[18px] mt-0.5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${
                      isChecked
                        ? academicMode ? 'bg-green-600 border-green-600' : 'bg-emerald-500 border-emerald-500'
                        : academicMode ? 'border-stone-300 bg-white' : 'border-white/20 bg-white/5'
                    }`}
                  >
                    {isChecked && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <input id={`chk-${id}`} type="checkbox" checked={isChecked} onChange={() => onToggle(id)} className="sr-only" />
                  <span
                    className={`text-sm leading-relaxed select-none ${
                      isChecked
                        ? academicMode ? 'line-through text-stone-400' : 'line-through text-white/30'
                        : academicMode ? 'text-stone-700' : 'text-white/80'
                    }`}
                  >
                    {objective}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root SyllabusChecklist component
// ─────────────────────────────────────────────────────────────────────────────
const SyllabusChecklist = ({ academicMode }) => {
  const [checked,         setChecked]         = useState(loadChecked);
  const [activeSubjectId, setActiveSubjectId] = useState('maths');
  const [activeLevel,     setActiveLevel]     = useState('AS');
  const [activeUnitIdx,   setActiveUnitIdx]   = useState(0);

  useEffect(() => { saveChecked(checked); }, [checked]);
  useEffect(() => { setActiveUnitIdx(0); }, [activeSubjectId, activeLevel]);

  const handleToggle = useCallback((id) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleMarkAll = useCallback((ids, currentlyAllDone) => {
    setChecked((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => currentlyAllDone ? next.delete(id) : next.add(id));
      return next;
    });
  }, []);

  const activeSubject = SYLLABUS.find((s) => s.id === activeSubjectId);
  const activeUnits   = activeSubject.levels[activeLevel];
  const activeUnit    = activeUnits[activeUnitIdx];

  /* ── Aggregate counts ── */
  const allSubjectIds = ['AS', 'A2'].flatMap((lvl) =>
    activeSubject.levels[lvl].flatMap((unit, ui) =>
      unit.groups.flatMap((g, gi) =>
        g.objectives.map((_, oi) => topicId(activeSubjectId, lvl, ui, gi, oi))
      )
    )
  );
  const totalSubjectDone  = allSubjectIds.filter((id) => checked.has(id)).length;
  const totalSubjectCount = allSubjectIds.length;
  const totalSubjectPct   = totalSubjectCount > 0 ? Math.round((totalSubjectDone / totalSubjectCount) * 100) : 0;

  const unitAllIds  = activeUnit.groups.flatMap((g, gi) =>
    g.objectives.map((_, oi) => topicId(activeSubjectId, activeLevel, activeUnitIdx, gi, oi))
  );
  const unitDone  = unitAllIds.filter((id) => checked.has(id)).length;
  const unitTotal = unitAllIds.length;

  /* ── Style tokens ── */
  const panelBg    = academicMode ? 'bg-white border border-stone-200' : 'bg-white/10 backdrop-blur-lg border border-white/20';
  const pillBg     = academicMode ? 'bg-stone-100' : 'bg-black/20';

  const subjectTabCls = (sub) => {
    const isActive = sub.id === activeSubjectId;
    if (academicMode) return isActive ? 'bg-stone-800 text-white shadow-sm' : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100';
    return isActive ? `bg-gradient-to-r ${sub.color.digital} text-white shadow-lg` : 'text-white/50 hover:text-white/90 hover:bg-white/5';
  };

  const levelCls = (lvl) => {
    const isActive = lvl === activeLevel;
    if (academicMode) return isActive ? 'bg-stone-700 text-white' : 'text-stone-400 hover:bg-stone-100 hover:text-stone-700';
    return isActive ? 'bg-white/20 text-white ring-1 ring-white/30' : 'text-white/40 hover:bg-white/10 hover:text-white/80';
  };

  const unitPillCls = (idx) => {
    const isActive = idx === activeUnitIdx;
    if (academicMode) return isActive ? 'bg-stone-200 text-stone-800 border border-stone-400 font-semibold' : 'bg-white border border-stone-200 text-stone-500 hover:bg-stone-50';
    return isActive ? 'bg-white/20 text-white border border-white/30' : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10 hover:text-white/70';
  };

  return (
    <div className="space-y-4">

      {/* ── Tier 1: Subject tabs ────────────────────────────────────────────── */}
      <div className={`rounded-2xl p-5 ${panelBg}`}>
        <p className={`text-[11px] font-semibold uppercase tracking-widest mb-3 ${academicMode ? 'text-stone-400' : 'text-indigo-300/70'}`}>
          Subject
        </p>
        <div className="flex flex-wrap gap-2">
          {SYLLABUS.map((sub) => (
            <button
              key={sub.id}
              id={`subject-tab-${sub.id}`}
              onClick={() => setActiveSubjectId(sub.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none ${subjectTabCls(sub)}`}
            >
              <span className="text-base leading-none">{sub.emoji}</span>
              {sub.name}
            </button>
          ))}
        </div>

        {/* Subject-level overall progress bar */}
        <div className="mt-4 flex items-center gap-3">
          <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${academicMode ? 'bg-stone-100' : 'bg-white/10'}`}>
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                totalSubjectPct === 100 ? 'bg-emerald-500' : academicMode ? 'bg-stone-500' : `bg-gradient-to-r ${activeSubject.color.digital}`
              }`}
              style={{ width: `${totalSubjectPct}%` }}
            />
          </div>
          <span className={`text-xs tabular-nums font-medium shrink-0 ${academicMode ? 'text-stone-500' : 'text-white/50'}`}>
            {totalSubjectDone}/{totalSubjectCount} · {totalSubjectPct}%
          </span>
        </div>
      </div>

      {/* ── Tier 2: Level + Unit selection ─────────────────────────────────── */}
      <div className={`rounded-2xl p-5 ${panelBg}`}>
        <div className="flex items-center gap-4 mb-4">
          <p className={`text-[11px] font-semibold uppercase tracking-widest ${academicMode ? 'text-stone-400' : 'text-indigo-300/70'}`}>
            Level
          </p>
          {['AS', 'A2'].map((lvl) => (
            <button
              key={lvl}
              id={`level-btn-${lvl}`}
              onClick={() => setActiveLevel(lvl)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none ${levelCls(lvl)}`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <p className={`text-[11px] font-semibold uppercase tracking-widest mb-2 ${academicMode ? 'text-stone-400' : 'text-indigo-300/70'}`}>
          Unit
        </p>
        <div className="flex flex-wrap gap-2">
          {activeUnits.map((unit, idx) => {
            const uIds  = unit.groups.flatMap((g, gi) =>
              g.objectives.map((_, oi) => topicId(activeSubjectId, activeLevel, idx, gi, oi))
            );
            const uDone = uIds.filter((id) => checked.has(id)).length;
            const shortLabel = unit.unit.split('—')[0].trim();

            return (
              <button
                key={idx}
                id={`unit-pill-${activeSubjectId}-${activeLevel}-${idx}`}
                onClick={() => setActiveUnitIdx(idx)}
                className={`flex flex-col items-start px-4 py-2.5 rounded-xl text-left text-xs font-medium transition-all duration-200 focus:outline-none border ${unitPillCls(idx)}`}
              >
                <span className="font-semibold text-[13px] leading-tight">{shortLabel}</span>
                <span className="mt-0.5 opacity-60">{uDone}/{uIds.length}</span>
                {uDone === uIds.length && uIds.length > 0 && (
                  <span className="mt-1 text-emerald-400 text-[10px] font-bold">✓ Done</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Tier 3: Topic group accordions inside the active unit ───────────── */}
      <div className={`rounded-2xl ${panelBg}`}>
        {/* Unit header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${academicMode ? 'border-stone-100' : 'border-white/10'}`}>
          <div>
            <p className={`font-semibold text-base ${academicMode ? 'text-stone-800 font-serif' : 'text-white'}`}>
              {activeUnit.unit}
            </p>
            <p className={`text-xs mt-0.5 ${academicMode ? 'text-stone-400' : 'text-white/40'}`}>
              {unitDone} of {unitTotal} objectives — {activeUnit.groups.length} topic{activeUnit.groups.length !== 1 ? 's' : ''}
            </p>
          </div>
          {/* Unit-level mark-all */}
          <button
            type="button"
            onClick={() => handleMarkAll(unitAllIds, unitDone === unitTotal)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors focus:outline-none ${
              academicMode ? 'bg-stone-100 text-stone-600 hover:bg-stone-200' : 'bg-white/10 text-white/60 hover:bg-white/15 hover:text-white'
            }`}
          >
            {unitDone === unitTotal ? 'Unmark all' : 'Mark all'}
          </button>
        </div>

        {/* Unit progress bar */}
        <div className={`h-1 ${academicMode ? 'bg-stone-100' : 'bg-white/5'}`}>
          <div
            className={`h-full transition-all duration-500 ${
              unitDone === unitTotal && unitTotal > 0 ? 'bg-emerald-500' : academicMode ? 'bg-stone-500' : `bg-gradient-to-r ${activeSubject.color.digital}`
            }`}
            style={{ width: unitTotal > 0 ? `${Math.round((unitDone / unitTotal) * 100)}%` : '0%' }}
          />
        </div>

        {/* Topic group accordions */}
        <div className="p-4 space-y-2">
          {activeUnit.groups.map((group, groupIdx) => (
            <TopicGroup
              key={groupIdx}
              group={group}
              groupIdx={groupIdx}
              subjectId={activeSubjectId}
              level={activeLevel}
              unitIdx={activeUnitIdx}
              checked={checked}
              onToggle={handleToggle}
              onMarkAll={handleMarkAll}
              color={activeSubject.color}
              academicMode={academicMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SyllabusChecklist;
