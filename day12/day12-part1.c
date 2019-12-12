#include <stdio.h>
#include <stdlib.h>

struct Vec3 {
	int x;
	int y;
	int z;
};

int sgn(int val) {
	return (val > 0) - (val < 0);
}

void applyGravity(const struct Vec3 *positions, struct Vec3 *velocities, size_t count) {
	for (size_t i = 0; i < count; ++i) {
		for (size_t j = 0; j < count; ++j) {
			velocities[i].x += sgn(positions[j].x - positions[i].x);
			velocities[i].y += sgn(positions[j].y - positions[i].y);
			velocities[i].z += sgn(positions[j].z - positions[i].z);
		}
	}
}

void applyVelocity(struct Vec3 *positions, const struct Vec3 *velocities, size_t count) {
	for (size_t i = 0; i < count; ++i) {
		positions[i].x += velocities[i].x;
		positions[i].y += velocities[i].y;
		positions[i].z += velocities[i].z;
	}
}

int calculateEnergy(const struct Vec3 *positions, const struct Vec3 *velocities, size_t count) {
	int energy = 0;
	for (size_t i = 0; i < count; ++i) {
		int potential = 0;
		potential += abs(positions[i].x);
		potential += abs(positions[i].y);
		potential += abs(positions[i].z);

		int kinetic = 0;
		kinetic += abs(velocities[i].x);
		kinetic += abs(velocities[i].y);
		kinetic += abs(velocities[i].z);

		energy += potential * kinetic;
	}
	return energy;
}

int main() {
	const size_t moonCount = 4;

	struct Vec3 position[moonCount];
	struct Vec3 velocity[moonCount];

	for (size_t i = 0; i < moonCount; ++i) {
		scanf("<x=%d, y=%d, z=%d> ", &position[i].x, &position[i].y, &position[i].z);
		velocity[i].x = velocity[i].y = velocity[i].z = 0;
	}

	for (size_t t = 0; t < 1000; ++t) {
		applyGravity(position, velocity, moonCount);
		applyVelocity(position, velocity, moonCount);
	}
	printf("%d\n", calculateEnergy(position, velocity, moonCount));

	return 0;
}
