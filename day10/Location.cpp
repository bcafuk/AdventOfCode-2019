#include "Location.hpp"

#include <cmath>

namespace {
	int gcd(int a, int b) {
		if (a == 0) {
			return std::abs(b);
		}
		if (b == 0) {
			return std::abs(a);
		}
		a = std::abs(a);
		b = std::abs(b);
		return gcd(b, a % b);
	}
}

Location::Location(coordinate x, coordinate y) :
	x(x),
	y(y)
{}

void Location::reduce() {
	int d = gcd(x, y);
	x /= d;
	y /= d;
}
double Location::phiAround(const Location &origin) const {
	return -atan2(x - origin.x, y - origin.y);
}

bool Location::operator<(const Location &other) const {
	if (x == other.x) {
		return y < other.y;
	}
	return x < other.x;
}
bool Location::operator==(const Location &other) const {
	return x == other.x && y == other.y;
}

bool Location::insideRect(const Location &topLeft, const Location &bottomRight) const {
	return x >= topLeft.x && x < bottomRight.x && y >= topLeft.y && y < bottomRight.y;
}

Location Location::operator+ (const Location &other) const {
	return Location(x + other.x, y + other.y);
}
Location Location::operator- (const Location &other) const {
	return Location(x - other.x, y - other.y);
}
