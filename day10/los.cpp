#include "los.hpp"

std::set<Location> getVisible(const std::set<Location> &asteroids, const Location &origin, coordinate size) {
	std::set<Location> visible = asteroids;

	visible.erase(origin);

	auto it = visible.begin();
	while (it != visible.end()) {
		if (*it == origin) {
			it = visible.erase(it);
		}
		Location delta = *it - origin;
		delta.reduce();

		Location displacement = *it + delta;
		while(displacement.insideRect({0, 0}, {size, size})) {
			visible.erase(displacement);
			displacement = displacement + delta;
		}

		++it;
	}

	return visible;
}
