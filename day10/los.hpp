#ifndef AOC_2019_DAY10_LOS_HPP
#define AOC_2019_DAY10_LOS_HPP

#include <cstddef>
#include <set>

#include "Location.hpp"

std::set<Location> getVisible(const std::set<Location> &asteroids, const Location &origin, coordinate size);

inline size_t countVisible(const std::set<Location> &asteroids, const Location &origin, coordinate size) {
	return getVisible(asteroids, origin, size).size();
}

#endif
