#include <iostream>

#include "Location.hpp"
#include "los.hpp"

int main() {
	std::set<Location> asteroids;
	coordinate n = 1;

	for (coordinate y = 0; y < n; ++y) {
		std::string line;
		std::getline(std::cin, line);
		n = line.size();

		for (coordinate x = 0; x < n; ++x) {
			if (line[x] != '.') {
				asteroids.emplace(x, y);
			}
		}
	}

	size_t maxCount = 0;
	for (const auto &asteroid : asteroids) {
		size_t count = countVisible(asteroids, asteroid, n);
		if (count > maxCount) {
			maxCount = count;
		}
	}
	std::cout << maxCount << std::endl;

	return 0;
}
