#include <inttypes.h>
#include <stdbool.h>
#include <stdio.h>

int sgn(int val) {
	return (val > 0) - (val < 0);
}

uint_fast64_t gcd(uint_fast64_t a, uint_fast64_t b) {
	if (b == 0) {
		return a;
	}
	return gcd(b, a % b);
}

uint_fast64_t lcm(uint_fast64_t a, uint_fast64_t b) {
	return a / gcd(a, b) * b;
}

uint_fast64_t getPeriod(int *positions, int *velocities, int *initialPositions, size_t count) {
	uint_fast64_t period = 0;
	bool hasLooped = false;
	while (!hasLooped) {
		++period;

		for (size_t i = 0; i < count; ++i) {
			for (size_t j = 0; j < count; ++j) {
				velocities[i] += sgn(positions[j] - positions[i]);
			}
		}
		for (size_t i = 0; i < count; ++i) {
			positions[i] += velocities[i];
		}

		hasLooped = true;
		for (size_t i = 0; i < count && hasLooped; ++i) {
			hasLooped = hasLooped && (positions[i] == initialPositions[i]) && (velocities[i] == 0);
		}
	}

	return period;
}

int main() {
	const size_t moonCount = 4;

	int initialX[moonCount];
	int initialY[moonCount];
	int initialZ[moonCount];
	int xPositions[moonCount];
	int yPositions[moonCount];
	int zPositions[moonCount];
	int xVelocities[moonCount];
	int yVelocities[moonCount];
	int zVelocities[moonCount];

	for (size_t i = 0; i < moonCount; ++i) {
		scanf("<x=%d, y=%d, z=%d> ", &initialX[i], &initialY[i], &initialZ[i]);
		xPositions[i] = initialX[i];
		yPositions[i] = initialY[i];
		zPositions[i] = initialZ[i];

		xVelocities[i] = 0;
		yVelocities[i] = 0;
		zVelocities[i] = 0;
	}

	uint_fast64_t periodX = getPeriod(xPositions, xVelocities, initialX, moonCount);
	uint_fast64_t periodY = getPeriod(yPositions, yVelocities, initialY, moonCount);
	uint_fast64_t periodZ = getPeriod(zPositions, zVelocities, initialZ, moonCount);

	uint_fast64_t period = lcm(periodX, periodY);
	period = lcm(period, periodZ);

	printf("%" PRIuFAST64 "\n", period);

	return 0;
}
