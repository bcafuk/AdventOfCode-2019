#include <algorithm>
#include <iostream>
#include <set>
#include <vector>

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

	size_t visibleNumber = 0;
	Location origin{0, 0};

	for (const Location &asteroid : asteroids) {
		std::set<Location> visible = getVisible(asteroids, asteroid, n);
		if (visible.size() > visibleNumber) {
			visibleNumber = visible.size();
			origin = asteroid;
		}
	}

	asteroids.erase(origin);
	auto compare = [&origin](const Location &a, const Location &b) {
		return a.phiAround(origin) < b.phiAround(origin);
	};

	std::vector<Location> vaporization;

	while (!asteroids.empty() && vaporization.size() < 200) {
		std::set<Location> visible = getVisible(asteroids, origin, n);
		std::vector<Location> turn(visible.begin(), visible.end());

		for (const Location &asteroid : visible) {
			asteroids.erase(asteroid);
		}

		std::sort(turn.begin(), turn.end(), compare);
		vaporization.insert(vaporization.end(), turn.begin(), turn.end());
	}

	const Location &asteroid200 = vaporization.at(199);
	std::cout << asteroid200.x * 100 + asteroid200.y << std::endl;

	return 0;
}
